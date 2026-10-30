"""Train/inspect UCI Autism Screening Adult (ID 426). Leakage check first.
Writes data/model_report.json. Never generates synthetic rows.
Run from the project root: ml\\.venv\\Scripts\\python ml\\train_uci.py
"""
import io, json, re, sys, warnings, zipfile, urllib.request
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import StratifiedKFold, cross_val_predict
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "ml" / "raw"
OUT = ROOT / "data" / "model_report.json"
SEED = 42
URL = "https://archive.ics.uci.edu/dataset/426/autism+screening+adult"
ZIP_URL = "https://archive.ics.uci.edu/static/public/426/autism+screening+adult.zip"
ITEMS = [f"A{i}" for i in range(1, 11)]
THRESH_TEXT = "0.5 on class-balanced predicted probability"
WARN_LOG = []


def fail(reason):
    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(json.dumps({"generated": False, "reason": reason}, indent=2))
    print("FAILED:", reason)
    sys.exit(1)


# ---------- load ----------
def load():
    RAW.mkdir(exist_ok=True)
    cached = RAW / "autism_screening_adult.csv"
    if cached.exists():
        return pd.read_csv(cached), "cache ml/raw/autism_screening_adult.csv"
    try:
        from ucimlrepo import fetch_ucirepo
        ds = fetch_ucirepo(id=426)
        X, y = ds.data.features, ds.data.targets
        df = pd.concat([X, y], axis=1) if y is not None else X
        df.to_csv(cached, index=False)
        return df, "ucimlrepo fetch_ucirepo(id=426)"
    except Exception as e:
        print("ucimlrepo failed:", repr(e))
    try:
        req = urllib.request.Request(ZIP_URL, headers={"User-Agent": "Mozilla/5.0"})
        blob = urllib.request.urlopen(req, timeout=60).read()
        (RAW / "autism_screening_adult.zip").write_bytes(blob)
        z = zipfile.ZipFile(io.BytesIO(blob))
        for n in z.namelist():
            if n.lower().endswith(".csv"):
                df = pd.read_csv(z.open(n)); break
        else:
            from scipy.io import arff
            n = [n for n in z.namelist() if n.lower().endswith(".arff")][0]
            text = z.read(n).decode("utf-8", "replace")
            data, _ = arff.loadarff(io.StringIO(text))
            df = pd.DataFrame(data)
            for c in df.columns:
                if df[c].dtype == object:
                    df[c] = df[c].apply(lambda v: v.decode() if isinstance(v, bytes) else v)
        df.to_csv(cached, index=False)
        return df, f"direct download {ZIP_URL} (from {URL})"
    except Exception as e:
        fail(f"Could not load UCI 426 via ucimlrepo or direct download: {e!r}")


def norm(c):
    c = str(c).strip().lower()
    if re.fullmatch(r"a\d+_score", c): return "A" + re.findall(r"\d+", c)[0]
    if re.fullmatch(r"a\d+", c): return c.upper()
    if re.fullmatch(r"cont?r?y_of_res", c): return "country"
    if re.fullmatch(r"j[au]+ndice", c): return "jaundice"
    if c in ("austim", "autism", "family_pdd"): return "family_pdd"
    if c in ("class/asd", "class", "asd", "class_asd"): return "label"
    if c == "used_app_before": return "used_app_before"
    if c == "age_desc": return "age_desc"
    return re.sub(r"\W+", "_", c)


def rates(y, pred):
    y, pred = np.asarray(y), np.asarray(pred)
    tp = int(((y == 1) & (pred == 1)).sum()); tn = int(((y == 0) & (pred == 0)).sum())
    fp = int(((y == 0) & (pred == 1)).sum()); fn = int(((y == 1) & (pred == 0)).sum())
    f = lambda a, b: a / b if b else float("nan")
    return {"sensitivity": f(tp, tp + fn), "specificity": f(tn, tn + fp),
            "ppv": f(tp, tp + fp), "accuracy": f(tp + tn, len(y))}


def summarise(fold_list):
    out = {}
    for k in fold_list[0]:
        v = np.array([d[k] for d in fold_list], dtype=float)
        out[k] = {"mean": None if np.isnan(v).all() else float(np.nanmean(v)),
                  "sd": None if np.isnan(v).all() else float(np.nanstd(v))}
    return out


def clean_json(o):
    if isinstance(o, dict): return {str(k): clean_json(v) for k, v in o.items()}
    if isinstance(o, (list, tuple)): return [clean_json(v) for v in o]
    if isinstance(o, (np.integer,)): return int(o)
    if isinstance(o, (np.floating, float)):
        return None if np.isnan(o) else float(o)
    if isinstance(o, np.bool_): return bool(o)
    return o


df, load_path = load()
print("load_path:", load_path)
print("columns (raw):", list(df.columns))
print("shape (raw):", df.shape)
columns_seen = [str(c) for c in df.columns]
df.columns = [norm(c) for c in df.columns]
df = df.replace("?", np.nan)
if "label" not in df.columns:
    fail(f"No label column found in {columns_seen}")
missing_items = [i for i in ITEMS if i not in df.columns]
if missing_items:
    fail(f"Missing item columns {missing_items} in {columns_seen}")

