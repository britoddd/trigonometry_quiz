// Kuis terbalik: Cari Sudut — diberikan nilai trig, pilih semua sudut yang memenuhi

const REVERSE_TIMER = 35;

let reverseQuestions = [];
let reverseIndex     = 0;
let reverseResults   = [];
let reverseAnswered  = false;
let selectedAngles   = new Set();

// Build reverse lookup: { func: { value: [angles] } }, exclude 'Tidak Terdefinisi'
function buildReverseMap() {
  const map = {};
  ['sin', 'cos', 'tan'].forEach(func => {
    map[func] = {};
    ALL_ANGLES.forEach(angle => {
      const v = TRIG[angle][func].d;
      if (v === 'Tidak Terdefinisi') return;
      if (!map[func][v]) map[func][v] = [];
      map[func][v].push(angle);
    });
  });
  return map;
}

// Build full pool with displayAngles (5 options: correct + distractors)
function buildReversePool() {
  const reverseMap = buildReverseMap();
  const pool = [];
  ['sin', 'cos', 'tan'].forEach(func => {
    Object.entries(reverseMap[func]).forEach(([val, correctAngles]) => {
      const correctSet  = new Set(correctAngles);
      const distPool    = ALL_ANGLES.filter(a => !correctSet.has(a));
      const needed      = Math.max(0, 5 - correctAngles.length);
      const distractors = pickRandom(distPool, needed);
      const displayAngles = shuffle([...correctAngles, ...distractors]);
      pool.push({ func, val, correctAngles, displayAngles });
    });
  });
  return pool;
}

function generateReverseQuestions() {
  return shuffle(buildReversePool()).slice(0, 10);
}

// ─── Session ─────────────────────────────────────────────────────────────────

function startReverseSession() {
  sessionMode      = 'casual';
  reverseQuestions = generateReverseQuestions();
  reverseIndex     = 0;
  reverseResults   = [];
  showReverseQuestion(0);
}

function showReverseQuestion(idx) {
  showScreen('screen-question-reverse');
  reverseAnswered = false;
  selectedAngles  = new Set();

  const q     = reverseQuestions[idx];
  const total = sessionMode === 'competitive' ? 15 : 10;
  const qNum  = sessionMode === 'competitive' ? 8 + idx + 1 : idx + 1;

  document.getElementById('rq-progress').textContent = `Soal ${qNum} dari ${total}`;
  document.getElementById('rq-text').innerHTML =
    `<span class="rq-func">${q.func}</span>(?) = <span class="rq-val">${q.val}</span>`;
  document.getElementById('rq-feedback').classList.add('hidden');
  document.getElementById('rq-confirm').disabled = false;

  const grid = document.getElementById('rq-choices');
  grid.innerHTML = '';
  q.displayAngles.forEach(angle => {
    const btn = document.createElement('button');
    btn.className = 'angle-btn';
    btn.textContent = `${angle}°`;
    btn.dataset.angle = angle;
    btn.addEventListener('click', () => toggleAngle(btn, angle));
    grid.appendChild(btn);
  });

  const timerRow = document.getElementById('rq-timer-row');
  if (sessionMode === 'competitive') {
    timerRow.classList.remove('hidden');
    startReverseTimer(REVERSE_TIMER);
  } else {
    timerRow.classList.add('hidden');
    clearInterval(timerInterval);
  }
}

function toggleAngle(btn, angle) {
  if (reverseAnswered) return;
  if (selectedAngles.has(angle)) {
    selectedAngles.delete(angle);
    btn.classList.remove('selected');
  } else {
    selectedAngles.add(angle);
    btn.classList.add('selected');
  }
}

// ─── Timer ───────────────────────────────────────────────────────────────────

