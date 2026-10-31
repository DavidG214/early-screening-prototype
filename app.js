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
    modelLink: "How the AI part works",
    modelTitle: "Model card: how the AI part works",
    demoBtn: "Demo mode: fill in a sample set of answers",
    demoBanner: "Demo mode: these are sample answers, not a real person's.",
    mc_notScored: "This model does not score your answers.",
    mc_notScoredWhy: "Our 25 questions are original wording. The public dataset encodes a different 10-item questionnaire, so applying its weights to our questions would be a made-up mapping. Your results come only from the transparent rules described on the results screen.",
    mc_missing: "Model report not generated. The training script has not been run on real data, so no metrics are shown.",
    mc_leakTitle: "1. Leakage check (run first)",
    mc_leakBody: (acc, sens, spec, n, pos) => `A one-step rule using only the total of the dataset's own 10 questions reproduces its label with ${acc} accuracy, sensitivity ${sens}, specificity ${spec} (n = ${n}, ${pos} labelled positive; 5-fold cross-validation).`,
    mc_leakRule: (thr) => `Learned rule: a total above ${thr} is labelled positive.`,
    mc_resultEq: (eq, n) => eq ? `The dataset's "result" column equals the question total on all ${n} rows.` : `The dataset's "result" column does not always equal the question total.`,
    mc_relation: "Label rate by who filled in the form",
    mc_rel: { self: "Self", other: "Someone else", unknown: "Not recorded" },
    mc_variantsTitle: "2. Logistic regression, four variants",
    mc_variant: {
      V1_all_columns: "All columns (questions + demographics + the dataset's own score)",
      V2_items_only: "The 10 questions only",
      V2b_items_plus_demographics: "The 10 questions + demographics",
      V3_demographics_only: "Demographics only (no questions)"
    },
    mc_cols: ["Variant", "Sensitivity", "Specificity", "PPV", "n (positive)"],
    mc_threshold: "Operating point: 0.5 on class-balanced predicted probability. Mean ± SD across 5 folds.",
    mc_itemsNote: "A near-perfect result from the questions alone means the label is reachable from the questions themselves. That is the leakage finding, not a success.",
    mc_subTitle: "3. Subgroups (questions + demographics)",
    mc_subCols: ["Group", "Sensitivity", "Specificity", "PPV", "n (positive)"],
    mc_suppressed: "suppressed (n < 30 or fewer than 10 positive)",
    mc_lang: "Language subgroup: not available in this dataset; country of residence is not language.",
    mc_coefTitle: "4. Weights (questions + demographics model, top 10)",
    mc_coefNote: "Because the label is a function of the questions, these weights mostly restate the scoring rule. They are not evidence about any condition.",
    mc_caveatsTitle: "Read these with every number above",
    mc_caveatLeak: (acc) => `The dataset's label appears to be derived from the questionnaire score itself; the depth-1 check scored ${acc}. The model is reproducing a screening score, not predicting a clinical diagnosis.`,
    mc_caveatSample: "Screening-app respondents; representativeness unknown; clinical diagnosis not indicated.",
    mc_dataset: (n, lo, hi, under) => `Dataset: Autism Screening Adult, UCI Machine Learning Repository, ID 426, DOI 10.24432/C5F019, CC BY 4.0. ${n} rows. Observed ages ${lo} to ${hi}; ${under} rows are under 18 although the dataset describes adults.`,
    mc_generated: (d) => `Report generated ${d} by ml/train_uci.py.`,
    continue: "Continue",
    preTitle: "Before we start",
    preHelp: "A few background questions. Only the first one is required. These answers do not change your results; they only appear in your summary to give a professional context.",
    preRequired: "Please answer the first question to continue.",
    adultOnlyTitle: "This tool is for adults",
    adultOnlyBody: "This prototype was built for people 18 and older. If you are under 18 and have questions about reading, writing, math, attention or social differences, a parent, school counselor or doctor can help you find the right next step.",
    deepCardNA: "Too many situations did not apply to give a result here.",
    deepCardNote: "This section is not validated. It adds detail for a professional; it does not change your other results.",
    tasksIntro: "A few short, optional tasks. They record how you did and how long it took, so a professional can see real examples. We do not score them or compare them with anyone. You can skip any of them.",
    taskOf: (i, n, title) => `Task ${i} of ${n}: ${title}`,
    itemProgress: (i, n) => `${i} of ${n}`,
    countResult: (title, c, n, s) => `${title}: ${c} of ${n} correct, ${s} seconds in total.`,
    readResult: (title, w, s, c, n) => `${title}: ${w} words read in ${s} seconds; ${c} of ${n} questions answered correctly.`,
    readDone: "I'm done reading",
    readQHelp: "Answer from memory; the passage is hidden now.",
    tasksStart: "Start the tasks",
    tasksSkip: "Skip the tasks",
    skipTask: "Skip this task",
    next: "Next",
    yourAnswer: "Your answer",
    takePhoto: "Take or choose a photo",
    retakePhoto: "Use a different photo",
    finishTasks: "Finish",
    tasksDone: "Thanks. Your task results are in your summary.",
    toResults: "Back to my results",
    beginTask: "Begin",
    noNorms: "No adult norms are used here, and these results are not scored. A professional can interpret them.",
    taskSkipped: "Skipped",
    taskPhoto: "Photo of work on paper",
    taskPhotoNone: "No photo added.",
    packetPre: "Background questions",
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
      "The list of places to ask comes from web pages opened during research. Nothing was confirmed by phone, and fees, wait times and insurance are unknown.",
      "The closer look at numbers and the hands-on tasks are not validated. Task times are not compared with any norms; they are examples for a professional to interpret.",
      "If you add a photo, it stays on this device in this tab only. It is never uploaded or analysed, and it is erased when you close the tab or start over."
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
    modelLink: "Cómo funciona la parte de IA",
    modelTitle: "Ficha del modelo: cómo funciona la parte de IA",
    demoBtn: "Modo demo: llenar con respuestas de ejemplo",
    demoBanner: "Modo demo: son respuestas de ejemplo, no de una persona real.",
    mc_notScored: "Este modelo no califica tus respuestas.",
    mc_notScoredWhy: "Nuestras 25 preguntas son originales. El conjunto de datos público usa otro cuestionario de 10 preguntas, así que aplicar sus pesos a nuestras preguntas sería una correspondencia inventada. Tus resultados vienen solo de las reglas transparentes descritas en la pantalla de resultados.",
    mc_missing: "No se generó el informe del modelo. El script de entrenamiento no se ha ejecutado con datos reales, así que no se muestran métricas.",
    mc_leakTitle: "1. Revisión de fuga de datos (se ejecuta primero)",
    mc_leakBody: (acc, sens, spec, n, pos) => `Una regla de un solo paso, usando solo el total de las 10 preguntas del propio conjunto de datos, reproduce su etiqueta con ${acc} de exactitud, sensibilidad ${sens}, especificidad ${spec} (n = ${n}, ${pos} etiquetados positivos; validación cruzada de 5 particiones).`,
    mc_leakRule: (thr) => `Regla aprendida: un total mayor que ${thr} se etiqueta como positivo.`,
    mc_resultEq: (eq, n) => eq ? `La columna "result" del conjunto de datos es igual al total de las preguntas en las ${n} filas.` : `La columna "result" no siempre es igual al total de las preguntas.`,
    mc_relation: "Tasa de etiqueta según quién llenó el formulario",
    mc_rel: { self: "La misma persona", other: "Otra persona", unknown: "No registrado" },
    mc_variantsTitle: "2. Regresión logística, cuatro variantes",
    mc_variant: {
      V1_all_columns: "Todas las columnas (preguntas + datos demográficos + el puntaje propio del conjunto)",
      V2_items_only: "Solo las 10 preguntas",
      V2b_items_plus_demographics: "Las 10 preguntas + datos demográficos",
      V3_demographics_only: "Solo datos demográficos (sin preguntas)"
    },
    mc_cols: ["Variante", "Sensibilidad", "Especificidad", "VPP", "n (positivos)"],
    mc_threshold: "Punto de operación: 0.5 sobre la probabilidad predicha con clases balanceadas. Media ± DE en 5 particiones.",
    mc_itemsNote: "Un resultado casi perfecto solo con las preguntas significa que la etiqueta se obtiene de las propias preguntas. Ese es el hallazgo de fuga de datos, no un éxito.",
    mc_subTitle: "3. Subgrupos (preguntas + datos demográficos)",
    mc_subCols: ["Grupo", "Sensibilidad", "Especificidad", "VPP", "n (positivos)"],
    mc_suppressed: "omitido (n < 30 o menos de 10 positivos)",
    mc_lang: "Subgrupo por idioma: no disponible en este conjunto de datos; el país de residencia no es el idioma.",
    mc_coefTitle: "4. Pesos (modelo de preguntas + datos demográficos, los 10 mayores)",
    mc_coefNote: "Como la etiqueta es una función de las preguntas, estos pesos casi solo repiten la regla de puntaje. No son evidencia sobre ninguna condición.",
    mc_caveatsTitle: "Lee esto junto con cada número de arriba",
    mc_caveatLeak: (acc) => `La etiqueta del conjunto de datos parece derivarse del propio puntaje del cuestionario; la revisión de profundidad 1 obtuvo ${acc}. El modelo reproduce un puntaje de detección, no predice un diagnóstico clínico.`,
    mc_caveatSample: "Personas que usaron una app de detección; representatividad desconocida; no se indica diagnóstico clínico.",
    mc_dataset: (n, lo, hi, under) => `Datos: Autism Screening Adult, UCI Machine Learning Repository, ID 426, DOI 10.24432/C5F019, CC BY 4.0. ${n} filas. Edades observadas de ${lo} a ${hi}; ${under} filas son menores de 18 aunque el conjunto dice ser de adultos.`,
    mc_generated: (d) => `Informe generado el ${d} por ml/train_uci.py.`,
    continue: "Continuar",
    preTitle: "Antes de empezar",
    preHelp: "Unas preguntas de contexto. Solo la primera es obligatoria. Estas respuestas no cambian tus resultados; solo aparecen en tu resumen para darle contexto a un profesional.",
    preRequired: "Contesta la primera pregunta para continuar.",
    adultOnlyTitle: "Esta herramienta es para adultos",
    adultOnlyBody: "Este prototipo se hizo para personas de 18 años o más. Si eres menor de 18 y tienes dudas sobre la lectura, la escritura, las matemáticas, la atención o las diferencias sociales, tu mamá, papá, un orientador escolar o un médico pueden ayudarte a encontrar el siguiente paso.",
    deepCardNA: "Demasiadas situaciones no aplicaban para dar un resultado aquí.",
    deepCardNote: "Esta sección no está validada. Agrega detalles para un profesional; no cambia tus otros resultados.",
    tasksIntro: "Unas tareas cortas y opcionales. Registran cómo te fue y cuánto tardaste, para que un profesional vea ejemplos reales. No las calificamos ni las comparamos con nadie. Puedes saltarte cualquiera.",
    taskOf: (i, n, title) => `Tarea ${i} de ${n}: ${title}`,
    itemProgress: (i, n) => `${i} de ${n}`,
    countResult: (title, c, n, s) => `${title}: ${c} de ${n} correctas, ${s} segundos en total.`,
    readResult: (title, w, s, c, n) => `${title}: ${w} palabras leídas en ${s} segundos; ${c} de ${n} preguntas contestadas correctamente.`,
    readDone: "Terminé de leer",
    readQHelp: "Contesta de memoria; el texto ya no está a la vista.",
    tasksStart: "Empezar las tareas",
    tasksSkip: "Saltar las tareas",
    skipTask: "Saltar esta tarea",
    next: "Siguiente",
    yourAnswer: "Tu respuesta",
    takePhoto: "Tomar o elegir una foto",
    retakePhoto: "Usar otra foto",
    finishTasks: "Terminar",
    tasksDone: "Gracias. Los resultados de las tareas están en tu resumen.",
    toResults: "Volver a mis resultados",
    beginTask: "Empezar",
    noNorms: "Aquí no se usan normas para adultos y estos resultados no se califican. Un profesional puede interpretarlos.",
    taskSkipped: "Omitida",
    taskPhoto: "Foto del trabajo en papel",
    taskPhotoNone: "No se agregó foto.",
    packetPre: "Preguntas de contexto",
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
      "La lista de lugares viene de páginas web revisadas durante la investigación. Nada se confirmó por teléfono, y los costos, tiempos de espera y seguros son desconocidos.",
      "La sección detallada de números y las tareas prácticas no están validadas. Los tiempos no se comparan con ninguna norma; son ejemplos para que un profesional los interprete.",
      "Si agregas una foto, se queda en este dispositivo, solo en esta pestaña. Nunca se sube ni se analiza, y se borra al cerrar la pestaña o empezar de nuevo."
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
  pre: {},       // prescreen id -> value (context only, never scored)
  mods: {},       // module id -> definition from data/modules/
  activeMod: null,
  modAnswers: {}, // module item id -> 0..3, or null for "doesn't apply"
  modResults: {}, // module id -> { band, applied }
  tasks: {},      // module id -> { i: task index (-1 intro), runs: [] }
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
  // Loaded up front so nothing is requested after page load.
  for (const id of MODULE_IDS) {
    try { state.mods[id] = await loadJSON(`data/modules/${id}.json`); } catch (e) { /* module simply not offered */ }
  }

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
    if (state.activeMod) { relabelModule(); if (state.screen === "tasks") renderTasks(); }
    renderProviders();
    renderModel();
  }
  document.querySelectorAll(".demo-banner").forEach((el) => (el.hidden = !state.demo));
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

  const pre = $("#preForm");
  pre.innerHTML = "";
  for (const p of state.q.prescreen) pre.appendChild(radioGroup(p.id, "pre", p.options.map((o) => o.value)));
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
    else if (kind === "pre") state.pre[id] = v;
    else if (kind === "mod") state.modAnswers[id] = v === "na" ? null : Number(v);
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
  for (const p of state.q.prescreen) {
    $(`#lg-${p.id}`).textContent = loc(p);
    for (const o of p.options) document.querySelector(`[data-opt="${p.id}:${o.value}"]`).textContent = loc(o);
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
  renderDeep();
}

