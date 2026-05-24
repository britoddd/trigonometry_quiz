// Init dan event listeners

async function fetchUserStats() {
  try {
    const res  = await fetch('/api/leaderboard');
    const data = await res.json();
    const user = data.find(u => u.username === currentUser);
    userTotalCorrect = user ? user.totalCorrect : 0;
  } catch {
    userTotalCorrect = 0;
  }
}

function init() {
  const saved = getCookie('trig_user');
  if (saved) {
    currentUser = saved;
    document.getElementById('menu-username').textContent = currentUser;
    fetchUserStats();
    showScreen('screen-menu');
  } else {
    showScreen('screen-welcome');
  }
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

document.getElementById('input-username').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-start-welcome').click();
});

document.getElementById('btn-start-welcome').addEventListener('click', () => {
  const name = document.getElementById('input-username').value.trim();
  const err  = document.getElementById('username-error');
  if (!name) { err.textContent = 'Masukkan nama terlebih dahulu.'; return; }
  err.textContent = '';
  currentUser = name;
  setCookie('trig_user', name, 365);
  fetchUserStats();
  document.getElementById('menu-username').textContent = currentUser;
  showScreen('screen-menu');
});

document.getElementById('btn-start-session').addEventListener('click', startSession);
document.getElementById('btn-start-reverse').addEventListener('click', startReverseSession);
document.getElementById('btn-start-competitive').addEventListener('click', startCompetitiveSession);
document.getElementById('btn-leaderboard-menu').addEventListener('click', () => loadLeaderboard(1));
document.getElementById('btn-tabel-menu').addEventListener('click', showTabel);
document.getElementById('btn-back-from-leaderboard').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-back-from-tabel').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-play-again').addEventListener('click', startSession);
document.getElementById('btn-leaderboard-from-summary').addEventListener('click', () => loadLeaderboard(1));
document.getElementById('btn-menu-from-summary').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('rq-confirm').addEventListener('click', handleReverseConfirm);
document.getElementById('btn-play-again-reverse').addEventListener('click', startReverseSession);
document.getElementById('btn-leaderboard-from-reverse').addEventListener('click', () => loadLeaderboard(2));
document.getElementById('btn-menu-from-reverse').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-play-again-comp').addEventListener('click', startCompetitiveSession);
document.getElementById('btn-leaderboard-from-comp').addEventListener('click', () => loadLeaderboard(1));
document.getElementById('btn-menu-from-comp').addEventListener('click', () => showScreen('screen-menu'));

document.addEventListener('DOMContentLoaded', init);
