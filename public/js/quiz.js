// Logika kuis Cari Nilai (casual & competitive)

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

function adjustedTime(baseTime, minTime) {
  if (userTotalCorrect <= 20) return baseTime;
  const reduction = Math.floor((userTotalCorrect - 20) / 10);
  return Math.max(baseTime - reduction, minTime);
}

function buildNilaiQuestions(counts) {
  // counts: { easy, medium, hard }
  const funcs = ['sin', 'cos', 'tan'];
  const times  = {
    easy:   adjustedTime(DIFFICULTY.easy.time,   5),
    medium: adjustedTime(DIFFICULTY.medium.time, 8),
    hard:   adjustedTime(DIFFICULTY.hard.time,   10),
  };
  const selected = [
    ...pickRandom(DIFFICULTY.easy.angles,   counts.easy).map(a  => ({ angle: a, diff: 'easy',   time: times.easy   })),
    ...pickRandom(DIFFICULTY.medium.angles, counts.medium).map(a => ({ angle: a, diff: 'medium', time: times.medium })),
    ...pickRandom(DIFFICULTY.hard.angles,   counts.hard).map(a   => ({ angle: a, diff: 'hard',   time: times.hard   })),
  ];
  return shuffle(selected).map(({ angle, diff, time }) => {
    const func = funcs[Math.floor(Math.random() * 3)];
    const { d: correct, m: method } = TRIG[angle][func];
    const wrongPool = ANSWER_POOL.filter(v => v !== correct);
    const choices   = shuffle([correct, ...pickRandom(wrongPool, 3)]);
    return { angle, func, correct, method, choices, diff, time };
  });
}

function generateQuestions() {
  return buildNilaiQuestions({ easy: 3, medium: 3, hard: 4 }); // 10 total
}

// ─── Session ─────────────────────────────────────────────────────────────────

function startSession() {
  sessionMode  = 'casual';
  questions    = generateQuestions();
  currentIndex = 0;
  results      = [];
  showQuestion(0);
}

function showQuestion(idx) {
  showScreen('screen-question');
  answered = false;

  const q        = questions[idx];
  const total    = sessionMode === 'competitive' ? 15 : 10;
  const qNum     = sessionMode === 'competitive' ? idx + 1 : idx + 1;
  const diffLabel = { easy: 'Mudah', medium: 'Sedang', hard: 'Sulit' }[q.diff];

  document.getElementById('question-progress').textContent = `Soal ${qNum} dari ${total}`;
  const badge = document.getElementById('question-difficulty');
  badge.textContent = diffLabel;
  badge.className   = `difficulty-badge difficulty-${q.diff}`;
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

  const timerRow = document.getElementById('question-timer-row');
  if (sessionMode === 'competitive') {
    timerRow.classList.remove('hidden');
    startTimer(q.time);
  } else {
    timerRow.classList.add('hidden');
    clearInterval(timerInterval);
  }
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
  if (sessionMode === 'competitive') stopTimer();

  const q         = questions[currentIndex];
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

  const isLast   = currentIndex === questions.length - 1;
  const nextLabel = (isLast && sessionMode === 'casual') ? 'Lihat Hasil' : 'Lanjut →';

  if (isCorrect) {
    panel.classList.add('feedback-correct');
    panel.innerHTML = `
      <div class="feedback-header correct">✓ Benar!</div>
      <button class="btn-next" onclick="nextQuestion()">${nextLabel}</button>
    `;
  } else {
    const headerText  = isTimeout ? '⏱ Waktu Habis!' : '✗ Salah!';
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
    if (sessionMode === 'competitive') {
      compTransitionToSudut();
    } else {
      finishSession();
    }
  } else {
    showQuestion(currentIndex);
  }
}

// ─── Summary (casual only) ────────────────────────────────────────────────────

function finishSession() {
  const correct = results.filter(r => r.isCorrect).length;
  const wrong   = results.length - correct;
  const pct     = Math.round((correct / results.length) * 100);

  showScreen('screen-summary');

  const emojis = ['📚', '📚', '💪', '💪', '😊', '😊', '👍', '👍', '🌟', '🌟', '🌟'];
  document.getElementById('score-emoji').textContent      = emojis[correct] || '📚';
  document.getElementById('summary-name').textContent     = currentUser;
  document.getElementById('summary-score').textContent    = `${correct} / ${results.length}`;
  document.getElementById('summary-percent').textContent  = `${pct}%`;
  document.getElementById('summary-correct').textContent  = `✓ ${correct} benar`;
  document.getElementById('summary-wrong').textContent    = `✗ ${wrong} salah`;

  document.getElementById('summary-details').innerHTML = results.map((r, i) => {
    const cls      = r.isCorrect ? 'result-correct' : 'result-wrong';
    const ansHtml  = r.isCorrect
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
        </div>${methodHtml}
      </div>`;
  }).join('');
}
