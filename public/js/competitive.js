// Mode Kompetitif: 8 Cari Nilai + 7 Cari Sudut, timer aktif, rekam ke leaderboard

let compNilaiResults = [];

function generateCompNilaiQuestions() {
  return buildNilaiQuestions({ easy: 3, medium: 2, hard: 3 }); // 8 total
}

function generateCompSudutQuestions() {
  return shuffle(buildReversePool()).slice(0, 7);
}

function startCompetitiveSession() {
  sessionMode      = 'competitive';
  sessionStartTime = Date.now();
  questions        = generateCompNilaiQuestions();
  currentIndex     = 0;
  results          = [];
  compNilaiResults = [];
  showQuestion(0);
}

function compTransitionToSudut() {
  compNilaiResults = [...results];
  reverseQuestions = generateCompSudutQuestions();
  reverseIndex     = 0;
  reverseResults   = [];
  showReverseQuestion(0);
}

async function compFinishSession() {
  const duration = Math.round((Date.now() - sessionStartTime) / 1000);

  const nilaiCorrect  = compNilaiResults.filter(r => r.isCorrect).length;
  const nilaiWrong    = compNilaiResults.length - nilaiCorrect;
  const sudutEarned   = reverseResults.reduce((s, r) => s + r.earned,   0);
  const sudutPossible = reverseResults.reduce((s, r) => s + r.possible, 0);

  try {
    await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser, correct: nilaiCorrect, wrong: nilaiWrong, duration }),
    });
    await fetch('/api/score2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: currentUser, earned: sudutEarned, possible: sudutPossible, duration }),
    });
    userTotalCorrect += nilaiCorrect;
  } catch { /* silent */ }

  showCompetitiveSummary(nilaiCorrect, nilaiWrong, sudutEarned, sudutPossible, duration);
}

function showCompetitiveSummary(nilaiCorrect, nilaiWrong, sudutEarned, sudutPossible, duration) {
  const totalEarned   = nilaiCorrect + sudutEarned;
  const totalPossible = 8 + sudutPossible;
  const pct = totalPossible > 0 ? Math.round((totalEarned / totalPossible) * 100) : 0;

  showScreen('screen-summary-competitive');

  const emoji = pct >= 90 ? '🌟' : pct >= 70 ? '👍' : pct >= 50 ? '😊' : pct >= 30 ? '💪' : '📚';
  document.getElementById('cs-emoji').textContent   = emoji;
  document.getElementById('cs-name').textContent    = currentUser;
  document.getElementById('cs-score').textContent   = `${totalEarned} / ${totalPossible}`;
  document.getElementById('cs-percent').textContent = `${pct}%`;

  const mm = Math.floor(duration / 60);
  const ss = String(duration % 60).padStart(2, '0');
  const durStr = mm > 0 ? `${mm}:${ss}` : `${duration}s`;

  document.getElementById('cs-breakdown').innerHTML =
    `<span class="stat-correct">✓ ${nilaiCorrect}/8 nilai</span>` +
    `<span class="stat-divider">·</span>` +
    `<span style="color:#7C3AED;font-weight:600;">${sudutEarned}/${sudutPossible} poin sudut</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat-time">⏱ ${durStr}</span>`;

  const nilaiDetails = compNilaiResults.map((r, i) => {
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

  const sudutDetails = reverseResults.map((r, i) => {
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
          <span class="result-num">${8 + i + 1}.</span>
          <span class="result-question">${r.func}(?) = ${r.val}</span>
          <span class="result-answer">${r.earned}/${r.possible}</span>
        </div>
        <div class="result-angles">${tags}</div>
      </div>`;
  }).join('');

  document.getElementById('cs-details').innerHTML =
    `<div class="comp-section-label">Cari Nilai (8 soal)</div>` +
    nilaiDetails +
    `<div class="comp-section-label">Cari Sudut (7 soal)</div>` +
    sudutDetails;
}
