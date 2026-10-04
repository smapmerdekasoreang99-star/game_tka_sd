/* Pos 2 — Aljabar: 3 misi × 10 level */
"use strict";

/* ================= Misi 1: Pola bilangan ================= */
const deret = (a, f, n) => { const r = [a]; while (r.length < n) r.push(f(r[r.length - 1], r.length)); return r; };
const tulisDeret = arr => arr.map(fmt).join(", ") + ", …";
daftarMisi("alj", "a1", "Pola bilangan", "🔢", {
  1: [
    () => { const a = acak(1, 20), k = acak(2, 6), d = deret(a, x => x + k, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { petunjuk: "Berapa selisih dua bilangan yang berdekatan?", bahas: `Polanya +${k}. ${d[3]} + ${k} = ${d[4]}.` }); },
  ],
  2: [
    () => { const k = acak(3, 9), a = acak(60, 120), d = deret(a, x => x - k, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { bahas: `Polanya −${k}. ${d[3]} − ${k} = ${d[4]}.` }); },
    () => { const a = acak(2, 30), k = acak(3, 9), d = deret(a, x => x + k, 5), i = acak(1, 3); return isian(`Bilangan yang tepat untuk mengisi □ pada pola <b>${d.map((x, j) => (j === i ? "□" : fmt(x))).join(", ")}</b> adalah …`, d[i], { bahas: `Polanya +${k}, jadi □ = ${d[i]}.` }); },
  ],
  3: [
    () => { const r = pilih([2, 2, 3, 4]), a = acak(1, r === 4 ? 3 : 12), d = deret(a, x => x * r, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { petunjuk: "Coba bagi bilangan dengan bilangan sebelumnya.", bahas: `Polanya ×${r}. ${d[3]} × ${r} = ${d[4]}.` }); },
    () => { const r = pilih([2, 3]), a = r ** 4 * acak(1, 3), d = deret(a, x => x / r, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { bahas: `Polanya :${r}. ${d[3]} : ${r} = ${d[4]}.` }); },
  ],
  4: [
    () => { const a = acak(80, 150), s = acak(1, 4), d = deret(a, (x, i) => x - s - i + 1, 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Tulis selisihnya. Selisihnya bertambah besar.", bahas: `Selisihnya ${d.slice(1).map((x, i) => d[i] - x).join(", ")}. Bilangan berikutnya ${d[5]}.` }); },
    () => { const a = acak(1, 30), s = acak(1, 5), t = acak(1, 3), d = deret(a, (x, i) => x + s + (i - 1) * t, 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Tulis selisihnya. Apakah selisihnya juga berpola?", bahas: `Selisihnya ${d.slice(1).map((x, i) => x - d[i]).join(", ")}. Bilangan berikutnya ${d[5]}.` }); },
  ],
  5: [
    () => { const a = acak(1, 5), k = acak(2, 4), b = acak(10, 20), m = pilih([5, 10]); const d = []; for (let i = 0; i < 4; i++) d.push(a + k * i, b + m * i);
      return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 7))}</b> adalah …`, d[7], { petunjuk: "Ada dua pola yang berselang-seling.", bahas: `Pola ganjil: +${k}; pola genap: +${m}. Berikutnya ${d[7]}.` }); },
    () => { const a = acak(2, 6), d = deret(a, (x, i) => (i % 2 ? x * 2 : x + 3), 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Coba: ×2, +3, ×2, +3, …", bahas: `Polanya ×2, +3 bergantian. Berikutnya ${d[5]}.` }); },
  ],
  6: [
    () => { const a = acak(2, 15), k = acak(2, 9), n = acak(10, 20); return isian(`Suku ke-${n} dari pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b> adalah …`, a + (n - 1) * k, { petunjuk: `Suku ke-n = suku pertama + (n − 1) × selisih.`, bahas: `${a} + (${n} − 1) × ${k} = ${a + (n - 1) * k}.` }); },
  ],
  7: [
    () => { const t = pilih(["persegi", "segitiga", "kubik"]), f = { persegi: n => n * n, segitiga: n => n * (n + 1) / 2, kubik: n => n ** 3 }[t], n = t === "kubik" ? acak(5, 7) : acak(7, 12);
      return isian(`Perhatikan pola <b>${[1, 2, 3, 4].map(f).join(", ")}, …</b><br>Suku ke-${n} adalah …`, f(n), { petunjuk: t === "persegi" ? "1 = 1×1, 4 = 2×2, …" : t === "segitiga" ? "Selisihnya 2, 3, 4, …" : "1 = 1×1×1, 8 = 2×2×2, …", bahas: `Suku ke-${n} = ${f(n)}.` }); },
    () => { const c = acak(1, 9) * pilih([1, -1]), k = pilih([1, 2]), f = n => k * n * n + c; if (f(1) <= 0) return isian(`Suku ke-8 dari pola 3, 6, 11, 18, … adalah …`, 66, { bahas: "n² + 2 → 64 + 2 = 66." });
      const n = acak(6, 12); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4].map(f))}</b> adalah …`, f(n), { petunjuk: `Bandingkan dengan pola bilangan persegi ${k === 2 ? "yang dikali 2 " : ""}(1, 4, 9, 16, …).`, bahas: `Rumusnya ${k === 2 ? "2 × " : ""}n × n ${c > 0 ? "+ " + c : "− " + -c}. Suku ke-${n} = ${f(n)}.` }); },
    () => { const s = acak(0, 4), f = n => (n + s) * (n + s + 1), n = acak(6, 12); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4].map(f))}</b> adalah …`, f(n), { petunjuk: `${f(1)} = ${1 + s} × ${2 + s}, ${f(2)} = ${2 + s} × ${3 + s}, …`, bahas: `Suku ke-n = (n + ${s}) × (n + ${s + 1}). Suku ke-${n} = ${n + s} × ${n + s + 1} = ${f(n)}.` }); },
  ],
  8: [
    () => { const a = acak(10, 20), k = acak(2, 4), n = acak(12, 25); return isian(`Di sebuah gedung pertunjukan, baris pertama ada ${a} kursi. Setiap baris di belakangnya bertambah ${k} kursi. Banyak kursi pada baris ke-${n} adalah …`, a + (n - 1) * k, { satuan: "kursi", bahas: `${a} + (${n} − 1) × ${k} = ${a + (n - 1) * k} kursi.` }); },
    () => { const a = pilih([2000, 3000, 5000]), k = pilih([500, 1000, 2000]), n = acak(8, 15), x = nama(); return isian(`${x} menabung. Minggu pertama ${rp(a)}, dan setiap minggu tabungannya ${rp(k)} lebih banyak dari minggu sebelumnya. Pada minggu ke-${n}, ${x} menabung Rp …`, a + (n - 1) * k, { bahas: `${rp(a)} + (${n} − 1) × ${rp(k)} = ${rp(a + (n - 1) * k)}.` }); },
  ],
  9: [
    () => { const a = acak(1, 9), k = acak(2, 5), n = acak(10, 20), l = a + (n - 1) * k; return isian(`Jumlah ${n} suku pertama dari pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b> adalah …`, n * (a + l) / 2, { petunjuk: "Pasangkan suku pertama dengan suku terakhir.", bahas: `Suku ke-${n} = ${l}. Jumlah = ${n} × (${a} + ${l}) : 2 = ${fmt(n * (a + l) / 2)}.` }); },
    () => { const a = acak(1, 4), b = acak(1, 5), d = deret(0, () => 0, 1); d.length = 0; d.push(a, b); while (d.length < 8) d.push(d[d.length - 1] + d[d.length - 2]); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 7))}</b> adalah …`, d[7], { petunjuk: "Coba jumlahkan dua bilangan sebelumnya.", bahas: `${d[5]} + ${d[6]} = ${d[7]}.` }); },
  ],
  10: [
    () => { const p = acak(1, 3), q = acak(-2, 4), r = acak(0, 5), f = n => p * n * n + q * n + r; if (f(1) <= 0) return isian(`Suku ke-10 dari pola 2, 5, 10, 17, … adalah …`, 101, { bahas: "n² + 1 → 101." });
      const n = acak(10, 15); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4, 5].map(f))}</b> adalah …`, f(n), { petunjuk: "Hitung selisih tingkat pertama, lalu selisih tingkat kedua.", bahas: `Rumus suku ke-n = ${p === 1 ? "" : p}n²${q ? (q > 0 ? " + " : " − ") + (Math.abs(q) === 1 ? "" : Math.abs(q)) + "n" : ""}${r ? " + " + r : ""}. Suku ke-${n} = ${f(n)}.` }); },
    () => { const a = acak(3, 20), k = acak(3, 8), n = acak(25, 60), X = a + (n - 1) * k; return isian(`Pada pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b>, bilangan <b>${X}</b> adalah suku ke- …`, n, { petunjuk: `(${X} − ${a}) : ${k} lalu tambah 1.`, bahas: `(${X} − ${a}) : ${k} + 1 = ${n}.` }); },
  ],
});

/* ================= Misi 2: Pola gambar ================= */
const U = 22;   // ukuran satuan gambar
const POLA = {
  korekPersegi: { f: n => 3 * n + 1, nama: "batang korek api", jenis: "linear", gambar: n => { let s = ""; for (let i = 0; i <= n; i++) s += `<line x1="${i * U}" y1="0" x2="${i * U}" y2="${U}" class="korek"/>`; for (let i = 0; i < n; i++) s += `<line x1="${i * U + 2}" y1="0" x2="${(i + 1) * U - 2}" y2="0" class="korek"/><line x1="${i * U + 2}" y1="${U}" x2="${(i + 1) * U - 2}" y2="${U}" class="korek"/>`; return { s, w: n * U, h: U }; } },
  korekSegitiga: { f: n => 2 * n + 1, nama: "batang korek api", jenis: "linear", gambar: n => { const h = U * 0.87, P = []; for (let i = 0; i <= n + 1; i++) P.push([i * U / 2, i % 2 ? 0 : h]); let s = "";
      for (let i = 0; i < n + 1; i++) s += `<line x1="${P[i][0]}" y1="${P[i][1]}" x2="${P[i + 1][0]}" y2="${P[i + 1][1]}" class="korek"/>`;
      for (let i = 0; i < n; i++) s += `<line x1="${P[i][0] + 2}" y1="${P[i][1]}" x2="${P[i + 2][0] - 2}" y2="${P[i + 2][1]}" class="korek"/>`; return { s, w: (n + 1) * U / 2, h }; } },
  titikPersegi: { f: n => n * n, nama: "titik", jenis: "kuadrat", gambar: n => { let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += `<circle cx="${i * 12 + 5}" cy="${j * 12 + 5}" r="4" class="titik"/>`; return { s, w: n * 12, h: n * 12 }; } },
  titikSegitiga: { f: n => n * (n + 1) / 2, nama: "titik", jenis: "kuadrat", gambar: n => { let s = ""; for (let r = 1; r <= n; r++) for (let j = 0; j < r; j++) s += `<circle cx="${(n - r) * 6 + j * 12 + 5}" cy="${(r - 1) * 11 + 5}" r="4" class="titik"/>`; return { s, w: n * 12, h: n * 11 }; } },
  ubinL: { f: n => 2 * n - 1, nama: "ubin", jenis: "linear", gambar: n => { const u = 14; let s = ""; for (let i = 0; i < n; i++) s += `<rect x="0" y="${i * u}" width="${u}" height="${u}" class="ubin"/>`; for (let i = 1; i < n; i++) s += `<rect x="${i * u}" y="${(n - 1) * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: n * u, h: n * u }; } },
  bingkai: { f: n => 4 * n, nama: "ubin", jenis: "linear", gambar: n => { const u = 12, m = n + 1; let s = ""; for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) if (i === 0 || j === 0 || i === m - 1 || j === m - 1) s += `<rect x="${i * u}" y="${j * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: m * u, h: m * u }; } },
  plus: { f: n => 4 * n + 1, nama: "persegi", jenis: "linear", gambar: n => { const u = 10, m = 2 * n + 1; let s = ""; for (let i = 0; i < m; i++) { s += `<rect x="${i * u}" y="${n * u}" width="${u}" height="${u}" class="ubin"/>`; if (i !== n) s += `<rect x="${n * u}" y="${i * u}" width="${u}" height="${u}" class="ubin"/>`; } return { s, w: m * u, h: m * u }; } },
  korekRumah: { f: n => 5 * n + 1, nama: "batang korek api", jenis: "linear", gambar: n => { const a = POLA.korekPersegi.gambar(n), r = U * 0.6; let s = `<g transform="translate(0,${r})">${a.s}`;
      for (let i = 0; i < n; i++) s += `<line x1="${i * U + 1}" y1="-1" x2="${i * U + U / 2}" y2="${-r}" class="korek"/><line x1="${i * U + U / 2}" y1="${-r}" x2="${(i + 1) * U - 1}" y2="-1" class="korek"/>`; return { s: s + "</g>", w: a.w, h: a.h + r }; } },
  titikPersegiPanjang: { f: n => n * (n + 1), nama: "titik", jenis: "kuadrat", gambar: n => { let s = ""; for (let i = 0; i < n + 1; i++) for (let j = 0; j < n; j++) s += `<circle cx="${i * 12 + 5}" cy="${j * 12 + 5}" r="4" class="titik"/>`; return { s, w: (n + 1) * 12, h: n * 12 }; } },
  ubinT: { f: n => 3 * n + 1, nama: "ubin", jenis: "linear", gambar: n => { const u = 12; let s = ""; for (let i = 0; i < 2 * n + 1; i++) s += `<rect x="${i * u}" y="0" width="${u}" height="${u}" class="ubin"/>`; for (let j = 1; j <= n; j++) s += `<rect x="${n * u}" y="${j * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: (2 * n + 1) * u, h: (n + 1) * u }; } },
  ubinDuaBaris: { f: n => 2 * n + 2, nama: "ubin", jenis: "linear", gambar: n => { const u = 14; let s = ""; for (let i = 0; i < n + 1; i++) s += `<rect x="${i * u}" y="0" width="${u}" height="${u}" class="ubin"/><rect x="${i * u}" y="${u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: (n + 1) * u, h: 2 * u }; } },
  tangga: { f: n => n * (n + 1) / 2, nama: "persegi", jenis: "kuadrat", gambar: n => { const u = 12; let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) s += `<rect x="${i * u}" y="${(n - 1 - j) * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: n * u, h: n * u }; } },
  meja: { f: n => 2 * n + 2, nama: "kursi", jenis: "linear", gambar: n => { const w = 24; let s = `<rect x="12" y="12" width="${n * w}" height="20" class="meja"/>`; for (let i = 0; i < n; i++) s += `<circle cx="${12 + i * w + w / 2}" cy="5" r="5" class="kursi"/><circle cx="${12 + i * w + w / 2}" cy="39" r="5" class="kursi"/>`; s += `<circle cx="5" cy="22" r="5" class="kursi"/><circle cx="${19 + n * w}" cy="22" r="5" class="kursi"/>`; return { s, w: n * w + 24, h: 44 }; } },
};
function svgPola(pola, ns = [1, 2, 3]) {
  const g = ns.map(n => pola.gambar(n)), gap = 34, w = g.reduce((s, x) => s + x.w, 0) + gap * (g.length - 1) + 16, h = Math.max(...g.map(x => x.h)) + 34;
  let x = 8, s = svgBuka(w, h, "gambar pola");
  g.forEach((k, i) => { s += `<g transform="translate(${x},${h - 26 - k.h})">${k.s}</g>` + svgT(x + k.w / 2, h - 6, `Pola ${ns[i]}`, 'text-anchor="middle" class="lbl"'); x += k.w + gap; });
  return s + "</svg>";
}
const polaLinear = () => pilih(Object.values(POLA).filter(p => p.jenis === "linear"));
function rumusPola(p) { const a = p.f(1), b = p.f(2) - p.f(1); return { a, b }; }
function soalPolaKe(p, n, o = {}) {
  const { a, b } = rumusPola(p), lin = p.jenis === "linear", m = n > 5 && ya() ? 2 : 1;
  return isian(`Perhatikan pola berikut. Banyak ${p.nama} pada <b>pola ke-${n}</b> adalah …`, p.f(n), { gambar: svgPola(p, [m, m + 1, m + 2]), satuan: p.nama,
    petunjuk: lin ? `Setiap pola bertambah ${b} ${p.nama}.` : "Perhatikan bentuknya: persegi atau segitiga?", bahas: lin ? `Pola: ${p.f(1)}, ${p.f(2)}, ${p.f(3)}, … (bertambah ${b}). Pola ke-${n} = ${a} + (${n} − 1) × ${b} = ${p.f(n)}.` : `Pola ke-${n} = ${p.f(n)}.`, ...o });
}
daftarMisi("alj", "a2", "Pola gambar", "🔷", {
  1: [() => soalPolaKe(pilih([POLA.ubinL, POLA.bingkai, POLA.titikPersegi, POLA.korekPersegi, POLA.ubinDuaBaris, POLA.ubinT, POLA.tangga, POLA.plus]), acak(4, 5))],
  2: [() => soalPolaKe(polaLinear(), acak(5, 6)), () => soalPolaKe(pilih([POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), acak(4, 5))],
  3: [() => soalPolaKe(polaLinear(), acak(6, 8))],
  4: [() => soalPolaKe(polaLinear(), acak(7, 10)), () => soalPolaKe(pilih([POLA.titikPersegi, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), acak(5, 7))],
  5: [() => soalPolaKe(polaLinear(), acak(10, 12))],
  6: [() => soalPolaKe(polaLinear(), acak(13, 20))],
  7: [() => soalPolaKe(pilih([POLA.titikPersegi, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), acak(8, 20))],
  8: [
    () => { const n = acak(12, 30), x = pilih(["perpustakaan", "kantin", "aula", "ruang kelas"]); return isian(`Meja-meja di ${x} disusun berjajar seperti gambar. Satu meja untuk 4 kursi, dua meja yang disambung untuk 6 kursi, dan seterusnya. Jika ada <b>${n} meja</b> yang disambung, banyak kursi yang dapat ditempatkan adalah …`, 2 * n + 2,
      { gambar: svgPola(POLA.meja), satuan: "kursi", petunjuk: "Setiap meja punya 2 kursi (atas dan bawah), ditambah 2 kursi di ujung.", bahas: `2 × ${n} + 2 = ${2 * n + 2} kursi.` }); },
    () => soalPolaKe(polaLinear(), acak(25, 50)),
  ],
  9: [
    () => { const p = polaLinear(), n = acak(15, 40), { a, b } = rumusPola(p), X = p.f(n);
      return isian(`Perhatikan pola berikut. Pola ke berapa yang memerlukan tepat <b>${X} ${p.nama}</b>?`, n, { gambar: svgPola(p), petunjuk: `Rumusnya: ${a} + (n − 1) × ${b}.`, bahas: `${a} + (n − 1) × ${b} = ${X} → n − 1 = ${(X - a) / b} → n = ${n}.` }); },
    () => { const p = polaLinear(), A = acak(8, 15), B = A + acak(5, 12); return isian(`Perhatikan pola berikut. Selisih banyak ${p.nama} pada pola ke-${B} dan pola ke-${A} adalah …`, p.f(B) - p.f(A), { gambar: svgPola(p), petunjuk: "Setiap naik satu pola, bertambah tetap.", bahas: `${p.f(B)} − ${p.f(A)} = ${p.f(B) - p.f(A)}.` }); },
  ],
  10: [
    () => { const p = polaLinear(), n = acak(6, 15); let t = 0; for (let i = 1; i <= n; i++) t += p.f(i);
      return isian(`Perhatikan pola berikut. ${nama()} membuat pola ke-1 sampai pola ke-${n} sekaligus. Jumlah ${p.nama} yang diperlukan seluruhnya adalah …`, t, { gambar: svgPola(p), satuan: p.nama, petunjuk: "Pasangkan pola pertama dan terakhir: jumlahnya selalu sama.", bahas: `Pola ke-1 = ${p.f(1)}, pola ke-${n} = ${p.f(n)}. Jumlah = ${n} × (${p.f(1)} + ${p.f(n)}) : 2 = ${t}.` }); },
    () => { const p = pilih([POLA.titikPersegi, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), n = acak(8, 20), X = p.f(n); return isian(`Perhatikan pola berikut. Pola ke berapa yang tersusun dari <b>${X} ${p.nama}</b>?`, n, { gambar: svgPola(p), bahas: `Pola ke-${n} = ${X}.` }); },
  ],
});

/* ================= Misi 3: Angka yang hilang ================= */
const KOTAK = "<b class=\"kotak-isi\">□</b>";
daftarMisi("alj", "a3", "Mencari angka yang hilang", "❓", {
  1: [
    () => { const x = acak(2, 30), a = acak(2, 30); return isian(`${KOTAK} + ${a} = ${x + a}<br>Nilai □ adalah …`, x, { petunjuk: "Bilangan berapa yang ditambah ini hasilnya itu?", bahas: `□ = ${x + a} − ${a} = ${x}.` }); },
    () => { const x = acak(2, 30), a = acak(2, 30); return isian(`${a} + ${KOTAK} = ${x + a}<br>Nilai □ adalah …`, x, { bahas: `□ = ${x + a} − ${a} = ${x}.` }); },
  ],
  2: [
    () => { const a = acak(30, 99), x = acak(2, a - 5); return isian(`${a} − ${KOTAK} = ${a - x}<br>Nilai □ adalah …`, x, { bahas: `□ = ${a} − ${a - x} = ${x}.` }); },
    () => { const x = acak(20, 90), a = acak(2, x - 5); return isian(`${KOTAK} − ${a} = ${x - a}<br>Nilai □ adalah …`, x, { bahas: `□ = ${x - a} + ${a} = ${x}.` }); },
  ],
  3: [
    () => { const a = acak(2, 12), x = acak(2, 12); return isian(`${a} × ${KOTAK} = ${a * x}<br>Nilai □ adalah …`, x, { petunjuk: "Gunakan pembagian.", bahas: `□ = ${a * x} : ${a} = ${x}.` }); },
    () => { const a = acak(2, 9), q = acak(2, 12); return isian(`${KOTAK} : ${a} = ${q}<br>Nilai □ adalah …`, a * q, { petunjuk: "Gunakan perkalian.", bahas: `□ = ${q} × ${a} = ${a * q}.` }); },
  ],
  4: [
    () => { const a = acak(2, 9), x = acak(2, 15), b = acak(1, 30); return isian(`${a} × ${KOTAK} + ${b} = ${a * x + b}<br>Nilai □ adalah …`, x, { petunjuk: "Kurangi dulu, lalu bagi.", bahas: `${a * x + b} − ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
    () => { const a = acak(2, 9), x = acak(3, 15), b = acak(1, a * x - 1); return isian(`${a} × ${KOTAK} − ${b} = ${a * x - b}<br>Nilai □ adalah …`, x, { bahas: `${a * x - b} + ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
  ],
  5: [
    () => { const x = acak(2, 20), a = acak(2, 20), b = acak(2, 8); return isian(`(${KOTAK} + ${a}) × ${b} = ${(x + a) * b}<br>Nilai □ adalah …`, x, { bahas: `${(x + a) * b} : ${b} = ${x + a}. ${x + a} − ${a} = ${x}.` }); },
    () => { const b = acak(2, 8), q = acak(3, 12), a = acak(2, 20), x = b * q + a; return isian(`(${KOTAK} − ${a}) : ${b} = ${q}<br>Nilai □ adalah …`, x, { bahas: `${q} × ${b} = ${b * q}. ${b * q} + ${a} = ${x}.` }); },
  ],
  6: [
    () => { const x = acak(5, 40), a = acak(5, 40), b = acak(5, 40), c = x + a - b; if (c <= 0) return isian(`${KOTAK} + 15 = 20 + 12<br>□ = …`, 17, { bahas: "32 − 15 = 17." });
      return isian(`${KOTAK} + ${a} = ${b} + ${c}<br>Nilai □ adalah …`, x, { petunjuk: "Hitung ruas kanan dulu.", bahas: `${b} + ${c} = ${b + c}. □ = ${b + c} − ${a} = ${x}.` }); },
    () => { const b = acak(2, 9), c = acak(2, 12), a = pilih([2, 3, 4, 6].filter(v => (b * c) % v === 0)) || 1; return isian(`${a} × ${KOTAK} = ${b} × ${c}<br>Nilai □ adalah …`, b * c / a, { bahas: `${b} × ${c} = ${b * c}. □ = ${b * c} : ${a} = ${b * c / a}.` }); },
  ],
  7: [
    () => { const x = nama(), k = acak(3, 9), h = acak(5, 20) * 500, s = acak(1, 10) * 1000, u = k * h + s;
      return isian(`${x} membeli beberapa buku tulis seharga ${rp(h)} per buku. Ia membayar ${rp(u)} dan menerima kembalian ${rp(s)}. Banyak buku yang dibeli ${x} adalah …`, k, { satuan: "buku", petunjuk: `Buat kalimat: □ × ${fmt(h)} + ${fmt(s)} = ${fmt(u)}.`, bahas: `${rp(u)} − ${rp(s)} = ${rp(k * h)}. ${rp(k * h)} : ${rp(h)} = ${k} buku.` }); },
    () => { const x = acak(5, 30), k = acak(2, 5), t = acak(10, 40); return isian(`Umur ayah ${k} kali umur ${nama()} ditambah ${t} tahun. Jika umur ayah ${k * x + t} tahun, umur anak itu adalah … tahun.`, x, { satuan: "tahun", bahas: `${k * x + t} − ${t} = ${k * x}. ${k * x} : ${k} = ${x} tahun.` }); },
  ],
  8: [
    () => { let a, x, b, c, d, e; do { a = acak(3, 7); x = acak(6, 20); b = acak(1, 20); c = acak(3, 9); d = acak(2, 6); e = a * x - b - c * d; } while (e < 1);
      return isian(`Nilai □ yang memenuhi<br>${a} × ${KOTAK} − ${b} = ${c} × ${d} + ${e}<br>adalah …`, x, { petunjuk: "Hitung ruas kanan, lalu kerjakan mundur.", bahas: `Ruas kanan = ${c * d + e}. ${a} × □ = ${c * d + e} + ${b} = ${a * x}. □ = ${x}.` }); },
    () => { const x = nama(), n = acak(4, 9), h = acak(4, 12) * 1000, t = n * h; return pg(`${x} membeli ${n} buah mangga dengan harga sama dan membayar ${rp(t)}. Kalimat matematika untuk mencari harga 1 mangga (□) adalah …`, `${n} × □ = ${fmt(t)}`, [`□ : ${n} = ${fmt(t)}`, `□ − ${n} = ${fmt(t)}`, `${n} + □ = ${fmt(t)}`, `□ × ${fmt(t)} = ${n}`], { bahas: `${n} buah × harga 1 buah = ${fmt(t)}, jadi ${n} × □ = ${fmt(t)}. □ = ${rp(h)}.` }); },
  ],
  9: [
    () => { const s = acak(3, 15), c = acak(3, 15), p = 2 * s + c, q = s + c; return isian(`▲ + ▲ + ● = ${p}<br>▲ + ● = ${q}<br>Nilai ● adalah …`, c, { petunjuk: "Bandingkan kedua baris: apa bedanya?", bahas: `Selisih kedua baris = ▲ = ${p} − ${q} = ${s}. ● = ${q} − ${s} = ${c}.` }); },
    () => { const s = acak(2, 12), c = acak(2, 12), p = 3 * s, q = s + 2 * c; return isian(`▲ + ▲ + ▲ = ${p}<br>▲ + ● + ● = ${q}<br>Nilai ▲ × ● adalah …`, s * c, { bahas: `▲ = ${p} : 3 = ${s}. ● + ● = ${q - s}, jadi ● = ${c}. ▲ × ● = ${s * c}.` }); },
  ],
  10: [
    () => { const a = acak(2, 12), b = acak(3, 15), c = acak(1, b - 1);
      return isian(`🍎 + 🍎 = ${2 * a}<br>🍎 + 🍌 = ${a + b}<br>🍌 − 🍇 = ${b - c}<br>Nilai 🍎 + 🍌 × 🍇 adalah …`, a + b * c, { petunjuk: "Cari satu per satu dari atas. Ingat: kali dulu, baru tambah!", bahas: `🍎 = ${a}, 🍌 = ${b}, 🍇 = ${c}. ${a} + ${b} × ${c} = ${a + b * c}.` }); },
    () => { const x = acak(5, 25), y = acak(5, 25); return isian(`Jumlah dua bilangan adalah ${x + y} dan selisihnya ${Math.abs(x - y)}. Bilangan yang <b>lebih besar</b> adalah …`, Math.max(x, y), { petunjuk: "(Jumlah + selisih) : 2", bahas: `(${x + y} + ${Math.abs(x - y)}) : 2 = ${Math.max(x, y)}.` }); },
    () => { const k = acak(2, 5), b = acak(3, 10), c = k * b, kd = acak(10, 40); return isian(`Harga ${k} pensil sama dengan harga 1 buku. Harga 3 buku dan 4 pensil adalah ${rp((3 * k + 4) * kd * 100)}. Harga 1 pensil adalah Rp …`, kd * 100, { petunjuk: `Ganti setiap buku dengan ${k} pensil.`, bahas: `3 buku = ${3 * k} pensil. Total ${3 * k + 4} pensil = ${rp((3 * k + 4) * kd * 100)}. 1 pensil = ${rp(kd * 100)}.` }); },
  ],
});
