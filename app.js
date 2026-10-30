// Early screening prototype. All state lives in memory; closing the tab erases it.
// No storage, no cookies, no network after the three local JSON files load.
"use strict";

const STR = {
  en: {
    appName: "Early screening prototype",
    langButton: "Español",
    esNotice: "",
    loadErrorTitle: "This page needs to be opened through a local server",
    loadErrorBody: "Browsers block local data files when a page is opened directly. In the screener folder, run this command, then open http://localhost:8349",
    introTitle: "A self-check for adults who wonder about reading, writing, math, attention or social differences",
    notDiagnosis: "This is a screening questionnaire you answer yourself. It cannot diagnose anything. Only a qualified professional can.",
    introBody: "You will answer 25 short questions in five areas, plus two background questions. At the end you get a result for each area in plain words, and a summary you can bring to a professional.",
    introPoint1: "Nothing you enter is saved or sent anywhere. Closing this tab erases it.",
    introPoint2: "There are no right or wrong answers. Answer for your usual experience.",
    introPoint3: "Some questions ask about childhood and some about today. Answer them separately.",
    distress: "Some of these questions can bring up hard feelings. If you are struggling or in distress right now, please reach out to a healthcare professional or local emergency services.",
    start: "Start the questions",
    seeLimitations: "See limitations",
    questionsTitle: "Questions",
    questionsHelp: "Choose the answer that fits you best. All 25 area questions need an answer. The two background questions are optional.",
    contextTitle: "Background (not scored)",
    contextHelp: "These answers only appear in your summary, to give a professional context.",
    tagValidated: "Based on validated constructs",
    tagNotValidated: "Not validated for adults",
    seeResults: "See my results",
    missing: (n) => `${n} question${n === 1 ? "" : "s"} still need an answer. They are outlined in red.`,
    resultTitle: "Your screening results",
    band_low: "No clear signal here",
    band_mid: "Some signal: keep an eye on it",
    band_high: "Worth discussing with a professional",
    nextHigh: "One or more areas are worth discussing with a professional. A qualified evaluator can take a full history and run proper tests. Your summary lists your answers so they can see the details.",
    nextLow: "No area reached the top band. A low screen does not rule anything out. If you still have concerns, the summary and the list of places to ask are here for you.",
    copingTitle: "Effort spent keeping up",
    coping_high: "You reported spending a lot of effort to keep up.",
    coping_mid: "You reported spending some extra effort to keep up.",
    coping_low: "You did not report much extra effort to keep up.",
    copingNote: "This is shown on its own because effort spent coping can hide difficulties from standard measures.",
    designNote: "The cut points for every result here are design choices, not validated thresholds.",
    doesNotTitle: "What this does not measure",
    doesNot1: "It does not measure intelligence, effort or worth.",
    doesNot2: "It cannot tell these differences apart from other things that affect reading, focus and energy, such as anxiety, depression, sleep problems, hearing or vision issues, or going to school in a second language.",
    doesNot3: "It does not replace an evaluator who takes a full history.",
    notDocumentation: "A screening result is not documentation for school or work, and will not qualify you for accommodations on its own.",
    makeSummary: "Create my summary to bring to a provider",
    findPlaces: "Find places to ask",
    startOver: "Start over (nothing was saved)",
    print: "Print or save as PDF",
    backToResults: "Back to results",
    back: "Back",
    packetTitle: "Screening summary, not a diagnosis",
    packetMeta: (date, v) => `Date: ${date} · Tool version ${v}`,
    packetNotDoc: "This document is not documentation of a disability and will not qualify you for accommodations on its own.",
    packetResults: "1. Results by area, with my answers",
    packetResultLead: "A screen suggested the following. These are self-reported answers, not test scores.",
    packetContext: "2. Background",
    packetNoAnswer: "Not answered",
    packetExamples: "3. My own examples",
    packetExamplesHelp: "Write down specific situations at work or school, such as reading speed, missed deadlines or handwriting.",
    packetGather: "4. Things to gather before the appointment",
    gather: [
      "Report cards or school records",
      "Any prior IEP or 504 plan",
      "Any prior test reports",
      "Letters from teachers or employers, if any",
      "A list of current medications",
      "Notes on sleep",
      "Recent hearing and vision checks",
      "If possible, notes from someone who knew you as a child (for example a parent or sibling) about what they remember"
    ],
    packetQuestions: "5. Questions to ask the evaluator",
    questionsNote: "",
    evalQuestions: [
      "Which tests are included?",
      "Are scores reported as standard scores?",
      "Do you have a bilingual evaluator or interpreter, and which parts are done in Spanish?",
      "What is the total fee and what does insurance or a sliding scale cover?",
      "What is the wait?",
      "Will the report meet college or employer documentation standards?",
      "Is a follow-up included?"
    ],
    packetWhere: "6. Where to take this",
    where: [
      "If you are enrolled in college: the campus accessibility office.",
      "If the difficulty affects work: Texas Workforce Solutions, Vocational Rehabilitation (TWC VR).",
      "If you are employed: your HR contact."
    ],
    packetLimits: "7. Limits of this summary",
    packetLimitsBody: "This came from a self-report screening prototype. The writing and math areas are not validated for adults. Only a qualified professional can make a diagnosis.",
    providersTitle: "Places to ask",
    providersIntro: "Every entry comes from a web page opened during our research. None was confirmed by phone. Fees, wait times and insurance are not listed because we could not verify them. Call to confirm anything before you go.",
    p_callToConfirm: "Call to confirm",
    p_unverified: "Unverified",
    p_servicesUnconfirmed: "Services unconfirmed",
    p_confidence: { H: "Source confidence: high", M: "Source confidence: medium", L: "Source confidence: low" },
    p_type: { clinic: "Clinic", fqhc: "Health center", nonprofit: "Nonprofit", vr: "State program", directory: "Directory", campus: "Campus office" },
    p_phone: "Phone",
    p_where: "Where",
    p_website: "Website",
    p_spanish: "Spanish",
    p_spanishYes: (d) => `Spanish-speaking staff stated on their website (checked ${d})`,
    p_sliding: "Sliding scale",
    p_telehealth: "Telehealth",
    p_waitlist: "Waitlist",
    p_fee: "Fees",
    p_insurance: "Insurance",
    p_yes: "Yes (per their page)",
    p_no: "No (per their page)",
    p_notes: "Notes",
    p_lastChecked: (d, by) => `Last checked ${d}; ${by}`,
    limitationsTitle: "Limitations",
    limitations: [
      "This is screening, not diagnosis. No condition is assigned to you. Only a qualified professional can diagnose.",
      "A screening result is not documentation for school or work and will not qualify you for accommodations on its own.",
      "The writing and math areas are not validated for adults. We found no validated adult self-report screener for either, so these are the least supported areas.",
      "The Spanish version was translated by the team. It is not psychometrically validated, and it was not back-translated or tested with Spanish-speaking users. Screeners have shown only partial measurement invariance across languages and countries.",
      "Our cut points and item weights are design choices with no validation.",
      "All answers are self-report. Some people mask or compensate without being aware of it, so a low result does not rule anything out.",
      "Research on reading and math differences in adults is thin; most data come from children.",
      "Online self-report screening tends to reach people with internet access, more education and an interest in the topic. Accuracy depends on who uses a tool.",
      "Nothing is stored. Your answers live only in this browser tab's memory. There are no accounts, cookies, local storage, analytics or server.",
      "The prototype includes a model trained on a public autism screening dataset (UCI, ID 426). Its label appears to be derived from the questionnaire score itself, and clinical diagnosis is not indicated. The model shows a method and a leakage check. It does not score your answers.",
      "The list of places to ask comes from web pages opened during research. Nothing was confirmed by phone, and fees, wait times and insurance are unknown."
    ],
    sourcesTitle: "Construct sources",
    sourcesNote: "Our areas draw on the constructs these instruments measure. No item from any of them is reproduced or altered here. All 25 questions are original wording written for this prototype.",
    sources: [
      "Dyslexia Adult Checklist (Smythe & Everatt, 2001; validation by Stark et al., 2024)",
      "Adult ADHD Self-Report Scale (ASRS v1.1), WHO (Kessler et al., 2005)",
      "Adult Executive Functioning Inventory (ADEXI; Holst & Thorell, 2018)",
      "Autism Spectrum Quotient-10 (AQ-10; Allison et al., 2012)",
      "Camouflaging Autistic Traits Questionnaire (CAT-Q; Hull et al., 2019)",
      "Childhood cognitive self-report, memory-clinic sample (Seifan et al., 2018)"
    ]
  },
  es: {
    appName: "Prototipo de detección temprana",
    langButton: "English",
    esNotice: "Versión en español traducida por el equipo, sin validación psicométrica.",
    loadErrorTitle: "Esta página debe abrirse con un servidor local",
    loadErrorBody: "Los navegadores bloquean los archivos de datos locales cuando la página se abre directamente. En la carpeta del proyecto ejecuta este comando y luego abre http://localhost:8349",
    introTitle: "Una autoevaluación para adultos con dudas sobre la lectura, la escritura, las matemáticas, la atención o las diferencias sociales",
    notDiagnosis: "Este es un cuestionario de detección que contestas tú. No puede diagnosticar nada. Solo un profesional calificado puede hacerlo.",
    introBody: "Vas a contestar 25 preguntas cortas en cinco áreas, más dos preguntas de contexto. Al final recibes un resultado en palabras sencillas para cada área y un resumen para llevar a un profesional.",
    introPoint1: "Nada de lo que escribes se guarda ni se envía. Al cerrar esta pestaña se borra todo.",
    introPoint2: "No hay respuestas correctas ni incorrectas. Contesta según lo que te pasa normalmente.",
    introPoint3: "Algunas preguntas son sobre tu niñez y otras sobre hoy. Contéstalas por separado.",
    distress: "Algunas de estas preguntas pueden despertar emociones difíciles. Si estás pasando por un momento difícil o sientes angustia ahora mismo, busca a un profesional de la salud o a los servicios de emergencia de tu zona.",
    start: "Empezar las preguntas",
    seeLimitations: "Ver limitaciones",
    questionsTitle: "Preguntas",
    questionsHelp: "Elige la respuesta que mejor te describa. Las 25 preguntas de las áreas necesitan respuesta. Las dos preguntas de contexto son opcionales.",
    contextTitle: "Contexto (no se califica)",
    contextHelp: "Estas respuestas solo aparecen en tu resumen, para darle contexto a un profesional.",
    tagValidated: "Basado en constructos validados",
    tagNotValidated: "No validado para adultos",
    seeResults: "Ver mis resultados",
    missing: (n) => `Faltan ${n} pregunta${n === 1 ? "" : "s"} por contestar. Están marcadas en rojo.`,
    resultTitle: "Tus resultados de detección",
    band_low: "Sin señal clara aquí",
    band_mid: "Alguna señal: ponle atención",
    band_high: "Vale la pena hablarlo con un profesional",
    nextHigh: "Una o más áreas valen la pena hablarlas con un profesional. Un evaluador calificado puede tomar tu historia completa y aplicar pruebas formales. Tu resumen incluye tus respuestas para que vea los detalles.",
    nextLow: "Ninguna área llegó al nivel más alto. Un resultado bajo no descarta nada. Si aún tienes dudas, aquí están el resumen y la lista de lugares donde preguntar.",
    copingTitle: "Esfuerzo para mantener el ritmo",
    coping_high: "Dijiste que haces mucho esfuerzo para mantener el ritmo.",
    coping_mid: "Dijiste que haces algo de esfuerzo extra para mantener el ritmo.",
    coping_low: "No dijiste hacer mucho esfuerzo extra para mantener el ritmo.",
    copingNote: "Esto se muestra por separado porque el esfuerzo de compensar puede ocultar dificultades en las mediciones habituales.",
    designNote: "Los puntos de corte de todos estos resultados son decisiones de diseño, no umbrales validados.",
    doesNotTitle: "Lo que esto no mide",
    doesNot1: "No mide la inteligencia, el esfuerzo ni tu valor como persona.",
    doesNot2: "No puede distinguir estas diferencias de otras cosas que afectan la lectura, la concentración y la energía, como la ansiedad, la depresión, los problemas de sueño, de audición o de vista, o haber estudiado en un segundo idioma.",
    doesNot3: "No sustituye a un evaluador que tome tu historia completa.",
    notDocumentation: "Un resultado de detección no es documentación para la escuela o el trabajo y por sí solo no te da derecho a adaptaciones.",
    makeSummary: "Crear mi resumen para llevar a un profesional",
    findPlaces: "Buscar dónde preguntar",
    startOver: "Empezar de nuevo (no se guardó nada)",
    print: "Imprimir o guardar como PDF",
    backToResults: "Volver a los resultados",
    back: "Volver",
    packetTitle: "Resumen de detección, no es un diagnóstico",
    packetMeta: (date, v) => `Fecha: ${date} · Versión de la herramienta ${v}`,
    packetNotDoc: "Este documento no es documentación de una discapacidad y por sí solo no te da derecho a adaptaciones.",
    packetResults: "1. Resultados por área, con mis respuestas",
    packetResultLead: "Una prueba de detección sugirió lo siguiente. Son respuestas propias, no puntajes de pruebas.",
    packetContext: "2. Contexto",
    packetNoAnswer: "Sin respuesta",
    packetExamples: "3. Mis propios ejemplos",
    packetExamplesHelp: "Anota situaciones concretas del trabajo o la escuela, como tu velocidad de lectura, fechas de entrega perdidas o tu letra.",
    packetGather: "4. Qué reunir antes de la cita",
    gather: [
      "Boletas de calificaciones o expedientes escolares",
      "Cualquier plan IEP o 504 anterior",
      "Informes de evaluaciones anteriores",
      "Cartas de maestros o empleadores, si tienes",
      "Una lista de los medicamentos que tomas",
      "Notas sobre tu sueño",
      "Revisiones recientes de audición y vista",
      "Si es posible, notas de alguien que te conoció de niño o niña (por ejemplo, tu mamá, papá o un hermano) sobre lo que recuerdan"
    ],
    packetQuestions: "5. Preguntas para el evaluador",
    questionsNote: "(Traducidas por el equipo.)",
    evalQuestions: [
      "¿Qué pruebas incluye la evaluación?",
      "¿Los puntajes se reportan como puntajes estándar?",
      "¿Tienen un evaluador bilingüe o un intérprete, y qué partes se hacen en español?",
      "¿Cuál es el costo total y qué cubre el seguro o una tarifa según ingresos?",
      "¿Cuánto hay que esperar?",
      "¿El informe cumplirá con los requisitos de documentación de la universidad o del empleador?",
      "¿Incluye una cita de seguimiento?"
    ],
    packetWhere: "6. A dónde llevar esto",
    where: [
      "Si estás inscrito o inscrita en la universidad: la oficina de accesibilidad del campus.",
      "Si la dificultad afecta tu trabajo: Texas Workforce Solutions, Vocational Rehabilitation (TWC VR).",
      "Si tienes empleo: tu contacto de Recursos Humanos."
    ],
    packetLimits: "7. Límites de este resumen",
    packetLimitsBody: "Esto viene de un prototipo de detección por autorreporte. Las áreas de escritura y matemáticas no están validadas para adultos. Solo un profesional calificado puede hacer un diagnóstico.",
    providersTitle: "Dónde preguntar",
    providersIntro: "Cada lugar viene de una página web que revisamos durante la investigación. Ninguno se confirmó por teléfono. No mostramos costos, tiempos de espera ni seguros porque no pudimos verificarlos. Llama para confirmar antes de ir.",
    p_callToConfirm: "Llama para confirmar",
    p_unverified: "Sin verificar",
    p_servicesUnconfirmed: "Servicios sin confirmar",
    p_confidence: { H: "Confianza en la fuente: alta", M: "Confianza en la fuente: media", L: "Confianza en la fuente: baja" },
    p_type: { clinic: "Clínica", fqhc: "Centro de salud", nonprofit: "Organización sin fines de lucro", vr: "Programa estatal", directory: "Directorio", campus: "Oficina del campus" },
    p_phone: "Teléfono",
    p_where: "Dónde",
    p_website: "Sitio web",
    p_spanish: "Español",
    p_spanishYes: (d) => `Su sitio web dice que tienen personal que habla español (revisado el ${d})`,
    p_sliding: "Tarifa según ingresos",
    p_telehealth: "Atención en línea",
    p_waitlist: "Lista de espera",
    p_fee: "Costos",
    p_insurance: "Seguro (nota en inglés)",
    p_yes: "Sí (según su página)",
    p_no: "No (según su página)",
    p_notes: "Notas (en inglés)",
    p_lastChecked: (d, by) => `Revisado por última vez el ${d}; ${by}`,
    limitationsTitle: "Limitaciones",
    limitations: [
      "Esto es una detección, no un diagnóstico. No se te asigna ninguna condición. Solo un profesional calificado puede diagnosticar.",
      "Un resultado de detección no es documentación para la escuela o el trabajo y por sí solo no te da derecho a adaptaciones.",
      "Las áreas de escritura y matemáticas no están validadas para adultos. No encontramos ninguna prueba de autorreporte validada para adultos en ninguna de las dos, así que son las áreas con menos respaldo.",
      "La versión en español fue traducida por el equipo. No tiene validación psicométrica, no se hizo retrotraducción y no se probó con personas hispanohablantes. Las pruebas de detección han mostrado solo una invariancia de medición parcial entre idiomas y países.",
      "Nuestros puntos de corte y los pesos de las preguntas son decisiones de diseño sin validación.",
      "Todas las respuestas son de autorreporte. Algunas personas disimulan o compensan sin darse cuenta, así que un resultado bajo no descarta nada.",
      "La investigación sobre diferencias de lectura y matemáticas en adultos es escasa; la mayoría de los datos vienen de niños.",
      "Las pruebas de autorreporte en línea suelen llegar a personas con internet, más estudios e interés en el tema. La precisión depende de quién use la herramienta.",
      "No se guarda nada. Tus respuestas solo existen en la memoria de esta pestaña. No hay cuentas, cookies, almacenamiento local, analíticas ni servidor.",
      "El prototipo incluye un modelo entrenado con un conjunto público de datos de detección de autismo (UCI, ID 426). Su etiqueta parece derivarse del propio puntaje del cuestionario y no indica diagnóstico clínico. El modelo muestra un método y una revisión de fuga de datos. No califica tus respuestas.",
      "La lista de lugares viene de páginas web revisadas durante la investigación. Nada se confirmó por teléfono, y los costos, tiempos de espera y seguros son desconocidos."
    ],
    sourcesTitle: "Fuentes de los constructos",
    sourcesNote: "Nuestras áreas se basan en los constructos que miden estos instrumentos. No se reproduce ni se modifica ninguna pregunta de ellos. Las 25 preguntas son originales, escritas para este prototipo.",
    sources: null // same citations as English
  }
};