// ---------- model card (read-only view of data/model_report.json) ----------
const pct = (x) => (x === null || x === undefined ? "—" : `${(100 * x).toFixed(1)}%`);
const pctSd = (m) => (m && m.mean !== null ? `${pct(m.mean)} ± ${(100 * m.sd).toFixed(1)}` : "—");

function caveatBlock(r) {
  const acc = pct(r.leakage_check.cv_accuracy.mean);
  return `<div class="caveats"><strong>${esc(t("mc_caveatsTitle"))}</strong><ul>
    <li>${esc(t("mc_caveatLeak")(acc))}</li><li>${esc(t("mc_caveatSample"))}</li></ul></div>`;
}

function renderModel() {
  const box = $("#modelCard");
  const r = state.report;
  const notScored = `<div class="card next-step"><p class="band">${esc(t("mc_notScored"))}</p><p>${esc(t("mc_notScoredWhy"))}</p></div>`;
  // The leakage block must exist before any metric is shown; otherwise hide all metric panels.
  if (!r || !r.generated || !r.leakage_check || !r.variants) {
    box.innerHTML = notScored + `<div class="card"><p>${esc(t("mc_missing"))}</p></div>`;
    return;
  }
  const L = r.leakage_check, d = r.dataset, V2 = r.variants.V2_items_only;
  const relRows = Object.entries(L.label_rate_by_relation || {}).map(([k, v]) =>
    `<tr><td>${esc((t("mc_rel") || {})[k] || k)}</td><td>${pct(v.label_rate)}</td><td>${v.n}</td></tr>`).join("");
  const leak = `<div class="card metric"><h2>${esc(t("mc_leakTitle"))}</h2>
    <p class="band">${esc(t("mc_leakBody")(pct(L.cv_accuracy.mean), pct(L.cv_sensitivity.mean), pct(L.cv_specificity.mean), d.n_rows, V2.n_positive))}</p>
    <p>${esc(t("mc_leakRule")(L.threshold_value))} ${esc(t("mc_resultEq")(L.result_equals_item_sum && L.result_equals_item_sum.all_rows_equal, d.n_rows))}</p>
    <table><caption>${esc(t("mc_relation"))}</caption><tbody>${relRows}</tbody></table>
    ${caveatBlock(r)}</div>`;

  const cols = t("mc_cols");
  const vRows = Object.entries(r.variants).map(([k, v]) =>
    `<tr><td>${esc((t("mc_variant") || {})[k] || k)}</td><td>${pctSd(v.sensitivity)}</td><td>${pctSd(v.specificity)}</td><td>${pctSd(v.ppv)}</td><td>${v.n} (${v.n_positive})</td></tr>`).join("");
  const variants = `<div class="card metric"><h2>${esc(t("mc_variantsTitle"))}</h2>
    <div class="table-wrap"><table><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${vRows}</tbody></table></div>
    <p class="muted">${esc(t("mc_threshold"))}</p><p>${esc(t("mc_itemsNote"))}</p>${caveatBlock(r)}</div>`;

  const S = r.subgroups && r.subgroups.V2b_items_plus_demographics;
  const gLabel = (g) => (state.lang === "es" ? { female: "Mujeres", male: "Hombres", unknown: "No registrado" }[g] : { female: "Women", male: "Men", unknown: "Not recorded" }[g]) || g;
  const subRows = (obj) => Object.entries(obj || {}).map(([g, v]) => v.suppressed
    ? `<tr><td>${esc(gLabel(g))}</td><td colspan="3" class="muted">${esc(t("mc_suppressed"))}</td><td>${v.n} (${v.n_positive})</td></tr>`
    : `<tr><td>${esc(gLabel(g))}</td><td>${pct(v.sensitivity)}</td><td>${pct(v.specificity)}</td><td>${pct(v.ppv)}</td><td>${v.n} (${v.n_positive})</td></tr>`).join("");
  const subs = S ? `<div class="card metric"><h2>${esc(t("mc_subTitle"))}</h2>
    <div class="table-wrap"><table><thead><tr>${t("mc_subCols").map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${subRows(S.by_gender)}${subRows(S.by_age_band)}</tbody></table></div>
    <p class="muted">${esc(t("mc_threshold"))}</p><p class="muted">${esc(t("mc_lang"))}</p>${caveatBlock(r)}</div>` : "";

  const coefs = ((r.coefficients || {}).V2b_items_plus_demographics || []).slice(0, 10);
  const maxC = Math.max(...coefs.map((c) => Math.abs(c.coefficient)), 1e-9);
  const coef = coefs.length ? `<div class="card metric"><h2>${esc(t("mc_coefTitle"))}</h2>
    <div class="coefs">${coefs.map((c) => `<div class="coef"><span>${esc(c.feature.replace(/^(num|cat)__/, ""))}</span>
      <span class="bar ${c.coefficient < 0 ? "neg" : ""}" style="width:${(100 * Math.abs(c.coefficient) / maxC).toFixed(0)}%"></span>
      <span class="val">${c.coefficient.toFixed(2)}</span></div>`).join("")}</div>
    <p class="muted">${esc(t("mc_coefNote"))}</p>${caveatBlock(r)}</div>` : "";

  const ages = d.age_range_observed || {};
  box.innerHTML = notScored + leak + variants + subs + coef +
    `<p class="muted">${esc(t("mc_dataset")(d.n_rows, ages.min, ages.max, ages.n_under_18))}</p>
     <p class="muted">${esc(t("mc_generated")(String(r.generated_at || "").slice(0, 10)))}</p>`;
}

