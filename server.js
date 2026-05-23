const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'leaderboard.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '{}');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/leaderboard', (req, res) => {
  const data = readData();
  const sorted = Object.values(data).sort((a, b) => {
    if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
    const aTotal = a.totalCorrect + a.totalWrong;
    const bTotal = b.totalCorrect + b.totalWrong;
    const aAvg = aTotal > 0 ? a.totalCorrect / aTotal : 0;
    const bAvg = bTotal > 0 ? b.totalCorrect / bTotal : 0;
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
  data[username].totalWrong += wrong;
  data[username].sessions += 1;

  writeData(data);
  res.json(data[username]);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