const state = {
  lang: "en",
  screen: "intro",
  history: [],
  q: null,
  providers: [],
  report: null,
  answers: {},   // item id -> 0..3
  context: {},   // context id -> value
  result: null
};

const $ = (sel) => document.querySelector(sel);
const t = (key) => {
  const v = STR[state.lang][key];
  return v === undefined || v === null ? STR.en[key] : v;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const loc = (obj) => obj[state.lang] || obj.en;

// ---------- loading ----------
async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

async function init() {
  try {
    state.q = await loadJSON("data/questionnaire.json");
  } catch (e) {
    show("loaderror");
    applyStrings();
    return;
  }
  try { state.providers = (await loadJSON("data/providers.json")).providers || []; } catch (e) { state.providers = []; }
  try { state.report = await loadJSON("data/model_report.json"); } catch (e) { state.report = null; }

  bindEvents();
  buildForm();
  applyStrings();
  show("intro");
}

// ---------- scoring ----------
function bandFor(score) {
  if (score < 33.4) return "low";
  if (score < 60) return "mid";
  return "high";
}

function scoreAll() {
  const domains = state.q.domains.map((d) => {
    const items = state.q.items.filter((it) => it.domain === d.id);
    let sum = 0, max = 0;
    for (const it of items) {
      sum += it.weight * state.answers[it.id];
      max += it.weight * 3;
    }
    const score = (100 * sum) / max;
    return { id: d.id, score, band: bandFor(score) };
  });
  const costItems = state.q.items.filter((it) => it.type === "cost");
  const costMean = costItems.reduce((a, it) => a + state.answers[it.id], 0) / costItems.length;
  const copingScore = (100 * costMean) / 3;
  return {
    domains,
    coping: { score: copingScore, band: bandFor(copingScore) },
    anyHigh: domains.some((d) => d.band === "high"),
    date: new Date()
  };
}

// ---------- rendering ----------
function applyStrings() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = t(el.dataset.i18n);
    if (typeof v === "string") el.textContent = v;
  });
  $("#langToggle").textContent = t("langButton");
  $("#esNotice").hidden = state.lang !== "es";
  if (state.q) {
    relabelForm();
    renderLimitations();
    if (state.result) { renderResult(); renderPacket(); }
    renderProviders();
  }
}

