/* Pos 1 — Bilangan: 7 misi × 10 level */
"use strict";

/* ---------- Bantuan bilangan ---------- */
const TEMPAT = ["satuan", "puluhan", "ratusan", "ribuan", "puluh ribuan", "ratus ribuan", "jutaan"];
const angkaDari = n => String(n).split("").reverse().map(Number);          // [satuan, puluhan, ...]
function bilAcak(pj, beda = false) {                                      // pj angka, angka pertama bukan 0
  if (!beda) return acak(10 ** (pj - 1), 10 ** pj - 1);
  const d = [acak(1, 9)]; while (d.length < pj) { const x = acak(0, 9); if (!d.includes(x)) d.push(x); }
  return +d.join("");
}
function* permutasi(arr) {
  if (arr.length <= 1) { yield arr; return; }
  for (let i = 0; i < arr.length; i++) for (const p of permutasi(arr.slice(0, i).concat(arr.slice(i + 1)))) yield [arr[i], ...p];
}
/* Variasi salah tulis sebuah bilangan (menukar angka, menambah/membuang nol) */
function salahTulis(n) {
  const s = String(n), hasil = new Set();
  for (let i = 0; i < s.length - 1; i++) if (s[i] !== s[i + 1]) hasil.add(+(s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2)));
  const nol = s.indexOf("0", 1); if (nol > 0) hasil.add(+(s.slice(0, nol) + s.slice(nol + 1))), hasil.add(+(s.slice(0, nol) + "0" + s.slice(nol)));
  hasil.add(+(s.slice(0, 1) + "0" + s.slice(1)));
  hasil.delete(n); return kocok([...hasil].filter(x => String(x).length >= s.length - 1));
}
const pembulatan = (n, k) => Math.round(n / k) * k;                      // k = 10, 100, 1000, ...
const NAMA_BULAT = { 10: "puluhan", 100: "ratusan", 1000: "ribuan", 10000: "puluh ribuan", 100000: "ratus ribuan", 1000000: "jutaan" };