# ---------- clean ----------
df["age"] = pd.to_numeric(df["age"], errors="coerce")
n_age_gt100 = int((df["age"] > 100).sum())
age_outliers = df.loc[df["age"] > 100, "age"].tolist()
df.loc[df["age"] > 100, "age"] = np.nan
df = df.drop(columns=[c for c in ["age_desc"] if c in df.columns])
lab = df["label"].astype(str).str.strip().str.upper()
df["label"] = lab.map({"YES": 1, "NO": 0, "1": 1, "0": 0})
n_before = len(df)
df = df[df["label"].notna()].reset_index(drop=True)
y = df["label"].astype(int).values
for c in ITEMS:
    df[c] = pd.to_numeric(df[c], errors="coerce")
age_range = {"min": float(df["age"].min()), "max": float(df["age"].max()),
             "n_under_18": int((df["age"] < 18).sum()), "n_age_missing": int(df["age"].isna().sum()),
             "ages_over_100_set_to_nan": age_outliers}
print("cleaned shape:", df.shape, "age range:", age_range, "rows dropped (no label):", n_before - len(df))

cv = StratifiedKFold(5, shuffle=True, random_state=SEED)

# ---------- LEAKAGE CHECK (first) ----------
item_sum = df[ITEMS].sum(axis=1)
folds = []
for tr, te in cv.split(item_sum, y):
    t = DecisionTreeClassifier(max_depth=1, random_state=SEED).fit(item_sum.values[tr].reshape(-1, 1), y[tr])
    folds.append(rates(y[te], t.predict(item_sum.values[te].reshape(-1, 1))))
tree = DecisionTreeClassifier(max_depth=1, random_state=SEED).fit(item_sum.values.reshape(-1, 1), y)
thr = float(tree.tree_.threshold[0])
leak_sum = summarise(folds)
xt = pd.crosstab(item_sum, y)
xtab = {str(int(k)): {"label_0": int(r.get(0, 0)), "label_1": int(r.get(1, 0))} for k, r in xt.iterrows()}
result_equals = None
if "result" in df.columns:
    r = pd.to_numeric(df["result"], errors="coerce")
    result_equals = {"all_rows_equal": bool((r == item_sum).all()),
                     "n_mismatch": int((r != item_sum).sum()), "n_rows": int(len(df))}
rel = df["relation"] if "relation" in df.columns else pd.Series([np.nan] * len(df))
grp = np.where(rel.isna(), "unknown", np.where(rel.astype(str).str.strip().str.lower() == "self", "self", "other"))
rel_rates = {g: {"n": int((grp == g).sum()), "label_rate": float(y[grp == g].mean()),
                 "n_positive": int(y[grp == g].sum())} for g in ["self", "other", "unknown"] if (grp == g).any()}
rel_raw = rel.fillna("(missing)").value_counts().to_dict()
leakage = {
    "method": "DecisionTreeClassifier(max_depth=1) on item_sum (sum of A1..A10) alone, StratifiedKFold(5, shuffle, seed 42)",
    "cv_accuracy": leak_sum["accuracy"], "cv_sensitivity": leak_sum["sensitivity"],
    "cv_specificity": leak_sum["specificity"],
    "threshold_refit_all_rows": f"item_sum <= {thr} -> class {int(tree.tree_.value[1].argmax())}; "
                                f"item_sum > {thr} -> class {int(tree.tree_.value[2].argmax())}",
    "threshold_value": thr,
    "item_sum_by_label_crosstab": xtab,
    "result_equals_item_sum": result_equals,
    "label_rate_by_relation": rel_rates,
    "relation_raw_value_counts": rel_raw,
}
leak_acc_pct = round(leak_sum["accuracy"]["mean"] * 100, 1)
print("LEAKAGE depth-1 CV:", leak_sum, "threshold", thr)
print("relation:", rel_rates)
CAVEATS = [
    f"The dataset's label appears to be derived from the questionnaire score itself; the depth-1 check scored {leak_acc_pct}%. The model is reproducing a screening score, not predicting a clinical diagnosis.",
    "Screening-app respondents; representativeness unknown; clinical diagnosis not indicated.",
]
# Persist the leakage block on its own before any model metric exists.
OUT.parent.mkdir(exist_ok=True)
OUT.write_text(json.dumps(clean_json({"generated": True, "partial": "leakage check only; variants not yet trained",
                                      "generated_at": datetime.now(timezone.utc).isoformat(),
                                      "leakage_check": leakage, "caveats": CAVEATS}), indent=2))
print("wrote leakage block to", OUT)

# ---------- variants ----------
DEMO = [c for c in ["age", "gender", "ethnicity", "country", "jaundice", "family_pdd", "used_app_before", "relation"]
        if c in df.columns]
for c in DEMO:
    if c != "age":
        df[c] = df[c].astype("object").where(df[c].notna(), np.nan)


