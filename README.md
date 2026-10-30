# Early screening prototype

Adult-first, bilingual (English / Spanish) self-report screening questionnaire that runs entirely in the browser. Screening, not diagnosis. Built for the Dartmouth "AI at 70: What Must Remain Human?" hackathon (Oct 31, 2026).

## Run the app

```
cd screener
py -m http.server 8349
```

Open http://localhost:8349. Opening `index.html` directly will not work, because browsers block local JSON files on `file://`.

The page loads `styles.css`, `app.js` and three local JSON files (`data/questionnaire.json`, `data/providers.json`, `data/model_report.json`). It makes no other requests and stores nothing: no cookies, no local storage, no analytics, no server. Answers live in the tab's memory and disappear when it closes.

## Rebuild the model report

```
py -3.14 -m venv ml\.venv
ml\.venv\Scripts\python -m pip install -r ml\requirements.txt
ml\.venv\Scripts\python ml\train_uci.py
```

The script downloads UCI dataset 426 (cached in `ml/raw/`, not committed). It runs the leakage check first and saves it to `data/model_report.json` before any model is trained. It then trains four logistic-regression variants and exports metrics, subgroups and coefficients. The model never sees user answers.

## Dataset citation

Autism Screening Adult. UCI Machine Learning Repository, ID 426. https://archive.ics.uci.edu/dataset/426/autism+screening+adult. DOI 10.24432/C5F019. License CC BY 4.0.

## Limitations

- This is screening, not diagnosis. No condition is assigned to the user, and there is no total score.
- A screening result is not documentation for school or work.
- The writing and math areas are not validated for adults; no validated adult self-report screener was found for either.
- The Spanish version was translated by the team. It is not psychometrically validated, back-translated or cognitively tested.
- Band thresholds (33 / 60) and item weights are design choices with no validation.
- All 25 items are original wording. No item from the ASRS, AQ-10, CAT-Q, Dyslexia Adult Checklist or any other instrument is reproduced; those instruments are cited as construct sources only.
- The UCI 426 label appears to be derived from the questionnaire score itself (the depth-1 check reproduces it at 100%), and clinical diagnosis is not indicated. The model demonstrates a method and a leakage check, not diagnostic power. Respondents are screening-app users; representativeness is unknown.
- The provider list holds only nine entries whose web pages were opened during research. None was confirmed by phone. Fees, wait times and insurance are unverified, so the app says "call to confirm".