// ---------- demo mode: a plausible sample answer set, filled instantly ----------
const DEMO = {
  pre: { adult: "yes", education: "some_college", school_lang: "both", home_lang: "both", gender: "woman" },
  answers: { A1: 2, A2: 3, A3: 2, A4: 3, A5: 2, A6: 3, B1: 1, B2: 1, B3: 2, B4: 1, C1: 2, C2: 2, C3: 1, C4: 2,
    D1: 2, D2: 3, D3: 2, D4: 2, D5: 1, D6: 3, E1: 1, E2: 1, E3: 2, E4: 1, E5: 2 },
  context: { family: "yes", school: "informal" }
};

function runDemo() {
  restart();
  const pick = (name, v) => { const el = document.querySelector(`input[name="${name}"][value="${v}"]`); if (el) el.click(); };
  for (const [k, v] of Object.entries(DEMO.pre)) pick(`pre-${k}`, v);
  for (const [k, v] of Object.entries(DEMO.answers)) pick(`item-${k}`, v);
  for (const [k, v] of Object.entries(DEMO.context)) pick(`ctx-${k}`, v);
  state.demo = true;
  submit();
}

// ---------- closer looks: optional deeper modules (data/modules/*.json) ----------
const MODULE_IDS = ["reading", "math"]; // same order as the areas on the result screen
const activeMod = () => state.mods[state.activeMod];