function buildForm() {
  const form = $("#qForm");
  form.innerHTML = "";
  for (const d of state.q.domains) {
    const fs = document.createElement("fieldset");
    fs.className = "domain";
    fs.innerHTML = `<legend data-domain-name="${d.id}"></legend>
      <div><span class="tag ${d.evidence === "not_validated" ? "warn" : ""}" data-domain-tag="${d.id}"></span></div>`;
    for (const it of state.q.items.filter((x) => x.domain === d.id)) {
      fs.appendChild(radioGroup(it.id, "item", state.q.scale.map((s) => s.value)));
    }
    form.appendChild(fs);
  }
  const ctx = document.createElement("fieldset");
  ctx.className = "domain";
  ctx.innerHTML = `<legend data-i18n="contextTitle"></legend><p class="muted" data-i18n="contextHelp"></p>`;
  for (const c of state.q.context) ctx.appendChild(radioGroup(c.id, "ctx", c.options.map((o) => o.value)));
  form.appendChild(ctx);
}

function radioGroup(id, kind, values) {
  const fs = document.createElement("fieldset");
  fs.className = "item";
  fs.id = `item-${id}`;
  fs.innerHTML = `<legend id="lg-${id}"></legend><div class="opts">${values
    .map((v) => `<label class="opt"><input type="radio" name="${kind}-${id}" value="${v}"><span data-opt="${id}:${v}"></span></label>`)
    .join("")}</div>`;
  fs.addEventListener("change", (e) => {
    const v = e.target.value;
    if (kind === "item") state.answers[id] = Number(v);
    else state.context[id] = v;
    fs.classList.remove("missing");
  });
  return fs;
}

