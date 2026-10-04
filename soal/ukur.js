/* Pos 3 — Pengukuran & Bangun: 7 misi × 10 level */
"use strict";

/* ---------- Gambar bangun ---------- */
/* Poligon (titik searah jarum jam di layar) + label sisi. lbl: { indeksSisi: "teks" } */
function svgPoligon(P, lbl = {}, o = {}) {
  const xs = P.map(p => p[0]), ys = P.map(p => p[1]), W = Math.max(...xs) - Math.min(...xs) || 1, H = Math.max(...ys) - Math.min(...ys) || 1;
  const k = Math.min(240 / W, 150 / H), m = 44, x0 = Math.min(...xs), y0 = Math.min(...ys);
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
  ],
  5: [
    () => { const a = acak(1, 9) + pilih([0.5, 0.25, 0.75, 0.2, 0.4]); return isian(`${fmt(a)} kg = … g`, a * 1000, { satuan: "g", bahas: `${fmt(a)} × 1.000 = ${fmt(a * 1000)} g.` }); },
    () => { const a = acak(1, 3) + pilih([0.5, 0.25, 0.75]); return isian(`${fmt(a)} jam = … menit`, a * 60, { satuan: "menit", petunjuk: "0,5 jam = 30 menit.", bahas: `${fmt(a)} × 60 = ${a * 60} menit.` }); },
    () => { const a = acak(1, 9) + acak(1, 9) / 10; return isian(`${fmt(a)} km = … m`, Math.round(a * 1000), { satuan: "m", bahas: `${fmt(a)} × 1.000 = ${fmt(Math.round(a * 1000))} m.` }); },
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
  ],
});