function scoreModule(m) {
  const vals = m.items.map((it) => state.modAnswers[it.id]).filter((v) => v !== null && v !== undefined);
  // Need at least half the situations to apply before giving a band.
  if (vals.length < Math.ceil(m.items.length / 2)) return { band: null, applied: vals.length };
  const score = (100 * vals.reduce((a, b) => a + b, 0)) / (3 * vals.length);
  return { band: bandFor(score), applied: vals.length };
}

function renderDeep() {
  const area = $("#deepArea");
  if (!state.result) { area.innerHTML = ""; return; }
  area.innerHTML = MODULE_IDS.filter((id) => state.mods[id]).map((id) => {
    const m = state.mods[id], r = state.modResults[id];
    if (!r) {
      const c = state.result.domains.find((d) => d.id === m.domain);
      const strong = c && c.band !== "low";
      return `<div class="card ${strong ? "band-high" : ""}">
        <p>${esc(loc(strong ? m.offer.high : m.offer.low))}</p>
        <div class="actions"><button type="button" class="btn ${strong ? "primary" : ""}" data-module="${id}">${esc(loc(m.go))}</button></div>
      </div>`;
    }
    return `<div class="card">
      <h2>${esc(loc(m.title))}</h2>
      <p class="band">${esc(r.band ? t("band_" + r.band) : t("deepCardNA"))}</p>
      <span class="tag warn">${esc(t("tagNotValidated"))}</span>
      <p class="muted">${esc(t("deepCardNote"))}</p>
      ${tasksSummaryHTML(id)}
    </div>`;
  }).join("");
}

