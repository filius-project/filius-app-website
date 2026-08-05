const api = findAPI();
let state = { done: [], scores: {} };
try {
  state =
    JSON.parse(localStorage.getItem("filiuspad-scorm-state") || "null") ||
    state;
} catch {}
let current = 0;
function findAPI() {
  let w = window;
  for (let i = 0; i < 8 && w; i++, w = w.parent) {
    if (w.API) return w.API;
  }
  return null;
}
function scormSet(n, v) {
  if (api) {
    api.LMSSetValue(n, String(v));
    api.LMSCommit("");
  }
}
function save() {
  localStorage.setItem("filiuspad-scorm-state", JSON.stringify(state));
  scormSet(
    "cmi.core.lesson_status",
    state.done.length === MODULES.length ? "completed" : "incomplete",
  );
  scormSet(
    "cmi.core.score.raw",
    Math.round((state.done.length / MODULES.length) * 100),
  );
  const progress = document.querySelector("#progress");
  if (progress)
    progress.style.width = (state.done.length / MODULES.length) * 100 + "%";
}
function renderNav() {
  const n = document.querySelector(".nav");
  n.innerHTML = MODULES.map(
    (m, i) =>
      '<button data-i="' +
      i +
      '" class="' +
      (i === current ? "active" : "") +
      '">' +
      m.number +
      ". " +
      m.title +
      "</button>",
  ).join("");
  n.querySelectorAll("button").forEach(
    (b) => (b.onclick = () => show(Number(b.dataset.i))),
  );
}
function show(i) {
  current = i;
  const m = MODULES[i];
  document.querySelector("#content").innerHTML =
    '<div class="eyebrow">Modul ' +
    m.number +
    " · selbstständig</div><h2>" +
    m.title +
    '</h2><p class="goal"><strong>Lernziel:</strong> ' +
    m.goal +
    '</p><div class="callout"><strong>Fachidee</strong><br>' +
    m.concept +
    '</div><h3>Aufgabe</h3><div class="task"><ol>' +
    m.steps.map((s) => "<li>" + s + "</li>").join("") +
    '</ol></div><div class="diagram"><div class="device">Quelle</div><div class="arrow">→</div><div class="device accent">Ziel / Dienst</div></div><h3>Dein Nachweis</h3><p>' +
    m.deliverable +
    '</p><textarea class="note" id="note" placeholder="Notiere hier deine Beobachtung …"></textarea><div class="quiz"><h3>Mini-Check</h3>' +
    m.questions
      .map(
        (q, qi) =>
          '<div class="question"><strong>' +
          (qi + 1) +
          ". " +
          q[0] +
          "</strong>" +
          [q[1], q[2]]
            .map(
              (a, ai) =>
                '<label><input type="radio" name="q' +
                qi +
                '" value="' +
                ai +
                '"> ' +
                a +
                "</label>",
            )
            .join("") +
          "</div>",
      )
      .join("") +
    '<button class="primary" id="check">Antworten prüfen</button><div id="feedback" class="feedback"></div></div><div class="actions"><button class="secondary" id="back" ' +
    (i === 0 ? "disabled" : "") +
    '>← Zurück</button><button class="primary" id="next">' +
    (i === MODULES.length - 1 ? "Lernpfad abschließen" : "Nächstes Modul →") +
    '</button></div><p class="muted"><span class="badge">' +
    (state.done.includes(m.id) ? "Erledigt" : "Noch offen") +
    "</span> &nbsp; Bearbeite die Aufgabe auf dem iPad und speichere deine Projektdatei.</p>";
  document.querySelector("#note").value =
    localStorage.getItem("filiuspad-note-" + m.id) || "";
  document.querySelector("#note").oninput = (e) =>
    localStorage.setItem("filiuspad-note-" + m.id, e.target.value);
  document.querySelector("#check").onclick = () => {
    let score = 0;
    m.questions.forEach((_, qi) => {
      if (
        document.querySelector('input[name="q' + qi + '"]:checked')?.value ===
        "0"
      )
        score++;
    });
    state.scores[m.id] = score;
    const fb = document.querySelector("#feedback");
    fb.textContent =
      score === m.questions.length
        ? "Richtig — Modul abgeschlossen."
        : "Noch einmal nachdenken: Lies die Fachidee und prüfe deine Beobachtung.";
    fb.className =
      "feedback " + (score === m.questions.length ? "correct" : "wrong");
    if (score === m.questions.length && !state.done.includes(m.id))
      state.done.push(m.id);
    save();
    renderNav();
    const badge = document.querySelector(".badge");
    if (badge)
      badge.textContent = state.done.includes(m.id) ? "Erledigt" : "Noch offen";
  };
  document.querySelector("#back").onclick = () => show(i - 1);
  document.querySelector("#next").onclick = () => {
    if (!state.done.includes(m.id)) {
      const fb = document.querySelector("#feedback");
      fb.textContent =
        "Bitte beantworte den Mini-Check vollständig richtig, bevor du weitergehst.";
      fb.className = "feedback wrong";
      return;
    }
    show(Math.min(i + 1, MODULES.length - 1));
  };
  renderNav();
  document.querySelector("#progress").style.width =
    (state.done.length / MODULES.length) * 100 + "%";
}
function start() {
  if (api) {
    api.LMSInitialize("");
    scormSet("cmi.core.lesson_status", "incomplete");
    scormSet("cmi.core.score.min", "0");
    scormSet("cmi.core.score.max", "100");
  }
  show(0);
  window.addEventListener("beforeunload", () => {
    save();
    if (api) api.LMSFinish("");
  });
}
start();
