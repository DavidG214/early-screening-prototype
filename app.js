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
    continue: "Continue",
    preTitle: "Before we start",
    preHelp: "A few background questions. Only the first one is required. These answers do not change your results; they only appear in your summary to give a professional context.",
    preRequired: "Please answer the first question to continue.",
    adultOnlyTitle: "This tool is for adults",
    adultOnlyBody: "This prototype was built for people 18 and older. If you are under 18 and have questions about reading, writing, math, attention or social differences, a parent, school counselor or doctor can help you find the right next step.",
    deepOfferHigh: "Your answers about numbers showed a signal. You can take a closer look with everyday situations and a few short number tasks (about 5 to 8 minutes).",
    deepOfferLow: "Want to look more closely at how you handle everyday numbers? There is an optional deeper section.",
    deepGo: "Take a closer look at numbers",
    deepTitle: "A closer look: everyday numbers",
    deepHelp: "Each question describes a situation. Pick what usually happens for you. If a situation is not part of your life, choose \"This doesn't happen in my life\".",
    deepCardTitle: "A closer look: everyday numbers",
    deepCardNA: "Too many situations did not apply to give a result here.",
    deepCardNote: "This section is not validated. It adds detail for a professional; it does not change your other results.",
    tasksTitle: "Hands-on number tasks",
    tasksIntro: "Three short, optional tasks. They record how you did and how long it took, so a professional can see real examples. We do not score them or compare them with anyone. You can skip any of them.",
    tasksStart: "Start the tasks",
    tasksSkip: "Skip the tasks",
    skipTask: "Skip this task",
    next: "Next",
    compareTitle: "Task 1 of 3: Which is bigger?",
    compareHelp: "Tap the bigger number in each pair. Go at a comfortable pace; there are 16 pairs.",
    compareProgress: (i, n) => `Pair ${i} of ${n}`,
    mentalTitle: "Task 2 of 3: Work it out in your head",
    mentalHelp: "Type each answer without a calculator or paper. Write times like 3:15.",
    mentalProgress: (i, n) => `Problem ${i} of ${n}`,
    yourAnswer: "Your answer",
    paperTitle: "Task 3 of 3: On paper",
    paperHelp: "Work out these problems by hand on paper or a whiteboard. Show your steps. Then take a photo of your work. The photo stays on this device, in this tab only. It is never uploaded or analysed; it only appears in your printed summary.",
    takePhoto: "Take or choose a photo",
    retakePhoto: "Use a different photo",
    finishTasks: "Finish",
    tasksDone: "Thanks. Your task results are in your summary.",
    toResults: "Back to my results",
    beginTask: "Begin",
    noNorms: "No adult norms are used here, and these results are not scored. A professional can interpret them.",
    taskCompareResult: (c, n, s) => `Which is bigger: ${c} of ${n} correct, ${s} seconds in total.`,
    taskMentalResult: (c, n, s) => `Mental math: ${c} of ${n} correct, ${s} seconds in total.`,
    taskSkipped: "Skipped",
    taskPhoto: "Photo of work on paper",
    taskPhotoNone: "No photo added.",
    packetPre: "Background questions",
    packetDeep: "A closer look: everyday numbers",
    packetTasks: "Hands-on number tasks",
    packetMentalDetail: "Problem, my answer, seconds",
    limitationsTitle: "Limitations",
    limitations: [
      "The closer look at numbers and the hands-on tasks are not validated. Task times are not compared with any norms; they are examples for a professional to interpret.",
      "If you add a photo, it stays on this device in this tab only. It is never uploaded or analysed, and it is erased when you close the tab or start over.",
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
    continue: "Continuar",
    preTitle: "Antes de empezar",
    preHelp: "Unas preguntas de contexto. Solo la primera es obligatoria. Estas respuestas no cambian tus resultados; solo aparecen en tu resumen para darle contexto a un profesional.",
    preRequired: "Contesta la primera pregunta para continuar.",
    adultOnlyTitle: "Esta herramienta es para adultos",
    adultOnlyBody: "Este prototipo se hizo para personas de 18 años o más. Si eres menor de 18 y tienes dudas sobre la lectura, la escritura, las matemáticas, la atención o las diferencias sociales, tu mamá, papá, un orientador escolar o un médico pueden ayudarte a encontrar el siguiente paso.",
    deepOfferHigh: "Tus respuestas sobre los números mostraron una señal. Puedes ver más de cerca con situaciones cotidianas y unas tareas cortas con números (de 5 a 8 minutos).",
    deepOfferLow: "¿Quieres ver más de cerca cómo manejas los números de todos los días? Hay una sección opcional más detallada.",
    deepGo: "Ver más de cerca los números",
    deepTitle: "Más de cerca: los números de todos los días",
    deepHelp: "Cada pregunta describe una situación. Elige lo que normalmente te pasa. Si una situación no es parte de tu vida, elige \"Esto no pasa en mi vida\".",
    deepCardTitle: "Más de cerca: los números de todos los días",
    deepCardNA: "Demasiadas situaciones no aplicaban para dar un resultado aquí.",
    deepCardNote: "Esta sección no está validada. Agrega detalles para un profesional; no cambia tus otros resultados.",
    tasksTitle: "Tareas prácticas con números",
    tasksIntro: "Tres tareas cortas y opcionales. Registran cómo te fue y cuánto tardaste, para que un profesional vea ejemplos reales. No las calificamos ni las comparamos con nadie. Puedes saltarte cualquiera.",
    tasksStart: "Empezar las tareas",
    tasksSkip: "Saltar las tareas",
    skipTask: "Saltar esta tarea",
    next: "Siguiente",
    compareTitle: "Tarea 1 de 3: ¿Cuál es mayor?",
    compareHelp: "Toca el número mayor de cada par. Ve a tu ritmo; son 16 pares.",
    compareProgress: (i, n) => `Par ${i} de ${n}`,
    mentalTitle: "Tarea 2 de 3: Resuélvelo mentalmente",
    mentalHelp: "Escribe cada respuesta sin calculadora ni papel. Escribe las horas así: 3:15.",
    mentalProgress: (i, n) => `Problema ${i} de ${n}`,
    yourAnswer: "Tu respuesta",
    paperTitle: "Tarea 3 de 3: En papel",
    paperHelp: "Resuelve estos problemas a mano en papel o en un pizarrón. Muestra tus pasos. Luego toma una foto de tu trabajo. La foto se queda en este dispositivo, solo en esta pestaña. Nunca se sube ni se analiza; solo aparece en tu resumen impreso.",
    takePhoto: "Tomar o elegir una foto",
    retakePhoto: "Usar otra foto",
    finishTasks: "Terminar",
    tasksDone: "Gracias. Los resultados de las tareas están en tu resumen.",
    toResults: "Volver a mis resultados",
    beginTask: "Empezar",
    noNorms: "Aquí no se usan normas para adultos y estos resultados no se califican. Un profesional puede interpretarlos.",
    taskCompareResult: (c, n, s) => `¿Cuál es mayor?: ${c} de ${n} correctas, ${s} segundos en total.`,
    taskMentalResult: (c, n, s) => `Cálculo mental: ${c} de ${n} correctas, ${s} segundos en total.`,
    taskSkipped: "Omitida",
    taskPhoto: "Foto del trabajo en papel",
    taskPhotoNone: "No se agregó foto.",
    packetPre: "Preguntas de contexto",
    packetDeep: "Más de cerca: los números de todos los días",
    packetTasks: "Tareas prácticas con números",
    packetMentalDetail: "Problema, mi respuesta, segundos",
    limitationsTitle: "Limitaciones",
    limitations: [
      "La sección detallada de números y las tareas prácticas no están validadas. Los tiempos no se comparan con ninguna norma; son ejemplos para que un profesional los interprete.",
      "Si agregas una foto, se queda en este dispositivo, solo en esta pestaña. Nunca se sube ni se analiza, y se borra al cerrar la pestaña o empezar de nuevo.",
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
  pre: {},       // prescreen id -> value (context only, never scored)
  mod: null,     // math module definition
  modAnswers: {},// module item id -> 0..3, or null for "doesn't apply"
  modResult: null,
  tasks: null,   // { step, compare, mental, photoUrl, ... }
  result: null
};

function freshTasks() {
  return { step: "intro", compare: null, mental: null, photoUrl: null, paperDone: false };
}

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
  try { state.mod = await loadJSON("data/modules/math.json"); } catch (e) { state.mod = null; }
  state.tasks = freshTasks();

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
    if (state.mod && state.tasks && state.screen === "tasks") renderTasks();
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

  const pre = $("#preForm");
  pre.innerHTML = "";
  for (const p of state.q.prescreen) pre.appendChild(radioGroup(p.id, "pre", p.options.map((o) => o.value)));

  const mod = $("#modForm");
  mod.innerHTML = "";
  if (state.mod) for (const it of state.mod.items) mod.appendChild(radioGroup(it.id, "mod", [...it.options.map((o) => o.v), "na"]));
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
  if (state.mod) {
    for (const it of state.mod.items) {
      $(`#lg-${it.id}`).textContent = loc(it);
      for (const o of it.options) document.querySelector(`[data-opt="${it.id}:${o.v}"]`).textContent = loc(o);
      document.querySelector(`[data-opt="${it.id}:na"]`).textContent = loc(state.mod.na);
    }
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

// ---------- closer look: math module ----------
function scoreModule() {
  const vals = state.mod.items.map((it) => state.modAnswers[it.id]).filter((v) => v !== null);
  // Need at least half the situations to apply before giving a band.
  if (vals.length < Math.ceil(state.mod.items.length / 2)) return { band: null, applied: vals.length };
  const score = (100 * vals.reduce((a, b) => a + b, 0)) / (3 * vals.length);
  return { band: bandFor(score), applied: vals.length };
}

function renderDeep() {
  const area = $("#deepArea");
  if (!state.mod || !state.result) { area.innerHTML = ""; return; }
  const c = state.result.domains.find((d) => d.id === state.mod.domain);
  if (!state.modResult) {
    const strong = c && c.band !== "low";
    area.innerHTML = `<div class="card ${strong ? "band-high" : ""}">
      <p>${esc(strong ? t("deepOfferHigh") : t("deepOfferLow"))}</p>
      <div class="actions"><button type="button" class="btn ${strong ? "primary" : ""}" data-go="module">${esc(t("deepGo"))}</button></div>
    </div>`;
    return;
  }
  const r = state.modResult;
  area.innerHTML = `<div class="card">
    <h2>${esc(t("deepCardTitle"))}</h2>
    <p class="band">${esc(r.band ? t("band_" + r.band) : t("deepCardNA"))}</p>
    <span class="tag warn">${esc(t("tagNotValidated"))}</span>
    <p class="muted">${esc(t("deepCardNote"))}</p>
    ${tasksSummaryHTML()}
  </div>`;
}

function submitModule() {
  const missing = state.mod.items.filter((it) => !(it.id in state.modAnswers));
  document.querySelectorAll("#modForm .item.missing").forEach((el) => el.classList.remove("missing"));
  if (missing.length) {
    missing.forEach((it) => $(`#item-${it.id}`).classList.add("missing"));
    $("#modError").textContent = t("missing")(missing.length);
    $("#modError").hidden = false;
    $(`#item-${missing[0].id}`).scrollIntoView({ block: "center" });
    return;
  }
  $("#modError").hidden = true;
  state.modResult = scoreModule();
  state.tasks = freshTasks();
  renderTasks();
  show("tasks");
}

// ---------- hands-on tasks (recorded, never scored or compared) ----------
const secs = (ms) => Math.round(ms / 1000);

function normAnswer(s) {
  return String(s).toLowerCase().replace(/\s+/g, "").replace(/\$/g, "").replace(/[ap]\.?m\.?$/, "");
}

function renderTasks() {
  const T = state.tasks, M = state.mod.tasks, area = $("#taskArea");
  const skip = (to) => `<button type="button" class="btn" data-task="${to}">${esc(t("skipTask"))}</button>`;

  if (T.step === "intro") {
    area.innerHTML = `<p>${esc(t("tasksIntro"))}</p><p class="muted">${esc(t("noNorms"))}</p>
      <div class="actions"><button type="button" class="btn primary" data-task="compare">${esc(t("tasksStart"))}</button>
      <button type="button" class="btn" data-task="done">${esc(t("tasksSkip"))}</button></div>`;
  } else if (T.step === "compare") {
    const C = T.compare;
    if (!C) {
      area.innerHTML = `<h2>${esc(t("compareTitle"))}</h2><p>${esc(t("compareHelp"))}</p>
        <div class="actions"><button type="button" class="btn primary" id="beginCompare">${esc(t("beginTask"))}</button>${skip("mental")}</div>`;
    } else {
      const p = M.compare[C.i];
      area.innerHTML = `<h2>${esc(t("compareTitle"))}</h2><p class="muted">${esc(t("compareProgress")(C.i + 1, M.compare.length))}</p>
        <div class="pair"><button type="button" class="btn big" data-pick="a">${esc(p.a)}</button>
        <button type="button" class="btn big" data-pick="b">${esc(p.b)}</button></div>`;
    }
  } else if (T.step === "mental") {
    const Mn = T.mental;
    if (!Mn) {
      area.innerHTML = `<h2>${esc(t("mentalTitle"))}</h2><p>${esc(t("mentalHelp"))}</p>
        <div class="actions"><button type="button" class="btn primary" id="beginMental">${esc(t("beginTask"))}</button>${skip("paper")}</div>`;
    } else {
      const p = M.mental[Mn.i];
      const q = typeof p.q === "string" ? p.q : loc(p.q);
      area.innerHTML = `<h2>${esc(t("mentalTitle"))}</h2><p class="muted">${esc(t("mentalProgress")(Mn.i + 1, M.mental.length))}</p>
        <p class="problem">${esc(q)}</p>
        <label class="answer-label">${esc(t("yourAnswer"))}
          <input id="mentalInput" type="text" inputmode="decimal" autocomplete="off" enterkeyhint="next"></label>
        <div class="actions"><button type="button" class="btn primary" id="mentalNext">${esc(t("next"))}</button></div>`;
      setTimeout(() => { const i = $("#mentalInput"); if (i) i.focus(); }, 0);
    }
  } else if (T.step === "paper") {
    area.innerHTML = `<h2>${esc(t("paperTitle"))}</h2><p>${esc(t("paperHelp"))}</p>
      <ol class="problem-list">${M.paper.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      <label class="btn file-btn">${esc(T.photoUrl ? t("retakePhoto") : t("takePhoto"))}
        <input id="photoInput" type="file" accept="image/*" capture="environment" hidden></label>
      ${T.photoUrl ? `<img class="work-photo" src="${T.photoUrl}" alt="${esc(t("taskPhoto"))}">` : ""}
      <div class="actions"><button type="button" class="btn primary" data-task="done" data-paper="1">${esc(t("finishTasks"))}</button>${skip("done")}</div>`;
  } else {
    area.innerHTML = `<p>${esc(t("tasksDone"))}</p>${tasksSummaryHTML()}
      <div class="actions"><button type="button" class="btn primary" data-go="result">${esc(t("toResults"))}</button></div>`;
  }
}

function tasksSummaryHTML(withDetail = false) {
  const T = state.tasks, M = state.mod.tasks;
  if (!T || (!T.compare && !T.mental && !T.photoUrl && T.step !== "done")) return "";
  const lines = [];
  const C = T.compare;
  lines.push(C && C.done ? esc(t("taskCompareResult")(C.correct, M.compare.length, secs(C.ms))) : `${esc(t("compareTitle"))}: ${esc(t("taskSkipped"))}`);
  const Mn = T.mental;
  lines.push(Mn && Mn.done ? esc(t("taskMentalResult")(Mn.items.filter((x) => x.correct).length, M.mental.length, secs(Mn.items.reduce((a, x) => a + x.ms, 0))))
    : `${esc(t("mentalTitle"))}: ${esc(t("taskSkipped"))}`);
  let detail = "";
  if (withDetail && Mn && Mn.done) {
    detail = `<p class="muted">${esc(t("packetMentalDetail"))}</p><ul class="answers">${Mn.items.map((x, i) => {
      const p = M.mental[i]; const q = typeof p.q === "string" ? p.q : loc(p.q);
      return `<li>${esc(q)} → <strong>${esc(x.answer || "—")}</strong> (${x.correct ? "✓" : "✗"}, ${secs(x.ms)} s)</li>`;
    }).join("")}</ul>`;
  }
  return `<ul class="task-results">${lines.map((l) => `<li>${l}</li>`).join("")}</ul>${detail}<p class="muted">${esc(t("noNorms"))}</p>`;
}

function onTaskClick(e) {
  const T = state.tasks, M = state.mod.tasks;
  const jump = e.target.closest("[data-task]");
  if (jump) { T.step = jump.dataset.task; renderTasks(); if (T.step === "done") renderAfterTasks(); return; }
  if (e.target.closest("#beginCompare")) { T.compare = { i: 0, correct: 0, start: performance.now(), ms: 0, done: false }; renderTasks(); return; }
  const pick = e.target.closest("[data-pick]");
  if (pick && T.compare && !T.compare.done) {
    const C = T.compare, p = M.compare[C.i];
    const chose = pick.dataset.pick === "a" ? p.av : p.bv;
    if (chose === Math.max(p.av, p.bv)) C.correct++;
    C.i++;
    if (C.i >= M.compare.length) { C.ms = performance.now() - C.start; C.done = true; T.step = "mental"; }
    renderTasks();
    return;
  }
  if (e.target.closest("#beginMental")) { T.mental = { i: 0, items: [], qStart: performance.now(), done: false }; renderTasks(); return; }
  if (e.target.closest("#mentalNext")) nextMental();
}

function nextMental() {
  const T = state.tasks, M = state.mod.tasks, Mn = T.mental;
  const val = $("#mentalInput").value.trim();
  const ok = M.mental[Mn.i].a.map(normAnswer).includes(normAnswer(val));
  Mn.items.push({ answer: val, correct: ok, ms: performance.now() - Mn.qStart });
  Mn.i++;
  Mn.qStart = performance.now();
  if (Mn.i >= M.mental.length) { Mn.done = true; T.step = "paper"; }
  renderTasks();
}

function onPhoto(e) {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  if (state.tasks.photoUrl) URL.revokeObjectURL(state.tasks.photoUrl);
  state.tasks.photoUrl = URL.createObjectURL(f); // memory only; never uploaded
  renderTasks();
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
  let deep = "";
  if (state.modResult) {
    const m = state.mod;
    const opt = (it) => {
      const v = state.modAnswers[it.id];
      return v === null ? loc(m.na) : loc(it.options.find((o) => o.v === v));
    };
    deep = `<h3>${esc(t("packetDeep"))}: ${esc(state.modResult.band ? t("band_" + state.modResult.band) : t("deepCardNA"))} (${esc(t("tagNotValidated"))})</h3>
      <ul class="answers">${m.items.map((it) => `<li>${esc(loc(it))} <strong>${esc(opt(it))}</strong></li>`).join("")}</ul>`;
    if (state.tasks && state.tasks.step === "done") {
      const T = state.tasks;
      deep += `<h3>${esc(t("packetTasks"))}</h3>${tasksSummaryHTML(true)}
        <p><strong>${esc(t("taskPhoto"))}:</strong> ${T.photoUrl ? "" : esc(t("taskPhotoNone"))}</p>
        ${T.photoUrl ? `<p class="muted">${m.tasks.paper.map(esc).join(" · ")}</p><img class="work-photo" src="${T.photoUrl}" alt="${esc(t("taskPhoto"))}">` : ""}`;
    }
  }

  $("#packet").innerHTML = `
    <header>
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
  show("result");
}

function restart() {
  state.answers = {};
  state.context = {};
  state.pre = {};
  state.modAnswers = {};
  state.modResult = null;
  if (state.tasks && state.tasks.photoUrl) URL.revokeObjectURL(state.tasks.photoUrl);
  state.tasks = freshTasks();
  state.result = null;
  state.history = [];
  $("#qForm").reset();
  $("#preForm").reset();
  $("#modForm").reset();
  $("#taskArea").innerHTML = "";
  $("#deepArea").innerHTML = "";
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
  $("#preNext").addEventListener("click", () => {
    const err = $("#preError");
    if (!state.pre.adult) { err.textContent = t("preRequired"); err.hidden = false; return; }
    err.hidden = true;
    show(state.pre.adult === "yes" ? "questions" : "adultonly");
  });
  $("#adultBack").addEventListener("click", () => show("prescreen", false));
  $("#modSubmit").addEventListener("click", submitModule);
  $("#taskArea").addEventListener("click", onTaskClick);
  $("#taskArea").addEventListener("change", (e) => { if (e.target.id === "photoInput") onPhoto(e); });
  $("#taskArea").addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target.id === "mentalInput") { e.preventDefault(); nextMental(); } });
  $("#restartBtn").addEventListener("click", restart);
  $("#printBtn").addEventListener("click", () => window.print());
}

init();