function openModule(id) {
  state.activeMod = id;
  const m = state.mods[id], form = $("#modForm");
  form.innerHTML = "";
  for (const it of m.items) form.appendChild(radioGroup(it.id, "mod", [...it.options.map((o) => o.v), ...(it.no_na ? [] : ["na"])]));
  relabelModule();
  for (const it of m.items) { // restore answers if the person comes back
    const v = state.modAnswers[it.id];
    if (v === undefined) continue;
    const el = form.querySelector(`input[name="mod-${it.id}"][value="${v === null ? "na" : v}"]`);
    if (el) el.checked = true;
  }
  $("#modError").hidden = true;
  show("module");
}

function relabelModule() {
  const m = activeMod();
  if (!m || !$(`#lg-${m.items[0].id}`)) return;
  $("#modTitle").textContent = loc(m.title);
  $("#modHelp").textContent = loc(m.help);
  for (const it of m.items) {
    $(`#lg-${it.id}`).textContent = loc(it);
    for (const o of it.options) document.querySelector(`[data-opt="${it.id}:${o.v}"]`).textContent = loc(o);
    const na = document.querySelector(`[data-opt="${it.id}:na"]`);
    if (na) na.textContent = loc(m.na);
  }
}

function submitModule() {
  const id = state.activeMod, m = activeMod();
  const missing = m.items.filter((it) => !(it.id in state.modAnswers));
  document.querySelectorAll("#modForm .item.missing").forEach((el) => el.classList.remove("missing"));
  if (missing.length) {
    missing.forEach((it) => $(`#item-${it.id}`).classList.add("missing"));
    $("#modError").textContent = t("missing")(missing.length);
    $("#modError").hidden = false;
    $(`#item-${missing[0].id}`).scrollIntoView({ block: "center" });
    return;
  }
  $("#modError").hidden = true;
  state.modResults[id] = scoreModule(m);
  revokePhotos(id);
  state.tasks[id] = { i: -1, runs: [] };
  renderTasks();
  show("tasks");
}

// ---------- hands-on tasks (recorded, never scored or compared with anyone) ----------
const secs = (ms) => Math.round(ms / 1000);
const txt = (x) => (typeof x === "string" ? x : loc(x));
const words = (s) => s.trim().split(/\s+/).length;

function normAnswer(s) {
  return String(s).toLowerCase().replace(/\s+/g, "").replace(/\$/g, "").replace(/[ap]\.?m\.?$/, "");
}

