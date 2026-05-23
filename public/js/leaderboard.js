// Memuat dan merender papan peringkat

async function loadLeaderboard() {
  showScreen('screen-leaderboard');
  const tbody = document.getElementById('leaderboard-body');
  tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Memuat...</td></tr>';

  try {
    const res  = await fetch('/api/leaderboard');
    const data = await res.json();

    if (!data.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="table-empty">Belum ada data. Jadilah yang pertama!</td></tr>';
      return;
    }

    const rankEmoji = ['🥇', '🥈', '🥉'];
    tbody.innerHTML = data.map((u, i) => {
      const total      = u.totalCorrect + u.totalWrong;
      const avg        = total > 0 ? Math.round((u.totalCorrect / total) * 100) : 0;
      const isMe       = u.username === currentUser;
      const rankClass  = i < 3 ? `rank-${i + 1}` : '';
      const rankDisplay = rankEmoji[i] || (i + 1);
      const youBadge   = isMe ? ' <span class="you-badge">Kamu</span>' : '';
      return `
        <tr class="${rankClass}${isMe ? ' current-user-row' : ''}">
          <td>${rankDisplay}</td>
          <td>${u.username}${youBadge}</td>
          <td class="correct-cell">${u.totalCorrect}</td>
          <td class="wrong-cell">${u.totalWrong}</td>
          <td>${avg}%</td>
          <td>${u.sessions}</td>
        </tr>`;
    }).join('');
  } catch {
    tbody.innerHTML = '<tr><td colspan="6" class="table-empty" style="color:var(--error)">Gagal memuat data.</td></tr>';
  }
}