def make_pipe(cols):
    num = [c for c in cols if c == "age" or c in ITEMS or c == "result"]
    cat = [c for c in cols if c not in num]
    for c in num: df[c] = pd.to_numeric(df[c], errors="coerce")
    tfs = []
    if num: tfs.append(("num", Pipeline([("i", SimpleImputer(strategy="median")), ("s", StandardScaler())]), num))
    if cat: tfs.append(("cat", Pipeline([("i", SimpleImputer(strategy="most_frequent")),
                                         ("o", OneHotEncoder(handle_unknown="ignore"))]), cat))
    return Pipeline([("pre", ColumnTransformer(tfs)),
                     ("clf", LogisticRegression(max_iter=1000, class_weight="balanced"))])


VARIANTS = {
    "V1_all_columns": ITEMS + DEMO + (["result"] if "result" in df.columns else []),
    "V2_items_only": ITEMS,
    "V2b_items_plus_demographics": ITEMS + DEMO,
    "V3_demographics_only": DEMO,
}
variants, oof = {}, {}
for name, cols in VARIANTS.items():
    fl = []
    with warnings.catch_warnings(record=True) as w:
        warnings.simplefilter("always")
        for tr, te in cv.split(df, y):
            p = make_pipe(cols).fit(df.iloc[tr][cols], y[tr])
            pr = p.predict_proba(df.iloc[te][cols])[:, 1]
            m = rates(y[te], (pr >= 0.5).astype(int))
            m["auc"] = roc_auc_score(y[te], pr)
            fl.append(m)
        if name in ("V2_items_only", "V2b_items_plus_demographics"):
            oof[name] = cross_val_predict(make_pipe(cols), df[cols], y, cv=cv, method="predict_proba")[:, 1]
    for x in w:
        WARN_LOG.append(f"{name}: {x.category.__name__}: {str(x.message)[:200]}")
    variants[name] = {"columns": cols, "n": int(len(df)), "n_positive": int(y.sum()),
                      "operating_threshold": THRESH_TEXT, **summarise(fl)}
    v = variants[name]
    print(name, {k: round(v[k]["mean"], 3) for k in ["sensitivity", "specificity", "ppv", "auc", "accuracy"] if v[k]["mean"] is not None})

# ---------- subgroups ----------
age = df["age"]
band = np.select([age.isna(), age < 18, age < 30, age < 45], ["unknown", "under 18 (data says 18+)", "18-29", "30-44"], "45+")
gender = df["gender"].fillna("unknown").astype(str).str.strip().str.lower().map({"m": "male", "f": "female"}).fillna("unknown") \
    if "gender" in df.columns else pd.Series(["unknown"] * len(df))


def sub_report(pred, groups):
    res = {}
    for g in sorted(set(groups)):
        idx = np.where(np.asarray(groups) == g)[0]
        n, npos = int(len(idx)), int(y[idx].sum())
        if n < 30 or npos < 10:
            res[g] = {"n": n, "n_positive": npos, "sensitivity": None, "specificity": None, "ppv": None, "suppressed": True}
        else:
            r = rates(y[idx], pred[idx])
            res[g] = {"n": n, "n_positive": npos, "sensitivity": r["sensitivity"], "specificity": r["specificity"],
                      "ppv": r["ppv"], "suppressed": False}
    return res


subgroups = {"language": "not available in this dataset; country of residence is not language"}
for vn in ("V2_items_only", "V2b_items_plus_demographics"):
    pred = (oof[vn] >= 0.5).astype(int)
    subgroups[vn] = {"by_gender": sub_report(pred, gender.values), "by_age_band": sub_report(pred, band),
                     "method": "pooled out-of-fold predictions, 5-fold stratified CV, threshold " + THRESH_TEXT}

# ---------- coefficients (V2b) ----------
cols = VARIANTS["V2b_items_plus_demographics"]
with warnings.catch_warnings(record=True) as w:
    warnings.simplefilter("always")
    pipe = make_pipe(cols).fit(df[cols], y)
for x in w:
    WARN_LOG.append(f"V2b full fit: {x.category.__name__}: {str(x.message)[:200]}")
names = pipe.named_steps["pre"].get_feature_names_out()
coefs = pipe.named_steps["clf"].coef_[0]
coef_list = sorted([{"feature": str(n), "coefficient": float(c)} for n, c in zip(names, coefs)],
                   key=lambda d: -abs(d["coefficient"]))

# ---------- export ----------
report = {
    "generated": True,
    "generated_at": datetime.now(timezone.utc).isoformat(),
    "dataset": {"name": "Autism Screening Adult (UCI ID 426)", "url": URL, "doi": "10.24432/C5F019",
                "license": "CC BY 4.0", "n_rows": int(len(df)), "columns_seen": columns_seen,
                "columns_used": VARIANTS["V1_all_columns"], "load_path": load_path,
                "age_range_observed": age_range},
    "leakage_check": leakage,
    "variants": variants,
    "subgroups": subgroups,
    "coefficients": {"V2b_items_plus_demographics": coef_list},
    "warnings": WARN_LOG,
    "note": "A near-perfect items-only result means the label is reachable from the items alone, which is the leakage finding, not a success.",
    "caveats": CAVEATS,
}
OUT.write_text(json.dumps(clean_json(report), indent=2))
print("wrote", OUT, "warnings:", len(WARN_LOG))
