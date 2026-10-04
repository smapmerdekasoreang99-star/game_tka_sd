/* Pos 2 — Aljabar: 3 misi × 10 level */
"use strict";

/* ================= Misi 1: Pola bilangan ================= */
const deret = (a, f, n) => { const r = [a]; while (r.length < n) r.push(f(r[r.length - 1], r.length)); return r; };
const tulisDeret = arr => arr.map(fmt).join(", ") + ", …";
daftarMisi("alj", "a1", "Pola bilangan", "🔢", {
  1: [
    () => { const a = acak(1, 20), k = acak(2, 6), d = deret(a, x => x + k, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { petunjuk: "Berapa selisih dua bilangan yang berdekatan?", bahas: `Polanya +${k}. ${d[3]} + ${k} = ${d[4]}.` }); },
    /* Suku yang hilang di tengah */
    () => { const a = acak(1, 20), k = acak(1, 5), d = deret(a, x => x + k, 5), i = acak(1, 3);
      return isian(`Perhatikan pola <b>${d.map((x, j) => (j === i ? "□" : fmt(x))).join(", ")}</b><br>Bilangan pengganti □ adalah …`, d[i], { petunjuk: "Lihat bilangan sebelum dan sesudah □.", bahas: `Polanya +${k}. ${d[i - 1]} + ${k} = ${d[i]}.` }); },
    /* Lompatan di garis bilangan */
    () => { const h = pilih(["Kelinci", "Katak", "Kanguru", "Belalang"]), k = acak(2, 5), a = pilih([0, k, acak(1, 10)]), d = deret(a, x => x + k, 5);
      return isian(`${h} melompat di garis bilangan. Ia mendarat di angka <b>${d.slice(0, 4).join(", ")}</b>. Jika lompatannya selalu sama jauh, lompatan berikutnya mendarat di angka …`, d[4], { petunjuk: "Berapa jauh setiap lompatan?", bahas: `Setiap lompatan ${k} angka. ${d[3]} + ${k} = ${d[4]}.` }); },
    /* Aturan pola ditanya angkanya */
    () => { const a = acak(1, 30), k = acak(2, 6), d = deret(a, x => x + k, 5);
      return isian(`Pola <b>${tulisDeret(d)}</b> selalu bertambah …`, k, { petunjuk: "Kurangkan dua bilangan yang berdekatan.", bahas: `${d[1]} − ${d[0]} = ${k}, ${d[2]} − ${d[1]} = ${k}, dan seterusnya. Polanya bertambah ${k}.` }); },
    /* Anak tangga */
    () => { const x = nama(), k = pilih([2, 2, 3]), a = acak(1, k), d = deret(a, y => y + k, 5);
      return isian(`${x} menaiki tangga sambil melompati anak tangga. Ia menginjak anak tangga nomor <b>${d.slice(0, 4).join(", ")}</b>. Anak tangga berikutnya yang diinjak ${x} adalah nomor …`, d[4], { petunjuk: "Nomor anak tangganya bertambah berapa?", bahas: `Nomornya bertambah ${k}. ${d[3]} + ${k} = ${d[4]}.` }); },
    /* Pola turun */
    () => { const k = acak(1, 5), a = acak(4 * k + 5, 40), d = deret(a, x => x - k, 5);
      return isian(`Pola menurun: <b>${tulisDeret(d.slice(0, 4))}</b><br>Bilangan berikutnya adalah …`, d[4], { petunjuk: "Bilangannya berkurang berapa setiap langkah?", bahas: `Polanya −${k}. ${d[3]} − ${k} = ${d[4]}.` }); },
  ],
  2: [
    () => { const k = acak(3, 9), a = acak(60, 120), d = deret(a, x => x - k, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { bahas: `Polanya −${k}. ${d[3]} − ${k} = ${d[4]}.` }); },
    () => { const a = acak(2, 30), k = acak(3, 9), d = deret(a, x => x + k, 5), i = acak(1, 3); return isian(`Bilangan yang tepat untuk mengisi □ pada pola <b>${d.map((x, j) => (j === i ? "□" : fmt(x))).join(", ")}</b> adalah …`, d[i], { bahas: `Polanya +${k}, jadi □ = ${d[i]}.` }); },
    /* Bilangan ke-6 */
    () => { const a = acak(2, 20), k = acak(2, 6), d = deret(a, x => x + k, 6);
      return isian(`Pola <b>${tulisDeret(d.slice(0, 3))}</b> diteruskan. Bilangan ke-6 pada pola itu adalah …`, d[5], { petunjuk: "Teruskan polanya satu per satu sampai bilangan ke-6.", bahas: `${d.join(", ")}. Bilangan ke-6 = ${d[5]}.` }); },
    /* Tabungan */
    () => { const x = nama(), a = acak(1, 5) * 1000, k = acak(1, 3) * 1000, d = deret(a, y => y + k, 5);
      return isian(`Tabungan ${x} hari ke-1 ${rp(d[0])}, hari ke-2 ${rp(d[1])}, dan hari ke-3 ${rp(d[2])}. Jika polanya sama, tabungan ${x} pada hari ke-5 adalah Rp …`, d[4], { petunjuk: "Tabungannya bertambah berapa setiap hari?", bahas: `Bertambah ${rp(k)} setiap hari: ${d.map(rp).join(", ")}.` }); },
    /* Bilangan ganjil / genap berurutan */
    () => { const g = ya(), j = g ? "genap" : "ganjil", a = acak(5, 40) * 2 + (g ? 0 : 1), d = deret(a, x => x + 2, 5);
      return isian(`Deretan bilangan ${j} berurutan: <b>${tulisDeret(d.slice(0, 4))}</b><br>Bilangan ${j} berikutnya adalah …`, d[4], { petunjuk: `Bilangan ${j} yang berurutan selalu berselisih 2.`, bahas: `${d[3]} + 2 = ${d[4]}.` }); },
    /* Kursi berbaris */
    () => { const t = pilih(["ruang kelas", "aula", "ruang pertemuan", "gedung bioskop"]), a = acak(5, 15), k = acak(1, 4), d = deret(a, x => x + k, 4);
      return isian(`Di sebuah ${t}, baris pertama ada ${a} kursi, baris kedua ${d[1]} kursi, dan baris ketiga ${d[2]} kursi. Jika polanya sama, banyak kursi pada baris keempat adalah …`, d[3], { satuan: "kursi", petunjuk: "Setiap baris bertambah berapa kursi?", bahas: `Bertambah ${k} kursi setiap baris. ${d[2]} + ${k} = ${d[3]} kursi.` }); },
  ],
  3: [
    () => { const r = pilih([2, 2, 3, 4]), a = acak(1, r === 4 ? 3 : 12), d = deret(a, x => x * r, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { petunjuk: "Coba bagi bilangan dengan bilangan sebelumnya.", bahas: `Polanya ×${r}. ${d[3]} × ${r} = ${d[4]}.` }); },
    () => { const r = pilih([2, 3]), a = r ** 4 * acak(1, 3), d = deret(a, x => x / r, 5); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 4))}</b> adalah …`, d[4], { bahas: `Polanya :${r}. ${d[3]} : ${r} = ${d[4]}.` }); },
    /* Selisih bertambah 1 */
    () => { const a = acak(1, 30), s = acak(1, 4), d = deret(a, (x, i) => x + s + i - 1, 6);
      return isian(`Selisih bilangan pada pola <b>${tulisDeret(d.slice(0, 5))}</b> selalu bertambah 1. Bilangan berikutnya adalah …`, d[5], { petunjuk: "Tulis selisihnya dulu: selisih berikutnya lebih 1.", bahas: `Selisihnya ${s}, ${s + 1}, ${s + 2}, ${s + 3}, lalu ${s + 4}. ${d[4]} + ${s + 4} = ${d[5]}.` }); },
    /* Suku hilang pada pola perkalian */
    () => { const r = pilih([2, 3]), a = acak(1, r === 2 ? 15 : 8), d = deret(a, x => x * r, 5), i = acak(1, 3);
      return isian(`Pola <b>${d.map((x, j) => (j === i ? "□" : fmt(x))).join(", ")}</b> dibuat dengan cara mengalikan. Nilai □ adalah …`, d[i], { petunjuk: "Bagi sebuah bilangan dengan bilangan di depannya.", bahas: `Polanya ×${r}. ${d[i - 1]} × ${r} = ${d[i]}.` }); },
    /* Langkah di anak tangga */
    () => { const x = nama(), k = acak(2, 4), a = acak(1, 3), n = acak(5, 7), d = deret(a, y => y + k, n);
      return isian(`Pada langkah ke-1, ${x} menginjak anak tangga nomor ${a}. Langkah ke-2 nomor ${d[1]}, langkah ke-3 nomor ${d[2]}, dan seterusnya. Pada langkah ke-${n}, ${x} menginjak anak tangga nomor …`, d[n - 1], { petunjuk: "Nomornya bertambah sama setiap langkah. Teruskan polanya.", bahas: `Bertambah ${k} setiap langkah: ${d.join(", ")}.` }); },
    /* Kelipatan */
    () => { const k = acak(3, 9), m = acak(1, 12), d = deret(k * m, x => x + k, 5);
      return isian(`Deretan kelipatan ${k}: <b>${tulisDeret(d.slice(0, 4))}</b><br>Kelipatan ${k} berikutnya adalah …`, d[4], { petunjuk: `Kelipatan ${k} selalu bertambah ${k}.`, bahas: `${d[3]} + ${k} = ${d[4]}.` }); },
  ],
  4: [
    () => { const a = acak(80, 150), s = acak(1, 4), d = deret(a, (x, i) => x - s - i + 1, 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Tulis selisihnya. Selisihnya bertambah besar.", bahas: `Selisihnya ${d.slice(1).map((x, i) => d[i] - x).join(", ")}. Bilangan berikutnya ${d[5]}.` }); },
    () => { const a = acak(1, 30), s = acak(1, 5), t = acak(1, 3), d = deret(a, (x, i) => x + s + (i - 1) * t, 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Tulis selisihnya. Apakah selisihnya juga berpola?", bahas: `Selisihnya ${d.slice(1).map((x, i) => x - d[i]).join(", ")}. Bilangan berikutnya ${d[5]}.` }); },
    /* Suku hilang pada pola bertingkat */
    () => { const a = acak(1, 30), s = acak(1, 5), d = deret(a, (x, i) => x + s + i - 1, 5), i = acak(1, 3);
      return isian(`Selisih bilangan pada pola <b>${d.map((x, j) => (j === i ? "□" : fmt(x))).join(", ")}</b> bertambah 1 setiap langkah. Nilai □ adalah …`, d[i], { petunjuk: "Cari dulu selisih dua bilangan yang berdekatan dan sudah diketahui.", bahas: `Polanya ${d.join(", ")} (selisihnya ${s}, ${s + 1}, ${s + 2}, ${s + 3}). Jadi □ = ${d[i]}.` }); },
    /* Celengan */
    () => { const x = nama(), A = acak(2, 20) * 1000, k = pilih([1000, 2000, 2500, 5000]), n = acak(4, 8);
      return isian(`Celengan ${x} berisi ${rp(A)}. Setiap minggu ${x} menambah ${rp(k)}. Isi celengan ${x} setelah ${n} minggu adalah Rp …`, A + n * k, { petunjuk: `Polanya ${rp(A + k)}, ${rp(A + 2 * k)}, … (bertambah ${rp(k)}).`, bahas: `${rp(A)} + ${n} × ${rp(k)} = ${rp(A)} + ${rp(n * k)} = ${rp(A + n * k)}.` }); },
    /* Kursi baris ke-n */
    () => { const t = pilih(["aula sekolah", "gedung pertunjukan", "lapangan upacara", "masjid"]), a = acak(8, 15), k = acak(2, 4), n = acak(6, 9), d = deret(a, x => x + k, n);
      return isian(`Di ${t}, baris ke-1 ada ${a} kursi, baris ke-2 ada ${d[1]} kursi, baris ke-3 ada ${d[2]} kursi, dan seterusnya. Banyak kursi pada baris ke-${n} adalah …`, d[n - 1], { satuan: "kursi", petunjuk: `Setiap baris bertambah ${k} kursi.`, bahas: `${d.join(", ")}. Baris ke-${n} ada ${d[n - 1]} kursi.` }); },
    /* Bilangan pengali */
    () => { const r = acak(2, 5), a = acak(1, r <= 3 ? 6 : 3), d = deret(a, x => x * r, 4);
      return isian(`Setiap bilangan pada pola <b>${tulisDeret(d)}</b> diperoleh dengan mengalikan bilangan sebelumnya dengan bilangan yang sama. Bilangan pengali itu adalah …`, r, { petunjuk: "Bagi sebuah bilangan dengan bilangan di depannya.", bahas: `${d[1]} : ${d[0]} = ${r}, ${d[2]} : ${d[1]} = ${r}. Pengalinya ${r}.` }); },
  ],
  5: [
    () => { const a = acak(1, 5), k = acak(2, 4), b = acak(10, 20), m = pilih([5, 10]); const d = []; for (let i = 0; i < 4; i++) d.push(a + k * i, b + m * i);
      return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 7))}</b> adalah …`, d[7], { petunjuk: "Ada dua pola yang berselang-seling.", bahas: `Pola ganjil: +${k}; pola genap: +${m}. Berikutnya ${d[7]}.` }); },
    () => { const a = acak(2, 6), d = deret(a, (x, i) => (i % 2 ? x * 2 : x + 3), 6); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 5))}</b> adalah …`, d[5], { petunjuk: "Coba: ×2, +3, ×2, +3, …", bahas: `Polanya ×2, +3 bergantian. Berikutnya ${d[5]}.` }); },
    /* Dua suku hilang */
    () => { const a = acak(2, 30), k = acak(3, 12), d = deret(a, x => x + k, 5);
      return isian(`Pada pola <b>${fmt(d[0])}, □, ${fmt(d[2])}, □, ${fmt(d[4])}</b>, jumlah kedua bilangan □ adalah …`, d[1] + d[3], { petunjuk: "Dari bilangan pertama ke bilangan ketiga ada 2 langkah yang sama besar.", bahas: `Selisih = (${d[2]} − ${d[0]}) : 2 = ${k}. Kedua □ adalah ${d[1]} dan ${d[3]}; jumlahnya ${d[1] + d[3]}.` }); },
    /* Lilin memendek */
    () => { const k = pilih([2, 3, 4, 5]), n = acak(3, 8), P = k * (n + acak(1, 5)) + acak(0, k - 1);
      return isian(`Sebuah lilin panjangnya ${P} cm. Setelah dinyalakan, lilin itu memendek ${k} cm setiap jam. Panjang lilin setelah ${n} jam adalah …`, P - n * k, { satuan: "cm", petunjuk: `Polanya ${P - k}, ${P - 2 * k}, … (berkurang ${k}).`, bahas: `${P} − ${n} × ${k} = ${P} − ${n * k} = ${P - n * k} cm.` }); },
    /* Bilangan ganjil / genap ke-n */
    () => { const g = ya(), j = g ? "genap" : "ganjil", n = acak(10, 30), v = g ? 2 * n : 2 * n - 1;
      return isian(`Bilangan ${j} berurutan dimulai dari ${g ? 2 : 1}: <b>${tulisDeret(g ? [2, 4, 6, 8] : [1, 3, 5, 7])}</b><br>Bilangan ${j} ke-${n} adalah …`, v, { petunjuk: g ? "Bilangan genap ke-1 = 2 × 1, ke-2 = 2 × 2, …" : "Bilangan ganjil ke-n = 2 × n − 1. Cek: ke-3 = 2 × 3 − 1 = 5.", bahas: g ? `2 × ${n} = ${v}.` : `2 × ${n} − 1 = ${v}.` }); },
    /* Bilangan X adalah suku ke berapa */
    () => { const a = acak(1, 10), k = acak(2, 5), n = acak(8, 15), X = a + (n - 1) * k;
      return isian(`Pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b> diteruskan. Bilangan ${X} adalah bilangan ke- …`, n, { petunjuk: `Hitung berapa kali ditambah ${k} untuk sampai ke ${X}, lalu tambah 1.`, bahas: `(${X} − ${a}) : ${k} = ${n - 1}. ${n - 1} + 1 = ${n}.` }); },
  ],
  6: [
    () => { const a = acak(2, 15), k = acak(2, 9), n = acak(10, 20); return isian(`Suku ke-${n} dari pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b> adalah …`, a + (n - 1) * k, { petunjuk: `Suku ke-n = suku pertama + (n − 1) × selisih.`, bahas: `${a} + (${n} − 1) × ${k} = ${a + (n - 1) * k}.` }); },
    /* Aturan pola dalam kata-kata */
    () => { const j = pilih(["tambah", "kurang", "kali"]);
      let a, k, d, benar, salah;
      if (j === "tambah") { a = acak(2, 20); k = acak(3, 9); d = deret(a, x => x + k, 5);
        benar = `Dimulai dari ${a}, lalu setiap suku ditambah ${k}`; salah = [`Dimulai dari ${a}, lalu setiap suku dikali ${k}`, `Dimulai dari ${a + k}, lalu setiap suku ditambah ${k}`, `Dimulai dari ${a}, lalu setiap suku ditambah ${k + 1}`, `Dimulai dari ${a}, lalu setiap suku ditambah ${k - 1}`]; }
      else if (j === "kurang") { a = acak(70, 120); k = acak(3, 9); d = deret(a, x => x - k, 5);
        benar = `Dimulai dari ${a}, lalu setiap suku dikurangi ${k}`; salah = [`Dimulai dari ${a}, lalu setiap suku ditambah ${k}`, `Dimulai dari ${a - k}, lalu setiap suku dikurangi ${k}`, `Dimulai dari ${a}, lalu setiap suku dikurangi ${k + 1}`, `Dimulai dari ${a}, lalu setiap suku dibagi ${k}`]; }
      else { a = acak(2, 5); k = pilih([2, 3]); d = deret(a, x => x * k, 5);
        benar = `Dimulai dari ${a}, lalu setiap suku dikali ${k}`; salah = [`Dimulai dari ${a}, lalu setiap suku ditambah ${a * k - a}`, `Dimulai dari ${a}, lalu setiap suku ditambah ${k}`, `Dimulai dari ${a * k}, lalu setiap suku dikali ${k}`, `Dimulai dari ${a}, lalu setiap suku dikali ${k + 1}`]; }
      return pg(`Aturan yang tepat untuk pola <b>${tulisDeret(d)}</b> adalah …`, benar, kocok(salah), { petunjuk: "Cek aturannya pada <b>semua</b> suku, bukan hanya dua suku pertama.", bahas: `${d.slice(0, 4).map((x, i) => `${x} → ${d[i + 1]}`).join(", ")}. ${benar}.` }); },
    /* Menemukan bilangan yang salah */
    () => { const a = acak(3, 30), k = acak(3, 9), d = deret(a, x => x + k, 6), i = acak(1, 4), g = pilih([-2, -1, 1, 2]), t = d.slice(); t[i] += g;
      return pg(`Ada <b>satu</b> bilangan yang salah tulis pada pola <b>${t.map(fmt).join(", ")}</b>. Bilangan yang salah adalah …`, t[i], ambil(t.filter((_, j) => j !== i && j > 0 && j < 5), 3), { petunjuk: "Tulis selisih setiap dua bilangan berdekatan. Selisih yang berbeda menunjukkan letak kesalahan.", bahas: `Polanya +${k}: ${d.map(fmt).join(", ")}. Seharusnya ${d[i]}, bukan ${t[i]}.` }); },
    /* Pola berkurang dalam cerita */
    () => { const k = pilih([15, 20, 25, 30, 40, 50]), n = acak(6, 15), L = k * (n + acak(3, 12)), x = pilih(["tangki air", "drum air", "bak penampung"]);
      return isian(`Sebuah ${x} berisi ${fmt(L)} liter air. Setiap hari air dipakai ${k} liter. Sisa air setelah hari ke-${n} adalah …`, L - n * k, { satuan: "liter", petunjuk: `Polanya: ${fmt(L - k)}, ${fmt(L - 2 * k)}, ${fmt(L - 3 * k)}, … (berkurang ${k}).`, bahas: `${fmt(L)} − ${n} × ${k} = ${fmt(L)} − ${n * k} = ${fmt(L - n * k)} liter.` }); },
  ],
  7: [
    () => { const t = pilih(["persegi", "segitiga", "kubik"]), f = { persegi: n => n * n, segitiga: n => n * (n + 1) / 2, kubik: n => n ** 3 }[t], n = t === "kubik" ? acak(5, 7) : acak(7, 12);
      return isian(`Perhatikan pola <b>${[1, 2, 3, 4].map(f).join(", ")}, …</b><br>Suku ke-${n} adalah …`, f(n), { petunjuk: t === "persegi" ? "1 = 1×1, 4 = 2×2, …" : t === "segitiga" ? "Selisihnya 2, 3, 4, …" : "1 = 1×1×1, 8 = 2×2×2, …", bahas: `Suku ke-${n} = ${f(n)}.` }); },
    () => { const c = acak(1, 9) * pilih([1, -1]), k = pilih([1, 2]), f = n => k * n * n + c; if (f(1) <= 0) return isian(`Suku ke-8 dari pola 3, 6, 11, 18, … adalah …`, 66, { bahas: "n² + 2 → 64 + 2 = 66." });
      const n = acak(6, 12); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4].map(f))}</b> adalah …`, f(n), { petunjuk: `Bandingkan dengan pola bilangan persegi ${k === 2 ? "yang dikali 2 " : ""}(1, 4, 9, 16, …).`, bahas: `Rumusnya ${k === 2 ? "2 × " : ""}n × n ${c > 0 ? "+ " + c : "− " + -c}. Suku ke-${n} = ${f(n)}.` }); },
    () => { const s = acak(0, 4), f = n => (n + s) * (n + s + 1), n = acak(6, 12); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4].map(f))}</b> adalah …`, f(n), { petunjuk: `${f(1)} = ${1 + s} × ${2 + s}, ${f(2)} = ${2 + s} × ${3 + s}, …`, bahas: `Suku ke-n = (n + ${s}) × (n + ${s + 1}). Suku ke-${n} = ${n + s} × ${n + s + 1} = ${f(n)}.` }); },
    /* Pola berulang */
    () => { const pj = acak(3, 5), x = nama(), benda = pilih([["manik-manik", "berwarna"], ["bendera", "berwarna"], ["lampu hias", "berwarna"]]),
        semua = ambil(["merah", "kuning", "hijau", "biru", "ungu", "putih", "oranye"], pj + 1), siklus = semua.slice(0, pj), N = acak(30, 99), w = siklus[(N - 1) % pj], sisa = (N - 1) % pj + 1;
      return pg(`${x} menyusun ${benda[0]} dengan urutan warna berulang: <b>${[...siklus, ...siklus.slice(0, 2)].join(", ")}, …</b><br>${benda[0][0].toUpperCase() + benda[0].slice(1)} ke-${N} ${benda[1]} …`, w, kocok(semua.filter(c => c !== w)),
        { petunjuk: `Satu putaran warna ada ${pj}. Bagi ${N} dengan ${pj}, lalu lihat sisanya.`, bahas: `${N} : ${pj} = ${Math.floor(N / pj)} sisa ${N % pj}. ${N % pj ? `Sisa ${N % pj} berarti warna ke-${sisa} dalam putaran` : `Sisa 0 berarti warna terakhir dalam putaran`}, yaitu <b>${w}</b>.` }); },
    /* Pola perkalian dalam cerita */
    () => { const t = pilih([15, 20, 30]), a = acak(2, 6), j = t === 30 ? pilih([2, 3]) : t === 20 ? pilih([1, 2]) : 1, n = j * 60 / t, hasil = a * 2 ** n;
      return isian(`Dalam percobaan, ${a} sel bakteri membelah diri menjadi 2 setiap ${t} menit. Banyak sel bakteri setelah ${j} jam adalah …`, hasil, { satuan: "sel", petunjuk: `${j} jam = ${j * 60} menit = ${n} kali membelah. Setiap membelah, banyaknya dikali 2.`, bahas: `${deret(a, y => y * 2, n + 1).join(" → ")}. Setelah ${n} kali membelah ada ${fmt(hasil)} sel.` }); },
    /* Bilangan yang termasuk pola */
    () => { const a = acak(2, 20), k = acak(3, 9), m = acak(15, 35), X = a + m * k;
      return pg(`Bilangan yang merupakan salah satu suku dari pola <b>${tulisDeret(deret(a, y => y + k, 4))}</b> adalah …`, fmt(X), kocok([X + 1, X - 1, X + 2, X - 2]).map(fmt),
        { petunjuk: `Kurangi bilangan dengan ${a}. Hasilnya harus habis dibagi ${k}.`, bahas: `(${X} − ${a}) : ${k} = ${m}, habis dibagi. Jadi ${X} adalah suku ke-${m + 1}. Bilangan lain jika dikurangi ${a} tidak habis dibagi ${k}.` }); },
  ],
  8: [
    () => { const a = acak(10, 20), k = acak(2, 4), n = acak(12, 25); return isian(`Di sebuah gedung pertunjukan, baris pertama ada ${a} kursi. Setiap baris di belakangnya bertambah ${k} kursi. Banyak kursi pada baris ke-${n} adalah …`, a + (n - 1) * k, { satuan: "kursi", bahas: `${a} + (${n} − 1) × ${k} = ${a + (n - 1) * k} kursi.` }); },
    () => { const a = pilih([2000, 3000, 5000]), k = pilih([500, 1000, 2000]), n = acak(8, 15), x = nama(); return isian(`${x} menabung. Minggu pertama ${rp(a)}, dan setiap minggu tabungannya ${rp(k)} lebih banyak dari minggu sebelumnya. Pada minggu ke-${n}, ${x} menabung Rp …`, a + (n - 1) * k, { bahas: `${rp(a)} + (${n} − 1) × ${rp(k)} = ${rp(a + (n - 1) * k)}.` }); },
  ],
  9: [
    () => { const a = acak(1, 9), k = acak(2, 5), n = acak(10, 20), l = a + (n - 1) * k; return isian(`Jumlah ${n} suku pertama dari pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b> adalah …`, n * (a + l) / 2, { petunjuk: "Pasangkan suku pertama dengan suku terakhir.", bahas: `Suku ke-${n} = ${l}. Jumlah = ${n} × (${a} + ${l}) : 2 = ${fmt(n * (a + l) / 2)}.` }); },
    () => { const a = acak(1, 4), b = acak(1, 5), d = deret(0, () => 0, 1); d.length = 0; d.push(a, b); while (d.length < 8) d.push(d[d.length - 1] + d[d.length - 2]); return isian(`Bilangan berikutnya dari pola <b>${tulisDeret(d.slice(0, 7))}</b> adalah …`, d[7], { petunjuk: "Coba jumlahkan dua bilangan sebelumnya.", bahas: `${d[5]} + ${d[6]} = ${d[7]}.` }); },
    /* Menemukan kesalahan pada pola bertingkat / perkalian */
    () => { let d, aturan;
      if (ya()) { const a = acak(2, 6), r = pilih([2, 3]); d = deret(a, x => x * r, 6); aturan = `dikali ${r}`; }
      else { const a = acak(1, 20), s = acak(2, 5), t = acak(2, 3); d = deret(a, (x, i) => x + s + (i - 1) * t, 6); aturan = `selisihnya bertambah ${t} (${d.slice(1).map((x, i) => x - d[i]).join(", ")})`; }
      const i = acak(2, 4), t2 = d.slice(); t2[i] += pilih([-1, 1]);
      return pg(`Ada <b>satu</b> bilangan yang salah tulis pada pola <b>${t2.map(fmt).join(", ")}</b>. Bilangan yang salah adalah …`, fmt(t2[i]), kocok(t2.filter((_, j) => j !== i && j > 0)).map(fmt),
        { petunjuk: "Cari aturan dari bilangan-bilangan awal, lalu periksa satu per satu.", bahas: `Aturannya: ${aturan}. Pola yang benar ${d.map(fmt).join(", ")}. Seharusnya ${fmt(d[i])}, bukan ${fmt(t2[i])}.` }); },
    /* Pilih semua suku pola */
    () => { const a = acak(2, 15), k = acak(4, 9), ms = ambil([12, 15, 18, 20, 23, 25, 27, 30, 34, 40], 5), nB = acak(2, 3);
      const butir = ms.map((m, i) => i < nB ? { t: fmt(a + m * k), b: true } : { t: fmt(a + m * k + pilih([1, 2, k - 1, k - 2, -1, -2])), b: false });
      return pgk(`Perhatikan pola <b>${tulisDeret(deret(a, y => y + k, 4))}</b><br>Pilih <b>semua</b> bilangan yang termasuk suku pola tersebut.`, butir,
        { petunjuk: `Suku pola = ${a} + kelipatan ${k}.`, bahas: `Kurangi setiap bilangan dengan ${a}, lalu cek apakah habis dibagi ${k}. Yang termasuk: ${butir.filter(x => x.b).map(x => x.t).join(", ")}.` }); },
    /* Kabar berantai: jumlah pola perkalian */
    () => { const n = acak(5, 9), x = nama(), baru = deret(1, y => y * 2, n), tot = 2 ** n - 1;
      return isian(`Hari pertama hanya ${x} yang tahu sebuah kabar. Setiap orang yang baru tahu memberi tahu 2 orang lain keesokan harinya. Sampai hari ke-${n}, banyak orang yang sudah tahu kabar itu (termasuk ${x}) adalah …`, tot,
        { satuan: "orang", petunjuk: "Orang yang baru tahu setiap hari: 1, 2, 4, 8, … Lalu jumlahkan.", bahas: `Yang baru tahu: ${baru.join(" + ")} = ${fmt(tot)} orang.` }); },
  ],
  10: [
    () => { const p = acak(1, 3), q = acak(-2, 4), r = acak(0, 5), f = n => p * n * n + q * n + r; if (f(1) <= 0) return isian(`Suku ke-10 dari pola 2, 5, 10, 17, … adalah …`, 101, { bahas: "n² + 1 → 101." });
      const n = acak(10, 15); return isian(`Suku ke-${n} dari pola <b>${tulisDeret([1, 2, 3, 4, 5].map(f))}</b> adalah …`, f(n), { petunjuk: "Hitung selisih tingkat pertama, lalu selisih tingkat kedua.", bahas: `Rumus suku ke-n = ${p === 1 ? "" : p}n²${q ? (q > 0 ? " + " : " − ") + (Math.abs(q) === 1 ? "" : Math.abs(q)) + "n" : ""}${r ? " + " + r : ""}. Suku ke-${n} = ${f(n)}.` }); },
    () => { const a = acak(3, 20), k = acak(3, 8), n = acak(25, 60), X = a + (n - 1) * k; return isian(`Pada pola <b>${tulisDeret(deret(a, x => x + k, 4))}</b>, bilangan <b>${X}</b> adalah suku ke- …`, n, { petunjuk: `(${X} − ${a}) : ${k} lalu tambah 1.`, bahas: `(${X} − ${a}) : ${k} + 1 = ${n}.` }); },
    /* Dua pola bertemu */
    () => { const a = acak(5, 30), k = acak(2, 6), m = acak(2, 6), n = acak(6, 14), b = a + (n - 1) * (k + m), v = a + (n - 1) * k, x = namaBeda(2);
      return isian(`Pada minggu ke-1, tabungan ${x[0]} ${fmt(a)} ribu rupiah dan setiap minggu berikutnya bertambah ${k} ribu rupiah. Tabungan ${x[1]} pada minggu ke-1 sebesar ${fmt(b)} ribu rupiah dan setiap minggu berikutnya berkurang ${m} ribu rupiah. Tabungan mereka sama besar pada minggu ke- …`, n,
        { petunjuk: `Setiap minggu selisih tabungan mereka mengecil ${k} + ${m} = ${k + m} ribu.`, bahas: `Selisih awal ${fmt(b)} − ${fmt(a)} = ${fmt(b - a)} ribu. ${fmt(b - a)} : ${k + m} = ${n - 1} minggu setelah minggu pertama, jadi minggu ke-${n}. Saat itu tabungan masing-masing ${fmt(v)} ribu rupiah.` }); },
    /* Menyisipkan bilangan */
    () => { const p = acak(2, 40), s = acak(3, 9), d = acak(2, 12), q = p + (s + 1) * d;
      return isian(`Di antara bilangan ${p} dan ${q} disisipkan ${s} bilangan sehingga ke-${s + 2} bilangan itu membentuk pola dengan selisih tetap. Selisih pola tersebut adalah …`, d,
        { petunjuk: `Ada ${s + 2} bilangan, berarti ada ${s + 1} langkah dari ${p} ke ${q}.`, bahas: `(${q} − ${p}) : ${s + 1} = ${q - p} : ${s + 1} = ${d}. Polanya ${deret(p, y => y + d, s + 2).join(", ")}.` }); },
    /* Jumlah pola berulang */
    () => { const pj = acak(3, 4), c = Array.from({ length: pj }, () => acak(1, 9)), N = acak(30, 80), put = Math.floor(N / pj), sisa = N % pj, sp = c.reduce((s, v) => s + v, 0), ss = c.slice(0, sisa).reduce((s, v) => s + v, 0), tot = put * sp + ss;
      return isian(`Pola <b>${[...c, ...c].join(", ")}, …</b> terus berulang. Jumlah ${N} bilangan pertama pola itu adalah …`, tot,
        { petunjuk: `Satu putaran ada ${pj} bilangan dengan jumlah ${sp}.`, bahas: `${N} : ${pj} = ${put} putaran sisa ${sisa}. Jumlah = ${put} × ${sp}${sisa ? ` + (${c.slice(0, sisa).join(" + ")})` : ""} ${sisa ? ` = ${put * sp} + ${ss}` : ""} = ${fmt(tot)}.` }); },
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
  titikDuaBaris: { f: n => 2 * n, nama: "titik", jenis: "linear", gambar: n => { let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j < 2; j++) s += `<circle cx="${i * 12 + 5}" cy="${j * 12 + 5}" r="4" class="titik"/>`; return { s, w: n * 12, h: 24 }; } },
  titikTigaBaris: { f: n => 3 * n, nama: "titik", jenis: "linear", gambar: n => { let s = ""; for (let i = 0; i < n; i++) for (let j = 0; j < 3; j++) s += `<circle cx="${i * 12 + 5}" cy="${j * 12 + 5}" r="4" class="titik"/>`; return { s, w: n * 12, h: 36 }; } },
  ubinTigaBaris: { f: n => 3 * n + 3, nama: "ubin", jenis: "linear", gambar: n => { const u = 12; let s = ""; for (let i = 0; i < n + 1; i++) for (let j = 0; j < 3; j++) s += `<rect x="${i * u}" y="${j * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: (n + 1) * u, h: 3 * u }; } },
  ubinV: { f: n => 2 * n + 1, nama: "ubin", jenis: "linear", gambar: n => { const u = 11; let s = `<rect x="${n * u}" y="${n * u}" width="${u}" height="${u}" class="ubin"/>`; for (let i = 1; i <= n; i++) s += `<rect x="${(n - i) * u}" y="${(n - i) * u}" width="${u}" height="${u}" class="ubin"/><rect x="${(n + i) * u}" y="${(n - i) * u}" width="${u}" height="${u}" class="ubin"/>`; return { s, w: (2 * n + 1) * u, h: (n + 1) * u }; } },
};
function svgPola(pola, ns = [1, 2, 3]) {
  const g = ns.map(n => pola.gambar(n)), gap = 34, w = g.reduce((s, x) => s + x.w, 0) + gap * (g.length - 1) + 16, h = Math.max(...g.map(x => x.h)) + 34;
  let x = 8, s = svgBuka(w, h, "gambar pola");
  g.forEach((k, i) => { s += `<g transform="translate(${x},${h - 26 - k.h})">${k.s}</g>` + svgT(x + k.w / 2, h - 6, `Pola ${ns[i]}`, 'text-anchor="middle" class="lbl"'); x += k.w + gap; });
  return s + "</svg>";
}
const polaLinear = () => pilih(Object.values(POLA).filter(p => p.jenis === "linear"));
function rumusPola(p) { const a = p.f(1), b = p.f(2) - p.f(1); return { a, b }; }
function soalPolaKe(p, n, o = {}, m) {
  const { a, b } = rumusPola(p), lin = p.jenis === "linear";
  if (!m) m = acak(1, Math.max(1, Math.min(3, n - 3)));
  return isian(`Perhatikan pola berikut. Banyak ${p.nama} pada <b>pola ke-${n}</b> adalah …`, p.f(n), { gambar: svgPola(p, [m, m + 1, m + 2]), satuan: p.nama,
    petunjuk: lin ? `Setiap pola bertambah ${b} ${p.nama}.` : "Perhatikan bentuknya: persegi atau segitiga?", bahas: lin ? `Pola: ${p.f(1)}, ${p.f(2)}, ${p.f(3)}, … (bertambah ${b}). Pola ke-${n} = ${a} + (${n} − 1) × ${b} = ${p.f(n)}.` : `Pola ke-${n} = ${p.f(n)}.`, ...o });
}
const polaKuadrat = () => pilih([POLA.titikPersegi, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]);
/* Pola yang mudah dihitung untuk level awal */
const POLA_MUDAH = [POLA.ubinL, POLA.bingkai, POLA.titikPersegi, POLA.korekPersegi, POLA.korekSegitiga, POLA.ubinDuaBaris, POLA.ubinT, POLA.tangga, POLA.plus, POLA.meja, POLA.titikDuaBaris, POLA.titikTigaBaris, POLA.ubinTigaBaris, POLA.ubinV];
/* Menghitung banyak benda pada salah satu gambar */
function soalHitungGambar(p, m) {
  const k = m + acak(0, 2);
  return isian(`Perhatikan gambar. Banyak ${p.nama} pada gambar <b>Pola ${k}</b> adalah …`, p.f(k), { gambar: svgPola(p, [m, m + 1, m + 2]), satuan: p.nama,
    petunjuk: "Hitung satu per satu dengan teliti. Beri tanda pada yang sudah dihitung.", bahas: `Pola ${m}, ${m + 1}, ${m + 2} berturut-turut ${p.f(m)}, ${p.f(m + 1)}, ${p.f(m + 2)} ${p.nama}. Jadi Pola ${k} = ${p.f(k)}.` });
}
/* Pertambahan tetap dari satu pola ke pola berikutnya */
function soalTambahPola(p, m) {
  const { b } = rumusPola(p);
  return isian(`Perhatikan gambar. Setiap naik satu pola, banyak ${p.nama} bertambah …`, b, { gambar: svgPola(p, [m, m + 1, m + 2]), satuan: p.nama,
    petunjuk: "Hitung benda pada dua pola yang berdekatan, lalu kurangkan.", bahas: `${p.f(m)}, ${p.f(m + 1)}, ${p.f(m + 2)}: selalu bertambah ${b}.` });
}
/* Pola ke berapa yang memerlukan X benda */
function soalPolaKeBerapa(p, n) {
  const { a, b } = rumusPola(p), X = p.f(n);
  return isian(`Perhatikan pola berikut. Pola ke berapa yang memerlukan tepat <b>${X} ${p.nama}</b>?`, n, { gambar: svgPola(p), petunjuk: `Mulai dari ${a}, setiap pola bertambah ${b}. Teruskan sampai ${X}.`,
    bahas: `${deret(a, y => y + b, n).join(", ")}. Bilangan ${X} ada pada pola ke-${n}.` });
}
/* Selisih dua pola */
function soalSelisihPola(p, A, B) {
  const { b } = rumusPola(p);
  return isian(`Perhatikan pola berikut. Selisih banyak ${p.nama} pada pola ke-${B} dan pola ke-${A} adalah …`, p.f(B) - p.f(A), { gambar: svgPola(p), satuan: p.nama,
    petunjuk: `Setiap naik satu pola bertambah ${b}. Dari pola ke-${A} ke pola ke-${B} naik ${B - A} kali.`, bahas: `${B - A} × ${b} = ${p.f(B) - p.f(A)}. (Cek: ${p.f(B)} − ${p.f(A)} = ${p.f(B) - p.f(A)}.)` });
}
/* Persediaan benda: pola terbesar yang bisa dibuat */
function soalPolaTerbesar(nMin, nMax) {
  const p = polaLinear(), { b } = rumusPola(p), n = acak(nMin, nMax), T = p.f(n) + acak(0, b - 1), x = nama();
  return isian(`Perhatikan pola berikut. ${x} mempunyai ${T} ${p.nama}. Ia ingin membuat <b>satu</b> pola sebesar mungkin dengan aturan yang sama. Pola terbesar yang dapat dibuat ${x} adalah pola ke- …`, n,
    { gambar: svgPola(p), petunjuk: "Cari pola yang banyaknya paling dekat, tetapi tidak lebih dari persediaan.", bahas: `Pola ke-${n} memerlukan ${p.f(n)} ${p.nama} (cukup), sedangkan pola ke-${n + 1} memerlukan ${p.f(n + 1)} ${p.nama} (tidak cukup). Jadi pola ke-${n}.` });
}
/* Gabungan dua pola */
function soalGabungPola(p, A, B) {
  return isian(`Perhatikan pola berikut. ${nama()} membuat pola ke-${A} dan pola ke-${B}. Banyak ${p.nama} yang diperlukan untuk kedua pola itu adalah …`, p.f(A) + p.f(B), { gambar: svgPola(p), satuan: p.nama,
    petunjuk: "Hitung masing-masing pola dengan aturannya, lalu jumlahkan.", bahas: `Pola ke-${A} = ${p.f(A)}, pola ke-${B} = ${p.f(B)}. Jumlah = ${p.f(A) + p.f(B)} ${p.nama}.` });
}
const teksRumusPola = (b, c) => (b === 1 ? "n" : `${b} × n`) + (c > 0 ? ` + ${c}` : c < 0 ? ` − ${-c}` : "");
daftarMisi("alj", "a2", "Pola gambar", "🔷", {
  1: [
    () => { const n = acak(4, 5); return soalPolaKe(pilih(POLA_MUDAH), n, {}, n === 5 ? pilih([1, 2]) : 1); },
    () => soalHitungGambar(pilih(POLA_MUDAH), acak(1, 2)),
    () => soalTambahPola(pilih(POLA_MUDAH.filter(p => p.jenis === "linear")), acak(1, 2)),
  ],
  2: [
    () => soalPolaKe(polaLinear(), acak(5, 6)), () => soalPolaKe(pilih([POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), acak(4, 5)),
    () => soalHitungGambar(pilih([...POLA_MUDAH, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.korekRumah]), acak(2, 3)),
    () => soalTambahPola(polaLinear(), acak(2, 4)),
  ],
  3: [
    () => soalPolaKe(polaLinear(), acak(6, 8)),
    () => { const A = acak(2, 5); return soalSelisihPola(polaLinear(), A, A + acak(2, 4)); },
    () => soalPolaKeBerapa(polaLinear(), acak(5, 8)),
  ],
  4: [() => soalPolaKe(polaLinear(), acak(7, 10)), () => soalPolaKe(polaKuadrat(), acak(5, 7)), () => soalPolaKeBerapa(polaLinear(), acak(7, 11))],
  5: [
    () => soalPolaKe(polaLinear(), acak(10, 12)),
    () => soalPolaKeBerapa(polaLinear(), acak(10, 15)),
    () => { const A = acak(5, 10); return soalSelisihPola(polaLinear(), A, A + acak(3, 8)); },
  ],
  6: [
    () => soalPolaKe(polaLinear(), acak(13, 20)),
    () => soalPolaKeBerapa(polaLinear(), acak(12, 20)),
    () => { const A = acak(6, 12); return soalSelisihPola(polaLinear(), A, A + acak(4, 9)); },
    () => soalPolaKe(polaKuadrat(), acak(6, 9)),
  ],
  7: [
    () => soalPolaKe(polaKuadrat(), acak(8, 20)),
    /* Rumus pola ke-n */
    () => { const p = polaLinear(), { a, b } = rumusPola(p), c = a - b, benar = teksRumusPola(b, c);
      const salah = [teksRumusPola(a, 0), teksRumusPola(b + 1, c - 1), teksRumusPola(1, a - 1), teksRumusPola(b, c + 1), teksRumusPola(b, c - 1)].filter(t => t !== benar);
      return pg(`Perhatikan pola berikut. Jika n menyatakan nomor pola, banyak ${p.nama} pada pola ke-n dapat dihitung dengan rumus …`, benar, kocok(salah),
        { gambar: svgPola(p), petunjuk: "Uji rumus pada pola 1, pola 2, <b>dan</b> pola 3. Rumus yang benar cocok untuk semuanya.", bahas: `Setiap pola bertambah ${b}, jadi ada "${b} × n". Pola 1: ${b} × 1 = ${b}, padahal banyaknya ${a}, maka ${c > 0 ? `ditambah ${c}` : c < 0 ? `dikurangi ${-c}` : "tidak perlu ditambah apa-apa"}. Rumusnya ${benar}. Cek pola 3: ${b} × 3${c > 0 ? ` + ${c}` : c < 0 ? ` − ${-c}` : ""} = ${p.f(3)}.` }); },
    /* Benar-salah tentang pola gambar */
    () => { const p = polaLinear(), { a, b } = rumusPola(p), c = a - b, k1 = acak(4, 6), k2 = acak(10, 20), k3 = acak(3, 6), nm = p.nama;
      const b1 = ya(), v1 = b1 ? p.f(k1) : p.f(k1) + pilih([b, -b]);
      const b2 = ya(), v2 = b2 ? b : b + pilih([1, -1]);
      const b3 = ya(), v3 = b3 ? p.f(k2) : p.f(k2) + pilih([b, -b, 1]);
      return bs(`Perhatikan pola berikut. Tentukan <b>Benar</b> atau <b>Salah</b> untuk setiap pernyataan.`, [
        { t: `Pola ke-${k1} terdiri atas ${v1} ${nm}.`, b: b1 },
        { t: `Setiap naik satu pola, banyak ${nm} bertambah ${v2}.`, b: b2 },
        { t: `Pola ke-${k2} memerlukan ${v3} ${nm}.`, b: b3 },
        { t: `Banyak ${nm} pada pola ke-${2 * k3} sama dengan dua kali banyak ${nm} pada pola ke-${k3}.`, b: c === 0 },
      ], { gambar: svgPola(p), petunjuk: `Tulis dulu banyak ${nm} pada pola 1, 2, 3, lalu cari aturannya.`, bahas: `Polanya ${p.f(1)}, ${p.f(2)}, ${p.f(3)}, … bertambah ${b}; rumusnya ${teksRumusPola(b, c)}. Pola ke-${k1} = ${p.f(k1)}, pola ke-${k2} = ${p.f(k2)}. Pola ke-${2 * k3} = ${p.f(2 * k3)}, sedangkan 2 × pola ke-${k3} = ${2 * p.f(k3)}${c === 0 ? " (sama)" : " (tidak sama)"}.` }); },
    /* Persediaan benda: pola terbesar yang bisa dibuat */
    () => soalPolaTerbesar(6, 15),
  ],
  8: [
    () => { const n = acak(12, 30), x = pilih(["perpustakaan", "kantin", "aula", "ruang kelas"]); return isian(`Meja-meja di ${x} disusun berjajar seperti gambar. Satu meja untuk 4 kursi, dua meja yang disambung untuk 6 kursi, dan seterusnya. Jika ada <b>${n} meja</b> yang disambung, banyak kursi yang dapat ditempatkan adalah …`, 2 * n + 2,
      { gambar: svgPola(POLA.meja), satuan: "kursi", petunjuk: "Setiap meja punya 2 kursi (atas dan bawah), ditambah 2 kursi di ujung.", bahas: `2 × ${n} + 2 = ${2 * n + 2} kursi.` }); },
    () => soalPolaKe(polaLinear(), acak(25, 50)),
    () => soalPolaKeBerapa(polaLinear(), acak(16, 30)),
    () => { const A = acak(10, 20); return soalSelisihPola(polaLinear(), A, A + acak(8, 15)); },
    () => { const A = acak(5, 12); return soalGabungPola(polaLinear(), A, A + acak(3, 10)); },
  ],
  9: [
    () => { const p = polaLinear(), n = acak(15, 40), { a, b } = rumusPola(p), X = p.f(n);
      return isian(`Perhatikan pola berikut. Pola ke berapa yang memerlukan tepat <b>${X} ${p.nama}</b>?`, n, { gambar: svgPola(p), petunjuk: `Rumusnya: ${a} + (n − 1) × ${b}.`, bahas: `${a} + (n − 1) × ${b} = ${X} → n − 1 = ${(X - a) / b} → n = ${n}.` }); },
    () => { const p = polaLinear(), A = acak(8, 15), B = A + acak(5, 12); return isian(`Perhatikan pola berikut. Selisih banyak ${p.nama} pada pola ke-${B} dan pola ke-${A} adalah …`, p.f(B) - p.f(A), { gambar: svgPola(p), petunjuk: "Setiap naik satu pola, bertambah tetap.", bahas: `${p.f(B)} − ${p.f(A)} = ${p.f(B) - p.f(A)}.` }); },
    () => soalPolaKe(polaKuadrat(), acak(10, 15)),
    () => soalPolaTerbesar(15, 30),
    () => { const A = acak(10, 20); return soalGabungPola(polaLinear(), A, A + acak(5, 15)); },
  ],
  10: [
    () => { const p = polaLinear(), n = acak(6, 15); let t = 0; for (let i = 1; i <= n; i++) t += p.f(i);
      return isian(`Perhatikan pola berikut. ${nama()} membuat pola ke-1 sampai pola ke-${n} sekaligus. Jumlah ${p.nama} yang diperlukan seluruhnya adalah …`, t, { gambar: svgPola(p), satuan: p.nama, petunjuk: "Pasangkan pola pertama dan terakhir: jumlahnya selalu sama.", bahas: `Pola ke-1 = ${p.f(1)}, pola ke-${n} = ${p.f(n)}. Jumlah = ${n} × (${p.f(1)} + ${p.f(n)}) : 2 = ${t}.` }); },
    () => { const p = pilih([POLA.titikPersegi, POLA.titikSegitiga, POLA.titikPersegiPanjang, POLA.tangga]), n = acak(8, 20), X = p.f(n); return isian(`Perhatikan pola berikut. Pola ke berapa yang tersusun dari <b>${X} ${p.nama}</b>?`, n, { gambar: svgPola(p), bahas: `Pola ke-${n} = ${X}.` }); },
  ],
});

/* ================= Misi 3: Angka yang hilang ================= */
const KOTAK = "<b class=\"kotak-isi\">□</b>";
/* Timbangan seimbang: kiri/kanan berisi larik benda { t: label, kotak?: true } */
function svgTimbang(kiri, kanan) {
  const W = 360, H = 130, lebar = b => (b.kotak ? 26 : 46);
  let s = svgBuka(W, H, "timbangan seimbang");
  s += `<polygon points="165,124 195,124 180,92" class="bangun"/><rect x="20" y="86" width="320" height="7" rx="3" class="meja"/>`;
  [[kiri, 90], [kanan, 270]].forEach(([isi, cx]) => {
    s += `<rect x="${cx - 80}" y="76" width="160" height="6" rx="3" class="meja"/><line x1="${cx}" y1="82" x2="${cx}" y2="86" stroke="currentColor" stroke-width="3"/>`;
    const tot = isi.reduce((j, b) => j + lebar(b) + 4, -4); let x = cx - tot / 2;
    isi.forEach(b => { const w = lebar(b), h = b.kotak ? 26 : 30;
      s += `<rect x="${x}" y="${76 - h}" width="${w}" height="${h}" rx="4" class="${b.kotak ? "isi" : "kosong"}"/>` + svgT(x + w / 2, 76 - h / 2 + 4, b.t, 'text-anchor="middle" class="mini"'); x += w + 4; });
  });
  return s + svgT(90, 112, "kiri", 'text-anchor="middle" class="kecil"') + svgT(270, 112, "kanan", 'text-anchor="middle" class="kecil"') + "</svg>";
}
daftarMisi("alj", "a3", "Mencari angka yang hilang", "❓", {
  1: [
    () => { const x = acak(2, 30), a = acak(2, 30); return isian(`${KOTAK} + ${a} = ${x + a}<br>Nilai □ adalah …`, x, { petunjuk: "Bilangan berapa yang ditambah ini hasilnya itu?", bahas: `□ = ${x + a} − ${a} = ${x}.` }); },
    () => { const x = acak(2, 30), a = acak(2, 30); return isian(`${a} + ${KOTAK} = ${x + a}<br>Nilai □ adalah …`, x, { bahas: `□ = ${x + a} − ${a} = ${x}.` }); },
    /* Aku memikirkan sebuah bilangan */
    () => { const x = acak(2, 30), a = acak(2, 20); return isian(`Aku memikirkan sebuah bilangan. Jika bilangan itu ditambah ${a}, hasilnya ${x + a}. Bilangan yang kupikirkan adalah …`, x, { petunjuk: "Kerjakan mundur: kurangi hasilnya.", bahas: `${x + a} − ${a} = ${x}.` }); },
    /* Timbangan */
    () => { const x = acak(2, 20), a = acak(1, 15);
      return isian(`Timbangan pada gambar seimbang. Piring kiri berisi sebuah kotak dan beban ${a} kg. Piring kanan berisi beban ${x + a} kg. Berat kotak adalah …`, x, { satuan: "kg", gambar: svgTimbang([{ t: "?", kotak: true }, { t: `${a} kg` }], [{ t: `${x + a} kg` }]),
        petunjuk: "Seimbang berarti berat kiri sama dengan berat kanan.", bahas: `□ + ${a} = ${x + a}, jadi □ = ${x + a} − ${a} = ${x} kg.` }); },
    /* Hasil penjumlahan yang hilang */
    () => { const a = acak(2, 30), b = acak(2, 30); return isian(`${a} + ${b} = ${KOTAK}<br>Nilai □ adalah …`, a + b, { bahas: `${a} + ${b} = ${a + b}.` }); },
    /* Cerita: diberi */
    () => { const x = nama(), a = acak(3, 20), t = acak(2, 15), b = pilih(["kelereng", "stiker", "permen", "kartu"]);
      return isian(`${x} punya ${a} ${b}. Setelah diberi kakaknya, ${b} ${x} menjadi ${a + t}. Banyak ${b} yang diberikan kakak adalah …`, t, { satuan: b, petunjuk: `${a} + □ = ${a + t}.`, bahas: `${a + t} − ${a} = ${t} ${b}.` }); },
  ],
  2: [
    () => { const a = acak(30, 99), x = acak(2, a - 5); return isian(`${a} − ${KOTAK} = ${a - x}<br>Nilai □ adalah …`, x, { bahas: `□ = ${a} − ${a - x} = ${x}.` }); },
    () => { const x = acak(20, 90), a = acak(2, x - 5); return isian(`${KOTAK} − ${a} = ${x - a}<br>Nilai □ adalah …`, x, { bahas: `□ = ${x - a} + ${a} = ${x}.` }); },
    /* Aku memikirkan sebuah bilangan */
    () => { const a = acak(5, 30), y = acak(5, 60); return isian(`Aku memikirkan sebuah bilangan. Jika bilangan itu dikurangi ${a}, hasilnya ${y}. Bilangan yang kupikirkan adalah …`, y + a, { petunjuk: "Kerjakan mundur: tambahkan.", bahas: `${y} + ${a} = ${y + a}.` }); },
    /* Ruas kiri dan kanan ditukar */
    () => { const x = acak(10, 60), a = acak(5, 40); return ya()
      ? isian(`${x + a} = ${KOTAK} + ${a}<br>Nilai □ adalah …`, x, { petunjuk: "Tanda = berarti kedua ruas sama nilainya.", bahas: `□ = ${x + a} − ${a} = ${x}.` })
      : isian(`${x} = ${KOTAK} − ${a}<br>Nilai □ adalah …`, x + a, { petunjuk: "Tanda = berarti kedua ruas sama nilainya.", bahas: `□ = ${x} + ${a} = ${x + a}.` }); },
    /* Cerita: memberi, sisa */
    () => { const x = nama(), a = acak(20, 60), s = acak(5, a - 5), b = pilih(["kelereng", "stiker", "permen", "jeruk"]);
      return isian(`${x} punya ${a} ${b}. Sebagian diberikan kepada adiknya sehingga tinggal ${s} ${b}. Banyak ${b} yang diberikan adalah …`, a - s, { satuan: b, petunjuk: `${a} − □ = ${s}.`, bahas: `${a} − ${s} = ${a - s} ${b}.` }); },
    /* Timbangan, dua beban di kanan */
    () => { const b = acak(2, 15), c = acak(2, 15), a = acak(1, b + c - 1), x = b + c - a;
      return isian(`Timbangan pada gambar seimbang. Piring kiri berisi sebuah kotak dan beban ${a} kg. Piring kanan berisi beban ${b} kg dan ${c} kg. Berat kotak adalah …`, x, { satuan: "kg", gambar: svgTimbang([{ t: "?", kotak: true }, { t: `${a} kg` }], [{ t: `${b} kg` }, { t: `${c} kg` }]),
        petunjuk: "Hitung dulu berat piring kanan.", bahas: `Kanan = ${b} + ${c} = ${b + c} kg. □ = ${b + c} − ${a} = ${x} kg.` }); },
  ],
  3: [
    () => { const a = acak(2, 12), x = acak(2, 12); return isian(`${a} × ${KOTAK} = ${a * x}<br>Nilai □ adalah …`, x, { petunjuk: "Gunakan pembagian.", bahas: `□ = ${a * x} : ${a} = ${x}.` }); },
    () => { const a = acak(2, 9), q = acak(2, 12); return isian(`${KOTAK} : ${a} = ${q}<br>Nilai □ adalah …`, a * q, { petunjuk: "Gunakan perkalian.", bahas: `□ = ${q} × ${a} = ${a * q}.` }); },
    /* □ di posisi lain */
    () => { const a = acak(2, 9), x = acak(2, 12); return ya()
      ? isian(`${KOTAK} × ${a} = ${a * x}<br>Nilai □ adalah …`, x, { petunjuk: "Gunakan pembagian.", bahas: `□ = ${a * x} : ${a} = ${x}.` })
      : isian(`${a * x} : ${KOTAK} = ${a}<br>Nilai □ adalah …`, x, { petunjuk: `${a * x} dibagi bilangan berapa hasilnya ${a}?`, bahas: `□ = ${a * x} : ${a} = ${x}.` }); },
    /* Aku memikirkan sebuah bilangan */
    () => { const a = acak(2, 9), x = acak(2, 12); return ya()
      ? isian(`Aku memikirkan sebuah bilangan. Jika bilangan itu dikali ${a}, hasilnya ${a * x}. Bilangan yang kupikirkan adalah …`, x, { petunjuk: "Kerjakan mundur: bagi.", bahas: `${a * x} : ${a} = ${x}.` })
      : isian(`Aku memikirkan sebuah bilangan. Jika bilangan itu dibagi ${a}, hasilnya ${x}. Bilangan yang kupikirkan adalah …`, a * x, { petunjuk: "Kerjakan mundur: kalikan.", bahas: `${x} × ${a} = ${a * x}.` }); },
    /* Cerita: wadah berisi sama banyak */
    () => { const b = pilih([["kotak", "pensil"], ["keranjang", "jeruk"], ["plastik", "kue"], ["rak", "buku"]]), a = acak(3, 10), n = acak(2, 9);
      return isian(`Setiap ${b[0]} berisi ${a} ${b[1]}. Seluruhnya ada ${a * n} ${b[1]}. Banyak ${b[0]} adalah …`, n, { satuan: b[0], petunjuk: `□ × ${a} = ${a * n}.`, bahas: `${a * n} : ${a} = ${n} ${b[0]}.` }); },
    /* Mesin ajaib (tabel masuk–keluar) */
    () => { const k = acak(2, 9), [m1, m2, x] = ambil([2, 3, 4, 5, 6, 7, 8, 9, 10], 3);
      return isian(`Mesin ajaib mengubah setiap bilangan dengan aturan yang sama.<br>Masuk ${m1} → keluar ${k * m1}<br>Masuk ${m2} → keluar ${k * m2}<br>Masuk ${KOTAK} → keluar ${k * x}<br>Nilai □ adalah …`, x, { petunjuk: "Cari aturannya: bilangan masuk dikali berapa?", bahas: `Aturannya dikali ${k}. □ × ${k} = ${k * x}, jadi □ = ${x}.` }); },
  ],
  4: [
    () => { const a = acak(2, 9), x = acak(2, 15), b = acak(1, 30); return isian(`${a} × ${KOTAK} + ${b} = ${a * x + b}<br>Nilai □ adalah …`, x, { petunjuk: "Kurangi dulu, lalu bagi.", bahas: `${a * x + b} − ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
    () => { const a = acak(2, 9), x = acak(3, 15), b = acak(1, a * x - 1); return isian(`${a} × ${KOTAK} − ${b} = ${a * x - b}<br>Nilai □ adalah …`, x, { bahas: `${a * x - b} + ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
    /* Aku memikirkan sebuah bilangan (dua langkah) */
    () => { const a = acak(2, 9), x = acak(2, 15), b = acak(1, 30);
      return isian(`Aku memikirkan sebuah bilangan. Bilangan itu kukali ${a}, lalu kutambah ${b}. Hasilnya ${a * x + b}. Bilangan yang kupikirkan adalah …`, x, { petunjuk: "Kerjakan mundur: kurangi dulu, lalu bagi.", bahas: `${a * x + b} − ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
    /* Dibagi lalu ditambah */
    () => { const a = acak(2, 9), q = acak(2, 12), b = acak(1, 30);
      return isian(`${KOTAK} : ${a} + ${b} = ${q + b}<br>Nilai □ adalah …`, a * q, { petunjuk: "Kurangi dulu, lalu kalikan.", bahas: `${q + b} − ${b} = ${q}. □ = ${q} × ${a} = ${a * q}.` }); },
    /* Penjumlahan di depan */
    () => { const a = acak(2, 9), x = acak(2, 12), b = acak(5, 40);
      return isian(`${b} + ${a} × ${KOTAK} = ${b + a * x}<br>Nilai □ adalah …`, x, { petunjuk: "Perkalian dikerjakan lebih dulu. Jadi kurangi dulu, lalu bagi.", bahas: `${b + a * x} − ${b} = ${a * x}. ${a * x} : ${a} = ${x}.` }); },
    /* Timbangan, beberapa kotak sama berat */
    () => { const n = acak(2, 4), x = acak(2, 9), a = acak(1, 10);
      return isian(`Timbangan pada gambar seimbang. Piring kiri berisi ${n} kotak yang sama berat dan beban ${a} kg. Piring kanan berisi beban ${n * x + a} kg. Berat 1 kotak adalah …`, x, { satuan: "kg",
        gambar: svgTimbang([...Array.from({ length: n }, () => ({ t: "?", kotak: true })), { t: `${a} kg` }], [{ t: `${n * x + a} kg` }]),
        petunjuk: `Ambil beban ${a} kg dari kedua piring. Sisanya ${n} kotak.`, bahas: `${n} × □ + ${a} = ${n * x + a}. ${n * x + a} − ${a} = ${n * x}. ${n * x} : ${n} = ${x} kg.` }); },
    /* Cerita: beberapa wadah, lalu sebagian diberikan */
    () => { const y = nama(), b = pilih([["kantong", "kelereng"], ["bungkus", "permen"], ["pak", "stiker"]]), a = acak(4, 10), n = acak(2, 8), t = acak(1, a * n - 1);
      return isian(`${y} punya beberapa ${b[0]} ${b[1]}. Setiap ${b[0]} berisi ${a} ${b[1]}. Setelah memberikan ${t} ${b[1]} kepada temannya, ${b[1]} ${y} tinggal ${a * n - t}. Banyak ${b[0]} ${b[1]} ${y} mula-mula adalah …`, n,
        { satuan: b[0], petunjuk: `□ × ${a} − ${t} = ${a * n - t}. Tambah dulu, lalu bagi.`, bahas: `${a * n - t} + ${t} = ${a * n}. ${a * n} : ${a} = ${n} ${b[0]}.` }); },
  ],
  5: [
    () => { const x = acak(2, 20), a = acak(2, 20), b = acak(2, 8); return isian(`(${KOTAK} + ${a}) × ${b} = ${(x + a) * b}<br>Nilai □ adalah …`, x, { bahas: `${(x + a) * b} : ${b} = ${x + a}. ${x + a} − ${a} = ${x}.` }); },
    () => { const b = acak(2, 8), q = acak(3, 12), a = acak(2, 20), x = b * q + a; return isian(`(${KOTAK} − ${a}) : ${b} = ${q}<br>Nilai □ adalah …`, x, { bahas: `${q} × ${b} = ${b * q}. ${b * q} + ${a} = ${x}.` }); },
    /* Mesin ajaib dua langkah */
    () => { const k = acak(2, 6), c = acak(1, 9), x = acak(5, 12), f = v => k * v + c;
      return isian(`Mesin ajaib mengubah setiap bilangan dengan aturan yang sama.<br>Masuk 1 → keluar ${f(1)}<br>Masuk 2 → keluar ${f(2)}<br>Masuk 3 → keluar ${f(3)}<br>Masuk ${KOTAK} → keluar ${f(x)}<br>Nilai □ adalah …`, x,
        { petunjuk: `Bilangan keluar bertambah ${k} setiap bilangan masuk bertambah 1. Coba aturan "dikali ${k}, lalu ditambah …".`, bahas: `Aturannya dikali ${k} lalu ditambah ${c}. ${f(x)} − ${c} = ${k * x}. ${k * x} : ${k} = ${x}.` }); },
    /* Aku memikirkan sebuah bilangan: kurangi lalu kali */
    () => { const a = acak(2, 15), x = a + acak(2, 15), b = acak(2, 6);
      return isian(`Aku memikirkan sebuah bilangan. Bilangan itu kukurangi ${a}, lalu hasilnya kukali ${b}. Hasil akhirnya ${(x - a) * b}. Bilangan yang kupikirkan adalah …`, x, { petunjuk: "Kerjakan mundur: bagi dulu, lalu tambah.", bahas: `${(x - a) * b} : ${b} = ${x - a}. ${x - a} + ${a} = ${x}.` }); },
    /* Dua kotak sama */
    () => { const x = acak(3, 30), a = acak(2, 20);
      return isian(`${KOTAK} + ${KOTAK} + ${a} = ${2 * x + a}<br>Kedua □ bernilai sama. Nilai □ adalah …`, x, { petunjuk: "Kurangi dulu, lalu bagi 2.", bahas: `${2 * x + a} − ${a} = ${2 * x}. ${2 * x} : 2 = ${x}.` }); },
    /* □ di belakang tanda kurang dalam kurung */
    () => { const x = acak(2, 15), a = x + acak(2, 15), b = acak(2, 6);
      return isian(`(${a} − ${KOTAK}) × ${b} = ${(a - x) * b}<br>Nilai □ adalah …`, x, { petunjuk: "Bagi dulu untuk mendapat isi kurung.", bahas: `${(a - x) * b} : ${b} = ${a - x}. ${a} − □ = ${a - x}, jadi □ = ${x}.` }); },
    /* Belanja */
    () => { const y = nama(), n = acak(2, 6), h = acak(2, 10) * 500, b = acak(3, 15) * 1000;
      return isian(`${y} membeli ${n} pensil yang harganya sama dan sebuah buku seharga ${rp(b)}. Seluruhnya ${y} membayar ${rp(n * h + b)}. Harga 1 pensil adalah Rp …`, h, { petunjuk: `${n} × □ + ${fmt(b)} = ${fmt(n * h + b)}.`, bahas: `${rp(n * h + b)} − ${rp(b)} = ${rp(n * h)}. ${rp(n * h)} : ${n} = ${rp(h)}.` }); },
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
