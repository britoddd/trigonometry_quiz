// Memuat dan merender papan peringkat
// mode 1 = latihan pertama | mode 2 = terbalik | mode 3 = tercepat (latihan 1)

let leaderboardMode = 1;

function fmtTime(seconds) {
  if (seconds == null) return '—';
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

async function loadLeaderboard(mode = 1) {
  leaderboardMode = mode;
  showScreen('screen-leaderboard');

  document.getElementById('lb-tab-1').classList.toggle('active', mode === 1);
  document.getElementById('lb-tab-2').classList.toggle('active', mode === 2);
  document.getElementById('lb-tab-3').classList.toggle('active', mode === 3);

  const thead = document.getElementById('leaderboard-head');
  const tbody = document.getElementById('leaderboard-body');

  if (mode === 1) {
    thead.innerHTML = `<tr><th>#</th><th>Nama</th><th>✓ Benar</th><th>✗ Salah</th><th>Rata-rata</th><th>Sesi</th></tr>`;
  } else if (mode === 2) {
    thead.innerHTML = `<tr><th>#</th><th>Nama</th><th>Poin</th><th>Maks</th><th>Akurasi</th><th>Sesi</th></tr>`;
  } else {
    thead.innerHTML = `<tr><th>#</th><th>Nama</th><th>⚡ Waktu Terbaik</th><th>Sesi</th></tr>`;
  }
  tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Memuat...</td></tr>';

  try {
    const urlMap = { 1: '/api/leaderboard', 2: '/api/leaderboard2', 3: '/api/leaderboard/fastest' };
    const res  = await fetch(urlMap[mode]);
    const data = await res.json();
    const cols = mode === 3 ? 4 : 6;

    if (!data.length) {
      tbody.innerHTML = `<tr><td colspan="${cols}" class="table-empty">Belum ada data. Jadilah yang pertama!</td></tr>`;
      return;
    }

    const rankEmoji = ['🥇', '🥈', '🥉'];

    tbody.innerHTML = data.map((u, i) => {
      const isMe        = u.username === currentUser;
      const rankClass   = i < 3 ? `rank-${i + 1}` : '';
      const rankDisplay = rankEmoji[i] || (i + 1);
      const youBadge    = isMe ? ' <span class="you-badge">Kamu</span>' : '';

      let cells;
      if (mode === 1) {
        const total = u.totalCorrect + u.totalWrong;
        const avg   = total > 0 ? Math.round((u.totalCorrect / total) * 100) : 0;
        cells = `<td class="correct-cell">${u.totalCorrect}</td><td class="wrong-cell">${u.totalWrong}</td><td>${avg}%</td><td>${u.sessions}</td>`;
      } else if (mode === 2) {
        const acc = u.totalPossible > 0 ? Math.round((u.totalEarned / u.totalPossible) * 100) : 0;
        cells = `<td class="correct-cell">${u.totalEarned}</td><td>${u.totalPossible}</td><td>${acc}%</td><td>${u.sessions}</td>`;
      } else {
        cells = `<td class="best-time-cell">${fmtTime(u.bestTime)}</td><td>${u.sessions}</td>`;
      }

      return `
        <tr class="${rankClass}${isMe ? ' current-user-row' : ''}">
          <td>${rankDisplay}</td>
          <td>${u.username}${youBadge}</td>
          ${cells}
        </tr>`;
    }).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" class="table-empty" style="color:var(--error)">Gagal memuat data.</td></tr>';
  }
}
