# Trigonometri Sudut Istimewa

Aplikasi web kuis trigonometri sudut istimewa (sin, cos, tan) untuk sudut 0° – 360°.

## Cara Menjalankan

```bash
git clone <repo-url>
cd trigonometri_sudut_istimewa
npm install
npm start
```

Buka browser di **http://localhost:3000**

## Ubah Port

```bash
PORT=8080 npm start
```

## Fitur

- Kuis 10 soal per sesi (3 mudah, 3 sedang, 4 sulit)
- Timer per soal: 7 detik (mudah) · 11 detik (sedang) · 15 detik (sulit)
- Pilihan ganda 4 opsi dengan nilai eksakta
- Penjelasan metode untuk setiap jawaban salah
- Ringkasan hasil di akhir sesi
- Papan peringkat dengan total benar, salah, dan rata-rata
- Sesi tersimpan di cookie browser (tidak perlu login ulang)
