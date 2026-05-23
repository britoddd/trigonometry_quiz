// ─── DATA TRIGONOMETRI ───────────────────────────────────────────────────────

const TRIG = {
  0: {
    sin: { d: '0',    m: 'sin(0°) = 0. Sudut 0° berada di sumbu x positif dengan koordinat (1, 0), sehingga nilai y = 0.' },
    cos: { d: '1',    m: 'cos(0°) = 1. Sudut 0° berada di sumbu x positif dengan koordinat (1, 0), sehingga nilai x = 1.' },
    tan: { d: '0',    m: 'tan(0°) = sin(0°) / cos(0°) = 0 / 1 = 0.' },
  },
  30: {
    sin: { d: '1/2',  m: 'sin(30°) = 1/2. Pada segitiga 30-60-90: sisi depan 30° = 1, sisi miring = 2, maka sin(30°) = 1/2.' },
    cos: { d: '√3/2', m: 'cos(30°) = √3/2. Pada segitiga 30-60-90: sisi samping 30° = √3, sisi miring = 2, maka cos(30°) = √3/2.' },
    tan: { d: '√3/3', m: 'tan(30°) = sin(30°) / cos(30°) = (1/2) / (√3/2) = 1/√3 = √3/3.' },
  },
  45: {
    sin: { d: '√2/2', m: 'sin(45°) = √2/2. Segitiga sama kaki siku-siku dengan sisi = 1 dan sisi miring = √2, maka sin(45°) = 1/√2 = √2/2.' },
    cos: { d: '√2/2', m: 'cos(45°) = √2/2. Segitiga sama kaki siku-siku: sisi miring = √2, maka cos(45°) = 1/√2 = √2/2.' },
    tan: { d: '1',    m: 'tan(45°) = sin(45°) / cos(45°) = (√2/2) / (√2/2) = 1.' },
  },
  60: {
    sin: { d: '√3/2', m: 'sin(60°) = √3/2. Pada segitiga 30-60-90: sisi depan 60° = √3, sisi miring = 2, maka sin(60°) = √3/2.' },
    cos: { d: '1/2',  m: 'cos(60°) = 1/2. Pada segitiga 30-60-90: sisi samping 60° = 1, sisi miring = 2, maka cos(60°) = 1/2.' },
    tan: { d: '√3',   m: 'tan(60°) = sin(60°) / cos(60°) = (√3/2) / (1/2) = √3.' },
  },
  90: {
    sin: { d: '1',              m: 'sin(90°) = 1. Sudut 90° berada di sumbu y positif dengan koordinat (0, 1), sehingga nilai y = 1.' },
    cos: { d: '0',              m: 'cos(90°) = 0. Sudut 90° berada di sumbu y positif dengan koordinat (0, 1), sehingga nilai x = 0.' },
    tan: { d: 'Tidak Terdefinisi', m: 'tan(90°) tidak terdefinisi. Karena cos(90°) = 0, dan tan = sin/cos, terjadi pembagian dengan nol yang tidak terdefinisi.' },
  },
  120: {
    sin: { d: '√3/2',  m: 'sin(120°) di kuadran II. Sudut acuan = 180° − 120° = 60°. Di kuadran II, sin bernilai positif, jadi sin(120°) = sin(60°) = √3/2.' },
    cos: { d: '-1/2',  m: 'cos(120°) di kuadran II. Sudut acuan = 180° − 120° = 60°. Di kuadran II, cos bernilai negatif, jadi cos(120°) = −cos(60°) = −1/2.' },
    tan: { d: '-√3',   m: 'tan(120°) di kuadran II. Sudut acuan = 60°. Di kuadran II, tan bernilai negatif, jadi tan(120°) = −tan(60°) = −√3.' },
  },
  135: {
    sin: { d: '√2/2',  m: 'sin(135°) di kuadran II. Sudut acuan = 180° − 135° = 45°. Di kuadran II, sin bernilai positif, jadi sin(135°) = sin(45°) = √2/2.' },
    cos: { d: '-√2/2', m: 'cos(135°) di kuadran II. Sudut acuan = 45°. Di kuadran II, cos bernilai negatif, jadi cos(135°) = −cos(45°) = −√2/2.' },
    tan: { d: '-1',    m: 'tan(135°) di kuadran II. Sudut acuan = 45°. Di kuadran II, tan bernilai negatif, jadi tan(135°) = −tan(45°) = −1.' },
  },
  150: {
    sin: { d: '1/2',   m: 'sin(150°) di kuadran II. Sudut acuan = 180° − 150° = 30°. Di kuadran II, sin bernilai positif, jadi sin(150°) = sin(30°) = 1/2.' },
    cos: { d: '-√3/2', m: 'cos(150°) di kuadran II. Sudut acuan = 30°. Di kuadran II, cos bernilai negatif, jadi cos(150°) = −cos(30°) = −√3/2.' },
    tan: { d: '-√3/3', m: 'tan(150°) di kuadran II. Sudut acuan = 30°. Di kuadran II, tan bernilai negatif, jadi tan(150°) = −tan(30°) = −√3/3.' },
  },
  180: {
    sin: { d: '0',  m: 'sin(180°) = 0. Sudut 180° berada di sumbu x negatif dengan koordinat (−1, 0), sehingga nilai y = 0.' },
    cos: { d: '-1', m: 'cos(180°) = −1. Sudut 180° berada di sumbu x negatif dengan koordinat (−1, 0), sehingga nilai x = −1.' },
    tan: { d: '0',  m: 'tan(180°) = sin(180°) / cos(180°) = 0 / (−1) = 0.' },
  },
  210: {
    sin: { d: '-1/2',  m: 'sin(210°) di kuadran III. Sudut acuan = 210° − 180° = 30°. Di kuadran III, sin bernilai negatif, jadi sin(210°) = −sin(30°) = −1/2.' },
    cos: { d: '-√3/2', m: 'cos(210°) di kuadran III. Sudut acuan = 30°. Di kuadran III, cos bernilai negatif, jadi cos(210°) = −cos(30°) = −√3/2.' },
    tan: { d: '√3/3',  m: 'tan(210°) di kuadran III. Sudut acuan = 30°. Di kuadran III, tan bernilai positif, jadi tan(210°) = tan(30°) = √3/3.' },
  },
  225: {
    sin: { d: '-√2/2', m: 'sin(225°) di kuadran III. Sudut acuan = 225° − 180° = 45°. Di kuadran III, sin bernilai negatif, jadi sin(225°) = −sin(45°) = −√2/2.' },
    cos: { d: '-√2/2', m: 'cos(225°) di kuadran III. Sudut acuan = 45°. Di kuadran III, cos bernilai negatif, jadi cos(225°) = −cos(45°) = −√2/2.' },
    tan: { d: '1',     m: 'tan(225°) di kuadran III. Sudut acuan = 45°. Di kuadran III, tan bernilai positif, jadi tan(225°) = tan(45°) = 1.' },
  },
  240: {
    sin: { d: '-√3/2', m: 'sin(240°) di kuadran III. Sudut acuan = 240° − 180° = 60°. Di kuadran III, sin bernilai negatif, jadi sin(240°) = −sin(60°) = −√3/2.' },
    cos: { d: '-1/2',  m: 'cos(240°) di kuadran III. Sudut acuan = 60°. Di kuadran III, cos bernilai negatif, jadi cos(240°) = −cos(60°) = −1/2.' },
    tan: { d: '√3',    m: 'tan(240°) di kuadran III. Sudut acuan = 60°. Di kuadran III, tan bernilai positif, jadi tan(240°) = tan(60°) = √3.' },
  },
  270: {
    sin: { d: '-1',             m: 'sin(270°) = −1. Sudut 270° berada di sumbu y negatif dengan koordinat (0, −1), sehingga nilai y = −1.' },
    cos: { d: '0',              m: 'cos(270°) = 0. Sudut 270° berada di sumbu y negatif dengan koordinat (0, −1), sehingga nilai x = 0.' },
    tan: { d: 'Tidak Terdefinisi', m: 'tan(270°) tidak terdefinisi. Karena cos(270°) = 0, terjadi pembagian dengan nol.' },
  },
  300: {
    sin: { d: '-√3/2', m: 'sin(300°) di kuadran IV. Sudut acuan = 360° − 300° = 60°. Di kuadran IV, sin bernilai negatif, jadi sin(300°) = −sin(60°) = −√3/2.' },
    cos: { d: '1/2',   m: 'cos(300°) di kuadran IV. Sudut acuan = 60°. Di kuadran IV, cos bernilai positif, jadi cos(300°) = cos(60°) = 1/2.' },
    tan: { d: '-√3',   m: 'tan(300°) di kuadran IV. Sudut acuan = 60°. Di kuadran IV, tan bernilai negatif, jadi tan(300°) = −tan(60°) = −√3.' },
  },
  315: {
    sin: { d: '-√2/2', m: 'sin(315°) di kuadran IV. Sudut acuan = 360° − 315° = 45°. Di kuadran IV, sin bernilai negatif, jadi sin(315°) = −sin(45°) = −√2/2.' },
    cos: { d: '√2/2',  m: 'cos(315°) di kuadran IV. Sudut acuan = 45°. Di kuadran IV, cos bernilai positif, jadi cos(315°) = cos(45°) = √2/2.' },
    tan: { d: '-1',    m: 'tan(315°) di kuadran IV. Sudut acuan = 45°. Di kuadran IV, tan bernilai negatif, jadi tan(315°) = −tan(45°) = −1.' },
  },
  330: {
    sin: { d: '-1/2',  m: 'sin(330°) di kuadran IV. Sudut acuan = 360° − 330° = 30°. Di kuadran IV, sin bernilai negatif, jadi sin(330°) = −sin(30°) = −1/2.' },
    cos: { d: '√3/2',  m: 'cos(330°) di kuadran IV. Sudut acuan = 30°. Di kuadran IV, cos bernilai positif, jadi cos(330°) = cos(30°) = √3/2.' },
    tan: { d: '-√3/3', m: 'tan(330°) di kuadran IV. Sudut acuan = 30°. Di kuadran IV, tan bernilai negatif, jadi tan(330°) = −tan(30°) = −√3/3.' },
  },
  360: {
    sin: { d: '0', m: 'sin(360°) = sin(0°) = 0. Satu putaran penuh kembali ke posisi awal di sumbu x positif.' },
    cos: { d: '1', m: 'cos(360°) = cos(0°) = 1. Satu putaran penuh kembali ke posisi awal di sumbu x positif.' },
    tan: { d: '0', m: 'tan(360°) = tan(0°) = 0. Satu putaran penuh kembali ke posisi awal.' },
  },
};

