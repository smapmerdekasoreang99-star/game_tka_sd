/* Pos 4 — Data & Peluang: 3 misi × 10 level */
"use strict";

/* ---------- Kumpulan data ---------- */
const TEMA = [
  { judul: "Buah kesukaan siswa kelas 6", sat: "siswa", kat: ["Apel", "Jeruk", "Mangga", "Pisang", "Anggur", "Salak"] },
  { judul: "Olahraga kesukaan siswa", sat: "siswa", kat: ["Sepak bola", "Renang", "Bulu tangkis", "Voli", "Basket"] },
  { judul: "Kendaraan siswa ke sekolah", sat: "siswa", kat: ["Jalan kaki", "Sepeda", "Motor", "Mobil", "Angkot"] },
  { judul: "Buku yang dipinjam di perpustakaan", sat: "buku", kat: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"] },
  { judul: "Hasil panen jagung Pak Tani", sat: "kg", kat: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"] },
  { judul: "Pengunjung taman kota", sat: "orang", kat: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"] },
  { judul: "Warna kesukaan siswa", sat: "siswa", kat: ["Merah", "Biru", "Hijau", "Kuning", "Ungu"] },
];
function dataAcak(k, step = 1, min = 1, max = 10, beda = true) {
  const t = pilih(TEMA), kat = t.kat.slice(0, Math.min(k, t.kat.length)), v = [];
  while (v.length < kat.length) { const x = acak(min, max) * step; if (!beda || !v.includes(x)) v.push(x); }
  return { ...t, kat, v };
}
const tabelHtml = d => `<table class="tabel-data"><thead><tr><th>${d.kolom || "Kategori"}</th><th>Banyak (${d.sat})</th></tr></thead><tbody>${d.kat.map((k, i) => `<tr><td>${k}</td><td>${fmt(d.v[i])}</td></tr>`).join("")}</tbody></table>`;
function svgBatang(d, step) {
  const maks = Math.ceil(Math.max(...d.v) / step) * step + step, n = d.kat.length, bw = 34, gap = 18, x0 = 44, H = 170, W = x0 + n * (bw + gap) + 10, Y = v => 20 + H - v / maks * H;
  let s = svgBuka(W, H + 60, d.judul) + svgT(W / 2, 13, d.judul, 'text-anchor="middle" class="lbl"');
  for (let v = 0; v <= maks; v += step) s += `<line x1="${x0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}" class="kisi"/>` + svgT(x0 - 6, Y(v) + 4, fmt(v), 'text-anchor="end" class="kecil"');
  d.kat.forEach((k, i) => { const x = x0 + gap / 2 + i * (bw + gap); s += `<rect x="${x}" y="${Y(d.v[i])}" width="${bw}" height="${Y(0) - Y(d.v[i])}" class="batang b${i % 6}"/>` + svgT(x + bw / 2, Y(0) + 15, k, 'text-anchor="middle" class="mini"'); });
  return s + `<line x1="${x0}" y1="${Y(0)}" x2="${W - 6}" y2="${Y(0)}" class="sumbu"/></svg>`;
}
function svgGarisD(d, step) {
  const maks = Math.ceil(Math.max(...d.v) / step) * step + step, n = d.kat.length, x0 = 44, sp = 52, H = 160, W = x0 + (n - 1) * sp + 40, Y = v => 22 + H - v / maks * H, X = i => x0 + 20 + i * sp;
  let s = svgBuka(W, H + 56, d.judul) + svgT(W / 2, 13, d.judul, 'text-anchor="middle" class="lbl"');
  for (let v = 0; v <= maks; v += step) s += `<line x1="${x0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}" class="kisi"/>` + svgT(x0 - 6, Y(v) + 4, fmt(v), 'text-anchor="end" class="kecil"');
  s += `<polyline points="${d.v.map((v, i) => X(i) + "," + Y(v)).join(" ")}" class="garis-data"/>`;
  d.kat.forEach((k, i) => { s += `<circle cx="${X(i)}" cy="${Y(d.v[i])}" r="4" class="titik-k"/>` + svgT(X(i), Y(0) + 15, k, 'text-anchor="middle" class="mini"'); });
  return s + "</svg>";
}
function svgPiktogram(d, k, ikon) {
  const baris = d.kat.length, W = 330; let s = svgBuka(W, baris * 30 + 44, d.judul) + svgT(W / 2, 13, d.judul, 'text-anchor="middle" class="lbl"');
  d.kat.forEach((kt, i) => { s += svgT(4, 42 + i * 30, kt, 'class="mini"'); for (let j = 0; j < d.v[i] / k; j++) s += svgT(96 + j * 22, 44 + i * 30, ikon, 'class="emoji-kecil"'); });
  return s + svgT(W - 4, baris * 30 + 40, `${ikon} = ${k} ${d.sat}`, 'text-anchor="end" class="mini"') + "</svg>";
}
function svgLingkaranD(kat, pr, judul) {
  const c = 90, r = 78; let s = svgBuka(340, 190, judul), a0 = -Math.PI / 2;
  kat.forEach((k, i) => { const a1 = a0 + pr[i] / 100 * 2 * Math.PI, x0 = c + r * Math.cos(a0), y0 = c + r * Math.sin(a0) + 6, x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1) + 6;
    s += `<path d="M${c} ${c + 6}L${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${pr[i] > 50 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z" class="batang b${i % 6}"/>`;
    const am = (a0 + a1) / 2; s += svgT((c + r * 0.62 * Math.cos(am)).toFixed(1), (c + 6 + r * 0.62 * Math.sin(am) + 4).toFixed(1), pr[i] + "%", 'text-anchor="middle" class="mini tebal"'); a0 = a1; });
  kat.forEach((k, i) => { s += `<rect x="196" y="${22 + i * 24}" width="14" height="14" class="batang b${i % 6}"/>` + svgT(216, 34 + i * 24, k, 'class="mini"'); });
  return s + "</svg>";
}
const IKON = ["⭐", "🍎", "📘", "🙂", "⚽", "🌼"];

/* ================= Misi 1: Membaca diagram ================= */
daftarMisi("dat", "d1", "Membaca tabel & diagram", "📊", {
  1: [() => { const d = dataAcak(4, 1, 3, 20), i = acak(0, d.kat.length - 1); return isian(`Perhatikan tabel <b>${d.judul}</b>.${tabelHtml(d)}Banyak ${d.sat} pada <b>${d.kat[i]}</b> adalah …`, d.v[i], { satuan: d.sat, bahas: `Lihat baris ${d.kat[i]}: ${d.v[i]}.` }); }],
  2: [() => { const k = pilih([2, 5, 10]), d = dataAcak(4, k, 1, 6), i = acak(0, d.kat.length - 1), ik = pilih(IKON); return isian(`Perhatikan piktogram berikut. Banyak ${d.sat} pada <b>${d.kat[i]}</b> adalah …`, d.v[i], { gambar: svgPiktogram(d, k, ik), satuan: d.sat, petunjuk: `Setiap gambar mewakili ${k}.`, bahas: `${d.v[i] / k} gambar × ${k} = ${d.v[i]}.` }); }],
  3: [() => { const st = pilih([1, 2, 5]), d = dataAcak(5, st, 1, 10), i = acak(0, d.kat.length - 1); return isian(`Perhatikan diagram batang berikut. Banyak ${d.sat} pada <b>${d.kat[i]}</b> adalah …`, d.v[i], { gambar: svgBatang(d, st), satuan: d.sat, petunjuk: "Tarik garis dari ujung batang ke angka di kiri.", bahas: `Batang ${d.kat[i]} menunjukkan ${d.v[i]}.` }); }],
  4: [
    () => { const st = pilih([2, 5]), d = dataAcak(5, st, 1, 10), [i, j] = ambil([...d.kat.keys()], 2); return isian(`Perhatikan diagram batang. Selisih banyak ${d.sat} pada <b>${d.kat[i]}</b> dan <b>${d.kat[j]}</b> adalah …`, Math.abs(d.v[i] - d.v[j]), { gambar: svgBatang(d, st), satuan: d.sat, bahas: `${Math.max(d.v[i], d.v[j])} − ${Math.min(d.v[i], d.v[j])} = ${Math.abs(d.v[i] - d.v[j])}.` }); },
    keTKA(() => { const st = pilih([2, 5]), d = dataAcak(5, st, 1, 10), b = ya(), v = b ? Math.max(...d.v) : Math.min(...d.v), k = d.kat[d.v.indexOf(v)]; return pg(`Perhatikan diagram batang. Kategori dengan nilai <b>${b ? "paling banyak" : "paling sedikit"}</b> adalah …`, k, d.kat.filter(x => x !== k), { gambar: svgBatang(d, st), bahas: `${k}: ${v} ${d.sat}.` }); }),
  ],
  5: [
    () => { const st = pilih([2, 5]), d = dataAcak(5, st, 1, 8); return isian(`Perhatikan diagram batang. Jumlah seluruhnya adalah …`, d.v.reduce((a, b) => a + b), { gambar: svgBatang(d, st), satuan: d.sat, bahas: `${d.v.join(" + ")} = ${d.v.reduce((a, b) => a + b)}.` }); },
    () => { const k = pilih([2, 5, 10]), d = dataAcak(4, k, 1, 6, false); return isian(`Perhatikan piktogram. Jumlah seluruhnya adalah …`, d.v.reduce((a, b) => a + b), { gambar: svgPiktogram(d, k, pilih(IKON)), satuan: d.sat, petunjuk: "Hitung semua gambar, lalu kalikan.", bahas: `${d.v.reduce((a, b) => a + b) / k} gambar × ${k} = ${d.v.reduce((a, b) => a + b)}.` }); },
  ],
  6: [
    () => { const t = TEMA[4], st = pilih([5, 10]), v = t.kat.map(() => acak(2, 10) * st), d = { ...t, v }; const naik = v.slice(1).map((x, i) => x - v[i]), m = Math.max(...naik);
      if (m <= 0 || naik.filter(x => x === m).length > 1) return isian(`Perhatikan diagram garis. Hasil panen bulan ${t.kat[2]} adalah … kg.`, v[2], { gambar: svgGarisD(d, st), satuan: "kg", bahas: `${v[2]} kg.` });
      const i = naik.indexOf(m), j = `${t.kat[i]} ke ${t.kat[i + 1]}`; return pg(`Perhatikan diagram garis. Kenaikan hasil panen <b>paling besar</b> terjadi dari bulan …`, j, naik.map((_, k) => `${t.kat[k]} ke ${t.kat[k + 1]}`).filter(x => x !== j), { gambar: svgGarisD(d, st), petunjuk: "Cari garis yang paling curam naiknya.", bahas: `Kenaikan ${t.kat[i]} ke ${t.kat[i + 1]} = ${m} kg, paling besar.` }); },
  ],
  7: [
    () => { const st = pilih([2, 5]); let d; do d = dataAcak(5, st, 1, 10); while (!d.v.some((x, i) => d.v.some((y, j) => i !== j && x === 2 * y))); let i, j; for (i = 0; i < 5; i++) { j = d.v.findIndex(y => d.v[i] === 2 * y); if (j >= 0) break; }
      return isian(`Perhatikan diagram batang. Banyak ${d.sat} pada <b>${d.kat[i]}</b> adalah … kali banyak ${d.sat} pada <b>${d.kat[j]}</b>.`, 2, { gambar: svgBatang(d, st), bahas: `${d.v[i]} : ${d.v[j]} = 2.` }); },
    () => { const st = pilih([2, 5]); let d, tot; do { d = dataAcak(4, st, 1, 10); tot = d.v.reduce((a, b) => a + b); } while (!d.v.some(x => (x * 100) % tot === 0)); const i = d.v.findIndex(x => (x * 100) % tot === 0);
      return isian(`Perhatikan tabel <b>${d.judul}</b>.${tabelHtml(d)}Persentase ${d.sat} pada <b>${d.kat[i]}</b> dari seluruhnya adalah … %`, d.v[i] * 100 / tot, { satuan: "%", petunjuk: "Persentase = bagian : seluruhnya × 100%.", bahas: `${d.v[i]} : ${tot} × 100% = ${d.v[i] * 100 / tot}%.` }); },
  ],
  8: [() => { const st = pilih([2, 5]), d = dataAcak(5, st, 1, 10), tot = d.v.reduce((a, b) => a + b), mx = Math.max(...d.v), mn = Math.min(...d.v), [i, j] = ambil([0, 1, 2, 3, 4], 2);
    return bs(`Perhatikan diagram batang <b>${d.judul}</b>. Tentukan Benar atau Salah.`, [
      ya() ? { t: `Jumlah seluruhnya ${tot} ${d.sat}.`, b: true } : { t: `Jumlah seluruhnya ${tot + st} ${d.sat}.`, b: false },
      { t: `${d.kat[d.v.indexOf(mx)]} adalah yang paling banyak.`, b: true },
      ya() ? { t: `Selisih ${d.kat[i]} dan ${d.kat[j]} adalah ${Math.abs(d.v[i] - d.v[j])}.`, b: true } : { t: `Selisih ${d.kat[i]} dan ${d.kat[j]} adalah ${Math.abs(d.v[i] - d.v[j]) + st}.`, b: false },
      { t: `${d.kat[d.v.indexOf(mn)]} lebih banyak daripada ${d.kat[d.v.indexOf(mx)]}.`, b: false }], { gambar: svgBatang(d, st), bahas: `Data: ${d.kat.map((k, x) => `${k} ${d.v[x]}`).join(", ")}. Jumlah ${tot}.` }); }],
  9: [() => { const st = pilih([2, 5]), d = dataAcak(5, st, 1, 10), i = acak(0, 4), tot = d.v.reduce((a, b) => a + b), dd = { ...d, v: d.v.map((x, k) => (k === i ? 0 : x)) };
    return isian(`Diagram batang di bawah belum lengkap: batang <b>${d.kat[i]}</b> belum digambar. Jika jumlah seluruhnya ${tot} ${d.sat}, banyak ${d.sat} pada ${d.kat[i]} adalah …`, d.v[i], { gambar: svgBatang(dd, st), satuan: d.sat, petunjuk: "Jumlahkan yang ada, lalu kurangkan dari total.", bahas: `${tot} − (${dd.v.filter(x => x).join(" + ")}) = ${d.v[i]}.` }); }],
  10: [
    () => { const t = pilih([TEMA[0], TEMA[1], TEMA[6]]), pr = pilih([[40, 25, 20, 15], [30, 30, 25, 15], [35, 25, 25, 15], [50, 20, 20, 10], [45, 30, 15, 10], [25, 25, 30, 20]]), kat = t.kat.slice(0, 4), N = pilih([120, 160, 200, 240, 280, 320, 400]), i = acak(0, 3), j = (i + acak(1, 3)) % 4, sel = ya();
      return isian(`Diagram lingkaran menunjukkan <b>${t.judul}</b>. Jumlah seluruhnya ${N} ${t.sat}. ${sel ? `Selisih banyak ${t.sat} yang memilih ${kat[i]} dan ${kat[j]}` : `Banyak ${t.sat} yang memilih ${kat[i]}`} adalah …`, sel ? Math.abs(pr[i] - pr[j]) * N / 100 : pr[i] * N / 100,
        { gambar: svgLingkaranD(kat, pr, t.judul), satuan: t.sat, petunjuk: "Ubah persen menjadi banyak: persen × jumlah seluruhnya.", bahas: sel ? `(${Math.max(pr[i], pr[j])}% − ${Math.min(pr[i], pr[j])}%) × ${N} = ${Math.abs(pr[i] - pr[j]) * N / 100}.` : `${pr[i]}% × ${N} = ${pr[i] * N / 100}.` }); },
    () => { const pr = pilih([[40, 25, 20, 15], [30, 30, 25, 15], [50, 20, 20, 10]]), t = TEMA[2], kat = t.kat.slice(0, 4), i = acak(0, 3), x = pilih([6, 9, 12, 15, 18]) * 2, N = x * 100 / pr[i];
      if (!Number.isInteger(N)) return isian(`Pada diagram lingkaran, 25% siswa = 30 siswa. Jumlah seluruh siswa …`, 120, { bahas: "30 × 4 = 120." });
      return isian(`Diagram lingkaran menunjukkan <b>${t.judul}</b>. Jika siswa yang ${kat[i].toLowerCase()} ada ${x} siswa, jumlah seluruh siswa adalah …`, N, { gambar: svgLingkaranD(kat, pr, t.judul), satuan: "siswa", petunjuk: `${pr[i]}% = ${x} siswa. Berapa 100%?`, bahas: `${x} : ${pr[i]}% = ${x} × 100 : ${pr[i]} = ${N} siswa.` }); },
  ],
});

/* ================= Misi 2: Rata-rata, modus, median ================= */
const median = a => { const s = a.slice().sort((x, y) => x - y), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
function modusTunggal(a) { const f = {}; a.forEach(x => (f[x] = (f[x] || 0) + 1)); const m = Math.max(...Object.values(f)), k = Object.keys(f).filter(x => f[x] === m); return k.length === 1 ? +k[0] : null; }
function dataModus(n, min, max) { let a; do a = Array.from({ length: n }, () => acak(min, max)); while (modusTunggal(a) === null); return a; }
function dataRata(n, min, max) { let a; do a = Array.from({ length: n }, () => acak(min, max)); while (a.reduce((s, x) => s + x) % n); return a; }
const frekTabel = (nilai, f, judul = "Nilai") => `<table class="tabel-data"><thead><tr><th>${judul}</th>${nilai.map(v => `<th>${v}</th>`).join("")}</tr></thead><tbody><tr><td>Banyak siswa</td>${f.map(v => `<td>${v}</td>`).join("")}</tr></tbody></table>`;
daftarMisi("dat", "d2", "Rata-rata, modus, median", "🧮", {
  1: [() => { const a = dataModus(acak(6, 9), 5, 10); return isian(`Data nilai: <b>${a.join(", ")}</b>.<br>Modus data tersebut adalah …`, modusTunggal(a), { petunjuk: "Modus = nilai yang paling sering muncul.", bahas: `${modusTunggal(a)} muncul paling sering.` }); }],
  2: [() => { const n = acak(3, 5), a = dataRata(n, 2, 20); const r = a.reduce((s, x) => s + x) / n; return isian(`Rata-rata dari <b>${a.join(", ")}</b> adalah …`, r, { petunjuk: "Rata-rata = jumlah semua data : banyak data.", bahas: `(${a.join(" + ")}) : ${n} = ${a.reduce((s, x) => s + x)} : ${n} = ${r}.` }); }],
  3: [() => { const a = Array.from({ length: pilih([5, 7, 9]) }, () => acak(4, 30)); return isian(`Median dari data <b>${a.join(", ")}</b> adalah …`, median(a), { petunjuk: "Urutkan dulu, lalu ambil nilai paling tengah.", bahas: `Diurutkan: ${a.slice().sort((x, y) => x - y).join(", ")}. Median = ${median(a)}.` }); }],
  4: [() => { const a = Array.from({ length: pilih([6, 8, 10]) }, () => acak(4, 30)); return isian(`Median dari data <b>${a.join(", ")}</b> adalah …`, median(a), { petunjuk: "Banyak data genap: rata-rata dua nilai tengah.", bahas: `Diurutkan: ${a.slice().sort((x, y) => x - y).join(", ")}. Median = ${fmt(median(a))}.` }); }],
  5: [
    () => { const nilai = [6, 7, 8, 9, 10].slice(0, acak(4, 5)); let f; do f = nilai.map(() => acak(1, 9)); while (f.filter(x => x === Math.max(...f)).length > 1); const m = nilai[f.indexOf(Math.max(...f))];
      return isian(`Perhatikan tabel nilai ulangan berikut.${frekTabel(nilai, f)}Modus data tersebut adalah …`, m, { petunjuk: "Cari nilai dengan banyak siswa terbesar.", bahas: `Nilai ${m} dimiliki ${Math.max(...f)} siswa (paling banyak).` }); },
    () => { const nilai = [5, 6, 7, 8, 9, 10].slice(0, 4).map(x => x + acak(0, 1) * 0); let f, t, n; do { f = nilai.map(() => acak(1, 6)); n = f.reduce((a, b) => a + b); t = f.reduce((s, x, i) => s + x * nilai[i], 0); } while (t % n);
      return isian(`Perhatikan tabel nilai berikut.${frekTabel(nilai, f)}Rata-rata nilainya adalah …`, t / n, { petunjuk: "Kalikan setiap nilai dengan banyak siswanya, jumlahkan, lalu bagi banyak siswa.", bahas: `Jumlah nilai ${t}, banyak siswa ${n}. Rata-rata ${t} : ${n} = ${t / n}.` }); },
  ],
  6: [
    () => { const n = acak(4, 6), x = nama(); let a; do a = Array.from({ length: n }, () => acak(60, 100)); while ((a.reduce((s, v) => s + v) * 10) % n); const r = a.reduce((s, v) => s + v) / n;
      return isian(`Nilai ulangan matematika ${x}: ${a.join(", ")}. Rata-rata nilai ${x} adalah …`, r, { bahas: `${a.reduce((s, v) => s + v)} : ${n} = ${fmt(r)}.` }); },
    () => { const a = dataRata(5, 128, 150), r = a.reduce((s, x) => s + x) / 5; return isian(`Tinggi badan 5 siswa (dalam cm): ${a.join(", ")}. Rata-rata tinggi badan mereka adalah … cm.`, r, { satuan: "cm", bahas: `${a.reduce((s, x) => s + x)} : 5 = ${r} cm.` }); },
  ],
  7: [() => { const n = acak(3, 5), r0 = acak(70, 85), r1 = r0 + acak(1, 4), x = (n + 1) * r1 - n * r0, nm = nama(); if (x > 100) return isian(`Rata-rata 4 ulangan 80. Agar rata-rata 5 ulangan menjadi 82, nilai ulangan ke-5 harus …`, 90, { bahas: "5 × 82 − 4 × 80 = 410 − 320 = 90." });
    return isian(`Rata-rata ${n} nilai ulangan ${nm} adalah ${r0}. Agar rata-ratanya menjadi ${r1} setelah ulangan berikutnya, nilai ulangan ke-${n + 1} harus …`, x, { petunjuk: "Jumlah nilai baru − jumlah nilai lama.", bahas: `${n + 1} × ${r1} − ${n} × ${r0} = ${(n + 1) * r1} − ${n * r0} = ${x}.` }); }],
  8: [
    () => { const a = acak(10, 25), b = acak(8, 20), ra = acak(70, 85), rb = acak(70, 90); const t = a * ra + b * rb; if ((t * 10) % (a + b)) return isian(`Rata-rata 20 siswa 75, rata-rata 10 siswa 84. Rata-rata gabungan …`, 78, { bahas: "(1500 + 840) : 30 = 78." });
      return isian(`Rata-rata nilai ${a} siswa putra adalah ${ra} dan rata-rata nilai ${b} siswa putri adalah ${rb}. Rata-rata nilai seluruh siswa adalah …`, t / (a + b), { petunjuk: "Cari jumlah nilai setiap kelompok, lalu bagi banyak semua siswa.", bahas: `(${a} × ${ra} + ${b} × ${rb}) : ${a + b} = ${t} : ${a + b} = ${fmt(t / (a + b))}.` }); },
    () => { const a = dataModus(7, 5, 10), r = bulat(a.reduce((s, x) => s + x) / 7, 2), m = median(a), mo = modusTunggal(a);
      return bs(`Data: <b>${a.join(", ")}</b>. Tentukan Benar atau Salah.`, [{ t: `Modusnya ${mo}.`, b: true }, ya() ? { t: `Mediannya ${m}.`, b: true } : { t: `Mediannya ${a[3]}.`, b: a[3] === m }, { t: `Nilai terbesar dikurangi nilai terkecil adalah ${Math.max(...a) - Math.min(...a)}.`, b: true }, { t: `Rata-ratanya lebih dari ${Math.floor(r) + 1}.`, b: r > Math.floor(r) + 1 }],
        { bahas: `Urut: ${a.slice().sort((x, y) => x - y).join(", ")}. Modus ${mo}, median ${m}, rata-rata ${fmt(r)}.` }); },
  ],
  9: [() => { const nilai = [5, 6, 7, 8, 9]; let f, n; do { f = nilai.map(() => acak(1, 7)); n = f.reduce((a, b) => a + b); } while (n % 2 === 0); const data = []; nilai.forEach((v, i) => { for (let k = 0; k < f[i]; k++) data.push(v); });
    return isian(`Perhatikan tabel nilai berikut.${frekTabel(nilai, f)}Median data tersebut adalah …`, median(data), { petunjuk: `Banyak data ${n}. Data ke berapa yang di tengah?`, bahas: `Data ke-${(n + 1) / 2} (setelah diurutkan) = ${median(data)}.` }); }],
  10: [
    () => { const n = acak(10, 30), r0 = acak(65, 80), r1 = r0 + 1, x = (n + 1) * r1 - n * r0; return isian(`Rata-rata nilai ${n} siswa adalah ${r0}. Setelah satu siswa baru ikut ulangan, rata-ratanya menjadi ${r1}. Nilai siswa baru itu adalah …`, x, { petunjuk: "Jumlah nilai sesudah − jumlah nilai sebelum.", bahas: `${n + 1} × ${r1} − ${n} × ${r0} = ${(n + 1) * r1} − ${n * r0} = ${x}.` }); },
    () => { const n = acak(5, 9), r0 = acak(12, 30), r1 = r0 - acak(1, 3), x = n * r0 - (n - 1) * r1; return isian(`Rata-rata ${n} bilangan adalah ${r0}. Jika satu bilangan dikeluarkan, rata-ratanya menjadi ${r1}. Bilangan yang dikeluarkan adalah …`, x, { bahas: `${n} × ${r0} − ${n - 1} × ${r1} = ${n * r0} − ${(n - 1) * r1} = ${x}.` }); },
  ],
});

/* ================= Misi 3: Peluang ================= */
const WARNA = ["merah", "biru", "hijau", "kuning", "ungu"];
function svgRoda(bag) {   // bag: larik nama warna, potongan sama besar
  const c = 80, r = 70, n = bag.length; let s = svgBuka(170, 170, "roda putar");
  bag.forEach((w, i) => { const a0 = i / n * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / n * 2 * Math.PI - Math.PI / 2;
    s += `<path d="M${c} ${c}L${(c + r * Math.cos(a0)).toFixed(1)} ${(c + r * Math.sin(a0)).toFixed(1)}A${r} ${r} 0 0 1 ${(c + r * Math.cos(a1)).toFixed(1)} ${(c + r * Math.sin(a1)).toFixed(1)}Z" class="w-${w}"/>`; });
  return s + `<path d="M${c} ${c - 12}L${c - 6} ${c + 6}L${c + 6} ${c + 6}Z" class="panah"/><circle cx="${c}" cy="${c}" r="5" class="titik"/></svg>`;
}
const kantong = () => { const w = ambil(WARNA, acak(2, 3)), v = w.map(() => acak(1, 9)); return { w, v, n: v.reduce((a, b) => a + b) }; };
const isiKantong = k => k.w.map((w, i) => `${k.v[i]} kelereng ${w}`).join(", ");
const kejadian = ["pasti", "mungkin", "tidak mungkin"];
daftarMisi("dat", "d3", "Peluang sederhana", "🎲", {
  1: [
    () => { const s = pilih([["genap", [2, 4, 6]], ["ganjil", [1, 3, 5]], ["kurang dari 4", [1, 2, 3]], ["lebih dari 2", [3, 4, 5, 6]], ["lebih dari 4", [5, 6]], ["kurang dari 7", [1, 2, 3, 4, 5, 6]], ["kelipatan 2", [2, 4, 6]], ["lebih dari 6", []]]);
      return isian(`Sebuah dadu dilempar. Banyak mata dadu <b>${s[0]}</b> yang mungkin muncul adalah …`, s[1].length, { petunjuk: "Mata dadu: 1, 2, 3, 4, 5, 6.", bahas: `Mata dadu ${s[0]}: ${s[1].join(", ") || "tidak ada"} → ${s[1].length}.` }); },
    () => { const k = kantong(); return isian(`Dalam kantong ada ${isiKantong(k)}. Banyak semua kelereng di kantong adalah …`, k.n, { bahas: `${k.v.join(" + ")} = ${k.n}.` }); },
    keTKA(() => { const satu = ya(0.35), w = pilih(WARNA), lain = pilih(WARNA.filter(x => x !== w)), n = acak(3, 9); const isi = satu ? `${n} kelereng ${w}` : `${n} kelereng ${w} dan ${acak(2, 6)} kelereng ${lain}`; const tanya = pilih(satu ? [w, lain] : [w, lain, pilih(WARNA.filter(x => x !== w && x !== lain))]);
    const j = satu ? (tanya === w ? "pasti" : "tidak mungkin") : tanya === w || tanya === lain ? "mungkin" : "tidak mungkin";
    return pgTetap(`Dalam kantong ada ${isi}. Tanpa melihat, diambil satu kelereng. Kejadian terambil kelereng <b>${tanya}</b> adalah kejadian yang …`, kejadian, j, { bahas: `Kejadian itu ${j} terjadi.` }); }),
  ],
  2: [
    () => { const n = acak(10, 30), k = acak(2, 6); const l = Array.from({ length: n }, (_, i) => i + 1).filter(x => x % k === 0);
      return isian(`Ada kartu bernomor 1 sampai ${n}. Banyak kartu bernomor <b>kelipatan ${k}</b> adalah …`, l.length, { bahas: `${l.join(", ")} → ${l.length} kartu.` }); },
    () => { const k = kantong(), i = acak(0, k.w.length - 1); return isian(`Dalam kantong ada ${isiKantong(k)}. Banyak kelereng yang <b>bukan</b> berwarna ${k.w[i]} adalah …`, k.n - k.v[i], { bahas: `${k.n} − ${k.v[i]} = ${k.n - k.v[i]}.` }); },
    keTKA(() => { const n = acak(5, 20), t = pilih(["genap", "ganjil", "kurang dari " + (n + 1), "lebih dari " + n, "bilangan 0", "kelipatan " + acak(2, 5), "lebih dari " + acak(1, n - 1)]);
      const cek = { genap: x => x % 2 === 0, ganjil: x => x % 2 === 1 }[t] || (t.startsWith("kurang") ? x => x < n + 1 : t === "lebih dari " + n ? x => x > n : t === "bilangan 0" ? x => x === 0 : t.startsWith("kelipatan") ? x => x % +t.split(" ")[1] === 0 : x => x > +t.split(" ")[2]);
      const c = Array.from({ length: n }, (_, i) => i + 1).filter(cek).length, j = c === n ? "pasti" : c === 0 ? "tidak mungkin" : "mungkin";
      return pgTetap(`Ada ${n} kartu bernomor 1 sampai ${n}. Diambil satu kartu secara acak. Kejadian terambil kartu bernomor <b>${t}</b> adalah kejadian yang …`, kejadian, j, { bahas: `Ada ${c} dari ${n} kartu yang memenuhi, jadi kejadian itu ${j} terjadi.` }); }),
    keTKA(() => { const s = pilih([["bilangan kurang dari 7", "pasti"], ["bilangan 7", "tidak mungkin"], ["bilangan genap", "mungkin"], ["bilangan 0", "tidak mungkin"], ["bilangan lebih dari 0", "pasti"], [`bilangan ${acak(1, 6)}`, "mungkin"], ["bilangan prima", "mungkin"], ["bilangan lebih dari 6", "tidak mungkin"]]);
    return pgTetap(`Sebuah dadu dilempar satu kali. Kejadian muncul mata dadu <b>${s[0]}</b> adalah kejadian yang …`, kejadian, s[1], { petunjuk: "Mata dadu: 1, 2, 3, 4, 5, 6.", bahas: `Kejadian itu ${s[1]} terjadi.` }); }),
  ],
  3: [
    () => { const k = kantong(), i = acak(0, k.w.length - 1); return isian(`Dalam kantong ada ${isiKantong(k)}. Tanpa melihat, paling sedikit berapa kelereng harus diambil agar <b>pasti</b> mendapat kelereng ${k.w[i]}?`, k.n - k.v[i] + 1,
      { petunjuk: `Bayangkan nasib paling sial: semua kelereng yang bukan ${k.w[i]} terambil dulu.`, bahas: `Yang bukan ${k.w[i]} ada ${k.n - k.v[i]}. Ambil satu lagi pasti ${k.w[i]}: ${k.n - k.v[i] + 1}.` }); },
    () => { const m = acak(2, 8), bi = acak(1, m - 1); return isian(`Dalam kantong ada ${m} kelereng merah dan ${bi} kelereng biru. Berapa kelereng biru harus ditambahkan agar merah dan biru <b>sama mungkin</b> terambil?`, m - bi, { petunjuk: "Sama mungkin artinya banyaknya sama.", bahas: `${m} − ${bi} = ${m - bi}.` }); },
    keTKA(() => { let k; do k = kantong(); while (k.v.filter(x => x === Math.max(...k.v)).length > 1 || k.w.length < 3); const b = ya(), v = b ? Math.max(...k.v) : Math.min(...k.v); if (!b && k.v.filter(x => x === v).length > 1) return pg(`Dalam kantong ada ${isiKantong(k)}. Warna yang <b>paling mungkin</b> terambil adalah …`, k.w[k.v.indexOf(Math.max(...k.v))], k.w.filter((_, i) => k.v[i] !== Math.max(...k.v)), { bahas: "Warna yang paling banyak paling mungkin terambil." });
    const j = k.w[k.v.indexOf(v)]; return pg(`Dalam kantong ada ${isiKantong(k)}. Diambil satu kelereng. Warna yang <b>${b ? "paling mungkin" : "paling kecil kemungkinannya"}</b> terambil adalah …`, j, k.w.filter(x => x !== j), { petunjuk: "Makin banyak kelerengnya, makin mungkin terambil.", bahas: `${j}: ${v} kelereng (paling ${b ? "banyak" : "sedikit"}).` }); }, 7),
  ],
  4: [() => { const s = pilih([["genap", [2, 4, 6]], ["ganjil", [1, 3, 5]], ["prima", [2, 3, 5]], ["kurang dari 3", [1, 2]], ["lebih dari 2", [3, 4, 5, 6]], ["faktor dari 6", [1, 2, 3, 6]], ["kelipatan 3", [3, 6]], ["paling sedikit 4", [4, 5, 6]]]);
    return isian(`Sebuah dadu dilempar. Banyak hasil yang mungkin untuk mata dadu <b>${s[0]}</b> adalah …`, s[1].length, { bahas: `Mata dadu ${s[0]}: ${s[1].join(", ")} → ${s[1].length} hasil.` }); },
    () => { const n = acak(10, 30), k = acak(2, 6), jenis = pilih(["kelipatan", "faktor", "prima", "lebih"]); let l;
      if (jenis === "kelipatan") l = Array.from({ length: n }, (_, i) => i + 1).filter(x => x % k === 0);
      else if (jenis === "faktor") l = Array.from({ length: n }, (_, i) => i + 1).filter(x => n % x === 0);
      else if (jenis === "prima") l = Array.from({ length: n }, (_, i) => i + 1).filter(x => faktor(x).length === 2);
      else l = Array.from({ length: n }, (_, i) => i + 1).filter(x => x > n - k * 2);
      const t = { kelipatan: `kelipatan ${k}`, faktor: `faktor dari ${n}`, prima: "bilangan prima", lebih: `lebih dari ${n - k * 2}` }[jenis];
      return isian(`Kartu bernomor 1 sampai ${n} dikocok, lalu diambil satu. Banyak hasil yang mungkin untuk kartu bernomor <b>${t}</b> adalah …`, l.length, { bahas: `${t}: ${l.join(", ")} → ${l.length} hasil.` }); },
  ],
  5: [
    () => { const k = kantong(), i = acak(0, k.w.length - 1); return isianPc(`Dalam kantong ada ${isiKantong(k)}. Diambil satu kelereng secara acak. Peluang terambil kelereng <b>${k.w[i]}</b> adalah … (tulis pecahan paling sederhana)`, k.v[i], k.n, { petunjuk: "Peluang = banyak yang diharapkan : banyak semua.", bahas: `${k.v[i]} : ${k.n} = ${pcS(k.v[i], k.n)}.` }); },
    () => { const s = pilih([["genap", 3], ["prima", 3], ["kurang dari 3", 2], ["lebih dari 4", 2], ["kelipatan 3", 2], ["5", 1], ["faktor dari 4", 3]]); return isianPc(`Sebuah dadu dilempar. Peluang muncul mata dadu <b>${s[0]}</b> adalah …`, s[1], 6, { bahas: `${s[1]} dari 6 → ${pcS(s[1], 6)}.` }); },
  ],
  6: [() => { const n = pilih([4, 5, 6, 8]), w = ambil(WARNA, 3); let bag; do bag = Array.from({ length: n }, () => pilih(w)); while (new Set(bag).size < 2); const t = pilih([...new Set(bag)]), c = bag.filter(x => x === t).length;
    return isianPc(`Roda putar dibagi menjadi ${n} bagian sama besar seperti gambar. Roda diputar sekali. Peluang jarum berhenti di warna <b>${t}</b> adalah …`, c, n, { gambar: svgRoda(bag), petunjuk: "Hitung bagian berwarna itu.", bahas: `${c} dari ${n} bagian → ${pcS(c, n)}.` }); }],
  7: [() => { const s = pilih([["dua keping uang logam dilempar bersamaan", 4, "AA, AG, GA, GG"], ["tiga keping uang logam dilempar bersamaan", 8, "2 × 2 × 2"], ["sebuah uang logam dan sebuah dadu dilempar bersamaan", 12, "2 × 6"], ["dua dadu dilempar bersamaan", 36, "6 × 6"]]);
    if (ya(0.4)) { const k = acak(2, 5), c = acak(2, 4), sp = acak(1, 3), x = nama(); return isian(`${x} punya ${k} kaos, ${c} celana, dan ${sp} pasang sepatu. Banyak cara berbeda ${x} memakai satu kaos, satu celana, dan satu pasang sepatu adalah …`, k * c * sp, { petunjuk: "Kalikan banyak pilihan setiap jenis.", bahas: `${k} × ${c} × ${sp} = ${k * c * sp} cara.` }); }
    return isian(`Banyak semua hasil yang mungkin jika ${s[0]} adalah …`, s[1], { bahas: `${s[2]} → ${s[1]} hasil.` }); }],
  8: [() => { const k = kantong(), [i] = [acak(0, k.w.length - 1)], j = (i + 1) % k.w.length;
    return bs(`Dalam kantong ada ${isiKantong(k)}. Diambil satu kelereng secara acak. Tentukan Benar atau Salah.`, [
      { t: `Peluang terambil ${k.w[i]} adalah ${pcS(k.v[i], k.n)}.`, b: true }, ya() ? { t: `Peluang terambil ${k.w[j]} adalah ${pc(k.v[j], k.n + 1)}.`, b: false } : { t: `Peluang terambil ${k.w[j]} adalah ${pc(k.v[j], k.n)}.`, b: true },
      { t: `Terambil kelereng hitam adalah kejadian yang tidak mungkin.`, b: true }, { t: `Peluang terambil ${k.w[i]} lebih besar daripada ${k.w[j]}.`, b: k.v[i] > k.v[j] }], { bahas: `Total ${k.n} kelereng. ${k.w.map((w, x) => `${w}: ${pcS(k.v[x], k.n)}`).join("; ")}.` }); }],
  9: [() => { const k = acak(1, 12), s = pilih([[`jumlah kedua mata dadu sama dengan ${k + 1}`, (a, b) => a + b === k + 1], [`jumlah kedua mata dadu lebih dari ${k}`, (a, b) => a + b > k], [`jumlah kedua mata dadu kurang dari ${k}`, (a, b) => a + b < k],
      ["kedua mata dadu sama", (a, b) => a === b], [`selisih kedua mata dadu ${k % 6}`, (a, b) => Math.abs(a - b) === k % 6], [`hasil kali kedua mata dadu ${pilih([4, 6, 12])}`, null], ["kedua mata dadu genap", (a, b) => a % 2 === 0 && b % 2 === 0], [`jumlah kedua mata dadu bilangan prima`, (a, b) => faktor(a + b).length === 2]]);
    if (!s[1]) { const h = +s[0].split(" ").pop(); s[1] = (a, b) => a * b === h; }
    let c = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (s[1](a, b)) c++;
    if (c === 0) return isianPc(`Dua dadu dilempar bersamaan. Peluang jumlah kedua mata dadu 7 adalah …`, 6, 36, { bahas: "6 pasangan dari 36 → 1/6." });
    return isianPc(`Dua dadu dilempar bersamaan. Peluang <b>${s[0]}</b> adalah …`, c, 36, { petunjuk: "Buat tabel 6 × 6 pasangan (dadu 1, dadu 2). Semua hasil ada 36.", bahas: `Ada ${c} pasangan dari 36 → ${pcS(c, 36)}.` }); }],
  10: [
    () => { const m = acak(3, 8), b = acak(3, 8), k = acak(1, Math.min(2, m - 1)); return isianPc(`Dalam kantong ada ${m} kelereng merah dan ${b} kelereng biru. Diambil ${k} kelereng merah dan <b>tidak dikembalikan</b>. Kemudian diambil satu kelereng lagi. Peluang terambil kelereng merah adalah …`, m - k, m + b - k,
      { petunjuk: "Hitung isi kantong setelah kelereng diambil.", bahas: `Sisa: ${m - k} merah dari ${m + b - k} kelereng → ${pcS(m - k, m + b - k)}.` }); },
    () => { const n = pilih([20, 30, 40, 50, 60]), t = acak(4, n / 2); return isian(`Sebuah dadu dilempar ${n * 3} kali. Frekuensi harapan muncul mata dadu <b>genap</b> adalah …`, n * 3 / 2, { petunjuk: "Frekuensi harapan = peluang × banyak percobaan.", bahas: `${pc(1, 2)} × ${n * 3} = ${n * 3 / 2} kali.` }); },
  ],
});
