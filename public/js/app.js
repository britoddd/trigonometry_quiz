// Init dan event listeners

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
  document.getElementById('menu-username').textContent = currentUser;
  showScreen('screen-menu');
});

document.getElementById('btn-start-session').addEventListener('click', startSession);
document.getElementById('btn-leaderboard-menu').addEventListener('click', loadLeaderboard);
document.getElementById('btn-tabel-menu').addEventListener('click', showTabel);
document.getElementById('btn-back-from-leaderboard').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-back-from-tabel').addEventListener('click', () => showScreen('screen-menu'));
document.getElementById('btn-play-again').addEventListener('click', startSession);
document.getElementById('btn-leaderboard-from-summary').addEventListener('click', loadLeaderboard);
document.getElementById('btn-menu-from-summary').addEventListener('click', () => showScreen('screen-menu'));

document.addEventListener('DOMContentLoaded', init);