/* ================= Misi 2: Keliling & luas ================= */
daftarMisi("ukr", "u2", "Keliling & luas bangun datar", "🟩", {
  1: [
    () => { const s = acak(3, 15); return isian(`Keliling persegi di bawah adalah … cm.`, 4 * s, { gambar: persegiS(s), satuan: "cm", petunjuk: "Keliling persegi = 4 × sisi.", bahas: `4 × ${s} = ${4 * s} cm.` }); },
    () => { const p = acak(6, 20), l = acak(2, p - 1); return isian(`Keliling persegi panjang di bawah adalah … cm.`, 2 * (p + l), { gambar: persegiP(p, l), satuan: "cm", petunjuk: "Keliling = 2 × (panjang + lebar).", bahas: `2 × (${p} + ${l}) = ${2 * (p + l)} cm.` }); },
  ],
  2: [
    () => { const s = acak(3, 15); return isian(`Luas persegi di bawah adalah … cm².`, s * s, { gambar: persegiS(s), satuan: "cm²", petunjuk: "Luas persegi = sisi × sisi.", bahas: `${s} × ${s} = ${s * s} cm².` }); },
    () => { const p = acak(6, 20), l = acak(2, p - 1); return isian(`Luas persegi panjang di bawah adalah … cm².`, p * l, { gambar: persegiP(p, l), satuan: "cm²", petunjuk: "Luas = panjang × lebar.", bahas: `${p} × ${l} = ${p * l} cm².` }); },
  ],
  3: [
    () => { let a = acak(4, 20), t = acak(3, 16); if ((a * t) % 2) a++; return isian(`Luas segitiga di bawah adalah … cm².`, a * t / 2, { gambar: segitigaG(a, t), satuan: "cm²", petunjuk: "Luas segitiga = alas × tinggi : 2.", bahas: `${a} × ${t} : 2 = ${a * t / 2} cm².` }); },
  ],
  4: [
    () => { const a = acak(5, 20), t = acak(3, 14); return isian(`Luas jajar genjang di bawah adalah … cm².`, a * t, { gambar: jajarG(a, t), satuan: "cm²", petunjuk: "Luas jajar genjang = alas × tinggi.", bahas: `${a} × ${t} = ${a * t} cm².` }); },
    () => { const a = acak(4, 12); let b = a + 2 * acak(1, 5), t = acak(3, 12); if (((a + b) * t) % 2) t++; return isian(`Luas trapesium di bawah adalah … cm².`, (a + b) * t / 2, { gambar: trapesiumG(a, b, t), satuan: "cm²", petunjuk: "Luas = (jumlah sisi sejajar) × tinggi : 2.", bahas: `(${a} + ${b}) × ${t} : 2 = ${(a + b) * t / 2} cm².` }); },
  ],
  5: [
    () => { const s = acak(4, 20); return isian(`Luas sebuah persegi ${s * s} cm². Panjang sisinya adalah … cm.`, s, { satuan: "cm", petunjuk: "Bilangan berapa dikali dirinya sendiri?", bahas: `${s} × ${s} = ${s * s}, jadi sisinya ${s} cm.` }); },
    () => { const p = acak(8, 25), l = acak(3, p - 1); return isian(`Luas persegi panjang ${p * l} cm² dan panjangnya ${p} cm. Lebarnya adalah … cm.`, l, { satuan: "cm", bahas: `${p * l} : ${p} = ${l} cm.` }); },
    () => { const a = acak(5, 15), b = acak(5, 15), c = acak(Math.abs(a - b) + 1, a + b - 1); return isian(`Panjang sisi-sisi sebuah segitiga ${a} cm, ${b} cm, dan ${c} cm. Kelilingnya adalah … cm.`, a + b + c, { satuan: "cm", bahas: `${a} + ${b} + ${c} = ${a + b + c} cm.` }); },
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
  ],
  9: [
    () => { const k = acak(2, 4), l = acak(3, 10), p = k * l; return isian(`Keliling sebuah persegi panjang ${2 * (p + l)} cm. Panjangnya ${k} kali lebarnya. Luas persegi panjang itu adalah … cm².`, p * l, { satuan: "cm²", petunjuk: `Panjang + lebar = ${p + l}, dan panjang = ${k} bagian, lebar = 1 bagian.`, bahas: `${p + l} : ${k + 1} = ${l} (lebar), panjang ${p}. Luas ${p * l} cm².` }); },
    () => { let p = acak(8, 20), l = acak(2, 10); if ((p + l) % 2) l++; const s = (p + l) / 2; return isian(`Sebuah persegi panjang berukuran ${p} cm × ${l} cm. Sebuah persegi memiliki keliling yang sama dengan persegi panjang itu. Luas persegi adalah … cm².`, s * s, { satuan: "cm²", bahas: `Keliling = ${2 * (p + l)} cm. Sisi persegi = ${s} cm. Luas = ${s * s} cm².` }); },
  ],
  10: [
    () => { const w = acak(1, 3), p = acak(12, 30), l = acak(8, p - 2), L = p * l - (p - 2 * w) * (l - 2 * w); return isian(`Sebuah taman berbentuk persegi panjang berukuran ${p} m × ${l} m. Di bagian dalam sepanjang tepi taman dibuat jalan selebar ${w} m. Luas jalan adalah … m².`, L,
      { satuan: "m²", gambar: svgPoligon([[0, 0], [p, 0], [p, l], [0, l]], { 0: `${p} m`, 1: `${l} m` }, { lubang: [[w, w], [p - w, w], [p - w, l - w], [w, l - w]], label: "taman dengan jalan" }), petunjuk: "Luas jalan = luas taman − luas bagian tengah.", bahas: `Bagian tengah ${p - 2 * w} × ${l - 2 * w} = ${(p - 2 * w) * (l - 2 * w)}. ${p * l} − ${(p - 2 * w) * (l - 2 * w)} = ${L} m².` }); },
    () => { const a = acak(10, 20), b = acak(10, 20), c = acak(4, 9); return isian(`Sebuah foto berukuran ${a} cm × ${b} cm ditempel pada karton. Di sekeliling foto masih tersisa karton selebar ${c} cm. Luas karton yang tidak tertutup foto adalah … cm².`, (a + 2 * c) * (b + 2 * c) - a * b,
      { satuan: "cm²", petunjuk: "Ukuran karton = ukuran foto + 2 × lebar sisa.", bahas: `Karton ${a + 2 * c} × ${b + 2 * c} = ${(a + 2 * c) * (b + 2 * c)}. Dikurangi foto ${a * b} = ${(a + 2 * c) * (b + 2 * c) - a * b} cm².` }); },
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
daftarMisi("ukr", "u3", "Bangun gabungan", "🏠", {
  1: [() => { const W = acak(3, 6), H = acak(3, 5), w = acak(1, W - 1), h = acak(1, H - 1); return isian(`Setiap persegi kecil luasnya 1 cm². Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPetak(W, H, w, h), satuan: "cm²", petunjuk: "Hitung persegi kecilnya.", bahas: `Ada ${W * H - w * h} persegi kecil → ${W * H - w * h} cm².` }); }],
  2: [() => { const W = acak(5, 9), H = acak(4, 7), w = acak(2, W - 2), h = acak(2, H - 2); return isian(`Setiap persegi kecil luasnya 1 cm². Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPetak(W, H, w, h), satuan: "cm²", petunjuk: "Hitung persegi panjang besar, lalu kurangi bagian yang kosong.", bahas: `${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); }],
  3: [() => { const { W, H, w, h } = ukL(), bw = ya(); return isian(`Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPoligon(bentukL(W, H, w, h, bw), bw ? { 0: `${W} cm`, 1: `${H - h} cm`, 2: `${w} cm`, 3: `${h} cm`, 5: `${H} cm` } : { 0: `${W - w} cm`, 1: `${h} cm`, 2: `${w} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm²", petunjuk: "Bagi menjadi dua persegi panjang.", bahas: `Persegi panjang besar ${W} × ${H} = ${W * H}, dikurangi bagian kosong ${w} × ${h} = ${w * h}. Luas = ${W * H - w * h} cm².` }); }],
  4: [() => { const { W, H, w, h } = ukL(); return isian(`Luas bangun di bawah adalah … cm².`, W * H - w * h, { gambar: svgPoligon(bentukL(W, H, w, h, false), { 0: `${W - w} cm`, 3: `${H - h} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm²", petunjuk: "Cari dulu panjang sisi yang belum diketahui.", bahas: `Bagian kosong ${w} × ${h}. Luas = ${W} × ${H} − ${w} × ${h} = ${W * H - w * h} cm².` }); }],
  5: [() => { const { W, H, w, h } = ukL(); return isian(`Keliling bangun di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPoligon(bentukL(W, H, w, h, false), { 0: `${W - w} cm`, 1: `${h} cm`, 2: `${w} cm`, 3: `${H - h} cm`, 4: `${W} cm`, 5: `${H} cm` }),
      satuan: "cm", petunjuk: "Jumlahkan semua sisi luarnya.", bahas: `${W - w} + ${h} + ${w} + ${H - h} + ${W} + ${H} = ${2 * (W + H)} cm.` }); }],
  6: [
    () => { const { W, H, w, h } = ukL(); return isian(`Keliling bangun di bawah adalah … cm.`, 2 * (W + H), { gambar: svgPoligon(bentukL(W, H, w, h, false), { 4: `${W} cm`, 5: `${H} cm` }), satuan: "cm", petunjuk: "Geser sisi-sisi takik ke luar: kelilingnya sama dengan persegi panjang besar!", bahas: `Keliling = 2 × (${W} + ${H}) = ${2 * (W + H)} cm.` }); },
    () => { const p = acak(8, 16); let l = acak(5, 10), t = acak(3, 7); if ((p * t) % 2) t++; return isian(`Gambar rumah di bawah terdiri atas persegi panjang dan segitiga. Luas seluruhnya adalah … cm².`, p * l + p * t / 2,
      { gambar: svgPoligon([[0, t], [p / 2, 0], [p, t], [p, t + l], [0, t + l]], { 2: `${l} cm`, 3: `${p} cm` }, { extra: T => { const a = T([p / 2, 0]), b = T([p / 2, t]), c = T([0, t]), d = T([p, t]); return `<line x1="${c[0]}" y1="${c[1]}" x2="${d[0]}" y2="${d[1]}" class="bantu"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="bantu"/>` + svgT(a[0] + 6, (a[1] + b[1]) / 2 + 4, `${t} cm`, 'class="lbl"'); } }),
        satuan: "cm²", bahas: `Persegi panjang ${p} × ${l} = ${p * l}. Segitiga ${p} × ${t} : 2 = ${p * t / 2}. Total ${p * l + p * t / 2} cm².` }); },
  ],
  7: [() => { const W = acak(10, 20), H = acak(8, 16), w = acak(2, W - 6), h = acak(2, H - 5), x = acak(2, W - w - 2), y = acak(2, H - h - 2);
      return isian(`Sebuah papan berbentuk persegi panjang ${W} cm × ${H} cm dilubangi berbentuk persegi panjang ${w} cm × ${h} cm. Luas papan yang tersisa adalah … cm².`, W * H - w * h,
        { gambar: svgPoligon([[0, 0], [W, 0], [W, H], [0, H]], { 0: `${W} cm`, 1: `${H} cm` }, { lubang: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], extra: T => { const a = T([x + w / 2, y + h]); return svgT(a[0], a[1] + 16, `${w} × ${h}`, 'text-anchor="middle" class="lbl"'); } }), satuan: "cm²", bahas: `${W * H} − ${w * h} = ${W * H - w * h} cm².` }); }],
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
  ],
  10: [
    () => { const a = acak(6, 12), b = acak(5, 10), ox = acak(2, a - 2), oy = acak(2, b - 2), ow = a - ox, oh = b - oy, c = ow + acak(2, 6), d = oh + acak(2, 5); const L = a * b + c * d - ow * oh;
      return isian(`Dua lembar kertas berbentuk persegi panjang, ${a} cm × ${b} cm dan ${c} cm × ${d} cm, ditumpuk sehingga bagian yang bertumpuk berbentuk persegi panjang ${ow} cm × ${oh} cm. Luas permukaan meja yang tertutup kertas adalah … cm².`, L,
        { gambar: svgPoligon([[0, 0], [a, 0], [a, oy], [ox + c, oy], [ox + c, oy + d], [ox, oy + d], [ox, b], [0, b]], {}, { label: "dua persegi panjang bertumpuk", extra: T => { const p = T([ox, oy]), q = T([a, b]); return `<rect x="${p[0]}" y="${p[1]}" width="${q[0] - p[0]}" height="${q[1] - p[1]}" class="tumpuk"/>`; } }),
          satuan: "cm²", petunjuk: "Jumlahkan kedua luas, lalu kurangi bagian yang dihitung dua kali.", bahas: `${a * b} + ${c * d} − ${ow * oh} = ${L} cm².` }); },
    () => { const s = acak(4, 10) * 2; return isian(`Sebuah persegi bersisi ${s} cm. Titik-titik tengah keempat sisinya dihubungkan sehingga terbentuk persegi baru di dalamnya. Luas persegi baru itu adalah … cm².`, s * s / 2,
        { gambar: svgPoligon([[0, 0], [s, 0], [s, s], [0, s]], { 0: `${s} cm` }, { extra: T => { const q = [[s / 2, 0], [s, s / 2], [s / 2, s], [0, s / 2]].map(T); return `<polygon points="${q.map(x => x.join(",")).join(" ")}" class="arsir"/>`; } }),
          satuan: "cm²", petunjuk: "Ada 4 segitiga di pojok yang dibuang. Atau: persegi dalam = setengah persegi besar.", bahas: `Luas = ${s} × ${s} : 2 = ${s * s / 2} cm².` }); },
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
daftarMisi("ukr", "u4", "Volume kubus & balok", "🧊", {
  1: [() => { const p = acak(2, 5), l = acak(2, 4), t = acak(1, 3); return isian(`Balok di bawah tersusun dari kubus satuan. Banyak kubus satuannya adalah …`, p * l * t, { gambar: svgBalok(p, l, t, false, true), satuan: "kubus", petunjuk: "Hitung kubus satu lapis, lalu kalikan banyak lapisan.", bahas: `${p} × ${l} × ${t} = ${p * l * t} kubus.` }); }],
  2: [
    () => { const s = acak(2, 20), sat = pilih(["cm", "cm", "dm", "m"]); return isian(`Volume kubus di bawah adalah … ${sat}³.`, s ** 3, { gambar: svgBalok(3, 3, 3, [`${s} ${sat}`, `${s} ${sat}`, `${s} ${sat}`]), satuan: `${sat}³`, petunjuk: "Volume kubus = sisi × sisi × sisi.", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)} ${sat}³.` }); },
    () => { const p = acak(2, 6), l = acak(2, 5), t = acak(2, 4); return isian(`Balok di bawah tersusun dari kubus satuan. Banyak kubus satuannya adalah …`, p * l * t, { gambar: svgBalok(p, l, t, false, true), satuan: "kubus", bahas: `${p} × ${l} × ${t} = ${p * l * t} kubus.` }); },
  ],
  3: [() => { const p = acak(4, 20), l = acak(2, 12), t = acak(2, 12); return isian(`Volume balok di bawah adalah … cm³.`, p * l * t, { gambar: svgBalok(p, l, t, [`${p} cm`, `${l} cm`, `${t} cm`]), satuan: "cm³", petunjuk: "Volume balok = panjang × lebar × tinggi.", bahas: `${p} × ${l} × ${t} = ${fmt(p * l * t)} cm³.` }); }],
  4: [
    () => { const s = acak(2, 12); return isian(`Volume sebuah kubus ${fmt(s ** 3)} cm³. Panjang rusuknya adalah … cm.`, s, { satuan: "cm", petunjuk: "Bilangan berapa dikali dirinya tiga kali?", bahas: `${s} × ${s} × ${s} = ${fmt(s ** 3)}.` }); },
    () => { const p = acak(5, 20), l = acak(3, 12), t = acak(2, 15); return isian(`Volume balok ${fmt(p * l * t)} cm³, panjangnya ${p} cm, dan lebarnya ${l} cm. Tingginya adalah … cm.`, t, { satuan: "cm", bahas: `${fmt(p * l * t)} : (${p} × ${l}) = ${t} cm.` }); },
  ],
  5: [
    () => { const p = pilih([20, 25, 30, 40, 50]), l = pilih([10, 20, 25, 30]), t = pilih([10, 20, 30, 40]); return isian(`Sebuah wadah berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Volume wadah itu adalah … liter.`, p * l * t / 1000, { satuan: "liter", petunjuk: "1 liter = 1.000 cm³.", bahas: `${fmt(p * l * t)} cm³ = ${fmt(p * l * t / 1000)} liter.` }); },
    () => { const s = pilih([10, 20, 30, 40, 50]); return isian(`Sebuah bak berbentuk kubus dengan rusuk ${s} cm. Volume bak itu adalah … liter.`, s ** 3 / 1000, { satuan: "liter", bahas: `${fmt(s ** 3)} cm³ = ${fmt(s ** 3 / 1000)} liter.` }); },
  ],
  6: [() => { const p = pilih([40, 50, 60, 80]), l = pilih([20, 25, 30, 40]), t = pilih([30, 40, 50, 60]), [a, b] = pilih([[1, 2], [3, 4], [2, 3], [1, 4], [2, 5], [3, 5]]); const v = p * l * t * a / b / 1000;
      if (!Number.isInteger(v * 10)) return isian(`Akuarium 50 cm × 30 cm × 40 cm diisi air setengahnya. Volume air … liter.`, 30, { satuan: "liter", bahas: "60.000 : 2 = 30.000 cm³ = 30 liter." });
      return isian(`Akuarium berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm diisi air ${pc(a, b)} bagian. Volume air di dalamnya adalah … liter.`, v, { satuan: "liter", gambar: svgBalok(p / 10, l / 10, t / 10, [`${p} cm`, `${l} cm`, `${t} cm`]), bahas: `${pc(a, b)} × ${fmt(p * l * t)} = ${fmt(v * 1000)} cm³ = ${fmt(v)} liter.` }); }],
  7: [() => { const p = pilih([60, 70, 80, 100]), l = pilih([50, 60, 70]), t = pilih([50, 60, 70, 80]), e = pilih([5, 8, 10, 12]); const V = p * l * t / 1000;
      return isian(`Bak mandi berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm akan diisi penuh dengan ember berisi ${e} liter. Paling sedikit diperlukan … kali mengisi ember.`, Math.ceil(V / e), { satuan: "kali", petunjuk: "Ubah volume bak ke liter, lalu bagi. Bulatkan ke atas!", bahas: `Volume ${fmt(V)} liter. ${fmt(V)} : ${e} = ${fmt(bulat(V / e, 2))} → ${Math.ceil(V / e)} kali.` }); }],
  8: [() => { const p = acak(2, 6), l = acak(2, 5), t = acak(2, 5), a = pilih([5, 6, 8, 10]), b = pilih([4, 5, 6]), c = pilih([3, 4, 5]);
      return isian(`Kardus besar berukuran ${p * a} cm × ${l * b} cm × ${t * c} cm akan diisi kotak sabun berukuran ${a} cm × ${b} cm × ${c} cm (posisinya sama). Kotak sabun yang dapat dimasukkan paling banyak adalah …`, p * l * t,
        { satuan: "kotak", petunjuk: "Berapa kotak muat memanjang, melebar, dan meninggi?", bahas: `${p * a}:${a} = ${p}, ${l * b}:${b} = ${l}, ${t * c}:${c} = ${t}. Total ${p} × ${l} × ${t} = ${p * l * t} kotak.` }); }],
  9: [
    () => { const p = pilih([20, 30, 40, 50]), l = pilih([20, 25, 30]), s = pilih([5, 10]), n = acak(1, 4); const naik = n * s ** 3 / (p * l);
      if (!Number.isInteger(naik * 10)) return isian(`Akuarium alas 40 cm × 25 cm. 2 kubus besi rusuk 10 cm dimasukkan. Air naik … cm.`, 2, { satuan: "cm", bahas: "2000 : 1000 = 2 cm." });
      return isian(`Akuarium memiliki alas berukuran ${p} cm × ${l} cm dan berisi air. Ke dalamnya dimasukkan ${n} kubus besi dengan rusuk ${s} cm hingga tenggelam. Permukaan air naik setinggi … cm.`, naik, { satuan: "cm", petunjuk: "Volume air yang naik = volume kubus.", bahas: `Volume kubus ${n} × ${s ** 3} = ${fmt(n * s ** 3)} cm³. Naik = ${fmt(n * s ** 3)} : (${p} × ${l}) = ${fmt(naik)} cm.` }); },
    () => { const p = acak(6, 12), l = acak(4, 8), t = acak(3, 6), s = acak(2, Math.min(p, l)); return isian(`Sebuah bangun terdiri atas balok berukuran ${p} cm × ${l} cm × ${t} cm dan di atasnya diletakkan kubus dengan rusuk ${s} cm. Volume bangun gabungan itu adalah … cm³.`, p * l * t + s ** 3, { satuan: "cm³", bahas: `${p * l * t} + ${s ** 3} = ${p * l * t + s ** 3} cm³.` }); },
  ],
  10: [
    () => { const n = acak(3, 10), v = n ** 3 - (n - 2) ** 3; return isian(`Sebuah kubus besar dicat di seluruh permukaannya, lalu dipotong menjadi ${n} × ${n} × ${n} kubus kecil. Banyak kubus kecil yang <b>paling sedikit satu sisinya</b> berwarna adalah …`, v,
      { gambar: svgBalok(n, n, n, false, true), satuan: "kubus", petunjuk: "Semua kubus dikurangi kubus bagian dalam yang tidak terkena cat.", bahas: `${n ** 3} − ${(n - 2) ** 3} = ${v}.` }); },
    () => { const s = acak(2, 6), k = acak(2, 5), b = s * k; return isian(`Kubus besar dengan rusuk ${b} cm dipotong menjadi kubus-kubus kecil dengan rusuk ${s} cm. Banyak kubus kecil yang terbentuk adalah …`, k ** 3,
      { satuan: "kubus", petunjuk: "Berapa kubus kecil sepanjang satu rusuk?", bahas: `${b} : ${s} = ${k} per rusuk. ${k} × ${k} × ${k} = ${k ** 3} kubus.` }); },
    () => { const n = acak(3, 10), sisi = pilih([3, 2, 1, 0]), v = { 3: 8, 2: 12 * (n - 2), 1: 6 * (n - 2) ** 2, 0: (n - 2) ** 3 }[sisi];
      return isian(`Sebuah kubus besar dicat merah di seluruh permukaannya. Kemudian kubus itu dipotong menjadi ${n} × ${n} × ${n} kubus kecil yang sama besar. Banyak kubus kecil yang ${sisi ? `<b>tepat ${sisi} sisinya</b> berwarna merah` : "<b>tidak berwarna merah sama sekali</b>"} adalah …`, v,
        { gambar: svgBalok(n, n, n, false, true), satuan: "kubus", petunjuk: sisi === 3 ? "Kubus di pojok punya 3 sisi berwarna." : sisi === 2 ? "Kubus 2 sisi ada di rusuk (bukan pojok). Kubus punya 12 rusuk." : sisi === 1 ? "Kubus 1 sisi ada di tengah setiap muka. Kubus punya 6 muka." : "Kubus tanpa warna ada di bagian dalam.", bahas: `Jawabannya ${v}.` }); },
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
daftarMisi("ukr", "u5", "Sudut", "📐", {
  1: [
    () => { const k = acak(2, 12), d = pilih([10, 15, 20, 30, 45]); return isian(`Ada ${k} sudut yang masing-masing besarnya ${d}°. Jumlah semuanya …°`, k * d, { satuan: "°", bahas: `${k} × ${d}° = ${k * d}°.` }); },
    () => { const [t, v] = pilih([["seperempat putaran", 90], ["setengah putaran", 180], ["tiga perempat putaran", 270], ["satu putaran penuh", 360], ["sepertiga putaran", 120], ["seperenam putaran", 60], ["dua putaran", 720]]);
      return isian(`Besar sudut <b>${t}</b> adalah …°`, v, { satuan: "°", petunjuk: "Satu putaran penuh = 360°.", bahas: `${t} = ${v}°.` }); },
    () => { const d = acak(1, 5) * 30; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Baca angka yang ditunjuk kaki sudut, mulai dari 0 di kanan.", bahas: `Besar sudutnya ${d}°.` }); },
    keTKA(() => { const d = pilih([acak(4, 16) * 5, 90, acak(20, 34) * 5]); return pgTetap(`Jenis sudut pada gambar adalah …`, ["lancip", "siku-siku", "tumpul"], jenisSudut(d), { gambar: svgSudut(d, acak(0, 23) * 15), petunjuk: "Bandingkan dengan pojok buku (siku-siku).", bahas: `Sudut itu ${jenisSudut(d)} (${d}°).` }); }),
  ],
  2: [
    () => { const d = acak(1, 17) * 5, t = pilih([["siku-siku", 90], ["lurus", 180]]); return isian(`Sudut ${d}° ditambah sebuah sudut ${t[0]}. Hasilnya …°`, d + t[1], { satuan: "°", petunjuk: `Sudut ${t[0]} = ${t[1]}°.`, bahas: `${d}° + ${t[1]}° = ${d + t[1]}°.` }); },
    () => { const k = acak(2, 4); return isian(`Besar ${k} sudut siku-siku jika digabung adalah …°`, 90 * k, { satuan: "°", petunjuk: "Satu sudut siku-siku = 90°.", bahas: `${k} × 90° = ${90 * k}°.` }); },
    () => { const d = acak(1, 17) * 10; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Setiap garis kecil = 10°.", bahas: `Besar sudutnya ${d}°.` }); },
    keTKA(() => { const d = pilih([acak(5, 89), 90, acak(91, 179), 180]); return pgTetap(`Sudut yang besarnya <b>${d}°</b> termasuk sudut …`, ["lancip", "siku-siku", "tumpul", "lurus"], jenisSudut(d), { petunjuk: "Lancip < 90°, siku-siku = 90°, tumpul antara 90° dan 180°, lurus = 180°.", bahas: `${d}° termasuk sudut ${jenisSudut(d)}.` }); }),
  ],
  3: [
    () => { const d = acak(1, 17) * 10; return isian(`Besar sudut yang ditunjukkan busur derajat adalah …°`, d, { gambar: svgBusur(d), satuan: "°", petunjuk: "Mulai dari 0 di kanan, hitung setiap garis = 10°.", bahas: `Besar sudutnya ${d}°.` }); },
    () => { const d0 = acak(1, 9) * 10, d = d0 + acak(2, 18 - d0 / 10) * 10; if (d > 180) return isian(`Sudut dari 30° sampai 110° pada busur besarnya …°`, 80, { satuan: "°", bahas: "110 − 30 = 80." });
      return isian(`Kedua kaki sudut tidak dimulai dari 0. Besar sudut yang ditunjukkan pada busur derajat adalah …°`, d - d0, { gambar: svgBusur(d, d0), satuan: "°", petunjuk: "Baca angka di kedua kaki sudut, lalu kurangkan.", bahas: `${d}° − ${d0}° = ${d - d0}°.` }); },
  ],
  4: [() => { const d = acak(20, 160); return isian(`Pelurus dari sudut ${d}° adalah …°`, 180 - d, { satuan: "°", petunjuk: "Dua sudut berpelurus jumlahnya 180°.", bahas: `180° − ${d}° = ${180 - d}°.` }); }],
  5: [
    () => { const d = acak(10, 80); return isian(`Penyiku dari sudut ${d}° adalah …°`, 90 - d, { satuan: "°", petunjuk: "Dua sudut berpenyiku jumlahnya 90°.", bahas: `90° − ${d}° = ${90 - d}°.` }); },
    () => { const a = acak(40, 150), b = acak(40, 150); return isian(`Tiga sudut mengelilingi satu titik. Dua di antaranya ${a}° dan ${b}°. Sudut ketiga adalah …°`, 360 - a - b, { satuan: "°", petunjuk: "Satu putaran = 360°.", bahas: `360° − ${a}° − ${b}° = ${360 - a - b}°.` }); },
  ],
  6: [() => { const a = acak(25, 100), b = acak(20, 155 - a); return isian(`Dua sudut sebuah segitiga besarnya ${a}° dan ${b}°. Besar sudut ketiga adalah …°`, 180 - a - b, { satuan: "°", petunjuk: "Jumlah sudut segitiga = 180°.", bahas: `180° − ${a}° − ${b}° = ${180 - a - b}°.` }); }],
  7: [
    () => { const h = acak(1, 11), p = ya() ? h : h + 12; return isian(`Pada pukul ${pkl(p * 60)}, besar sudut terkecil antara jarum panjang dan jarum pendek adalah …°`, sudutJam(h, 0), { gambar: svgJam(h, 0), satuan: "°", petunjuk: "Jarak antar angka jam = 30°.", bahas: `${Math.min(h, 12 - h)} × 30° = ${sudutJam(h, 0)}°.` }); },
    () => { const m = acak(2, 59); return isian(`Dalam ${m} menit, jarum menit berputar sebesar …°`, m * 6, { satuan: "°", petunjuk: "Satu putaran (360°) = 60 menit, jadi 1 menit = 6°.", bahas: `${m} × 6° = ${m * 6}°.` }); },
    () => { const j = acak(1, 11); return isian(`Dalam ${j} jam, jarum pendek (jarum jam) berputar sebesar …°`, j * 30, { satuan: "°", petunjuk: "Satu putaran (360°) = 12 jam, jadi 1 jam = 30°.", bahas: `${j} × 30° = ${j * 30}°.` }); },
  ],
  8: [
    () => { const h = acak(1, 11), m = pilih([15, 30, 45]), d = sudutJam(h, m); return isian(`Pada pukul ${pkl(h * 60 + m)}, besar sudut terkecil antara kedua jarum jam adalah …°`, d, { gambar: svgJam(h, m), satuan: "°", petunjuk: `Jarum pendek juga bergeser: setiap 15 menit bergeser 7,5°.`, bahas: `Jarum menit di ${m * 6}°, jarum jam di ${fmt((h % 12) * 30 + m / 2)}°. Sudut terkecil ${fmt(d)}°.` }); },
    () => { const h = acak(1, 11), d = sudutJam(h, 0); return bs(`Perhatikan jam yang menunjukkan pukul ${pkl(h * 60)}. Tentukan Benar atau Salah.`, [
      { t: `Sudut terkecil kedua jarum ${d}°.`, b: true }, { t: `Sudut itu termasuk sudut ${jenisSudut(d)}.`, b: true },
      { t: `Sudut terkecil kedua jarum ${d + 30}°.`, b: false }, { t: `Satu jam kemudian sudutnya ${sudutJam(h + 1, 0)}°.`, b: true }], { gambar: svgJam(h, 0), bahas: `Pukul ${pkl(h * 60)}: ${d}° (${jenisSudut(d)}). Pukul ${pkl((h + 1) * 60)}: ${sudutJam(h + 1, 0)}°.` }); },
  ],
  9: [
    () => { const p = acak(10, 85) * 2, a = (180 - p) / 2; return isian(`Sudut puncak sebuah segitiga sama kaki ${p}°. Besar setiap sudut alasnya adalah …°`, a, { satuan: "°", petunjuk: "Dua sudut alas segitiga sama kaki sama besar.", bahas: `(180° − ${p}°) : 2 = ${a}°.` }); },
    () => { const a = acak(60, 120), b = acak(60, 120), c = acak(60, 110), d = 360 - a - b - c; if (d <= 20 || d >= 180) return isian(`Tiga sudut segiempat 90°, 90°, 100°. Sudut keempat …°`, 80, { satuan: "°", bahas: "360 − 280 = 80." });
      return isian(`Tiga sudut sebuah segiempat besarnya ${a}°, ${b}°, dan ${c}°. Besar sudut keempat adalah …°`, d, { satuan: "°", petunjuk: "Jumlah sudut segiempat = 360°.", bahas: `360° − ${a}° − ${b}° − ${c}° = ${d}°.` }); },
  ],
  10: [() => { const h = acak(1, 11), m = acak(1, 29) * 2, d = sudutJam(h, m); return isian(`Pada pukul ${pkl(h * 60 + m)}, besar sudut terkecil antara jarum jam dan jarum menit adalah …°`, d,
    { gambar: svgJam(h, m), satuan: "°", petunjuk: "Jarum menit bergerak 6° per menit. Jarum jam bergerak 0,5° per menit.", bahas: `Jarum menit: ${m} × 6 = ${m * 6}°. Jarum jam: ${h % 12} × 30 + ${m} × 0,5 = ${fmt((h % 12) * 30 + m / 2)}°. Selisih terkecil = ${fmt(d)}°.` }); }],
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
  ],
  3: [
    () => { const b = pilih(RUANG.slice(0, 5)), k = pilih(["sisi", "rusuk", "titik"]); return isian(`Banyak ${k === "titik" ? "titik sudut" : k} pada bangun ${b.n} adalah …`, b[k], { petunjuk: "Bayangkan atau gambar bangunnya.", bahas: `${b.n}: ${b.sisi} sisi, ${b.rusuk} rusuk, ${b.titik} titik sudut.` }); },
    () => { const [b, c] = ambil(RUANG.slice(0, 5), 2), [k1, k2] = [pilih(["sisi", "rusuk", "titik"]), pilih(["sisi", "rusuk", "titik"])], nm = k => (k === "titik" ? "titik sudut" : k);
      return isian(`Banyak ${nm(k1)} ${b.n} ditambah banyak ${nm(k2)} ${c.n} adalah …`, b[k1] + c[k2], { bahas: `${b[k1]} + ${c[k2]} = ${b[k1] + c[k2]}.` }); },
  ],
  4: [
    () => { const b = pilih(DATAR.filter(x => x.lipat !== null && x.lipat !== undefined)); return isian(`Banyak simetri lipat (sumbu simetri) pada bangun <b>${b.n}</b> adalah …`, b.lipat, { petunjuk: "Berapa cara melipat bangun itu sehingga kedua bagian tepat berimpit?", bahas: `${b.n} memiliki ${b.lipat} simetri lipat.` }); },
    () => { const b = pilih(DATAR.filter(x => x.putar)); return isian(`Tingkat simetri putar bangun <b>${b.n}</b> adalah …`, b.putar, { petunjuk: "Berapa kali bangun menempati bingkainya dalam satu putaran penuh?", bahas: `${b.n} memiliki simetri putar tingkat ${b.putar}.` }); },
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
    { gambar: svgJaring(j), petunjuk: "Bayangkan melipatnya. Tidak boleh ada dua persegi yang menjadi sisi yang sama.", bahas: j.sah ? "Jika dilipat, keenam persegi menutup kubus tanpa tumpang tindih." : "Jika dilipat, ada sisi yang bertumpuk dan ada sisi kubus yang tidak tertutup." }); }],
  7: [() => { const sifat = pilih([["memiliki 4 sudut siku-siku", ["persegi", "persegi panjang"]], ["memiliki 4 sisi sama panjang", ["persegi", "belah ketupat"]], ["memiliki tepat 2 simetri lipat", ["persegi panjang", "belah ketupat"]], ["memiliki simetri putar tingkat 2", ["persegi panjang", "belah ketupat", "jajar genjang"]], ["memiliki 3 sisi", ["segitiga sama sisi", "segitiga sama kaki", "segitiga siku-siku"]]]);
    const calon = kocok(["persegi", "persegi panjang", "belah ketupat", "jajar genjang", "layang-layang", "trapesium", "segitiga sama sisi", "segitiga sama kaki", "segitiga siku-siku"]).slice(0, 5); sifat[1].forEach(x => { if (!calon.includes(x) && calon.length < 6) calon.push(x); });
    return pgk(`Pilih <b>semua</b> bangun datar yang ${sifat[0]}.`, calon.map(n => ({ t: n, b: sifat[1].includes(n) })), { bahas: `Yang ${sifat[0]}: ${sifat[1].join(", ")}.` }); }],
  8: [() => { const b = pilih(RUANG.slice(0, 5)), salah = pilih(["sisi", "rusuk", "titik"]);
    return bs(`Tentukan Benar atau Salah tentang bangun <b>${b.n}</b>.`, ["sisi", "rusuk", "titik"].map(k => ({ t: `Memiliki ${k === salah ? b[k] + pilih([1, 2, -1]) : b[k]} ${k === "titik" ? "titik sudut" : k}.`, b: k !== salah })).concat([{ t: `Memiliki ${b.ciri}.`, b: true }]),
      { bahas: `${b.n}: ${b.sisi} sisi, ${b.rusuk} rusuk, ${b.titik} titik sudut.` }); }],
  9: [() => { const n = pilih([5, 6, 7, 8, 9, 10, 12]), jenis = ya() ? "prisma" : "limas", d = jenis === "prisma" ? prisma(n) : limas(n), k = pilih(["sisi", "rusuk", "titik"]);
    return isian(`Banyak ${k === "titik" ? "titik sudut" : k} pada bangun <b>${jenis} ${SEGI[n]}</b> adalah …`, d[k], { petunjuk: jenis === "prisma" ? "Prisma segi-n: sisi n + 2, rusuk 3 × n, titik sudut 2 × n." : "Limas segi-n: sisi n + 1, rusuk 2 × n, titik sudut n + 1.", bahas: `${jenis} ${SEGI[n]}: ${d.sisi} sisi, ${d.rusuk} rusuk, ${d.titik} titik sudut.` }); }],
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
function svgKoord(titik, o = {}) { const u = 26, n = o.n || 8, m = 26; let s = svgBuka(n * u + m + 16, n * u + m + 14, "bidang koordinat");
  const X = x => m + x * u, Y = y => n * u + 6 - y * u;
  for (let i = 0; i <= n; i++) s += `<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(n)}" class="kisi"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(n)}" y2="${Y(i)}" class="kisi"/>` + svgT(X(i), Y(0) + 15, i, 'text-anchor="middle" class="kecil"') + (i ? svgT(X(0) - 8, Y(i) + 4, i, 'text-anchor="end" class="kecil"') : "");
  s += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(n)}" y2="${Y(0)}" class="sumbu"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(n)}" class="sumbu"/>`;
  if (o.poligon) s += `<polygon points="${o.poligon.map(p => X(p[0]) + "," + Y(p[1])).join(" ")}" class="arsir"/>`;
  titik.forEach(t => { s += `<circle cx="${X(t.x)}" cy="${Y(t.y)}" r="4.5" class="titik-k"/>` + svgT(X(t.x) + 7, Y(t.y) - 6, t.n, 'class="lbl"'); });
  return s + "</svg>"; }
const titikAcak = (k, n = 8) => { const h = [], dipakai = new Set(); const hur = ["A", "B", "C", "D", "E", "F", "G", "H"]; while (h.length < k) { const x = acak(1, n), y = acak(1, n); if (!dipakai.has(x + "," + y)) { dipakai.add(x + "," + y); h.push({ n: hur[h.length], x, y }); } } return h; };
const kd = (x, y) => `(${x}, ${y})`;
const TEMPAT_DENAH = [["🏫", "Sekolah"], ["🏠", "Rumah"], ["🕌", "Masjid"], ["🏥", "Puskesmas"], ["🛒", "Pasar"], ["📚", "Perpustakaan"], ["⚽", "Lapangan"], ["🏦", "Bank"], ["🌳", "Taman"]];
function denahAcak(k) { const t = ambil(TEMPAT_DENAH, k), dip = new Set(); return t.map(([ik, nm]) => { let x, y; do { x = acak(0, 5); y = acak(0, 5); } while (dip.has(x + "," + y)); dip.add(x + "," + y); return { ik, nm, x, y }; }); }
function svgDenah(T) { const u = 46; let s = svgBuka(6 * u + 60, 6 * u + 30, "denah");
  for (let i = 0; i <= 6; i++) s += `<line x1="${10 + i * u}" y1="20" x2="${10 + i * u}" y2="${20 + 6 * u}" class="kisi"/><line x1="10" y1="${20 + i * u}" x2="${10 + 6 * u}" y2="${20 + i * u}" class="kisi"/>`;
  T.forEach(t => { s += svgT(10 + t.x * u + u / 2, 20 + (5 - t.y) * u + u / 2 + 2, t.ik, 'text-anchor="middle" class="emoji"') + svgT(10 + t.x * u + u / 2, 20 + (5 - t.y) * u + u - 4, t.nm, 'text-anchor="middle" class="mini"'); });
  s += `<g transform="translate(${6 * u + 36},40)"><line x1="0" y1="18" x2="0" y2="-12" class="kaki"/><path d="M-5 -6L0 -16L5 -6Z" class="panah"/>${svgT(0, 34, "U", 'text-anchor="middle" class="lbl"')}</g>`;
  return s + "</svg>"; }
const ARAH = (dx, dy) => (dx === 0 ? (dy > 0 ? "utara" : "selatan") : dy === 0 ? (dx > 0 ? "timur" : "barat") : dy > 0 ? (dx > 0 ? "timur laut" : "barat laut") : dx > 0 ? "tenggara" : "barat daya");
const SEMUA_ARAH = ["utara", "selatan", "timur", "barat", "timur laut", "barat laut", "tenggara", "barat daya"];
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
    return isian(`Jarak titik P ke titik Q adalah … satuan.`, x2 - x1, { gambar: svgKoord(T), satuan: "satuan", bahas: `Jaraknya ${x2} − ${x1} = ${x2 - x1} satuan.` }); }],
  4: [
    () => { const T = titikAcak(1, 5), t = T[0], dx = acak(1, 3), dy = acak(1, 3), mend = ya(), nx = t.x + dx, ny = t.y + dy;
      return isian(`Titik <b>${t.n}</b> digeser ${dx} satuan ke kanan dan ${dy} satuan ke atas. Koordinat ${mend ? "mendatar (angka pertama)" : "tegak (angka kedua)"} titik barunya adalah …`, mend ? nx : ny, { gambar: svgKoord(T), petunjuk: "Ke kanan menambah angka pertama, ke atas menambah angka kedua.", bahas: `${kd(t.x, t.y)} → ${kd(nx, ny)}.` }); },
    keTKA(() => { const T = titikAcak(1, 5), t = T[0], dx = acak(1, 3), dy = acak(1, 3), ka = ya(), at = ya(); const nx = t.x + (ka ? dx : -dx), ny = t.y + (at ? dy : -dy); if (nx < 0 || ny < 0) return pg(`Titik A(2, 3) digeser 2 satuan ke kanan. Koordinatnya menjadi …`, kd(4, 3), [kd(2, 5), kd(0, 3), kd(4, 5)], { bahas: "(4, 3)." });
    return pg(`Titik <b>${t.n}</b> digeser ${dx} satuan ke ${ka ? "kanan" : "kiri"} dan ${dy} satuan ke ${at ? "atas" : "bawah"}. Koordinat barunya adalah …`, kd(nx, ny), [kd(t.x + (ka ? -dx : dx), ny), kd(nx, t.y + (at ? -dy : dy)), kd(t.x + (at ? dy : -dy), t.y + (ka ? dx : -dx)), kd(ny, nx)], { gambar: svgKoord(T), bahas: `${kd(t.x, t.y)} → ${kd(nx, ny)}.` }); }),
  ],
  5: [
    () => { const sk = pilih([100, 200, 250, 500, 1000]), cm = acak(2, 12); return isian(`Pada denah berskala 1 : ${fmt(sk)}, jarak dua tempat ${cm} cm. Jarak sebenarnya adalah … m.`, cm * sk / 100, { satuan: "m", petunjuk: "Jarak sebenarnya = jarak denah × skala, lalu ubah cm ke m.", bahas: `${cm} × ${fmt(sk)} = ${fmt(cm * sk)} cm = ${fmt(cm * sk / 100)} m.` }); },
    () => { const sk = pilih([100000, 200000, 250000, 500000]), cm = acak(2, 9); return isian(`Pada peta berskala 1 : ${fmt(sk)}, jarak dua kota ${cm} cm. Jarak sebenarnya adalah … km.`, cm * sk / 100000, { satuan: "km", petunjuk: "1 km = 100.000 cm.", bahas: `${cm} × ${fmt(sk)} = ${fmt(cm * sk)} cm = ${fmt(cm * sk / 100000)} km.` }); },
  ],
  6: [() => { const T = denahAcak(5), [a, b] = ambil(T, 2), r = ARAH(b.x - a.x, b.y - a.y); return pg(`Perhatikan denah. ${b.nm} terletak di sebelah … dari ${a.nm}.`, r, SEMUA_ARAH.filter(x => x !== r), { gambar: svgDenah(T), petunjuk: "Arah atas pada denah = utara.", bahas: `Dari ${a.nm}, ${b.nm} berada di arah ${r}.` }); }],
  7: [() => { let T, a, b; do { T = denahAcak(5); [a, b] = ambil(T, 2); } while (a.x === b.x || a.y === b.y); const dx = b.x - a.x, dy = b.y - a.y;
    return pg(`Perhatikan denah. ${nama()} berangkat dari ${a.nm}, berjalan ${Math.abs(dx)} kotak ke ${dx > 0 ? "timur" : "barat"}, lalu ${Math.abs(dy)} kotak ke ${dy > 0 ? "utara" : "selatan"}. Ia tiba di …`, b.nm, T.filter(t => t !== a && t !== b).map(t => t.nm), { gambar: svgDenah(T), bahas: `Rutenya berakhir di ${b.nm}.` }); }],
  8: [() => { const x1 = acak(1, 3), y1 = acak(1, 3), x2 = acak(x1 + 2, 8), y2 = acak(y1 + 2, 8); const T = [{ n: "A", x: x1, y: y1 }, { n: "B", x: x2, y: y1 }, { n: "C", x: x2, y: y2 }];
    return pg(`Titik A, B, dan C adalah titik sudut persegi panjang ABCD. Koordinat titik D adalah …`, kd(x1, y2), [kd(y2, x1), kd(x2, y1 + y2 - y1 + 1), kd(x1 + 1, y2), kd(x1, y1 + 1)], { gambar: svgKoord(T), petunjuk: "D sejajar tegak dengan A dan sejajar mendatar dengan C.", bahas: `D = ${kd(x1, y2)}.` }); }],
  9: [
    () => { const x1 = acak(0, 3), y1 = acak(0, 3), x2 = acak(x1 + 2, 8), y2 = acak(y1 + 2, 8); const P = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
      return isian(`Luas persegi panjang ABCD pada gambar adalah … satuan luas.`, (x2 - x1) * (y2 - y1), { gambar: svgKoord(P.map((p, i) => ({ n: "ABCD"[i], x: p[0], y: p[1] })), { poligon: P }), bahas: `Panjang ${x2 - x1}, lebar ${y2 - y1}. Luas ${(x2 - x1) * (y2 - y1)}.` }); },
    () => { const x1 = acak(0, 3), y1 = acak(0, 3), a = acak(2, 6), t = acak(2, 6) ; if ((a * t) % 2) return isian(`Segitiga A(1,1), B(5,1), C(1,4). Luasnya …`, 6, { bahas: "4 × 3 : 2 = 6." }); const P = [[x1, y1], [x1 + a, y1], [x1, y1 + t]];
      return isian(`Luas segitiga ABC pada gambar adalah … satuan luas.`, a * t / 2, { gambar: svgKoord(P.map((p, i) => ({ n: "ABC"[i], x: p[0], y: p[1] })), { poligon: P }), petunjuk: "Alas dan tinggi bisa dihitung dari kotak-kotaknya.", bahas: `Alas ${a}, tinggi ${t}. Luas ${a} × ${t} : 2 = ${a * t / 2}.` }); },
  ],
  10: [
    () => { const sk = pilih([100000, 200000, 250000, 500000]), a = acak(2, 8) + pilih([0, 0.5]), b = acak(2, 8) + pilih([0, 0.5]), km = (a + b) * sk / 100000;
      return isian(`Pada peta berskala 1 : ${fmt(sk)}, jarak kota A ke B ${fmt(a)} cm dan kota B ke C ${fmt(b)} cm. Jarak sebenarnya dari A ke C melalui B adalah … km.`, km, { satuan: "km", bahas: `(${fmt(a)} + ${fmt(b)}) × ${fmt(sk)} = ${fmt((a + b) * sk)} cm = ${fmt(km)} km.` }); },
    () => { const T = titikAcak(1, 6), t = T[0], k = acak(t.x + 1, 8); const nx = 2 * k - t.x; if (nx > 12) return pg(`Titik (2, 3) dicerminkan terhadap garis x = 4. Bayangannya …`, kd(6, 3), [kd(2, 5), kd(4, 3), kd(6, 5)], { bahas: "(6, 3)." });
      return pg(`Titik <b>${t.n}${kd(t.x, t.y)}</b> dicerminkan terhadap garis tegak yang melalui x = ${k}. Koordinat bayangannya adalah …`, kd(nx, t.y), [kd(t.x, 2 * k - t.y), kd(k, t.y), kd(nx + 1, t.y), kd(2 * k + t.x, t.y)], { gambar: svgKoord(T), petunjuk: `Jarak titik ke garis = ${k - t.x}. Bayangannya sejauh itu di seberang garis.`, bahas: `${t.x} → ${k} → ${nx}. Bayangan ${kd(nx, t.y)}.` }); },
  ],
});
