const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR  = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'leaderboard.json');
const ADMIN_KEY = 'admin';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '{}');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Data helpers ─────────────────────────────────────────────────────────────

function readData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return {}; }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ─── Public API ───────────────────────────────────────────────────────────────

app.get('/api/leaderboard', (req, res) => {
  const data   = readData();
  const sorted = Object.values(data).sort((a, b) => {
    if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
    const aTotal = a.totalCorrect + a.totalWrong;
    const bTotal = b.totalCorrect + b.totalWrong;
    const aAvg   = aTotal > 0 ? a.totalCorrect / aTotal : 0;
    const bAvg   = bTotal > 0 ? b.totalCorrect / bTotal : 0;
    return bAvg - aAvg;
  });
  res.json(sorted);
});

app.post('/api/score', (req, res) => {
  const { username, correct, wrong } = req.body;
  if (!username || typeof correct !== 'number' || typeof wrong !== 'number') {
    return res.status(400).json({ error: 'Data tidak valid' });
  }

  const data = readData();
  if (!data[username]) {
    data[username] = { username, totalCorrect: 0, totalWrong: 0, sessions: 0 };
  }

  data[username].totalCorrect += correct;
  data[username].totalWrong   += wrong;
  data[username].sessions     += 1;

  writeData(data);
  res.json(data[username]);
});

// ─── Admin page ───────────────────────────────────────────────────────────────

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ─── Admin API middleware ──────────────────────────────────────────────────────

function adminAuth(req, res, next) {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(403).json({ error: 'Akses ditolak' });
  }
  next();
}

// GET /admin/api/users — semua pengguna, urut berdasarkan total benar
app.get('/admin/api/users', adminAuth, (req, res) => {
  const data   = readData();
  const sorted = Object.values(data).sort((a, b) => b.totalCorrect - a.totalCorrect);
  res.json(sorted);
});

// DELETE /admin/api/users/:username — hapus satu pengguna
app.delete('/admin/api/users/:username', adminAuth, (req, res) => {
  const data = readData();
  const key  = req.params.username;
  if (!data[key]) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
  delete data[key];
  writeData(data);
  res.json({ ok: true });
});

// PUT /admin/api/users/:username/reset — reset skor ke nol, akun tetap ada
app.put('/admin/api/users/:username/reset', adminAuth, (req, res) => {
  const data = readData();
  const key  = req.params.username;
  if (!data[key]) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
  data[key].totalCorrect = 0;
  data[key].totalWrong   = 0;
  data[key].sessions     = 0;
  writeData(data);
  res.json(data[key]);
});

// DELETE /admin/api/users — hapus semua data
app.delete('/admin/api/users', adminAuth, (req, res) => {
  writeData({});
  res.json({ ok: true });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Admin panel  di http://localhost:${PORT}/admin`);
});
