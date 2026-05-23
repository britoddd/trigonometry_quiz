// Merender tabel sudut istimewa (transposed: fungsi sebagai baris, sudut sebagai kolom)

function showTabel() {
  showScreen('screen-tabel');

  const isTD  = v => v === 'Tidak Terdefinisi';
  const cls   = v => isTD(v) ? 'val-undef' : v.startsWith('-') ? 'val-neg' : v === '0' ? 'val-zero' : 'val-pos';
  const disp  = v => isTD(v) ? '∞' : v;

  // Header row: empty corner + semua sudut
  const thead = document.getElementById('tabel-head');
  thead.innerHTML = `
    <tr>
      <th class="tabel-func-header"></th>
      ${ALL_ANGLES.map(a => `<th>${a}°</th>`).join('')}
    </tr>`;

  // Satu baris per fungsi
  const tbody = document.getElementById('tabel-body');
  tbody.innerHTML = ['sin', 'cos', 'tan'].map(func => `
    <tr>
      <td class="tabel-func-label">${func}</td>
      ${ALL_ANGLES.map(a => {
        const v = TRIG[a][func].d;
        return `<td class="${cls(v)}">${disp(v)}</td>`;
      }).join('')}
    </tr>`).join('');
}