/* ================= Misi 1: Nilai tempat ================= */
daftarMisi("bil", "b1", "Nilai tempat & membaca bilangan", "🔟", {
  1: [
    keTKA(() => { const n = bilAcak(3, true), i = acak(0, 2), d = angkaDari(n)[i];
      return pgTetap(`Pada bilangan <b>${fmt(n)}</b>, angka <b>${d}</b> menempati tempat …`, TEMPAT.slice(0, 4), TEMPAT[i],
        { petunjuk: "Hitung dari kanan: satuan, puluhan, ratusan, ribuan.", bahas: `Dari kanan, angka ${d} berada di urutan ke-${i + 1}, yaitu tempat ${TEMPAT[i]}.` }); }),
    () => { const n = bilAcak(3, true), i = acak(0, 2), d = angkaDari(n)[i];
      return isian(`Angka yang menempati tempat <b>${TEMPAT[i]}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d,
        { petunjuk: "Hitung dari kanan: satuan, puluhan, ratusan.", bahas: `Tempat ${TEMPAT[i]} adalah angka ke-${i + 1} dari kanan, yaitu ${d}.` }); },
    () => { const r = acak(1, 9), p = acak(0, 9), s = acak(0, 9);
      return isian(`Bilangan yang terdiri atas <b>${r} ratusan, ${p} puluhan, dan ${s} satuan</b> adalah …`, r * 100 + p * 10 + s,
        { petunjuk: "Ratusan di depan, lalu puluhan, lalu satuan.", bahas: `${r} ratusan = ${r * 100}, ${p} puluhan = ${p * 10}, ${s} satuan = ${s}. Jumlahnya ${r * 100 + p * 10 + s}.` }); },
  ],
  2: [
    () => { const n = bilAcak(4, true); let i; do i = acak(0, 3); while (angkaDari(n)[i] === 0); const d = angkaDari(n)[i];
      return isian(`Nilai angka <b>${d}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d * 10 ** i,
        { petunjuk: "Nilai angka = angka itu × nilai tempatnya.", bahas: `Angka ${d} ada di tempat ${TEMPAT[i]}, jadi nilainya ${d} × ${fmt(10 ** i)} = ${fmt(d * 10 ** i)}.` }); },
    () => { const n = bilAcak(4, true), a = angkaDari(n), i = acak(1, 2), parts = a.map((d, k) => d * 10 ** k).reverse(), j = 3 - i;
      const tampil = parts.map((x, k) => (k === j ? "□" : fmt(x))).join(" + ");
      return isian(`${fmt(n)} = ${tampil}<br>Nilai □ adalah …`, parts[j], { petunjuk: "Uraikan bilangan menurut nilai tempat.", bahas: `${fmt(n)} = ${parts.map(fmt).join(" + ")}.` }); },
  ],
  3: [
    () => { const n = bilAcak(5), a = angkaDari(n).map((d, k) => d * 10 ** k).reverse().filter(x => x);
      return isian(`Hasil dari ${a.map(fmt).join(" + ")} adalah …`, n, { petunjuk: "Tulis tiap angka di tempatnya.", bahas: `Bentuk panjang itu sama dengan ${fmt(n)}.` }); },
    () => { const n = bilAcak(5, true); let i; do i = acak(2, 4); while (angkaDari(n)[i] === 0); const d = angkaDari(n)[i];
      return isian(`Nilai angka <b>${d}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d * 10 ** i, { bahas: `${d} di tempat ${TEMPAT[i]} → ${fmt(d * 10 ** i)}.` }); },
  ],
  4: [
    () => { const n = bilAcak(6, true), i = acak(2, 5), d = angkaDari(n)[i];
      return isian(`Angka yang menempati tempat <b>${TEMPAT[i]}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d,
        { petunjuk: "Hitung dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan, ratus ribuan.", bahas: `Tempat ${TEMPAT[i]} adalah angka ke-${i + 1} dari kanan, yaitu ${d}.` }); },
    keTKA(() => { const n = bilAcak(6, true); let i; do i = acak(3, 5); while (angkaDari(n)[i] === 0); const d = angkaDari(n)[i];
      return pg(`Nilai angka <b>${d}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, fmt(d * 10 ** i), [d * 10 ** (i - 1), d * 10 ** (i + 1), d * 10 ** (i - 2), d].map(fmt),
        { bahas: `${d} di tempat ${TEMPAT[i]}, nilainya ${fmt(d * 10 ** i)}.` }); }),
    () => { const n = bilAcak(6, true); let i; do i = acak(3, 5); while (angkaDari(n)[i] === 0); const d = angkaDari(n)[i];
      return isian(`Nilai angka <b>${d}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d * 10 ** i, { bahas: `${d} di tempat ${TEMPAT[i]}, nilainya ${fmt(d * 10 ** i)}.` }); },
  ],
  5: [
    keTKA(() => { const s = String(bilAcak(6)).split(""); s[acak(1, 4)] = "0"; const n = +s.join("");
      return pg(`Lambang bilangan dari <i>"${terbilang(n)}"</i> adalah …`, fmt(n), salahTulis(n).map(fmt),
        { petunjuk: "Tulis bagian ribuannya dulu, lalu sisanya tiga angka.", bahas: `${terbilang(n)} = ${fmt(n)}.` }); }),
    keTKA(() => { const s = String(bilAcak(5)).split(""); s[acak(1, 3)] = "0"; const n = +s.join("");
      return pg(`Bilangan <b>${fmt(n)}</b> dibaca …`, terbilang(n), salahTulis(n).map(terbilang), { bahas: `${fmt(n)} dibaca "${terbilang(n)}".` }); }, 7),
    () => { const s = String(bilAcak(6)).split(""); s[acak(1, 4)] = "0"; const n = +s.join("");
      return isian(`Tulis lambang bilangan dari <i>"${terbilang(n)}"</i>.`, n, { petunjuk: "Tulis bagian ribuannya dulu, lalu sisanya selalu tiga angka (pakai 0 bila perlu).", bahas: `${terbilang(n)} = ${fmt(n)}.` }); },
    () => { const a = [acak(1, 9), acak(0, 9), acak(0, 9), acak(0, 9), acak(0, 9), acak(0, 9)], n = +a.join(""), nm = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
      return isian(`Bilangan yang terdiri atas ${a.map((d, i) => `<b>${d} ${nm[i]}</b>`).join(", ")} adalah …`, n, { petunjuk: "Tulis angkanya berurutan dari ratus ribuan sampai satuan.", bahas: `Bilangannya ${fmt(n)}.` }); },
  ],
  6: [
    () => { const n = bilAcak(7, true); let i; do i = acak(4, 6); while (angkaDari(n)[i] === 0); const d = angkaDari(n)[i];
      return isian(`Nilai angka <b>${d}</b> pada bilangan <b>${fmt(n)}</b> adalah …`, d * 10 ** i, { bahas: `${d} di tempat ${TEMPAT[i]}, nilainya ${fmt(d * 10 ** i)}.` }); },
    () => { const d = acak(2, 9), i = acak(4, 6), j = acak(0, 2), a = angkaDari(bilAcak(7));
      for (let k = 0; k < 7; k++) if (a[k] === d && k !== i && k !== j) a[k] = (d + acak(1, 8)) % 10 || 1;
      a[i] = d; a[j] = d; if (a[6] === 0) a[6] = d === 1 ? 2 : 1; const n = +a.slice().reverse().join("");
      const v = d * 10 ** i - d * 10 ** j;
      return isian(`Pada bilangan <b>${fmt(n)}</b>, selisih nilai angka <b>${d}</b> yang paling kiri dan angka <b>${d}</b> yang paling kanan adalah …`, v,
        { petunjuk: "Cari nilai masing-masing angka, lalu kurangkan.", bahas: `${fmt(d * 10 ** i)} − ${fmt(d * 10 ** j)} = ${fmt(v)}.` }); },
  ],
  7: [
    () => { const kota = pilih(["Kota Bunga", "Kota Pelangi", "Kabupaten Sejahtera", "Kota Harapan"]), s = String(bilAcak(7)).split(""); s[acak(2, 5)] = "0"; const n = +s.join("");
      return pg(`Jumlah penduduk ${kota} adalah <b>${fmt(n)} jiwa</b>. Cara membaca bilangan tersebut adalah …`, terbilang(n), salahTulis(n).map(terbilang),
        { bahas: `${fmt(n)} dibaca "${terbilang(n)}".` }); },
    () => { const benda = pilih(["Penonton konser", "Pengunjung pameran buku", "Peserta lomba lari", "Pembaca majalah anak"]), n = bilAcak(7, true), i = acak(3, 6), d = angkaDari(n)[i];
      return isian(`${benda} tercatat <b>${fmt(n)} orang</b>. Angka pada tempat <b>${TEMPAT[i]}</b> dari bilangan itu bernilai …`, d * 10 ** i,
        { petunjuk: "Temukan angkanya dulu, lalu kalikan dengan nilai tempatnya.", bahas: `Angka di tempat ${TEMPAT[i]} adalah ${d}, nilainya ${fmt(d * 10 ** i)}.` }); },
  ],
  8: [
    () => { const n = bilAcak(7, true), a = angkaDari(n), pos = kocok([0, 1, 2, 3, 4, 5, 6].filter(k => a[k])).slice(0, 3);
      const [i1, i2, i3] = pos, geser = i3 === 6 ? 5 : i3 + 1, benarBaca = ya();
      const butir = [
        { t: `Angka ${a[i1]} bernilai ${fmt(a[i1] * 10 ** i1)}.`, b: true },
        ya() ? { t: `Angka ${a[i2]} menempati tempat ${TEMPAT[i2]}.`, b: true } : { t: `Angka ${a[i2]} menempati tempat ${TEMPAT[i2 === 6 ? 5 : i2 + 1]}.`, b: false },
        benarBaca ? { t: `Bilangan itu dibaca "${terbilang(n)}".`, b: true } : { t: `Bilangan itu dibaca "${terbilang(salahTulis(n)[0])}".`, b: false },
        { t: `Angka ${a[i3]} bernilai ${fmt(a[i3] * 10 ** geser)}.`, b: false },
      ];
      return bs(`Perhatikan bilangan <b>${fmt(n)}</b>. Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan.`, butir,
        { petunjuk: "Periksa satu per satu. Tuliskan nilai tempat di atas setiap angka.", bahas: `Uraian: ${a.map((d, k) => `${d} (${TEMPAT[k]})`).reverse().join(", ")}.` }); },
    () => { const n = bilAcak(7, true), a = angkaDari(n), salah = acak(3, 6);
      const butir = [0, 1, 2, 3, 4, 5, 6].filter(k => a[k]).slice(-4).map(k => (k === salah ? { t: `Nilai angka ${a[k]} adalah ${fmt(a[k] * 10 ** (k - 1))}`, b: false } : { t: `Nilai angka ${a[k]} adalah ${fmt(a[k] * 10 ** k)}`, b: true }));
      if (butir.every(b => b.b)) butir[0] = { t: butir[0].t.replace(/adalah .*/, "adalah " + fmt(+butir[0].t.match(/angka (\d)/)[1] * 10 ** 9)), b: false };
      return pgk(`Pilih <b>semua</b> pernyataan yang benar tentang bilangan <b>${fmt(n)}</b>.`, butir, { bahas: `Uraian: ${a.map((d, k) => fmt(d * 10 ** k)).reverse().join(" + ")}.` }); },
  ],
  9: [
    () => { const kartu = ambil([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5); if (!kartu.includes(0)) kartu[0] = 0; const besar = ya();
      const urut = kartu.slice().sort((x, y) => (besar ? y - x : x - y)); if (!besar && urut[0] === 0) { const k = urut.findIndex(x => x > 0); [urut[0], urut[k]] = [urut[k], urut[0]]; }
      const n = +urut.join("");
      return isian(`Kartu angka: <b>${kartu.join(", ")}</b>. Setiap kartu dipakai tepat satu kali. Bilangan 5 angka <b>${besar ? "terbesar" : "terkecil"}</b> yang dapat disusun adalah …`, n,
        { petunjuk: besar ? "Taruh angka terbesar paling kiri." : "Angka paling kiri tidak boleh 0!", bahas: `Susunannya ${fmt(n)}.` }); },
    () => { const kartu = ambil([1, 2, 3, 4, 5, 6, 7, 8, 9], 4).concat([0]); const b = +kartu.slice().sort((x, y) => y - x).join("");
      const u = kartu.slice().sort((x, y) => x - y); const k = u.findIndex(x => x > 0); [u[0], u[k]] = [u[k], u[0]]; const kc = +u.join("");
      return isian(`Dari kartu <b>${kocok(kartu).join(", ")}</b> (masing-masing dipakai sekali) dibuat bilangan 5 angka terbesar dan terkecil. Selisih kedua bilangan itu adalah …`, b - kc,
        { petunjuk: "Cari dulu bilangan terbesar dan terkecil.", bahas: `Terbesar ${fmt(b)}, terkecil ${fmt(kc)}, selisih ${fmt(b - kc)}.` }); },
  ],
  10: [
    () => { const kartu = ambil([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 6), syarat = pilih(["genap", "ganjil", "kelipatan 5"]), besar = ya();
      const cocok = n => (syarat === "genap" ? n % 2 === 0 : syarat === "ganjil" ? n % 2 === 1 : n % 5 === 0);
      let best = null;
      for (const p of permutasi(kartu)) { if (p[0] === 0) continue; const n = +p.join(""); if (cocok(n) && (best === null || (besar ? n > best : n < best))) best = n; }
      if (best === null) return pilih(this_b1_10)();
      return isian(`Kartu angka: <b>${kartu.join(", ")}</b>. Setiap kartu dipakai tepat satu kali untuk membuat bilangan 6 angka. Bilangan <b>${syarat}</b> ${besar ? "terbesar" : "terkecil"} yang dapat dibuat adalah …`, best,
        { petunjuk: `Tentukan dulu angka satuannya agar ${syarat}, lalu susun sisanya.`, bahas: `Jawabannya ${fmt(best)}.` }); },
    () => { const kartu = ambil([1, 2, 3, 4, 5, 6, 7, 8, 9], 4), x = pilih([3, 4, 6, 9]), set = new Set();
      for (const p of permutasi(kartu)) { const n = +p.join(""); if (n % x === 0) set.add(n); }
      return isian(`Dari kartu <b>${kartu.join(", ")}</b> disusun bilangan 4 angka (setiap kartu dipakai sekali). Ada berapa bilangan yang <b>habis dibagi ${x}</b>?`, set.size,
        { petunjuk: x === 3 || x === 9 ? `Bilangan habis dibagi ${x} jika jumlah angkanya habis dibagi ${x}.` : `Perhatikan angka-angka terakhirnya.`, bahas: `Ada ${set.size} bilangan.` }); },
  ],
});
const this_b1_10 = [() => isian("Nilai angka 7 pada bilangan 4.738.215 adalah …", 700000, { bahas: "7 di tempat ratus ribuan → 700.000." })];

/* ================= Misi 2: Membandingkan & membulatkan ================= */
daftarMisi("bil", "b2", "Membandingkan, mengurutkan, membulatkan", "⚖️", {
  1: [
    keTKA(() => { const a = bilAcak(3), b = ya(0.1) ? a : Math.floor(a / 100) * 100 + acak(0, 99); const t = a > b ? ">" : a < b ? "<" : "=";
      return pgTetap(`${fmt(a)} … ${fmt(b)}<br>Tanda yang tepat adalah …`, [">", "<", "="], t, { petunjuk: "Bandingkan dari angka paling kiri.", bahas: `${fmt(a)} ${t} ${fmt(b)}.` }); }),
    () => { const x = new Set(); while (x.size < 3) x.add(bilAcak(3)); const a = [...x], b = ya(), j = b ? Math.max(...a) : Math.min(...a);
      return isian(`Bilangan <b>${b ? "terbesar" : "terkecil"}</b> di antara ${a.map(fmt).join(", ")} adalah …`, j, { petunjuk: "Bandingkan ratusannya dulu.", bahas: `Jawabannya ${fmt(j)}.` }); },
    () => { const a = bilAcak(3), b = a + acak(1, 30); return isian(`Selisih ${fmt(b)} dan ${fmt(a)} adalah …`, b - a, { bahas: `${fmt(b)} − ${fmt(a)} = ${b - a}.` }); },
    keTKA(() => { const x = [bilAcak(3), bilAcak(3), bilAcak(3)]; const b = ya(); const j = b ? Math.max(...x) : Math.min(...x);
      return pg(`Bilangan <b>${b ? "terbesar" : "terkecil"}</b> di antara ${x.map(fmt).join(", ")} adalah …`, fmt(j), x.filter(v => v !== j).map(fmt).concat([fmt(j + 1)]),
        { bahas: `Bandingkan ratusannya dulu. Jawabannya ${fmt(j)}.` }); }),
  ],
  2: [
    () => { const d = ambil([1, 2, 3, 4, 5, 6, 7, 8, 9], 4); const x = new Set(); while (x.size < 4) x.add(+kocok(d).join("")); const arr = [...x], b = ya(), j = b ? Math.max(...arr) : Math.min(...arr);
      return isian(`Bilangan <b>${b ? "terbesar" : "terkecil"}</b> di antara ${arr.map(fmt).join(", ")} adalah …`, j, { petunjuk: "Angkanya sama, bandingkan urutannya dari kiri.", bahas: `Jawabannya ${fmt(j)}.` }); },
    () => { const d = ambil([1, 2, 3, 4, 5, 6, 7, 8, 9], 4), b = ya(), n = +d.sort((x, y) => (b ? y - x : x - y)).join("");
      return isian(`Dari angka ${kocok(d).join(", ")} (masing-masing dipakai sekali), bilangan 4 angka <b>${b ? "terbesar" : "terkecil"}</b> yang dapat dibuat adalah …`, n, { bahas: `Jawabannya ${fmt(n)}.` }); },
    keTKA(() => { const a = bilAcak(4), b = a + pilih([-1, 1]) * acak(1, 9) * pilih([1, 10, 100]); const t = a > b ? ">" : "<";
      return pgTetap(`${fmt(a)} … ${fmt(b)}`, [">", "<", "="], t, { bahas: `${fmt(a)} ${t} ${fmt(b)}.` }); }),
  ],
  3: [
    () => { const n = acak(10, 999) * 10 + pilih([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      return isian(`Hasil pembulatan <b>${fmt(n)}</b> ke <b>puluhan terdekat</b> adalah …`, pembulatan(n, 10), { petunjuk: "Lihat angka satuannya: 5 ke atas dibulatkan ke atas.", bahas: `Angka satuan ${n % 10} → ${n % 10 >= 5 ? "naik" : "tetap"}. Hasilnya ${fmt(pembulatan(n, 10))}.` }); },
  ],
  4: [
    () => { const k = pilih([100, 1000]), n = acak(1000, 99999); if (n % k === 0) return isian(`Pembulatan ${fmt(n + 37)} ke ratusan terdekat adalah …`, pembulatan(n + 37, 100), { bahas: "Lihat angka puluhannya." });
      return isian(`Hasil pembulatan <b>${fmt(n)}</b> ke <b>${NAMA_BULAT[k]} terdekat</b> adalah …`, pembulatan(n, k), { petunjuk: `Lihat angka di kanan tempat ${NAMA_BULAT[k]}.`, bahas: `${fmt(n)} ≈ ${fmt(pembulatan(n, k))}.` }); },
  ],
  5: [
    () => { const d = acak(1, 8), x = new Set(); while (x.size < 4) x.add(d * 10000 + acak(0, 9999)); const arr = [...x], urut = arr.slice().sort((a, b) => a - b), k = acak(2, 3), besar = ya();
      return isian(`Bilangan ${arr.map(fmt).join(", ")} diurutkan dari yang <b>${besar ? "terbesar" : "terkecil"}</b>. Bilangan pada urutan ke-${k} adalah …`, besar ? urut[4 - k] : urut[k - 1], { petunjuk: "Bandingkan ribuan, lalu ratusan, dan seterusnya.", bahas: `Urutannya ${(besar ? urut.slice().reverse() : urut).map(fmt).join("; ")}.` }); },
    keTKA(() => { const d = acak(1, 8), x = new Set(); while (x.size < 4) x.add(d * 10000 + acak(0, 9999)); const arr = [...x], benar = arr.slice().sort((a, b) => a - b);
      const salah = []; while (salah.length < 3) { const p = kocok(arr); if (p.join() !== benar.join() && !salah.some(s => s.join() === p.join())) salah.push(p); }
      return pg(`Urutan bilangan dari yang <b>terkecil</b> adalah …`, benar.map(fmt).join("; "), salah.map(s => s.map(fmt).join("; ")), { petunjuk: "Bandingkan ribuan, lalu ratusan, dan seterusnya.", bahas: `Urutannya ${benar.map(fmt).join(" < ")}.` }); }),
  ],
  6: [
    () => { const k = pilih([10000, 100000, 1000000]), n = acak(1000000, 9999999);
      return isian(`Hasil pembulatan <b>${fmt(n)}</b> ke <b>${NAMA_BULAT[k]} terdekat</b> adalah …`, pembulatan(n, k), { bahas: `${fmt(n)} ≈ ${fmt(pembulatan(n, k))}.` }); },
  ],
  7: [
    () => { const a = acak(1100, 9800), b = acak(1100, 9800), op = ya() ? "+" : "−"; const [x, y] = op === "−" && a < b ? [b, a] : [a, b];
      const h = op === "+" ? pembulatan(x, 1000) + pembulatan(y, 1000) : pembulatan(x, 1000) - pembulatan(y, 1000);
      return isian(`Taksiran hasil <b>${fmt(x)} ${op} ${fmt(y)}</b> dengan membulatkan setiap bilangan ke <b>ribuan terdekat</b> adalah …`, h,
        { petunjuk: "Bulatkan dulu tiap bilangan, baru hitung.", bahas: `${fmt(pembulatan(x, 1000))} ${op} ${fmt(pembulatan(y, 1000))} = ${fmt(h)}.` }); },
    () => { const harga = [acak(18, 49) * 1000 + acak(1, 9) * 100, acak(18, 49) * 1000 + acak(1, 9) * 100, acak(18, 49) * 1000 + acak(1, 9) * 100]; const h = harga.reduce((s, x) => s + pembulatan(x, 1000), 0);
      return isian(`Ibu membeli tiga barang seharga ${harga.map(rp).join(", ")}. Jika setiap harga dibulatkan ke ribuan terdekat, taksiran jumlah belanja Ibu adalah Rp …`, h,
        { bahas: `${harga.map(x => rp(pembulatan(x, 1000))).join(" + ")} = ${rp(h)}.` }); },
  ],
  8: [
    () => { const X = acak(12, 89) * 1000; const c = [X - 500, X + 499, X - acak(1, 499), X + acak(1, 498), X + 500, X - 501, X - acak(600, 900)];
      return pgk(`Pilih <b>semua</b> bilangan yang jika dibulatkan ke ribuan terdekat menjadi <b>${fmt(X)}</b>.`, ambil(c, 5).map(v => ({ t: fmt(v), b: pembulatan(v, 1000) === X })),
        { petunjuk: `Bilangan itu harus di antara ${fmt(X - 500)} dan ${fmt(X + 499)}.`, bahas: `Bilangan dari ${fmt(X - 500)} sampai ${fmt(X + 499)} dibulatkan menjadi ${fmt(X)}.` }); },
    () => { const hari = ["Senin", "Selasa", "Rabu", "Kamis"], v = hari.map(() => acak(12000, 13999)); const t = Math.max(...v), h = hari[v.indexOf(t)];
      return pg(`Pengunjung taman bermain: ${hari.map((x, i) => `${x} ${fmt(v[i])} orang`).join(", ")}. Hari dengan pengunjung <b>paling banyak</b> adalah …`, h, hari.filter(x => x !== h), { bahas: `${fmt(t)} adalah yang terbesar.` }); },
  ],
  9: [
    () => { const k = pilih([100, 1000]), X = acak(12, 98) * k * (k === 100 ? 1 : 1), kecil = ya();
      const v = kecil ? X - k / 2 : X + k / 2 - 1;
      return isian(`Bilangan cacah <b>${kecil ? "terkecil" : "terbesar"}</b> yang jika dibulatkan ke ${NAMA_BULAT[k]} terdekat menjadi <b>${fmt(X)}</b> adalah …`, v,
        { petunjuk: `Ingat: setengah dari ${fmt(k)} adalah ${fmt(k / 2)}.`, bahas: `Bilangan dari ${fmt(X - k / 2)} sampai ${fmt(X + k / 2 - 1)} dibulatkan menjadi ${fmt(X)}. Jawabannya ${fmt(v)}.` }); },
  ],
  10: [
    () => { const X = acak(20, 98) * 100, sy = pilih(["ganjil", "genap", "kelipatan 3", "kelipatan 4"]);
      const f = { ganjil: n => n % 2 === 1, genap: n => n % 2 === 0, "kelipatan 3": n => n % 3 === 0, "kelipatan 4": n => n % 4 === 0 }[sy];
      let c = 0; for (let n = X - 50; n <= X + 49; n++) if (f(n)) c++;
      return isian(`Ada berapa bilangan <b>${sy}</b> yang jika dibulatkan ke ratusan terdekat hasilnya <b>${fmt(X)}</b>?`, c,
        { petunjuk: `Tentukan dulu batasnya: dari ${fmt(X - 50)} sampai ${fmt(X + 49)}.`, bahas: `Dari ${fmt(X - 50)} sampai ${fmt(X + 49)} ada ${c} bilangan ${sy}.` }); },
    () => { const X = acak(2, 9) * 1000 + acak(1, 9) * 100, J = acak(10, 22); let c = 0;
      for (let n = X - 50; n <= X + 49; n++) if (String(n).split("").reduce((s, d) => s + +d, 0) === J) c++;
      if (!c) return isian(`Bilangan cacah terkecil yang dibulatkan ke ratusan terdekat menjadi ${fmt(X)} adalah …`, X - 50, { bahas: `${fmt(X - 50)}.` });
      return isian(`Ada berapa bilangan yang dibulatkan ke ratusan terdekat menjadi <b>${fmt(X)}</b> dan <b>jumlah angka-angkanya ${J}</b>?`, c,
        { petunjuk: `Daftar bilangan dari ${fmt(X - 50)} sampai ${fmt(X + 49)} yang jumlah angkanya ${J}.`, bahas: `Ada ${c} bilangan.` }); },
  ],
});

/* ================= Misi 3: Operasi hitung campuran ================= */
const ceritaBarang = () => pilih([["kotak", "kue"], ["kardus", "buku"], ["keranjang", "jeruk"], ["plastik", "permen"], ["peti", "apel"], ["bungkus", "biskuit"]]);
daftarMisi("bil", "b3", "Operasi hitung campuran", "➕", {
  1: [
    () => { const a = acak(12, 89), b = acak(11, 89); return isian(`${a} + ${b} = …`, a + b, { bahas: `${a} + ${b} = ${a + b}.` }); },
    () => { const a = acak(40, 99), b = acak(11, a - 1); return isian(`${a} − ${b} = …`, a - b, { bahas: `${a} − ${b} = ${a - b}.` }); },
  ],
  2: [
    () => { const a = acak(250, 899), b = acak(101, 499), p = ya(); const [x, y] = p ? [a, b] : [a + b, b]; return isian(`${fmt(x)} ${p ? "+" : "−"} ${fmt(y)} = …`, p ? x + y : x - y, { bahas: `Hasilnya ${fmt(p ? x + y : x - y)}.` }); },
    () => { const a = acak(12, 98), b = acak(3, 9); return isian(`${a} × ${b} = …`, a * b, { petunjuk: `${a} × ${b} = (${Math.floor(a / 10) * 10} × ${b}) + (${a % 10} × ${b})`, bahas: `${a} × ${b} = ${a * b}.` }); },
  ],
  3: [
    () => { const a = acak(12, 49), b = acak(11, 29); return isian(`${a} × ${b} = …`, a * b, { bahas: `${a} × ${b} = ${fmt(a * b)}.` }); },
    () => { const b = acak(3, 15), h = acak(12, 60); return isian(`${fmt(b * h)} : ${b} = …`, h, { petunjuk: `Bilangan berapa yang dikali ${b} hasilnya ${b * h}?`, bahas: `${b} × ${h} = ${b * h}, jadi hasilnya ${h}.` }); },
  ],
  4: [
    () => { const a = acak(10, 90), b = acak(3, 12), c = acak(3, 12); return isian(`${a} + ${b} × ${c} = …`, a + b * c, { petunjuk: "Kali dan bagi dikerjakan lebih dulu!", bahas: `${b} × ${c} = ${b * c}, lalu ${a} + ${b * c} = ${a + b * c}.` }); },
    () => { const c = acak(3, 9), q = acak(4, 12), b = c * q, a = acak(q + 5, 99); return isian(`${a} − ${b} : ${c} = …`, a - q, { petunjuk: "Bagi dulu, baru kurangi.", bahas: `${b} : ${c} = ${q}, lalu ${a} − ${q} = ${a - q}.` }); },
    () => { const a = acak(4, 15), b = acak(4, 15), c = acak(5, Math.min(60, a * b - 1)); return isian(`${a} × ${b} − ${c} = …`, a * b - c, { bahas: `${a * b} − ${c} = ${a * b - c}.` }); },
  ],
  5: [
    () => { const a = acak(5, 40), b = acak(5, 40), c = acak(3, 9); return isian(`(${a} + ${b}) × ${c} = …`, (a + b) * c, { petunjuk: "Kerjakan yang di dalam kurung dulu.", bahas: `(${a + b}) × ${c} = ${(a + b) * c}.` }); },
    () => { const c = acak(3, 9), q = acak(5, 20), b = acak(10, 90), a = b + c * q; return isian(`(${a} − ${b}) : ${c} = …`, q, { bahas: `${a} − ${b} = ${a - b}, lalu ${a - b} : ${c} = ${q}.` }); },
    () => { const a = acak(6, 15), b = acak(6, 15), d = acak(2, 9), q = acak(2, 9), c = d * q; return isian(`${a} × ${b} − ${c} : ${d} = …`, a * b - q, { bahas: `${a * b} − ${q} = ${a * b - q}.` }); },
  ],
  6: [
    () => { const a = acak(12, 35), b = acak(12, 35), c = acak(6, 25), d = acak(6, 25); return isian(`${a} × ${b} + ${c} × ${d} = …`, a * b + c * d, { bahas: `${a * b} + ${c * d} = ${fmt(a * b + c * d)}.` }); },
    () => { const a = acak(20, 80), b = acak(10, 60), c = acak(15, 40), d = acak(2, c - 5); return isian(`(${a} + ${b}) × (${c} − ${d}) = …`, (a + b) * (c - d), { bahas: `${a + b} × ${c - d} = ${fmt((a + b) * (c - d))}.` }); },
    () => { const b = acak(3, 12), q = acak(6, 25), a = b * q, c = acak(4, 15); return isian(`${fmt(a)} : ${b} × ${c} = …`, q * c, { petunjuk: "Kali dan bagi setara: kerjakan dari kiri.", bahas: `${a} : ${b} = ${q}, lalu ${q} × ${c} = ${q * c}.` }); },
  ],
  7: [
    () => { const [w, b] = ceritaBarang(), k = acak(3, 9), p = pilih([4, 5, 6, 8, 10, 12]); let m = acak(6, 30); while ((k * m) % p) m++;
      const x = nama(); return isian(`${x} membeli ${k} ${w} ${b}. Setiap ${w} berisi ${m} ${b}. Semua ${b} dibagikan sama rata kepada ${p} teman. Setiap teman mendapat … ${b}.`, k * m / p,
        { satuan: b, petunjuk: "Hitung semua isinya dulu, lalu bagi.", bahas: `${k} × ${m} = ${k * m}, lalu ${k * m} : ${p} = ${k * m / p}.` }); },
    () => { const a = acak(300, 800), b = acak(40, 150), c = acak(3, 8), d = acak(12, 30);
      return isian(`Di perpustakaan ada ${a} buku. Sebanyak ${b} buku dipinjam siswa. Kemudian datang ${c} kardus buku baru, masing-masing berisi ${d} buku. Banyak buku di perpustakaan sekarang adalah …`, a - b + c * d,
        { satuan: "buku", bahas: `${a} − ${b} + ${c} × ${d} = ${a - b} + ${c * d} = ${a - b + c * d}.` }); },
    () => { const k = acak(8, 25), m = pilih([25, 30, 40, 50]), j = acak(50, k * m - 20);
      return isian(`Sebuah truk mengangkut ${k} karung beras. Setiap karung beratnya ${m} kg. Di pasar, ${j} kg beras dijual. Sisa beras di truk adalah … kg.`, k * m - j, { satuan: "kg", bahas: `${k} × ${m} − ${j} = ${k * m - j} kg.` }); },
  ],
  8: [
    () => { const k = acak(4, 9), m = acak(12, 30), j = acak(10, k * m - 10), x = nama();
      return pg(`Pak ${x} memiliki ${k} kandang. Setiap kandang berisi ${m} ayam. Sebanyak ${j} ayam dijual. Kalimat matematika yang tepat untuk menghitung sisa ayam adalah …`,
        `${k} × ${m} − ${j}`, [`${k} + ${m} − ${j}`, `${k} × (${m} − ${j})`, `(${k} + ${j}) × ${m}`, `${k} × ${m} + ${j}`], { bahas: `Banyak ayam semula ${k} × ${m}, lalu dikurangi ${j}: ${k} × ${m} − ${j} = ${k * m - j}.` }); },
    () => { const x = nama(), a = acak(5, 12), h = acak(3, 8) * 500, b = acak(2, 6), g = acak(4, 9) * 1000, u = pilih([50000, 100000]);
      const tot = a * h + b * g; if (tot >= u) return isian(`${a} × ${b} + ${a} × ${b} = …`, 2 * a * b, { bahas: "Kerjakan perkaliannya dulu." });
      return isian(`${x} membeli ${a} buku tulis seharga ${rp(h)} per buku dan ${b} pulpen seharga ${rp(g)} per buah. ${x} membayar dengan uang ${rp(u)}. Uang kembalian ${x} adalah Rp …`, u - tot,
        { petunjuk: "Hitung harga semua barang, lalu kurangkan dari uang yang dibayar.", bahas: `${a} × ${rp(h)} + ${b} × ${rp(g)} = ${rp(tot)}. Kembalian ${rp(u)} − ${rp(tot)} = ${rp(u - tot)}.` }); },
    () => { const r = acak(3, 6), s = acak(20, 32), t = acak(2, 5), isi = pilih([4, 6, 8, 10, 12]), n = r * s * t, k = Math.ceil(n / isi);
      return isian(`Sebuah sekolah memiliki ${r} kelas. Setiap kelas berisi ${s} siswa. Setiap siswa mendapat ${t} buku. Buku dikemas dalam kardus berisi ${isi} buku. Paling sedikit diperlukan … kardus.`, k,
        { satuan: "kardus", petunjuk: `Hitung semua buku, lalu bagi ${isi}. Jika bersisa, perlu satu kardus lagi!`, bahas: `${r} × ${s} × ${t} = ${n} buku. ${n} : ${isi} = ${fmt(bulat(n / isi, 2))} → ${k} kardus.` }); },
  ],
  9: [
    () => { const x = acak(5, 30), a = acak(3, 9), b = acak(5, 40), c = x * a + b;
      return isian(`Sebuah bilangan dikalikan ${a}, lalu ditambah ${b}. Hasilnya ${c}. Bilangan itu adalah …`, x, { petunjuk: "Kerjakan mundur: kurangi dulu, lalu bagi.", bahas: `${c} − ${b} = ${c - b}, lalu ${c - b} : ${a} = ${x}.` }); },
    () => { const a = acak(3, 9), m = acak(8, 25), ab = a * m, d = acak(3, 9), q = acak(2, Math.floor((ab - 5) / d)), c = ab - d * q, e = acak(5, 50);
      return isian(`(${a} × ${m} − ${c}) : ${d} + ${e} = …`, q + e, { petunjuk: "Kurung dulu (kali sebelum kurang), lalu bagi, terakhir tambah.", bahas: `${a} × ${m} = ${ab}; ${ab} − ${c} = ${d * q}; ${d * q} : ${d} = ${q}; ${q} + ${e} = ${q + e}.` }); },
  ],
  10: [
    () => { const a = acak(13, 89), t = pilih([100, 1000]), b = acak(t === 100 ? 11 : 120, t === 100 ? 89 : 880), c = t - b;
      return isian(`Hitung dengan cara cerdik: <b>${a} × ${b} + ${a} × ${c}</b> = …`, a * t, { petunjuk: `${a} × ${b} + ${a} × ${c} = ${a} × (${b} + ${c})`, bahas: `${a} × (${b} + ${c}) = ${a} × ${t} = ${fmt(a * t)}.` }); },
    () => { const a = acak(13, 99), k = pilih([99, 999, 101]);
      return isian(`Hitung dengan cara cerdik: <b>${a} × ${k}</b> = …`, a * k, { petunjuk: k === 101 ? `${a} × 101 = ${a} × 100 + ${a}` : `${a} × ${k} = ${a} × ${k + 1} − ${a}`, bahas: `Hasilnya ${fmt(a * k)}.` }); },
    () => { const x = acak(6, 40), a = acak(2, 6), b = acak(3, 9), c = acak(5, 40); const v = (x * a - c); if (v % b) return isian(`Sebuah bilangan ditambah 15, lalu dikali 4, hasilnya 120. Bilangan itu adalah …`, 15, { bahas: "120 : 4 = 30, 30 − 15 = 15." });
      return isian(`${nama()} memikirkan sebuah bilangan. Bilangan itu dikali ${a}, dikurangi ${c}, lalu dibagi ${b}. Hasil akhirnya ${v / b}. Bilangan yang dipikirkan adalah …`, x,
        { petunjuk: "Kerjakan mundur dengan operasi kebalikannya.", bahas: `${v / b} × ${b} = ${v}; ${v} + ${c} = ${v + c}; ${v + c} : ${a} = ${x}.` }); },
  ],
});

/* ================= Misi 4: KPK & FPB ================= */
const faktor = n => { const f = []; for (let i = 1; i <= n; i++) if (n % i === 0) f.push(i); return f; };
function faktorPrima(n) { const r = {}; for (let p = 2; n > 1; p++) while (n % p === 0) { r[p] = (r[p] || 0) + 1; n /= p; } return r; }
const tulisFP = f => Object.entries(f).map(([p, e]) => (e > 1 ? `${p}<sup>${e}</sup>` : p)).join(" × ");
const kpk3 = (a, b, c) => kpk(kpk(a, b), c), fpb3 = (a, b, c) => fpb(fpb(a, b), c);
daftarMisi("bil", "b4", "KPK & FPB", "🔁", {
  1: [
    () => { const n = acak(3, 12), k = acak(3, 10); return isian(`Kelipatan ke-${k} dari ${n} adalah …`, n * k, { petunjuk: `Kelipatan ${n}: ${n}, ${2 * n}, ${3 * n}, …`, bahas: `${n} × ${k} = ${n * k}.` }); },
    keTKA(() => { const n = acak(3, 9), b = n * acak(3, 11); return pg(`Bilangan berikut yang merupakan <b>kelipatan ${n}</b> adalah …`, b, [b + 1, b - 1, b + 2, b - 2].filter(x => x % n), { bahas: `${b} = ${n} × ${b / n}.` }); }),
    () => { const n = acak(3, 9), a = n * acak(2, 6), c = a + n * acak(2, 5); let k = 0; for (let x = a + 1; x < c; x++) if (x % n === 0) k++;
      return isian(`Banyak kelipatan ${n} yang lebih dari ${a} dan kurang dari ${c} adalah …`, k, { petunjuk: `Tulis kelipatan ${n} mulai setelah ${a}.`, bahas: `Ada ${k} kelipatan ${n} di antara ${a} dan ${c}.` }); },
  ],
  2: [
    () => { const n = pilih([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48]); return isian(`Banyak faktor dari ${n} adalah …`, faktor(n).length, { petunjuk: "Cari pasangan perkalian yang hasilnya bilangan itu.", bahas: `Faktor ${n}: ${faktor(n).join(", ")} → ${faktor(n).length} faktor.` }); },
    keTKA(() => { const n = pilih([24, 30, 36, 40, 42, 48, 54, 60]), f = pilih(faktor(n).filter(x => x > 2 && x < n)); const s = []; for (let d = 1; s.length < 4 && d < 40; d++) [f + d, f - d].forEach(x => { if (x > 1 && n % x && s.length < 4) s.push(x); });
      return pg(`Bilangan berikut yang merupakan <b>faktor dari ${n}</b> adalah …`, f, s, { bahas: `${n} : ${f} = ${n / f}, tanpa sisa.` }); }),
    () => { const n = pilih([24, 30, 36, 40, 42, 48, 54, 60, 64, 72, 84, 90, 96, 100]), fs = faktor(n), b = ya(); const v = b ? fs[fs.length - 2] : fs[1];
      return isian(`Faktor dari ${n} yang ${b ? "terbesar selain " + n + " sendiri" : "terkecil selain 1"} adalah …`, v, { bahas: `Faktor ${n}: ${fs.join(", ")}.` }); },
    () => { const n = pilih([12, 18, 20, 24, 28, 30, 36, 40, 45]), fs = faktor(n); return isian(`Jumlah semua faktor dari ${n} adalah …`, fs.reduce((a, c) => a + c, 0), { petunjuk: "Tulis semua faktornya, lalu jumlahkan.", bahas: `${fs.join(" + ")} = ${fs.reduce((a, c) => a + c, 0)}.` }); },
  ],
  3: [
    () => { const a = acak(2, 6), b = acak(3, 8); if (a === b) return isian(`KPK dari 4 dan 6 adalah …`, 12, { bahas: "Kelipatan 4: 4, 8, 12. Kelipatan 6: 6, 12." });
      return isian(`Kelipatan persekutuan terkecil (KPK) dari ${a} dan ${b} adalah …`, kpk(a, b), { petunjuk: "Tulis kelipatan masing-masing, cari yang sama paling kecil.", bahas: `KPK ${a} dan ${b} = ${kpk(a, b)}.` }); },
    () => { const g = acak(2, 6), a = g * acak(2, 5), b = g * acak(2, 5); if (a === b) return isian(`FPB dari 12 dan 18 adalah …`, 6, { bahas: "Faktor sama terbesar = 6." });
      return isian(`Faktor persekutuan terbesar (FPB) dari ${a} dan ${b} adalah …`, fpb(a, b), { petunjuk: "Tulis faktor masing-masing, cari yang sama paling besar.", bahas: `Faktor ${a}: ${faktor(a).join(", ")}. Faktor ${b}: ${faktor(b).join(", ")}. FPB = ${fpb(a, b)}.` }); },
    () => { const a = acak(1, 30), b = a + acak(10, 25); let c = 0, l = []; for (let i = a + 1; i < b; i++) if (faktor(i).length === 2) { c++; l.push(i); }
      return isian(`Banyak bilangan prima di antara ${a} dan ${b} adalah …`, c, { petunjuk: "Bilangan prima hanya punya 2 faktor: 1 dan dirinya sendiri.", bahas: `Bilangan primanya: ${l.join(", ") || "tidak ada"}.` }); },
  ],
  4: [
    () => { let a = acak(4, 24), b = acak(4, 24); while (a === b) b = acak(4, 24); return isian(`KPK dari ${a} dan ${b} adalah …`, kpk(a, b), { petunjuk: "Pakai faktorisasi prima: ambil semua faktor dengan pangkat terbesar.", bahas: `${a} = ${tulisFP(faktorPrima(a))}, ${b} = ${tulisFP(faktorPrima(b))}. KPK = ${kpk(a, b)}.` }); },
    () => { const g = acak(3, 16), a = g * acak(2, 6), b = g * acak(2, 6); if (a === b) return isian(`FPB dari 36 dan 48 adalah …`, 12, { bahas: "FPB = 12." });
      return isian(`FPB dari ${a} dan ${b} adalah …`, fpb(a, b), { petunjuk: "Ambil faktor prima yang sama dengan pangkat terkecil.", bahas: `${a} = ${tulisFP(faktorPrima(a))}, ${b} = ${tulisFP(faktorPrima(b))}. FPB = ${fpb(a, b)}.` }); },
  ],
  5: [
    () => { let n; do n = pilih([2, 3]) ** acak(1, 3) * pilih([3, 5, 7, 9, 15, 25, 21]) * pilih([1, 2, 5]); while (Object.keys(faktorPrima(n)).length < 2); const f = faktorPrima(n), k = pilih(Object.keys(f)), sembunyi = ya();
      const tampil = Object.entries(f).map(([p, e]) => (p === k ? (sembunyi ? `${p}<sup>□</sup>` : "□") : e > 1 ? `${p}<sup>${e}</sup>` : p)).join(" × ");
      return isian(`Faktorisasi prima dari <b>${fmt(n)}</b> adalah ${tampil}.<br>Nilai □ adalah …`, sembunyi ? f[k] : +k, { petunjuk: "Gunakan pohon faktor.", bahas: `${fmt(n)} = ${tulisFP(f)}.` }); },
    keTKA(() => { const n = pilih([2, 3]) ** acak(1, 3) * pilih([3, 5, 7, 9, 15, 25, 21]) * pilih([1, 2, 5]); const f = faktorPrima(n), k = Object.keys(f);
      const salah = []; const f1 = { ...f }; f1[k[0]]++; salah.push(tulisFP(f1)); if (f[k[0]] > 1) { const f2 = { ...f }; f2[k[0]]--; salah.push(tulisFP(f2)); }
      const f3 = { ...f }; if (k.length > 1) { f3[k[1]] = (f3[k[1]] || 0) + 1; salah.push(tulisFP(f3)); } salah.push(tulisFP({ ...f, 11: 1 })); salah.push(tulisFP({ 2: 1, ...f, [k[k.length - 1]]: f[k[k.length - 1]] + 1 }));
      return pg(`Faktorisasi prima dari <b>${fmt(n)}</b> adalah …`, tulisFP(f), salah, { petunjuk: "Gunakan pohon faktor.", bahas: `${fmt(n)} = ${tulisFP(f)}.` }); }),
  ],
  6: [
    () => { const [a, b, c] = ambil([4, 6, 8, 9, 10, 12, 15, 18, 20], 3); return isian(`KPK dari ${a}, ${b}, dan ${c} adalah …`, kpk3(a, b, c), { bahas: `KPK = ${kpk3(a, b, c)}.` }); },
    () => { const g = acak(2, 12), [x, y, z] = ambil([2, 3, 4, 5, 6, 7], 3); return isian(`FPB dari ${g * x}, ${g * y}, dan ${g * z} adalah …`, fpb3(g * x, g * y, g * z), { bahas: `FPB = ${fpb3(g * x, g * y, g * z)}.` }); },
  ],
  7: [
    () => { const g = acak(4, 12), [x, y] = ambil([2, 3, 4, 5, 7], 2), [b1, b2] = ambil(["jeruk", "apel", "salak", "mangga", "pisang"], 2), A = g * x, B = g * y, t = ya();
      return isian(`Ibu mempunyai ${A} ${b1} dan ${B} ${b2}. Buah-buahan itu dimasukkan ke dalam kantong dengan isi yang sama banyak untuk setiap jenisnya. ${t ? "Banyak kantong <b>paling banyak</b> yang diperlukan adalah …" : `Jika kantongnya sebanyak-banyaknya, setiap kantong berisi … ${b1}.`}`,
        t ? g : x, { petunjuk: "Membagi rata sebanyak-banyaknya → gunakan FPB.", bahas: `FPB ${A} dan ${B} = ${g} kantong. Tiap kantong berisi ${x} ${b1} dan ${y} ${b2}.` }); },
    () => { let a = acak(2, 8), b = acak(3, 10); while (a === b) b = acak(3, 10); const [x, y] = namaBeda(2), kg = pilih(["berenang", "ke perpustakaan", "latihan pramuka", "bermain bulu tangkis"]);
      return isian(`${x} ${kg} setiap ${a} hari sekali, sedangkan ${y} setiap ${b} hari sekali. Hari ini mereka ${kg} bersama. Mereka akan ${kg} bersama lagi setelah … hari.`, kpk(a, b),
        { petunjuk: "Kejadian berulang dan bertemu lagi → gunakan KPK.", bahas: `KPK ${a} dan ${b} = ${kpk(a, b)} hari.` }); },
  ],
  8: [
    () => { let a = pilih([3, 4, 5, 6, 8]), b = acak(4, 12); while (a === b || kpk(a, b) % 7 === 0) b = acak(4, 12); const h0 = acak(0, 6), K = kpk(a, b), hasil = HARI[(h0 + K) % 7];
      return pg(`Bus A berangkat dari terminal setiap ${a} hari, bus B setiap ${b} hari. Pada hari <b>${HARI[h0]}</b> kedua bus berangkat bersama. Kedua bus berangkat bersama lagi pada hari …`, hasil, HARI.filter(h => h !== hasil).slice(0, 6).sort(() => Math.random() - 0.5),
        { petunjuk: `Cari KPK-nya, lalu hitung sisa pembagian dengan 7 (satu minggu).`, bahas: `KPK = ${K} hari. ${K} : 7 = ${Math.floor(K / 7)} minggu sisa ${K % 7} hari. ${HARI[h0]} + ${K % 7} hari = ${hasil}.` }); },
    () => { const a = pilih([6, 8, 10, 12, 15]), b = pilih([9, 12, 16, 18, 20]), j = acak(6, 9) * 60 + pilih([0, 15, 30]), K = kpk(a, b);
      if (a === b) return isian("KPK 12 dan 18 adalah …", 36, { bahas: "36." });
      const hasil = pkl(j + K); return pg(`Lampu merah berkedip setiap ${a} menit dan lampu biru setiap ${b} menit. Keduanya berkedip bersama pukul ${pkl(j)}. Mereka akan berkedip bersama lagi pukul …`, hasil, [pkl(j + a * b), pkl(j + K / 2), pkl(j + K + 10), pkl(j + a + b)],
        { bahas: `KPK ${a} dan ${b} = ${K} menit. ${pkl(j)} + ${K} menit = ${hasil}.` }); },
    () => { const g = acak(3, 8), [x, y, z] = ambil([2, 3, 4, 5, 7], 3), [b1, b2, b3] = ["buku tulis", "pensil", "penghapus"];
      return isian(`Untuk paket hadiah tersedia ${g * x} ${b1}, ${g * y} ${b2}, dan ${g * z} ${b3}. Semua dibagi ke paket dengan isi sama banyak. Paling banyak dapat dibuat … paket.`, g,
        { bahas: `FPB ${g * x}, ${g * y}, ${g * z} = ${g}.` }); },
  ],
  9: [
    () => { const [a, b] = ambil([4, 5, 6, 8, 10, 12, 15], 2), K = kpk(a, b), T = K * acak(3, 8) + acak(0, K - 1), jam = T >= 60;
      return isian(`Alarm A berbunyi setiap ${a} menit dan alarm B setiap ${b} menit. Keduanya berbunyi bersama tepat pada menit ke-0. Selama ${T} menit berikutnya, berapa kali lagi keduanya berbunyi bersama?`, Math.floor(T / K),
        { petunjuk: "Cari KPK, lalu hitung berapa kali KPK muat dalam waktu itu.", bahas: `KPK = ${K}. ${T} : ${K} = ${Math.floor(T / K)} (sisa ${T % K}).` }); },
    () => { const g = acak(5, 25), [x, y, z] = ambil([2, 3, 4, 5, 6, 7], 3), A = g * x, B = g * y, C = g * z;
      return isian(`Tiga utas tali panjangnya ${A} cm, ${B} cm, dan ${C} cm. Ketiganya dipotong menjadi potongan yang sama panjang, <b>sepanjang-panjangnya</b>, tanpa sisa. Banyak potongan tali seluruhnya adalah …`, x + y + z,
        { petunjuk: "Panjang tiap potongan = FPB ketiga panjang tali.", bahas: `FPB = ${g} cm. Potongan: ${A}:${g} + ${B}:${g} + ${C}:${g} = ${x} + ${y} + ${z} = ${x + y + z}.` }); },
  ],
  10: [
    () => { const g = acak(2, 12), x = acak(2, 9); let y = acak(2, 9); while (fpb(x, y) !== 1 || x === y) y = acak(2, 11); const A = g * x, B = g * y, K = kpk(A, B);
      return isian(`FPB dua bilangan adalah ${g} dan KPK-nya ${K}. Jika salah satu bilangan adalah ${A}, bilangan yang lain adalah …`, B,
        { petunjuk: "Hasil kali dua bilangan = FPB × KPK.", bahas: `${g} × ${K} = ${g * K}. ${g * K} : ${A} = ${B}.` }); },
    () => { const [a, b, c] = ambil([3, 4, 5, 6, 8, 9, 10], 3), K = kpk3(a, b, c); let r = acak(1, Math.min(a, b, c) - 1);
      return isian(`Bilangan terkecil yang lebih dari ${r} dan jika dibagi ${a}, ${b}, atau ${c} selalu bersisa ${r} adalah …`, K + r,
        { petunjuk: "KPK habis dibagi ketiganya. Tambahkan sisanya.", bahas: `KPK ${a}, ${b}, ${c} = ${K}. ${K} + ${r} = ${K + r}.` }); },
    () => { const [a, b] = ambil([3, 4, 5, 6, 8], 2), K = kpk(a, b), lo = acak(1, 4) * 100, hi = lo + 100; let c = 0; for (let n = lo; n <= hi; n++) if (n % K === 0) c++;
      return isian(`Banyak bilangan antara ${lo} dan ${hi} (termasuk keduanya) yang habis dibagi ${a} dan juga habis dibagi ${b} adalah …`, c,
        { petunjuk: `Habis dibagi ${a} dan ${b} = habis dibagi KPK-nya.`, bahas: `KPK = ${K}. Kelipatan ${K} di antara ${lo}–${hi} ada ${c}.` }); },
  ],
});

/* ================= Misi 5: Pecahan ================= */
function svgPecahan(p, q, bentuk) {
  if (bentuk === "lingkaran" && q <= 12) {
    let s = svgBuka(160, 160, `lingkaran dibagi ${q} bagian, ${p} diarsir`); const r = 70, cx = 80, cy = 80;
    for (let i = 0; i < q; i++) { const a1 = (i / q) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / q) * 2 * Math.PI - Math.PI / 2;
      const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
      s += `<path d="M${cx} ${cy}L${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z" class="${i < p ? "isi" : "kosong"}"/>`; }
    return s + "</svg>";
  }
  const w = Math.min(36, Math.floor(300 / q)); let s = svgBuka(w * q + 4, 54, `persegi panjang dibagi ${q} bagian, ${p} diarsir`);
  const terisi = kocok([...Array(q)].map((_, i) => i < p));
  for (let i = 0; i < q; i++) s += `<rect x="${2 + i * w}" y="2" width="${w}" height="50" class="${terisi[i] ? "isi" : "kosong"}"/>`;
  return s + "</svg>";
}
const pcAcak = (maxQ = 12) => { const q = acak(2, maxQ), p = acak(1, q - 1); return [p, q]; };
daftarMisi("bil", "b5", "Pecahan", "🍕", {
  1: [
    () => { const q = acak(3, 10), p = acak(1, q - 1); return isianPc(`Pecahan yang menunjukkan bagian yang <b>diarsir</b> adalah …`, p, q,
      { gambar: svgPecahan(p, q, ya() ? "lingkaran" : "batang"), sederhana: false, petunjuk: "Pembilang = bagian diarsir, penyebut = semua bagian.", bahas: `${p} bagian diarsir dari ${q} bagian → ${pc(p, q)}.` }); },
    () => { const q = acak(3, 10), p = acak(1, q - 1); return isianPc(`Pecahan yang menunjukkan bagian yang <b>tidak diarsir</b> adalah …`, q - p, q,
      { gambar: svgPecahan(p, q, "batang"), sederhana: false, bahas: `${q - p} dari ${q} bagian tidak diarsir → ${pc(q - p, q)}.` }); },
  ],
  2: [
    () => { const [p, q] = sed(...pcAcak(6)), k = acak(2, 6), atas = ya();
      return isian(`${pc(p, q)} = ${atas ? pc("□", q * k).replace("□", "□") : pc(p * k, "□")}<br>Nilai □ adalah …`, atas ? p * k : q * k,
        { petunjuk: "Pecahan senilai: kalikan pembilang dan penyebut dengan bilangan yang sama.", bahas: `${pc(p, q)} = ${pc(p * k, q * k)} (dikali ${k}).` }); },
  ],
  3: [
    () => { const [p, q] = sed(...pcAcak(9)), k = acak(2, 8); return isianPc(`Bentuk paling sederhana dari ${pc(p * k, q * k)} adalah …`, p, q, { petunjuk: "Bagi pembilang dan penyebut dengan FPB-nya.", bahas: `FPB ${p * k} dan ${q * k} = ${fpb(p * k, q * k)}. Hasilnya ${pc(p, q)}.` }); },
  ],
  4: [
    keTKA(() => { let a = pcAcak(9), b = pcAcak(9); const v = a[0] / a[1] - b[0] / b[1], t = Math.abs(v) < 1e-9 ? "=" : v > 0 ? ">" : "<";
      return pgTetap(`${pc(...a)} … ${pc(...b)}<br>Tanda yang tepat adalah …`, [">", "<", "="], t, { petunjuk: "Samakan penyebutnya dulu.", bahas: `${pc(a[0] * b[1], a[1] * b[1])} ${t} ${pc(b[0] * a[1], a[1] * b[1])}.` }); }),
    () => { const q = acak(4, 12), a = acak(1, q - 1), b = acak(1, q - 1); if (a === b) return isianPc(`${pc(1, 2)} + ${pc(1, 4)} = …`, 3, 4, { bahas: "2/4 + 1/4 = 3/4." }); const [x, y] = a > b ? [a, b] : [b, a]; return isianPc(`${pc(x, q)} − ${pc(y, q)} = …`, x - y, q, { petunjuk: "Penyebut sama: kurangkan pembilangnya saja.", bahas: `${pc(x - y, q)} = ${pcS(x - y, q)}.` }); },
    () => { const q = acak(5, 15), a = acak(1, q - 2), b = acak(1, q - a - 1); return isianPc(`${pc(a, q)} + ${pc(b, q)} = …`, a + b, q, { petunjuk: "Penyebut sama: jumlahkan pembilangnya saja.", bahas: `${pc(a + b, q)} = ${pcS(a + b, q)}.` }); },
  ],
  5: [
    () => { const a = pcAcak(8), b = pcAcak(8), plus = ya() || a[0] / a[1] < b[0] / b[1] + 1e-9 ? true : false; const h = plus ? pTambah(a, b) : pKurang(a, b);
      return isianPc(`${pc(...a)} ${plus ? "+" : "−"} ${pc(...b)} = …`, ...h, { petunjuk: "Samakan penyebut dengan KPK.", bahas: `Hasilnya ${pcT(...h)}.` }); },
  ],
  6: [
    () => { const w1 = acak(1, 4), w2 = acak(1, 3), a = pcAcak(6), b = pcAcak(6), A = [w1 * a[1] + a[0], a[1]], B = [w2 * b[1] + b[0], b[1]], plus = ya() || A[0] / A[1] <= B[0] / B[1];
      const h = plus ? pTambah(A, B) : pKurang(A, B);
      return isianPc(`${pcT(...A)} ${plus ? "+" : "−"} ${pcT(...B)} = …`, ...h, { petunjuk: "Ubah ke pecahan biasa, atau hitung bilangan bulat dan pecahannya terpisah.", bahas: `Hasilnya ${pcT(...h)}.` }); },
    () => { const a = pcAcak(9), b = pcAcak(9), h = pKali(a, b); return isianPc(`${pc(...a)} × ${pc(...b)} = …`, ...h, { petunjuk: "Pembilang × pembilang, penyebut × penyebut.", bahas: `${pc(a[0] * b[0], a[1] * b[1])} = ${pcT(...h)}.` }); },
  ],
  7: [
    () => { const a = pcAcak(9), b = pcAcak(9), h = pBagi(a, b); return isianPc(`${pc(...a)} : ${pc(...b)} = …`, ...h, { petunjuk: "Bagi pecahan = kali dengan kebalikannya.", bahas: `${pc(...a)} × ${pc(b[1], b[0])} = ${pcT(...h)}.` }); },
    () => { const [p, q] = sed(...pcAcak(10)), n = q * acak(2, 15); return isian(`${pc(p, q)} dari ${n} adalah …`, n / q * p, { petunjuk: `Bagi ${n} dengan ${q}, lalu kali ${p}.`, bahas: `${n} : ${q} × ${p} = ${n / q * p}.` }); },
  ],
  8: [
    () => { const x = nama(), q1 = pilih([2, 4]), w = acak(2, 4), A = [w * q1 + acak(1, q1 - 1), q1], b = [acak(1, 3), 4], c = [acak(1, 2), 3]; let s = pKurang(pKurang(A, b), c);
      if (s[0] <= 0) s = pKurang(A, b);
      const pakai2 = s[0] > 0 && pKurang(pKurang(A, b), c)[0] > 0;
      return isianPc(`${x} memiliki ${pcT(...A)} kg gula. Sebanyak ${pc(...b)} kg dipakai untuk membuat kue${pakai2 ? ` dan ${pc(...c)} kg untuk membuat minuman` : ""}. Sisa gula ${x} adalah … kg.`, ...s,
        { satuan: "kg", petunjuk: "Kurangkan satu per satu dengan menyamakan penyebut.", bahas: `Sisa gula ${pcT(...s)} kg.` }); },
    () => { const x = nama(), a = [1, pilih([3, 4, 5])], b = [1, pilih([2, 3, 6])]; const sisa = pKurang([1, 1], a); const h = pKali(sisa, b);
      return isianPc(`${x} memotong pita. ${pc(...a)} bagian dipakai untuk kado. Lalu ${pc(...b)} dari <b>sisanya</b> dipakai untuk hiasan. Bagian pita yang dipakai untuk hiasan adalah … bagian dari seluruh pita.`, ...h,
        { petunjuk: "Hitung sisanya dulu, lalu kalikan.", bahas: `Sisa ${pc(...sisa)}. ${pc(...b)} × ${pc(...sisa)} = ${pcT(...h)}.` }); },
  ],
  9: [
    () => { const set = new Map(); while (set.size < 4) { const [p, q] = sed(...pcAcak(12)); set.set(p / q, [p, q]); } const arr = [...set.values()], b = arr.slice().sort((x, y) => x[0] / x[1] - y[0] / y[1]);
      const tulis = a => a.map(x => pc(...x)).join(" ; "), salah = []; while (salah.length < 3) { const p = kocok(arr); if (tulis(p) !== tulis(b) && !salah.includes(tulis(p))) salah.push(tulis(p)); }
      return pg(`Urutan pecahan dari yang <b>terkecil</b> adalah …`, tulis(b), salah, { petunjuk: "Ubah ke desimal atau samakan penyebutnya.", bahas: `Urutannya: ${tulis(b)}.` }); },
    () => { const a = pcAcak(6), b = pcAcak(6), c = pcAcak(6), h = pTambah(a, pKali(b, c)); return isianPc(`${pc(...a)} + ${pc(...b)} × ${pc(...c)} = …`, ...h, { petunjuk: "Kali dulu, baru tambah.", bahas: `${pc(...b)} × ${pc(...c)} = ${pcT(...pKali(b, c))}. Ditambah ${pc(...a)} = ${pcT(...h)}.` }); },
  ],
  10: [
    () => { const a = pilih([2, 3, 4, 5]), b = pilih([2, 3, 4, 5]), x = nama(), keperluan = pilih(["membeli buku", "membeli tas", "ditabung"]);
      const T = a * b * acak(2, 12) * 5000, s1 = T - T / a, s2 = s1 - s1 / b;
      return isian(`${x} memiliki sejumlah uang. ${pc(1, a)} bagian dipakai untuk membeli sepatu. ${pc(1, b)} dari <b>sisanya</b> dipakai untuk ${keperluan}. Sekarang uang ${x} tinggal ${rp(s2)}. Uang ${x} mula-mula adalah Rp …`, T,
        { petunjuk: "Sisa akhir = uang awal × (1 − 1/a) × (1 − 1/b).", bahas: `Sisa = ${pc(a - 1, a)} × ${pc(b - 1, b)} = ${pcS((a - 1) * (b - 1), a * b)} dari uang awal. Uang awal = ${rp(s2)} : ${pcS((a - 1) * (b - 1), a * b)} = ${rp(T)}.` }); },
    () => { const q = pilih([3, 4, 5, 6]), p = acak(1, q - 1), k = acak(3, 12) * (q - p), n = k / (q - p) * q;
      return isian(`Di kelas, ${pc(p, q)} siswa memilih ekstrakurikuler pramuka dan sisanya memilih menari. Jika yang memilih menari ada ${k} siswa, banyak siswa di kelas itu adalah …`, n,
        { petunjuk: `Yang memilih menari = ${pc(q - p, q)} bagian.`, bahas: `${pc(q - p, q)} bagian = ${k} siswa, jadi 1 bagian (${pc(1, q)}) = ${k / (q - p)}. Semua = ${n} siswa.` }); },
  ],
});

/* ================= Misi 6: Pecahan, desimal, persen ================= */
const desTulis = x => fmt(bulat(x, 4));
daftarMisi("bil", "b6", "Pecahan ↔ desimal ↔ persen", "💯", {
  1: [
    () => { const p = acak(1, 9); return isian(`${pc(p, 10)} jika ditulis dalam bentuk desimal adalah …`, p / 10, { petunjuk: "Persepuluhan = 1 angka di belakang koma.", bahas: `${pc(p, 10)} = ${desTulis(p / 10)}.` }); },
    () => { const p = acak(1, 9); return isianPc(`0,${p} jika ditulis dalam bentuk pecahan paling sederhana adalah …`, p, 10, { bahas: `0,${p} = ${pc(p, 10)} = ${pcS(p, 10)}.` }); },
    () => { const w = acak(1, 20), p = acak(1, 9); return isian(`${w}&nbsp;${pc(p, 10)} jika ditulis dalam bentuk desimal adalah …`, w + p / 10, { petunjuk: "Bilangan bulatnya di depan koma.", bahas: `${w}&nbsp;${pc(p, 10)} = ${desTulis(w + p / 10)}.` }); },
    () => { const a = acak(1, 8), b = acak(1, 9 - a), w = acak(0, 5); return isian(`${desTulis(w + a / 10)} + 0,${b} = …`, w + (a + b) / 10, { petunjuk: "Jumlahkan angka persepuluhannya.", bahas: `${desTulis(w + a / 10)} + 0,${b} = ${desTulis(w + (a + b) / 10)}.` }); },
  ],
  2: [
    () => { const p = acak(1, 99); return isian(`${pc(p, 100)} = … (dalam desimal)`, p / 100, { petunjuk: "Perseratus = 2 angka di belakang koma.", bahas: `${pc(p, 100)} = ${desTulis(p / 100)}.` }); },
    () => { const p = acak(1, 99); return isian(`${pc(p, 100)} = … %`, p, { satuan: "%", petunjuk: "Persen artinya per seratus.", bahas: `${pc(p, 100)} = ${p}%.` }); },
  ],
  3: [
    () => { let p; do p = acak(2, 98); while (fpb(p, 100) === 1); return isianPc(`${p}% dalam bentuk pecahan paling sederhana adalah …`, p, 100, { petunjuk: `${p}% = ${pc(p, 100)}, lalu sederhanakan.`, bahas: `${pc(p, 100)} = ${pcS(p, 100)}.` }); },
    () => { let p; do p = acak(2, 98); while (fpb(p, 100) === 1); return isianPc(`${desTulis(p / 100)} dalam bentuk pecahan paling sederhana adalah …`, p, 100, { petunjuk: `${desTulis(p / 100)} = ${pc(p, 100)}, lalu sederhanakan.`, bahas: `${pc(p, 100)} = ${pcS(p, 100)}.` }); },
  ],
  4: [
    () => { const q = pilih([2, 4, 5, 20, 25, 50]), p = acak(1, q - 1); return isian(`${pc(p, q)} = … (dalam desimal)`, p / q, { petunjuk: `Ubah penyebutnya menjadi 10 atau 100.`, bahas: `${pc(p, q)} = ${pc(p * 100 / q, 100)} = ${desTulis(p / q)}.` }); },
    () => { const q = pilih([2, 4, 5, 10, 20, 25, 50]), p = acak(1, q - 1); return isian(`${pc(p, q)} = … %`, p * 100 / q, { satuan: "%", bahas: `${pc(p, q)} × 100% = ${fmt(p * 100 / q)}%.` }); },
  ],
  5: [
    () => { const x = acak(1, 199) / 100; return isian(`${desTulis(x)} = … %`, bulat(x * 100), { satuan: "%", petunjuk: "Kalikan 100.", bahas: `${desTulis(x)} × 100% = ${fmt(bulat(x * 100))}%.` }); },
    () => { const x = acak(1, 150); return isian(`${x}% = … (dalam desimal)`, x / 100, { petunjuk: "Bagi 100.", bahas: `${x}% = ${desTulis(x / 100)}.` }); },
  ],
  6: [
    () => { const q = pilih([4, 5, 20, 25]), p = acak(1, q - 1), v = p / q, opsi = [{ t: pc(p, q), v }, { t: desTulis(v + pilih([-0.03, 0.02, -0.05])), v: 0 }, { t: fmt(Math.round(v * 100 + pilih([-4, 3, 6]))) + "%", v: 0 }, { t: desTulis(bulat(v + pilih([0.01, -0.02, 0.04]))), v: 0 }];
      opsi.forEach(o => { if (!o.v) o.v = o.t.includes("%") ? parseFloat(o.t) / 100 : parseFloat(o.t.replace(",", ".")); }); const b = ya(); const j = opsi.reduce((m, o) => ((b ? o.v > m.v : o.v < m.v) ? o : m));
      if (opsi.filter(o => o.v === j.v).length > 1) return isian(`${pc(3, 4)} = … %`, 75, { satuan: "%", bahas: "75%." });
      return pg(`Bilangan <b>${b ? "terbesar" : "terkecil"}</b> di antara ${opsi.map(o => o.t).join(" ; ")} adalah …`, j.t, opsi.filter(o => o !== j).map(o => o.t), { petunjuk: "Ubah semuanya ke desimal.", bahas: opsi.map(o => `${o.t} = ${desTulis(o.v)}`).join("; ") + "." }); },
  ],
  7: [
    () => { const p = pilih([10, 20, 25, 50, 75, 5, 15, 40, 60, 12]), n = pilih([20, 40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 360, 500, 800]); if ((p * n) % 100) return isian(`25% dari 80 = …`, 20, { bahas: "80 : 4 = 20." });
      return isian(`${p}% dari ${n} = …`, p * n / 100, { petunjuk: `${p}% = ${pcS(p, 100)}`, bahas: `${pc(p, 100)} × ${n} = ${p * n / 100}.` }); },
  ],
  8: [
    () => { const n = pilih([20, 25, 30, 32, 36, 40]), pr = pilih([10, 20, 25, 30, 40, 50, 60, 75]), ok = (n * pr) % 100 === 0, k = ok ? n * pr / 100 : null; if (!ok) return isian(`Dari 40 siswa, 25% suka melukis. Banyak siswa yang tidak suka melukis adalah …`, 30, { bahas: "25% × 40 = 10, 40 − 10 = 30." });
      const kegiatan = pilih(["membaca komik", "bermain futsal", "menari", "melukis", "menyanyi"]); return isian(`Di sebuah kelas ada ${n} siswa. Sebanyak ${pr}% siswa gemar ${kegiatan}. Banyak siswa yang <b>tidak</b> gemar ${kegiatan} adalah …`, n - k,
        { satuan: "siswa", petunjuk: "Hitung yang gemar dulu, atau langsung hitung (100% − persen).", bahas: `${pr}% × ${n} = ${k}. ${n} − ${k} = ${n - k} siswa.` }); },
    () => { const h = acak(4, 30) * 10000, d = pilih([10, 15, 20, 25, 30, 40, 50]), b = pilih(["tas", "sepatu", "jaket", "boneka", "sepeda mini"]);
      return isian(`Harga sebuah ${b} ${rp(h)}. Toko memberi diskon ${d}%. Harga yang harus dibayar adalah Rp …`, h - h * d / 100, { petunjuk: "Hitung besar diskonnya, lalu kurangkan.", bahas: `Diskon ${d}% × ${rp(h)} = ${rp(h * d / 100)}. Bayar ${rp(h - h * d / 100)}.` }); },
  ],
  9: [
    () => { const vals = new Map(); const tambah = (t, v) => { if (![...vals.values()].includes(v)) vals.set(t, v); };
      while (vals.size < 4) { const k = acak(0, 2), q = pilih([4, 5, 8, 20, 25]), p = acak(1, q - 1), v = bulat(p / q); if (k === 0) tambah(pc(p, q), v); else if (k === 1) tambah(desTulis(v), v); else tambah(fmt(v * 100) + "%", v); }
      const arr = [...vals.entries()], b = arr.slice().sort((x, y) => x[1] - y[1]).map(x => x[0]).join(" ; ");
      const salah = []; while (salah.length < 3) { const p = kocok(arr).map(x => x[0]).join(" ; "); if (p !== b && !salah.includes(p)) salah.push(p); }
      return pg(`Urutan dari yang <b>terkecil</b> adalah …`, b, salah, { petunjuk: "Ubah semua ke desimal.", bahas: arr.map(([t, v]) => `${t} = ${desTulis(v)}`).join("; ") + "." }); },
    () => { const q = pilih([4, 5, 20, 25]), p = acak(1, q - 1), v = p / q;
      return bs(`Tentukan Benar atau Salah.`, [
        { t: `${pc(p, q)} = ${desTulis(v)}`, b: true }, { t: `${pc(p, q)} = ${fmt(v * 100)}%`, b: true },
        { t: `${desTulis(v)} = ${fmt(v * 10)}%`, b: v * 10 === v * 100 }, { t: `${fmt(v * 100)}% lebih dari ${pc(1, 2)}`, b: v > 0.5 }], { bahas: `${pc(p, q)} = ${desTulis(v)} = ${fmt(v * 100)}%.` }); },
  ],
  10: [
    () => { const h = acak(10, 50) * 10000, d1 = pilih([10, 20, 25, 50]), d2 = pilih([10, 20]); const s1 = h - h * d1 / 100, s2 = s1 - s1 * d2 / 100;
      if (!Number.isInteger(s2)) return isian(`Harga Rp200.000 didiskon 20% lalu 10%. Harga akhirnya Rp …`, 144000, { bahas: "200.000 → 160.000 → 144.000." });
      return isian(`Harga sebuah sepeda ${rp(h)}. Toko memberi diskon ${d1}%, lalu diskon tambahan ${d2}% dari harga setelah diskon pertama. Harga akhir sepeda adalah Rp …`, s2,
        { petunjuk: "Diskon kedua dihitung dari harga setelah diskon pertama, bukan dijumlah!", bahas: `${rp(h)} − ${d1}% = ${rp(s1)}. ${rp(s1)} − ${d2}% = ${rp(s2)}.` }); },
    () => { const a = pilih([20, 25, 40, 50, 60, 80]), pr = pilih([10, 20, 25, 50]), naik = ya(), b = naik ? a + a * pr / 100 : a - a * pr / 100;
      return isian(`Nilai ulangan ${nama()} ${naik ? "naik" : "turun"} dari ${a} menjadi ${b}. Persentase ${naik ? "kenaikan" : "penurunan"} nilainya adalah … %`, pr,
        { satuan: "%", petunjuk: "Persentase = selisih : nilai awal × 100%.", bahas: `Selisih ${Math.abs(b - a)}. ${Math.abs(b - a)} : ${a} × 100% = ${pr}%.` }); },
  ],
});

/* ================= Misi 7: Soal uang ================= */
const BARANG = [["buku tulis", 3000, 6000], ["pensil", 1500, 4000], ["penghapus", 1000, 3000], ["penggaris", 2500, 6000], ["roti", 3000, 8000], ["susu kotak", 4000, 7000],
  ["pulpen", 2000, 5000], ["spidol", 5000, 9000], ["kue", 2000, 5000], ["es krim", 4000, 10000], ["jus", 5000, 12000], ["stiker", 1000, 3500]];
const hargaAcak = b => Math.round(acak(b[1], b[2]) / 500) * 500;
daftarMisi("bil", "b7", "Soal uang", "💰", {
  1: [
    () => { const [a, b] = ambil(BARANG, 2), ha = hargaAcak(a), hb = hargaAcak(b), x = nama();
      return isian(`${x} membeli ${a[0]} seharga ${rp(ha)} dan ${b[0]} seharga ${rp(hb)}. Jumlah uang yang harus dibayar adalah Rp …`, ha + hb, { bahas: `${rp(ha)} + ${rp(hb)} = ${rp(ha + hb)}.` }); },
  ],
  2: [
    () => { const a = pilih(BARANG), h = hargaAcak(a), u = pilih([10000, 20000, 50000].filter(v => v > h)); return isian(`${nama()} membeli ${a[0]} seharga ${rp(h)} dan membayar dengan uang ${rp(u)}. Uang kembaliannya adalah Rp …`, u - h, { bahas: `${rp(u)} − ${rp(h)} = ${rp(u - h)}.` }); },
  ],
  3: [
    () => { const a = pilih(BARANG), h = hargaAcak(a), n = acak(3, 12); return isian(`Harga 1 ${a[0]} ${rp(h)}. Harga ${n} ${a[0]} adalah Rp …`, n * h, { bahas: `${n} × ${rp(h)} = ${rp(n * h)}.` }); },
  ],
  4: [
    () => { const [a, b] = ambil(BARANG, 2), ha = hargaAcak(a), hb = hargaAcak(b), na = acak(2, 5), nb = acak(2, 5), t = na * ha + nb * hb, u = [20000, 50000, 100000].find(v => v > t) || 200000;
      return isian(`${nama()} membeli ${na} ${a[0]} seharga ${rp(ha)} per buah dan ${nb} ${b[0]} seharga ${rp(hb)} per buah. Ia membayar dengan uang ${rp(u)}. Kembaliannya adalah Rp …`, u - t,
        { petunjuk: "Hitung total belanja dulu.", bahas: `${na} × ${rp(ha)} + ${nb} × ${rp(hb)} = ${rp(t)}. ${rp(u)} − ${rp(t)} = ${rp(u - t)}.` }); },
  ],
  5: [
    () => { const a = pilih(BARANG), h = hargaAcak(a), lusin = ya(); const n = lusin ? 12 : acak(3, 10);
      return isian(`Harga ${lusin ? "1 lusin" : n} ${a[0]} adalah ${rp(n * h)}. Harga 1 ${a[0]} adalah Rp …`, h, { petunjuk: lusin ? "1 lusin = 12 buah." : "Bagi harga total dengan banyak barang.", bahas: `${rp(n * h)} : ${n} = ${rp(h)}.` }); },
    () => { const a = pilih(BARANG), h = hargaAcak(a), n = acak(3, 8), m = acak(2, 9); return isian(`Harga ${n} ${a[0]} adalah ${rp(n * h)}. Harga ${m} ${a[0]} adalah Rp …`, m * h, { petunjuk: "Cari harga 1 barang dulu.", bahas: `1 ${a[0]} = ${rp(h)}. ${m} × ${rp(h)} = ${rp(m * h)}.` }); },
  ],
  6: [
    () => { const b = pilih(["telur", "permen", "jeruk", "pensil", "kue"]), k1 = pilih([4, 5, 6]), k2 = pilih([10, 12, 15]), h1 = acak(4, 15) * 500 * k1 / k1, s1 = Math.round(acak(800, 1500) / 50) * 50; const H1 = s1 * k1;
      let s2 = s1 + pilih([-100, -50, 50, 100]); const H2 = s2 * k2; const m = s1 < s2 ? "A" : "B";
      return pgTetap(`Paket A: ${k1} ${b} seharga ${rp(H1)}.<br>Paket B: ${k2} ${b} seharga ${rp(H2)}.<br>Paket yang harga per buahnya <b>lebih murah</b> adalah …`, ["Paket A", "Paket B", "Sama saja"], "Paket " + m,
        { petunjuk: "Hitung harga 1 buah untuk setiap paket.", bahas: `Paket A: ${rp(s1)} per buah. Paket B: ${rp(s2)} per buah. Lebih murah Paket ${m}.` }); },
  ],
  7: [
    () => { const h = acak(4, 40) * 5000, d = pilih([10, 20, 25, 50]), b = pilih(["kaos", "topi", "tas sekolah", "buku cerita", "mainan robot"]);
      return isian(`Harga sebuah ${b} ${rp(h)} dan mendapat diskon ${d}%. Besar diskonnya adalah Rp …`, h * d / 100, { petunjuk: `${d}% = ${pcS(d, 100)}`, bahas: `${d}% × ${rp(h)} = ${rp(h * d / 100)}.` }); },
  ],
  8: [
    () => { const h = acak(6, 30) * 5000, d = pilih([10, 20, 25]), u = [50000, 100000, 200000, 300000].find(v => v > h * (100 - d) / 100), b = pilih(["sepatu", "jaket", "tas"]);
      const bayar = h * (100 - d) / 100; return isian(`${nama()} membeli ${b} seharga ${rp(h)} dengan diskon ${d}%. Ia membayar dengan uang ${rp(u)}. Uang kembaliannya adalah Rp …`, u - bayar,
        { petunjuk: "Hitung harga setelah diskon, lalu kembaliannya.", bahas: `Harga setelah diskon ${rp(bayar)}. Kembalian ${rp(u)} − ${rp(bayar)} = ${rp(u - bayar)}.` }); },
    () => { const a = pilih(BARANG), h = hargaAcak(a), n = acak(5, 14), bayar = (n - Math.floor(n / 4)) * h;
      return isian(`Toko memberi promo <b>"beli 3 gratis 1"</b> untuk ${a[0]} seharga ${rp(h)} per buah. ${nama()} ingin mendapatkan ${n} ${a[0]}. Ia cukup membayar Rp …`, bayar,
        { petunjuk: "Setiap 4 barang, hanya 3 yang dibayar.", bahas: `${n} barang: ${Math.floor(n / 4)} gratis, dibayar ${n - Math.floor(n / 4)} × ${rp(h)} = ${rp(bayar)}.` }); },
  ],
  9: [
    () => { const lus = acak(2, 6), hb = acak(20, 48) * 1000, hj = Math.round((hb / 12) / 500) * 500 + pilih([500, 1000, 1500]), r = acak(0, 3), b = pilih(["pensil", "jepit rambut", "gantungan kunci", "bolpoin"]);
      const jual = (lus * 12 - r) * hj, beli = lus * hb, u = jual - beli;
      if (u <= 0) return isian(`Pedagang membeli 2 lusin buku seharga Rp36.000 per lusin dan menjual Rp4.000 per buah. Untungnya Rp …`, 24000, { bahas: "96.000 − 72.000 = 24.000." });
      return isian(`Pedagang membeli ${lus} lusin ${b} seharga ${rp(hb)} per lusin. ${r ? `Sebanyak ${r} ${b} rusak dan tidak terjual. ` : ""}Sisanya dijual ${rp(hj)} per buah. Keuntungan pedagang adalah Rp …`, u,
        { petunjuk: "Untung = uang hasil jual − uang modal.", bahas: `Modal ${lus} × ${rp(hb)} = ${rp(beli)}. Jual ${lus * 12 - r} × ${rp(hj)} = ${rp(jual)}. Untung ${rp(u)}.` }); },
  ],
  10: [
    () => { const x = nama(), A = acak(2, 20) * 5000, B = pilih([2000, 2500, 3000, 4000, 5000]), C = acak(30, 120) * 5000, b = pilih(["sepeda", "sepatu roda", "tas baru", "kamera mainan"]), n = Math.ceil((C - A) / B);
      if (C <= A) return isian(`Uang 50.000 ditambah 5.000 per hari. Setelah berapa hari menjadi 100.000?`, 10, { bahas: "50.000 : 5.000 = 10." });
      return isian(`${x} sudah memiliki tabungan ${rp(A)}. Setiap hari ia menabung ${rp(B)}. ${x} ingin membeli ${b} seharga ${rp(C)}. Paling sedikit ${x} harus menabung selama … hari lagi.`, n,
        { satuan: "hari", petunjuk: "Hitung kekurangannya, lalu bagi. Jika bersisa, tambah 1 hari!", bahas: `Kekurangan ${rp(C - A)}. ${rp(C - A)} : ${rp(B)} = ${fmt(bulat((C - A) / B, 2))} → ${n} hari.` }); },
    () => { const t = acak(12, 49) * 10000 + acak(0, 9) * 1000, pot = pilih([10000, 15000, 20000]); const kel = Math.floor(t / 100000), bayar = t - kel * pot;
      return isian(`Sebuah toko memberi promo: <b>setiap belanja kelipatan Rp100.000 mendapat potongan ${rp(pot)}</b>. Ibu berbelanja seharga ${rp(t)}. Ibu cukup membayar Rp …`, bayar,
        { petunjuk: "Berapa kali Rp100.000 ada di dalam belanjaan Ibu?", bahas: `${rp(t)} memuat ${kel} kali Rp100.000 → potongan ${kel} × ${rp(pot)} = ${rp(kel * pot)}. Bayar ${rp(bayar)}.` }); },
  ],
});