// Each task type: start() -> run state, render() -> html, click() -> true if handled, summary() -> one line.
const TASKS = {
  compare: {
    start: () => ({ k: 0, correct: 0, t0: performance.now(), ms: 0 }),
    render: (task, run) => {
      const p = task.pairs[run.k];
      return `<p class="muted">${esc(t("itemProgress")(run.k + 1, task.pairs.length))}</p>
        <div class="pair"><button type="button" class="btn big" data-pick="a">${esc(p.a)}</button>
        <button type="button" class="btn big" data-pick="b">${esc(p.b)}</button></div>`;
    },
    click: (e, task, run) => {
      const pick = e.target.closest("[data-pick]");
      if (!pick) return false;
      const p = task.pairs[run.k];
      if ((pick.dataset.pick === "a" ? p.av : p.bv) === Math.max(p.av, p.bv)) run.correct++;
      if (++run.k >= task.pairs.length) { run.ms = performance.now() - run.t0; run.done = true; }
      return true;
    },
    summary: (task, run) => t("countResult")(loc(task.title), run.correct, task.pairs.length, secs(run.ms))
  },
  mental: {
    start: () => ({ k: 0, items: [], q0: performance.now() }),
    render: (task, run) => `<p class="muted">${esc(t("itemProgress")(run.k + 1, task.problems.length))}</p>
        <p class="problem">${esc(txt(task.problems[run.k].q))}</p>
        <label class="answer-label">${esc(t("yourAnswer"))}
          <input id="mentalInput" type="text" inputmode="decimal" autocomplete="off" enterkeyhint="next"></label>
        <div class="actions"><button type="button" class="btn primary" id="mentalNext">${esc(t("next"))}</button></div>`,
    click: (e, task, run) => {
      if (!e.target.closest("#mentalNext")) return false;
      TASKS.mental.next(task, run);
      return true;
    },
    next: (task, run) => {
      const val = $("#mentalInput").value.trim();
      const ok = task.problems[run.k].a.map(normAnswer).includes(normAnswer(val));
      run.items.push({ answer: val, correct: ok, ms: performance.now() - run.q0 });
      run.q0 = performance.now();
      if (++run.k >= task.problems.length) run.done = true;
    },
    summary: (task, run) => t("countResult")(loc(task.title), run.items.filter((x) => x.correct).length,
      task.problems.length, secs(run.items.reduce((a, x) => a + x.ms, 0))),
    detail: (task, run) => `<ul class="answers">${run.items.map((x, i) =>
      `<li>${esc(txt(task.problems[i].q))} → <strong>${esc(x.answer || "—")}</strong> (${x.correct ? "✓" : "✗"}, ${secs(x.ms)} s)</li>`).join("")}</ul>`
  },
  choose: {
    // The word list is fixed to the language active when the task starts.
    start: () => ({ k: 0, correct: 0, t0: performance.now(), ms: 0, lang: state.lang, picks: [] }),
    render: (task, run) => {
      const list = task.items[run.lang] || task.items.en, opts = list[run.k];
      const order = opts.map((_, i) => (i + run.k) % opts.length); // vary where the right answer sits
      return `<p class="muted">${esc(t("itemProgress")(run.k + 1, list.length))}</p>
        <div class="choices">${order.map((i) => `<button type="button" class="btn big word" data-choose="${i}">${esc(opts[i])}</button>`).join("")}</div>`;
    },
    click: (e, task, run) => {
      const b = e.target.closest("[data-choose]");
      if (!b) return false;
      const list = task.items[run.lang] || task.items.en, i = Number(b.dataset.choose);
      if (i === 0) run.correct++;
      run.picks.push({ picked: list[run.k][i], right: list[run.k][0] });
      if (++run.k >= list.length) { run.ms = performance.now() - run.t0; run.done = true; }
      return true;
    },
    summary: (task, run) => t("countResult")(loc(task.title), run.correct, run.picks.length, secs(run.ms)),
    detail: (task, run) => `<ul class="answers">${run.picks.map((p) =>
      `<li>${esc(p.picked)} ${p.picked === p.right ? "✓" : `✗ (${esc(p.right)})`}</li>`).join("")}</ul>`
  },
  read: {
    start: () => ({ phase: "reading", t0: performance.now(), lang: state.lang, q: 0, correct: 0, answers: [] }),
    render: (task, run) => {
      if (run.phase === "reading") {
        const text = task.passage[run.lang] || task.passage.en;
        return `<div class="passage">${text.split("\n\n").map((p) => `<p>${esc(p)}</p>`).join("")}</div>
          <div class="actions"><button type="button" class="btn primary" data-read-done>${esc(t("readDone"))}</button></div>`;
      }
      const q = task.questions[run.q];
      return `<p class="muted">${esc(t("readQHelp"))} ${esc(t("itemProgress")(run.q + 1, task.questions.length))}</p>
        <p class="problem small">${esc(loc(q.q))}</p>
        <div class="choices">${q.options.map((o, i) => `<button type="button" class="btn" data-answer="${i}">${esc(loc(o))}</button>`).join("")}</div>`;
    },
    click: (e, task, run) => {
      if (e.target.closest("[data-read-done]")) { run.readMs = performance.now() - run.t0; run.phase = "questions"; return true; }
      const b = e.target.closest("[data-answer]");
      if (!b) return false;
      const q = task.questions[run.q], i = Number(b.dataset.answer);
      if (i === q.c) run.correct++;
      run.answers.push(i === q.c);
      if (++run.q >= task.questions.length) run.done = true;
      return true;
    },
    summary: (task, run) => t("readResult")(loc(task.title), words(task.passage[run.lang] || task.passage.en),
      secs(run.readMs), run.correct, task.questions.length)
  },
  paper: {
    render: (task, run) => `<ol class="problem-list">${task.problems.map((x) => `<li>${esc(txt(x))}</li>`).join("")}</ol>
      <label class="btn file-btn">${esc(run.photoUrl ? t("retakePhoto") : t("takePhoto"))}
        <input id="photoInput" type="file" accept="image/*" capture="environment" hidden></label>
      ${run.photoUrl ? `<img class="work-photo" src="${run.photoUrl}" alt="${esc(t("taskPhoto"))}">` : ""}`,
    summary: (task, run) => `${loc(task.title)}: ${run && run.photoUrl ? t("taskPhoto") : t("taskPhotoNone")}`
  }
};

