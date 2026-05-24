// State aplikasi dan helper global

let currentUser      = null;
let userTotalCorrect = 0;
let sessionMode      = 'casual'; // 'casual' | 'competitive'
let sessionStartTime = 0;
let questions        = [];
let currentIndex     = 0;
let results          = [];
let timerInterval    = null;
let timeLeft         = 0;
let answered         = false;

// ─── Cookie ──────────────────────────────────────────────────────────────────

function setCookie(name, value, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const [k, val] = v.split('=');
    return k === name ? decodeURIComponent(val) : r;
  }, null);
}

// ─── Screen ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
