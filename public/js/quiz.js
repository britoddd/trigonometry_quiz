// Logika kuis: generate soal, sesi, timer, jawaban, feedback, ringkasan

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

// ─── Generate ────────────────────────────────────────────────────────────────

function generateQuestions() {
  const funcs = ['sin', 'cos', 'tan'];
  const selected = [
    ...pickRandom(DIFFICULTY.easy.angles,   3).map(a => ({ angle: a, diff: 'easy',   time: 7  })),
    ...pickRandom(DIFFICULTY.medium.angles, 3).map(a => ({ angle: a, diff: 'medium', time: 11 })),
    ...pickRandom(DIFFICULTY.hard.angles,   4).map(a => ({ angle: a, diff: 'hard',   time: 15 })),
  ];

  return shuffle(selected).map(({ angle, diff, time }) => {
    const func = funcs[Math.floor(Math.random() * 3)];
    const { d: correct, m: method } = TRIG[angle][func];
    const wrongPool = ANSWER_POOL.filter(v => v !== correct);
    const choices = shuffle([correct, ...pickRandom(wrongPool, 3)]);
    return { angle, func, correct, method, choices, diff, time };
  });
}

// ─── Session ─────────────────────────────────────────────────────────────────

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

// ─── Timer ────────────────────────────────────────────────────────────────────

function startTimer(seconds) {
  clearInterval(timerInterval);
  timeLeft = seconds;

  const bar = document.getElementById('timer-bar');
  const txt = document.getElementById('timer-text');

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
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  const bar = document.getElementById('timer-bar');
  const pct = (parseFloat(getComputedStyle(bar).width) / bar.parentElement.offsetWidth) * 100;
  bar.style.transition = 'none';
  bar.style.width = pct + '%';
}

// ─── Answers ─────────────────────────────────────────────────────────────────

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

  results.push({ label: `${q.func}(${q.angle}°)`, isCorrect, userAnswer: val, correct: q.correct, method: q.method });
  renderFeedback(isCorrect, false, q.correct, q.method);
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  document.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
  results.push({ label: `${q.func}(${q.angle}°)`, isCorrect: false, userAnswer: 'Habis Waktu', correct: q.correct, method: q.method });
  renderFeedback(false, true, q.correct, q.method);
}

// ─── Feedback ────────────────────────────────────────────────────────────────

function renderFeedback(isCorrect, isTimeout, correctAnswer, method) {
  const panel = document.getElementById('feedback-panel');
  panel.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-timeout');

  const nextLabel = currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Lanjut →';

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

// ─── Summary ─────────────────────────────────────────────────────────────────

async function finishSession() {
  const correct = results.filter(r => r.isCorrect).length;
  const wrong   = results.length - correct;
  const pct     = Math.round((correct / results.length) * 100);

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
  document.getElementById('summary-name').textContent    = currentUser;
  document.getElementById('summary-score').textContent   = `${correct} / 10`;
  document.getElementById('summary-percent').textContent = `${pct}%`;
  document.getElementById('summary-correct').textContent = `✓ ${correct} benar`;
  document.getElementById('summary-wrong').textContent   = `✗ ${wrong} salah`;

  document.getElementById('summary-details').innerHTML = results.map((r, i) => {
    const cls       = r.isCorrect ? 'result-correct' : 'result-wrong';
    const ansHtml   = r.isCorrect
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
          ${ansHtml}
        </div>
        ${methodHtml}
      </div>`;
  }).join('');
}
