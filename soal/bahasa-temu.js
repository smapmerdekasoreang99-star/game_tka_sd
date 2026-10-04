/* Pulau Bahasa Indonesia · Pos 1 — Jurus Menemukan (informasi tersurat) */
"use strict";

/* ---------- Teks fungsional berpola: pengumuman, jadwal, undangan, daftar harga ---------- */
const PERINGATAN = [
  { n: "Hari Kartini", b: 3, t: 21 }, { n: "Hari Pendidikan Nasional", b: 4, t: 2 }, { n: "Hari Anak Nasional", b: 6, t: 23 },
  { n: "Hari Kemerdekaan Republik Indonesia", b: 7, t: 17 }, { n: "Hari Sumpah Pemuda", b: 9, t: 28 },
  { n: "Hari Pahlawan", b: 10, t: 10 }, { n: "Hari Guru Nasional", b: 10, t: 25 },
];
const LOMBA_S = ["balap karung", "makan kerupuk", "tarik tambang", "membaca puisi", "menggambar", "estafet kelereng", "cerdas cermat", "bakiak beregu"];
const tabelInfo = baris => `<table class="tabel-info">${baris.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join("")}</table>`;
const geserTgl = (d, ns) => ns.map(n => geserHari(d, n));

function bahanPengumuman() {
  const pr = pilih(PERINGATAN), th = new Date().getFullYear();
  let d = new Date(th, pr.b, pr.t); if (d.getDay() === 0) d = geserHari(d, -1);
  const batas = geserHari(d, -acak(3, 6)), lomba = ambil(LOMBA_S, 3), bukan = LOMBA_S.filter(x => !lomba.includes(x));
  const KLS = ["kelas 4 sampai 6", "kelas 3 sampai 6", "kelas 5 dan 6", "kelas 1 sampai 6"], ki = acak(0, 3), kelasT = KLS[ki], rentang = [[4, 6], [3, 6], [5, 6], [1, 6]][ki];
  const tempat = pilih(["halaman sekolah", "aula sekolah", "lapangan upacara"]), jam = pilih(["07.30", "08.00"]), guru = "Bu " + pilih(DEWASA_BU);
  const sek = pilih(SEKOLAH_LAIN), pakai = pilih(["seragam olahraga", "pakaian adat", "seragam pramuka", "kaus merah putih"]), X = nama();
  const kX = acak(1, 6), boleh = kX >= rentang[0] && kX <= rentang[1];
  const html = `<div class="kertas pengumuman"><h4>PENGUMUMAN</h4><p>Dalam rangka memperingati ${pr.n}, ${sek} akan mengadakan lomba ${daftarKoma(lomba)} untuk siswa ${kelasT}. Lomba akan dilaksanakan pada:</p>
    ${tabelInfo([["Hari, tanggal", tglPanjang(d)], ["Pukul", `${jam} – selesai`], ["Tempat", besarAwal(tempat)]])}
    <p>Pendaftaran dilakukan kepada ${guru} paling lambat tanggal ${tglPendek(batas)}. Peserta wajib memakai ${pakai}.</p><p class="ttd">Kepala ${sek}</p></div>`;
  return { judul: "", utuh: true, para: [html], fakta: [
    { q: "Lomba itu diadakan dalam rangka memperingati …", b: pr.n, s: PERINGATAN.filter(x => x !== pr).map(x => x.n), pr: v => `Lomba diadakan dalam rangka memperingati ${v}.` },
    { q: "Kapan lomba dilaksanakan?", b: tglPanjang(d), s: geserTgl(d, [-7, -2, -1, 1, 2, 7]).map(tglPanjang), pr: v => `Lomba dilaksanakan pada ${v}.` },
    { q: "Di mana lomba dilaksanakan?", b: `di ${tempat}`, s: ["di halaman sekolah", "di aula sekolah", "di lapangan upacara", "di balai desa"].filter(x => x !== `di ${tempat}`), pr: v => `Lomba dilaksanakan ${v}.` },
    { q: "Siapa saja yang boleh mengikuti lomba?", b: `siswa ${kelasT}`, s: KLS.filter(x => x !== kelasT).map(x => `siswa ${x}`), pr: v => `Lomba diikuti oleh ${v}.` },
    { q: "Kepada siapa siswa mendaftar?", b: `kepada ${guru}`, s: DEWASA_BU.filter(x => "Bu " + x !== guru).map(x => `kepada Bu ${x}`), pr: v => `Pendaftaran dilakukan ${v}.` },
    { q: "Pendaftaran paling lambat tanggal …", b: tglPendek(batas), s: [...geserTgl(batas, [-2, 2, 4]).map(tglPendek), tglPendek(d)], pr: v => `Pendaftaran paling lambat tanggal ${v}.`, sulit: true },
    { q: "Peserta lomba wajib memakai …", b: pakai, s: ["seragam olahraga", "pakaian adat", "seragam pramuka", "kaus merah putih"].filter(x => x !== pakai), pr: v => `Peserta wajib memakai ${v}.`, sulit: true },
    { q: "Salah satu lomba yang diadakan adalah lomba …", b: pilih(lomba), s: bukan, pr: v => `Salah satu lomba yang diadakan adalah lomba ${v}.` },
    { q: `${X} adalah siswa kelas ${kX} ${sek}. Berdasarkan pengumuman tersebut, bolehkah ${X} ikut lomba?`, sulit: true,
      b: boleh ? `Boleh, karena lomba diadakan untuk siswa ${kelasT}.` : `Tidak boleh, karena lomba hanya untuk siswa ${kelasT}.`,
      s: [boleh ? `Tidak boleh, karena lomba hanya untuk siswa ${kelasT}.` : `Boleh, karena lomba diadakan untuk semua siswa.`, "Boleh, asalkan membayar biaya pendaftaran.", "Tidak boleh, karena pendaftaran sudah ditutup."] },
  ] };
}

