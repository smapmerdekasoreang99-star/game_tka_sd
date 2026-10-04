/* Pos 3 — Pengukuran & Bangun: 7 misi × 10 level */
"use strict";
/* Ukuran yang kebetulan sama sisi disebut persegi, bukan persegi panjang */
const namaPP = (a, b) => (a === b ? "persegi" : "persegi panjang");

/* ---------- Gambar bangun ---------- */
/* Poligon (titik searah jarum jam di layar) + label sisi. lbl: { indeksSisi: "teks" } */
function svgPoligon(P, lbl = {}, o = {}) {
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]), W = Math.max(...xs) - Math.min(...xs) || 1, H = Math.max(...ys) - Math.min(...ys) || 1;
  const k = Math.min(240 / W, 150 / H), m = o.tepi || 44, x0 = Math.min(...xs), y0 = Math.min(...ys);
  const T = p => [m + (p[0] - x0) * k, m * 0.7 + (p[1] - y0) * k];
  const Q = P.map(T); let s = svgBuka(Math.round(W * k + 2 * m), Math.round(H * k + m * 1.5), o.label || "gambar bangun");
  if (o.lubang) { const L = o.lubang.map(T); s += `<path d="M${Q.map(q => q.join(" ")).join("L")}Z M${L.map(q => q.join(" ")).join("L")}Z" class="bangun" fill-rule="evenodd"/>`; }
  else s += `<polygon points="${Q.map(q => q.join(",")).join(" ")}" class="bangun"/>`;
  if (o.extra) s += o.extra(T);
  Object.entries(lbl).forEach(([i, t]) => {
    i = +i; const a = Q[i], b = Q[(i + 1) % Q.length], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, nx = dy / d, ny = -dx / d;
    const x = (a[0] + b[0]) / 2 + nx * 16, y = (a[1] + b[1]) / 2 + ny * 16 + 5; s += svgT(x.toFixed(1), y.toFixed(1), t, 'text-anchor="middle" class="lbl"');
  });
  return s + "</svg>";
}
const persegiP = (p, l, sat = "cm") => svgPoligon([[0, 0], [p, 0], [p, l], [0, l]], { 0: `${fmt(p)} ${sat}`, 1: `${fmt(l)} ${sat}` }, { label: `persegi panjang ${p} kali ${l}` });
const persegiS = (s, sat = "cm") => svgPoligon([[0, 0], [s, 0], [s, s], [0, s]], { 0: `${fmt(s)} ${sat}` }, { label: `persegi sisi ${s}` });
function segitigaG(a, t, sat = "cm") {
  const px = a * (acak(2, 8) / 10);
  return svgPoligon([[0, t], [px, 0], [a, t]], { 2: `alas ${fmt(a)} ${sat}` }, { label: "segitiga", extra: T => { const p = T([px, 0]), q = T([px, t]); return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="bantu"/>` + svgT(p[0] + 6, (p[1] + q[1]) / 2, `t = ${fmt(t)} ${sat}`, 'class="lbl"'); } });
}
function jajarG(a, t, sat = "cm") { const g = Math.max(1, Math.round(a * 0.3));
  return svgPoligon([[g, 0], [a + g, 0], [a, t], [0, t]], { 2: `alas ${fmt(a)} ${sat}` }, { label: "jajar genjang", extra: T => { const p = T([g, 0]), q = T([g, t]); return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="bantu"/>` + svgT(p[0] + 6, (p[1] + q[1]) / 2, `t = ${fmt(t)} ${sat}`, 'class="lbl"'); } }); }