function relabelForm() {
  for (const d of state.q.domains) {
    const lg = document.querySelector(`[data-domain-name="${d.id}"]`);
    if (lg) lg.textContent = loc(d.name);
    const tag = document.querySelector(`[data-domain-tag="${d.id}"]`);
    if (tag) tag.textContent = d.evidence === "not_validated" ? t("tagNotValidated") : t("tagValidated");
  }
  for (const it of state.q.items) {
    $(`#lg-${it.id}`).textContent = loc(it);
    for (const s of state.q.scale) document.querySelector(`[data-opt="${it.id}:${s.value}"]`).textContent = loc(s);
  }
  for (const c of state.q.context) {
    $(`#lg-${c.id}`).textContent = loc(c);
    for (const o of c.options) document.querySelector(`[data-opt="${c.id}:${o.value}"]`).textContent = loc(o);
  }
  document.querySelectorAll("#qForm [data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
}

function domainById(id) { return state.q.domains.find((d) => d.id === id); }

function renderResult() {
  const r = state.result;
  $("#nextStep").innerHTML = `<p>${esc(r.anyHigh ? t("nextHigh") : t("nextLow"))}</p>
    <div class="actions"><button type="button" class="btn primary" data-go="packet">${esc(t("makeSummary"))}</button>
    <button type="button" class="btn" data-go="providers">${esc(t("findPlaces"))}</button></div>`;
  // Fixed domain order; no ranking between domains.
  $("#domainCards").innerHTML = r.domains.map((dr) => {
    const d = domainById(dr.id);
    const tag = d.evidence === "not_validated" ? t("tagNotValidated") : t("tagValidated");
    return `<div class="card ${dr.band === "high" ? "band-high" : ""}">
      <h2>${esc(loc(d.name))}</h2>
      <p class="band">${esc(t("band_" + dr.band))}</p>
      <p>${esc(loc(d.desc))}</p>
      <span class="tag ${d.evidence === "not_validated" ? "warn" : ""}">${esc(tag)}</span>
    </div>`;
  }).join("");
  $("#copingLine").innerHTML = `<h2>${esc(t("copingTitle"))}</h2>
    <p class="band">${esc(t("coping_" + r.coping.band))}</p>
    <p class="muted">${esc(t("copingNote"))} ${esc(t("designNote"))}</p>`;
}

function renderPacket() {
  const r = state.result;
  const dateStr = r.date.toLocaleDateString(state.lang === "es" ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  const scaleLabel = (v) => loc(state.q.scale.find((s) => s.value === v));
  const domains = r.domains.map((dr) => {
    const d = domainById(dr.id);
    const items = state.q.items.filter((it) => it.domain === d.id);
    const tag = d.evidence === "not_validated" ? ` (${t("tagNotValidated")})` : "";
    return `<h3>${esc(loc(d.name))}: ${esc(t("band_" + dr.band))}${esc(tag)}</h3>
      <ul class="answers">${items.map((it) => `<li>${esc(loc(it))} <strong>${esc(scaleLabel(state.answers[it.id]))}</strong></li>`).join("")}</ul>`;
  }).join("");
  const ctx = state.q.context.map((c) => {
    const v = state.context[c.id];
    const o = c.options.find((x) => x.value === v);
    return `<li>${esc(loc(c))} <strong>${esc(o ? loc(o) : t("packetNoAnswer"))}</strong></li>`;
  }).join("");
  const list = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join("");
  const lines = Array.from({ length: 6 }, () => `<div class="write-line"></div>`).join("");
  const spanishNote = state.lang === "es" ? `<p class="muted">${esc(STR.es.esNotice)}</p>` : "";

  $("#packet").innerHTML = `
    <header>
      <h1>${esc(t("packetTitle"))}</h1>
      <p>${esc(t("packetMeta")(dateStr, state.q.version))}</p>
      <p><strong>${esc(t("packetNotDoc"))}</strong></p>
      ${spanishNote}
    </header>
    <section><h2>${esc(t("packetResults"))}</h2><p>${esc(t("packetResultLead"))}</p>${domains}
      <p><strong>${esc(t("copingTitle"))}:</strong> ${esc(t("coping_" + r.coping.band))}</p>
      <p class="muted">${esc(t("designNote"))}</p></section>
    <section><h2>${esc(t("packetContext"))}</h2><ul class="answers">${ctx}</ul></section>
    <section><h2>${esc(t("packetExamples"))}</h2><p>${esc(t("packetExamplesHelp"))}</p>${lines}</section>
    <section><h2>${esc(t("packetGather"))}</h2><ul class="checklist">${list(t("gather"))}</ul></section>
    <section><h2>${esc(t("packetQuestions"))}</h2>${t("questionsNote") ? `<p class="muted">${esc(t("questionsNote"))}</p>` : ""}<ol>${list(t("evalQuestions"))}</ol></section>
    <section><h2>${esc(t("packetWhere"))}</h2><ul>${list(t("where"))}</ul></section>
    <section><h2>${esc(t("packetLimits"))}</h2><p>${esc(t("packetLimitsBody"))}</p></section>`;
}

function renderLimitations() {
  $("#limitationsList").innerHTML = t("limitations").map((x) => `<li>${esc(x)}</li>`).join("");
  $("#sourcesList").innerHTML = t("sources").map((x) => `<li>${esc(x)}</li>`).join("");
}

function triState(v) {
  if (v === true) return esc(t("p_yes"));
  if (v === false) return esc(t("p_no"));
  return `<span class="badge warn">${esc(t("p_callToConfirm"))}</span>`;
}

function renderProviders() {
  $("#providerList").innerHTML = state.providers.map((p) => {
    const es = (p.languages || []).find((l) => l.lang === "es");
    const badges = [
      `<span class="badge">${esc((t("p_type") || {})[p.type] || p.type)}</span>`,
      `<span class="badge">${esc((t("p_confidence") || {})[p.confidence] || "")}</span>`,
      !p.last_verified ? `<span class="badge warn">${esc(t("p_unverified"))}</span>` : "",
      p.services_unconfirmed ? `<span class="badge warn">${esc(t("p_servicesUnconfirmed"))}</span>` : ""
    ].join("");
    const where = [...(p.cities || []), p.state].filter(Boolean).join(", ");
    const url = /^https:\/\//.test(p.url || "") ? p.url : "";
    return `<div class="card provider">
      <h2>${esc(p.name)}</h2>
      <div class="badges">${badges}</div>
      <dl>
        ${where ? `<dt>${esc(t("p_where"))}</dt><dd>${esc(where)}</dd>` : ""}
        <dt>${esc(t("p_phone"))}</dt><dd>${p.phone ? esc(p.phone) : `<span class="badge warn">${esc(t("p_callToConfirm"))}</span>`}</dd>
        ${url ? `<dt>${esc(t("p_website"))}</dt><dd><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url.replace(/^https:\/\//, ""))}</a></dd>` : ""}
        <dt>${esc(t("p_spanish"))}</dt><dd>${es && es.verified_date ? esc(t("p_spanishYes")(es.verified_date)) : `<span class="badge warn">${esc(t("p_callToConfirm"))}</span>`}</dd>
        <dt>${esc(t("p_sliding"))}</dt><dd>${triState(p.sliding_scale)}</dd>
        <dt>${esc(t("p_telehealth"))}</dt><dd>${triState(p.telehealth)}</dd>
        <dt>${esc(t("p_waitlist"))}</dt><dd>${triState(p.waitlist)}</dd>
        <dt>${esc(t("p_insurance"))}</dt><dd>${p.insurance_note ? esc(p.insurance_note) : `<span class="badge warn">${esc(t("p_callToConfirm"))}</span>`}</dd>
        <dt>${esc(t("p_fee"))}</dt><dd><span class="badge warn">${esc(t("p_callToConfirm"))}</span></dd>
        ${p.notes ? `<dt>${esc(t("p_notes"))}</dt><dd>${esc(p.notes)}</dd>` : ""}
      </dl>
      <p class="muted">${esc(p.last_verified ? t("p_lastChecked")(p.last_verified, p.verified_by || "") : t("p_unverified"))}</p>
    </div>`;
  }).join("");
}

// ---------- navigation ----------
function show(name, push = true) {
  if (push && state.screen && state.screen !== name) state.history.push(state.screen);
  state.screen = name;
  document.querySelectorAll(".screen").forEach((s) => (s.hidden = s.id !== `screen-${name}`));
  window.scrollTo(0, 0);
}

function go(name) {
  if ((name === "packet" || name === "result") && !state.result) name = "questions";
  show(name);
}

function submit() {
  const missing = state.q.items.filter((it) => state.answers[it.id] === undefined);
  document.querySelectorAll(".item.missing").forEach((el) => el.classList.remove("missing"));
  if (missing.length) {
    missing.forEach((it) => $(`#item-${it.id}`).classList.add("missing"));
    const err = $("#qError");
    err.textContent = t("missing")(missing.length);
    err.hidden = false;
    $(`#item-${missing[0].id}`).scrollIntoView({ block: "center" });
    return;
  }
  $("#qError").hidden = true;
  state.result = scoreAll();
  renderResult();
  renderPacket();
  show("result");
}

function restart() {
  state.answers = {};
  state.context = {};
  state.result = null;
  state.history = [];
  $("#qForm").reset();
  $("#qError").hidden = true;
  $("#packet").innerHTML = "";
  show("intro", false);
}

function bindEvents() {
  document.addEventListener("click", (e) => {
    const goEl = e.target.closest("[data-go]");
    if (goEl) { go(goEl.dataset.go); return; }
    if (e.target.closest("[data-back]")) { show(state.history.pop() || "intro", false); }
  });
  $("#langToggle").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "es" : "en";
    applyStrings();
  });
  $("#submitBtn").addEventListener("click", submit);
  $("#restartBtn").addEventListener("click", restart);
  $("#printBtn").addEventListener("click", () => window.print());
}

init();
