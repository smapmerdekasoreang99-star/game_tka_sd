/* Inti soal Bahasa Indonesia — Petualangan TKA SD
   ---------------------------------------------------------------
   Soal Bahasa Indonesia selalu membawa bacaan (s.bacaan, HTML) yang
   tampil di atas pertanyaan. Semua berbentuk pilihan:
     level 1–2   pilihan ganda 3 opsi, bacaan pendek
     level 3–5   pilihan ganda 4 opsi
     level 6–10  bentuk TKA: pilihan ganda, benar–salah, pilihan ganda
                 kompleks, dan "kecuali"

   "Bahan" bacaan dipakai bersama oleh beberapa misi:
     { judul, para: [[kalimat, …] atau "<html>"], utuh?,
       fakta: [{ p, q, b, s: [pengecoh], pr: v => pernyataan, k?, sulit? }] }
   p = nomor paragraf tempat fakta itu ada, k = kalimat sumber (untuk pembahasan). */
"use strict";

const nOpsi = L => (L <= 2 ? 3 : 4);
const besarAwal = s => s.charAt(0).toUpperCase() + s.slice(1);
const kecilAwal = s => s.charAt(0).toLowerCase() + s.slice(1);
const tanpaTag = s => String(s).replace(/<[^>]+>/g, "");
function bacaanHtml(judul, para) {
  return (judul ? `<h4>${judul}</h4>` : "") + para.map(p => (Array.isArray(p) ? `<p>${p.join(" ")}</p>` : p)).join("");
}
/* Satu paragraf dengan kalimat bernomor (1), (2), … */
const bernomor = kal => `<p>${kal.map((k, i) => `<b class="no">(${i + 1})</b> ${k}`).join(" ")}</p>`;
const daftarBernomor = arr => `<ol class="daftar-bacaan">${arr.map(x => `<li>${x}</li>`).join("")}</ol>`;
const kutip = s => `“${tanpaTag(s)}”`;

/* Pilihan ganda dengan banyak opsi sesuai level */
const pgL = (teks, benar, salah, L, o = {}) => pg(teks, benar, kocok(salah), { banyak: nOpsi(L), ...o });
/* Seperti pgL, tetapi pengecoh `wajib` selalu ikut tampil */
const pgWajib = (teks, benar, wajib, lain, L, o = {}) => pg(teks, benar, [...wajib, ...kocok(lain)], { banyak: nOpsi(L), ...o });

/* Bentuk soal untuk level tertentu */
function bentukSoalL(L) {
  const r = Math.random();
  if (L <= 5) return "pg";
  if (L === 6) return r < 0.6 ? "pg" : "bs";
  if (L === 7) return r < 0.4 ? "pg" : r < 0.75 ? "bs" : "pgk";
  if (L === 8) return r < 0.35 ? "pg" : r < 0.65 ? "bs" : "pgk";
  return r < 0.3 ? "kecuali" : r < 0.5 ? "pg" : r < 0.75 ? "bs" : "pgk";
}
/* n nilai benar/salah, paling sedikit satu benar dan satu salah */
function campurBS(n) { let a; do a = Array.from({ length: n }, () => ya()); while (a.every(Boolean) || !a.some(Boolean)); return a; }

/* ---------- Soal dari fakta bacaan ---------- */
const kalimatSumber = (bahan, f) => (Array.isArray(f.k) ? bahan.para[f.k[0]][f.k[1]] : f.k);
function soalFakta(bahan, L, o = {}) {
  const nPara = bahan.utuh ? bahan.para.length : L <= 2 ? 1 : L <= 5 ? Math.min(2, bahan.para.length) : bahan.para.length;
  const F = bahan.fakta.filter(f => (f.p || 0) < nPara), FP = F.filter(f => f.pr);
  const dasar = { bacaan: bacaanHtml(L >= 3 || bahan.utuh ? bahan.judul : "", bahan.para.slice(0, nPara)), petunjuk: o.petunjuk || "Cari kata kunci pertanyaan di dalam bacaan, lalu baca lagi kalimat di sekitarnya." };
  let b = bentukSoalL(L);
  if (b !== "pg" && FP.length < 4) b = "pg";
  if (b === "pg") {
    const utama = L >= 6 ? F.filter(f => f.sulit) : L <= 3 ? F.filter(f => !f.sulit) : F, f = pilih(utama.length ? utama : F);
    return pgL(f.q, f.b, f.s, L, { ...dasar, bahas: f.k ? `Bacaan menyebutkan: ${kutip(kalimatSumber(bahan, f))}` : `Jawabannya: <b>${f.b}</b>.` });
  }
  const n = b === "bs" ? (L <= 7 ? 3 : 4) : b === "pgk" ? (L >= 9 ? 5 : 4) : 4, pakai = ambil(FP, Math.min(n, FP.length));
  const bahasSalah = bt => bt.filter(x => !x.b).map(x => `“${tanpaTag(x.t)}” tidak sesuai. Yang benar: ${x.f.pr(x.f.b)}`).join("<br>");
  if (b === "kecuali") {
    const [salah, ...benar] = pakai, tSalah = salah.pr(pilih(salah.s));
    return pg("Pernyataan berikut sesuai dengan bacaan, <b>kecuali</b> …", tSalah, benar.map(f => f.pr(f.b)), { ...dasar, bahas: `${kutip(tSalah)} tidak sesuai. Yang benar: ${salah.pr(salah.b)}` });
  }
  const nilai = campurBS(pakai.length), butir = pakai.map((f, i) => ({ t: f.pr(nilai[i] ? f.b : pilih(f.s)), b: nilai[i], f }));
  const bh = bahasSalah(butir) || "Semua pernyataan sesuai dengan bacaan.";
  return b === "bs" ? bs("Tentukan <b>Benar</b> atau <b>Salah</b> setiap pernyataan berdasarkan bacaan.", butir, { ...dasar, bahas: bh })
    : pgk("Pilih <b>semua</b> pernyataan yang sesuai dengan bacaan.", butir, { ...dasar, bahas: bh });
}

/* ---------- Kumpulan umum ---------- */
const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const HARI_JS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const tglPanjang = d => `${HARI_JS[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
const tglPendek = d => `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
const geserHari = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const DEWASA = ["Harun", "Slamet", "Wayan", "Rahmat", "Darto", "Yohanes", "Hasan", "Ketut", "Sutrisno", "Ahmad"];
const DEWASA_BU = ["Ani", "Sri", "Ratna", "Kartika", "Lestari", "Maria", "Fatimah", "Endang", "Yanti", "Nurul"];
const KOTA = ["Bandung", "Yogyakarta", "Malang", "Bogor", "Solo", "Semarang", "Padang", "Makassar", "Medan", "Denpasar", "Palembang", "Pontianak"];
const JAM_PAGI = ["07.00", "07.30", "08.00", "08.30", "09.00"];
const daftarKoma = arr => arr.length <= 1 ? arr.join("") : arr.slice(0, -1).join(", ") + ", dan " + arr[arr.length - 1];
