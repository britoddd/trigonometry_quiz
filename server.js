const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR      = path.join(__dirname, 'data');
const DATA_FILE     = path.join(DATA_DIR, 'leaderboard.json');
const DATA_FILE2    = path.join(DATA_DIR, 'leaderboard2.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');
const ADMIN_KEY     = 'admin';

if (!fs.existsSync(DATA_DIR))      fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE))     fs.writeFileSync(DATA_FILE,     '{}');
if (!fs.existsSync(DATA_FILE2))    fs.writeFileSync(DATA_FILE2,    '{}');
if (!fs.existsSync(SESSIONS_FILE)) fs.writeFileSync(SESSIONS_FILE, '[]');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Data helpers ─────────────────────────────────────────────────────────────

function readData()  { try { return JSON.parse(fs.readFileSync(DATA_FILE,  'utf8')); } catch { return {}; } }
function writeData(d)  { fs.writeFileSync(DATA_FILE,  JSON.stringify(d, null, 2)); }

function readData2() { try { return JSON.parse(fs.readFileSync(DATA_FILE2, 'utf8')); } catch { return {}; } }
function writeData2(d) { fs.writeFileSync(DATA_FILE2, JSON.stringify(d, null, 2)); }

function readSessions()  { try { return JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8')); } catch { return []; } }
function writeSessions(s)  { fs.writeFileSync(SESSIONS_FILE, JSON.stringify(s, null, 2)); }

function addSession(record) {
  const sessions = readSessions();
  sessions.unshift(record);
  if (sessions.length > 1000) sessions.length = 1000;
  writeSessions(sessions);
}

// ─── Public API ───────────────────────────────────────────────────────────────

app.get('/api/leaderboard', (req, res) => {
  const data   = readData();
  const sorted = Object.values(data).sort((a, b) => {
    if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
    const aAvg = (a.totalCorrect + a.totalWrong) > 0 ? a.totalCorrect / (a.totalCorrect + a.totalWrong) : 0;
    const bAvg = (b.totalCorrect + b.totalWrong) > 0 ? b.totalCorrect / (b.totalCorrect + b.totalWrong) : 0;
    return bAvg - aAvg;
  });
  res.json(sorted);
});

app.post('/api/score', (req, res) => {
  const { username, correct, wrong, duration } = req.body;
  if (!username || typeof correct !== 'number' || typeof wrong !== 'number') {
    return res.status(400).json({ error: 'Data tidak valid' });
  }

  const data = readData();
  if (!data[username]) {
    data[username] = { username, totalCorrect: 0, totalWrong: 0, sessions: 0, bestTime: null };
  }

  data[username].totalCorrect += correct;
  data[username].totalWrong   += wrong;
  data[username].sessions     += 1;

  if (typeof duration === 'number' && duration > 0) {
    if (data[username].bestTime == null || duration < data[username].bestTime) {
      data[username].bestTime = duration;
    }
  }

  writeData(data);

  const total = correct + wrong;
  addSession({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    username, mode: 1,
    timestamp: new Date().toISOString(),
    correct, wrong,
    score: total > 0 ? Math.round((correct / total) * 100) : 0,
    duration: typeof duration === 'number' ? duration : null,
  });

  res.json(data[username]);
});

app.get('/api/leaderboard2', (req, res) => {
  const data   = readData2();
  const sorted = Object.values(data).sort((a, b) => {
    if (b.totalEarned !== a.totalEarned) return b.totalEarned - a.totalEarned;
    const aAcc = a.totalPossible > 0 ? a.totalEarned / a.totalPossible : 0;
    const bAcc = b.totalPossible > 0 ? b.totalEarned / b.totalPossible : 0;
    return bAcc - aAcc;
  });
  res.json(sorted);
});

app.post('/api/score2', (req, res) => {
  const { username, earned, possible, duration } = req.body;
  if (!username || typeof earned !== 'number' || typeof possible !== 'number') {
    return res.status(400).json({ error: 'Data tidak valid' });
  }

  const data = readData2();
  if (!data[username]) {
    data[username] = { username, totalEarned: 0, totalPossible: 0, sessions: 0 };
  }
  data[username].totalEarned   += earned;
  data[username].totalPossible += possible;
  data[username].sessions      += 1;
  writeData2(data);

  addSession({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    username, mode: 2,
    timestamp: new Date().toISOString(),
    earned, possible,
    score: possible > 0 ? Math.round((earned / possible) * 100) : 0,
    duration: typeof duration === 'number' ? duration : null,
  });

  res.json(data[username]);
});

app.get('/api/leaderboard/fastest', (req, res) => {
  const data   = readData();
  const sorted = Object.values(data)
    .filter(u => u.bestTime != null && u.bestTime > 0)
    .sort((a, b) => a.bestTime - b.bestTime);
  res.json(sorted);
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

// GET /admin/api/users
app.get('/admin/api/users', adminAuth, (req, res) => {
  const data   = readData();
  const sorted = Object.values(data).sort((a, b) => b.totalCorrect - a.totalCorrect);
  res.json(sorted);
});

// DELETE /admin/api/users/:username
app.delete('/admin/api/users/:username', adminAuth, (req, res) => {
  const data = readData();
  const key  = req.params.username;
  if (!data[key]) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
  delete data[key];
  writeData(data);
  res.json({ ok: true });
});

// PUT /admin/api/users/:username/reset
app.put('/admin/api/users/:username/reset', adminAuth, (req, res) => {
  const data = readData();
  const key  = req.params.username;
  if (!data[key]) return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
  data[key].totalCorrect = 0;
  data[key].totalWrong   = 0;
  data[key].sessions     = 0;
  data[key].bestTime     = null;
  writeData(data);
  res.json(data[key]);
});

// DELETE /admin/api/users — hapus semua data pengguna (kedua mode)
app.delete('/admin/api/users', adminAuth, (req, res) => {
  writeData({});
  writeData2({});
  res.json({ ok: true });
});

// GET /admin/api/sessions — riwayat sesi, newest first, optional ?username= filter
app.get('/admin/api/sessions', adminAuth, (req, res) => {
  let sessions = readSessions();
  if (req.query.username) {
    sessions = sessions.filter(s => s.username === req.query.username);
  }
  res.json(sessions.slice(0, 300));
});

// DELETE /admin/api/sessions — hapus semua riwayat sesi
app.delete('/admin/api/sessions', adminAuth, (req, res) => {
  writeSessions([]);
  res.json({ ok: true });
});

// ─── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log(`Admin panel  di http://localhost:${PORT}/admin`);
});