function renderTasks() {
  const id = state.activeMod, m = state.mods[id], T = state.tasks[id], area = $("#taskArea");
  if (!T) return;
  $("#tasksTitle").textContent = loc(m.tasksTitle);
  if (T.i < 0) {
    area.innerHTML = `<p>${esc(t("tasksIntro"))}</p><p class="muted">${esc(t("noNorms"))}</p>
      <div class="actions"><button type="button" class="btn primary" data-task-go="0">${esc(t("tasksStart"))}</button>
      <button type="button" class="btn" data-task-go="end">${esc(t("tasksSkip"))}</button></div>`;
    return;
  }
  if (T.i >= m.tasks.length) {
    area.innerHTML = `<p>${esc(t("tasksDone"))}</p>${tasksSummaryHTML(id)}
      <div class="actions"><button type="button" class="btn primary" data-go="result">${esc(t("toResults"))}</button></div>`;
    return;
  }
  const task = m.tasks[T.i], run = T.runs[T.i];
  const head = `<h2>${esc(t("taskOf")(T.i + 1, m.tasks.length, loc(task.title)))}</h2>`;
  const next = `<button type="button" class="btn" data-task-go="${T.i + 1}">${esc(t("skipTask"))}</button>`;
  if (task.type === "paper") {
    area.innerHTML = `${head}<p>${esc(loc(task.help))}</p>${TASKS.paper.render(task, run || {})}
      <div class="actions"><button type="button" class="btn primary" data-task-go="${T.i + 1}">${esc(t("finishTasks"))}</button>${run && run.photoUrl ? "" : next}</div>`;
    return;
  }
  if (!run) {
    area.innerHTML = `${head}<p>${esc(loc(task.help))}</p>
      <div class="actions"><button type="button" class="btn primary" data-begin>${esc(t("beginTask"))}</button>${next}</div>`;
    return;
  }
  area.innerHTML = head + TASKS[task.type].render(task, run);
  const input = $("#mentalInput");
  if (input) setTimeout(() => input.focus(), 0);
}

function advanceIfDone(id) {
  const m = state.mods[id], T = state.tasks[id], run = T.runs[T.i];
  if (run && run.done) T.i++;
  renderTasks();
  if (T.i >= m.tasks.length) renderAfterTasks();
}

function onTaskClick(e) {
  const id = state.activeMod, m = state.mods[id], T = state.tasks[id];
  const jump = e.target.closest("[data-task-go]");
  if (jump) {
    T.i = jump.dataset.taskGo === "end" ? m.tasks.length : Number(jump.dataset.taskGo);
    renderTasks();
    if (T.i >= m.tasks.length) renderAfterTasks();
    return;
  }
  const task = m.tasks[T.i];
  if (!task) return;
  if (e.target.closest("[data-begin]")) { T.runs[T.i] = TASKS[task.type].start(task); renderTasks(); return; }
  const run = T.runs[T.i];
  if (run && TASKS[task.type].click && TASKS[task.type].click(e, task, run)) advanceIfDone(id);
}

function onTaskKey(e) {
  if (e.key !== "Enter" || e.target.id !== "mentalInput") return;
  e.preventDefault();
  const id = state.activeMod, T = state.tasks[id], task = state.mods[id].tasks[T.i];
  TASKS.mental.next(task, T.runs[T.i]);
  advanceIfDone(id);
}

function onPhoto(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  const T = state.tasks[state.activeMod];
  const run = T.runs[T.i] || (T.runs[T.i] = {});
  if (run.photoUrl) URL.revokeObjectURL(run.photoUrl);
  run.photoUrl = URL.createObjectURL(f); // memory only; never uploaded
  run.done = true;
  renderTasks();
}

function revokePhotos(id) {
  const T = state.tasks[id];
  if (T) T.runs.forEach((r) => r && r.photoUrl && URL.revokeObjectURL(r.photoUrl));
}

