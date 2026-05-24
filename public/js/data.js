// Seluruh data nilai trigonometri sudut istimewa

const TRIG = {
  0: {
    sin: { d: '0',    m: 'sin(0°) = 0. Sudut 0° berada di sumbu x positif dengan koordinat (1, 0), sehingga nilai y = 0.' },
    cos: { d: '1',    m: 'cos(0°) = 1. Sudut 0° berada di sumbu x positif dengan koordinat (1, 0), sehingga nilai x = 1.' },
    tan: { d: '0',    m: 'tan(0°) = sin(0°) / cos(0°) = 0 / 1 = 0.' },
  },
  30: {
    sin: { d: '1/2',  m: 'sin(30°) = 1/2. Pada segitiga 30-60-90: sisi depan 30° = 1, sisi miring = 2, maka sin(30°) = 1/2.' },
    cos: { d: '√3/2', m: 'cos(30°) = √3/2. Pada segitiga 30-60-90: sisi samping 30° = √3, sisi miring = 2, maka cos(30°) = √3/2.' },
    tan: { d: '√3/3', m: 'tan(30°) = sin(30°) / cos(30°) = (1/2) / (√3/2) = 1/√3 = √3/3.' },
  },
  45: {
    sin: { d: '√2/2', m: 'sin(45°) = √2/2. Segitiga sama kaki siku-siku dengan sisi = 1 dan sisi miring = √2, maka sin(45°) = 1/√2 = √2/2.' },
    cos: { d: '√2/2', m: 'cos(45°) = √2/2. Segitiga sama kaki siku-siku: sisi miring = √2, maka cos(45°) = 1/√2 = √2/2.' },
    tan: { d: '1',    m: 'tan(45°) = sin(45°) / cos(45°) = (√2/2) / (√2/2) = 1.' },
  },
  60: {
    sin: { d: '√3/2', m: 'sin(60°) = √3/2. Pada segitiga 30-60-90: sisi depan 60° = √3, sisi miring = 2, maka sin(60°) = √3/2.' },
    cos: { d: '1/2',  m: 'cos(60°) = 1/2. Pada segitiga 30-60-90: sisi samping 60° = 1, sisi miring = 2, maka cos(60°) = 1/2.' },
    tan: { d: '√3',   m: 'tan(60°) = sin(60°) / cos(60°) = (√3/2) / (1/2) = √3.' },
  },
  90: {
    sin: { d: '1',               m: 'sin(90°) = 1. Sudut 90° berada di sumbu y positif dengan koordinat (0, 1), sehingga nilai y = 1.' },
    cos: { d: '0',               m: 'cos(90°) = 0. Sudut 90° berada di sumbu y positif dengan koordinat (0, 1), sehingga nilai x = 0.' },
    tan: { d: 'Tidak Terdefinisi', m: 'tan(90°) tidak terdefinisi. Karena cos(90°) = 0, dan tan = sin/cos, terjadi pembagian dengan nol yang tidak terdefinisi.' },
  },
  120: {
    sin: { d: '√3/2',  m: 'sin(120°) di kuadran II. Sudut acuan = 180° − 120° = 60°. Di kuadran II, sin bernilai positif, jadi sin(120°) = sin(60°) = √3/2.' },
    cos: { d: '-1/2',  m: 'cos(120°) di kuadran II. Sudut acuan = 60°. Di kuadran II, cos bernilai negatif, jadi cos(120°) = −cos(60°) = −1/2.' },
    tan: { d: '-√3',   m: 'tan(120°) di kuadran II. Sudut acuan = 60°. Di kuadran II, tan bernilai negatif, jadi tan(120°) = −tan(60°) = −√3.' },
  },
  135: {
    sin: { d: '√2/2',  m: 'sin(135°) di kuadran II. Sudut acuan = 180° − 135° = 45°. Di kuadran II, sin bernilai positif, jadi sin(135°) = sin(45°) = √2/2.' },
    cos: { d: '-√2/2', m: 'cos(135°) di kuadran II. Sudut acuan = 45°. Di kuadran II, cos bernilai negatif, jadi cos(135°) = −cos(45°) = −√2/2.' },
    tan: { d: '-1',    m: 'tan(135°) di kuadran II. Sudut acuan = 45°. Di kuadran II, tan bernilai negatif, jadi tan(135°) = −tan(45°) = −1.' },
  },
  150: {
    sin: { d: '1/2',   m: 'sin(150°) di kuadran II. Sudut acuan = 180° − 150° = 30°. Di kuadran II, sin bernilai positif, jadi sin(150°) = sin(30°) = 1/2.' },
    cos: { d: '-√3/2', m: 'cos(150°) di kuadran II. Sudut acuan = 30°. Di kuadran II, cos bernilai negatif, jadi cos(150°) = −cos(30°) = −√3/2.' },
    tan: { d: '-√3/3', m: 'tan(150°) di kuadran II. Sudut acuan = 30°. Di kuadran II, tan bernilai negatif, jadi tan(150°) = −tan(30°) = −√3/3.' },
  },
  180: {
    sin: { d: '0',  m: 'sin(180°) = 0. Sudut 180° berada di sumbu x negatif dengan koordinat (−1, 0), sehingga nilai y = 0.' },
    cos: { d: '-1', m: 'cos(180°) = −1. Sudut 180° berada di sumbu x negatif dengan koordinat (−1, 0), sehingga nilai x = −1.' },
    tan: { d: '0',  m: 'tan(180°) = sin(180°) / cos(180°) = 0 / (−1) = 0.' },
  },
  210: {
    sin: { d: '-1/2',  m: 'sin(210°) di kuadran III. Sudut acuan = 210° − 180° = 30°. Di kuadran III, sin bernilai negatif, jadi sin(210°) = −sin(30°) = −1/2.' },
    cos: { d: '-√3/2', m: 'cos(210°) di kuadran III. Sudut acuan = 30°. Di kuadran III, cos bernilai negatif, jadi cos(210°) = −cos(30°) = −√3/2.' },
    tan: { d: '√3/3',  m: 'tan(210°) di kuadran III. Sudut acuan = 30°. Di kuadran III, tan bernilai positif, jadi tan(210°) = tan(30°) = √3/3.' },
  },
  225: {
    sin: { d: '-√2/2', m: 'sin(225°) di kuadran III. Sudut acuan = 225° − 180° = 45°. Di kuadran III, sin bernilai negatif, jadi sin(225°) = −sin(45°) = −√2/2.' },
    cos: { d: '-√2/2', m: 'cos(225°) di kuadran III. Sudut acuan = 45°. Di kuadran III, cos bernilai negatif, jadi cos(225°) = −cos(45°) = −√2/2.' },
    tan: { d: '1',     m: 'tan(225°) di kuadran III. Sudut acuan = 45°. Di kuadran III, tan bernilai positif, jadi tan(225°) = tan(45°) = 1.' },
  },
  240: {
    sin: { d: '-√3/2', m: 'sin(240°) di kuadran III. Sudut acuan = 240° − 180° = 60°. Di kuadran III, sin bernilai negatif, jadi sin(240°) = −sin(60°) = −√3/2.' },
    cos: { d: '-1/2',  m: 'cos(240°) di kuadran III. Sudut acuan = 60°. Di kuadran III, cos bernilai negatif, jadi cos(240°) = −cos(60°) = −1/2.' },
    tan: { d: '√3',    m: 'tan(240°) di kuadran III. Sudut acuan = 60°. Di kuadran III, tan bernilai positif, jadi tan(240°) = tan(60°) = √3.' },
  },
  270: {
    sin: { d: '-1',              m: 'sin(270°) = −1. Sudut 270° berada di sumbu y negatif dengan koordinat (0, −1), sehingga nilai y = −1.' },
    cos: { d: '0',               m: 'cos(270°) = 0. Sudut 270° berada di sumbu y negatif dengan koordinat (0, −1), sehingga nilai x = 0.' },
    tan: { d: 'Tidak Terdefinisi', m: 'tan(270°) tidak terdefinisi. Karena cos(270°) = 0, terjadi pembagian dengan nol.' },
  },
  300: {
    sin: { d: '-√3/2', m: 'sin(300°) di kuadran IV. Sudut acuan = 360° − 300° = 60°. Di kuadran IV, sin bernilai negatif, jadi sin(300°) = −sin(60°) = −√3/2.' },
    cos: { d: '1/2',   m: 'cos(300°) di kuadran IV. Sudut acuan = 60°. Di kuadran IV, cos bernilai positif, jadi cos(300°) = cos(60°) = 1/2.' },
    tan: { d: '-√3',   m: 'tan(300°) di kuadran IV. Sudut acuan = 60°. Di kuadran IV, tan bernilai negatif, jadi tan(300°) = −tan(60°) = −√3.' },
  },
  315: {
    sin: { d: '-√2/2', m: 'sin(315°) di kuadran IV. Sudut acuan = 360° − 315° = 45°. Di kuadran IV, sin bernilai negatif, jadi sin(315°) = −sin(45°) = −√2/2.' },
    cos: { d: '√2/2',  m: 'cos(315°) di kuadran IV. Sudut acuan = 45°. Di kuadran IV, cos bernilai positif, jadi cos(315°) = cos(45°) = √2/2.' },
    tan: { d: '-1',    m: 'tan(315°) di kuadran IV. Sudut acuan = 45°. Di kuadran IV, tan bernilai negatif, jadi tan(315°) = −tan(45°) = −1.' },
  },
  330: {
    sin: { d: '-1/2',  m: 'sin(330°) di kuadran IV. Sudut acuan = 360° − 330° = 30°. Di kuadran IV, sin bernilai negatif, jadi sin(330°) = −sin(30°) = −1/2.' },
    cos: { d: '√3/2',  m: 'cos(330°) di kuadran IV. Sudut acuan = 30°. Di kuadran IV, cos bernilai positif, jadi cos(330°) = cos(30°) = √3/2.' },
    tan: { d: '-√3/3', m: 'tan(330°) di kuadran IV. Sudut acuan = 30°. Di kuadran IV, tan bernilai negatif, jadi tan(330°) = −tan(30°) = −√3/3.' },
  },
  360: {
    sin: { d: '0', m: 'sin(360°) = sin(0°) = 0. Satu putaran penuh kembali ke posisi awal di sumbu x positif.' },
    cos: { d: '1', m: 'cos(360°) = cos(0°) = 1. Satu putaran penuh kembali ke posisi awal di sumbu x positif.' },
    tan: { d: '0', m: 'tan(360°) = tan(0°) = 0. Satu putaran penuh kembali ke posisi awal.' },
  },
};

const DIFFICULTY = {
  easy:   { angles: [0, 90, 180, 270, 360], time: 12 },
  medium: { angles: [30, 45, 60],            time: 20 },
  hard:   { angles: [120, 135, 150, 210, 225, 240, 300, 315, 330], time: 30 },
};

const ANSWER_POOL = [
  '0', '1', '-1',
  '1/2', '-1/2',
  '√2/2', '-√2/2',
  '√3/2', '-√3/2',
  '√3', '-√3',
  '√3/3', '-√3/3',
  'Tidak Terdefinisi',
];

const ALL_ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];