const MAPEL = ["Matematika", "Bahasa Indonesia", "IPAS", "Pendidikan Pancasila", "PJOK", "Seni Musik", "Bahasa Inggris", "Pendidikan Agama"];
function bahanJadwal() {
  const hari = HARI.slice(0, 5); let tb, unik;
  const jml = m => tb.flat().filter(x => x === m).length;
  // 15 slot dari 8 mapel: batas 2 kali per mapel membuat "≥ 2 mapel tunggal" mustahil (perulangan tak berujung), jadi batasnya 3
  do { tb = hari.map(() => ambil(MAPEL, 3)); unik = MAPEL.filter(m => jml(m) === 1); } while (unik.length < 2 || MAPEL.some(m => jml(m) > 3));
  const JAM = ["07.00", "08.10", "09.40"], kls = acak(4, 6), X = nama();
  const html = `<h4>Jadwal Pelajaran Kelas ${kls}</h4><div class="gulir"><table class="tabel-data"><thead><tr><th>Hari</th><th>07.00–08.10</th><th>08.10–09.20</th><th>09.40–10.50</th></tr></thead><tbody>
    ${hari.map((h, i) => `<tr><td>${h}</td>${tb[i].map(m => `<td>${m}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="catatan-tabel">Istirahat pukul 09.20–09.40.</p>`;
  const [h1, h2] = ambil([0, 1, 2, 3, 4], 2), s1 = acak(0, 2), s2 = acak(0, 2), [u1, u2] = ambil(unik, 2), hariDari = m => hari[tb.findIndex(r => r.includes(m))];
  const ganda = MAPEL.filter(m => jml(m) === 2), mg = ganda.length ? pilih(ganda) : null;
  const F = [
    { q: `Pada hari ${hari[h1]}, pelajaran pukul ${JAM[s1]} adalah …`, b: tb[h1][s1], s: MAPEL.filter(m => m !== tb[h1][s1]), pr: v => `Pada hari ${hari[h1]} pukul ${JAM[s1]}, pelajarannya ${v}.` },
    { q: `Pada hari ${hari[h2]}, pelajaran pukul ${JAM[s2]} adalah …`, b: tb[h2][s2], s: MAPEL.filter(m => m !== tb[h2][s2]), pr: v => `Pada hari ${hari[h2]} pukul ${JAM[s2]}, pelajarannya ${v}.` },
    { q: `Pelajaran ${u1} ada pada hari …`, b: hariDari(u1), s: hari.filter(h => h !== hariDari(u1)), pr: v => `Pelajaran ${u1} ada pada hari ${v}.` },
    { q: `Pelajaran ${u2} ada pada hari …`, b: hariDari(u2), s: hari.filter(h => h !== hariDari(u2)), pr: v => `Pelajaran ${u2} ada pada hari ${v}.` },
    { q: "Pukul berapa siswa beristirahat?", b: "09.20–09.40", s: ["07.00–08.10", "08.10–09.20", "10.50–11.10"], pr: v => `Siswa beristirahat pukul ${v}.` },
    { q: `${X} lupa membawa buku ${u1}. Pada hari apa ${X} harus membawa buku itu?`, b: `hari ${hariDari(u1)}`, s: hari.filter(h => h !== hariDari(u1)).map(h => `hari ${h}`), sulit: true },
  ];
  if (mg) F.push({ q: `Berapa kali pelajaran ${mg} dalam seminggu?`, b: "dua kali", s: ["satu kali", "tiga kali", "empat kali"], pr: v => `Pelajaran ${mg} ada ${v} dalam seminggu.`, sulit: true });
  return { judul: "", utuh: true, para: [html], fakta: F };
}

const KERETA = ["Cempaka", "Kenari", "Rajawali", "Merpati", "Kutilang", "Nuri"];
function bahanKereta() {
  const nm = ambil(KERETA, 4), tuj = ambil(KOTA, 4), dur = nm.map(() => acak(2, 7));
  let t = acak(5, 7) * 60; const br = nm.map(() => (t += pilih([45, 60, 75, 90, 120])));
  const tb = br.map((b, i) => b + dur[i] * 60), i = acak(0, 3), j = (i + acak(1, 3)) % 4;
  const html = `<h4>Jadwal Keberangkatan Kereta Api</h4><div class="gulir"><table class="tabel-data"><thead><tr><th>Kereta</th><th>Tujuan</th><th>Berangkat</th><th>Tiba</th></tr></thead><tbody>
    ${nm.map((n, k) => `<tr><td>${n}</td><td>${tuj[k]}</td><td>${pkl(br[k])}</td><td>${pkl(tb[k])}</td></tr>`).join("")}</tbody></table></div>`;
  const awal = br.indexOf(Math.min(...br)), akhir = tb.indexOf(Math.max(...tb)), lama = dur.indexOf(Math.max(...dur));
  const unikLama = dur.filter(x => x === dur[lama]).length === 1;
  const F = [
    { q: `Kereta ${nm[i]} berangkat pukul …`, b: pkl(br[i]), s: [...br.filter((_, k) => k !== i).map(pkl), pkl(tb[i]), pkl(br[i] + 30), pkl(br[i] - 30)], pr: v => `Kereta ${nm[i]} berangkat pukul ${v}.` },
    { q: `Kereta yang menuju ${tuj[j]} adalah Kereta …`, b: nm[j], s: KERETA.filter(x => x !== nm[j]), pr: v => `Kereta yang menuju ${tuj[j]} adalah Kereta ${v}.` },
    { q: `Kereta ${nm[i]} tiba di ${tuj[i]} pukul …`, b: pkl(tb[i]), s: [pkl(br[i]), ...tb.filter((_, k) => k !== i).map(pkl), pkl(tb[i] + 60), pkl(tb[i] - 30)], pr: v => `Kereta ${nm[i]} tiba di ${tuj[i]} pukul ${v}.` },
    { q: `Ke kota manakah Kereta ${nm[j]} menuju?`, b: tuj[j], s: KOTA.filter(x => x !== tuj[j]), pr: v => `Kereta ${nm[j]} menuju ${v}.` },
    { q: "Kereta yang berangkat paling pagi adalah Kereta …", b: nm[awal], s: nm.filter(x => x !== nm[awal]), pr: v => `Kereta yang berangkat paling pagi adalah Kereta ${v}.`, sulit: true },
    { q: `Berapa lama perjalanan Kereta ${nm[i]}?`, b: `${terbilang(dur[i])} jam`, s: [2, 3, 4, 5, 6, 7, 8].filter(x => x !== dur[i]).map(x => `${terbilang(x)} jam`), pr: v => `Perjalanan Kereta ${nm[i]} berlangsung ${v}.`, sulit: true },
    { q: "Kereta yang tiba paling akhir adalah Kereta …", b: nm[akhir], s: nm.filter(x => x !== nm[akhir]), sulit: true },
  ];
  if (unikLama) F.push({ q: "Kereta dengan perjalanan paling lama adalah Kereta …", b: nm[lama], s: nm.filter(x => x !== nm[lama]), sulit: true });
  return { judul: "", utuh: true, para: [html], fakta: F };
}

function bahanUndangan() {
  const A = nama(), umur = acak(8, 12), th = new Date().getFullYear();
  let d = new Date(th, acak(0, 11), acak(1, 26)); while (d.getDay() !== 6 && d.getDay() !== 0) d = geserHari(d, 1);
  const jl = pilih(["Melati", "Kenanga", "Cempaka", "Flamboyan", "Anggrek", "Dahlia"]), no = acak(2, 45), jam = pilih(["10.00", "13.00", "15.00", "16.00"]);
  const w = pilih(WARNA_B), acara = pilih(["makan bersama dan lomba mewarnai", "makan bersama dan menonton sulap", "makan bersama dan bermain tebak-tebakan"]);
  const html = `<div class="kertas undangan"><h4>🎈 Undangan Ulang Tahun 🎈</h4><p>Hai, teman-teman!<br>Datang, yuk, ke pesta ulang tahunku yang ke-${umur}.</p>
    ${tabelInfo([["Hari, tanggal", tglPanjang(d)], ["Pukul", jam], ["Tempat", `Jalan ${jl} No. ${no}`], ["Acara", besarAwal(acara)]])}
    <p>Jangan lupa memakai baju berwarna ${w}, ya!</p><p class="ttd">Salam sayang,<br>${A}</p></div>`;
  return { judul: "", utuh: true, para: [html], fakta: [
    { q: "Siapa yang berulang tahun?", b: A, s: namaLain([A], 4), pr: v => `${v} berulang tahun.` },
    { q: `Ulang tahun ${A} yang ke berapa?`, b: `ke-${umur}`, s: [8, 9, 10, 11, 12, 13].filter(x => x !== umur).map(x => `ke-${x}`), pr: v => `${A} berulang tahun yang ${v}.` },
    { q: "Pukul berapa pesta dimulai?", b: `pukul ${jam}`, s: ["10.00", "13.00", "15.00", "16.00", "19.00"].filter(x => x !== jam).map(x => `pukul ${x}`), pr: v => `Pesta dimulai ${v}.` },
    { q: "Di mana pesta ulang tahun diadakan?", b: `Jalan ${jl} No. ${no}`, s: [`Jalan ${jl} No. ${no + 10}`, `Jalan ${pilih(["Mawar", "Teratai", "Kamboja"])} No. ${no}`, `Jalan ${pilih(["Mawar", "Teratai", "Kamboja"])} No. ${no + 3}`], pr: v => `Pesta diadakan di ${v}.` },
    { q: "Tamu diminta memakai baju berwarna …", b: w, s: WARNA_B.filter(x => x !== w), pr: v => `Tamu diminta memakai baju berwarna ${v}.`, sulit: true },
    { q: "Acara apa yang ada di pesta itu?", b: acara, s: ["makan bersama dan lomba mewarnai", "makan bersama dan menonton sulap", "makan bersama dan bermain tebak-tebakan", "berenang dan bersepeda"].filter(x => x !== acara), pr: v => `Acara di pesta itu adalah ${v}.`, sulit: true },
    { q: "Kapan pesta ulang tahun diadakan?", b: tglPanjang(d), s: geserTgl(d, [-7, -1, 1, 7]).map(tglPanjang), pr: v => `Pesta diadakan pada ${v}.` },
  ] };
}

const MENU = [["Nasi goreng", 8000, 12000], ["Mi ayam", 7000, 10000], ["Soto ayam", 8000, 11000], ["Bakso", 7000, 10000], ["Es teh", 2000, 4000], ["Jus jeruk", 4000, 6000], ["Pisang goreng", 1000, 2500], ["Roti bakar", 5000, 8000]];
function bahanHarga() {
  const pk = ambil(MENU, 5).map(([n, a, b]) => ({ n, h: Math.round(acak(a, b) / 500) * 500 })), A = nama();
  while (new Set(pk.map(x => x.h)).size < pk.length) pk.forEach(x => (x.h += 500 * acak(0, 1)));
  const html = `<h4>Daftar Harga Kantin Sehat</h4><table class="tabel-data"><thead><tr><th>Menu</th><th>Harga</th></tr></thead><tbody>${pk.map(x => `<tr><td>${x.n}</td><td>${rp(x.h)}</td></tr>`).join("")}</tbody></table>`;
  const [a, b] = ambil(pk, 2), mahal = pk.reduce((p, x) => (x.h > p.h ? x : p)), murah = pk.reduce((p, x) => (x.h < p.h ? x : p));
  const lain = h => pk.filter(x => x.h !== h).map(x => rp(x.h));
  return { judul: "", utuh: true, para: [html], fakta: [
    { q: `Berapa harga ${a.n.toLowerCase()}?`, b: rp(a.h), s: lain(a.h), pr: v => `Harga ${a.n.toLowerCase()} adalah ${v}.` },
    { q: `Berapa harga ${b.n.toLowerCase()}?`, b: rp(b.h), s: lain(b.h), pr: v => `Harga ${b.n.toLowerCase()} adalah ${v}.` },
    { q: "Menu yang paling mahal adalah …", b: mahal.n.toLowerCase(), s: pk.filter(x => x !== mahal).map(x => x.n.toLowerCase()), pr: v => `Menu yang paling mahal adalah ${v}.` },
    { q: "Menu yang paling murah adalah …", b: murah.n.toLowerCase(), s: pk.filter(x => x !== murah).map(x => x.n.toLowerCase()), pr: v => `Menu yang paling murah adalah ${v}.` },
    { q: `${A} membeli ${a.n.toLowerCase()} dan ${b.n.toLowerCase()}. Berapa uang yang harus dibayar ${A}?`, b: rp(a.h + b.h), s: [a.h + b.h + 500, a.h + b.h - 500, a.h + b.h + 1000, a.h + b.h + 2000].map(rp), pr: v => `Harga ${a.n.toLowerCase()} dan ${b.n.toLowerCase()} seluruhnya ${v}.`, sulit: true },
  ] };
}

/* ---------- Misi ---------- */
const soalCerita = L => soalFakta(ceritaAcak(), L);
const soalInfo = L => soalFakta(pilih(INFO), L);
const soalTeksFungsi = (L, daftar) => soalFakta(pilih(daftar)(), L, { petunjuk: "Baca bagian yang ditanyakan: tanggal, pukul, tempat, atau nama. Cocokkan dengan pilihan jawaban." });
const perLevel = f => Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i + 1, [() => f(i + 1)]]));

daftarMisi("tem", "bi1", "Informasi dalam cerita", "📚", perLevel(soalCerita));
daftarMisi("tem", "bi2", "Informasi dalam teks bacaan", "📰", perLevel(soalInfo));
daftarMisi("tem", "bi3", "Pengumuman, jadwal & undangan", "🗓️", perLevel(L =>
  soalTeksFungsi(L, L <= 2 ? [bahanUndangan, bahanHarga] : L <= 4 ? [bahanUndangan, bahanHarga, bahanJadwal, bahanPengumuman] : [bahanUndangan, bahanHarga, bahanJadwal, bahanPengumuman, bahanKereta])));