function tasksSummaryHTML(id, withDetail = false) {
  const m = state.mods[id], T = state.tasks[id];
  if (!T || T.i < m.tasks.length) return "";
  const rows = m.tasks.map((task, k) => {
    const run = T.runs[k], kind = TASKS[task.type];
    if (task.type === "paper") {
      if (!withDetail || !run || !run.photoUrl) return `<li>${esc(kind.summary(task, run))}</li>`;
      return `<li>${esc(kind.summary(task, run))}<p class="muted">${task.problems.map((x) => esc(txt(x))).join(" · ")}</p>
        <img class="work-photo" src="${run.photoUrl}" alt="${esc(t("taskPhoto"))}"></li>`;
    }
    if (!run || !run.done) return `<li>${esc(loc(task.title))}: ${esc(t("taskSkipped"))}</li>`;
    return `<li>${esc(kind.summary(task, run))}${withDetail && kind.detail ? kind.detail(task, run) : ""}</li>`;
  }).join("");
  return `<ul class="task-results">${rows}</ul><p class="muted">${esc(t("noNorms"))}</p>`;
}

function renderAfterTasks() { renderDeep(); renderPacket(); }

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
  const ctx = [...state.q.prescreen, ...state.q.context].map((c) => {
    const v = c.id in state.pre ? state.pre[c.id] : state.context[c.id];
    const o = c.options.find((x) => x.value === v);
    return `<li>${esc(loc(c))} <strong>${esc(o ? loc(o) : t("packetNoAnswer"))}</strong></li>`;
  }).join("");
  const list = (arr) => arr.map((x) => `<li>${esc(x)}</li>`).join("");
  const lines = Array.from({ length: 6 }, () => `<div class="write-line"></div>`).join("");
  const spanishNote = state.lang === "es" ? `<p class="muted">${esc(STR.es.esNotice)}</p>` : "";
  const deep = MODULE_IDS.filter((id) => state.modResults[id]).map((id) => {
    const m = state.mods[id], res = state.modResults[id];
    const opt = (it) => {
      const v = state.modAnswers[it.id];
      return v === null ? loc(m.na) : loc(it.options.find((o) => o.v === v));
    };
    const tasks = tasksSummaryHTML(id, true);
    return `<h3>${esc(loc(m.title))}: ${esc(res.band ? t("band_" + res.band) : t("deepCardNA"))} (${esc(t("tagNotValidated"))})</h3>
      <ul class="answers">${m.items.map((it) => `<li>${esc(loc(it))} <strong>${esc(opt(it))}</strong></li>`).join("")}</ul>
      ${tasks ? `<h3>${esc(loc(m.tasksTitle))}</h3>${tasks}` : ""}`;
  }).join("");

  $("#packet").innerHTML = `
    <header>
      ${state.demo ? `<p class="demo-banner">${esc(t("demoBanner"))}</p>` : ""}
      <h1>${esc(t("packetTitle"))}</h1>
      <p>${esc(t("packetMeta")(dateStr, state.q.version))}</p>
      <p><strong>${esc(t("packetNotDoc"))}</strong></p>
      ${spanishNote}
    </header>
    <section><h2>${esc(t("packetResults"))}</h2><p>${esc(t("packetResultLead"))}</p>${domains}
      <p><strong>${esc(t("copingTitle"))}:</strong> ${esc(t("coping_" + r.coping.band))}</p>
      <p class="muted">${esc(t("designNote"))}</p>${deep}</section>
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
  if (["packet", "result", "module", "tasks"].includes(name) && !state.result) name = "questions";
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
  document.querySelectorAll(".demo-banner").forEach((el) => (el.hidden = !state.demo));
  show("result");
}

function restart() {
  state.answers = {};
  state.context = {};
  state.pre = {};
  state.modAnswers = {};
  state.modResults = {};
  Object.keys(state.tasks).forEach(revokePhotos);
  state.tasks = {};
  state.activeMod = null;
  state.result = null;
  state.demo = false;
  state.history = [];
  $("#qForm").reset();
  $("#preForm").reset();
  $("#modForm").innerHTML = "";
  $("#taskArea").innerHTML = "";
  $("#deepArea").innerHTML = "";
  $("#qError").hidden = true;
  $("#packet").innerHTML = "";
  show("intro", false);
}

function bindEvents() {
  document.addEventListener("click", (e) => {
    const modEl = e.target.closest("[data-module]");
    if (modEl) { openModule(modEl.dataset.module); return; }
    const goEl = e.target.closest("[data-go]");
    if (goEl) { go(goEl.dataset.go); return; }
    if (e.target.closest("[data-back]")) { show(state.history.pop() || "intro", false); }
  });
  $("#langToggle").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "es" : "en";
    applyStrings();
  });
  $("#submitBtn").addEventListener("click", submit);
  $("#preNext").addEventListener("click", () => {
    const err = $("#preError");
    if (!state.pre.adult) { err.textContent = t("preRequired"); err.hidden = false; return; }
    err.hidden = true;
    show(state.pre.adult === "yes" ? "questions" : "adultonly");
  });
  $("#adultBack").addEventListener("click", () => show("prescreen", false));
  $("#modSubmit").addEventListener("click", submitModule);
  $("#demoBtn").addEventListener("click", runDemo);
  $("#taskArea").addEventListener("click", onTaskClick);
  $("#taskArea").addEventListener("change", (e) => { if (e.target.id === "photoInput") onPhoto(e); });
  $("#taskArea").addEventListener("keydown", onTaskKey);
  $("#restartBtn").addEventListener("click", restart);
  $("#printBtn").addEventListener("click", () => window.print());
}

init();