function trapesiumG(a, b, t, sat = "cm") { const g = (b - a) / 2;   // b = alas bawah (lebih panjang)
  return svgPoligon([[g, 0], [g + a, 0], [b, t], [0, t]], { 0: `${fmt(a)} ${sat}`, 2: `${fmt(b)} ${sat}` }, { label: "trapesium", extra: T => { const p = T([g, 0]), q = T([g, t]); return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="bantu"/>` + svgT(p[0] + 6, (p[1] + q[1]) / 2, `t = ${fmt(t)} ${sat}`, 'class="lbl"'); } }); }
/* Segitiga dengan ketiga sisi a (kanan), b (kiri), c (alas) diberi label — bentuknya sesuai ukuran */
function segitigaSisi(a, b, c, sat = "cm") { const x = (b * b + c * c - a * a) / (2 * c), h = Math.sqrt(Math.max(1, b * b - x * x));
  return svgPoligon([[0, h], [x, 0], [c, h]], { 0: `${fmt(b)} ${sat}`, 1: `${fmt(a)} ${sat}`, 2: `${fmt(c)} ${sat}` }, { label: "segitiga" }); }
/* Segitiga siku-siku: alas a mendatar, tinggi t tegak di kiri */
const segitigaSiku = (a, t, sat = "cm") => svgPoligon([[0, 0], [a, t], [0, t]], { 1: `${fmt(a)} ${sat}`, 2: `${fmt(t)} ${sat}` }, { label: "segitiga siku-siku", extra: T => { const q = T([0, t]); return `<path d="M${q[0] + 12} ${q[1]}V${q[1] - 12}H${q[0]}" class="bantu-tebal" fill="none"/>`; } });
/* Belah ketupat / layang-layang dengan kedua diagonal (d1 mendatar, atas t1 dan bawah t2 pada diagonal tegak) */
function diagonalG(d1, t1, t2, sat = "cm") { const a = d1 / 2;
  return svgPoligon([[0, -t1], [a, 0], [0, t2], [-a, 0]], {}, { label: t1 === t2 ? "belah ketupat" : "layang-layang", tepi: 58, extra: T => { const k = T([-a, 0]), n = T([a, 0]), u = T([0, -t1]), s = T([0, t2]);
    return `<line x1="${k[0]}" y1="${k[1]}" x2="${n[0]}" y2="${n[1]}" class="bantu"/><line x1="${u[0]}" y1="${u[1]}" x2="${s[0]}" y2="${s[1]}" class="bantu"/>` + svgT((k[0] - 6).toFixed(1), (k[1] + 5).toFixed(1), `${fmt(d1)} ${sat}`, 'text-anchor="end" class="lbl"') + svgT(s[0].toFixed(1), (s[1] + 20).toFixed(1), `${fmt(t1 + t2)} ${sat}`, 'text-anchor="middle" class="lbl"'); } }); }
/* Trapesium sama kaki dengan keempat sisi berlabel; [g, t, kaki] tripel Pythagoras */
const TRIPEL = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [9, 12, 15], [12, 5, 13], [12, 9, 15]];
function trapesiumKaki(a, g, t, k, sat = "cm") { const b = a + 2 * g;
  return svgPoligon([[g, 0], [g + a, 0], [b, t], [0, t]], { 0: `${fmt(a)} ${sat}`, 1: `${fmt(k)} ${sat}`, 2: `${fmt(b)} ${sat}`, 3: `${fmt(k)} ${sat}` }, { label: "trapesium sama kaki" }); }

/* ================= Misi 1: Satuan ================= */
daftarMisi("ukr", "u1", "Satuan panjang, berat, waktu, isi", "📏", {
  1: [
    () => { const a = acak(2, 9); return isian(`${a} m = … cm`, a * 100, { satuan: "cm", petunjuk: "1 m = 100 cm.", bahas: `${a} × 100 = ${a * 100} cm.` }); },
    () => { const a = acak(2, 9); return isian(`${a * 100} cm = … m`, a, { satuan: "m", petunjuk: "100 cm = 1 m.", bahas: `${a * 100} : 100 = ${a} m.` }); },
    () => { const a = acak(1, 9), b = acak(5, 95); return isian(`${a} m ${b} cm = … cm`, a * 100 + b, { satuan: "cm", petunjuk: "Ubah meter ke cm, lalu tambahkan.", bahas: `${a * 100} + ${b} = ${a * 100 + b} cm.` }); },
    () => { const x = nama(), a = acak(110, 175); return isian(`Tinggi badan ${x} ${a} cm. Tinggi badannya sama dengan 1 m … cm.`, a - 100, { satuan: "cm", bahas: `${a} cm = 1 m ${a - 100} cm.` }); },
  ],
  2: [
    () => { const a = acak(2, 9); return isian(`${a} kg = … g`, a * 1000, { satuan: "g", petunjuk: "1 kg = 1.000 g.", bahas: `${a} × 1.000 = ${fmt(a * 1000)} g.` }); },
    () => { const a = acak(2, 6); return isian(`${a} jam = … menit`, a * 60, { satuan: "menit", petunjuk: "1 jam = 60 menit.", bahas: `${a} × 60 = ${a * 60} menit.` }); },
    () => { const a = acak(2, 9); return isian(`${a} menit = … detik`, a * 60, { satuan: "detik", bahas: `${a} × 60 = ${a * 60} detik.` }); },
    () => { const a = acak(1, 9), b = acak(1, 9) * 100 + pilih([0, 50]); return isian(`${a} kg ${b} g = … g`, a * 1000 + b, { satuan: "g", bahas: `${fmt(a * 1000)} + ${b} = ${fmt(a * 1000 + b)} g.` }); },
    () => { const a = acak(2, 10) * 60 + pilih([0, 0, 30]); return isian(`${a} menit = … jam`, a / 60, { satuan: "jam", petunjuk: "60 menit = 1 jam. 30 menit = 0,5 jam.", bahas: `${a} : 60 = ${fmt(a / 60)} jam.` }); },
    () => { const a = acak(2, 7); return isian(`${a} hari = … jam`, a * 24, { satuan: "jam", petunjuk: "1 hari = 24 jam.", bahas: `${a} × 24 = ${a * 24} jam.` }); },
    () => { const a = acak(2, 9); return isian(`${a} minggu = … hari`, a * 7, { satuan: "hari", petunjuk: "1 minggu = 7 hari.", bahas: `${a} × 7 = ${a * 7} hari.` }); },
    () => { const a = acak(2, 9); return isian(`${a} tahun = … bulan`, a * 12, { satuan: "bulan", petunjuk: "1 tahun = 12 bulan.", bahas: `${a} × 12 = ${a * 12} bulan.` }); },
    () => { const x = nama(), a = acak(2, 9), b = pilih(["tali", "pita", "selang", "kain"]); return isian(`${x} memiliki ${b} sepanjang ${a} m. Panjang ${b} itu sama dengan … cm.`, a * 100, { satuan: "cm", petunjuk: "1 m = 100 cm.", bahas: `${a} m = ${a} × 100 = ${a * 100} cm.` }); },
    () => { const x = nama(), a = acak(2, 9), b = pilih(["beras", "gula", "tepung", "jeruk"]); return isian(`${x} membeli ${a} kg ${b}. Berat ${b} itu sama dengan … g.`, a * 1000, { satuan: "g", petunjuk: "1 kg = 1.000 g.", bahas: `${a} kg = ${a} × 1.000 = ${fmt(a * 1000)} g.` }); },
  ],
  3: [
    () => { const a = acak(2, 15); return isian(`${a} km = … m`, a * 1000, { satuan: "m", petunjuk: "1 km = 1.000 m.", bahas: `${fmt(a * 1000)} m.` }); },
    () => { const a = acak(2, 9); return isian(`${a} liter = … mL`, a * 1000, { satuan: "mL", petunjuk: "1 liter = 1.000 mL.", bahas: `${fmt(a * 1000)} mL.` }); },
    () => { const a = acak(2, 9) * 1000; return isian(`${fmt(a)} g = … kg`, a / 1000, { satuan: "kg", bahas: `${fmt(a)} : 1.000 = ${a / 1000} kg.` }); },
    () => { const a = acak(1, 9), b = acak(10, 990); return isian(`${a} km ${b} m = … m`, a * 1000 + b, { satuan: "m", bahas: `${fmt(a * 1000)} + ${b} = ${fmt(a * 1000 + b)} m.` }); },
    () => { const a = acak(1, 5), b = acak(1, 19) * 50; return isian(`${a} liter ${b} mL = … mL`, a * 1000 + b, { satuan: "mL", bahas: `${fmt(a * 1000)} + ${b} = ${fmt(a * 1000 + b)} mL.` }); },
    () => { const a = acak(2, 50); return isian(`${a} cm = … mm`, a * 10, { satuan: "mm", petunjuk: "1 cm = 10 mm.", bahas: `${a} × 10 = ${a * 10} mm.` }); },
  ],
  4: [
    () => { const a = acak(1, 5), b = acak(1, 9), c = acak(1, 9); return isian(`${a} km + ${b} hm + ${c} dam = … m`, a * 1000 + b * 100 + c * 10, { satuan: "m", petunjuk: "km, hm, dam, m: setiap turun satu tangga dikali 10.", bahas: `${fmt(a * 1000)} + ${b * 100} + ${c * 10} = ${fmt(a * 1000 + b * 100 + c * 10)} m.` }); },
    () => { const a = acak(1, 5), b = acak(1, 9); return isian(`${a} kg + ${b} ons = … g`, a * 1000 + b * 100, { satuan: "g", petunjuk: "1 ons = 100 g.", bahas: `${fmt(a * 1000)} + ${b * 100} = ${fmt(a * 1000 + b * 100)} g.` }); },
    () => { const a = acak(1, 4), b = acak(5, 55); return isian(`${a} jam ${b} menit = … menit`, a * 60 + b, { satuan: "menit", bahas: `${a} × 60 + ${b} = ${a * 60 + b} menit.` }); },
    () => { const a = acak(1, 9), b = acak(5, 55); return isian(`${a} menit ${b} detik = … detik`, a * 60 + b, { satuan: "detik", petunjuk: "1 menit = 60 detik.", bahas: `${a} × 60 + ${b} = ${a * 60 + b} detik.` }); },
    () => { const a = acak(1, 6), b = acak(1, 23); return isian(`${a} hari ${b} jam = … jam`, a * 24 + b, { satuan: "jam", petunjuk: "1 hari = 24 jam.", bahas: `${a} × 24 + ${b} = ${a * 24 + b} jam.` }); },
    () => { const ton = ya(), a = acak(2, 15); return isian(`${a} ${ton ? "ton" : "kuintal"} = … kg`, a * (ton ? 1000 : 100), { satuan: "kg", petunjuk: ton ? "1 ton = 1.000 kg." : "1 kuintal = 100 kg.", bahas: `${a} × ${ton ? "1.000" : "100"} = ${fmt(a * (ton ? 1000 : 100))} kg.` }); },
    () => { const x = nama(), a = acak(1, 5), b = acak(1, 9), t = pilih(["sekolah", "pasar", "rumah nenek", "taman kota"]); return isian(`Jarak rumah ${x} ke ${t} ${a} km ${b} hm. Jarak itu sama dengan … m.`, a * 1000 + b * 100, { satuan: "m", petunjuk: "1 km = 1.000 m dan 1 hm = 100 m.", bahas: `${fmt(a * 1000)} + ${b * 100} = ${fmt(a * 1000 + b * 100)} m.` }); },
    () => { const a = acak(1, 9), b = acak(1, 9); return isian(`${a} m ${b} dm = … cm`, a * 100 + b * 10, { satuan: "cm", petunjuk: "1 m = 100 cm dan 1 dm = 10 cm.", bahas: `${a * 100} + ${b * 10} = ${a * 100 + b * 10} cm.` }); },
  ],
  5: [
    () => { const a = acak(1, 9) + pilih([0.5, 0.25, 0.75, 0.2, 0.4]); return isian(`${fmt(a)} kg = … g`, a * 1000, { satuan: "g", bahas: `${fmt(a)} × 1.000 = ${fmt(a * 1000)} g.` }); },
    () => { const a = acak(1, 3) + pilih([0.5, 0.25, 0.75]); return isian(`${fmt(a)} jam = … menit`, a * 60, { satuan: "menit", petunjuk: "0,5 jam = 30 menit.", bahas: `${fmt(a)} × 60 = ${a * 60} menit.` }); },
    () => { const a = acak(1, 9) + acak(1, 9) / 10; return isian(`${fmt(a)} km = … m`, Math.round(a * 1000), { satuan: "m", bahas: `${fmt(a)} × 1.000 = ${fmt(Math.round(a * 1000))} m.` }); },
    () => { const a = acak(1, 5) + pilih([0.25, 0.5, 0.75, 0.2, 0.6]); return isian(`${fmt(a)} liter = … mL`, Math.round(a * 1000), { satuan: "mL", petunjuk: "1 liter = 1.000 mL.", bahas: `${fmt(a)} × 1.000 = ${fmt(Math.round(a * 1000))} mL.` }); },
    () => { const b = pilih([250, 500, 750, 1250, 1500, 2500, 3500, 4250]); return isian(`${fmt(b)} mL = … liter`, b / 1000, { satuan: "liter", petunjuk: "1.000 mL = 1 liter. Jawaban boleh desimal, misalnya 0,5.", bahas: `${fmt(b)} : 1.000 = ${fmt(b / 1000)} liter.` }); },
    () => { const x = nama(), k = pilih([200, 250, 400, 500]), n = acak(2, 8); return isian(`${x} berlari mengelilingi lapangan sebanyak ${n} putaran. Satu putaran panjangnya ${k} m. Jarak yang ditempuh ${x} adalah … km.`, n * k / 1000, { satuan: "km", petunjuk: "Hitung dulu dalam meter, lalu ubah ke km (1 km = 1.000 m).", bahas: `${n} × ${k} = ${fmt(n * k)} m = ${fmt(n * k / 1000)} km.` }); },
    () => { const a = acak(1, 4), b = pilih([15, 30, 45, 6, 12, 18, 36]); return isian(`${a} jam ${b} menit = … jam`, a + b / 60, { satuan: "jam", petunjuk: "60 menit = 1 jam. Ubah menitnya menjadi bagian dari jam (desimal).", bahas: `${b} menit = ${b} : 60 = ${fmt(b / 60)} jam. Jadi ${a} + ${fmt(b / 60)} = ${fmt(a + b / 60)} jam.` }); },
    () => { const a = acak(1, 9) + pilih([0.25, 0.5, 0.75, 0.05, 0.4, 0.15]); return isian(`${fmt(a)} m = … cm`, Math.round(a * 100), { satuan: "cm", petunjuk: "1 m = 100 cm.", bahas: `${fmt(a)} × 100 = ${Math.round(a * 100)} cm.` }); },
    () => { const x = pilih(["Ibu", "Ayah", "Nenek", "Kakak"]), a = acak(3, 35), b = pilih(["daging", "ikan", "udang", "kacang"]); return isian(`${x} membeli ${a} ons ${b}. Berat ${b} itu sama dengan … kg.`, a / 10, { satuan: "kg", petunjuk: "1 kg = 10 ons.", bahas: `${a} : 10 = ${fmt(a / 10)} kg.` }); },
  ],
  6: [
    () => { const a = acak(1, 3), b = acak(10, 55), c = acak(1, 3), d = acak(10, 55); return isian(`${a} jam ${b} menit + ${c} jam ${d} menit = … menit`, (a + c) * 60 + b + d, { satuan: "menit", bahas: `${a * 60 + b} + ${c * 60 + d} = ${(a + c) * 60 + b + d} menit.` }); },
    () => { const a = acak(2, 20); return isian(`${a} liter = … cm³`, a * 1000, { satuan: "cm³", petunjuk: "1 liter = 1 dm³ = 1.000 cm³.", bahas: `${fmt(a * 1000)} cm³.` }); },
    () => { const a = acak(2, 30); return isian(`${fmt(a * 1000)} cm³ = … liter`, a, { satuan: "liter", bahas: `${fmt(a * 1000)} : 1.000 = ${a} liter.` }); },
  ],
  7: [
    () => { const x = nama(), b = acak(5 * 60, 9 * 60) + pilih([0, 15, 20, 30, 45]), d = acak(1, 3) * 60 + pilih([10, 25, 35, 40, 50]), t = b + d;
      return pg(`${x} berangkat dari rumah pukul ${pkl(b)} dan perjalanannya memakan waktu ${Math.floor(d / 60)} jam ${d % 60} menit. ${x} tiba pukul …`, pkl(t), [pkl(t + 60), pkl(t - 10), pkl(b + Math.floor(d / 60) * 60 + (d % 60) * 2), pkl(t + 40)],
        { petunjuk: "Tambahkan jamnya dulu, lalu menitnya.", bahas: `${pkl(b)} + ${Math.floor(d / 60)} jam ${d % 60} menit = ${pkl(t)}.` }); },
    () => { const m = acak(7, 9) * 60 + pilih([0, 15, 30]), s = m + acak(1, 3) * 60 + pilih([15, 20, 45]); return isian(`Lomba dimulai pukul ${pkl(m)} dan selesai pukul ${pkl(s)}. Lama lomba adalah … menit.`, s - m, { satuan: "menit", bahas: `${pkl(s)} − ${pkl(m)} = ${s - m} menit.` }); },
  ],
  8: [
    () => { const v = pilih([40, 45, 50, 60, 72, 80]), t = pilih([90, 120, 150, 180, 30, 45, 210]); const j = v * t / 60; if (!Number.isInteger(j)) return isian(`Sepeda motor melaju 60 km/jam selama 2 jam 30 menit. Jarak yang ditempuh … km.`, 150, { satuan: "km", bahas: "60 × 2,5 = 150 km." });
      return isian(`Sebuah ${pilih(["mobil", "bus", "sepeda motor"])} melaju dengan kecepatan rata-rata ${v} km/jam selama ${Math.floor(t / 60) ? Math.floor(t / 60) + " jam " : ""}${t % 60 ? (t % 60) + " menit" : ""}. Jarak yang ditempuh adalah … km.`, j,
        { satuan: "km", petunjuk: "Jarak = kecepatan × waktu (dalam jam).", bahas: `${v} × ${fmt(t / 60)} jam = ${fmt(j)} km.` }); },
    () => { const v = pilih([40, 50, 60, 80]), j = v * pilih([0.5, 1.5, 2, 2.5, 3]); return isian(`Jarak kota A ke kota B ${fmt(j)} km. Sebuah mobil melaju dengan kecepatan ${v} km/jam. Waktu yang diperlukan adalah … menit.`, j / v * 60, { satuan: "menit", petunjuk: "Waktu = jarak : kecepatan.", bahas: `${fmt(j)} : ${v} = ${fmt(j / v)} jam = ${j / v * 60} menit.` }); },
    () => { const v = pilih([30, 40, 45, 50, 60, 64, 70, 75, 80, 90]), t = pilih([2, 3, 4, 5, 1.5, 2.5]), j = v * t, k = pilih(["mobil", "bus", "truk", "kereta", "sepeda motor"]);
      if (!Number.isInteger(j)) return isian(`Sebuah bus menempuh jarak 120 km dalam waktu 2 jam. Kecepatan rata-rata bus itu adalah … km/jam.`, 60, { satuan: "km/jam", bahas: "120 : 2 = 60 km/jam." });
      return isian(`Sebuah ${k} menempuh jarak ${fmt(j)} km dalam waktu ${Math.floor(t)} jam${t % 1 ? " 30 menit" : ""}. Kecepatan rata-rata ${k} itu adalah … km/jam.`, v,
        { satuan: "km/jam", petunjuk: "Kecepatan = jarak : waktu. 30 menit = 0,5 jam.", bahas: `${fmt(j)} : ${fmt(t)} = ${v} km/jam.` }); },
    () => { const q = pilih([2, 3, 4, 5, 6, 8, 10, 12, 15]), m = acak(3, 20), x = pilih(["kolam ikan", "bak mandi", "drum", "tandon air", "ember besar"]);
      return isian(`Sebuah keran dapat mengisi ${x} sebanyak ${q * m} liter dalam waktu ${m} menit. Debit air keran itu adalah … liter/menit.`, q,
        { satuan: "liter/menit", petunjuk: "Debit = volume : waktu.", bahas: `${q * m} : ${m} = ${q} liter/menit.` }); },
    () => { const v = pilih([50, 100, 150, 200, 250, 300, 500, 750, 1000, 1250]); return isian(`Kecepatan ${fmt(v)} m/menit sama dengan … km/jam.`, v * 60 / 1000,
      { satuan: "km/jam", petunjuk: "Dalam 1 jam (60 menit) jaraknya 60 kali lipat. Lalu ubah meter ke km.", bahas: `${fmt(v)} × 60 = ${fmt(v * 60)} m per jam = ${fmt(v * 60 / 1000)} km/jam.` }); },
    () => { const x = nama(), v = pilih([10, 12, 15, 20]), t = pilih([30, 45, 60, 90, 120, 15, 150]), j = v * t / 60, b = acak(6, 15) * 60 + pilih([0, 10, 15, 30, 45]);
      if (!Number.isInteger(j * 2)) return isian(`${x} bersepeda dengan kecepatan 12 km/jam selama 30 menit. Jarak yang ditempuh … km.`, 6, { satuan: "km", bahas: "12 × 0,5 = 6 km." });
      return pg(`${x} bersepeda dengan kecepatan rata-rata ${v} km/jam menempuh jarak ${fmt(j)} km. Jika ${x} berangkat pukul ${pkl(b)}, ia tiba pukul …`, pkl(b + t), [pkl(b + t + 30), pkl(b + t - 15), pkl(b + j * 10), pkl(b + 60 * j), pkl(b + t + 10)].filter(s => s !== pkl(b + t)),
        { petunjuk: "Waktu = jarak : kecepatan. Ubah jam menjadi menit.", bahas: `Waktu ${fmt(j)} : ${v} = ${fmt(t / 60)} jam = ${t} menit. ${pkl(b)} + ${t} menit = ${pkl(b + t)}.` }); },
  ],
  9: [
    () => { const m = acak(4, 9), b = acak(15, 45), n = acak(4, Math.floor(m * 100 / b) - 1); return isian(`${nama()} memiliki pita sepanjang ${m} m. Pita itu dipotong-potong sepanjang ${b} cm sebanyak ${n} potong. Sisa pita adalah … cm.`, m * 100 - b * n, { satuan: "cm", petunjuk: "Samakan satuannya dulu.", bahas: `${m} m = ${m * 100} cm. ${m * 100} − ${n} × ${b} = ${m * 100 - b * n} cm.` }); },
    () => { const kg = acak(3, 8), g = acak(1, 9) * 100, n = acak(3, 6), b = acak(2, 5) * 100; const sisa = kg * 1000 + g - n * b; return isian(`Ibu membeli ${kg} kg ${g} g tepung. Setiap kali membuat kue, Ibu memakai ${b} g tepung. Setelah membuat kue ${n} kali, sisa tepung Ibu adalah … g.`, sisa, { satuan: "g", bahas: `${fmt(kg * 1000 + g)} − ${n} × ${b} = ${fmt(sisa)} g.` }); },
  ],
  10: [
    () => { const v1 = pilih([40, 45, 50, 60]), v2 = pilih([50, 60, 70, 80]), t = pilih([60, 90, 120, 150, 180]), D = (v1 + v2) * t / 60, b = acak(6, 9) * 60 + pilih([0, 30]);
      return pg(`Jarak kota P dan kota Q ${fmt(D)} km. Pukul ${pkl(b)}, Andi naik mobil dari P ke Q dengan kecepatan ${v1} km/jam. Pada saat yang sama Budi naik mobil dari Q ke P dengan kecepatan ${v2} km/jam. Mereka berpapasan pukul …`, pkl(b + t),
        [pkl(b + t / 2), pkl(b + t + 30), pkl(b + Math.round(D / v1 * 60)), pkl(b + t - 30)], { petunjuk: "Berlawanan arah: jumlahkan kecepatannya.", bahas: `${fmt(D)} : (${v1} + ${v2}) = ${fmt(t / 60)} jam = ${t} menit. ${pkl(b)} + ${t} menit = ${pkl(b + t)}.` }); },
    () => { const v = pilih([60, 72, 90]), j = v * pilih([1.5, 2, 2.5]), ist = pilih([15, 20, 30]), b = acak(6, 8) * 60; const t = j / v * 60 + ist;
      return pg(`Bus berangkat pukul ${pkl(b)} menempuh jarak ${fmt(j)} km dengan kecepatan rata-rata ${v} km/jam. Di tengah jalan bus berhenti istirahat ${ist} menit. Bus tiba pukul …`, pkl(b + t), [pkl(b + t - ist), pkl(b + t + 30), pkl(b + t - 30), pkl(b + t + ist)], { bahas: `Waktu jalan ${fmt(j)} : ${v} = ${fmt(j / v)} jam. Ditambah istirahat ${ist} menit. Tiba ${pkl(b + t)}.` }); },
    () => { const Z = [["WIB", 0, ["Jakarta", "Medan", "Surabaya", "Pontianak", "Palembang"]], ["WITA", 1, ["Makassar", "Denpasar", "Balikpapan", "Mataram", "Manado"]], ["WIT", 2, ["Jayapura", "Ambon", "Sorong", "Merauke"]]];
      const [A, B] = ambil(Z, 2), ka = pilih(A[2]), kb = pilih(B[2]), b = acak(6, 15) * 60 + pilih([0, 15, 30, 45]), d = acak(1, 4) * 60 + pilih([0, 10, 20, 30, 40, 50]), sel = (B[1] - A[1]) * 60, t = b + d + sel, lama = `${Math.floor(d / 60)} jam${d % 60 ? ` ${d % 60} menit` : ""}`;
      return pg(`Pesawat berangkat dari ${ka} pukul ${pkl(b)} ${A[0]} dan terbang selama ${lama}. Pesawat tiba di ${kb} pukul … ${B[0]}.`, pkl(t), [pkl(b + d), pkl(b + d - sel), pkl(t + 60), pkl(t - 30), pkl(t + 30)],
        { petunjuk: "WIT lebih cepat 1 jam dari WITA, dan WITA lebih cepat 1 jam dari WIB.", bahas: `Tiba pukul ${pkl(b + d)} ${A[0]}. ${B[1] > A[1] ? `${B[0]} lebih cepat ${B[1] - A[1]} jam` : `${B[0]} lebih lambat ${A[1] - B[1]} jam`}, jadi pukul ${pkl(t)} ${B[0]}.` }); },
    () => { const q = pilih([5, 6, 8, 10, 12, 15, 20]), m = acak(3, 18) * 5, a = acak(0, 6) * 10, C = q * m + a, b = acak(6, 16) * 60 + pilih([0, 15, 30, 45]), dm = ya();
      return pg(`Sebuah bak mampu menampung ${fmt(C)} ${dm ? "dm³" : "liter"} air. Bak itu ${a ? `sudah berisi ${a} liter air, lalu` : "kosong, lalu"} diisi dengan keran yang mengalirkan ${q} liter air setiap menit mulai pukul ${pkl(b)}. Bak itu penuh pukul …`, pkl(b + m),
        [pkl(b + Math.round(C / q)), pkl(b + m + 10), pkl(b + m - 5), pkl(b + m + 15), pkl(b + Math.round(m / 2))].filter(x => x !== pkl(b + m)),
        { petunjuk: `${dm ? "1 dm³ = 1 liter. " : ""}Hitung dulu air yang masih diperlukan, lalu bagi dengan debit.`, bahas: `Air yang diperlukan ${fmt(C)} − ${a} = ${fmt(C - a)} liter. ${fmt(C - a)} : ${q} = ${m} menit. ${pkl(b)} + ${m} menit = ${pkl(b + m)}.` }); },
  ],
});

/* ================= Misi 2: Keliling & luas ================= */
daftarMisi("ukr", "u2", "Keliling & luas bangun datar", "🟩", {
  1: [
    () => { const s = acak(3, 15); return isian(`Keliling persegi di bawah adalah … cm.`, 4 * s, { gambar: persegiS(s), satuan: "cm", petunjuk: "Keliling persegi = 4 × sisi.", bahas: `4 × ${s} = ${4 * s} cm.` }); },
    () => { const p = acak(6, 20), l = acak(2, p - 1); return isian(`Keliling persegi panjang di bawah adalah … cm.`, 2 * (p + l), { gambar: persegiP(p, l), satuan: "cm", petunjuk: "Keliling = 2 × (panjang + lebar).", bahas: `2 × (${p} + ${l}) = ${2 * (p + l)} cm.` }); },
    () => { const s = acak(3, 25), b = pilih(["bingkai foto", "sapu tangan", "kertas origami", "ubin"]); return isian(`Sebuah ${b} berbentuk persegi dengan panjang sisi ${s} cm. Keliling ${b} itu adalah … cm.`, 4 * s, { satuan: "cm", petunjuk: "Persegi punya 4 sisi yang sama panjang.", bahas: `4 × ${s} = ${4 * s} cm.` }); },
    () => { let a, b, c; do { a = acak(3, 15); b = acak(3, 15); c = acak(4, 16); } while (a + b <= c + 1 || a + c <= b + 1 || b + c <= a + 1);
      return isian(`Keliling segitiga di bawah adalah … cm.`, a + b + c, { gambar: segitigaSisi(a, b, c), satuan: "cm", petunjuk: "Keliling = jumlah panjang semua sisi.", bahas: `${b} + ${a} + ${c} = ${a + b + c} cm.` }); },
    () => { const H = acak(2, 5), W = H + acak(1, 4); return isian(`Setiap persegi kecil bersisi 1 cm. Keliling persegi panjang di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPetak(W, H, 0, 0), satuan: "cm", petunjuk: "Hitung sisi-sisi persegi kecil di sepanjang tepi luar.", bahas: `Panjang ${W} cm, lebar ${H} cm. Keliling 2 × (${W} + ${H}) = ${2 * (W + H)} cm.` }); },
    () => { const x = nama(), p = acak(10, 40), l = acak(5, p - 1); return isian(`${x} berjalan satu kali mengelilingi taman berbentuk persegi panjang. Panjang taman ${p} m dan lebarnya ${l} m. Jarak yang ditempuh ${x} adalah … m.`, 2 * (p + l), { satuan: "m", petunjuk: "Mengelilingi satu kali = keliling.", bahas: `2 × (${p} + ${l}) = ${2 * (p + l)} m.` }); },
    () => { const s = acak(3, 20); return isian(`Panjang setiap sisi sebuah segitiga sama sisi ${s} cm. Keliling segitiga itu adalah … cm.`, 3 * s, { satuan: "cm", petunjuk: "Segitiga sama sisi punya 3 sisi yang sama panjang.", bahas: `3 × ${s} = ${3 * s} cm.` }); },
  ],
  2: [
    () => { const s = acak(3, 15); return isian(`Luas persegi di bawah adalah … cm².`, s * s, { gambar: persegiS(s), satuan: "cm²", petunjuk: "Luas persegi = sisi × sisi.", bahas: `${s} × ${s} = ${s * s} cm².` }); },
    () => { const p = acak(6, 20), l = acak(2, p - 1); return isian(`Luas persegi panjang di bawah adalah … cm².`, p * l, { gambar: persegiP(p, l), satuan: "cm²", petunjuk: "Luas = panjang × lebar.", bahas: `${p} × ${l} = ${p * l} cm².` }); },
    () => { const H = acak(2, 6), W = H + acak(1, 4); return isian(`Setiap persegi kecil luasnya 1 cm². Luas persegi panjang di bawah adalah … cm².`, W * H, { gambar: svgPetak(W, H, 0, 0), satuan: "cm²", petunjuk: "Hitung banyak persegi kecil: banyak baris × banyak persegi tiap baris.", bahas: `${H} baris × ${W} persegi = ${W * H} cm².` }); },
    () => { const p = acak(4, 20), l = acak(2, p - 1); return isian(`Sebuah persegi panjang berukuran panjang ${p} cm dan lebar ${l} cm. Luasnya adalah … cm².`, p * l, { satuan: "cm²", petunjuk: "Luas = panjang × lebar.", bahas: `${p} × ${l} = ${p * l} cm².` }); },
    () => { const x = nama(), s = acak(2, 9); return isian(`Lantai kamar ${x} berbentuk persegi dengan sisi ${s} m. Luas lantai kamar itu adalah … m².`, s * s, { satuan: "m²", petunjuk: "Luas persegi = sisi × sisi.", bahas: `${s} × ${s} = ${s * s} m².` }); },
    () => { const a = acak(3, 12), b = acak(2, 9); return isian(`Lantai teras ditutup ubin persegi. Setiap baris berisi ${a} ubin dan ada ${b} baris. Banyak ubin seluruhnya adalah …`, a * b, { satuan: "ubin", petunjuk: "Banyak ubin tiap baris × banyak baris.", bahas: `${a} × ${b} = ${a * b} ubin.` }); },
    () => { const x = nama(), p = acak(3, 9), l = acak(2, p - 1), b = pilih(["kebun sayur", "kolam ikan", "halaman", "kamar"]); return isian(`${b[0].toUpperCase() + b.slice(1)} milik ${x} berbentuk persegi panjang dengan panjang ${p} m dan lebar ${l} m. Luasnya adalah … m².`, p * l, { satuan: "m²", petunjuk: "Luas = panjang × lebar.", bahas: `${p} × ${l} = ${p * l} m².` }); },
  ],
  3: [
    () => { let a = acak(4, 20), t = acak(3, 16); if ((a * t) % 2) a++; return isian(`Luas segitiga di bawah adalah … cm².`, a * t / 2, { gambar: segitigaG(a, t), satuan: "cm²", petunjuk: "Luas segitiga = alas × tinggi : 2.", bahas: `${a} × ${t} : 2 = ${a * t / 2} cm².` }); },
    () => { let a = acak(4, 20), t = acak(3, 16); if ((a * t) % 2) t++; return isian(`Sebuah segitiga memiliki alas ${a} cm dan tinggi ${t} cm. Luas segitiga itu adalah … cm².`, a * t / 2, { satuan: "cm²", petunjuk: "Luas segitiga = alas × tinggi : 2.", bahas: `${a} × ${t} : 2 = ${a * t / 2} cm².` }); },
    () => { let a = acak(3, 16), t = acak(3, 12); if ((a * t) % 2) a++; return isian(`Luas segitiga siku-siku di bawah adalah … cm².`, a * t / 2, { gambar: segitigaSiku(a, t), satuan: "cm²", petunjuk: "Pada segitiga siku-siku, kedua sisi siku-sikunya menjadi alas dan tinggi.", bahas: `${a} × ${t} : 2 = ${a * t / 2} cm².` }); },
    () => { const s = acak(3, 12) * 2, x = nama(); return isian(`${x} memiliki kertas origami berbentuk persegi bersisi ${s} cm. Kertas itu digunting menurut diagonalnya menjadi dua segitiga yang sama besar. Luas satu segitiga adalah … cm².`, s * s / 2, { satuan: "cm²", petunjuk: "Luas satu segitiga = setengah luas persegi.", bahas: `Luas persegi ${s} × ${s} = ${s * s} cm². Setengahnya ${s * s / 2} cm².` }); },
    () => { const d1 = acak(3, 10) * 2, t = acak(2, 8); return isian(`Luas belah ketupat di bawah adalah … cm².`, d1 * 2 * t / 2, { gambar: diagonalG(d1, t, t), satuan: "cm²", petunjuk: "Luas belah ketupat = diagonal × diagonal : 2.", bahas: `${d1} × ${2 * t} : 2 = ${d1 * t} cm².` }); },
    () => { const d1 = acak(3, 10) * 2, t1 = acak(2, 5), t2 = t1 + acak(3, 8), d2 = t1 + t2; return isian(`Luas layang-layang di bawah adalah … cm².`, d1 * d2 / 2, { gambar: diagonalG(d1, t1, t2), satuan: "cm²", petunjuk: "Luas layang-layang = diagonal × diagonal : 2.", bahas: `${d1} × ${d2} : 2 = ${d1 * d2 / 2} cm².` }); },
  ],
  4: [
    () => { const a = acak(5, 20), t = acak(3, 14); return isian(`Luas jajar genjang di bawah adalah … cm².`, a * t, { gambar: jajarG(a, t), satuan: "cm²", petunjuk: "Luas jajar genjang = alas × tinggi.", bahas: `${a} × ${t} = ${a * t} cm².` }); },
    () => { const a = acak(4, 12); let b = a + 2 * acak(1, 5), t = acak(3, 12); if (((a + b) * t) % 2) t++; return isian(`Luas trapesium di bawah adalah … cm².`, (a + b) * t / 2, { gambar: trapesiumG(a, b, t), satuan: "cm²", petunjuk: "Luas = (jumlah sisi sejajar) × tinggi : 2.", bahas: `(${a} + ${b}) × ${t} : 2 = ${(a + b) * t / 2} cm².` }); },
    () => { const a = acak(5, 25), t = acak(3, 15); return isian(`Sebuah jajar genjang memiliki alas ${a} cm dan tinggi ${t} cm. Luas jajar genjang itu adalah … cm².`, a * t, { satuan: "cm²", petunjuk: "Luas jajar genjang = alas × tinggi.", bahas: `${a} × ${t} = ${a * t} cm².` }); },
    () => { const a = acak(4, 15); let b = a + acak(2, 10), t = acak(3, 12); if (((a + b) * t) % 2) t++; return isian(`Sisi-sisi sejajar sebuah trapesium panjangnya ${a} cm dan ${b} cm. Tinggi trapesium ${t} cm. Luas trapesium itu adalah … cm².`, (a + b) * t / 2, { satuan: "cm²", petunjuk: "Luas trapesium = (jumlah sisi sejajar) × tinggi : 2.", bahas: `(${a} + ${b}) × ${t} : 2 = ${(a + b) * t / 2} cm².` }); },
    () => { const a = acak(6, 20), b = acak(3, a - 1); return isian(`Dua sisi jajar genjang yang bersebelahan panjangnya ${a} cm dan ${b} cm. Keliling jajar genjang itu adalah … cm.`, 2 * (a + b), { satuan: "cm", petunjuk: "Sisi yang berhadapan pada jajar genjang sama panjang.", bahas: `2 × (${a} + ${b}) = ${2 * (a + b)} cm.` }); },
    () => { const [g, t, k] = pilih(TRIPEL), a = acak(3, 14); return isian(`Keliling trapesium sama kaki di bawah adalah … cm.`, 2 * a + 2 * g + 2 * k, { gambar: trapesiumKaki(a, g, t, k), satuan: "cm", petunjuk: "Keliling = jumlah keempat sisinya.", bahas: `${a} + ${a + 2 * g} + ${k} + ${k} = ${2 * a + 2 * g + 2 * k} cm.` }); },
    () => { const x = nama(), d1 = acak(3, 8) * 10, d2 = acak(4, 9) * 10; return isian(`Rangka layang-layang buatan ${x} terdiri atas dua bilah bambu yang bersilangan (diagonal) dengan panjang ${d1} cm dan ${d2} cm. Luas kertas yang menutupi layang-layang itu adalah … cm².`, d1 * d2 / 2, { satuan: "cm²", petunjuk: "Luas layang-layang = diagonal × diagonal : 2.", bahas: `${d1} × ${d2} : 2 = ${fmt(d1 * d2 / 2)} cm².` }); },
  ],
  5: [
    () => { const s = acak(4, 20); return isian(`Luas sebuah persegi ${s * s} cm². Panjang sisinya adalah … cm.`, s, { satuan: "cm", petunjuk: "Bilangan berapa dikali dirinya sendiri?", bahas: `${s} × ${s} = ${s * s}, jadi sisinya ${s} cm.` }); },
    () => { const p = acak(8, 25), l = acak(3, p - 1); return isian(`Luas persegi panjang ${p * l} cm² dan panjangnya ${p} cm. Lebarnya adalah … cm.`, l, { satuan: "cm", bahas: `${p * l} : ${p} = ${l} cm.` }); },
    () => { const a = acak(5, 15), b = acak(5, 15), c = acak(Math.abs(a - b) + 1, a + b - 1); return isian(`Panjang sisi-sisi sebuah segitiga ${a} cm, ${b} cm, dan ${c} cm. Kelilingnya adalah … cm.`, a + b + c, { satuan: "cm", bahas: `${a} + ${b} + ${c} = ${a + b + c} cm.` }); },
    () => { let a = acak(4, 20); const t = acak(3, 15); if ((a * t) % 2) a++;
      return isian(`Luas sebuah segitiga ${a * t / 2} cm² dan alasnya ${a} cm. Tinggi segitiga itu adalah … cm.`, t, { satuan: "cm", petunjuk: "Alas × tinggi = 2 × luas.", bahas: `${a * t / 2} × 2 = ${a * t}. ${a * t} : ${a} = ${t} cm.` }); },
    () => { const s = acak(3, 30); return isian(`Keliling sebuah persegi ${4 * s} cm. Panjang sisinya adalah … cm.`, s, { satuan: "cm", petunjuk: "Keliling persegi = 4 × sisi.", bahas: `${4 * s} : 4 = ${s} cm.` }); },
    () => { const a = acak(4, 20), t = acak(3, 15); return isian(`Luas sebuah jajar genjang ${a * t} cm² dan alasnya ${a} cm. Tinggi jajar genjang itu adalah … cm.`, t, { satuan: "cm", petunjuk: "Luas jajar genjang = alas × tinggi.", bahas: `${a * t} : ${a} = ${t} cm.` }); },
    () => { const x = nama(); let p = acak(6, 20), l = acak(4, p); if ((p * l) % 2) p++; const tn = pilih(["jagung", "cabai", "tomat", "bunga"]);
      return isian(`Kebun ${x} berbentuk persegi panjang berukuran ${p} m × ${l} m. Setengah bagian kebun ditanami ${tn}. Luas kebun yang ditanami ${tn} adalah … m².`, p * l / 2, { satuan: "m²", petunjuk: "Hitung luas seluruh kebun dulu, lalu bagi 2.", bahas: `${p} × ${l} = ${p * l} m². Setengahnya ${p * l / 2} m².` }); },
    () => { const s = acak(4, 15); let p, l; do { p = acak(4, 20); l = acak(2, p); } while (p * l === s * s);
      return isian(`Persegi A bersisi ${s} cm. Persegi panjang B berukuran ${p} cm × ${l} cm. Selisih luas kedua bangun itu adalah … cm².`, Math.abs(s * s - p * l), { satuan: "cm²", petunjuk: "Hitung luas masing-masing, lalu kurangkan yang besar dengan yang kecil.", bahas: `Luas A ${s * s} cm², luas B ${p * l} cm². Selisih ${Math.abs(s * s - p * l)} cm².` }); },
  ],
  6: [
    () => { const p = acak(8, 30), l = acak(3, p - 1); return isian(`Keliling persegi panjang ${2 * (p + l)} cm dan panjangnya ${p} cm. Lebarnya adalah … cm.`, l, { satuan: "cm", petunjuk: "Panjang + lebar = keliling : 2.", bahas: `${2 * (p + l)} : 2 = ${p + l}. ${p + l} − ${p} = ${l} cm.` }); },
    () => { const s = acak(5, 25); return isian(`Keliling sebuah persegi ${4 * s} cm. Luasnya adalah … cm².`, s * s, { satuan: "cm²", petunjuk: "Cari sisinya dulu.", bahas: `Sisi = ${4 * s} : 4 = ${s}. Luas = ${s * s} cm².` }); },
  ],
  7: [
    () => { const p = acak(8, 30), l = acak(5, p - 1), h = pilih([15000, 20000, 25000, 30000, 12500]); return isian(`Sebuah kebun berbentuk persegi panjang berukuran ${p} m × ${l} m. Sekeliling kebun akan dipagari dengan biaya ${rp(h)} per meter. Biaya seluruhnya adalah Rp …`, 2 * (p + l) * h, { petunjuk: "Hitung kelilingnya dulu.", bahas: `Keliling ${2 * (p + l)} m × ${rp(h)} = ${rp(2 * (p + l) * h)}.` }); },
    () => { const s = acak(6, 20), n = acak(2, 4); return isian(`${nama()} berlari mengelilingi lapangan berbentuk persegi dengan sisi ${s * 5} m sebanyak ${n} kali. Jarak yang ditempuh adalah … m.`, 4 * s * 5 * n, { satuan: "m", bahas: `4 × ${s * 5} × ${n} = ${4 * s * 5 * n} m.` }); },
  ],
  8: [
    () => { const u = pilih([20, 25, 30, 40, 50]), p = u * acak(6, 16), l = u * acak(5, 12); return isian(`Lantai kamar berukuran ${fmt(p / 100)} m × ${fmt(l / 100)} m akan dipasang ubin persegi berukuran ${u} cm × ${u} cm. Banyak ubin yang diperlukan adalah …`, (p / u) * (l / u),
      { satuan: "ubin", petunjuk: "Samakan satuannya. Berapa ubin sepanjang panjang dan sepanjang lebar?", bahas: `${p} : ${u} = ${p / u} ubin, ${l} : ${u} = ${l / u} ubin. Total ${p / u} × ${l / u} = ${(p / u) * (l / u)} ubin.` }); },
    () => { const p = acak(4, 8), t = acak(3, 4), n = acak(2, 4), ka = pilih([8, 10, 12]), L = p * t * n; return isian(`${n} dinding berbentuk persegi panjang, masing-masing berukuran ${p} m × ${t} m, akan dicat. Satu kaleng cat cukup untuk ${ka} m². Paling sedikit diperlukan … kaleng cat.`, Math.ceil(L / ka),
      { satuan: "kaleng", petunjuk: "Hitung luas semua dinding, lalu bagi. Bulatkan ke atas!", bahas: `Luas ${n} × ${p} × ${t} = ${L} m². ${L} : ${ka} = ${fmt(bulat(L / ka, 2))} → ${Math.ceil(L / ka)} kaleng.` }); },
    () => { const h = pilih([8000, 10000, 12000, 15000, 20000, 25000]), trap = ya(), x = nama(); let L, ukuran, gbr, hit;
      if (trap) { const a = acak(4, 12), b = a + 2 * acak(1, 5); let t = acak(3, 10); if (((a + b) * t) % 2) t++; L = (a + b) * t / 2; ukuran = `berbentuk trapesium dengan sisi sejajar ${a} m dan ${b} m serta tinggi ${t} m`; gbr = trapesiumG(a, b, t, "m"); hit = `(${a} + ${b}) × ${t} : 2 = ${L} m²`; }
      else { let a = acak(6, 16), t = acak(4, 12); if ((a * t) % 2) a++; L = a * t / 2; ukuran = `berbentuk segitiga dengan alas ${a} m dan tinggi ${t} m`; gbr = segitigaG(a, t, "m"); hit = `${a} × ${t} : 2 = ${L} m²`; }
      return isian(`Halaman rumah ${x} ${ukuran}. Seluruh halaman akan ditanami rumput dengan harga ${rp(h)} per m². Biaya yang diperlukan adalah Rp …`, L * h,
        { gambar: gbr, petunjuk: "Hitung luas halaman dulu, lalu kalikan dengan harga per m².", bahas: `Luas ${hit}. Biaya ${L} × ${rp(h)} = ${rp(L * h)}.` }); },
    () => { const p = acak(3, 12), l = acak(2, p), k = pilih([2, 2, 3, 3, 4]), sq = p === l, bangun = sq ? "persegi" : "persegi panjang", uk = sq ? `bersisi ${p} cm` : `berukuran ${p} cm × ${l} cm`;
      return isian(`Sebuah ${bangun} ${uk}. ${sq ? "Sisinya" : "Panjang dan lebarnya masing-masing"} diperbesar menjadi ${k} kali ukuran semula. Luas ${bangun} yang baru adalah … cm².`, k * k * p * l,
        { satuan: "cm²", petunjuk: `Hitung ukuran barunya dulu. Ingat: luasnya menjadi ${k} × ${k} kali, bukan ${k} kali!`, bahas: `Ukuran baru ${k * p} cm × ${k * l} cm. Luas ${k * p} × ${k * l} = ${k * k * p * l} cm² (${k * k} kali luas semula ${p * l} cm²).` }); },
  ],
  9: [
    () => { const k = acak(2, 4), l = acak(3, 10), p = k * l; return isian(`Keliling sebuah persegi panjang ${2 * (p + l)} cm. Panjangnya ${k} kali lebarnya. Luas persegi panjang itu adalah … cm².`, p * l, { satuan: "cm²", petunjuk: `Panjang + lebar = ${p + l}, dan panjang = ${k} bagian, lebar = 1 bagian.`, bahas: `${p + l} : ${k + 1} = ${l} (lebar), panjang ${p}. Luas ${p * l} cm².` }); },
    () => { let p = acak(8, 20), l = acak(2, Math.min(10, p - 2)); if ((p + l) % 2) l += l < p - 2 ? 1 : -1; /* lebar < panjang: bukan persegi */ const s = (p + l) / 2; return isian(`Sebuah persegi panjang berukuran ${p} cm × ${l} cm. Sebuah persegi memiliki keliling yang sama dengan persegi panjang itu. Luas persegi adalah … cm².`, s * s, { satuan: "cm²", bahas: `Keliling = ${2 * (p + l)} cm. Sisi persegi = ${s} cm. Luas = ${s * s} cm².` }); },
    () => { const r = pilih([7, 14, 21, 28, 35, 42]), dia = ya(), n = pilih([50, 100, 150, 200, 250, 500]), K = 44 * r / 7, J = K * n / 100, x = nama();
      return isian(`Roda sepeda ${x} ${dia ? `berdiameter ${2 * r} cm` : `berjari-jari ${r} cm`}. Jika roda itu berputar ${n} kali, jarak yang ditempuh adalah … m. (Gunakan π = ${pc(22, 7)})`, J,
        { satuan: "m", petunjuk: "Satu putaran roda = keliling lingkaran = 2 × π × r. Ubah cm ke m di akhir.", bahas: `Keliling ${dia ? `${pc(22, 7)} × ${2 * r}` : `2 × ${pc(22, 7)} × ${r}`} = ${K} cm. ${n} × ${K} = ${fmt(K * n)} cm = ${fmt(J)} m.` }); },
    () => { const s = pilih([6, 8, 10, 12, 14, 15, 16, 18, 20, 24]), dv = [2, 3, 4, 5, 6].filter(d => s % d === 0 && d < s), k = pilih(dv), p = s * k, l = s / k, sel = 2 * (p + l) - 4 * s;
      return isian(`Sebuah persegi panjang berukuran ${p} cm × ${l} cm. Sebuah persegi memiliki luas yang <b>sama</b> dengan persegi panjang itu. Selisih keliling persegi panjang dan keliling persegi adalah … cm.`, sel,
        { satuan: "cm", petunjuk: "Luas persegi = luas persegi panjang. Cari sisi persegi: bilangan berapa dikali dirinya sendiri?", bahas: `Luas ${p} × ${l} = ${p * l} cm², sisi persegi ${s} cm. Keliling persegi panjang ${2 * (p + l)} cm, keliling persegi ${4 * s} cm. Selisih ${sel} cm.` }); },
  ],
  10: [
    () => { const w = acak(1, 3), p = acak(12, 30), l = acak(8, p - 2), L = p * l - (p - 2 * w) * (l - 2 * w); return isian(`Sebuah taman berbentuk persegi panjang berukuran ${p} m × ${l} m. Di bagian dalam sepanjang tepi taman dibuat jalan selebar ${w} m. Luas jalan adalah … m².`, L,
      { satuan: "m²", gambar: svgPoligon([[0, 0], [p, 0], [p, l], [0, l]], { 0: `${p} m`, 1: `${l} m` }, { lubang: [[w, w], [p - w, w], [p - w, l - w], [w, l - w]], label: "taman dengan jalan" }), petunjuk: "Luas jalan = luas taman − luas bagian tengah.", bahas: `Bagian tengah ${p - 2 * w} × ${l - 2 * w} = ${(p - 2 * w) * (l - 2 * w)}. ${p * l} − ${(p - 2 * w) * (l - 2 * w)} = ${L} m².` }); },
    () => { const a = acak(10, 20), b = acak(10, 20), c = acak(4, 9); return isian(`Sebuah foto berukuran ${a} cm × ${b} cm ditempel pada karton. Di sekeliling foto masih tersisa karton selebar ${c} cm. Luas karton yang tidak tertutup foto adalah … cm².`, (a + 2 * c) * (b + 2 * c) - a * b,
      { satuan: "cm²", petunjuk: "Ukuran karton = ukuran foto + 2 × lebar sisa.", bahas: `Karton ${a + 2 * c} × ${b + 2 * c} = ${(a + 2 * c) * (b + 2 * c)}. Dikurangi foto ${a * b} = ${(a + 2 * c) * (b + 2 * c) - a * b} cm².` }); },
    () => { const s = pilih([7, 14, 21, 28]), seper = ya(), arsirLing = ya(), Lp = s * s, Ll = 11 * s * s / 14, jaw = arsirLing ? Ll : Lp - Ll;
      const ling = seper ? `seperempat lingkaran dengan pusat di salah satu pojok persegi dan jari-jari ${s} cm` : `lingkaran yang menyinggung keempat sisi persegi`;
      const gbr = svgPoligon([[0, 0], [s, 0], [s, s], [0, s]], { 0: `${s} cm` }, { label: "persegi dan lingkaran", extra: T => { const a = T([0, s]), b = T([s, s]), rr = (b[0] - a[0]) * (seper ? 1 : 0.5), c = T([s / 2, s / 2]);
        const bentuk = seper ? `<path d="M${a[0]} ${a[1]}L${a[0]} ${(a[1] - rr).toFixed(1)}A${rr} ${rr} 0 0 1 ${(a[0] + rr).toFixed(1)} ${a[1]}Z"` : `<circle cx="${c[0]}" cy="${c[1]}" r="${rr.toFixed(1)}"`;
        return arsirLing ? `${bentuk} class="arsir"/>` : `<polygon points="${[[0, 0], [s, 0], [s, s], [0, s]].map(T).map(q => q.join(",")).join(" ")}" class="arsir"/>${bentuk} class="bangun"/>`; } });
      const cm2 = v => fmt(v) + " cm²";
      return pg(`Gambar di bawah menunjukkan persegi bersisi ${s} cm dan ${ling}. Luas daerah yang diarsir adalah … (Gunakan π = ${pc(22, 7)})`, cm2(jaw), [cm2(Lp - jaw), cm2(Lp), cm2(arsirLing ? 4 * Ll : Lp - 4 * Ll > 0 ? Lp - 4 * Ll : jaw + s), cm2(jaw + s)],
        { gambar: gbr, satuan: "cm²", petunjuk: arsirLing ? (seper ? "Luas seperempat lingkaran = ¼ × π × r × r." : `Jari-jari lingkaran = setengah sisi = ${fmt(s / 2)} cm.`) : "Luas arsir = luas persegi − luas bagian lingkaran.",
          bahas: `Luas ${seper ? "seperempat lingkaran = ¼ ×" : "lingkaran ="} ${pc(22, 7)} × ${seper ? s : fmt(s / 2)} × ${seper ? s : fmt(s / 2)} = ${fmt(Ll)} cm².${arsirLing ? "" : ` Luas persegi ${Lp} cm². Arsir = ${Lp} − ${fmt(Ll)} = ${fmt(jaw)} cm².`}` }); },
    () => { const r = pilih([7, 14, 21, 28, 35]), p = acak(4, 12) * 10, n = acak(2, 5), K = 2 * p + 44 * r / 7, x = nama();
      const P = [[0, 0], [p, 0]]; for (let i = 1; i < 12; i++) { const a = -Math.PI / 2 + Math.PI * i / 12; P.push([Math.round((p + r * Math.cos(a)) * 10) / 10, Math.round((r + r * Math.sin(a)) * 10) / 10]); }
      P.push([p, 2 * r], [0, 2 * r]); for (let i = 1; i < 12; i++) { const a = Math.PI / 2 + Math.PI * i / 12; P.push([Math.round(r * Math.cos(a) * 10) / 10, Math.round((r + r * Math.sin(a)) * 10) / 10]); }
      return isian(`Lintasan lari berbentuk dua garis lurus sepanjang ${p} m dan dua setengah lingkaran berdiameter ${2 * r} m di kedua ujungnya. ${x} berlari mengelilingi lintasan itu sebanyak ${n} kali. Jarak yang ditempuh ${x} adalah … m. (Gunakan π = ${pc(22, 7)})`, n * K,
        { gambar: svgPoligon(P, { 0: `${p} m` }, { label: "lintasan lari", extra: T => { const a = T([p, 0]), b = T([p, 2 * r]); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="bantu"/>` + svgT(a[0] - 6, (a[1] + b[1]) / 2 + 4, `${2 * r} m`, 'text-anchor="end" class="lbl"'); } }),
          satuan: "m", petunjuk: "Dua setengah lingkaran = satu lingkaran penuh. Satu putaran = 2 × garis lurus + keliling lingkaran.", bahas: `Keliling lingkaran ${pc(22, 7)} × ${2 * r} = ${44 * r / 7} m. Satu putaran 2 × ${p} + ${44 * r / 7} = ${K} m. ${n} × ${K} = ${fmt(n * K)} m.` }); },
  ],
});

/* ================= Misi 3: Bangun gabungan ================= */
function bentukL(W, H, w, h, bawah) {   // takik w×h di pojok kanan atas (atau kanan bawah)
  return bawah ? [[0, 0], [W, 0], [W, H - h], [W - w, H - h], [W - w, H], [0, H]] : [[0, 0], [W - w, 0], [W - w, h], [W, h], [W, H], [0, H]];
}
function svgPetak(W, H, w, h) {   // bentuk L dari petak satuan
  const u = 22; let s = svgBuka(W * u + 8, H * u + 8, "bangun dari persegi satuan");
  for (let i = 0; i < W; i++) for (let j = 0; j < H; j++) if (!(i >= W - w && j < h)) s += `<rect x="${4 + i * u}" y="${4 + j * u}" width="${u}" height="${u}" class="ubin"/>`;
  return s + "</svg>";
}
const ukL = () => { const W = acak(6, 16), H = acak(5, 14), w = acak(2, W - 2), h = acak(2, H - 2); return { W, H, w, h }; };
/* Tangga n anak tangga (lebar a, tinggi b) — anak tangga teratas di kiri */
const tanggaP = (n, a, b) => { const P = [[0, 0]]; for (let i = 1; i <= n; i++) { P.push([i * a, (i - 1) * b]); if (i < n) P.push([i * a, i * b]); } P.push([n * a, n * b], [0, n * b]); return P; };
/* Persegi panjang (lebar 2r, tinggi h) dengan setengah lingkaran di atasnya */
const jendelaP = (r, h) => { const P = [[0, r + h], [0, r]]; for (let i = 1; i < 16; i++) { const a = Math.PI + Math.PI * i / 16; P.push([Math.round((r + r * Math.cos(a)) * 10) / 10, Math.round((r + r * Math.sin(a)) * 10) / 10]); } P.push([2 * r, r], [2 * r, r + h]); return P; };
const plusP = s => [[s, 0], [2 * s, 0], [2 * s, s], [3 * s, s], [3 * s, 2 * s], [2 * s, 2 * s], [2 * s, 3 * s], [s, 3 * s], [s, 2 * s], [0, 2 * s], [0, s], [s, s]];
const garis = (a, b, k = "bantu") => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="${k}"/>`;
/* Kumpulan petak satuan dari gabungan persegi panjang [x, y, w, h]; hasil: larik [i, j] tanpa kembar */
function petakDari(rects) { const set = new Set(); rects.forEach(([x, y, w, h]) => { for (let i = x; i < x + w; i++) for (let j = y; j < y + h; j++) set.add(i + "," + j); }); return [...set].map(k => k.split(",").map(Number)); }
/* Gambar petak satuan. arsir: tampilkan kisi W×H penuh dan petak terpilih diarsir */
function svgSel(sel, arsir) { const u = 22, W = arsir ? arsir[0] : Math.max(...sel.map(c => c[0])) + 1, H = arsir ? arsir[1] : Math.max(...sel.map(c => c[1])) + 1; let s = svgBuka(W * u + 8, H * u + 8, "bangun dari persegi satuan");
  const kotak = (i, j, k) => `<rect x="${4 + i * u}" y="${4 + j * u}" width="${u}" height="${u}" class="${k}"/>`;
  if (arsir) { for (let i = 0; i < W; i++) for (let j = 0; j < H; j++) s += kotak(i, j, "kosong"); sel.forEach(([i, j]) => { s += kotak(i, j, "arsir"); }); }
  else sel.forEach(([i, j]) => { s += kotak(i, j, "ubin"); });
  return s + "</svg>"; }
/* Keliling bangun dari petak satuan = banyak sisi petak yang tidak berbatasan dengan petak lain */
const kelilingSel = sel => { const ada = new Set(sel.map(c => c.join(","))); let k = 0; sel.forEach(([i, j]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => { if (!ada.has((i + a) + "," + (j + b))) k++; })); return k; };
/* Bangun tangga petak: baris ke-j dari atas panjangnya P[j] (makin ke bawah makin panjang), rata kiri */
const tanggaSel = P => petakDari(P.map((p, j) => [0, j, p, 1]));
const acakTangga = (n, maks) => { const P = []; let p = 0; for (let j = 0; j < n; j++) { p += acak(1, Math.max(1, Math.floor(maks / n))); P.push(p); } return P; };
/* Bangun berbentuk T, U, rumah, persegi panjang terpotong pojok, salib, dan H (titik searah jarum jam di layar) */
const bentukT = (W, h1, w, h2, x) => [[0, 0], [W, 0], [W, h1], [x + w, h1], [x + w, h1 + h2], [x, h1 + h2], [x, h1], [0, h1]];
const bentukU = (W, H, w, h, x) => [[0, 0], [x, 0], [x, h], [x + w, h], [x + w, 0], [W, 0], [W, H], [0, H]];
const bentukRumah = (p, l, t) => [[0, t], [p / 2, 0], [p, t], [p, t + l], [0, t + l]];
const bentukPotong = (W, H, a, b) => [[0, 0], [W - a, 0], [W, b], [W, H], [0, H]];
const bentukSalib = (P, a, y0, b, Q, x0) => [[x0, 0], [x0 + b, 0], [x0 + b, y0], [P, y0], [P, y0 + a], [x0 + b, y0 + a], [x0 + b, Q], [x0, Q], [x0, y0 + a], [0, y0 + a], [0, y0], [x0, y0]];
const bentukH = (W, H, c, y0, e) => [[0, 0], [c, 0], [c, y0], [W - c, y0], [W - c, 0], [W, 0], [W, H], [W - c, H], [W - c, y0 + e], [c, y0 + e], [c, H], [0, H]];
const ukT = () => { const W = acak(7, 15), h1 = acak(2, 4), w = acak(2, W - 5), h2 = acak(3, 9), x = acak(2, W - w - 2); return { W, h1, w, h2, x }; };
const ukU = () => { const W = acak(9, 18), H = acak(7, 14), a = acak(2, 4), c = acak(2, 4), h = acak(2, H - 3); return { W, H, a, c, h, w: W - a - c }; };
/* Rumah dengan atap segitiga sama kaki: setengah alas g, tinggi atap t, sisi miring k (tripel Pythagoras) */
const ukRumah = () => { const [g, t, k] = pilih(TRIPEL), l = acak(4, 14); return { p: 2 * g, t, k, l }; };
/* Label teks tambahan pada garis bantu tegak (x, y1)–(x, y2) */
const bantuTegak = (T, x, y1, y2, teks, kanan = true) => { const a = T([x, y1]), b = T([x, y2]); return garis(a, b) + svgT((a[0] + (kanan ? 6 : -6)).toFixed(1), ((a[1] + b[1]) / 2 + 5).toFixed(1), teks, `${kanan ? "" : 'text-anchor="end" '}class="lbl"`); };
const bantuDatar = (T, x1, x2, y, teks, bawah = true) => { const a = T([x1, y]), b = T([x2, y]); return garis(a, b) + svgT(((a[0] + b[0]) / 2).toFixed(1), (a[1] + (bawah ? 18 : -7)).toFixed(1), teks, 'text-anchor="middle" class="lbl"'); };
/* Dua persegi panjang berdampingan, alas rata: kiri a × b, kanan c × d (d < b) */
const bentukDua = (a, b, c, d) => [[0, 0], [a, 0], [a, b - d], [a + c, b - d], [a + c, b], [0, b]];
const ukDua = () => { const b = acak(4, 10), d = acak(2, b - 1); return { a: acak(3, 10), b, c: acak(2, 8), d }; };
/* Cetakan tambahan Misi 3 (bangun gabungan) per level */
const U3T = {
  1: [
    () => { const W = acak(3, 6), h1 = acak(1, 2), w = acak(1, Math.min(2, W - 2)), h2 = acak(1, 3), x = acak(1, W - w - 1), sel = petakDari([[0, 0, W, h1], [x, h1, w, h2]]);
      return isian(`Bangun huruf T di bawah tersusun dari persegi-persegi kecil. Setiap persegi kecil luasnya 1 cm². Luas bangun itu adalah … cm².`, sel.length, { gambar: svgSel(sel), satuan: "cm²", petunjuk: "Hitung persegi kecilnya satu per satu, baris demi baris.", bahas: `Bagian atas ${W * h1} persegi, bagian bawah ${w * h2} persegi. Jumlahnya ${sel.length} → ${sel.length} cm².` }); },
    () => { const P = acakTangga(acak(2, 4), 7), sel = tanggaSel(P);
      return isian(`Bangun tangga di bawah tersusun dari persegi-persegi kecil. Banyak persegi kecilnya adalah …`, sel.length, { gambar: svgSel(sel), satuan: "persegi", petunjuk: "Hitung banyak persegi pada setiap baris, lalu jumlahkan.", bahas: `${P.join(" + ")} = ${sel.length} persegi.` }); },
    () => { const W = acak(3, 6), H = acak(2, 4), w = acak(1, W - 2), h = acak(1, H - 1), x = acak(1, W - w - 1), sel = petakDari([[0, 0, W, H]]).filter(([i, j]) => !(i >= x && i < x + w && j < h));
      return isian(`Lantai di bawah ditutup ubin persegi. Setiap ubin luasnya 1 m². Luas lantai itu adalah … m².`, sel.length, { gambar: svgSel(sel), satuan: "m²", petunjuk: "Hitung banyak ubinnya.", bahas: `Ada ${sel.length} ubin, jadi luasnya ${sel.length} m².` }); },
    () => { const W = acak(6, 8), H = acak(4, 5), r = () => { const w = acak(1, 4), h = acak(1, 3); return [acak(0, W - w), acak(0, H - h), w, h]; }, sel = petakDari([r(), r()]);
      return isian(`Setiap persegi kecil pada kertas berpetak di bawah luasnya 1 cm². Luas daerah yang diarsir adalah … cm².`, sel.length, { gambar: svgSel(sel, [W, H]), satuan: "cm²", petunjuk: "Hitung persegi kecil yang diarsir saja.", bahas: `Ada ${sel.length} persegi yang diarsir → ${sel.length} cm².` }); },
    () => { const P = acak(3, 6), Q = acak(3, 5), a = 1, b = 1, y0 = acak(1, Q - 2), x0 = acak(1, P - 2), sel = petakDari([[0, y0, P, a], [x0, 0, b, Q]]);
      return isian(`Bangun berbentuk tanda tambah di bawah tersusun dari persegi-persegi kecil. Banyak persegi kecil penyusunnya adalah …`, sel.length, { gambar: svgSel(sel), satuan: "persegi", petunjuk: "Hitung yang mendatar, lalu yang tegak. Persegi di tengah jangan dihitung dua kali!", bahas: `Mendatar ${P}, tegak ${Q}, persegi tengah terhitung dua kali: ${P} + ${Q} − 1 = ${sel.length} persegi.` }); },
  ],
  2: [
    () => { const W = acak(3, 7), H = acak(3, 6), w = acak(1, W - 1), h = acak(1, H - 1);
      return isian(`Setiap persegi kecil bersisi 1 cm. Keliling bangun di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPetak(W, H, w, h), satuan: "cm", petunjuk: "Hitung sisi-sisi persegi kecil yang berada di tepi luar bangun.", bahas: `Sisi luar bangun ada ${2 * (W + H)} buah, jadi kelilingnya ${2 * (W + H)} cm.` }); },
    () => { const W = acak(4, 8), H = acak(3, 6), w = acak(1, W - 2), h = acak(1, H - 1), x = acak(1, W - w - 1), sel = petakDari([[0, 0, W, H]]).filter(([i, j]) => !(i >= x && i < x + w && j < h));
      return isian(`Setiap persegi kecil luasnya 1 cm². Luas bangun berbentuk huruf U di bawah adalah … cm².`, sel.length, { gambar: svgSel(sel), satuan: "cm²", petunjuk: "Hitung persegi panjang besarnya, lalu kurangi bagian yang kosong.", bahas: `${W} × ${H} − ${w} × ${h} = ${sel.length} cm².` }); },
    () => { const { a, b, c, d } = ukDua();
      return isian(`Bangun di bawah tersusun dari dua persegi panjang. Luas bangun itu adalah … cm².`, a * b + c * d, { gambar: svgPoligon(bentukDua(a, b, c, d), { 0: `${a} cm`, 5: `${b} cm`, 2: `${c} cm`, 3: `${d} cm` }, { label: "dua persegi panjang", extra: T => garis(T([a, b - d]), T([a, b])) }),
        satuan: "cm²", petunjuk: "Hitung luas kedua persegi panjang, lalu jumlahkan.", bahas: `${a} × ${b} = ${a * b} dan ${c} × ${d} = ${c * d}. Jumlah ${a * b + c * d} cm².` }); },
    () => { const W = acak(6, 8), H = acak(4, 5), r = () => { const w = acak(1, 4), h = acak(1, 3); return [acak(0, W - w), acak(0, H - h), w, h]; }, sel = petakDari([r(), r()]);
      return isian(`Setiap persegi kecil pada kertas berpetak di bawah luasnya 1 cm². Luas daerah yang <b>tidak</b> diarsir adalah … cm².`, W * H - sel.length, { gambar: svgSel(sel, [W, H]), satuan: "cm²", petunjuk: "Luas seluruh kertas dikurangi luas daerah yang diarsir.", bahas: `Seluruhnya ${W} × ${H} = ${W * H}. Diarsir ${sel.length}. Tidak diarsir ${W * H} − ${sel.length} = ${W * H - sel.length} cm².` }); },
    () => { const P = acakTangga(acak(3, 4), 8), sel = tanggaSel(P), K = kelilingSel(sel);
      return isian(`Setiap persegi kecil bersisi 1 cm. Keliling bangun tangga di bawah adalah … cm.`, K, { gambar: svgSel(sel), satuan: "cm", petunjuk: "Geser sisi-sisi anak tangga ke luar: bentuknya menjadi persegi panjang.", bahas: `Bangun tangga itu selebar ${P[P.length - 1]} cm dan setinggi ${P.length} cm. Keliling 2 × (${P[P.length - 1]} + ${P.length}) = ${K} cm.` }); },
  ],
  3: [
    () => { const { W, h1, w, h2, x } = ukT();
      return isian(`Lantai aula berbentuk huruf T seperti gambar. Luas lantai aula itu adalah … m².`, W * h1 + w * h2, { gambar: svgPoligon(bentukT(W, h1, w, h2, x), { 0: `${W} m`, 1: `${h1} m`, 3: `${h2} m`, 4: `${w} m` }, { label: "lantai huruf T", extra: T => garis(T([x, h1]), T([x + w, h1])) }),
        satuan: "m²", petunjuk: "Bagi menjadi dua persegi panjang: bagian atas dan bagian bawah.", bahas: `Atas ${W} × ${h1} = ${W * h1}. Bawah ${w} × ${h2} = ${w * h2}. Total ${W * h1 + w * h2} m².` }); },
    () => { const s = acak(4, 12); let t = acak(2, 8); if ((s * t) % 2) t++;
      return isian(`Bangun di bawah terdiri atas persegi dan segitiga. Luas bangun itu adalah … cm².`, s * s + s * t / 2, { gambar: svgPoligon(bentukRumah(s, s, t), { 2: `${s} cm`, 3: `${s} cm` }, { label: "persegi dan segitiga", extra: T => garis(T([0, t]), T([s, t])) + bantuTegak(T, s / 2, 0, t, `${t} cm`) }),
        satuan: "cm²", petunjuk: "Luas persegi + luas segitiga. Alas segitiga = sisi persegi.", bahas: `Persegi ${s} × ${s} = ${s * s}. Segitiga ${s} × ${t} : 2 = ${s * t / 2}. Total ${s * s + s * t / 2} cm².` }); },
    () => { const { a, b, c, d } = ukDua(), x = nama();
      return isian(`Kebun ${x} berbentuk seperti gambar di bawah. Luas kebun itu adalah … m².`, a * b + c * d, { gambar: svgPoligon(bentukDua(a, b, c, d), { 0: `${a} m`, 5: `${b} m`, 2: `${c} m`, 3: `${d} m` }, { label: "kebun" }),
        satuan: "m²", petunjuk: "Potong kebun menjadi dua persegi panjang.", bahas: `${a} × ${b} = ${a * b} dan ${c} × ${d} = ${c * d}. Luas ${a * b + c * d} m².` }); },
    () => { const { W, h1, w, h2, x } = ukT();
      return isian(`Keliling bangun huruf T di bawah adalah … cm.`, 2 * W + 2 * h1 + 2 * h2, { gambar: svgPoligon(bentukT(W, h1, w, h2, x), { 0: `${W} cm`, 1: `${h1} cm`, 2: `${W - x - w} cm`, 3: `${h2} cm`, 4: `${w} cm`, 5: `${h2} cm`, 6: `${x} cm`, 7: `${h1} cm` }, { label: "bangun huruf T" }),
        satuan: "cm", petunjuk: "Jumlahkan kedelapan sisinya.", bahas: `${W} + ${h1} + ${W - x - w} + ${h2} + ${w} + ${h2} + ${x} + ${h1} = ${2 * W + 2 * h1 + 2 * h2} cm.` }); },
    () => { const p = acak(4, 12), l = acak(3, 8); let a = acak(2, 6); if ((a * l) % 2) a++;
      return isian(`Bangun di bawah terdiri atas persegi panjang dan segitiga siku-siku. Luas bangun itu adalah … cm².`, p * l + a * l / 2, { gambar: svgPoligon([[0, 0], [p, 0], [p + a, l], [0, l]], { 0: `${p} cm`, 3: `${l} cm` }, { label: "persegi panjang dan segitiga", extra: T => { const q = T([p, l]), r = T([p + a, l]); return garis(T([p, 0]), q) + svgT(((q[0] + r[0]) / 2).toFixed(1), (q[1] + 18).toFixed(1), `${a} cm`, 'text-anchor="middle" class="lbl"'); } }),
        satuan: "cm²", petunjuk: "Tinggi segitiga sama dengan lebar persegi panjang.", bahas: `Persegi panjang ${p} × ${l} = ${p * l}. Segitiga ${a} × ${l} : 2 = ${a * l / 2}. Total ${p * l + a * l / 2} cm².` }); },
  ],
  4: [
    () => { const { W, H, a, c, h, w } = ukU();
      return isian(`Luas bangun berbentuk huruf U di bawah adalah … cm².`, W * H - w * h, { gambar: svgPoligon(bentukU(W, H, w, h, a), { 0: `${a} cm`, 1: `${h} cm`, 4: `${c} cm`, 6: `${W} cm`, 7: `${H} cm` }, { label: "bangun huruf U" }),
        satuan: "cm²", petunjuk: "Cari dulu lebar bagian yang kosong di tengah atas.", bahas: `Lebar bagian kosong ${W} − ${a} − ${c} = ${w}. Luas ${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); },
    () => { const W = acak(8, 16), H = acak(6, 12); let a = acak(2, W - 4); const b = acak(2, H - 3); if ((a * b) % 2) a++;
      return isian(`Sebuah kertas berbentuk persegi panjang dipotong salah satu pojoknya berbentuk segitiga siku-siku seperti gambar. Luas kertas yang tersisa adalah … cm².`, W * H - a * b / 2,
        { gambar: svgPoligon(bentukPotong(W, H, a, b), { 0: `${W - a} cm`, 2: `${H - b} cm`, 3: `${W} cm`, 4: `${H} cm` }, { label: "persegi panjang terpotong", extra: T => garis(T([W - a, 0]), T([W, 0])) + garis(T([W, 0]), T([W, b])) }),
        satuan: "cm²", petunjuk: "Sisi siku-siku potongan = selisih sisi panjang dan sisi pendek di bagian atas dan kanan.", bahas: `Potongan segitiga ${W} − ${W - a} = ${a} cm dan ${H} − ${H - b} = ${b} cm, luasnya ${a} × ${b} : 2 = ${a * b / 2}. Sisa ${W} × ${H} − ${a * b / 2} = ${W * H - a * b / 2} cm².` }); },
    () => { const p = acak(3, 8) * 2, l = acak(4, 10), t = acak(2, 8), Tg = l + t;
      return isian(`Gambar rumah di bawah terdiri atas persegi panjang dan segitiga. Tinggi seluruh rumah ${Tg} cm. Luas gambar rumah itu adalah … cm².`, p * l + p * t / 2,
        { gambar: svgPoligon(bentukRumah(p, l, t), { 4: `${l} cm`, 3: `${p} cm` }, { label: "gambar rumah", tepi: 72, extra: T => garis(T([0, t]), T([p, t])) + bantuTegak(T, p * 1.05, 0, t + l, `${Tg} cm`) }),
        satuan: "cm²", petunjuk: "Tinggi segitiga = tinggi seluruh rumah − tinggi dinding.", bahas: `Tinggi segitiga ${Tg} − ${l} = ${t}. Persegi panjang ${p} × ${l} = ${p * l}. Segitiga ${p} × ${t} : 2 = ${p * t / 2}. Total ${p * l + p * t / 2} cm².` }); },
    () => { const { W, h1, w, h2, x } = ukT(), Ht = h1 + h2;
      return isian(`Luas bangun huruf T di bawah adalah … cm².`, W * h1 + w * h2, { gambar: svgPoligon(bentukT(W, h1, w, h2, x), { 0: `${W} cm`, 7: `${h1} cm`, 4: `${w} cm` }, { label: "bangun huruf T", tepi: 64, extra: T => bantuTegak(T, W * 1.08, 0, Ht, `${Ht} cm`) }),
        satuan: "cm²", petunjuk: "Tinggi bagian bawah = tinggi seluruhnya − tinggi bagian atas.", bahas: `Tinggi bagian bawah ${Ht} − ${h1} = ${h2}. Luas ${W} × ${h1} + ${w} × ${h2} = ${W * h1} + ${w * h2} = ${W * h1 + w * h2} cm².` }); },
    () => { const S = acak(10, 20), s = acak(4, S - 4), o = (S - s) / 2;
      return isian(`Bingkai foto berbentuk persegi bersisi ${S} cm. Di tengahnya ada lubang berbentuk persegi bersisi ${s} cm. Luas bingkai (tanpa lubang) adalah … cm².`, S * S - s * s,
        { gambar: svgPoligon([[0, 0], [S, 0], [S, S], [0, S]], { 0: `${S} cm` }, { lubang: [[o, o], [o + s, o], [o + s, o + s], [o, o + s]], label: "bingkai foto", extra: T => { const q = T([S / 2, o + s]); return svgT(q[0].toFixed(1), (q[1] - 8).toFixed(1), `${s} cm`, 'text-anchor="middle" class="lbl"'); } }),
        satuan: "cm²", petunjuk: "Luas persegi besar dikurangi luas lubang.", bahas: `${S} × ${S} − ${s} × ${s} = ${S * S} − ${s * s} = ${S * S - s * s} cm².` }); },
  ],
  5: [
    () => { const { W, h1, w, h2, x } = ukT();
      return isian(`Keliling bangun huruf T di bawah adalah … cm.`, 2 * W + 2 * h1 + 2 * h2, { gambar: svgPoligon(bentukT(W, h1, w, h2, x), { 0: `${W} cm`, 1: `${h1} cm`, 3: `${h2} cm`, 4: `${w} cm` }, { label: "bangun huruf T" }),
        satuan: "cm", petunjuk: "Dua sisi mendatar yang pendek di bawah bagian atas jika digabung sama dengan panjang atas dikurangi lebar bagian bawah.", bahas: `Sisi mendatar: ${W} + ${w} + (${W} − ${w}) = ${2 * W}. Sisi tegak: 2 × ${h1} + 2 × ${h2} = ${2 * h1 + 2 * h2}. Keliling ${2 * W + 2 * h1 + 2 * h2} cm.` }); },
    () => { const [a, b, c] = pilih(TRIPEL), W = a + acak(3, 10), H = b + acak(3, 8), K = (W - a) + c + (H - b) + W + H;
      return isian(`Sebuah papan berbentuk ${namaPP(W, H)} ${W} cm × ${H} cm dipotong salah satu pojoknya. Potongannya berbentuk segitiga siku-siku dengan sisi siku-siku ${a} cm dan ${b} cm, serta sisi miring ${c} cm. Keliling papan yang tersisa adalah … cm.`, K,
        { gambar: svgPoligon(bentukPotong(W, H, a, b), { 1: `${c} cm`, 3: `${W} cm`, 4: `${H} cm` }, { label: "papan terpotong" }), satuan: "cm", petunjuk: "Sisi atas berkurang, sisi kanan berkurang, tetapi bertambah sisi miring.", bahas: `${W - a} + ${c} + ${H - b} + ${W} + ${H} = ${K} cm.` }); },
    () => { const { p, t, k, l } = ukRumah();
      return isian(`Gambar rumah di bawah terdiri atas persegi panjang dan segitiga sama kaki. Keliling gambar rumah itu adalah … cm.`, p + 2 * l + 2 * k,
        { gambar: svgPoligon(bentukRumah(p, l, t), { 0: `${k} cm`, 2: `${l} cm`, 3: `${p} cm` }, { label: "gambar rumah", extra: T => garis(T([0, t]), T([p, t])) }), satuan: "cm", petunjuk: "Garis putus-putus tidak ikut dihitung. Kedua sisi atap sama panjang, kedua dinding juga sama panjang.", bahas: `${p} + 2 × ${l} + 2 × ${k} = ${p + 2 * l + 2 * k} cm.` }); },
    () => { const p = acak(4, 12), g = acak(2, 6), t = acak(3, 10);
      return isian(`Bangun di bawah terdiri atas persegi panjang dan dua segitiga siku-siku yang sama besar. Luas bangun itu adalah … cm².`, (p + g) * t,
        { gambar: svgPoligon([[g, 0], [g + p, 0], [2 * g + p, t], [0, t]], { 0: `${p} cm`, 2: `${p + 2 * g} cm` }, { label: "persegi panjang dan dua segitiga", extra: T => garis(T([g, 0]), T([g, t])) + bantuTegak(T, g + p, 0, t, `${t} cm`, false) }),
        satuan: "cm²", petunjuk: "Alas setiap segitiga = (sisi bawah − sisi atas) : 2.", bahas: `Alas segitiga (${p + 2 * g} − ${p}) : 2 = ${g}. Persegi panjang ${p} × ${t} = ${p * t}. Dua segitiga 2 × ${g} × ${t} : 2 = ${g * t}. Total ${(p + g) * t} cm².` }); },
    () => { const P = acak(8, 16), a = acak(2, 4), Q = acak(8, 14), b = acak(2, 4), y0 = acak(2, Q - a - 2), x0 = acak(2, P - b - 2);
      return isian(`Bangun salib di bawah tersusun dari dua persegi panjang yang bersilangan, yaitu ${P} cm × ${a} cm (mendatar) dan ${b} cm × ${Q} cm (tegak). Luas bangun salib itu adalah … cm².`, P * a + b * Q - a * b,
        { gambar: svgPoligon(bentukSalib(P, a, y0, b, Q, x0), { 0: `${b} cm`, 3: `${a} cm` }, { label: "bangun salib", extra: T => { const q = T([x0, y0]), r = T([x0 + b, y0 + a]); return `<rect x="${q[0]}" y="${q[1]}" width="${(r[0] - q[0]).toFixed(1)}" height="${(r[1] - q[1]).toFixed(1)}" class="tumpuk"/>`; } }),
        satuan: "cm²", petunjuk: "Bagian tengah (persilangan) termasuk kedua persegi panjang. Jangan dihitung dua kali!", bahas: `${P} × ${a} + ${b} × ${Q} − ${a} × ${b} = ${P * a} + ${b * Q} − ${a * b} = ${P * a + b * Q - a * b} cm².` }); },
  ],
  6: [
    () => { const W = acak(10, 18), H = acak(6, 12); let a = acak(2, Math.floor(W / 2) - 1); const b = acak(2, H - 2);
      return isian(`Sehelai kain berbentuk ${namaPP(W, H)} ${W} cm × ${H} cm. Kedua pojok atasnya dipotong berbentuk segitiga siku-siku yang sama, masing-masing dengan sisi siku-siku ${a} cm dan ${b} cm. Luas kain yang tersisa adalah … cm².`, W * H - a * b,
        { gambar: svgPoligon([[a, 0], [W - a, 0], [W, b], [W, H], [0, H], [0, b]], { 3: `${W} cm`, 4: `${H - b} cm` }, { label: "kain terpotong dua pojok", extra: T => garis(T([0, 0]), T([a, 0])) + garis(T([0, 0]), T([0, b])) + garis(T([W - a, 0]), T([W, 0])) + garis(T([W, 0]), T([W, b])) }),
        satuan: "cm²", petunjuk: "Dua segitiga yang sama jika digabung membentuk persegi panjang a × b.", bahas: `Dua potongan 2 × (${a} × ${b} : 2) = ${a * b}. Sisa ${W} × ${H} − ${a * b} = ${W * H - a * b} cm².` }); },
    () => { const P = acak(8, 18), a = acak(2, 4), Q = acak(8, 16), b = acak(2, 4), y0 = acak(2, Q - a - 2), x0 = acak(2, P - b - 2);
      return isian(`Bangun salib di bawah dibentuk dari dua persegi panjang yang bersilangan. Panjang bagian mendatar ${P} cm dan tinggi bagian tegak ${Q} cm. Keliling bangun salib itu adalah … cm.`, 2 * (P + Q),
        { gambar: svgPoligon(bentukSalib(P, a, y0, b, Q, x0), { 0: `${b} cm`, 3: `${a} cm` }, { label: "bangun salib" }), satuan: "cm", petunjuk: "Geser sisi-sisi mendatar ke atas/bawah dan sisi tegak ke kiri/kanan: bentuknya menjadi persegi panjang!",
          bahas: `Jika sisi-sisinya digeser, keliling sama dengan persegi panjang ${P} cm × ${Q} cm: 2 × (${P} + ${Q}) = ${2 * (P + Q)} cm.` }); },
  ],
  7: [
    () => { const c = acak(2, 4), W = 2 * c + acak(4, 10), H = acak(7, 12), e = acak(2, Math.min(4, H - 4)), y0 = acak(2, H - e - 2);
      return isian(`Bangun berbentuk huruf H di bawah terdiri atas dua persegi panjang tegak dan satu persegi panjang mendatar di tengahnya. Luas bangun itu adalah … cm².`, 2 * c * H + (W - 2 * c) * e,
        { gambar: svgPoligon(bentukH(W, H, c, y0, e), { 0: `${c} cm`, 4: `${c} cm`, 2: `${W - 2 * c} cm`, 11: `${H} cm` }, { label: "bangun huruf H", extra: T => garis(T([c, y0]), T([c, y0 + e])) + garis(T([W - c, y0]), T([W - c, y0 + e])) + bantuTegak(T, W / 2, y0, y0 + e, `${e} cm`) }),
        satuan: "cm²", petunjuk: "Dua tiang tegak + satu batang mendatar di tengah.", bahas: `Dua tiang 2 × ${c} × ${H} = ${2 * c * H}. Batang tengah ${W - 2 * c} × ${e} = ${(W - 2 * c) * e}. Total ${2 * c * H + (W - 2 * c) * e} cm².` }); },
    () => { const { p, t, k, l } = ukRumah(), x = nama();
      return isian(`Dinding depan rumah boneka milik ${x} berbentuk seperti gambar (persegi panjang dan segitiga sama kaki). Di sepanjang tepinya akan ditempel pita. Panjang pita yang diperlukan adalah … cm.`, p + 2 * l + 2 * k,
        { gambar: svgPoligon(bentukRumah(p, l, t), { 1: `${k} cm`, 4: `${l} cm`, 3: `${p} cm` }, { label: "rumah boneka", extra: T => garis(T([0, t]), T([p, t])) }), satuan: "cm", petunjuk: "Pita hanya di tepi luar. Garis putus-putus tidak dihitung.", bahas: `${p} + 2 × ${l} + 2 × ${k} = ${p + 2 * l + 2 * k} cm.` }); },
  ],
  9: [
    () => { const c = acak(2, 4), W = 2 * c + acak(4, 10), H = acak(8, 14), e = acak(2, Math.min(4, H - 4)), y0 = acak(2, H - e - 2), K = 2 * W + 4 * H - 2 * e;
      return isian(`Keliling bangun berbentuk huruf H di bawah adalah … cm.`, K,
        { gambar: svgPoligon(bentukH(W, H, c, y0, e), { 0: `${c} cm`, 1: `${y0} cm`, 2: `${W - 2 * c} cm`, 5: `${H} cm`, 7: `${H - y0 - e} cm` }, { label: "bangun huruf H" }),
          satuan: "cm", petunjuk: "Keliling = keliling persegi panjang besar + sisi-sisi tegak di dalam kedua lekukan.", bahas: `Lebar seluruhnya ${c} + ${W - 2 * c} + ${c} = ${W}. Persegi panjang besar 2 × (${W} + ${H}) = ${2 * (W + H)}. Ditambah 2 × ${y0} + 2 × ${H - y0 - e} = ${2 * (H - e)}. Keliling ${K} cm.` }); },
    () => { const c = acak(2, 4), W = 2 * c + acak(4, 10), H = acak(8, 14), e = acak(2, Math.min(4, H - 4)), y0 = acak(2, H - e - 2), L = 2 * c * H + (W - 2 * c) * e;
      return isian(`Sebuah papan nama dipotong berbentuk huruf H seperti gambar. Luas papan itu adalah … cm².`, L,
        { gambar: svgPoligon(bentukH(W, H, c, y0, e), { 0: `${c} cm`, 1: `${y0} cm`, 2: `${W - 2 * c} cm`, 5: `${H} cm`, 7: `${H - y0 - e} cm` }, { label: "papan huruf H" }),
          satuan: "cm²", petunjuk: "Tinggi batang tengah = tinggi seluruhnya − kedalaman lekukan atas − kedalaman lekukan bawah.", bahas: `Tinggi batang tengah ${H} − ${y0} − ${H - y0 - e} = ${e}. Luas 2 × ${c} × ${H} + ${W - 2 * c} × ${e} = ${L} cm².` }); },
  ],
};
daftarMisi("ukr", "u3", "Bangun gabungan", "🏠", {
  1: [() => { const W = acak(3, 6), H = acak(3, 5), w = acak(1, W - 1), h = acak(1, H - 1); return isian(`Setiap persegi kecil luasnya 1 cm². Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPetak(W, H, w, h), satuan: "cm²", petunjuk: "Hitung persegi kecilnya.", bahas: `Ada ${W * H - w * h} persegi kecil → ${W * H - w * h} cm².` }); }, ...U3T[1]],
  2: [() => { const W = acak(5, 9), H = acak(4, 7), w = acak(2, W - 2), h = acak(2, H - 2); return isian(`Setiap persegi kecil luasnya 1 cm². Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPetak(W, H, w, h), satuan: "cm²", petunjuk: "Hitung persegi panjang besar, lalu kurangi bagian yang kosong.", bahas: `${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); }, ...U3T[2]],
  3: [() => { const { W, H, w, h } = ukL(), bw = ya(); return isian(`Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPoligon(bentukL(W, H, w, h, bw), bw ? { 0: `${W} cm`, 1: `${H - h} cm`, 2: `${w} cm`, 3: `${h} cm`, 5: `${H} cm` } : { 0: `${W - w} cm`, 1: `${h} cm`, 2: `${w} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm²", petunjuk: "Bagi menjadi dua persegi panjang.", bahas: `Persegi panjang besar ${W} × ${H} = ${W * H}, dikurangi bagian kosong ${w} × ${h} = ${w * h}. Luas = ${W * H - w * h} cm².` }); }, ...U3T[3]],
  4: [() => { const { W, H, w, h } = ukL(); return isian(`Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPoligon(bentukL(W, H, w, h, false), { 0: `${W - w} cm`, 3: `${H - h} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm²", petunjuk: "Cari dulu panjang sisi yang belum diketahui.", bahas: `Bagian kosong ${w} × ${h}. Luas = ${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); }, ...U3T[4]],
  5: [() => { const { W, H, w, h } = ukL(); return isian(`Keliling bangun di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPoligon(bentukL(W, H, w, h, false), { 0: `${W - w} cm`, 1: `${h} cm`, 2: `${w} cm`, 3: `${H - h} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm", petunjuk: "Jumlahkan semua sisi luarnya.", bahas: `${W - w} + ${h} + ${w} + ${H - h} + ${W} + ${H} = ${2 * (W + H)} cm.` }); }, ...U3T[5]],
  6: [
    () => { const { W, H, w, h } = ukL(); return isian(`Keliling bangun di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPoligon(bentukL(W, H, w, h, false), { 4: `${W} cm`, 5: `${H} cm` }), satuan: "cm", petunjuk: "Geser sisi-sisi takik ke luar: kelilingnya sama dengan persegi panjang besar!", bahas: `Keliling = 2 × (${W} + ${H}) = ${2 * (W + H)} cm.` }); },
    () => { const p = acak(8, 16); let l = acak(5, 10), t = acak(3, 7); if ((p * t) % 2) t++; return isian(`Gambar rumah di bawah terdiri atas persegi panjang dan segitiga. Luas seluruhnya adalah … cm².`, p * l + p * t / 2,
      { gambar: svgPoligon([[0, t], [p / 2, 0], [p, t], [p, t + l], [0, t + l]], { 2: `${l} cm`, 3: `${p} cm` }, { extra: T => { const a = T([p / 2, 0]), b = T([p / 2, t]), c = T([0, t]), d = T([p, t]); return `<line x1="${c[0]}" y1="${c[1]}" x2="${d[0]}" y2="${d[1]}" class="bantu"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="bantu"/>` + svgT(a[0] + 6, (a[1] + b[1]) / 2 + 4, `${t} cm`, 'class="lbl"'); } }),
        satuan: "cm²", bahas: `Persegi panjang ${p} × ${l} = ${p * l}. Segitiga ${p} × ${t} : 2 = ${p * t / 2}. Total ${p * l + p * t / 2} cm².` }); },
    () => { const W = acak(8, 16), h1 = acak(2, 5), w = acak(2, W - 4), h2 = acak(3, 10), x = acak(1, W - w - 1), L = W * h1 + w * h2;
      return isian(`Bangun berbentuk huruf T di bawah terdiri atas dua persegi panjang. Luas bangun itu adalah … cm².`, L,
        { gambar: svgPoligon([[0, 0], [W, 0], [W, h1], [x + w, h1], [x + w, h1 + h2], [x, h1 + h2], [x, h1], [0, h1]], { 0: `${W} cm`, 1: `${h1} cm`, 3: `${h2} cm`, 4: `${w} cm` }, { label: "bangun huruf T", extra: T => garis(T([x, h1]), T([x + w, h1])) }),
          satuan: "cm²", petunjuk: "Bagian atas dan bagian tegak adalah dua persegi panjang. Hitung masing-masing, lalu jumlahkan.", bahas: `Atas ${W} × ${h1} = ${W * h1}. Tegak ${w} × ${h2} = ${w * h2}. Total ${L} cm².` }); },
    () => { const n = acak(3, 4), a = acak(2, 6), b = acak(2, 5), W = n * a, H = n * b;
      return isian(`Bangun tangga di bawah terdiri atas ${n} anak tangga. Keliling bangun itu adalah … cm.`, 2 * (W + H),
        { gambar: svgPoligon(tanggaP(n, a, b), { [2 * n]: `${W} cm`, [2 * n + 1]: `${H} cm` }, { label: "bangun tangga" }), satuan: "cm", petunjuk: "Geser sisi-sisi mendatar anak tangga ke atas dan sisi tegaknya ke kanan. Bentuknya menjadi persegi panjang!",
          bahas: `Jika sisi-sisi anak tangga digeser, bangun menjadi persegi panjang ${W} cm × ${H} cm. Keliling 2 × (${W} + ${H}) = ${2 * (W + H)} cm.` }); },
    ...U3T[6],
  ],
  7: [() => { const W = acak(10, 20), H = acak(8, 16), w = acak(2, W - 6), h = acak(2, H - 5), x = acak(2, W - w - 2), y = acak(2, H - h - 2);
      return isian(`Sebuah papan berbentuk ${namaPP(W, H)} ${W} cm × ${H} cm dilubangi berbentuk ${namaPP(w, h)} ${w} cm × ${h} cm. Luas papan yang tersisa adalah … cm².`, W * H - w * h,
        { gambar: svgPoligon([[0, 0], [W, 0], [W, H], [0, H]], { 0: `${W} cm`, 1: `${H} cm` }, { lubang: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], extra: T => { const a = T([x + w / 2, y + h]); return svgT(a[0], a[1] + 16, `${w} × ${h}`, 'text-anchor="middle" class="lbl"'); } }), satuan: "cm²", bahas: `${W * H} − ${w * h} = ${W * H - w * h} cm².` }); },
    () => { let p = acak(8, 20), l = acak(5, 14); if ((p * l) % 2) p++; const x = acak(1, p - 1), luar = ya();
      return isian(`Di dalam ${namaPP(p, l)} ${p} cm × ${l} cm digambar segitiga. Alas segitiga adalah sisi bawah ${namaPP(p, l)}, dan puncaknya terletak pada sisi atas. Luas daerah yang diarsir adalah … cm².`, p * l / 2,
        { gambar: svgPoligon([[0, 0], [p, 0], [p, l], [0, l]], { 0: `${p} cm`, 1: `${l} cm` }, { label: "persegi panjang dan segitiga", extra: T => { const Q = [[0, 0], [p, 0], [p, l], [0, l]].map(T), S = [[x, 0], [p, l], [0, l]].map(T), pt = q => q.map(v => v.join(",")).join(" ");
          return luar ? `<polygon points="${pt(Q)}" class="arsir"/><polygon points="${pt(S)}" class="bangun"/>` : `<polygon points="${pt(S)}" class="arsir"/>`; } }),
          satuan: "cm²", petunjuk: "Tinggi segitiga = lebar persegi panjang. Luas segitiga = setengah luas persegi panjang.", bahas: `Luas segitiga ${p} × ${l} : 2 = ${p * l / 2} cm².${luar ? ` Daerah arsir = ${p * l} − ${p * l / 2} = ${p * l / 2} cm².` : ""}` }); },
    () => { const s = acak(2, 9), kel = ya();
      return isian(`Bangun berbentuk tanda tambah (+) di bawah tersusun dari 5 persegi yang sama besar dengan sisi ${s} cm. ${kel ? "Keliling" : "Luas"} bangun itu adalah … ${kel ? "cm" : "cm²"}.`, kel ? 12 * s : 5 * s * s,
        { gambar: svgPoligon(plusP(s), { 0: `${s} cm` }, { label: "bangun tanda tambah", extra: T => garis(T([s, s]), T([2 * s, s])) + garis(T([2 * s, s]), T([2 * s, 2 * s])) + garis(T([2 * s, 2 * s]), T([s, 2 * s])) + garis(T([s, 2 * s]), T([s, s])) }),
          satuan: kel ? "cm" : "cm²", petunjuk: kel ? "Hitung banyak sisi persegi kecil di bagian luar bangun." : "Luas satu persegi dikali banyak persegi.", bahas: kel ? `Bagian luar terdiri atas 12 sisi persegi. 12 × ${s} = ${12 * s} cm.` : `5 × ${s} × ${s} = ${5 * s * s} cm².` }); },
    ...U3T[7],
  ],
  8: [
    () => { const p = acak(10, 20), l = acak(6, 12), a = acak(3, l - 2); let t = acak(4, 8); if (((a + l) * t) % 2) t++; const x = nama();
      return isian(`Taman milik Pak ${x} terdiri atas bagian persegi panjang dan bagian trapesium seperti gambar. Luas taman seluruhnya adalah … m².`, p * l + (a + l) * t / 2,
        { gambar: svgPoligon([[0, 0], [p, 0], [p + t, (l - a) / 2], [p + t, (l + a) / 2], [p, l], [0, l]], { 0: `${p} m`, 2: `${a} m`, 5: `${l} m` }, { extra: T => { const q1 = T([p, 0]), q2 = T([p, l]), m1 = T([p, l / 2]), m2 = T([p + t, l / 2]); return `<line x1="${q1[0]}" y1="${q1[1]}" x2="${q2[0]}" y2="${q2[1]}" class="bantu"/><line x1="${m1[0]}" y1="${m1[1]}" x2="${m2[0]}" y2="${m2[1]}" class="bantu"/>` + svgT((m1[0] + m2[0]) / 2, m1[1] - 6, `${t} m`, 'text-anchor="middle" class="lbl"'); } }),
          satuan: "m²", petunjuk: "Trapesiumnya miring: sisi sejajarnya tegak (lebar taman dan sisi ujung).", bahas: `Persegi panjang ${p} × ${l} = ${p * l}. Trapesium (${l} + ${a}) × ${t} : 2 = ${(a + l) * t / 2}. Total ${p * l + (a + l) * t / 2} m².` }); },
  ],
  9: [
    () => { const W = acak(10, 18), H = acak(8, 14), w = acak(2, W - 6), h = acak(2, H - 3), x = acak(2, W - w - 2); const P = [[0, 0], [x, 0], [x, h], [x + w, h], [x + w, 0], [W, 0], [W, H], [0, H]];
      const tanya = ya(); return isian(`${tanya ? "Keliling" : "Luas"} bangun berbentuk huruf U di bawah adalah … ${tanya ? "cm" : "cm²"}.`, tanya ? 2 * (W + H) + 2 * h : W * H - w * h,
        { gambar: svgPoligon(P, { 2: `${w} cm`, 3: `${h} cm`, 6: `${W} cm`, 7: `${H} cm` }), satuan: tanya ? "cm" : "cm²", petunjuk: tanya ? "Kelilingnya = persegi panjang besar + dua sisi tegak takik." : "Persegi panjang besar dikurangi takik.", bahas: tanya ? `2 × (${W} + ${H}) + 2 × ${h} = ${2 * (W + H) + 2 * h} cm.` : `${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); },
    () => { const p = acak(12, 30), l = acak(8, p - 2), w = acak(1, 3), a = acak(2, p - w - 2), b = acak(2, l - w - 2), jalan = w * p + w * l - w * w, tanya = ya();
      return isian(`Sebuah kebun berbentuk persegi panjang berukuran ${p} m × ${l} m. Di dalamnya dibuat dua jalan selebar ${w} m yang bersilangan: satu sejajar panjang kebun dan satu sejajar lebar kebun. ${tanya ? "Luas jalan seluruhnya" : "Luas kebun yang tidak tertutup jalan"} adalah … m².`, tanya ? jalan : p * l - jalan,
        { gambar: svgPoligon([[0, 0], [p, 0], [p, l], [0, l]], { 0: `${p} m`, 1: `${l} m` }, { label: "kebun dengan jalan bersilangan", extra: T => { const k = (x1, y1, x2, y2) => { const q = T([x1, y1]), r = T([x2, y2]); return `<rect x="${q[0]}" y="${q[1]}" width="${(r[0] - q[0]).toFixed(1)}" height="${(r[1] - q[1]).toFixed(1)}" class="arsir"/>`; };
          return k(0, b, p, b + w) + k(a, 0, a + w, l); } }),
          satuan: "m²", petunjuk: "Bagian persimpangan jalan jangan dihitung dua kali!", bahas: `Jalan = ${w} × ${p} + ${w} × ${l} − ${w} × ${w} = ${jalan} m².${tanya ? "" : ` Kebun ${p * l} − ${jalan} = ${p * l - jalan} m².`}` }); },
    () => { const r = pilih([7, 14, 21]), h = acak(2, 6) * 7, Ls = 11 * r * r / 7;
      return isian(`Sebuah jendela berbentuk persegi panjang dengan setengah lingkaran di atasnya. Lebar jendela ${2 * r} cm dan tinggi bagian persegi panjangnya ${h} cm. Luas jendela itu adalah … cm². (Gunakan π = ${pc(22, 7)})`, 2 * r * h + Ls,
        { gambar: svgPoligon(jendelaP(r, h), { 0: `${h} cm`, 18: `${2 * r} cm` }, { label: "jendela", extra: T => garis(T([0, r]), T([2 * r, r])) }), satuan: "cm²", petunjuk: `Jari-jari setengah lingkaran = ${r} cm. Luas setengah lingkaran = ½ × π × r × r.`,
          bahas: `Persegi panjang ${2 * r} × ${h} = ${2 * r * h}. Setengah lingkaran ½ × ${pc(22, 7)} × ${r} × ${r} = ${Ls}. Total ${2 * r * h + Ls} cm².` }); },
    ...U3T[9],
  ],
  10: [
    () => { const a = acak(6, 12), b = acak(5, 10), ox = acak(2, a - 2), oy = acak(2, b - 2), ow = a - ox, oh = b - oy, c = ow + acak(2, 6), d = oh + acak(2, 5); const L = a * b + c * d - ow * oh;
      return isian(`Dua lembar kertas, ${namaPP(a, b)} ${a} cm × ${b} cm dan ${namaPP(c, d)} ${c} cm × ${d} cm, ditumpuk sehingga bagian yang bertumpuk berbentuk ${namaPP(ow, oh)} ${ow} cm × ${oh} cm. Luas permukaan meja yang tertutup kertas adalah … cm².`, L,
        { gambar: svgPoligon([[0, 0], [a, 0], [a, oy], [ox + c, oy], [ox + c, oy + d], [ox, oy + d], [ox, b], [0, b]], {}, { label: "dua persegi panjang bertumpuk", extra: T => { const p = T([ox, oy]), q = T([a, b]); return `<rect x="${p[0]}" y="${p[1]}" width="${q[0] - p[0]}" height="${q[1] - p[1]}" class="tumpuk"/>`; } }),
          satuan: "cm²", petunjuk: "Jumlahkan kedua luas, lalu kurangi bagian yang dihitung dua kali.", bahas: `${a * b} + ${c * d} − ${ow * oh} = ${L} cm².` }); },
    () => { const s = acak(4, 10) * 2; return isian(`Sebuah persegi bersisi ${s} cm. Titik-titik tengah keempat sisinya dihubungkan sehingga terbentuk persegi baru di dalamnya. Luas persegi baru itu adalah … cm².`, s * s / 2,
        { gambar: svgPoligon([[0, 0], [s, 0], [s, s], [0, s]], { 0: `${s} cm` }, { extra: T => { const q = [[s / 2, 0], [s, s / 2], [s / 2, s], [0, s / 2]].map(T); return `<polygon points="${q.map(x => x.join(",")).join(" ")}" class="arsir"/>`; } }),
          satuan: "cm²", petunjuk: "Ada 4 segitiga di pojok yang dibuang. Atau: persegi dalam = setengah persegi besar.", bahas: `Luas = ${s} × ${s} : 2 = ${s * s / 2} cm².` }); },
    () => { const r = pilih([7, 14, 21, 28]), h = acak(3, 10) * 5, K = 2 * h + 2 * r + 22 * r / 7, x = nama();
      return isian(`Jendela rumah ${x} berbentuk persegi panjang dengan setengah lingkaran di atasnya. Lebar jendela ${2 * r} cm dan tinggi bagian persegi panjangnya ${h} cm. Di sekeliling tepi luar jendela akan dipasang lis kayu. Panjang lis kayu yang diperlukan adalah … cm. (Gunakan π = ${pc(22, 7)})`, K,
        { gambar: svgPoligon(jendelaP(r, h), { 0: `${h} cm`, 18: `${2 * r} cm` }, { label: "jendela", extra: T => garis(T([0, r]), T([2 * r, r])) }), satuan: "cm", petunjuk: "Garis putus-putus tidak ikut dihitung. Keliling setengah lingkaran = ½ × π × d.",
          bahas: `Dua sisi tegak 2 × ${h} = ${2 * h}. Sisi bawah ${2 * r}. Setengah lingkaran ½ × ${pc(22, 7)} × ${2 * r} = ${22 * r / 7}. Total ${2 * h} + ${2 * r} + ${22 * r / 7} = ${K} cm.` }); },
    () => { const n = acak(3, 6), a = acak(2, 6), b = acak(2, 5), W = n * a, H = n * b, L = a * b * n * (n + 1) / 2;
      return isian(`Bangun tangga di bawah terdiri atas ${n} anak tangga yang sama lebar dan sama tinggi. Luas bangun itu adalah … cm².`, L,
        { gambar: svgPoligon(tanggaP(n, a, b), { [2 * n]: `${W} cm`, [2 * n + 1]: `${H} cm` }, { label: "bangun tangga" }), satuan: "cm²", petunjuk: `Satu anak tangga lebarnya ${W} : ${n} dan tingginya ${H} : ${n}. Hitung banyak kotak kecil di setiap lapis.`,
          bahas: `Satu kotak ${a} cm × ${b} cm = ${a * b} cm². Banyak kotak 1 + 2 + … + ${n} = ${n * (n + 1) / 2}. Luas ${n * (n + 1) / 2} × ${a * b} = ${L} cm².` }); },
  ],
});

/* ================= Misi 4: Volume ================= */
function svgBalok(p, l, t, lbl = true, grid = false) {
  const u = Math.min(22, 150 / Math.max(p + l, t * 1.6)), c = Math.cos(Math.PI / 6) * u, sn = Math.sin(Math.PI / 6) * u;
  const P = (x, y, z) => [(x - y) * c, (x + y) * sn - z * u];
  const pts = [P(0, 0, 0), P(p, 0, 0), P(p, l, 0), P(0, l, 0), P(0, 0, t), P(p, 0, t), P(p, l, t), P(0, l, t)];
  const xs = pts.map(q => q[0]), ys = pts.map(q => q[1]), mx = Math.min(...xs) - 50, my = Math.min(...ys) - 22, W = Math.max(...xs) - mx + 50, H = Math.max(...ys) - my + 30;
  const f = q => `${(q[0] - mx).toFixed(1)},${(q[1] - my).toFixed(1)}`, poly = (a, k) => `<polygon points="${a.map(i => f(pts[i])).join(" ")}" class="${k}"/>`;
  let s = svgBuka(Math.round(W), Math.round(H), "balok");
  s += poly([4, 5, 6, 7], "atas") + poly([1, 2, 6, 5], "kanan") + poly([2, 3, 7, 6], "depan");
  if (grid) { const L = (a, b) => `<line x1="${(a[0] - mx).toFixed(1)}" y1="${(a[1] - my).toFixed(1)}" x2="${(b[0] - mx).toFixed(1)}" y2="${(b[1] - my).toFixed(1)}" class="garis-kubus"/>`;
    for (let i = 1; i < p; i++) s += L(P(i, l, 0), P(i, l, t)) + L(P(i, 0, t), P(i, l, t));
    for (let j = 1; j < l; j++) s += L(P(p, j, 0), P(p, j, t)) + L(P(0, j, t), P(p, j, t));
    for (let k = 1; k < t; k++) s += L(P(0, l, k), P(p, l, k)) + L(P(p, 0, k), P(p, l, k)); }
  if (lbl) { const tx = (q, d, txt) => svgT((q[0] - mx + d[0]).toFixed(1), (q[1] - my + d[1]).toFixed(1), txt, 'text-anchor="middle" class="lbl"');
    const mid = (a, b) => [(pts[a][0] + pts[b][0]) / 2, (pts[a][1] + pts[b][1]) / 2];
    s += tx(mid(3, 2), [-10, 18], lbl[0]) + tx(mid(1, 2), [16, 18], lbl[1]) + tx(mid(2, 6), [-30, 4], lbl[2]); }
  return s + "</svg>";
}
/* Cetakan tambahan Misi 4 (volume) per level */
const U4T = {
  1: [
    () => { const n = acak(2, 4); return isian(`Kubus di bawah tersusun dari kubus-kubus kecil yang sama besar. Banyak kubus kecilnya adalah …`, n ** 3, { gambar: svgBalok(n, n, n, false, true), satuan: "kubus", petunjuk: "Hitung kubus pada satu lapis, lalu kalikan dengan banyak lapisan.", bahas: `Satu lapis ${n} × ${n} = ${n * n} kubus. Ada ${n} lapis: ${n * n} × ${n} = ${n ** 3} kubus.` }); },
    () => { const a = acak(4, 20), b = acak(2, 6); return isian(`Sebuah tumpukan kubus satuan berbentuk balok. Satu lapis berisi ${a} kubus dan ada ${b} lapis. Banyak kubus satuan seluruhnya adalah …`, a * b, { satuan: "kubus", petunjuk: "Banyak kubus satu lapis × banyak lapisan.", bahas: `${a} × ${b} = ${a * b} kubus.` }); },
    () => { const p = acak(2, 5), l = acak(2, 4), t = acak(1, 3); return isian(`Setiap kubus kecil pada balok di bawah volumenya 1 cm³. Volume balok itu adalah … cm³.`, p * l * t, { gambar: svgBalok(p, l, t, false, true), satuan: "cm³", petunjuk: "Hitung banyak kubus kecilnya.", bahas: `${p} × ${l} × ${t} = ${p * l * t} kubus kecil, jadi volumenya ${p * l * t} cm³.` }); },
    () => { const x = nama(), p = acak(2, 6), l = acak(2, 4), t = acak(2, 4); return isian(`${x} menyusun dadu menjadi sebuah balok. Panjangnya ${p} dadu, lebarnya ${l} dadu, dan tingginya ${t} dadu. Banyak dadu yang dipakai ${x} adalah …`, p * l * t, { satuan: "dadu", petunjuk: "Panjang × lebar × tinggi.", bahas: `${p} × ${l} × ${t} = ${p * l * t} dadu.` }); },
    () => { const s = acak(2, 6); return isian(`Sebuah kubus memiliki panjang rusuk ${s} cm. Volume kubus itu adalah … cm³.`, s ** 3, { satuan: "cm³", petunjuk: "Volume kubus = rusuk × rusuk × rusuk.", bahas: `${s} × ${s} × ${s} = ${s ** 3} cm³.` }); },
    () => { const p = acak(2, 5), l = acak(2, 4), t = acak(2, 3); return isian(`Balok di bawah tersusun dari kubus satuan. Banyak kubus pada <b>lapisan paling atas</b> adalah …`, p * l, { gambar: svgBalok(p, l, t, false, true), satuan: "kubus", petunjuk: "Lihat bagian atas balok saja: berapa baris dan berapa kubus tiap baris?", bahas: `Lapisan atas ${p} × ${l} = ${p * l} kubus.` }); },
  ],
  2: [
    () => { const s = acak(2, 12); return isian(`Sebuah kardus berbentuk kubus dengan panjang rusuk ${s} dm. Volume kardus itu adalah … dm³.`, s ** 3, { satuan: "dm³", petunjuk: "Volume kubus = rusuk × rusuk × rusuk.", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)} dm³.` }); },
    () => { const p = acak(3, 6), l = acak(2, 4), t = acak(2, 4), V = p * l * t, k = acak(Math.ceil(V / 4), V - 2); return isian(`${nama()} ingin menyusun kubus satuan menjadi balok yang panjangnya ${p} kubus, lebarnya ${l} kubus, dan tingginya ${t} kubus. Ia sudah menyusun ${k} kubus. Banyak kubus yang masih diperlukan adalah …`, V - k,
      { satuan: "kubus", petunjuk: "Hitung semua kubus yang diperlukan, lalu kurangi yang sudah tersusun.", bahas: `Diperlukan ${p} × ${l} × ${t} = ${V} kubus. ${V} − ${k} = ${V - k} kubus.` }); },
    () => { const A = acak(4, 30), t = acak(2, 10); return isian(`Luas alas sebuah balok ${A} cm² dan tingginya ${t} cm. Volume balok itu adalah … cm³.`, A * t, { satuan: "cm³", petunjuk: "Volume balok = luas alas × tinggi.", bahas: `${A} × ${t} = ${A * t} cm³.` }); },
  ],
  3: [
    () => { const x = nama(), p = acak(15, 25), l = acak(5, 10), t = acak(3, 6), b = pilih(["Kotak pensil", "Kotak bekal", "Kotak mainan", "Kotak perhiasan"]); return isian(`${b} milik ${x} berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Volume ${b.toLowerCase()} itu adalah … cm³.`, p * l * t, { satuan: "cm³", petunjuk: "Volume balok = panjang × lebar × tinggi.", bahas: `${p} × ${l} × ${t} = ${fmt(p * l * t)} cm³.` }); },
    () => { const s = acak(5, 20), b = pilih(["Sebuah dadu raksasa", "Sebuah kotak kado", "Sebuah pot bunga", "Sebuah tempat sampah"]); return isian(`${b} berbentuk kubus dengan panjang rusuk ${s} cm. Volumenya adalah … cm³.`, s ** 3, { satuan: "cm³", petunjuk: "Volume kubus = rusuk × rusuk × rusuk.", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)} cm³.` }); },
    () => { const p = acak(2, 9), l = acak(2, 6), t = acak(2, 8); return isian(`Sebuah wadah berbentuk balok berukuran ${p} dm × ${l} dm × ${t} dm. Wadah itu dapat menampung air paling banyak … liter.`, p * l * t, { satuan: "liter", petunjuk: "1 dm³ = 1 liter.", bahas: `${p} × ${l} × ${t} = ${p * l * t} dm³ = ${p * l * t} liter.` }); },
    () => { const s = acak(2, 10), n = acak(2, 4); return isian(`Ada ${n} buah kubus yang masing-masing panjang rusuknya ${s} cm. Jumlah volume semua kubus itu adalah … cm³.`, n * s ** 3, { satuan: "cm³", petunjuk: "Hitung volume satu kubus, lalu kalikan banyaknya.", bahas: `Satu kubus ${s} × ${s} × ${s} = ${fmt(s ** 3)} cm³. ${n} × ${fmt(s ** 3)} = ${fmt(n * s ** 3)} cm³.` }); },
    () => { const p = acak(3, 9), l = acak(2, 6), t = acak(2, 5); return isian(`Volume balok di bawah adalah … m³.`, p * l * t, { gambar: svgBalok(p, l, t, [`${p} m`, `${l} m`, `${t} m`]), satuan: "m³", petunjuk: "Volume balok = panjang × lebar × tinggi.", bahas: `${p} × ${l} × ${t} = ${p * l * t} m³.` }); },
  ],
  4: [
    () => { const p = acak(5, 20), l = acak(3, 12), t = acak(2, 12); return isian(`Volume sebuah balok ${fmt(p * l * t)} cm³. Lebarnya ${l} cm dan tingginya ${t} cm. Panjang balok itu adalah … cm.`, p, { satuan: "cm", petunjuk: "Panjang = volume : (lebar × tinggi).", bahas: `${l} × ${t} = ${l * t}. ${fmt(p * l * t)} : ${l * t} = ${p} cm.` }); },
    () => { const s = acak(2, 10); return isian(`Sebuah bak berbentuk kubus tepat dapat menampung ${fmt(s ** 3)} liter air. Panjang rusuk bak itu adalah … dm.`, s, { satuan: "dm", petunjuk: "1 liter = 1 dm³. Bilangan berapa dikali dirinya tiga kali?", bahas: `${fmt(s ** 3)} liter = ${fmt(s ** 3)} dm³ = ${s} × ${s} × ${s}. Rusuknya ${s} dm.` }); },
    () => { const p = acak(5, 20), l = acak(3, 12); let t = acak(2, 12); if ((p * l * t) % 2) t++; const b = pilih(["pasir", "beras", "air", "tanah"]); return isian(`Sebuah kotak berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm diisi ${b} sampai setengahnya. Volume ${b} di dalam kotak adalah … cm³.`, p * l * t / 2, { satuan: "cm³", petunjuk: "Hitung volume kotak, lalu bagi 2.", bahas: `${p} × ${l} × ${t} = ${fmt(p * l * t)} cm³. Setengahnya ${fmt(p * l * t / 2)} cm³.` }); },
    () => { const A = acak(6, 40), t = acak(2, 15); return isian(`Volume sebuah balok ${fmt(A * t)} cm³ dan tingginya ${t} cm. Luas alas balok itu adalah … cm².`, A, { satuan: "cm²", petunjuk: "Volume = luas alas × tinggi.", bahas: `${fmt(A * t)} : ${t} = ${A} cm².` }); },
  ],
  5: [
    () => { const a = pilih([1, 2, 3, 4, 5, 6, 8, 0.5, 1.5, 2.5, 1.2, 0.8, 0.25]); return isian(`${fmt(a)} m³ = … liter`, a * 1000, { satuan: "liter", petunjuk: "1 m³ = 1.000 dm³ = 1.000 liter.", bahas: `${fmt(a)} × 1.000 = ${fmt(a * 1000)} liter.` }); },
    () => { const p = acak(2, 8), l = acak(2, 6), t = acak(2, 5); return isian(`Sebuah kotak berukuran ${2 * p} cm × ${2 * l} cm × ${2 * t} cm akan diisi penuh dengan kubus kecil yang panjang rusuknya 2 cm. Banyak kubus kecil yang muat adalah …`, p * l * t,
      { satuan: "kubus", petunjuk: "Berapa kubus kecil sepanjang panjang, lebar, dan tinggi kotak?", bahas: `${2 * p} : 2 = ${p}, ${2 * l} : 2 = ${l}, ${2 * t} : 2 = ${t}. Banyak kubus ${p} × ${l} × ${t} = ${p * l * t}.` }); },
    () => { const b = pilih([250, 500, 1000]), p = pilih([10, 20, 25, 30, 40]), l = pilih([10, 20, 25]), t = pilih([10, 20, 30, 40]), V = p * l * t;
      if (V % b) return isian(`Wadah berukuran 20 cm × 10 cm × 10 cm penuh berisi minyak. Minyak itu dituang ke botol-botol 500 mL. Banyak botol yang terisi penuh adalah …`, 4, { satuan: "botol", bahas: "2.000 cm³ = 2.000 mL. 2.000 : 500 = 4 botol." });
      return isian(`Sebuah wadah berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm penuh berisi minyak goreng. Minyak itu dituang ke dalam botol-botol berukuran ${fmt(b)} mL. Banyak botol yang terisi penuh adalah …`, V / b,
        { satuan: "botol", petunjuk: "1 cm³ = 1 mL.", bahas: `Volume ${fmt(V)} cm³ = ${fmt(V)} mL. ${fmt(V)} : ${fmt(b)} = ${V / b} botol.` }); },
    () => { const s = acak(2, 12); return isian(`Keliling salah satu sisi sebuah kubus ${4 * s} cm. Volume kubus itu adalah … cm³.`, s ** 3, { satuan: "cm³", petunjuk: "Sisi kubus berbentuk persegi. Rusuk = keliling sisi : 4.", bahas: `Rusuk ${4 * s} : 4 = ${s} cm. Volume ${s} × ${s} × ${s} = ${fmt(s ** 3)} cm³.` }); },
    () => { const p = pilih([20, 30, 40, 50, 60]), l = pilih([20, 25, 30, 40]), h = acak(1, 6) * 10; return isian(`Sebuah akuarium memiliki alas ${p} cm × ${l} cm. Akuarium itu berisi air setinggi ${h} cm. Volume air di dalamnya adalah … liter.`, p * l * h / 1000,
      { satuan: "liter", petunjuk: "Volume air = luas alas × tinggi air. 1 liter = 1.000 cm³.", bahas: `${p} × ${l} × ${h} = ${fmt(p * l * h)} cm³ = ${fmt(p * l * h / 1000)} liter.` }); },
  ],
  7: [
    () => { const p = pilih([50, 60, 80, 100]), l = pilih([40, 50, 60]), t = pilih([40, 50, 60]), V = p * l * t / 1000, dv = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20].filter(d => V % d === 0 && V / d >= 5 && V / d <= 60), m = dv.length ? V / pilih(dv) : V / 10;
      return isian(`Sebuah bak berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm terisi penuh air dalam waktu ${fmt(m)} menit. Debit air yang mengisi bak itu adalah … liter/menit.`, V / m,
        { satuan: "liter/menit", petunjuk: "Ubah volume ke liter, lalu debit = volume : waktu.", bahas: `Volume ${fmt(p * l * t)} cm³ = ${fmt(V)} liter. ${fmt(V)} : ${fmt(m)} = ${fmt(V / m)} liter/menit.` }); },
    () => { const p = acak(5, 25), l = acak(3, 12), d = pilih([1, 2, 1.5, 0.5]), x = nama(); return isian(`Kolam renang di dekat rumah ${x} berbentuk balok dengan panjang ${p} m, lebar ${l} m, dan kedalaman ${fmt(d)} m. Volume air saat kolam terisi penuh adalah … m³.`, p * l * d,
      { satuan: "m³", petunjuk: "Volume = panjang × lebar × kedalaman.", bahas: `${p} × ${l} × ${fmt(d)} = ${fmt(p * l * d)} m³.` }); },
    () => { const s = acak(4, 12), p = acak(4, 15), l = acak(3, 10), t = acak(3, 10), A = s ** 3, B = p * l * t; if (A === B) return isian(`Bak A berbentuk kubus dengan rusuk 5 dm. Bak B berbentuk balok 6 dm × 4 dm × 5 dm. Selisih isi kedua bak adalah … liter.`, 5, { satuan: "liter", bahas: "125 − 120 = 5 liter." });
      return isian(`Bak A berbentuk kubus dengan rusuk ${s} dm. Bak B berbentuk balok berukuran ${p} dm × ${l} dm × ${t} dm. Selisih isi kedua bak jika keduanya penuh adalah … liter.`, Math.abs(A - B),
        { satuan: "liter", petunjuk: "1 dm³ = 1 liter. Hitung isi masing-masing bak.", bahas: `Bak A ${fmt(A)} liter, bak B ${fmt(B)} liter. Selisih ${fmt(Math.abs(A - B))} liter.` }); },
  ],
};
daftarMisi("ukr", "u4", "Volume kubus & balok", "🧊", {
  1: [() => { const p = acak(2, 5), l = acak(2, 4), t = acak(1, 3); return isian(`Balok di bawah tersusun dari kubus satuan. Banyak kubus satuannya adalah …`, p * l * t, { gambar: svgBalok(p, l, t, false, true), satuan: "kubus", petunjuk: "Hitung kubus satu lapis, lalu kalikan banyak lapisan.", bahas: `${p} × ${l} × ${t} = ${p * l * t} kubus.` }); }, ...U4T[1]],
  2: [
    () => { const s = acak(2, 20), sat = pilih(["cm", "cm", "dm", "m"]); return isian(`Volume kubus di bawah adalah … ${sat}³.`, s ** 3, { gambar: svgBalok(3, 3, 3, [`${s} ${sat}`, `${s} ${sat}`, `${s} ${sat}`]), satuan: `${sat}³`, petunjuk: "Volume kubus = sisi × sisi × sisi.", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)} ${sat}³.` }); },
    () => { const p = acak(2, 6), l = acak(2, 5), t = acak(2, 4); return isian(`Balok di bawah tersusun dari kubus satuan. Banyak kubus satuannya adalah …`, p * l * t, { gambar: svgBalok(p, l, t, false, true), satuan: "kubus", bahas: `${p} × ${l} × ${t} = ${p * l * t} kubus.` }); },
    ...U4T[2],
  ],
  3: [() => { const p = acak(4, 20), l = acak(2, 12), t = acak(2, 12); return isian(`Volume balok di bawah adalah … cm³.`, p * l * t, { gambar: svgBalok(p, l, t, [`${p} cm`, `${l} cm`, `${t} cm`]), satuan: "cm³", petunjuk: "Volume balok = panjang × lebar × tinggi.", bahas: `${p} × ${l} × ${t} = ${fmt(p * l * t)} cm³.` }); }, ...U4T[3]],
  4: [
    () => { const s = acak(2, 12); return isian(`Volume sebuah kubus ${fmt(s ** 3)} cm³. Panjang rusuknya adalah … cm.`, s, { satuan: "cm", petunjuk: "Bilangan berapa dikali dirinya tiga kali?", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)}.` }); },
    () => { const p = acak(5, 20), l = acak(3, 12), t = acak(2, 15); return isian(`Volume balok ${fmt(p * l * t)} cm³, panjangnya ${p} cm, dan lebarnya ${l} cm. Tingginya adalah … cm.`, t, { satuan: "cm", bahas: `${fmt(p * l * t)} : (${p} × ${l}) = ${t} cm.` }); },
    ...U4T[4],
  ],
  5: [
    () => { const p = pilih([20, 25, 30, 40, 50]), l = pilih([10, 20, 25, 30]), t = pilih([10, 20, 30, 40]); return isian(`Sebuah wadah berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Volume wadah itu adalah … liter.`, p * l * t / 1000, { satuan: "liter", petunjuk: "1 liter = 1.000 cm³.", bahas: `${fmt(p * l * t)} cm³ = ${fmt(p * l * t / 1000)} liter.` }); },
    () => { const s = pilih([10, 20, 30, 40, 50]); return isian(`Sebuah bak berbentuk kubus dengan rusuk ${s} cm. Volume bak itu adalah … liter.`, s ** 3 / 1000, { satuan: "liter", bahas: `${fmt(s ** 3)} cm³ = ${fmt(s ** 3 / 1000)} liter.` }); },
    ...U4T[5],
  ],
  6: [() => { const p = pilih([40, 50, 60, 80]), l = pilih([20, 25, 30, 40]), t = pilih([30, 40, 50, 60]), [a, b] = pilih([[1, 2], [3, 4], [2, 3], [1, 4], [2, 5], [3, 5]]); const v = p * l * t * a / b / 1000;
      if (!Number.isInteger(v * 10)) return isian(`Akuarium 50 cm × 30 cm × 40 cm diisi air setengahnya. Volume air … liter.`, 30, { satuan: "liter", bahas: "60.000 : 2 = 30.000 cm³ = 30 liter." });
      return isian(`Akuarium berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm diisi air ${pc(a, b)} bagian. Volume air di dalamnya adalah … liter.`, v, { satuan: "liter", gambar: svgBalok(p / 10, l / 10, t / 10, [`${p} cm`, `${l} cm`, `${t} cm`]), bahas: `${pc(a, b)} × ${fmt(p * l * t)} = ${fmt(v * 1000)} cm³ = ${fmt(v)} liter.` }); },
    () => { const s = acak(2, 15); return isian(`Luas satu sisi sebuah kubus ${s * s} cm². Volume kubus itu adalah …`, s ** 3,
      { satuan: "cm³", petunjuk: "Sisi kubus berbentuk persegi. Cari panjang rusuknya dulu.", bahas: `${s} × ${s} = ${s * s}, jadi rusuknya ${s} cm. Volume ${s} × ${s} × ${s} = ${fmt(s ** 3)} cm³.` }); },
    () => { const p = acak(6, 20), l = acak(3, 12), t = acak(3, 12), s = acak(4, 14), A = p * l * t, B = s ** 3; if (A === B) return isian(`Kotak A berukuran 8 cm × 4 cm × 3 cm dan kotak B berbentuk kubus dengan rusuk 5 cm. Selisih volume kedua kotak adalah … cm³.`, 29, { satuan: "cm³", bahas: "125 − 96 = 29 cm³." });
      return isian(`Kotak A berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Kotak B berbentuk kubus dengan rusuk ${s} cm. Selisih volume kedua kotak adalah … cm³.`, Math.abs(A - B),
        { satuan: "cm³", petunjuk: "Hitung volume masing-masing, lalu kurangkan yang besar dengan yang kecil.", bahas: `Volume A = ${fmt(A)} cm³, volume B = ${fmt(B)} cm³. Selisih ${fmt(Math.abs(A - B))} cm³.` }); },
  ],
  7: [() => { const p = pilih([60, 70, 80, 100]), l = pilih([50, 60, 70]), t = pilih([50, 60, 70, 80]), e = pilih([5, 8, 10, 12]); const V = p * l * t / 1000;
      return isian(`Bak mandi berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm akan diisi penuh dengan ember berisi ${e} liter. Paling sedikit diperlukan … kali mengisi ember.`, Math.ceil(V / e), { satuan: "kali", petunjuk: "Ubah volume bak ke liter, lalu bagi. Bulatkan ke atas!", bahas: `Volume ${fmt(V)} liter. ${fmt(V)} : ${e} = ${fmt(bulat(V / e, 2))} → ${Math.ceil(V / e)} kali.` }); },
    () => { const p = pilih([50, 60, 80, 100, 120]), l = pilih([40, 50, 60]), t = pilih([40, 50, 60, 80]), V = p * l * t / 1000, cocok = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].filter(d => V % d === 0 && V / d >= 6 && V / d <= 120), d = cocok.length ? pilih(cocok) : 10, m = V / d;
      return isian(`Sebuah bak berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm mula-mula kosong. Bak itu diisi air dari keran yang mengalirkan ${d} liter air setiap menit. Waktu yang diperlukan sampai bak penuh adalah … menit.`, m,
        { satuan: "menit", gambar: svgBalok(p / 10, l / 10, t / 10, [`${p} cm`, `${l} cm`, `${t} cm`]), petunjuk: "Ubah volume bak ke liter (1 liter = 1.000 cm³), lalu bagi dengan debit.", bahas: `Volume ${fmt(p * l * t)} cm³ = ${fmt(V)} liter. ${fmt(V)} : ${d} = ${fmt(m)} menit.` }); },
    () => { const p = pilih([30, 40, 50, 60, 80]), l = pilih([20, 25, 30, 40]), h = acak(1, 8) * 5, V = p * l * h / 1000;
      return isian(`Sebuah akuarium berbentuk balok memiliki alas berukuran ${p} cm × ${l} cm. Ke dalam akuarium kosong itu dituangkan ${fmt(V)} liter air. Tinggi air di dalam akuarium adalah … cm.`, h,
        { satuan: "cm", petunjuk: "Ubah liter ke cm³, lalu bagi dengan luas alas.", bahas: `${fmt(V)} liter = ${fmt(V * 1000)} cm³. Luas alas ${p} × ${l} = ${fmt(p * l)} cm². Tinggi ${fmt(V * 1000)} : ${fmt(p * l)} = ${h} cm.` }); },
    ...U4T[7],
  ],
  8: [() => { const p = acak(2, 6), l = acak(2, 5), t = acak(2, 5), a = pilih([5, 6, 8, 10]), b = pilih([4, 5, 6]), c = pilih([3, 4, 5]);
      return isian(`Kardus besar berukuran ${p * a} cm × ${l * b} cm × ${t * c} cm akan diisi kotak sabun berukuran ${a} cm × ${b} cm × ${c} cm (posisinya sama). Kotak sabun yang dapat dimasukkan paling banyak adalah …`, p * l * t,
        { satuan: "kotak", petunjuk: "Berapa kotak muat memanjang, melebar, dan meninggi?", bahas: `${p * a}:${a} = ${p}, ${l * b}:${b} = ${l}, ${t * c}:${c} = ${t}. Total ${p} × ${l} × ${t} = ${p * l * t} kotak.` }); },
    () => { const k = pilih([2, 2, 3]), kub = ya(); let p, l, t; if (kub) p = l = t = acak(2, 9); else { p = acak(3, 10); l = acak(2, 8); t = acak(2, 8); } const V = p * l * t, Vb = k ** 3 * V;
      return pg(`Sebuah ${kub ? `kubus memiliki rusuk ${p} cm` : `balok berukuran ${p} cm × ${l} cm × ${t} cm`}. ${kub ? "Rusuknya" : "Panjang, lebar, dan tingginya masing-masing"} diperbesar menjadi ${k} kali semula. Volume ${kub ? "kubus" : "balok"} yang baru adalah …`, `${fmt(Vb)} cm³`,
        [`${fmt(k * V)} cm³`, `${fmt(k * k * V)} cm³`, `${fmt((k + 1) * V)} cm³`, `${fmt((p + k) * (l + k) * (t + k))} cm³`].filter(x => x !== `${fmt(Vb)} cm³`),
        { petunjuk: `Ketiga ukuran dikali ${k}, jadi volumenya dikali ${k} × ${k} × ${k}.`, bahas: `Ukuran baru ${k * p} × ${k * l} × ${k * t} = ${fmt(Vb)} cm³ (${k ** 3} kali volume semula ${fmt(V)} cm³).` }); },
    () => { const p = acak(2, 8), l = acak(1, 5), t = pilih([0.5, 0.8, 1, 1.2, 1.5]), V = bulat(p * l * t), x = nama();
      return isian(`Kolam ikan milik Pak ${x} berbentuk balok dengan panjang ${p} m dan lebar ${l} m. Kolam itu berisi air sedalam ${fmt(t)} m. Volume air di dalam kolam adalah … liter.`, V * 1000,
        { satuan: "liter", petunjuk: "1 m³ = 1.000 dm³ = 1.000 liter.", bahas: `${p} × ${l} × ${fmt(t)} = ${fmt(V)} m³ = ${fmt(V * 1000)} liter.` }); },
  ],
  9: [
    () => { const p = pilih([20, 30, 40, 50]), l = pilih([20, 25, 30]), s = pilih([5, 10]), n = acak(1, 4); const naik = n * s ** 3 / (p * l);
      if (!Number.isInteger(naik * 10)) return isian(`Akuarium alas 40 cm × 25 cm. 2 kubus besi rusuk 10 cm dimasukkan. Air naik … cm.`, 2, { satuan: "cm", bahas: "2000 : 1000 = 2 cm." });
      return isian(`Akuarium memiliki alas berukuran ${p} cm × ${l} cm dan berisi air. Ke dalamnya dimasukkan ${n} kubus besi dengan rusuk ${s} cm hingga tenggelam. Permukaan air naik setinggi … cm.`, naik, { satuan: "cm", petunjuk: "Volume air yang naik = volume kubus.", bahas: `Volume kubus ${n} × ${s ** 3} = ${fmt(n * s ** 3)} cm³. Naik = ${fmt(n * s ** 3)} : (${p} × ${l}) = ${fmt(naik)} cm.` }); },
    () => { const p = acak(6, 12), l = acak(4, 8), t = acak(3, 6), s = acak(2, Math.min(p, l)); return isian(`Sebuah bangun terdiri atas balok berukuran ${p} cm × ${l} cm × ${t} cm dan di atasnya diletakkan kubus dengan rusuk ${s} cm. Volume bangun gabungan itu adalah … cm³.`, p * l * t + s ** 3, { satuan: "cm³", bahas: `${p * l * t} + ${s ** 3} = ${p * l * t + s ** 3} cm³.` }); },
    () => { const p = pilih([50, 60, 80, 100]), l = pilih([40, 50, 60]), t = pilih([60, 70, 80]), d = acak(2, 6) * 5, V = p * l * d / 1000, x = nama();
      return isian(`Bak mandi di rumah ${x} berbentuk balok dengan alas ${p} cm × ${l} cm dan tinggi ${t} cm. Bak itu terisi penuh air. Setelah air dipakai sebanyak ${fmt(V)} liter, tinggi air di dalam bak sekarang adalah … cm.`, t - d,
        { satuan: "cm", petunjuk: "Cari dulu berapa cm air turun: volume yang dipakai (cm³) : luas alas.", bahas: `${fmt(V)} liter = ${fmt(V * 1000)} cm³. Turun ${fmt(V * 1000)} : (${p} × ${l}) = ${d} cm. Tinggi air ${t} − ${d} = ${t - d} cm.` }); },
    () => { const s = acak(2, 5), p = s + acak(3, 10), l = s + acak(3, 8), t = acak(5, 15), V = (p * l - s * s) * t;
      return isian(`Sebuah balok kayu berukuran ${p} cm × ${l} cm × ${t} cm dilubangi tembus dari atas sampai bawah. Lubangnya berbentuk balok dengan alas persegi bersisi ${s} cm. Volume kayu yang tersisa adalah … cm³.`, V,
        { satuan: "cm³", petunjuk: `Lubang juga setinggi ${t} cm. Volume sisa = volume balok − volume lubang.`, bahas: `Balok ${p} × ${l} × ${t} = ${fmt(p * l * t)}. Lubang ${s} × ${s} × ${t} = ${s * s * t}. Sisa ${fmt(V)} cm³.` }); },
  ],
  10: [
    () => { const n = acak(3, 10), v = n ** 3 - (n - 2) ** 3; return isian(`Sebuah kubus besar dicat di seluruh permukaannya, lalu dipotong menjadi ${n} × ${n} × ${n} kubus kecil. Banyak kubus kecil yang <b>paling sedikit satu sisinya</b> berwarna adalah …`, v,
      { gambar: svgBalok(n, n, n, false, true), satuan: "kubus", petunjuk: "Semua kubus dikurangi kubus bagian dalam yang tidak terkena cat.", bahas: `${n ** 3} − ${(n - 2) ** 3} = ${v}.` }); },
    () => { const s = acak(2, 6), k = acak(2, 5), b = s * k; return isian(`Kubus besar dengan rusuk ${b} cm dipotong menjadi kubus-kubus kecil dengan rusuk ${s} cm. Banyak kubus kecil yang terbentuk adalah …`, k ** 3,
      { satuan: "kubus", petunjuk: "Berapa kubus kecil sepanjang satu rusuk?", bahas: `${b} : ${s} = ${k} per rusuk. ${k} × ${k} × ${k} = ${k ** 3} kubus.` }); },
    () => { const n = acak(3, 10), sisi = pilih([3, 2, 1, 0]), v = { 3: 8, 2: 12 * (n - 2), 1: 6 * (n - 2) ** 2, 0: (n - 2) ** 3 }[sisi];
      return isian(`Sebuah kubus besar dicat merah di seluruh permukaannya. Kemudian kubus itu dipotong menjadi ${n} × ${n} × ${n} kubus kecil yang sama besar. Banyak kubus kecil yang ${sisi ? `<b>tepat ${sisi} sisinya</b> berwarna merah` : "<b>tidak berwarna merah sama sekali</b>"} adalah …`, v,
        { gambar: svgBalok(n, n, n, false, true), satuan: "kubus", petunjuk: sisi === 3 ? "Kubus di pojok punya 3 sisi berwarna." : sisi === 2 ? "Kubus 2 sisi ada di rusuk (bukan pojok). Kubus punya 12 rusuk." : sisi === 1 ? "Kubus 1 sisi ada di tengah setiap muka. Kubus punya 6 muka." : "Kubus tanpa warna ada di bagian dalam.", bahas: `Jawabannya ${v}.` }); },
    () => { const s = pilih([20, 30, 40, 60]), calon = []; [40, 50, 60, 80, 100, 120].forEach(p => [20, 25, 30, 40, 50, 60, 80].forEach(l => { const h = s ** 3 / (p * l); if (p >= l && p * l > s * s && Number.isInteger(h) && h >= 3) calon.push([p, l, h]); }));
      const [p, l, h] = calon.length ? pilih(calon) : [80, 50, 20], ss = calon.length ? s : 40, x = nama();
      return isian(`Sebuah bak berbentuk kubus dengan rusuk ${ss} cm terisi penuh air. Seluruh air itu dipindahkan ke akuarium berbentuk balok yang kosong dengan alas ${p} cm × ${l} cm (akuarium cukup tinggi). Tinggi air di dalam akuarium adalah … cm.`, h,
        { satuan: "cm", petunjuk: "Volume air tetap. Tinggi air = volume : luas alas akuarium.", bahas: `Volume air ${ss} × ${ss} × ${ss} = ${fmt(ss ** 3)} cm³. Tinggi ${fmt(ss ** 3)} : (${p} × ${l}) = ${h} cm.` }); },
    () => { if (ya()) { const s = acak(2, 15); return isian(`Jumlah panjang semua rusuk sebuah kubus ${12 * s} cm. Volume kubus itu adalah …`, s ** 3,
        { satuan: "cm³", petunjuk: "Kubus memiliki 12 rusuk yang sama panjang.", bahas: `Rusuk ${12 * s} : 12 = ${s} cm. Volume ${s} × ${s} × ${s} = ${fmt(s ** 3)} cm³.` }); }
      const p = acak(5, 15), l = acak(3, p), t = acak(2, 12), K = 4 * (p + l + t);
      return isian(`Jumlah panjang semua rusuk sebuah balok ${K} cm. Panjang balok ${p} cm dan lebarnya ${l} cm. Volume balok itu adalah … cm³.`, p * l * t,
        { satuan: "cm³", petunjuk: "Balok memiliki 4 rusuk panjang, 4 rusuk lebar, dan 4 rusuk tinggi. Jadi p + l + t = jumlah rusuk : 4.", bahas: `p + l + t = ${K} : 4 = ${K / 4}. Tinggi ${K / 4} − ${p} − ${l} = ${t} cm. Volume ${p} × ${l} × ${t} = ${fmt(p * l * t)} cm³.` }); },
  ],
});

/* ================= Misi 5: Sudut ================= */
/* Sudut d° yang seluruh gambarnya diputar rot° (supaya tidak selalu mendatar) */
function svgSudut(d, rot = 0) { const r = 80, c = 100, a = d * Math.PI / 180, ar = 24;
  const busur = d === 90 ? `<path d="M${c + 14} ${c}V${c - 14}H${c}" class="bantu-tebal" fill="none"/>` : `<path d="M${c + ar} ${c}A${ar} ${ar} 0 0 0 ${(c + ar * Math.cos(a)).toFixed(1)} ${(c - ar * Math.sin(a)).toFixed(1)}" class="bantu-tebal" fill="none"/>`;
  return `${svgBuka(200, 200, "sudut")}<g transform="rotate(${-rot} ${c} ${c})"><line x1="${c}" y1="${c}" x2="${c + r}" y2="${c}" class="kaki"/><line x1="${c}" y1="${c}" x2="${(c + r * Math.cos(a)).toFixed(1)}" y2="${(c - r * Math.sin(a)).toFixed(1)}" class="kaki"/>${busur}<circle cx="${c}" cy="${c}" r="3" class="titik"/></g></svg>`; }
function svgBusur(d, d0 = 0) { const cx = 150, cy = 140, R = 120; let s = svgBuka(300, 160, "busur derajat");
  s += `<path d="M${cx - R} ${cy}A${R} ${R} 0 0 1 ${cx + R} ${cy}Z" class="busur"/>`;
  for (let k = 0; k <= 180; k += 10) { const a = k * Math.PI / 180, x1 = cx + R * Math.cos(a), y1 = cy - R * Math.sin(a), x2 = cx + (R - (k % 30 ? 8 : 14)) * Math.cos(a), y2 = cy - (R - (k % 30 ? 8 : 14)) * Math.sin(a);
    s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="skala"/>`;
    if (k % 30 === 0) s += svgT((cx + (R - 26) * Math.cos(a)).toFixed(1), (cy - (R - 26) * Math.sin(a) + 4).toFixed(1), k, 'text-anchor="middle" class="kecil"'); }
  const a = d * Math.PI / 180, a0 = d0 * Math.PI / 180; s += `<line x1="${cx}" y1="${cy}" x2="${(cx + (R + 6) * Math.cos(a0)).toFixed(1)}" y2="${(cy - (R + 6) * Math.sin(a0)).toFixed(1)}" class="kaki"/><line x1="${cx}" y1="${cy}" x2="${(cx + (R + 6) * Math.cos(a)).toFixed(1)}" y2="${(cy - (R + 6) * Math.sin(a)).toFixed(1)}" class="kaki"/>`;
  return s + "</svg>"; }
function svgJam(h, m) { const c = 80, r = 68; let s = svgBuka(160, 160, `jam pukul ${h}.${String(m).padStart(2, "0")}`) + `<circle cx="${c}" cy="${c}" r="${r}" class="jam"/>`;
  for (let i = 1; i <= 12; i++) { const a = (i * 30 - 90) * Math.PI / 180; s += svgT((c + (r - 14) * Math.cos(a)).toFixed(1), (c + (r - 14) * Math.sin(a) + 5).toFixed(1), i, 'text-anchor="middle" class="kecil"'); }
  const ah = ((h % 12) * 30 + m * 0.5 - 90) * Math.PI / 180, am = (m * 6 - 90) * Math.PI / 180;
  s += `<line x1="${c}" y1="${c}" x2="${(c + 36 * Math.cos(ah)).toFixed(1)}" y2="${(c + 36 * Math.sin(ah)).toFixed(1)}" class="jarum-pendek"/><line x1="${c}" y1="${c}" x2="${(c + 54 * Math.cos(am)).toFixed(1)}" y2="${(c + 54 * Math.sin(am)).toFixed(1)}" class="jarum"/><circle cx="${c}" cy="${c}" r="4" class="titik"/>`;
  return s + "</svg>"; }
const jenisSudut = d => (d < 90 ? "lancip" : d === 90 ? "siku-siku" : d < 180 ? "tumpul" : "lurus");
const sudutJam = (h, m) => { const x = Math.abs((h % 12) * 30 + m * 0.5 - m * 6); return Math.min(x, 360 - x); };
/* Garis lurus dengan dua sinar dari titik O pada sudut t1 < t2 (derajat dari kanan); lbl = teks tiga sudut dari kanan ke kiri */
function svgGarisLurus(t1, t2, lbl) { const c = 140, cy = 120, R = 105, r = 52, s = svgBuka(280, 140, "sudut pada garis lurus"), sin = (t, k) => [(c + k * Math.cos(t * Math.PI / 180)).toFixed(1), (cy - k * Math.sin(t * Math.PI / 180)).toFixed(1)];
  let g = `<line x1="${c - R - 10}" y1="${cy}" x2="${c + R + 10}" y2="${cy}" class="kaki"/>`;
  [t1, t2].forEach(t => { const [x, y] = sin(t, R); g += `<line x1="${c}" y1="${cy}" x2="${x}" y2="${y}" class="kaki"/>`; });
  [[0, t1], [t1, t2], [t2, 180]].forEach(([a, b], i) => { const [x, y] = sin((a + b) / 2, r + (b - a < 40 ? 10 : 0)); g += svgT(x, (+y + 5).toFixed(1), lbl[i], 'text-anchor="middle" class="lbl"'); });
  return s + g + `<circle cx="${c}" cy="${cy}" r="3" class="titik"/></svg>`; }
const ARAH8 = ["utara", "timur laut", "timur", "tenggara", "selatan", "barat daya", "barat", "barat laut"];
/* Sudut sebesar total° yang dibagi sinar pada a°; lbl = [teks bagian bawah (0..a), teks bagian atas (a..total)] */
function svgSudutBagi(total, a, lbl, rot = 0) { const c = 110, R = 92, sin = (t, k) => [(c + k * Math.cos((t + rot) * Math.PI / 180)).toFixed(1), (c - k * Math.sin((t + rot) * Math.PI / 180)).toFixed(1)];
  let g = ""; [0, a, total].forEach(t => { const [x, y] = sin(t, R); g += `<line x1="${c}" y1="${c}" x2="${x}" y2="${y}" class="kaki"/>`; });
  if (total === 90) { const [x1, y1] = sin(0, 16), [x2, y2] = sin(45, 16 * Math.SQRT2), [x3, y3] = sin(90, 16); g += `<path d="M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}" class="bantu-tebal" fill="none"/>`; }
  [[0, a], [a, total]].forEach(([p, q], i) => { const [x, y] = sin((p + q) / 2, q - p < 30 ? 76 : 54); g += svgT(x, (+y + 5).toFixed(1), lbl[i], 'text-anchor="middle" class="lbl"'); });
  return `${svgBuka(220, 220, "sudut yang dibagi")}${g}<circle cx="${c}" cy="${c}" r="3" class="titik"/></svg>`; }
/* Segitiga dengan sudut alas kiri A° dan kanan B°; lbl = [teks di A, teks di B, teks di puncak] */
function svgSegitigaSudut(A, B, lbl) { const r = Math.PI / 180, b = Math.sin(B * r) / Math.sin((A + B) * r), P = [[0, 0], [1, 0], [b * Math.cos(A * r), b * Math.sin(A * r)]];
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]), x0 = Math.min(...xs), W = Math.max(...xs) - x0, H = Math.max(...ys), k = Math.min(220 / W, 140 / H), m = 34;
  const Q = P.map(([x, y]) => [m + (x - x0) * k, m * 0.6 + (H - y) * k]), gx = (Q[0][0] + Q[1][0] + Q[2][0]) / 3, gy = (Q[0][1] + Q[1][1] + Q[2][1]) / 3;
  let s = svgBuka(Math.round(W * k + 2 * m), Math.round(H * k + m * 1.4), "segitiga") + `<polygon points="${Q.map(q => q.map(v => v.toFixed(1)).join(",")).join(" ")}" class="bangun"/>`;
  Q.forEach((q, i) => { const dx = gx - q[0], dy = gy - q[1], d = Math.hypot(dx, dy) || 1, j = i === 2 ? 30 : 34; s += svgT((q[0] + dx / d * j).toFixed(1), (q[1] + dy / d * j + 5).toFixed(1), lbl[i], 'text-anchor="middle" class="lbl"'); });
  return s + "</svg>"; }
/* Daftar besar sudut (acak) lalu hitung banyak sudut berjenis tertentu */
function hitungJenisSudut(kaliSepuluh) { const jenis = pilih(["lancip", "tumpul", "siku-siku", "lancip", "tumpul"]), n = acak(5, 6), D = [];
  while (D.length < n) { const d = kaliSepuluh ? pilih([acak(1, 8) * 10, 90, acak(10, 17) * 10, acak(1, 17) * 10]) : pilih([acak(5, 89), 90, acak(91, 175)]); D.push(d); }
  if (!D.some(d => jenisSudut(d) === jenis) && jenis === "siku-siku") D[acak(0, n - 1)] = 90;
  const v = D.filter(d => jenisSudut(d) === jenis).length;
  return isian(`Perhatikan besar sudut-sudut berikut.<br><b>${D.map(d => d + "°").join(", ")}</b><br>Banyak sudut <b>${jenis}</b> adalah …`, v,
    { satuan: "sudut", petunjuk: "Lancip: kurang dari 90°. Siku-siku: tepat 90°. Tumpul: lebih dari 90° tetapi kurang dari 180°.", bahas: v ? `Sudut ${jenis}: ${D.filter(d => jenisSudut(d) === jenis).map(d => d + "°").join(", ")} (${v} sudut).` : `Tidak ada sudut ${jenis}, jadi jawabannya 0.` }); }
const sudutArah = berlawanan => { const i = acak(0, 7), k = acak(1, 7), j = (i + (berlawanan ? -k : k) + 8) % 8, x = nama();
  return isian(`${x} mula-mula menghadap ke arah <b>${ARAH8[i]}</b>. Ia berputar ${berlawanan ? "berlawanan arah" : "searah"} jarum jam sampai menghadap ke arah <b>${ARAH8[j]}</b>. Besar sudut putaran ${x} adalah …°`, k * 45,
    { satuan: "°", petunjuk: "Urutan searah jarum jam: utara, timur laut, timur, tenggara, selatan, barat daya, barat, barat laut. Setiap langkah = 45°.", bahas: `Dari ${ARAH8[i]} ke ${ARAH8[j]} ${berlawanan ? "berlawanan arah" : "searah"} jarum jam ada ${k} langkah. ${k} × 45° = ${k * 45}°.` }); };
const sudutSegitigaGbr = () => { const A = acak(6, 15) * 5, B = acak(6, Math.min(18, 33 - A / 5)) * 5, C = 180 - A - B, i = acak(0, 2), v = [A, B, C], lbl = v.map((d, k) => (k === i ? "?" : d + "°"));
  return isian(`Besar sudut yang ditandai <b>?</b> pada segitiga di bawah adalah …°`, v[i], { gambar: svgSegitigaSudut(A, B, lbl), satuan: "°", petunjuk: "Jumlah ketiga sudut segitiga = 180°.", bahas: `180° − ${v.filter((_, k) => k !== i).join("° − ")}° = ${v[i]}°.` }); };
/* Cetakan tambahan Misi 5 (sudut) per level */
const U5T = {
  1: [
    () => { const a = acak(1, 18) * 5, b = acak(1, 18) * 5; return isian(`Sudut ${a}° ditambah sudut ${b}°. Hasilnya adalah …°`, a + b, { satuan: "°", bahas: `${a}° + ${b}° = ${a + b}°.` }); },
    () => hitungJenisSudut(true),
  ],
  2: [
    () => hitungJenisSudut(true),
    () => { const a = acak(1, 12), k = acak(1, 11), b = (a + k - 1) % 12 + 1; return isian(`Jarum panjang jam bergerak searah jarum jam dari angka ${a} ke angka ${b}. Besar sudut putarnya adalah …°`, k * 30, { satuan: "°", petunjuk: "Dari satu angka ke angka berikutnya = 30°.", bahas: `Dari ${a} ke ${b} ada ${k} langkah angka. ${k} × 30° = ${k * 30}°.` }); },
    () => { const d = acak(1, 17) * 5; return isian(`Sudut siku-siku dikurangi sudut ${d}°. Hasilnya adalah …°`, 90 - d, { satuan: "°", petunjuk: "Sudut siku-siku = 90°.", bahas: `90° − ${d}° = ${90 - d}°.` }); },
    () => { const k = pilih([2, 3, 4, 5, 6, 9, 10, 12]); return isian(`Sudut lurus dibagi menjadi ${k} sudut yang sama besar. Besar setiap sudut adalah …°`, 180 / k, { satuan: "°", petunjuk: "Sudut lurus = 180°.", bahas: `180° : ${k} = ${180 / k}°.` }); },
  ],
  3: [
    () => { const d = (2 * acak(1, 16) + 1) * 5; return isian(`Kaki sudut berada tepat di tengah-tengah dua garis skala. Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Setiap garis skala = 10°. Di tengah-tengahnya berarti tambah 5°.", bahas: `Kaki sudut di antara ${d - 5}° dan ${d + 5}°, jadi besarnya ${d}°.` }); },
    () => { const a = acak(4, 32) * 5; return isian(`Perhatikan gambar. Sudut yang besarnya ${a}° dan sudut yang ditandai <b>?</b> membentuk sudut lurus. Besar sudut <b>?</b> adalah …°`, 180 - a, { gambar: svgGarisLurus(a, 180, [`${a}°`, "?", ""]), satuan: "°", petunjuk: "Sudut lurus = 180°.", bahas: `180° − ${a}° = ${180 - a}°.` }); },
    () => { const x = nama(), k = acak(1, 8), [t, v] = pilih([["seperempat", 90], ["setengah", 180]]); return isian(`${x} berputar di tempat sebanyak ${k} kali ${t} putaran ke arah yang sama. Besar sudut putaran ${x} seluruhnya adalah …°`, k * v, { satuan: "°", petunjuk: `${t[0].toUpperCase() + t.slice(1)} putaran = ${v}°.`, bahas: `${k} × ${v}° = ${k * v}°.` }); },
    () => { const k = pilih([2, 3, 4, 5, 6]), d = pilih([10, 15, 20, 25, 30, 35, 40, 45]); return isian(`Sudut ${d * k}° dibagi menjadi ${k} sudut yang sama besar. Besar setiap sudut adalah …°`, d, { satuan: "°", bahas: `${d * k}° : ${k} = ${d}°.` }); },
    () => hitungJenisSudut(false),
  ],
  4: [
    () => { const a = acak(4, 14) * 5; return isian(`Perhatikan gambar. Sudut siku-siku dibagi oleh sebuah sinar. Besar sudut yang ditandai <b>?</b> adalah …°`, 90 - a, { gambar: svgSudutBagi(90, a, [`${a}°`, "?"], acak(0, 7) * 45), satuan: "°", petunjuk: "Tanda kotak kecil berarti siku-siku (90°).", bahas: `90° − ${a}° = ${90 - a}°.` }); },
    () => { const a = acak(10, 80); return isian(`Sebuah segitiga siku-siku memiliki salah satu sudut lancip sebesar ${a}°. Besar sudut lancip yang lain adalah …°`, 90 - a, { satuan: "°", petunjuk: "Jumlah sudut segitiga 180°, dan satu sudutnya 90°.", bahas: `180° − 90° − ${a}° = ${90 - a}°.` }); },
    () => sudutArah(false),
    () => { const d = acak(5, 85); return isian(`Dua sudut saling berpenyiku. Jika salah satunya ${d}°, besar sudut yang lain adalah …°`, 90 - d, { satuan: "°", petunjuk: "Berpenyiku = jumlahnya 90°.", bahas: `90° − ${d}° = ${90 - d}°.` }); },
    () => { const a = acak(3, 15) * 5, b = acak(3, 30 - a / 5 - 2) * 5; return isian(`Tiga sudut berdampingan membentuk sudut lurus. Dua di antaranya ${a}° dan ${b}°. Besar sudut yang ketiga adalah …°`, 180 - a - b, { satuan: "°", petunjuk: "Sudut lurus = 180°.", bahas: `180° − ${a}° − ${b}° = ${180 - a - b}°.` }); },
  ],
  5: [
    () => { let a, b; do { a = acak(4, 14) * 5; b = acak(4, 14) * 5; } while (a + b > 150); const x = 180 - a - b, i = acak(0, 2), v = [a, x, b], lbl = v.map((d, k) => (k === i ? "?" : d + "°"));
      return isian(`Pada gambar, tiga sudut terletak pada satu garis lurus. Besar sudut yang ditandai <b>?</b> adalah …°`, v[i], { gambar: svgGarisLurus(a, a + x, lbl), satuan: "°", petunjuk: "Jumlah sudut pada garis lurus = 180°.", bahas: `180° − ${v.filter((_, k) => k !== i).join("° − ")}° = ${v[i]}°.` }); },
    sudutSegitigaGbr,
    () => sudutArah(true),
    () => { const n = pilih([3, 4, 5, 6, 8, 9, 10, 12]), b = pilih(["kue bolu bundar", "pizza", "semangka bulat", "roti bundar"]); return isian(`Sebuah ${b} dipotong dari titik tengahnya menjadi ${n} potong yang sama besar. Besar sudut pada setiap potongan adalah …°`, 360 / n, { satuan: "°", petunjuk: "Satu putaran penuh = 360°.", bahas: `360° : ${n} = ${360 / n}°.` }); },
    () => { let a, b, c, d; do { a = acak(10, 30) * 5; b = acak(10, 30) * 5; c = acak(10, 30) * 5; d = 360 - a - b - c; } while (d < 40 || d > 160);
      return isian(`Empat sudut mengelilingi satu titik. Tiga di antaranya ${a}°, ${b}°, dan ${c}°. Besar sudut keempat adalah …°`, d, { satuan: "°", petunjuk: "Sudut-sudut yang mengelilingi satu titik jumlahnya 360°.", bahas: `360° − ${a}° − ${b}° − ${c}° = ${d}°.` }); },
  ],
  6: [
    sudutSegitigaGbr,
    () => { const a = acak(20, 85); return isian(`Besar setiap sudut alas sebuah segitiga sama kaki ${a}°. Besar sudut puncaknya adalah …°`, 180 - 2 * a, { satuan: "°", petunjuk: "Kedua sudut alas segitiga sama kaki sama besar.", bahas: `180° − 2 × ${a}° = ${180 - 2 * a}°.` }); },
  ],
  7: [
    () => sudutArah(ya()),
    () => { const h = acak(1, 11), m1 = acak(0, 6) * 5, m2 = m1 + acak(2, 11 - m1 / 5) * 5; return isian(`Dari pukul ${pkl(h * 60 + m1)} sampai pukul ${pkl(h * 60 + m2)}, jarum panjang jam berputar sebesar …°`, (m2 - m1) * 6, { satuan: "°", petunjuk: "Jarum panjang berputar 6° setiap menit.", bahas: `${m2 - m1} menit × 6° = ${(m2 - m1) * 6}°.` }); },
    sudutSegitigaGbr,
  ],
};
daftarMisi("ukr", "u5", "Sudut", "📐", {
  1: [
    () => { const k = acak(2, 12), d = pilih([10, 15, 20, 30, 45]); return isian(`Ada ${k} sudut yang masing-masing besarnya ${d}°. Jumlah semuanya …°`, k * d, { satuan: "°", bahas: `${k} × ${d}° = ${k * d}°.` }); },
    () => { const [t, v] = pilih([["seperempat putaran", 90], ["setengah putaran", 180], ["tiga perempat putaran", 270], ["satu putaran penuh", 360], ["sepertiga putaran", 120], ["seperenam putaran", 60], ["dua putaran", 720]]);
      return isian(`Besar sudut <b>${t}</b> adalah …°`, v, { satuan: "°", petunjuk: "Satu putaran penuh = 360°.", bahas: `${t} = ${v}°.` }); },
    () => { const d = acak(1, 5) * 30; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Baca angka yang ditunjuk kaki sudut, mulai dari 0 di kanan.", bahas: `Besar sudutnya ${d}°.` }); },
    keTKA(() => { const d = pilih([acak(4, 16) * 5, 90, acak(20, 34) * 5]); return pgTetap(`Jenis sudut pada gambar adalah …`, ["lancip", "siku-siku", "tumpul"], jenisSudut(d), { gambar: svgSudut(d, acak(0, 23) * 15), petunjuk: "Bandingkan dengan pojok buku (siku-siku).", bahas: `Sudut itu ${jenisSudut(d)} (${d}°).` }); }),
    ...U5T[1],
  ],
  2: [
    () => { const d = acak(1, 17) * 5, t = pilih([["siku-siku", 90], ["lurus", 180]]); return isian(`Sudut ${d}° ditambah sebuah sudut ${t[0]}. Hasilnya …°`, d + t[1], { satuan: "°", petunjuk: `Sudut ${t[0]} = ${t[1]}°.`, bahas: `${d}° + ${t[1]}° = ${d + t[1]}°.` }); },
    () => { const k = acak(2, 4); return isian(`Besar ${k} sudut siku-siku jika digabung adalah …°`, 90 * k, { satuan: "°", petunjuk: "Satu sudut siku-siku = 90°.", bahas: `${k} × 90° = ${90 * k}°.` }); },
    () => { const d = acak(1, 17) * 10; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Setiap garis kecil = 10°.", bahas: `Besar sudutnya ${d}°.` }); },
    keTKA(() => { const d = pilih([acak(5, 89), 90, acak(91, 179), 180]); return pgTetap(`Sudut yang besarnya <b>${d}°</b> termasuk sudut …`, ["lancip", "siku-siku", "tumpul", "lurus"], jenisSudut(d), { petunjuk: "Lancip < 90°, siku-siku = 90°, tumpul antara 90° dan 180°, lurus = 180°.", bahas: `${d}° termasuk sudut ${jenisSudut(d)}.` }); }),
    ...U5T[2],
  ],
  3: [
    () => { const d = acak(1, 17) * 10; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Mulai dari 0 di kanan, hitung setiap garis = 10°.", bahas: `Besar sudutnya ${d}°.` }); },
    () => { const d0 = acak(1, 9) * 10, d = d0 + acak(2, 18 - d0 / 10) * 10; if (d > 180) return isian(`Sudut dari 30° sampai 110° pada busur besarnya …°`, 80, { satuan: "°", bahas: "110 − 30 = 80." });
      return isian(`Kedua kaki sudut tidak dimulai dari 0. Besar sudut yang ditunjukkan pada busur derajat adalah …°`, d - d0, { gambar: svgBusur(d, d0), satuan: "°", petunjuk: "Baca angka di kedua kaki sudut, lalu kurangkan.", bahas: `${d}° − ${d0}° = ${d - d0}°.` }); },
    ...U5T[3],
  ],
  4: [() => { const d = acak(20, 160); return isian(`Pelurus dari sudut ${d}° adalah …°`, 180 - d, { satuan: "°", petunjuk: "Dua sudut berpelurus jumlahnya 180°.", bahas: `180° − ${d}° = ${180 - d}°.` }); }, ...U5T[4]],
  5: [
    () => { const d = acak(10, 80); return isian(`Penyiku dari sudut ${d}° adalah …°`, 90 - d, { satuan: "°", petunjuk: "Dua sudut berpenyiku jumlahnya 90°.", bahas: `90° − ${d}° = ${90 - d}°.` }); },
    () => { const a = acak(40, 150), b = acak(40, 150); return isian(`Tiga sudut mengelilingi satu titik. Dua di antaranya ${a}° dan ${b}°. Sudut ketiga adalah …°`, 360 - a - b, { satuan: "°", petunjuk: "Satu putaran = 360°.", bahas: `360° − ${a}° − ${b}° = ${360 - a - b}°.` }); },
    ...U5T[5],
  ],
  6: [() => { const a = acak(25, 100), b = acak(20, 155 - a); return isian(`Dua sudut sebuah segitiga besarnya ${a}° dan ${b}°. Besar sudut ketiga adalah …°`, 180 - a - b, { satuan: "°", petunjuk: "Jumlah sudut segitiga = 180°.", bahas: `180° − ${a}° − ${b}° = ${180 - a - b}°.` }); }, ...U5T[6]],
  7: [
    () => { const h = acak(1, 11), p = ya() ? h : h + 12; return isian(`Pada pukul ${pkl(p * 60)}, besar sudut terkecil antara jarum panjang dan jarum pendek adalah …°`, sudutJam(h, 0), { gambar: svgJam(h, 0), satuan: "°", petunjuk: "Jarak antar angka jam = 30°.", bahas: `${Math.min(h, 12 - h)} × 30° = ${sudutJam(h, 0)}°.` }); },
    () => { const m = acak(2, 59); return isian(`Dalam ${m} menit, jarum menit berputar sebesar …°`, m * 6, { satuan: "°", petunjuk: "Satu putaran (360°) = 60 menit, jadi 1 menit = 6°.", bahas: `${m} × 6° = ${m * 6}°.` }); },
    () => { const j = acak(1, 11); return isian(`Dalam ${j} jam, jarum pendek (jarum jam) berputar sebesar …°`, j * 30, { satuan: "°", petunjuk: "Satu putaran (360°) = 12 jam, jadi 1 jam = 30°.", bahas: `${j} × 30° = ${j * 30}°.` }); },
    ...U5T[7],
  ],
  8: [
    () => { const h = acak(1, 11), m = pilih([15, 30, 45]), d = sudutJam(h, m); return isian(`Pada pukul ${pkl(h * 60 + m)}, besar sudut terkecil antara kedua jarum jam adalah …°`, d, { gambar: svgJam(h, m), satuan: "°", petunjuk: `Jarum pendek juga bergeser: setiap 15 menit bergeser 7,5°.`, bahas: `Jarum menit di ${m * 6}°, jarum jam di ${fmt((h % 12) * 30 + m / 2)}°. Sudut terkecil ${fmt(d)}°.` }); },
    () => { const h = acak(1, 11), d = sudutJam(h, 0); return bs(`Perhatikan jam yang menunjukkan pukul ${pkl(h * 60)}. Tentukan Benar atau Salah.`, [
      { t: `Sudut terkecil kedua jarum ${d}°.`, b: true }, { t: `Sudut itu termasuk sudut ${jenisSudut(d)}.`, b: true },
      { t: `Sudut terkecil kedua jarum ${d + 30}°.`, b: false }, { t: `Satu jam kemudian sudutnya ${sudutJam(h + 1, 0)}°.`, b: true }], { gambar: svgJam(h, 0), bahas: `Pukul ${pkl(h * 60)}: ${d}° (${jenisSudut(d)}). Pukul ${pkl((h + 1) * 60)}: ${sudutJam(h + 1, 0)}°.` }); },
    () => { const i = acak(0, 7), k = acak(1, 7), d = k * 45, jam = ya(), j = (i + (jam ? k : -k) + 8) % 8, lawan = (i + (jam ? -k : k) + 8) % 8, x = nama();
      return pg(`${x} berdiri menghadap ke arah <b>${ARAH8[i]}</b>. Kemudian ${x} berputar ${d}° ${jam ? "searah" : "berlawanan arah"} jarum jam. Sekarang ${x} menghadap ke arah …`, ARAH8[j],
        [ARAH8[lawan], ARAH8[(j + 1) % 8], ARAH8[(j + 7) % 8], ARAH8[(j + 4) % 8]].filter(a => a !== ARAH8[j]),
        { petunjuk: "Urutan searah jarum jam: utara, timur laut, timur, tenggara, selatan, barat daya, barat, barat laut. Setiap langkah = 45°.", bahas: `${d}° = ${k} langkah 45°. Dari ${ARAH8[i]} berputar ${k} langkah ${jam ? "searah" : "berlawanan arah"} jarum jam → ${ARAH8[j]}.` }); },
    () => { let a, b; do { a = acak(5, 13) * 5; b = acak(5, 13) * 5; } while (a + b > 150); const x = 180 - a - b, kiriTanya = ya(), t1 = a, t2 = a + x;
      const lbl = kiriTanya ? [`${a}°`, `${x}°`, "?"] : [`${a}°`, "?", `${b}°`], jaw = kiriTanya ? b : x;
      return isian(`Perhatikan gambar. Ketiga sudut terletak pada satu garis lurus. Besar sudut yang ditandai <b>?</b> adalah …`, jaw,
        { gambar: svgGarisLurus(t1, t2, lbl), satuan: "°", petunjuk: "Sudut-sudut pada garis lurus jumlahnya 180°.", bahas: `180° − ${kiriTanya ? `${a}° − ${x}°` : `${a}° − ${b}°`} = ${jaw}°.` }); },
  ],
  9: [
    () => { const p = acak(10, 85) * 2, a = (180 - p) / 2; return isian(`Sudut puncak sebuah segitiga sama kaki ${p}°. Besar setiap sudut alasnya adalah …°`, a, { satuan: "°", petunjuk: "Dua sudut alas segitiga sama kaki sama besar.", bahas: `(180° − ${p}°) : 2 = ${a}°.` }); },
    () => { const a = acak(60, 120), b = acak(60, 120), c = acak(60, 110), d = 360 - a - b - c; if (d <= 20 || d >= 180) return isian(`Tiga sudut segiempat 90°, 90°, 100°. Sudut keempat …°`, 80, { satuan: "°", bahas: "360 − 280 = 80." });
      return isian(`Tiga sudut sebuah segiempat besarnya ${a}°, ${b}°, dan ${c}°. Besar sudut keempat adalah …°`, d, { satuan: "°", petunjuk: "Jumlah sudut segiempat = 360°.", bahas: `360° − ${a}° − ${b}° − ${c}° = ${d}°.` }); },
  ],
  10: [() => { const h = acak(1, 11), m = acak(1, 29) * 2, d = sudutJam(h, m); return isian(`Pada pukul ${pkl(h * 60 + m)}, besar sudut terkecil antara jarum jam dan jarum menit adalah …°`, d,
    { gambar: svgJam(h, m), satuan: "°", petunjuk: "Jarum menit bergerak 6° per menit. Jarum jam bergerak 0,5° per menit.", bahas: `Jarum menit: ${m} × 6 = ${m * 6}°. Jarum jam: ${h % 12} × 30 + ${m} × 0,5 = ${fmt((h % 12) * 30 + m / 2)}°. Selisih terkecil = ${fmt(d)}°.` }); },
    () => { const n = pilih([5, 6, 8, 9, 10, 12]), nm = `${SEGI[n]} beraturan`, satu = (n - 2) * 180 / n, v = acak(1, 3);
      if (v === 1) return isian(`Besar setiap sudut dalam ${nm} adalah …`, satu, { satuan: "°", petunjuk: `${nm} dapat dibagi menjadi ${n - 2} segitiga dari satu titik sudutnya.`, bahas: `Jumlah sudut dalam (${n} − 2) × 180° = ${fmt((n - 2) * 180)}°. Setiap sudut ${fmt((n - 2) * 180)}° : ${n} = ${satu}°.` });
      if (v === 2) return isian(`Jumlah semua sudut dalam sebuah ${SEGI[n]} adalah …`, (n - 2) * 180, { satuan: "°", petunjuk: `Dari satu titik sudut, ${SEGI[n]} dapat dibagi menjadi beberapa segitiga. Jumlah sudut segitiga 180°.`, bahas: `${SEGI[n]} terbagi menjadi ${n} − 2 = ${n - 2} segitiga. ${n - 2} × 180° = ${fmt((n - 2) * 180)}°.` });
      return isian(`Setiap sudut dalam sebuah segi banyak beraturan besarnya ${satu}°. Banyak sisi segi banyak itu adalah …`, n, { petunjuk: "Coba hitung sudut dalam segi lima, segi enam, segi delapan, dan seterusnya: (n − 2) × 180° : n.", bahas: `(${n} − 2) × 180° : ${n} = ${satu}°, jadi banyak sisinya ${n} (${nm}).` }); },
    () => { if (ya()) { const k = pilih([2, 3, 4]), B = acak(4, Math.floor(170 / (k + 1)) - 1) , C = 180 - (k + 1) * B;
        return isian(`Pada segitiga ABC, besar sudut A sama dengan ${k} kali besar sudut B, dan besar sudut C = ${C}°. Besar sudut A adalah …`, k * B,
          { satuan: "°", petunjuk: `Sudut A + sudut B = 180° − ${C}°. Sudut A = ${k} bagian, sudut B = 1 bagian.`, bahas: `A + B = ${180 - C}°. ${180 - C}° : ${k + 1} = ${B}° (sudut B). Sudut A = ${k} × ${B}° = ${k * B}°.` }); }
      const d = acak(2, 12) * 5, B = acak(15, Math.floor((170 - d) / 2)), A = B + d, C = 180 - A - B;
      return isian(`Pada segitiga PQR, besar sudut P ${d}° lebih besar daripada sudut Q, dan besar sudut R = ${C}°. Besar sudut Q adalah …`, B,
        { satuan: "°", petunjuk: `Sudut P + sudut Q = 180° − ${C}°. Kurangi dulu selisihnya, lalu bagi dua.`, bahas: `P + Q = ${180 - C}°. (${180 - C}° − ${d}°) : 2 = ${B}° (sudut Q). Sudut P = ${A}°.` }); },
  ],
});

/* ================= Misi 6: Sifat bangun, simetri, jaring-jaring ================= */
const DATAR = [
  { n: "persegi", ciri: "4 sisi sama panjang dan keempat sudutnya siku-siku", lipat: 4, putar: 4 },
  { n: "persegi panjang", ciri: "sisi yang berhadapan sama panjang dan keempat sudutnya siku-siku, tetapi tidak semua sisinya sama panjang", lipat: 2, putar: 2 },
  { n: "belah ketupat", ciri: "4 sisi sama panjang, kedua diagonalnya berpotongan tegak lurus, tetapi sudutnya tidak siku-siku", lipat: 2, putar: 2 },
  { n: "jajar genjang", ciri: "sisi yang berhadapan sejajar dan sama panjang, sudutnya tidak siku-siku, dan tidak memiliki simetri lipat", lipat: 0, putar: 2 },
  { n: "layang-layang", ciri: "dua pasang sisi yang berdekatan sama panjang dan memiliki 1 simetri lipat", lipat: 1 },
  { n: "trapesium", ciri: "hanya memiliki sepasang sisi yang sejajar", lipat: null },
  { n: "segitiga sama sisi", ciri: "3 sisi sama panjang dan setiap sudutnya 60°", lipat: 3, putar: 3 },
  { n: "segitiga sama kaki", ciri: "2 sisi sama panjang dan 2 sudut sama besar", lipat: 1 },
  { n: "segitiga siku-siku", ciri: "salah satu sudutnya 90°", lipat: null },
  { n: "lingkaran", ciri: "tidak memiliki titik sudut dan semua titik pada tepinya berjarak sama dari titik pusat", lipat: null },
  { n: "segienam beraturan", ciri: "6 sisi sama panjang dan 6 sudut sama besar", lipat: 6, putar: 6 },
];
const RUANG = [
  { n: "kubus", ciri: "6 sisi berbentuk persegi yang sama besar", sisi: 6, rusuk: 12, titik: 8 },
  { n: "balok", ciri: "6 sisi berbentuk persegi panjang dan sisi yang berhadapan sama besar", sisi: 6, rusuk: 12, titik: 8 },
  { n: "prisma segitiga", ciri: "2 sisi berbentuk segitiga yang sejajar dan 3 sisi tegak berbentuk persegi panjang", sisi: 5, rusuk: 9, titik: 6 },
  { n: "limas segiempat", ciri: "alas berbentuk segiempat dan 4 sisi tegak berbentuk segitiga yang bertemu di satu titik puncak", sisi: 5, rusuk: 8, titik: 5 },
  { n: "limas segitiga", ciri: "4 sisi yang semuanya berbentuk segitiga", sisi: 4, rusuk: 6, titik: 4 },
  { n: "tabung", ciri: "2 sisi berbentuk lingkaran dan 1 sisi lengkung", sisi: 3, rusuk: 2 },
  { n: "kerucut", ciri: "1 sisi alas berbentuk lingkaran, 1 sisi lengkung, dan 1 titik puncak", sisi: 2, rusuk: 1 },
  { n: "bola", ciri: "hanya 1 sisi lengkung dan tidak memiliki rusuk", sisi: 1, rusuk: 0 },
];
/* Jaring-jaring kubus: 1-4-1 (selalu benar) dan beberapa yang salah */
function jaring141() { const a = acak(0, 3), b = acak(0, 3); return { sel: [[a, 0], [0, 1], [1, 1], [2, 1], [3, 1], [b, 2]], sah: true, hadap: [[0, 5], [1, 3], [2, 4]] }; }
const JARING_LAIN = [
  { sel: [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]], sah: true }, { sel: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], sah: true },
  { sel: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], sah: false }, { sel: [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [2, 0]], sah: false },
  { sel: [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]], sah: false }, { sel: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [3, 1]], sah: false },
  { sel: [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1]], sah: false }, { sel: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]], sah: true },
];
/* Cerminkan/putar jaring secara acak (urutan sel tetap, jadi pasangan "hadap" tetap berlaku) */
function ubahJaring(j) {
  let sel = j.sel.map(c => c.slice()); if (ya()) sel = sel.map(([x, y]) => [y, x]); if (ya()) { const m = Math.max(...sel.map(c => c[0])); sel = sel.map(([x, y]) => [m - x, y]); }
  if (ya()) { const m = Math.max(...sel.map(c => c[1])); sel = sel.map(([x, y]) => [x, m - y]); } return { ...j, sel };
}
function svgJaring(j, label) { const u = 30, W = Math.max(...j.sel.map(c => c[0])) + 1, H = Math.max(...j.sel.map(c => c[1])) + 1; let s = svgBuka(W * u + 8, H * u + 8, "jaring-jaring");
  j.sel.forEach((c, i) => { s += `<rect x="${4 + c[0] * u}" y="${4 + c[1] * u}" width="${u}" height="${u}" class="ubin"/>`; if (label) s += svgT(4 + c[0] * u + u / 2, 4 + c[1] * u + u / 2 + 5, label[i], 'text-anchor="middle" class="lbl"'); });
  return s + "</svg>"; }
const prisma = n => ({ sisi: n + 2, rusuk: 3 * n, titik: 2 * n }), limas = n => ({ sisi: n + 1, rusuk: 2 * n, titik: n + 1 });
const SEGI = { 3: "segitiga", 4: "segiempat", 5: "segilima", 6: "segienam", 7: "segitujuh", 8: "segidelapan", 9: "segisembilan", 10: "segisepuluh", 12: "segi-12" };
const HITUNG_DATAR = [["persegi", 4], ["persegi panjang", 4], ["segitiga sama sisi", 3], ["segitiga siku-siku", 3], ["trapesium", 4], ["segilima", 5], ["segienam", 6], ["segidelapan", 8], ["belah ketupat", 4], ["layang-layang", 4], ["jajar genjang", 4], ["segisepuluh", 10]];
const SIKU = { "persegi": 4, "persegi panjang": 4, "segitiga siku-siku": 1, "trapesium siku-siku": 2, "belah ketupat": 0, "jajar genjang": 0, "segitiga sama sisi": 0, "layang-layang": 0 };
const SEJAJAR = { "persegi": 2, "persegi panjang": 2, "jajar genjang": 2, "belah ketupat": 2, "trapesium": 1, "layang-layang": 0, "segitiga": 0, "segienam beraturan": 3 };
/* Putar titik-titik sebesar rot° (dibulatkan supaya gambar ringkas) */
const putarP = (P, rot) => { const a = rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return P.map(([x, y]) => [Math.round((x * c - y * s) * 10) / 10, Math.round((x * s + y * c) * 10) / 10]); };
const segiBeraturan = (n, rot = 0) => putarP(Array.from({ length: n }, (_, i) => [100 * Math.cos(2 * Math.PI * i / n - Math.PI / 2), 100 * Math.sin(2 * Math.PI * i / n - Math.PI / 2)]), rot);
const bintangP = (k, rot = 0) => putarP(Array.from({ length: 2 * k }, (_, i) => { const r = i % 2 ? 42 : 100, a = Math.PI * i / k - Math.PI / 2; return [r * Math.cos(a), r * Math.sin(a)]; }), rot);
/* Bangun datar bergambar (ukuran acak) dengan banyak simetri lipat & tingkat simetri putar (0 = tidak punya) */
const BANGUN_GBR = [
  () => { const p = acak(5, 9), l = acak(2, p - 2); return { n: "persegi panjang", P: [[0, 0], [p, 0], [p, l], [0, l]], lipat: 2, putar: 2 }; },
  () => { const a = acak(3, 5), b = a + acak(2, 3); return { n: "belah ketupat", P: [[0, -a], [b, 0], [0, a], [-b, 0]], lipat: 2, putar: 2 }; },
  () => { const a = acak(2, 4), t1 = acak(2, 3), t2 = t1 + acak(3, 5); return { n: "layang-layang", P: [[0, -t1], [a, 0], [0, t2], [-a, 0]], lipat: 1, putar: 0 }; },
  () => { const a = acak(5, 8), t = acak(3, 5), g = acak(2, 3); return { n: "jajar genjang", P: [[g, 0], [a + g, 0], [a, t], [0, t]], lipat: 0, putar: 2 }; },
  () => { const a = acak(3, 6) * 2, t = ya() ? Math.round(a * acak(4, 6) / 10) : Math.round(a * acak(13, 17) / 10); return { n: "segitiga sama kaki", P: [[0, 0], [a, 0], [a / 2, -t]], lipat: 1, putar: 0 }; },
  () => { const b = acak(4, 6) * 2, a = b - 2 * acak(1, 2), t = acak(3, 5); return { n: "trapesium sama kaki", P: [[(b - a) / 2, 0], [(b + a) / 2, 0], [b, t], [0, t]], lipat: 1, putar: 0 }; },
  () => { const a = acak(5, 8), b = acak(2, a - 2), t = acak(3, 5); return { n: "trapesium siku-siku", P: [[0, 0], [b, 0], [a, t], [0, t]], lipat: 0, putar: 0 }; },
  () => ({ n: "segitiga sama sisi", P: segiBeraturan(3), lipat: 3, putar: 3 }),
];
/* Huruf kapital yang jelas simetrinya (huruf yang meragukan tidak dipakai) */
const HURUF_LIPAT = ["A", "B", "C", "D", "E", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y"], HURUF_TANPA_LIPAT = ["F", "G", "J", "L", "N", "P", "Q", "R", "S", "Z"];
const HURUF_PUTAR = ["H", "I", "N", "O", "S", "X", "Z"], HURUF_TANPA_PUTAR = ["A", "B", "C", "D", "E", "F", "G", "J", "L", "M", "P", "R", "T", "U", "V", "W", "Y"];
const NAMA_SEGI = n => (n === 4 ? "persegi" : n === 3 ? "segitiga sama sisi" : SEGI[n] + " beraturan");
daftarMisi("ukr", "u6", "Sifat bangun, simetri, jaring-jaring", "🔺", {
  1: [
    keTKA(() => { const b = pilih(DATAR.slice(0, 4).concat(DATAR.slice(6, 8))); return pg(`Bangun datar yang memiliki ${b.ciri} adalah …`, b.n, kocok(DATAR.filter(x => x !== b)).map(x => x.n), { bahas: `Itu ciri ${b.n}.` }); }, 6),
    keTKA(() => { const b = pilih(DATAR.slice(0, 4).concat(DATAR.slice(6, 8))); return pg(`Ciri-ciri bangun <b>${b.n}</b> adalah …`, b.ciri, kocok(DATAR.filter(x => x !== b)).map(x => x.ciri), { bahas: `${b.n}: ${b.ciri}.` }); }, 6),
    () => { const b = pilih(HITUNG_DATAR), k = pilih(["sisi", "titik sudut"]); return isian(`Banyak ${k} pada bangun <b>${b[0]}</b> adalah …`, b[1], { bahas: `${b[0]} memiliki ${b[1]} sisi dan ${b[1]} titik sudut.` }); },
    () => { const [a, c] = ambil(HITUNG_DATAR, 2); return isian(`Banyak sisi ${a[0]} ditambah banyak sisi ${c[0]} adalah …`, a[1] + c[1], { bahas: `${a[1]} + ${c[1]} = ${a[1] + c[1]}.` }); },
  ],
  2: [
    keTKA(() => { const b = pilih(DATAR); return pg(`Bangun datar yang memiliki ${b.ciri} adalah …`, b.n, kocok(DATAR.filter(x => x !== b)).map(x => x.n), { bahas: `Itu ciri ${b.n}.` }); }, 7),
    keTKA(() => { const b = pilih(DATAR); return pg(`Ciri-ciri bangun <b>${b.n}</b> adalah …`, b.ciri, kocok(DATAR.filter(x => x !== b)).map(x => x.ciri), { bahas: `${b.n}: ${b.ciri}.` }); }, 7),
    () => { const [n, v] = pilih(Object.entries(SIKU)); return isian(`Banyak sudut siku-siku pada bangun <b>${n}</b> adalah …`, v, { petunjuk: "Sudut siku-siku seperti pojok buku.", bahas: `${n} memiliki ${v} sudut siku-siku.` }); },
    () => { const [n, v] = pilih(Object.entries(SEJAJAR)); return isian(`Banyak pasang sisi yang sejajar pada bangun <b>${n}</b> adalah …`, v, { petunjuk: "Sisi sejajar tidak pernah bertemu walau diperpanjang.", bahas: `${n} memiliki ${v} pasang sisi sejajar.` }); },
    () => { const [[n1, v1], [n2, v2]] = ambil(Object.entries(SIKU), 2); return isian(`Banyak sudut siku-siku pada <b>${n1}</b> ditambah pada <b>${n2}</b> adalah …`, v1 + v2, { bahas: `${v1} + ${v2} = ${v1 + v2}.` }); },
    () => { const n = acak(3, 10), k = pilih(["sisi", "titik sudut"]); return isian(`Perhatikan bangun datar di bawah. Banyak ${k}nya adalah …`, n,
      { gambar: svgPoligon(segiBeraturan(n, acak(0, 71) * 5), {}, { label: "segi banyak" }), petunjuk: `Hitung ${k} satu per satu. Beri tanda pada ${k} yang sudah dihitung.`, bahas: `Bangun itu ${SEGI[n]} dengan ${n} sisi dan ${n} titik sudut.` }); },
    () => { const b = pilih(HITUNG_DATAR), k = acak(2, 6), t = pilih(["sisi", "titik sudut"]); return isian(`${nama()} menggambar ${k} buah ${b[0]}. Banyak ${t} seluruhnya pada gambar-gambar itu adalah …`, k * b[1], { petunjuk: `Satu ${b[0]} memiliki ${b[1]} ${t}.`, bahas: `${k} × ${b[1]} = ${k * b[1]}.` }); },
    () => { const s = acak(1, 5), p = acak(1, 5); return isian(`Ada ${s} buah segitiga dan ${p} buah persegi. Banyak titik sudut seluruhnya adalah …`, 3 * s + 4 * p, { petunjuk: "Segitiga punya 3 titik sudut, persegi punya 4 titik sudut.", bahas: `${s} × 3 + ${p} × 4 = ${3 * s} + ${4 * p} = ${3 * s + 4 * p}.` }); },
  ],
  3: [
    () => { const b = pilih(RUANG.slice(0, 5)), k = pilih(["sisi", "rusuk", "titik"]); return isian(`Banyak ${k === "titik" ? "titik sudut" : k} pada bangun ${b.n} adalah …`, b[k], { petunjuk: "Bayangkan atau gambar bangunnya.", bahas: `${b.n}: ${b.sisi} sisi, ${b.rusuk} rusuk, ${b.titik} titik sudut.` }); },
    () => { const [b, c] = ambil(RUANG.slice(0, 5), 2), [k1, k2] = [pilih(["sisi", "rusuk", "titik"]), pilih(["sisi", "rusuk", "titik"])], nm = k => (k === "titik" ? "titik sudut" : k);
      return isian(`Banyak ${nm(k1)} ${b.n} ditambah banyak ${nm(k2)} ${c.n} adalah …`, b[k1] + c[k2], { bahas: `${b[k1]} + ${c[k2]} = ${b[k1] + c[k2]}.` }); },
  ],
  4: [
    () => { const b = pilih(DATAR.filter(x => x.lipat !== null && x.lipat !== undefined)); return isian(`Banyak simetri lipat (sumbu simetri) pada bangun <b>${b.n}</b> adalah …`, b.lipat, { petunjuk: "Berapa cara melipat bangun itu sehingga kedua bagian tepat berimpit?", bahas: `${b.n} memiliki ${b.lipat} simetri lipat.` }); },
    () => { const b = pilih(DATAR.filter(x => x.putar)); return isian(`Tingkat simetri putar bangun <b>${b.n}</b> adalah …`, b.putar, { petunjuk: "Berapa kali bangun menempati bingkainya dalam satu putaran penuh?", bahas: `${b.n} memiliki simetri putar tingkat ${b.putar}.` }); },
    () => { const n = pilih([3, 4, 5, 6, 7, 8, 9, 10, 12]), lip = ya(); return isian(`Gambar di bawah adalah <b>${NAMA_SEGI(n)}</b> (semua sisi dan sudutnya sama besar). ${lip ? "Banyak simetri lipatnya" : "Tingkat simetri putarnya"} adalah …`, n,
      { gambar: svgPoligon(segiBeraturan(n, acak(0, 71) * 5), {}, { label: NAMA_SEGI(n) }), petunjuk: lip ? "Pada bangun beraturan, banyak simetri lipat = banyak sisinya." : "Pada bangun beraturan, tingkat simetri putar = banyak sisinya.", bahas: `${NAMA_SEGI(n)} punya ${n} sisi sama panjang, jadi ${lip ? `simetri lipatnya ${n}` : `simetri putarnya tingkat ${n}`}.` }); },
    () => { const k = pilih([4, 5, 6, 8]), lip = ya(); return isian(`Gambar di bawah adalah bintang bersudut ${k} yang beraturan. ${lip ? "Banyak simetri lipatnya" : "Tingkat simetri putarnya"} adalah …`, k,
      { gambar: svgPoligon(bintangP(k, acak(0, 71) * 5), {}, { label: `bintang ${k} sudut` }), petunjuk: "Hitung ujung-ujung bintangnya. Setiap ujung punya garis lipat yang melewatinya.", bahas: `Bintang beraturan bersudut ${k} memiliki ${k} simetri lipat dan simetri putar tingkat ${k}.` }); },
    () => { const b = pilih(BANGUN_GBR)(); return isian(`Gambar di bawah adalah bangun <b>${b.n}</b>. Banyak simetri lipatnya adalah …`, b.lipat,
      { gambar: svgPoligon(putarP(b.P, acak(0, 35) * 10), {}, { label: b.n }), petunjuk: "Bayangkan bangun dilipat. Kedua bagian harus tepat berimpit. Jika tidak ada, jawab 0.", bahas: b.lipat ? `${b.n} memiliki ${b.lipat} simetri lipat.` : `${b.n} tidak memiliki simetri lipat, jadi jawabannya 0.` }); },
    () => { const b = pilih(BANGUN_GBR.filter((f, i) => [0, 1, 3, 7].includes(i)))(); return isian(`Gambar di bawah adalah bangun <b>${b.n}</b>. Tingkat simetri putarnya adalah …`, b.putar,
      { gambar: svgPoligon(putarP(b.P, acak(0, 35) * 10), {}, { label: b.n }), petunjuk: "Putar bangun satu putaran penuh. Berapa kali ia tepat menempati bingkainya?", bahas: `${b.n} memiliki simetri putar tingkat ${b.putar}.` }); },
    () => { const lip = ya(), [ada, tak] = lip ? [HURUF_LIPAT, HURUF_TANPA_LIPAT] : [HURUF_PUTAR, HURUF_TANPA_PUTAR], k = acak(1, 4), h = kocok([...ambil(ada, k), ...ambil(tak, 6 - k)]);
      return isian(`Perhatikan huruf-huruf kapital berikut.<br><b>${h.join("&nbsp;&nbsp;")}</b><br>Banyak huruf yang memiliki ${lip ? "simetri lipat" : "simetri putar"} adalah …`, k,
        { petunjuk: lip ? "Bayangkan huruf dilipat tegak atau mendatar. Kedua bagian harus sama persis." : "Putar huruf setengah putaran. Apakah bentuknya tetap sama?", bahas: `Huruf yang memiliki ${lip ? "simetri lipat" : "simetri putar"}: ${h.filter(x => ada.includes(x)).join(", ")} (${k} huruf).` }); },
    () => { const n = pilih([3, 4, 5, 6, 8, 9, 10, 12]); return isian(`Sebuah ${NAMA_SEGI(n)} diputar pada titik pusatnya. Sudut putar terkecil agar bangun itu tepat menempati bingkainya kembali adalah …°`, 360 / n,
      { satuan: "°", gambar: svgPoligon(segiBeraturan(n, acak(0, 71) * 5), {}, { label: NAMA_SEGI(n) }), petunjuk: "Satu putaran penuh = 360°. Bagi dengan tingkat simetri putarnya.", bahas: `Tingkat simetri putar ${n}, jadi 360° : ${n} = ${360 / n}°.` }); },
  ],
  5: [
    () => { const n = acak(3, 8), jenis = ya() ? "prisma" : "limas", t = jenis === "prisma" ? "persegi panjang" : "segitiga"; return isian(`Banyak sisi tegak berbentuk ${t} pada <b>${jenis} ${SEGI[n]}</b> adalah …`, n, { petunjuk: "Sisi tegak sebanyak sisi alasnya.", bahas: `Alas ${SEGI[n]} punya ${n} sisi, jadi ada ${n} sisi tegak.` }); },
    () => { const [t, v] = pilih([["sisi berbentuk persegi pada kubus", 6], ["sisi berbentuk lingkaran pada tabung", 2], ["sisi berbentuk lingkaran pada kerucut", 1], ["sisi berbentuk segitiga pada prisma segitiga", 2], ["sisi berbentuk segitiga pada limas segitiga", 4], ["sisi lengkung pada tabung", 1], ["titik sudut pada limas segiempat", 5], ["rusuk tegak pada balok", 4]]);
      return isian(`Banyak ${t} adalah …`, v, { bahas: `Jawabannya ${v}.` }); },
    () => { const b = pilih(RUANG.slice(0, 5)), k = acak(2, 4), x = pilih(["rusuk", "titik"]); return isian(`${nama()} membuat ${k} kerangka ${b.n} dari sedotan. Banyak ${x === "titik" ? "sambungan (titik sudut)" : "sedotan (rusuk)"} yang diperlukan adalah …`, k * b[x], { bahas: `${k} × ${b[x]} = ${k * b[x]}.` }); },
    keTKA(() => { const b = pilih(RUANG); return pg(`Bangun ruang yang memiliki ${b.ciri} adalah …`, b.n, kocok(RUANG.filter(x => x !== b)).map(x => x.n), { bahas: `Itu ciri ${b.n}.` }); }, 7),
    keTKA(() => { const b = pilih(RUANG); return pg(`Ciri-ciri bangun ruang <b>${b.n}</b> adalah …`, b.ciri, kocok(RUANG.filter(x => x !== b)).map(x => x.ciri), { bahas: `${b.n}: ${b.ciri}.` }); }, 7),
    keTKA(() => { const b = pilih(RUANG.slice(2, 5)); return pg(`Bangun ruang yang memiliki ${b.sisi} sisi, ${b.rusuk} rusuk, dan ${b.titik} titik sudut adalah …`, b.n, kocok(RUANG.filter(x => x.n !== b.n)).map(x => x.n),
      { bahas: `${b.n}: ${b.sisi} sisi, ${b.rusuk} rusuk, ${b.titik} titik sudut.` }); }, 7),
  ],
  6: [() => { const j = ubahJaring(ya() ? jaring141() : pilih(JARING_LAIN)); return pgTetap(`Apakah gambar di bawah merupakan jaring-jaring kubus?`, ["Ya, jaring-jaring kubus", "Bukan jaring-jaring kubus"], j.sah ? "Ya, jaring-jaring kubus" : "Bukan jaring-jaring kubus",
    { gambar: svgJaring(j), petunjuk: "Bayangkan melipatnya. Tidak boleh ada dua persegi yang menjadi sisi yang sama.", bahas: j.sah ? "Jika dilipat, keenam persegi menutup kubus tanpa tumpang tindih." : "Jika dilipat, ada sisi yang bertumpuk dan ada sisi kubus yang tidak tertutup." }); },
    () => { const j = ubahJaring(jaring141()), s = acak(2, 12); return isian(`Jaring-jaring kubus di bawah tersusun dari persegi-persegi yang panjang sisinya ${s} cm. Luas seluruh jaring-jaring itu adalah … cm².`, 6 * s * s,
      { gambar: svgJaring(j), satuan: "cm²", petunjuk: "Hitung banyak persegi, lalu kalikan dengan luas satu persegi.", bahas: `Ada 6 persegi. Luas 6 × ${s} × ${s} = ${6 * s * s} cm².` }); }],
  7: [() => { const sifat = pilih([["memiliki 4 sudut siku-siku", ["persegi", "persegi panjang"]], ["memiliki 4 sisi sama panjang", ["persegi", "belah ketupat"]], ["memiliki tepat 2 simetri lipat", ["persegi panjang", "belah ketupat"]], ["memiliki simetri putar tingkat 2", ["persegi panjang", "belah ketupat", "jajar genjang"]], ["memiliki 3 sisi", ["segitiga sama sisi", "segitiga sama kaki", "segitiga siku-siku"]]]);
    const calon = kocok(["persegi", "persegi panjang", "belah ketupat", "jajar genjang", "layang-layang", "trapesium", "segitiga sama sisi", "segitiga sama kaki", "segitiga siku-siku"]).slice(0, 5); sifat[1].forEach(x => { if (!calon.includes(x) && calon.length < 6) calon.push(x); });
    return pgk(`Pilih <b>semua</b> bangun datar yang ${sifat[0]}.`, calon.map(n => ({ t: n, b: sifat[1].includes(n) })), { bahas: `Yang ${sifat[0]}: ${sifat[1].join(", ")}.` }); }],
  8: [() => { const b = pilih(RUANG.slice(0, 5)), salah = pilih(["sisi", "rusuk", "titik"]);
    return bs(`Tentukan Benar atau Salah tentang bangun <b>${b.n}</b>.`, ["sisi", "rusuk", "titik"].map(k => ({ t: `Memiliki ${k === salah ? b[k] + pilih([1, 2, -1]) : b[k]} ${k === "titik" ? "titik sudut" : k}.`, b: k !== salah })).concat([{ t: `Memiliki ${b.ciri}.`, b: true }]),
      { bahas: `${b.n}: ${b.sisi} sisi, ${b.rusuk} rusuk, ${b.titik} titik sudut.` }); },
    () => { const n = acak(3, 8), jenis = ya() ? "prisma" : "limas", d = jenis === "prisma" ? prisma(n) : limas(n), tegak = jenis === "prisma" ? "persegi panjang" : "segitiga", nm = k => (k === "titik" ? "titik sudut" : k);
      const butir = ["sisi", "rusuk", "titik"].map(k => { const b = ya(); return { t: `Memiliki ${b ? d[k] : d[k] + pilih([1, 2, -1, n])} ${nm(k)}.`, b }; });
      const bt = ya(); butir.push({ t: `Sisi tegaknya berbentuk ${bt ? tegak : jenis === "prisma" ? "segitiga" : "persegi panjang"}.`, b: bt });
      if (butir.every(x => x.b)) butir[0] = { t: `Memiliki ${d.sisi + 1} sisi.`, b: false };
      return bs(`Tentukan Benar atau Salah tentang bangun <b>${jenis} ${SEGI[n]}</b>.`, butir, { petunjuk: jenis === "prisma" ? "Prisma segi-n: sisi n + 2, rusuk 3 × n, titik sudut 2 × n." : "Limas segi-n: sisi n + 1, rusuk 2 × n, titik sudut n + 1.", bahas: `${jenis} ${SEGI[n]}: ${d.sisi} sisi, ${d.rusuk} rusuk, ${d.titik} titik sudut, sisi tegak berbentuk ${tegak}.` }); },
    () => { const kubus = ya(), x = nama(), k = acak(1, 4); let p, l, t; if (kubus) p = l = t = acak(5, 30); else { p = acak(10, 40); l = acak(5, p - 1); t = acak(4, 25); } const K = 4 * (p + l + t) * k;
      return isian(`${x} akan membuat ${k > 1 ? k + " buah " : ""}kerangka ${kubus ? `kubus dengan panjang rusuk ${p} cm` : `balok berukuran ${p} cm × ${l} cm × ${t} cm`} dari kawat. Panjang kawat yang diperlukan adalah … cm.`, K,
        { satuan: "cm", petunjuk: kubus ? "Kubus memiliki 12 rusuk yang sama panjang." : "Balok memiliki 4 rusuk panjang, 4 rusuk lebar, dan 4 rusuk tinggi.", bahas: kubus ? `12 × ${p}${k > 1 ? ` × ${k}` : ""} = ${fmt(K)} cm.` : `4 × (${p} + ${l} + ${t})${k > 1 ? ` × ${k}` : ""} = ${fmt(K)} cm.` }); },
    () => { const n = acak(3, 9), jenis = ya() ? "prisma" : "limas", d = jenis === "prisma" ? prisma(n) : limas(n), nmB = (j, m) => `${j} ${SEGI[m]}`;
      const lawan = jenis === "prisma" ? "limas" : "prisma", salah = [nmB(lawan, n), nmB(jenis, n + 1), nmB(jenis, n === 3 ? 5 : n - 1), nmB(lawan, n + 1)];
      return pg(`Sebuah bangun ruang memiliki ${d.sisi} sisi, ${d.rusuk} rusuk, dan ${d.titik} titik sudut. Bangun ruang itu adalah …`, nmB(jenis, n), salah,
        { petunjuk: "Prisma segi-n: rusuk = 3 × n. Limas segi-n: rusuk = 2 × n.", bahas: `${d.rusuk} rusuk dan ${d.titik} titik sudut cocok dengan ${nmB(jenis, n)} (n = ${n}).` }); },
  ],
  9: [() => { const n = pilih([5, 6, 7, 8, 9, 10, 12]), jenis = ya() ? "prisma" : "limas", d = jenis === "prisma" ? prisma(n) : limas(n), k = pilih(["sisi", "rusuk", "titik"]);
    return isian(`Banyak ${k === "titik" ? "titik sudut" : k} pada bangun <b>${jenis} ${SEGI[n]}</b> adalah …`, d[k], { petunjuk: jenis === "prisma" ? "Prisma segi-n: sisi n + 2, rusuk 3 × n, titik sudut 2 × n." : "Limas segi-n: sisi n + 1, rusuk 2 × n, titik sudut n + 1.", bahas: `${jenis} ${SEGI[n]}: ${d.sisi} sisi, ${d.rusuk} rusuk, ${d.titik} titik sudut.` }); },
    () => { const p = acak(8, 30), l = acak(5, p - 1), t = acak(4, 20), K = 4 * (p + l + t), M = Math.floor(K / 100) + acak(1, 3);
      return isian(`${nama()} mempunyai kawat sepanjang ${M} m. Kawat itu dipakai untuk membuat kerangka balok berukuran ${p} cm × ${l} cm × ${t} cm. Sisa kawat adalah … cm.`, M * 100 - K,
        { satuan: "cm", petunjuk: "Samakan satuan. Panjang kerangka balok = 4 × (p + l + t).", bahas: `Kerangka 4 × (${p} + ${l} + ${t}) = ${K} cm. ${M * 100} − ${K} = ${M * 100 - K} cm.` }); },
    () => { const s = acak(5, 20), M = acak(3, 12), n = Math.floor(M * 100 / (12 * s)); if (n < 1) return isian(`Kawat 3 m cukup untuk kerangka kubus rusuk 10 cm paling banyak … buah.`, 2, { satuan: "buah", bahas: "300 : 120 = 2 sisa 60." });
      return isian(`Kawat sepanjang ${M} m akan dibuat kerangka kubus dengan panjang rusuk ${s} cm. Kerangka kubus yang dapat dibuat paling banyak adalah … buah.`, n,
        { satuan: "buah", petunjuk: "Satu kerangka kubus = 12 rusuk. Bulatkan ke bawah: kerangka harus utuh!", bahas: `Satu kerangka 12 × ${s} = ${12 * s} cm. ${fmt(M * 100)} : ${12 * s} = ${fmt(bulat(M * 100 / (12 * s), 2))} → ${n} buah.` }); },
    () => { const n = pilih([3, 4, 5, 6, 8, 9, 10, 12]), tanya = ya(); return isian(`Sebuah bangun datar beraturan memiliki sudut putar terkecil ${360 / n}° (bangun tepat menempati bingkainya setiap diputar ${360 / n}°). ${tanya ? "Banyak sisi" : "Banyak simetri lipat"} bangun itu adalah …`, n,
      { petunjuk: "Tingkat simetri putar = 360° : sudut putar terkecil.", bahas: `360° : ${360 / n}° = ${n}. Bangun itu ${NAMA_SEGI(n)}: ${n} sisi dan ${n} simetri lipat.` }); },
  ],
  10: [
    () => { const j = ubahJaring(jaring141()), hur = kocok(["A", "B", "C", "D", "E", "F"]), i = acak(0, 5), pas = j.hadap.find(p => p.includes(i)), o = pas[0] === i ? pas[1] : pas[0];
      return pg(`Jaring-jaring di bawah dilipat menjadi kubus. Sisi yang <b>berhadapan</b> dengan sisi <b>${hur[i]}</b> adalah sisi …`, hur[o], hur.filter((_, k) => k !== i && k !== o),
        { gambar: svgJaring(j, hur), petunjuk: "Pada barisan 4 persegi, sisi yang berhadapan dipisahkan satu persegi.", bahas: `Sisi ${hur[i]} berhadapan dengan sisi ${hur[o]}.` }); },
    () => { const n = pilih([5, 6, 7, 8, 9, 10, 12]), jenis = ya() ? "prisma" : "limas", d = jenis === "prisma" ? prisma(n) : limas(n), k = pilih(["rusuk", "sisi"]), t = pilih(["titik", "sisi", "rusuk"].filter(x => x !== k));
      return isian(`Sebuah ${jenis} memiliki ${d[k]} ${k}. Banyak ${t === "titik" ? "titik sudut" : t} ${jenis} itu adalah …`, d[t], { petunjuk: "Tentukan dulu bentuk alasnya (segi berapa).", bahas: `Alasnya ${SEGI[n]} (n = ${n}). ${jenis}: ${d.sisi} sisi, ${d.rusuk} rusuk, ${d.titik} titik sudut.` }); },
    () => { const j = ubahJaring(jaring141()), angka = [0, 0, 0, 0, 0, 0]; const pas = kocok(j.hadap); const nilai = kocok([[1, 6], [2, 5], [3, 4]]); pas.forEach((p, k) => { const b = ya(); angka[p[0]] = nilai[k][b ? 0 : 1]; angka[p[1]] = nilai[k][b ? 1 : 0]; });
      const i = acak(0, 5), lbl = angka.map((v, k) => (k === i ? "?" : v));
      return isian(`Jaring-jaring di bawah akan dilipat menjadi dadu. Pada dadu, jumlah mata yang berhadapan selalu 7. Angka yang tepat untuk menggantikan <b>?</b> adalah …`, angka[i], { gambar: svgJaring(j, lbl), petunjuk: "Cari sisi yang berhadapan dengan tanda ?", bahas: `Sisi ? berhadapan dengan ${angka[j.hadap.find(p => p.includes(i)).find(x => x !== i)]}, jadi ? = ${angka[i]}.` }); },
  ],
});

/* ================= Misi 7: Denah & koordinat ================= */
function svgKoord(titik, o = {}) { const u = 26, n = o.n || 8, m = 26; let s = svgBuka(n * u + m + 16, n * u + m + 26, "bidang koordinat");
  const X = x => m + x * u, Y = y => n * u + 18 - y * u;
  for (let i = 0; i <= n; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(n)}" class="kisi"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(n)}" y2="${Y(i)}" class="kisi"/>` + svgT(X(i), Y(0) + 15, i, 'text-anchor="middle" class="kecil"') + (i ? svgT(X(0) - 8, Y(i) + 4, i, 'text-anchor="end" class="kecil"') : "");
  s += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(n)}" y2="${Y(0)}" class="sumbu"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(n)}" class="sumbu"/>`;
  if (o.poligon) s += `<polygon points="${o.poligon.map(p => X(p[0]) + "," + Y(p[1])).join(" ")}" class="arsir"/>`;
  titik.forEach(t => { s += `<circle cx="${X(t.x)}" cy="${Y(t.y)}" r="4.5" class="titik-k"/>` + svgT(X(t.x) + 7, Y(t.y) - 6, t.n, 'class="lbl"'); });
  return s + "</svg>"; }
const titikAcak = (k, n = 8) => { const h = [], dipakai = new Set(); const hur = ["A", "B", "C", "D", "E", "F", "G", "H"]; while (h.length < k) { const x = acak(1, n), y = acak(1, n); if (!dipakai.has(x + "," + y)) { dipakai.add(x + "," + y); h.push({ n: hur[h.length], x, y }); } } return h; };
const kd = (x, y) => `(${x}, ${y})`;
const TEMPAT_DENAH = [["🏫", "Sekolah"], ["🏠", "Rumah"], ["🕌", "Masjid"], ["🏥", "Puskesmas"], ["🛒", "Pasar"], ["📚", "Perpustakaan"], ["⚽", "Lapangan"], ["🏦", "Bank"], ["🌳", "Taman"]];
function denahAcak(k) { const t = ambil(TEMPAT_DENAH, k), dip = new Set(); return t.map(([ik, nm]) => { let x, y; do { x = acak(0, 5); y = acak(0, 5); } while (dip.has(x + "," + y)); dip.add(x + "," + y); return { ik, nm, x, y }; }); }
/* Nama tempat panjang (mis. Perpustakaan) dipadatkan agar tetap di dalam kotaknya */
function svgDenah(T) { const u = 52; let s = svgBuka(6 * u + 60, 6 * u + 30, "denah");
  for (let i = 0; i <= 6; i++) s += `<line x1="${10 + i * u}" y1="20" x2="${10 + i * u}" y2="${20 + 6 * u}" class="kisi"/><line x1="10" y1="${20 + i * u}" x2="${10 + 6 * u}" y2="${20 + i * u}" class="kisi"/>`;
  T.forEach(t => { s += svgT(10 + t.x * u + u / 2, 20 + (5 - t.y) * u + u / 2 + 2, t.ik, 'text-anchor="middle" class="emoji"') + svgT(10 + t.x * u + u / 2, 20 + (5 - t.y) * u + u - 4, t.nm, 'text-anchor="middle" class="mini"' + (t.nm.length > 7 ? ` textLength="${u - 6}" lengthAdjust="spacingAndGlyphs"` : "")); });
  s += `<g transform="translate(${6 * u + 36},40)"><line x1="0" y1="18" x2="0" y2="-12" class="kaki"/><path d="M-5 -6L0 -16L5 -6Z" class="panah"/>${svgT(0, 34, "U", 'text-anchor="middle" class="lbl"')}</g>`;
  return s + "</svg>"; }
const ARAH = (dx, dy) => (dx === 0 ? (dy > 0 ? "utara" : "selatan") : dy === 0 ? (dx > 0 ? "timur" : "barat") : dy > 0 ? (dx > 0 ? "timur laut" : "barat laut") : dx > 0 ? "tenggara" : "barat daya");
const SEMUA_ARAH = ["utara", "selatan", "timur", "barat", "timur laut", "barat laut", "tenggara", "barat daya"];
/* Dua tempat pada denah yang sejajar (satu baris atau satu kolom) / tidak sejajar */
const denahSejajar = sejajar => { let T, a, b; do { T = denahAcak(5); [a, b] = ambil(T, 2); } while (sejajar ? (a.x !== b.x && a.y !== b.y) : (a.x === b.x || a.y === b.y)); return { T, a, b }; };
/* Cetakan tambahan Misi 7 (denah & koordinat) per level */
const U7T = {
  3: [
    () => { const T = titikAcak(5), k = acak(2, 6), m = ya(), v = T.filter(t => (m ? t.x : t.y) > k).length;
      return isian(`Perhatikan gambar. Banyak titik yang angka ${m ? "mendatarnya (angka pertama)" : "tegaknya (angka kedua)"} lebih dari ${k} adalah …`, v, { gambar: svgKoord(T), satuan: "titik", petunjuk: m ? "Lihat angka di bawah setiap titik." : "Lihat angka di kiri setiap titik.", bahas: `Titik-titik: ${T.map(t => t.n + kd(t.x, t.y)).join(", ")}. Yang memenuhi ada ${v} titik.` }); },
    () => { const y = acak(0, 9), x1 = acak(0, 6), x2 = x1 + acak(2, 9), m = ya(), A = m ? kd(x1, y) : kd(y, x1), B = m ? kd(x2, y) : kd(y, x2);
      return isian(`Titik A${A} dan titik B${B} terletak pada satu garis ${m ? "mendatar" : "tegak"}. Jarak titik A ke titik B adalah … satuan.`, x2 - x1, { satuan: "satuan", petunjuk: m ? "Angka keduanya sama. Kurangkan angka pertamanya." : "Angka pertamanya sama. Kurangkan angka keduanya.", bahas: `${x2} − ${x1} = ${x2 - x1} satuan.` }); },
    () => { const y = acak(1, 8), x1 = acak(0, 2), x2 = x1 + 2 * acak(1, 3), mend = ya(), T = mend ? [{ n: "P", x: x1, y }, { n: "Q", x: x2, y }] : [{ n: "P", x: y, y: x1 }, { n: "Q", x: y, y: x2 }], tg = (x1 + x2) / 2;
      return isian(`Titik R terletak tepat di tengah-tengah titik P dan titik Q. Angka ${mend ? "pertama (mendatar)" : "kedua (tegak)"} pada koordinat titik R adalah …`, tg, { gambar: svgKoord(T), petunjuk: "Hitung jarak P ke Q, lalu ambil setengahnya dari P.", bahas: `Jarak P ke Q ${x2 - x1} satuan, setengahnya ${(x2 - x1) / 2}. ${x1} + ${(x2 - x1) / 2} = ${tg}. R = ${mend ? kd(tg, y) : kd(y, tg)}.` }); },
    () => { const { T, a, b } = denahSejajar(true), k = Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
      return isian(`Perhatikan denah. ${a.nm} dan ${b.nm} terletak segaris. Jarak dari ${a.nm} ke ${b.nm} (dari tengah kotak ke tengah kotak) adalah … kotak.`, k, { gambar: svgDenah(T), satuan: "kotak", petunjuk: "Hitung berapa kali melangkah dari kotak ke kotak.", bahas: `Dari ${a.nm} ke ${b.nm} ada ${k} langkah kotak.` }); },
    () => { const x = acak(0, 6), y = acak(0, 6), k = acak(1, 5), kn = ya(), pert = ya(), nx = kn ? x + k : x, ny = kn ? y : y + k;
      return isian(`Titik P${kd(x, y)} digeser ${k} satuan ke ${kn ? "kanan" : "atas"}. Angka ${pert ? "pertama" : "kedua"} pada koordinat titik barunya adalah …`, pert ? nx : ny, { petunjuk: "Geser ke kanan mengubah angka pertama. Geser ke atas mengubah angka kedua.", bahas: `${kd(x, y)} → ${kd(nx, ny)}. Angka ${pert ? "pertama" : "kedua"}nya ${pert ? nx : ny}.` }); },
  ],
  4: [
    () => { let T; do { T = titikAcak(2); } while (T[0].x === T[1].x || T[0].y === T[1].y); const [a, b] = T, k = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
      return isian(`Seekor semut berjalan dari titik ${a.n} ke titik ${b.n} hanya melalui garis-garis kisi (mendatar atau tegak). Jarak terpendek yang ditempuh semut adalah … satuan.`, k, { gambar: svgKoord(T), satuan: "satuan", petunjuk: "Jumlahkan jarak mendatar dan jarak tegaknya.", bahas: `Mendatar ${Math.abs(a.x - b.x)} satuan, tegak ${Math.abs(a.y - b.y)} satuan. Jumlah ${k} satuan.` }); },
    () => { let x1, y1, x2, y2; do { x1 = acak(0, 3); y1 = acak(0, 3); x2 = acak(x1 + 2, 8); y2 = acak(y1 + 2, 8); } while (x2 - x1 === y2 - y1); const P = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
      return isian(`Keliling persegi panjang ABCD pada gambar adalah … satuan.`, 2 * (x2 - x1 + y2 - y1), { gambar: svgKoord(P.map((p, i) => ({ n: "ABCD"[i], x: p[0], y: p[1] })), { poligon: P }), satuan: "satuan", petunjuk: "Hitung panjang dan lebarnya dari kotak-kotak.", bahas: `Panjang ${x2 - x1}, lebar ${y2 - y1}. Keliling 2 × (${x2 - x1} + ${y2 - y1}) = ${2 * (x2 - x1 + y2 - y1)} satuan.` }); },
    () => { const { T, a, b } = denahSejajar(false), dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
      return isian(`Perhatikan denah. ${nama()} berjalan dari ${a.nm} ke ${b.nm} menyusuri kotak-kotak (hanya ke utara, selatan, timur, atau barat). Paling sedikit ia melewati … langkah kotak.`, dx + dy, { gambar: svgDenah(T), satuan: "langkah", petunjuk: "Hitung langkah mendatar dan langkah tegak, lalu jumlahkan.", bahas: `${dx} langkah ke ${b.x > a.x ? "timur" : "barat"} dan ${dy} langkah ke ${b.y > a.y ? "utara" : "selatan"}. Jumlah ${dx + dy} langkah.` }); },
    () => { const { T, a, b } = denahSejajar(true), k = Math.abs(b.x - a.x) + Math.abs(b.y - a.y), m = pilih([10, 20, 25, 50, 100]);
      return isian(`Perhatikan denah. Setiap kotak pada denah mewakili jarak sebenarnya ${m} m. Jarak sebenarnya dari ${a.nm} ke ${b.nm} (dari tengah kotak ke tengah kotak) adalah … m.`, k * m, { gambar: svgDenah(T), satuan: "m", petunjuk: "Hitung banyak kotak, lalu kalikan.", bahas: `${k} kotak × ${m} m = ${k * m} m.` }); },
  ],
  5: [
    () => { const sk = pilih([100, 200, 250, 500, 1000]), cm = acak(2, 15), m = cm * sk / 100;
      return isian(`Jarak sebenarnya antara dua pohon ${fmt(m)} m. Pada denah berskala 1 : ${fmt(sk)}, jarak kedua pohon itu adalah … cm.`, cm, { satuan: "cm", petunjuk: "Ubah meter ke cm dulu, lalu bagi dengan angka skala.", bahas: `${fmt(m)} m = ${fmt(m * 100)} cm. ${fmt(m * 100)} : ${fmt(sk)} = ${cm} cm.` }); },
    () => { const sk = pilih([100000, 200000, 250000, 500000, 1000000]), cm = acak(2, 12), km = cm * sk / 100000;
      return isian(`Jarak sebenarnya kota A ke kota B ${fmt(km)} km. Pada peta berskala 1 : ${fmt(sk)}, jarak kedua kota itu adalah … cm.`, cm, { satuan: "cm", petunjuk: "1 km = 100.000 cm. Ubah ke cm, lalu bagi dengan angka skala.", bahas: `${fmt(km)} km = ${fmt(km * 100000)} cm. ${fmt(km * 100000)} : ${fmt(sk)} = ${cm} cm.` }); },
    () => { const sk = pilih([200, 250, 400, 500, 1000]), cm = acak(5, 20), m = cm * sk / 100, b = pilih(["taman", "kebun", "halaman sekolah", "lapangan"]);
      return isian(`Panjang sebuah ${b} ${fmt(m)} m. Pada denah, panjangnya digambar ${cm} cm. Skala denah itu adalah 1 : …`, sk, { petunjuk: "Ubah meter ke cm, lalu bagi dengan panjang pada denah.", bahas: `${fmt(m)} m = ${fmt(m * 100)} cm. ${fmt(m * 100)} : ${cm} = ${fmt(sk)}. Skala 1 : ${fmt(sk)}.` }); },
    () => { const x1 = acak(0, 4), y1 = acak(0, 4), dx = acak(2, 6), x2 = x1 + dx, y2 = y1 + pilih([2, 3, 4, 5, 6].filter(d => d !== dx)), luas = ya();
      return isian(`Titik A${kd(x1, y1)}, B${kd(x2, y1)}, C${kd(x2, y2)}, dan D${kd(x1, y2)} adalah titik sudut sebuah persegi panjang. ${luas ? "Luas" : "Keliling"} persegi panjang ABCD adalah … ${luas ? "satuan luas" : "satuan"}.`, luas ? (x2 - x1) * (y2 - y1) : 2 * (x2 - x1 + y2 - y1),
        { satuan: luas ? "satuan luas" : "satuan", petunjuk: "Panjang = selisih angka pertama. Lebar = selisih angka kedua.", bahas: `Panjang ${x2} − ${x1} = ${x2 - x1}, lebar ${y2} − ${y1} = ${y2 - y1}. ${luas ? `Luas ${x2 - x1} × ${y2 - y1} = ${(x2 - x1) * (y2 - y1)}` : `Keliling 2 × (${x2 - x1} + ${y2 - y1}) = ${2 * (x2 - x1 + y2 - y1)}`}.` }); },
    () => { const sk = pilih([200, 400, 500, 1000, 2000]), c = acak(2, 12) + 0.5, m = c * sk / 100, x = nama();
      return isian(`Pada denah berskala 1 : ${fmt(sk)}, jarak rumah ${x} ke sekolah ${fmt(c)} cm. Jarak sebenarnya adalah … m.`, m, { satuan: "m", petunjuk: "Jarak sebenarnya = jarak denah × skala. Lalu ubah cm ke m.", bahas: `${fmt(c)} × ${fmt(sk)} = ${fmt(c * sk)} cm = ${fmt(m)} m.` }); },
  ],
};
daftarMisi("ukr", "u7", "Denah & koordinat", "🗺️", {
  1: [
    () => { const T = titikAcak(3), t = pilih(T), m = ya(); return isian(`Pada gambar, titik <b>${t.n}</b> berada ${m ? "berapa satuan ke <b>kanan</b>" : "berapa satuan ke <b>atas</b>"} dari titik 0? Jawabannya …`, m ? t.x : t.y, { gambar: svgKoord(T), satuan: "satuan", petunjuk: m ? "Lihat angka di bawah titik (sumbu mendatar)." : "Lihat angka di kiri titik (sumbu tegak).", bahas: `Titik ${t.n} = ${kd(t.x, t.y)}.` }); },
    keTKA(() => { const T = titikAcak(3), t = T[0]; return pg(`Koordinat titik <b>${t.n}</b> adalah …`, kd(t.x, t.y), [kd(t.y, t.x), kd(t.x + 1, t.y), kd(t.x, t.y - 1), kd(t.x - 1, t.y + 1)], { gambar: svgKoord(T), petunjuk: "Tulis (mendatar, tegak): ke kanan dulu, baru ke atas.", bahas: `Titik ${t.n} berada ${t.x} ke kanan dan ${t.y} ke atas: ${kd(t.x, t.y)}.` }); }),
  ],
  2: [
    () => { const T = titikAcak(4), t = pilih(T), m = ya(); return isian(`Koordinat titik <b>${t.n}</b> adalah ${m ? `(□, ${t.y})` : `(${t.x}, □)`}. Nilai □ adalah …`, m ? t.x : t.y, { gambar: svgKoord(T), petunjuk: "Koordinat ditulis (mendatar, tegak).", bahas: `Titik ${t.n} = ${kd(t.x, t.y)}.` }); },
    () => { const T = titikAcak(4), [p, q] = ambil(T, 2); return isian(`Jumlah angka mendatar titik ${p.n} dan angka tegak titik ${q.n} adalah …`, p.x + q.y, { gambar: svgKoord(T), bahas: `${p.n}${kd(p.x, p.y)}, ${q.n}${kd(q.x, q.y)}. ${p.x} + ${q.y} = ${p.x + q.y}.` }); },
    keTKA(() => { const T = titikAcak(4), t = pilih(T); return pg(`Titik yang terletak pada koordinat <b>${kd(t.x, t.y)}</b> adalah titik …`, t.n, T.filter(x => x !== t).map(x => x.n), { gambar: svgKoord(T), bahas: `Titik ${t.n} = ${kd(t.x, t.y)}.` }); }),
  ],
  3: [() => { const y = acak(1, 8), x1 = acak(0, 3), x2 = acak(5, 8), mendatar = ya(); const T = mendatar ? [{ n: "P", x: x1, y }, { n: "Q", x: x2, y }] : [{ n: "P", x: y, y: x1 }, { n: "Q", x: y, y: x2 }];
    return isian(`Jarak titik P ke titik Q adalah … satuan.`, x2 - x1, { gambar: svgKoord(T), satuan: "satuan", bahas: `Jaraknya ${x2} − ${x1} = ${x2 - x1} satuan.` }); }, ...U7T[3]],
  4: [
    () => { const T = titikAcak(1, 5), t = T[0], dx = acak(1, 3), dy = acak(1, 3), mend = ya(), nx = t.x + dx, ny = t.y + dy;
      return isian(`Titik <b>${t.n}</b> digeser ${dx} satuan ke kanan dan ${dy} satuan ke atas. Koordinat ${mend ? "mendatar (angka pertama)" : "tegak (angka kedua)"} titik barunya adalah …`, mend ? nx : ny, { gambar: svgKoord(T), petunjuk: "Ke kanan menambah angka pertama, ke atas menambah angka kedua.", bahas: `${kd(t.x, t.y)} → ${kd(nx, ny)}.` }); },
    keTKA(() => { const T = titikAcak(1, 5), t = T[0], dx = acak(1, 3), dy = acak(1, 3), ka = ya(), at = ya(); const nx = t.x + (ka ? dx : -dx), ny = t.y + (at ? dy : -dy); if (nx < 0 || ny < 0) return pg(`Titik A(2, 3) digeser 2 satuan ke kanan. Koordinatnya menjadi …`, kd(4, 3), [kd(2, 5), kd(0, 3), kd(4, 5)], { bahas: "(4, 3)." });
    return pg(`Titik <b>${t.n}</b> digeser ${dx} satuan ke ${ka ? "kanan" : "kiri"} dan ${dy} satuan ke ${at ? "atas" : "bawah"}. Koordinat barunya adalah …`, kd(nx, ny), [kd(t.x + (ka ? -dx : dx), ny), kd(nx, t.y + (at ? -dy : dy)), kd(t.x + (at ? dy : -dy), t.y + (ka ? dx : -dx)), kd(ny, nx)], { gambar: svgKoord(T), bahas: `${kd(t.x, t.y)} → ${kd(nx, ny)}.` }); }),
    ...U7T[4],
  ],
  5: [
    () => { const sk = pilih([100, 200, 250, 500, 1000]), cm = acak(2, 12); return isian(`Pada denah berskala 1 : ${fmt(sk)}, jarak dua tempat ${cm} cm. Jarak sebenarnya adalah … m.`, cm * sk / 100, { satuan: "m", petunjuk: "Jarak sebenarnya = jarak denah × skala, lalu ubah cm ke m.", bahas: `${cm} × ${fmt(sk)} = ${fmt(cm * sk)} cm = ${fmt(cm * sk / 100)} m.` }); },
    () => { const sk = pilih([100000, 200000, 250000, 500000]), cm = acak(2, 9); return isian(`Pada peta berskala 1 : ${fmt(sk)}, jarak dua kota ${cm} cm. Jarak sebenarnya adalah … km.`, cm * sk / 100000, { satuan: "km", petunjuk: "1 km = 100.000 cm.", bahas: `${cm} × ${fmt(sk)} = ${fmt(cm * sk)} cm = ${fmt(cm * sk / 100000)} km.` }); },
    ...U7T[5],
  ],
  6: [() => { const T = denahAcak(5), [a, b] = ambil(T, 2), r = ARAH(b.x - a.x, b.y - a.y); return pg(`Perhatikan denah. ${b.nm} terletak di sebelah … dari ${a.nm}.`, r, SEMUA_ARAH.filter(x => x !== r), { gambar: svgDenah(T), petunjuk: "Arah atas pada denah = utara.", bahas: `Dari ${a.nm}, ${b.nm} berada di arah ${r}.` }); }],
  7: [() => { let T, a, b; do { T = denahAcak(5); [a, b] = ambil(T, 2); } while (a.x === b.x || a.y === b.y); const dx = b.x - a.x, dy = b.y - a.y;
    return pg(`Perhatikan denah. ${nama()} berangkat dari ${a.nm}, berjalan ${Math.abs(dx)} kotak ke ${dx > 0 ? "timur" : "barat"}, lalu ${Math.abs(dy)} kotak ke ${dy > 0 ? "utara" : "selatan"}. Ia tiba di …`, b.nm, T.filter(t => t !== a && t !== b).map(t => t.nm), { gambar: svgDenah(T), bahas: `Rutenya berakhir di ${b.nm}.` }); }],
  8: [() => { const x1 = acak(1, 3), y1 = acak(1, 3), x2 = acak(x1 + 2, 8), y2 = acak(y1 + 2, 8); const T = [{ n: "A", x: x1, y: y1 }, { n: "B", x: x2, y: y1 }, { n: "C", x: x2, y: y2 }];
    return pg(`Titik A, B, dan C adalah titik sudut persegi panjang ABCD. Koordinat titik D adalah …`, kd(x1, y2), [kd(y2, x1), kd(x2, y1 + y2 - y1 + 1), kd(x1 + 1, y2), kd(x1, y1 + 1)], { gambar: svgKoord(T), petunjuk: "D sejajar tegak dengan A dan sejajar mendatar dengan C.", bahas: `D = ${kd(x1, y2)}.` }); },
    () => { let T, a, b; do { T = denahAcak(5); [a, b] = ambil(T, 2); } while (a.x !== b.x && a.y !== b.y); const k = Math.abs(b.x - a.x) + Math.abs(b.y - a.y), sk = pilih([200, 500, 1000, 2000, 2500]), m = k * sk / 100;
      return isian(`Perhatikan denah. Setiap kotak pada denah berukuran 1 cm × 1 cm, dan skala denah 1 : ${fmt(sk)}. Jarak sebenarnya dari ${a.nm} ke ${b.nm} (diukur lurus dari tengah kotak ke tengah kotak) adalah … m.`, m,
        { gambar: svgDenah(T), satuan: "m", petunjuk: "Hitung jarak pada denah (banyak kotak = cm), kalikan skala, lalu ubah cm ke m.", bahas: `Jarak pada denah ${k} cm. ${k} × ${fmt(sk)} = ${fmt(k * sk)} cm = ${fmt(m)} m.` }); },
    () => { const sk = pilih([100000, 200000, 250000, 400000, 500000, 1000000]), c = acak(2, 12), km = c * sk / 100000;
      return pg(`Jarak sebenarnya kota P ke kota Q adalah ${fmt(km)} km. Pada sebuah peta, jarak kedua kota itu ${c} cm. Skala peta itu adalah …`, `1 : ${fmt(sk)}`, [sk * 10, sk / 10, sk / 100, km * c * 100000].filter(v => v !== sk).map(v => `1 : ${fmt(v)}`),
        { petunjuk: "Ubah km ke cm dulu (1 km = 100.000 cm), lalu bagi dengan jarak pada peta.", bahas: `${fmt(km)} km = ${fmt(km * 100000)} cm. ${fmt(km * 100000)} : ${c} = ${fmt(sk)}. Skala 1 : ${fmt(sk)}.` }); },
  ],
  9: [
    () => { const x1 = acak(0, 3), y1 = acak(0, 3), x2 = acak(x1 + 2, 8), y2 = acak(y1 + 2, 8); const P = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
      return isian(`Luas persegi panjang ABCD pada gambar adalah … satuan luas.`, (x2 - x1) * (y2 - y1), { gambar: svgKoord(P.map((p, i) => ({ n: "ABCD"[i], x: p[0], y: p[1] })), { poligon: P }), bahas: `Panjang ${x2 - x1}, lebar ${y2 - y1}. Luas ${(x2 - x1) * (y2 - y1)}.` }); },
    () => { const x1 = acak(0, 3), y1 = acak(0, 3), a = acak(2, 6), t = acak(2, 6) ; if ((a * t) % 2) return isian(`Segitiga A(1,1), B(5,1), C(1,4). Luasnya …`, 6, { bahas: "4 × 3 : 2 = 6." }); const P = [[x1, y1], [x1 + a, y1], [x1, y1 + t]];
      return isian(`Luas segitiga ABC pada gambar adalah … satuan luas.`, a * t / 2, { gambar: svgKoord(P.map((p, i) => ({ n: "ABC"[i], x: p[0], y: p[1] })), { poligon: P }), petunjuk: "Alas dan tinggi bisa dihitung dari kotak-kotaknya.", bahas: `Alas ${a}, tinggi ${t}. Luas ${a} × ${t} : 2 = ${a * t / 2}.` }); },
    () => { let T, a, b; do { T = denahAcak(5); [a, b] = ambil(T, 2); } while (a.x === b.x || a.y === b.y); const dx = b.x - a.x, dy = b.y - a.y, k = Math.abs(dx) + Math.abs(dy), sk = pilih([500, 1000, 2000, 2500, 5000]), m = k * sk / 100, x = nama();
      return isian(`Perhatikan denah. Setiap kotak berukuran 1 cm × 1 cm dan skala denah 1 : ${fmt(sk)}. ${x} berjalan dari ${a.nm} ${Math.abs(dx)} kotak ke ${dx > 0 ? "timur" : "barat"}, lalu ${Math.abs(dy)} kotak ke ${dy > 0 ? "utara" : "selatan"} sampai di ${b.nm}. Jarak sebenarnya yang ditempuh ${x} adalah … m.`, m,
        { gambar: svgDenah(T), satuan: "m", petunjuk: "Jumlahkan semua kotak yang dilalui, kalikan skala, lalu ubah ke meter.", bahas: `${Math.abs(dx)} + ${Math.abs(dy)} = ${k} cm pada denah. ${k} × ${fmt(sk)} = ${fmt(k * sk)} cm = ${fmt(m)} m.` }); },
    () => { const sk = pilih([100, 200, 500, 1000]), p = acak(3, 12), l = acak(2, p), P = p * sk / 100, L = l * sk / 100;
      return isian(`Sebuah taman digambar pada denah berskala 1 : ${fmt(sk)}. Pada denah, taman itu berbentuk ${namaPP(p, l)} berukuran ${p} cm × ${l} cm. Luas taman sebenarnya adalah … m².`, P * L,
        { satuan: "m²", gambar: persegiP(p, l), petunjuk: "Ubah dulu panjang dan lebar ke ukuran sebenarnya, baru hitung luasnya.", bahas: `Panjang ${p} × ${fmt(sk)} = ${fmt(p * sk)} cm = ${fmt(P)} m. Lebar ${l} × ${fmt(sk)} = ${fmt(l * sk)} cm = ${fmt(L)} m. Luas ${fmt(P)} × ${fmt(L)} = ${fmt(P * L)} m².` }); },
  ],
  10: [
    () => { const sk = pilih([100000, 200000, 250000, 500000]), a = acak(2, 8) + pilih([0, 0.5]), b = acak(2, 8) + pilih([0, 0.5]), km = (a + b) * sk / 100000;
      return isian(`Pada peta berskala 1 : ${fmt(sk)}, jarak kota A ke B ${fmt(a)} cm dan kota B ke C ${fmt(b)} cm. Jarak sebenarnya dari A ke C melalui B adalah … km.`, km, { satuan: "km", bahas: `(${fmt(a)} + ${fmt(b)}) × ${fmt(sk)} = ${fmt((a + b) * sk)} cm = ${fmt(km)} km.` }); },
    () => { const T = titikAcak(1, 6), t = T[0], k = acak(t.x + 1, 8); const nx = 2 * k - t.x; if (nx > 12) return pg(`Titik (2, 3) dicerminkan terhadap garis x = 4. Bayangannya …`, kd(6, 3), [kd(2, 5), kd(4, 3), kd(6, 5)], { bahas: "(6, 3)." });
      return pg(`Titik <b>${t.n}${kd(t.x, t.y)}</b> dicerminkan terhadap garis tegak yang melalui x = ${k}. Koordinat bayangannya adalah …`, kd(nx, t.y), [kd(t.x, 2 * k - t.y), kd(k, t.y), kd(nx + 1, t.y), kd(2 * k + t.x, t.y)], { gambar: svgKoord(T), petunjuk: `Jarak titik ke garis = ${k - t.x}. Bayangannya sejauh itu di seberang garis.`, bahas: `${t.x} → ${k} → ${nx}. Bayangan ${kd(nx, t.y)}.` }); },
    () => { const A4 = [["utara", 0, 1], ["timur", 1, 0], ["selatan", 0, -1], ["barat", -1, 0]], x = nama(); let L, dx, dy;
      do { L = Array.from({ length: acak(3, 4) }, (_, i) => [pilih(A4), acak(1, 8) * 50]); for (let i = 1; i < L.length; i++) while (L[i][0] === L[i - 1][0]) L[i][0] = pilih(A4);
        dx = L.reduce((s, [a, j]) => s + a[1] * j, 0); dy = L.reduce((s, [a, j]) => s + a[2] * j, 0); } while (dx === 0 && dy === 0);
      const rute = L.map(([a, j]) => `${j} m ke ${a[0]}`).join(", lalu "), arah = ARAH(dx, dy), lurus = dx === 0 || dy === 0, jauh = Math.abs(dx) + Math.abs(dy);
      const benar = lurus ? `${fmt(jauh)} m ke arah ${arah}` : `arah ${arah}`;
      const salah = lurus ? [`${fmt(jauh)} m ke arah ${ARAH(-dx, -dy)}`, `${fmt(L.reduce((s, [, j]) => s + j, 0))} m ke arah ${arah}`, `${fmt(jauh + 100)} m ke arah ${arah}`, `${fmt(jauh)} m ke arah ${ARAH(dy, dx)}`]
        : [ARAH(-dx, -dy), ...kocok(SEMUA_ARAH.filter(r => r !== arah && r !== ARAH(-dx, -dy) && r !== ARAH(dx, 0) && r !== ARAH(0, dy)))].slice(0, 3).map(r => `arah ${r}`);
      return pg(`${x} berjalan dari rumahnya ${rute}. ${lurus ? "Posisi" : "Arah posisi"} ${x} sekarang dari rumahnya adalah …`, benar, lurus ? kocok(salah.filter(s => s !== benar)).slice(0, 3) : salah,
        { petunjuk: "Hitung total gerak ke timur–barat dan ke utara–selatan. Gerak yang berlawanan saling mengurangi.", bahas: `Timur–barat: ${dx === 0 ? "kembali ke garis awal" : `${Math.abs(dx)} m ke ${dx > 0 ? "timur" : "barat"}`}. Utara–selatan: ${dy === 0 ? "kembali ke garis awal" : `${Math.abs(dy)} m ke ${dy > 0 ? "utara" : "selatan"}`}. Jadi ${benar}.` }); },
    () => { const x0 = acak(1, 5), y0 = acak(1, 5), gx = acak(1, 3) * (ya() ? 1 : -1), gy = acak(1, 3) * (ya() ? 1 : -1), x1 = x0 + gx, y1 = y0 + gy; if (x1 < 0 || y1 < 0) return pg(`Titik A(3, 2) digeser 1 satuan ke kanan, lalu dicerminkan terhadap garis mendatar y = 4. Bayangan akhirnya adalah …`, kd(4, 6), [kd(4, 2), kd(2, 6), kd(6, 4)], { bahas: "(3, 2) → (4, 2) → (4, 6)." });
      const k = y1 + acak(1, 3), yb = 2 * k - y1, T = [{ n: "A", x: x0, y: y0 }], gs = `${Math.abs(gx)} satuan ke ${gx > 0 ? "kanan" : "kiri"} dan ${Math.abs(gy)} satuan ke ${gy > 0 ? "atas" : "bawah"}`;
      return pg(`Titik <b>A${kd(x0, y0)}</b> digeser ${gs}, lalu hasilnya dicerminkan terhadap garis mendatar yang melalui y = ${k}. Koordinat bayangan akhirnya adalah …`, kd(x1, yb),
        [kd(x1, y1), kd(2 * k - x1, y1), kd(x1, 2 * k - y0), kd(x0 - gx, yb), kd(x1, yb + 1)].filter(s => s !== kd(x1, yb)),
        { gambar: svgKoord(T), petunjuk: "Geser dulu. Saat dicerminkan terhadap garis mendatar, angka pertama tetap, angka kedua berpindah ke seberang garis.", bahas: `Digeser: ${kd(x0, y0)} → ${kd(x1, y1)}. Jarak ke garis y = ${k} adalah ${Math.abs(k - y1)}, jadi bayangannya ${kd(x1, yb)}.` }); },
  ],
});
