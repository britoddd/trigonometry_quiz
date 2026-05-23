// Merender tabel sudut istimewa

function showTabel() {
  showScreen('screen-tabel');

  const tbody = document.getElementById('tabel-body');
  tbody.innerHTML = ALL_ANGLES.map(angle => {
    const sin = TRIG[angle].sin.d;
    const cos = TRIG[angle].cos.d;
    const tan = TRIG[angle].tan.d;
    const isTD = v => v === 'Tidak Terdefinisi';
    return `
      <tr>
        <td class="tabel-angle">${angle}°</td>
        <td class="${sin.startsWith('-') ? 'val-neg' : sin === '0' ? 'val-zero' : 'val-pos'}">${sin}</td>
        <td class="${cos.startsWith('-') ? 'val-neg' : cos === '0' ? 'val-zero' : 'val-pos'}">${cos}</td>
        <td class="${isTD(tan) ? 'val-undef' : tan.startsWith('-') ? 'val-neg' : tan === '0' ? 'val-zero' : 'val-pos'}">${isTD(tan) ? '∞' : tan}</td>
      </tr>`;
  }).join('');
}