function startReverseTimer(seconds) {
  clearInterval(timerInterval);
  timeLeft = seconds;

  const bar = document.getElementById('rq-timer-bar');
  const txt = document.getElementById('rq-timer-text');

  bar.classList.remove('urgent');
  bar.style.transition = 'none';
  bar.style.width = '100%';
  void bar.offsetWidth;
  bar.style.transition = `width ${seconds}s linear`;
  bar.style.width = '0%';
  txt.textContent = `${seconds}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    txt.textContent = `${timeLeft}s`;
    if (timeLeft <= 2) bar.classList.add('urgent');
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleReverseTimeout();
    }
  }, 1000);
}

function stopReverseTimer() {
  clearInterval(timerInterval);
  const bar = document.getElementById('rq-timer-bar');
  const pct = (parseFloat(getComputedStyle(bar).width) / bar.parentElement.offsetWidth) * 100;
  bar.style.transition = 'none';
  bar.style.width = pct + '%';
}

// ─── Answers ─────────────────────────────────────────────────────────────────

function handleReverseConfirm() {
  if (reverseAnswered) return;
  reverseAnswered = true;
  if (sessionMode === 'competitive') stopReverseTimer();
  document.getElementById('rq-confirm').disabled = true;
  evaluateReverseAnswer(false);
}

function handleReverseTimeout() {
  if (reverseAnswered) return;
  reverseAnswered = true;
  document.getElementById('rq-confirm').disabled = true;
  evaluateReverseAnswer(true);
}

function evaluateReverseAnswer(isTimeout) {
  const q        = reverseQuestions[reverseIndex];
  const correct  = new Set(q.correctAngles);
  const possible = q.correctAngles.length;

  let earned = 0, wrongCount = 0;
  selectedAngles.forEach(a => {
    if (correct.has(a)) earned++;
    else wrongCount++;
  });
  const points = Math.max(0, earned - wrongCount);

  reverseResults.push({
    func: q.func, val: q.val,
    correctAngles:  q.correctAngles,
    displayAngles:  q.displayAngles,
    selectedAngles: [...selectedAngles],
    earned: points, possible, isTimeout,
  });

  document.querySelectorAll('.angle-btn').forEach(btn => {
    const angle  = parseInt(btn.dataset.angle);
    const isSel  = selectedAngles.has(angle);
    const isCorr = correct.has(angle);
    btn.disabled = true;
    if (isCorr && isSel)  btn.classList.add('angle-correct-selected');
    else if (isCorr)      btn.classList.add('angle-correct-missed');
    else if (isSel)       btn.classList.add('angle-wrong-selected');
  });

  renderReverseFeedback(points, possible, isTimeout, q.correctAngles);
}

// ─── Feedback ────────────────────────────────────────────────────────────────

function renderReverseFeedback(points, possible, isTimeout, correctAngles) {
  const panel = document.getElementById('rq-feedback');
  panel.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-timeout', 'feedback-partial');

  const isLast      = reverseIndex === reverseQuestions.length - 1;
  const nextLabel   = isLast ? 'Lihat Hasil' : 'Lanjut →';
  const correctList = correctAngles.map(a => `${a}°`).join(', ');
  let headerText, headerClass;

  if (points === possible) {
    panel.classList.add('feedback-correct');
    headerText  = `✓ Sempurna! ${points}/${possible} poin`;
    headerClass = 'correct';
  } else if (points > 0) {
    panel.classList.add('feedback-partial');
    headerText  = `~ Sebagian Benar: ${points}/${possible} poin`;
    headerClass = 'partial';
  } else if (isTimeout) {
    panel.classList.add('feedback-timeout');
    headerText  = `⏱ Waktu Habis! 0/${possible} poin`;
    headerClass = 'timeout';
  } else {
    panel.classList.add('feedback-wrong');
    headerText  = `✗ Salah! 0/${possible} poin`;
    headerClass = 'wrong';
  }

  panel.innerHTML = `
    <div class="feedback-header ${headerClass}">${headerText}</div>
    <div class="feedback-correct-answer">Jawaban lengkap: <strong>${correctList}</strong></div>
    <button class="btn-next" onclick="nextReverseQuestion()">${nextLabel}</button>
  `;
}

function nextReverseQuestion() {
  reverseIndex++;
  if (reverseIndex >= reverseQuestions.length) {
    if (sessionMode === 'competitive') {
      compFinishSession();
    } else {
      finishReverseSession();
    }
  } else {
    showReverseQuestion(reverseIndex);
  }
}

// ─── Summary (casual only) ────────────────────────────────────────────────────

function finishReverseSession() {
  const totalEarned   = reverseResults.reduce((s, r) => s + r.earned,   0);
  const totalPossible = reverseResults.reduce((s, r) => s + r.possible, 0);
  const pct = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  showScreen('screen-summary-reverse');

  const emoji = pct >= 90 ? '🌟' : pct >= 70 ? '👍' : pct >= 50 ? '😊' : pct >= 30 ? '💪' : '📚';
  document.getElementById('rs-emoji').textContent   = emoji;
  document.getElementById('rs-name').textContent    = currentUser;
  document.getElementById('rs-score').textContent   = `${totalEarned} / ${totalPossible}`;
  document.getElementById('rs-percent').textContent = `${pct}%`;
  document.getElementById('rs-stats').innerHTML =
    `<span class="stat-correct">✓ ${totalEarned} poin</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat-wrong">✗ ${totalPossible - totalEarned} poin hilang</span>`;

  document.getElementById('rs-details').innerHTML = reverseResults.map((r, i) => {
    const cls      = r.earned === r.possible ? 'result-correct' : r.earned > 0 ? 'result-partial' : 'result-wrong';
    const selSet   = new Set(r.selectedAngles);
    const corrSet  = new Set(r.correctAngles);
    const relevant = [...new Set([...r.correctAngles, ...r.selectedAngles])].sort((a, b) => a - b);
    const tags     = relevant.map(a => {
      if (corrSet.has(a) && selSet.has(a)) return `<span class="angle-tag correct-sel">${a}°</span>`;
      if (corrSet.has(a))                  return `<span class="angle-tag correct-miss">${a}°</span>`;
      return                                      `<span class="angle-tag wrong-sel">${a}°</span>`;
    }).join('');
    return `
      <div class="result-item ${cls}">
        <div class="result-row">
          <span class="result-num">${i + 1}.</span>
          <span class="result-question">${r.func}(?) = ${r.val}</span>
          <span class="result-answer">${r.earned}/${r.possible}</span>
        </div>
        <div class="result-angles">${tags}</div>
      </div>`;
  }).join('');
}