const DIFFICULTY = {
  easy:   { angles: [0, 90, 180, 270, 360], time: 7 },
  medium: { angles: [30, 45, 60],            time: 11 },
  hard:   { angles: [120, 135, 150, 210, 225, 240, 300, 315, 330], time: 15 },
};

const ANSWER_POOL = [
  '0', '1', '-1',
  '1/2', '-1/2',
  '√2/2', '-√2/2',
  '√3/2', '-√3/2',
  '√3', '-√3',
  '√3/3', '-√3/3',
  'Tidak Terdefinisi',
];

// ─── STATE ───────────────────────────────────────────────────────────────────

let currentUser = null;
let questions = [];
let currentIndex = 0;
let results = [];
let timerInterval = null;
let timeLeft = 0;
let answered = false;

// ─── COOKIES ─────────────────────────────────────────────────────────────────

function setCookie(name, value, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const [k, val] = v.split('=');
    return k === name ? decodeURIComponent(val) : r;
  }, null);
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────

function init() {
  const saved = getCookie('trig_user');
  if (saved) {
    currentUser = saved;
    document.getElementById('menu-username').textContent = currentUser;
    showScreen('screen-menu');
  } else {
    showScreen('screen-welcome');
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ─── QUESTION GENERATION ─────────────────────────────────────────────────────

function generateQuestions() {
  const funcs = ['sin', 'cos', 'tan'];
  const selected = [
    ...pickRandom(DIFFICULTY.easy.angles, 3).map(a => ({ angle: a, diff: 'easy', time: 7 })),
    ...pickRandom(DIFFICULTY.medium.angles, 3).map(a => ({ angle: a, diff: 'medium', time: 11 })),
    ...pickRandom(DIFFICULTY.hard.angles, 4).map(a => ({ angle: a, diff: 'hard', time: 15 })),
  ];

  return shuffle(selected).map(({ angle, diff, time }) => {
    const func = funcs[Math.floor(Math.random() * 3)];
    const { d: correct, m: method } = TRIG[angle][func];
    const wrongPool = ANSWER_POOL.filter(v => v !== correct);
    const choices = shuffle([correct, ...pickRandom(wrongPool, 3)]);
    return { angle, func, correct, method, choices, diff, time };
  });
}

// ─── SESSION ──────────────────────────────────────────────────────────────────

function startSession() {
  questions = generateQuestions();
  currentIndex = 0;
  results = [];
  showQuestion(0);
}

function showQuestion(idx) {
  showScreen('screen-question');
  answered = false;

  const q = questions[idx];
  const diffLabel = { easy: 'Mudah', medium: 'Sedang', hard: 'Sulit' }[q.diff];

  document.getElementById('question-progress').textContent = `Soal ${idx + 1} dari 10`;
  const badge = document.getElementById('question-difficulty');
  badge.textContent = diffLabel;
  badge.className = `difficulty-badge difficulty-${q.diff}`;
  document.getElementById('question-text').textContent = `${q.func}(${q.angle}°) = ?`;
  document.getElementById('feedback-panel').classList.add('hidden');

  const grid = document.getElementById('question-choices');
  grid.innerHTML = '';
  q.choices.forEach((val, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = val;
    btn.addEventListener('click', () => handleAnswer(i, val));
    grid.appendChild(btn);
  });

  startTimer(q.time);
}

// ─── TIMER ───────────────────────────────────────────────────────────────────

function startTimer(seconds) {
  clearInterval(timerInterval);
  timeLeft = seconds;

  const bar = document.getElementById('timer-bar');
  const txt = document.getElementById('timer-text');

  bar.classList.remove('urgent');
  bar.style.transition = 'none';
  bar.style.width = '100%';
  void bar.offsetWidth; // force reflow
  bar.style.transition = `width ${seconds}s linear`;
  bar.style.width = '0%';

  txt.textContent = `${seconds}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    txt.textContent = `${timeLeft}s`;
    if (timeLeft <= 2) bar.classList.add('urgent');
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  const bar = document.getElementById('timer-bar');
  const computed = getComputedStyle(bar).width;
  const parentWidth = bar.parentElement.offsetWidth;
  const pct = (parseFloat(computed) / parentWidth) * 100;
  bar.style.transition = 'none';
  bar.style.width = pct + '%';
}

// ─── ANSWERS ─────────────────────────────────────────────────────────────────

function handleAnswer(idx, val) {
  if (answered) return;
  answered = true;
  stopTimer();

  const q = questions[currentIndex];
  const isCorrect = val === q.correct;

  const buttons = document.querySelectorAll('.choice-btn');
  buttons.forEach(b => b.disabled = true);
  buttons[idx].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) {
    const ci = q.choices.indexOf(q.correct);
    if (ci !== -1) buttons[ci].classList.add('correct');
  }

  results.push({
    label: `${q.func}(${q.angle}°)`,
    isCorrect,
    userAnswer: val,
    correct: q.correct,
    method: q.method,
  });

  renderFeedback(isCorrect, false, q.correct, q.method);
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);

  results.push({
    label: `${q.func}(${q.angle}°)`,
    isCorrect: false,
    userAnswer: 'Habis Waktu',
    correct: q.correct,
    method: q.method,
  });

  renderFeedback(false, true, q.correct, q.method);
}

function renderFeedback(isCorrect, isTimeout, correctAnswer, method) {
  const panel = document.getElementById('feedback-panel');
  panel.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-timeout');

  const isLast = currentIndex === questions.length - 1;
  const nextLabel = isLast ? 'Lihat Hasil' : 'Lanjut →';

  if (isCorrect) {
    panel.classList.add('feedback-correct');
    panel.innerHTML = `
      <div class="feedback-header correct">✓ Benar!</div>
      <button class="btn-next" onclick="nextQuestion()">${nextLabel}</button>
    `;
  } else {
    const headerText = isTimeout ? '⏱ Waktu Habis!' : '✗ Salah!';
    const headerClass = isTimeout ? 'timeout' : 'wrong';
    panel.classList.add(isTimeout ? 'feedback-timeout' : 'feedback-wrong');
    panel.innerHTML = `
      <div class="feedback-header ${headerClass}">${headerText}</div>
      <div class="feedback-correct-answer">Jawaban benar: <strong>${correctAnswer}</strong></div>
      <div class="feedback-method">${method}</div>
      <button class="btn-next" onclick="nextQuestion()">${nextLabel}</button>
    `;
  }
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= questions.length) {
    finishSession();
  } else {
    showQuestion(currentIndex);
  }
}

// ─── SESSION SUMMARY ─────────────────────────────────────────────────────────

async function finishSession() {
  const correct = results.filter(r => r.isCorrect).length;
  const wrong = results.length - correct;
  const pct = Math.round((correct / results.length) * 100);

  try {
    await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser, correct, wrong }),
    });
  } catch (e) {
    console.error('Gagal menyimpan skor:', e);
  }

  showScreen('screen-summary');

  const emojis = ['📚', '📚', '💪', '💪', '😊', '😊', '👍', '👍', '🌟', '🌟', '🌟'];
  document.getElementById('score-emoji').textContent = emojis[correct] || '📚';
  document.getElementById('summary-name').textContent = currentUser;
  document.getElementById('summary-score').textContent = `${correct} / 10`;
  document.getElementById('summary-percent').textContent = `${pct}%`;
  document.getElementById('summary-correct').textContent = `✓ ${correct} benar`;
  document.getElementById('summary-wrong').textContent = `✗ ${wrong} salah`;

  const details = document.getElementById('summary-details');
  details.innerHTML = results.map((r, i) => {
    const cls = r.isCorrect ? 'result-correct' : 'result-wrong';
    const ansDisplay = r.isCorrect
      ? `<span class="result-answer">✓ ${r.correct}</span>`
      : `<span class="result-answer">✗ ${r.userAnswer}</span>`;
    const methodHtml = !r.isCorrect
      ? `<div class="result-method">Jawaban benar: <strong>${r.correct}</strong><br>${r.method}</div>`
      : '';
    return `
      <div class="result-item ${cls}">
        <div class="result-row">
          <span class="result-num">${i + 1}.</span>
          <span class="result-question">${r.label} = ?</span>
          ${ansDisplay}
        </div>
        ${methodHtml}
      </div>
    `;
  }).join('');
}

// ─── LEADERBOARD ─────────────────────────────────────────────────────────────

async function loadLeaderboard() {
  showScreen('screen-leaderboard');
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Memuat...</td></tr>';

  try {
    const res = await fetch('/api/leaderboard');
    const data = await res.json();

    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Belum ada data. Jadilah yang pertama!</td></tr>';
      return;
    }

    const rankEmoji = ['🥇', '🥈', '🥉'];
    tbody.innerHTML = data.map((u, i) => {
      const total = u.totalCorrect + u.totalWrong;
      const avg = total > 0 ? Math.round((u.totalCorrect / total) * 100) : 0;
      const isMe = u.username === currentUser;
      const rankClass = i < 3 ? `rank-${i + 1}` : '';
      const rankDisplay = rankEmoji[i] || (i + 1);
      const youBadge = isMe ? ' <span class="you-badge">Kamu</span>' : '';
      return `
        <tr class="${rankClass}${isMe ? ' current-user-row' : ''}">
          <td>${rankDisplay}</td>
          <td>${u.username}${youBadge}</td>
          <td class="correct-cell">${u.totalCorrect}</td>
          <td class="wrong-cell">${u.totalWrong}</td>
          <td>${avg}%</td>
          <td>${u.sessions}</td>
        </tr>
      `;
    }).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" class="table-empty" style="color:var(--error)">Gagal memuat data.</td></tr>';
  }
}

// ─── EVENT LISTENERS ─────────────────────────────────────────────────────────

document.getElementById('input-username').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-start-welcome').click();
});

document.getElementById('btn-start-welcome').addEventListener('click', () => {
  const name = document.getElementById('input-username').value.trim();
  const err = document.getElementById('username-error');
  if (!name) { err.textContent = 'Masukkan nama terlebih dahulu.'; return; }
  err.textContent = '';
  currentUser = name;
  setCookie('trig_user', name, 365);
  document.getElementById('menu-username').textContent = currentUser;
  showScreen('screen-menu');
});

document.getElementById('btn-start-session').addEventListener('click', startSession);
document.getElementById('btn-leaderboard-menu').addEventListener('click', loadLeaderboard);
document.getElementById('btn-back-from-leaderboard').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-play-again').addEventListener('click', startSession);
document.getElementById('btn-leaderboard-from-summary').addEventListener('click', loadLeaderboard);
document.getElementById('btn-menu-from-summary').addEventListener('click', () => showScreen('screen-menu'));

// ─── START ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
