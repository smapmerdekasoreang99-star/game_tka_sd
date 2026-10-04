/* Pulau Bahasa Indonesia · Pos 3 — Jurus Menalar */
"use strict";

/* ================= Misi: Sebab-akibat & simpulan ================= */
/* kS/kA = klausa sebab/akibat (huruf kecil di awal kecuali nama) untuk soal kata hubung */
const SEBAB = [
  { t: ["{A} lupa menyiram tanaman cabainya selama seminggu.", "Daun tanaman itu menjadi layu dan menguning."], kS: "{A} lupa menyiram tanaman cabainya", kA: "daun tanaman itu layu dan menguning",
    sq: "Mengapa daun tanaman cabai {A} layu?", sb: "karena tidak disiram selama seminggu", ss: ["karena terlalu banyak disiram", "karena dimakan ulat", "karena terkena hujan deras"],
    aq: "Apa akibat {A} lupa menyiram tanaman cabainya?", ab: "daun tanaman menjadi layu dan menguning", as: ["tanaman cepat berbuah", "tanaman tumbuh semakin tinggi", "daun tanaman menjadi hijau segar"] },
  { t: ["Hujan turun sangat deras sejak sore.", "Selokan di depan rumah meluap sehingga jalan tergenang air."], kS: "hujan turun sangat deras", kA: "jalan di depan rumah tergenang air",
    sq: "Mengapa jalan di depan rumah tergenang air?", sb: "karena hujan deras membuat selokan meluap", ss: ["karena ada pipa air yang bocor", "karena jalan itu sedang diperbaiki", "karena warga menyiram jalan"],
    aq: "Apa akibat hujan turun sangat deras?", ab: "selokan meluap dan jalan tergenang air", as: ["udara menjadi sangat panas", "tanaman menjadi layu", "jalan menjadi kering dan berdebu"] },
  { t: ["{A} bangun kesiangan.", "Ia terlambat tiba di sekolah dan tidak dapat mengikuti upacara."], kS: "{A} bangun kesiangan", kA: "{A} terlambat tiba di sekolah",
    sq: "Mengapa {A} tidak dapat mengikuti upacara?", sb: "karena bangun kesiangan sehingga terlambat", ss: ["karena sedang sakit", "karena upacara dibatalkan", "karena lupa memakai topi"],
    aq: "Apa akibat {A} bangun kesiangan?", ab: "terlambat tiba di sekolah", as: ["mendapat hadiah dari guru", "tiba paling awal di sekolah", "menjadi pemimpin upacara"] },
  { t: ["{A} rajin berlatih menulis halus setiap hari.", "Kini tulisannya rapi dan mudah dibaca."], kS: "{A} rajin berlatih menulis halus", kA: "tulisan {A} rapi dan mudah dibaca",
    sq: "Mengapa tulisan {A} kini rapi?", sb: "karena rajin berlatih menulis halus setiap hari", ss: ["karena memakai pensil baru", "karena dibantu kakaknya", "karena menulis dengan cepat"],
    aq: "Apa hasil latihan {A} setiap hari?", ab: "tulisannya rapi dan mudah dibaca", as: ["tangannya sering sakit", "bukunya cepat habis", "tulisannya makin sulit dibaca"] },
  { t: ["Warga desa sering membuang sampah ke sungai.", "Air sungai menjadi kotor dan berbau, bahkan banyak ikan yang mati."], kS: "warga sering membuang sampah ke sungai", kA: "air sungai menjadi kotor dan berbau",
    sq: "Mengapa air sungai menjadi kotor dan berbau?", sb: "karena warga sering membuang sampah ke sungai", ss: ["karena musim kemarau panjang", "karena banyak ikan di sungai", "karena hujan turun setiap hari"],
    aq: "Apa akibat membuang sampah ke sungai?", ab: "air sungai kotor dan banyak ikan mati", as: ["air sungai menjadi jernih", "jumlah ikan bertambah banyak", "sungai menjadi lebih dalam"] },
  { t: ["{A} bermain di bawah terik matahari tanpa topi dan jarang minum.", "Siang itu, ia merasa pusing dan lemas."], kS: "{A} bermain di bawah terik matahari tanpa topi", kA: "{A} merasa pusing dan lemas",
    sq: "Mengapa {A} merasa pusing dan lemas?", sb: "karena bermain di bawah terik matahari tanpa topi dan jarang minum", ss: ["karena terlalu banyak makan", "karena tidur terlalu lama", "karena bermain di dalam rumah"],
    aq: "Apa akibat {A} bermain di bawah terik matahari tanpa topi?", ab: "merasa pusing dan lemas", as: ["badannya menjadi segar", "menjadi juara bermain", "merasa kedinginan"] },
  { t: ["Jalan di desa itu rusak dan berlubang.", "Banyak pengendara sepeda motor yang terjatuh saat melewatinya."], kS: "jalan di desa itu rusak dan berlubang", kA: "banyak pengendara sepeda motor terjatuh",
    sq: "Mengapa banyak pengendara terjatuh?", sb: "karena jalan rusak dan berlubang", ss: ["karena jalan terlalu lebar", "karena lampu jalan terlalu terang", "karena jalan baru diaspal"],
    aq: "Apa akibat jalan desa yang rusak dan berlubang?", ab: "banyak pengendara terjatuh", as: ["jalan menjadi ramai pengunjung", "pengendara bisa melaju lebih cepat", "jalan menjadi lebih aman"] },
  { t: ["Pohon-pohon di lereng bukit itu ditebang habis.", "Ketika musim hujan tiba, terjadi tanah longsor."], kS: "pohon-pohon di lereng bukit ditebang habis", kA: "terjadi tanah longsor",
    sq: "Mengapa terjadi tanah longsor di lereng bukit?", sb: "karena pohon-pohon di lereng bukit ditebang habis", ss: ["karena terlalu banyak pohon", "karena musim kemarau", "karena banyak hewan di bukit"],
    aq: "Apa akibat pohon-pohon di lereng bukit ditebang habis?", ab: "terjadi tanah longsor saat musim hujan", as: ["udara menjadi lebih segar", "bukit menjadi lebih subur", "air sungai menjadi jernih"] },
  { t: ["{A} menabung sedikit demi sedikit setiap hari.", "Akhirnya, ia dapat membeli sepeda dengan uangnya sendiri."], kS: "{A} menabung sedikit demi sedikit setiap hari", kA: "{A} dapat membeli sepeda sendiri",
    sq: "Mengapa {A} dapat membeli sepeda sendiri?", sb: "karena menabung sedikit demi sedikit setiap hari", ss: ["karena mendapat hadiah lomba", "karena meminjam uang teman", "karena sepeda itu murah sekali"],
    aq: "Apa hasil kebiasaan {A} menabung?", ab: "dapat membeli sepeda dengan uangnya sendiri", as: ["uang sakunya habis", "ia tidak pernah jajan lagi", "celengannya rusak"] },
  { t: ["Listrik di rumah {A} padam semalaman.", "Keesokan paginya, makanan di dalam kulkas menjadi basi."], kS: "listrik di rumah {A} padam semalaman", kA: "makanan di dalam kulkas menjadi basi",
    sq: "Mengapa makanan di dalam kulkas menjadi basi?", sb: "karena listrik padam semalaman", ss: ["karena kulkas terlalu dingin", "karena makanan dimasak terlalu lama", "karena pintu kulkas dikunci"],
    aq: "Apa akibat listrik padam semalaman?", ab: "makanan di dalam kulkas menjadi basi", as: ["makanan menjadi lebih segar", "kulkas menjadi lebih dingin", "lampu menyala lebih terang"] },
  { t: ["{A} tidak memperhatikan penjelasan guru karena asyik mengobrol.", "Saat mengerjakan tugas, ia kebingungan."], kS: "{A} tidak memperhatikan penjelasan guru", kA: "{A} kebingungan saat mengerjakan tugas",
    sq: "Mengapa {A} kebingungan saat mengerjakan tugas?", sb: "karena tidak memperhatikan penjelasan guru", ss: ["karena tugasnya terlalu mudah", "karena bukunya tertinggal", "karena gurunya tidak masuk"],
    aq: "Apa akibat {A} asyik mengobrol saat guru menjelaskan?", ab: "kebingungan saat mengerjakan tugas", as: ["mendapat nilai paling tinggi", "selesai paling cepat", "dipuji oleh guru"] },
  { t: ["Musim kemarau tahun ini berlangsung sangat panjang.", "Sumur-sumur warga mengering dan sawah tidak dapat ditanami."], kS: "musim kemarau berlangsung sangat panjang", kA: "sumur-sumur warga mengering",
    sq: "Mengapa sumur-sumur warga mengering?", sb: "karena musim kemarau berlangsung sangat panjang", ss: ["karena warga jarang memakai air", "karena hujan turun setiap hari", "karena sumur terlalu dalam"],
    aq: "Apa akibat musim kemarau yang panjang?", ab: "sumur mengering dan sawah tidak dapat ditanami", as: ["sawah menjadi banjir", "panen padi melimpah", "air sumur bertambah banyak"] },
];
const isiNama = (s, A) => s.replace(/\{A\}/g, A);
/* Nama yang muncul dua kali dalam satu kalimat: yang kedua diganti "ia" */
const sekaliNama = (s, A) => { const i = s.indexOf(A), j = s.indexOf(A, i + A.length); return i < 0 || j < 0 ? s : s.slice(0, j) + "ia" + s.slice(j + A.length); };
function soalSebab(L) {
  const e = pilih(SEBAB), A = nama(), f = s => isiNama(s, A), tanyaSebab = ya();
  return pgL(f(tanyaSebab ? e.sq : e.aq), f(tanyaSebab ? e.sb : e.ab), (tanyaSebab ? e.ss : e.as).map(f), L,
    { bacaan: `<p>${e.t.map(f).join(" ")}</p>`, petunjuk: tanyaSebab ? "Sebab adalah hal yang membuat sesuatu terjadi." : "Akibat adalah hal yang terjadi karena suatu sebab.", bahas: `Sebab: ${f(e.kS)}. Akibat: ${f(e.kA)}.` });
}
function soalKataHubung(L) {
  const e = pilih(SEBAB), A = nama(), f = s => isiNama(s, A), urutSebab = ya();
  const kal = sekaliNama(urutSebab ? `${besarAwal(f(e.kS))}, … ${f(e.kA)}.` : `${besarAwal(f(e.kA))} … ${f(e.kS)}.`, A);
  return pg("Kata hubung yang tepat untuk melengkapi kalimat tersebut adalah …", urutSebab ? "sehingga" : "karena", ["sehingga", "karena", "tetapi", "meskipun"], {
    bacaan: `<p>${kal}</p>`, petunjuk: "Tentukan bagian mana yang sebab dan mana yang akibat. Sebab → sehingga → akibat. Akibat → karena → sebab.",
    bahas: urutSebab ? `Sebab disebut dulu, lalu akibat: pakai <b>sehingga</b>.` : `Akibat disebut dulu, lalu sebab: pakai <b>karena</b>.` });
}
function soalArahSebab(L) {
  const es = ambil(SEBAB, L >= 9 ? 4 : 3), A = nama(), f = s => isiNama(s, A), nilai = campurBS(es.length);
  const butir = es.map((e, i) => ({ t: sekaliNama(nilai[i] ? `${besarAwal(f(e.kA))} karena ${f(e.kS)}.` : `${besarAwal(f(e.kS))} karena ${f(e.kA)}.`, A), b: nilai[i] }));
  const o = { petunjuk: "Pastikan bagian sesudah kata <b>karena</b> benar-benar penyebabnya.", bahas: es.map(e => sekaliNama(`${besarAwal(f(e.kA))} karena ${f(e.kS)}.`, A)).join("<br>") };
  return L >= 8 && ya() ? pgk("Pilih <b>semua</b> kalimat yang hubungan sebab-akibatnya tepat.", butir, o) : bs("Tentukan <b>Benar</b> atau <b>Salah</b> hubungan sebab-akibat pada kalimat berikut.", butir, o);
}
function soalSimpulan(L) {
  const e = pilih(INFO), kecuali = L >= 9 && ya(0.4);
  if (kecuali) return pg("Pernyataan berikut sesuai dengan isi bacaan, <b>kecuali</b> …", pilih(e.simpul.s), [e.simpul.b, ...e.fakta.filter(f => f.pr).slice(0, 4).map(f => f.pr(f.b))],
    { bacaan: bacaanHtml(e.judul, e.para), bahas: `Simpulan yang benar: ${e.simpul.b}` });
  return pgL("Simpulan yang tepat dari bacaan tersebut adalah …", e.simpul.b, e.simpul.s, L,
    { bacaan: bacaanHtml(e.judul, e.para), petunjuk: "Simpulan merangkum isi seluruh bacaan, bukan hanya satu kalimat. Pilihan yang bertentangan dengan bacaan pasti salah.", bahas: e.simpul.b });
}
function soalLanjut(L) {
  const k = kisahAcak();
  return pgL("Peristiwa yang paling mungkin terjadi setelah cerita tersebut berakhir adalah …", k.lanjut.b, k.lanjut.s, L,
    { bacaan: bacaanHtml(k.judul, k.para), petunjuk: "Pikirkan akhir cerita dan watak tokohnya. Apa yang masuk akal terjadi berikutnya?", bahas: k.lanjut.b });
}
function soalMengapaInfo(L) {
  const mengapa = f => /^Mengapa/.test(f.q), e = pilih(INFO.filter(x => x.fakta.some(mengapa))), f = pilih(e.fakta.filter(mengapa));
  return pgL(f.q, f.b, f.s, L, { bacaan: bacaanHtml(e.judul, e.para), petunjuk: "Cari kata “karena”, “sehingga”, atau “oleh karena itu” di dalam bacaan.", bahas: `Bacaan menyebutkan: ${kutip(kalimatSumber(e, f))}` });
}
daftarMisi("nal", "bi7", "Sebab-akibat & simpulan", "🔗", {
  1: [() => soalSebab(1)], 2: [() => soalSebab(2)], 3: [() => soalSebab(3)], 4: [() => soalSebab(4), () => soalKataHubung(4)],
  5: [() => soalKataHubung(5), () => soalSebab(5), () => soalMengapaInfo(5)], 6: [() => soalSimpulan(6), () => soalKataHubung(6), () => soalArahSebab(6)],
  7: [() => soalSimpulan(7), () => soalLanjut(7), () => soalArahSebab(7), () => soalMengapaInfo(7)], 8: [() => soalSimpulan(8), () => soalLanjut(8), () => soalArahSebab(8), () => soalMengapaInfo(8)],
  9: [() => soalSimpulan(9), () => soalArahSebab(9), () => soalLanjut(9), () => soalMengapaInfo(9)], 10: [() => soalSimpulan(10), () => soalArahSebab(10), () => soalMengapaInfo(10)],
});

/* ================= Misi: Amanat, judul & puisi ================= */
function soalAmanat(L) {
  const k = kisahAcak(L <= 3 ? pilih(KISAH.filter(x => x.jenis === "fabel")) : null);
  return pgL("Amanat yang terkandung dalam cerita tersebut adalah …", k.amanat.b, k.amanat.s, L,
    { bacaan: bacaanHtml(k.judul, k.para), petunjuk: "Amanat adalah pesan baik yang ingin disampaikan pengarang. Lihat apa yang terjadi pada tokoh di akhir cerita.", bahas: `Amanatnya: ${k.amanat.b}` });
}
function soalJudul(L) {
  const e = pilih(INFO);
  return pgL("Judul yang paling tepat untuk bacaan tersebut adalah …", e.judul, e.jd, L,
    { bacaan: bacaanHtml("", e.para), petunjuk: "Judul yang tepat mewakili isi seluruh bacaan.", bahas: `Bacaan itu membahas ${e.ide.map(x => x.b).join("; ")}. Judul yang mewakili: <b>${e.judul}</b>.` });
}
const PTK_PUISI = "Baca puisi dua kali. Bayangkan apa yang dirasakan dan ingin disampaikan penyair.";
function soalPuisiTema(L) {
  const p = pilih(PUISI);
  return pgL("Tema puisi tersebut adalah …", p.tema.b, p.tema.s, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Puisi “${p.judul}” bertema ${p.tema.b}.` });
}
function soalPuisiRasa(L) {
  const p = pilih(PUISI);
  return pgL("Perasaan penyair dalam puisi tersebut adalah …", p.rasa.b, p.rasa.s, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Penyair merasa ${p.rasa.b}.` });
}
function soalPuisiMakna(L) {
  const p = pilih(PUISI), m = pilih(p.makna);
  return pgL(`Makna larik “<i>${m.l}</i>” adalah …`, m.b, m.s, L, { bacaan: puisiHtml(p), petunjuk: "Larik puisi sering memakai kiasan. Pikirkan maksudnya, bukan arti kata per kata.", bahas: `“${m.l}” bermakna ${m.b}.` });
}
function soalPuisiLarik(L) {
  const p = pilih(PUISI), x = pilih(p.larik), semua = p.bait.flat().filter(l => l !== x.b);
  return pgL(x.q, x.b, semua, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Larik yang tepat: “${x.b}”.` });
}
function soalPuisiBS(L) {
  const p = pilih(PUISI), m = pilih(p.makna), nilai = campurBS(L >= 9 ? 4 : 3), x = pilih(p.larik);
  const butir = [
    { t: `Puisi tersebut bertema ${nilai[0] ? p.tema.b : pilih(p.tema.s)}.`, b: nilai[0] },
    { t: `Larik “${m.l}” bermakna ${nilai[1] ? m.b : pilih(m.s)}.`, b: nilai[1] },
    { t: `Penyair merasa ${nilai[2] ? p.rasa.b : pilih(p.rasa.s)}.`, b: nilai[2] },
  ];
  if (nilai.length > 3) { const salah = pilih(p.bait.flat().filter(l => l !== x.b)); butir.push({ t: `${x.q.replace(" adalah …", "")} adalah “${nilai[3] ? x.b : salah}”.`, b: nilai[3] }); }
  const o = { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: [`Tema: ${p.tema.b}`, `“${m.l}”: ${m.b}`, `Perasaan penyair: ${p.rasa.b}`, ...(nilai.length > 3 ? [`${x.q.replace(" adalah …", "")}: “${x.b}”`] : [])].join("<br>") };
  return L >= 10 && ya() ? pgk("Pilih <b>semua</b> pernyataan yang sesuai dengan puisi tersebut.", butir, o) : bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan tentang puisi tersebut.", butir, o);
}
function soalAmanatBS(L) {
  const k = kisahAcak(), nilai = campurBS(3), t = pilih(k.tokoh);
  const butir = [
    { t: `Amanat cerita: ${kecilAwal(nilai[0] ? k.amanat.b : pilih(k.amanat.s))}`, b: nilai[0] },
    { t: `${besarAwal(t.n)} bersifat ${nilai[1] ? t.b : pilih(t.s)}.`, b: nilai[1] },
    { t: `Peristiwa yang mungkin terjadi sesudah cerita: ${nilai[2] ? k.lanjut.b : pilih(k.lanjut.s)}`, b: nilai[2] },
  ];
  return bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan tentang cerita tersebut.", butir,
    { bacaan: bacaanHtml(k.judul, k.para), bahas: [`Amanat: ${k.amanat.b}`, `${besarAwal(t.n)}: ${t.b}`, `Kelanjutan: ${k.lanjut.b}`].join("<br>") });
}
daftarMisi("nal", "bi8", "Amanat, judul & puisi", "🌈", {
  1: [() => soalAmanat(1)], 2: [() => soalAmanat(2)], 3: [() => soalAmanat(3), () => soalJudul(3)], 4: [() => soalAmanat(4), () => soalJudul(4), () => soalPuisiTema(4)],
  5: [() => soalJudul(5), () => soalPuisiTema(5), () => soalPuisiRasa(5)], 6: [() => soalPuisiMakna(6), () => soalPuisiTema(6), () => soalAmanat(6)],
  7: [() => soalPuisiMakna(7), () => soalPuisiLarik(7), () => soalJudul(7), () => soalPuisiRasa(7)], 8: [() => soalPuisiBS(8), () => soalPuisiMakna(8), () => soalAmanatBS(8)],
  9: [() => soalPuisiBS(9), () => soalPuisiLarik(9), () => soalAmanatBS(9)], 10: [() => soalPuisiBS(10), () => soalAmanatBS(10), () => soalPuisiMakna(10)],
});

/* ================= Misi: Fakta, opini & tujuan teks ================= */
const FAKTA_K = [
  "Indonesia memproklamasikan kemerdekaannya pada 17 Agustus 1945.", "Candi Borobudur terletak di Magelang, Jawa Tengah.", "Satu minggu terdiri atas tujuh hari.",
  "Bendera Indonesia berwarna merah dan putih.", "Komodo hidup di Nusa Tenggara Timur.", "Perpustakaan desa buka setiap hari Senin sampai Jumat.",
  () => `Sekolah kami memiliki ${acak(8, 24)} ruang kelas.`, () => `Harga tiket masuk taman itu ${rp(pilih([5000, 10000, 15000]))} per orang.`,
  () => `Pertandingan voli dimulai pukul ${pilih(JAM_PAGI)}.`, () => `Jarak rumah ${nama()} ke sekolah sekitar ${acak(2, 9)} kilometer.`, () => `Kelas 6 berjumlah ${acak(24, 34)} siswa.`,
];
const OPINI_K = [
  "Menurut saya, nasi goreng adalah makanan paling enak.", "Pemandangan di pantai itu sangat memesona.", "Sebaiknya kita berangkat lebih pagi agar tidak terlambat.",
  "Matematika adalah pelajaran yang paling menyenangkan.", "Film kartun itu pasti disukai semua anak.", "Saya rasa besok akan menjadi hari yang menyenangkan.",
  "Taman kota sebaiknya ditanami lebih banyak bunga.", "Lagu daerah itu terdengar sangat merdu.", "Sepertinya, kucing lebih lucu daripada kelinci.",
  "Bulu tangkis adalah olahraga yang paling seru.", "Kue buatan nenek pasti lebih enak daripada kue di toko.", "Menurut saya, biru adalah warna yang paling indah.",
];
const kalimatK = x => (typeof x === "function" ? x() : x);
const PTK_FO = "Fakta dapat dibuktikan kebenarannya. Opini adalah pendapat atau perasaan seseorang, sering memakai kata <i>menurut saya, sebaiknya, paling, pasti, sangat</i>.";
function soalCariOpini(L) {
  const cariOpini = ya();
  return cariOpini ? pgL("Kalimat berikut yang merupakan <b>opini</b> adalah …", pilih(OPINI_K), ambil(FAKTA_K, 4).map(kalimatK), L, { petunjuk: PTK_FO, bahas: "Kalimat itu berisi pendapat yang tidak dapat dibuktikan benar atau salahnya." })
    : pgL("Kalimat berikut yang merupakan <b>fakta</b> adalah …", kalimatK(pilih(FAKTA_K)), ambil(OPINI_K, 4), L, { petunjuk: PTK_FO, bahas: "Kalimat itu dapat dibuktikan kebenarannya." });
}
/* Paragraf berisi fakta (f) dan opini (o) */
const FO_PARAGRAF = [
  [["Taman Kota Harapan dibuka pada tahun 2019.", "f"], ["Luas taman itu sekitar dua hektare.", "f"], ["Menurut saya, taman itu adalah tempat terbaik untuk bersantai.", "o"], ["Di sana terdapat kolam ikan dan taman bermain anak.", "f"], ["Taman itu buka setiap hari mulai pukul 06.00.", "f"]],
  [["Pentas seni sekolah diadakan pada hari Sabtu.", "f"], ["Acara itu dihadiri oleh sekitar dua ratus orang tua siswa.", "f"], ["Penampilan tari kelas lima sangat memukau.", "o"], ["Setiap kelas menampilkan satu pertunjukan.", "f"], ["Acara terbaik tahun ini tentu saja drama kelas enam.", "o"]],
  [["Pasar buah itu terletak di dekat terminal.", "f"], ["Pasar itu buka sejak pukul lima pagi.", "f"], ["Buah di pasar itu pasti lebih segar daripada buah di toko.", "o"], ["Harga mangga di sana Rp15.000 per kilogram.", "f"]],
  [["Bersepeda ke sekolah tidak menghasilkan asap kendaraan.", "f"], ["Bersepeda adalah cara paling menyenangkan untuk berangkat sekolah.", "o"], ["Di sekolah kami tersedia tempat parkir sepeda.", "f"], ["Sebaiknya semua siswa bersepeda ke sekolah.", "o"], ["Setiap pagi, sekitar tiga puluh siswa datang dengan sepeda.", "f"]],
  [["Buku cerita itu terdiri atas dua belas bab.", "f"], ["Buku itu ditulis oleh seorang guru SD.", "f"], ["Ceritanya sangat seru dan membuat penasaran.", "o"], ["Buku itu sudah dicetak ulang sebanyak tiga kali.", "f"], ["Semua anak pasti suka membaca buku itu.", "o"]],
  [["Kebun sekolah kami ditanami cabai, tomat, dan bayam.", "f"], ["Siswa kelas empat bertugas menyiram tanaman setiap pagi.", "f"], ["Tomat dari kebun sekolah rasanya paling manis.", "o"], ["Hasil panen dijual di koperasi sekolah.", "f"]],
];
function soalFOParagraf(L) {
  const p = pilih(L <= 5 ? FO_PARAGRAF.filter(x => x.filter(y => y[1] === "o").length === 1) : FO_PARAGRAF), kal = p.map(x => x[0]), no = p.map((x, i) => (x[1] === "o" ? i + 1 : 0)).filter(Boolean);
  const o = { bacaan: bernomor(kal), petunjuk: PTK_FO, bahas: `Opini: ${no.map(n => `(${n})`).join(", ")}. Kalimat lainnya fakta.` };
  if (no.length === 1) return pgTetap("Kalimat <b>opini</b> dalam paragraf tersebut ditandai nomor …", kal.map((_, i) => `(${i + 1})`), `(${no[0]})`, o);
  if (L >= 7 && ya()) return pgk("Pilih <b>semua</b> kalimat yang merupakan opini.", p.map((x, i) => ({ t: `Kalimat (${i + 1})`, b: x[1] === "o" })), o);
  return bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan berikut.", ambil(p.map((x, i) => [x, i]), 4).map(([x, i]) => { const sebutFakta = ya(); return { t: `Kalimat (${i + 1}) merupakan ${sebutFakta ? "fakta" : "opini"}.`, b: (x[1] === "f") === sebutFakta }; }), o);
}
/* Tujuan teks. Pasangan yang bertentangan tidak dijadikan pengecoh bersama. */
const TUJUAN = {
  info: "memberikan pengetahuan kepada pembaca", prosedur: "menjelaskan langkah-langkah melakukan sesuatu", fabel: "menghibur pembaca sambil menyampaikan pesan moral",
  iklan: "membujuk pembaca agar membeli atau memakai suatu barang atau jasa", pengumuman: "memberitahukan suatu kegiatan kepada banyak orang", ajakan: "mengajak pembaca melakukan suatu kebaikan",
};
const TUJUAN_BENTROK = { info: ["pengumuman", "prosedur"], pengumuman: ["info"], prosedur: ["info"], iklan: ["ajakan"], ajakan: ["iklan"], fabel: [] };
const IKLAN = [
  "<h4>Susu Segar Sapi Ceria</h4><p>Ingin tubuh sehat dan kuat? Minumlah Susu Segar Sapi Ceria setiap pagi! Diperah dari sapi pilihan dan diolah dengan bersih. Kini tersedia rasa cokelat dan stroberi. Dapatkan di warung terdekat hanya Rp5.000 per botol!</p>",
  "<h4>Toko Buku Pelangi</h4><p>Diskon 20% untuk semua buku cerita anak selama bulan Juli! Koleksi lengkap, harga bersahabat. Kunjungi Toko Buku Pelangi di Jalan Merdeka No. 10 dan pilih buku favoritmu!</p>",
  "<h4>Sepatu Lari Kilat</h4><p>Ringan, nyaman, dan tidak licin. Sepatu Lari Kilat siap menemanimu berlari lebih cepat! Beli sekarang dan dapatkan kaus kaki gratis.</p>",
  "<h4>Pasta Gigi Senyum Ceria</h4><p>Gigi bersih, napas segar sepanjang hari! Pasta Gigi Senyum Ceria mengandung fluorida untuk membantu mencegah gigi berlubang. Rasa jeruk yang disukai anak-anak. Ayo, beli sekarang!</p>",
  "<h4>Les Renang Lumba-Lumba</h4><p>Ingin pandai berenang? Bergabunglah dengan Les Renang Lumba-Lumba! Pelatih berpengalaman dan kolam yang aman. Daftar minggu ini, gratis satu kali latihan!</p>",
];
const AJAKAN = [
  "<div class=\"kertas poster\"><h4>AYO HEMAT AIR!</h4><p>Matikan keran setelah dipakai. Air bersih sangat berharga. Hemat air hari ini untuk masa depan kita.</p></div>",
  "<div class=\"kertas poster\"><h4>BUANGLAH SAMPAH PADA TEMPATNYA!</h4><p>Lingkungan bersih, hidup pun sehat. Pisahkan sampah organik dan anorganik.</p></div>",
  "<div class=\"kertas poster\"><h4>AYO MEMBACA!</h4><p>Luangkan waktu 15 menit setiap hari untuk membaca buku. Buku adalah jendela dunia.</p></div>",
  "<div class=\"kertas poster\"><h4>AYO CUCI TANGAN!</h4><p>Cuci tangan dengan sabun sebelum makan dan sesudah bermain agar terhindar dari penyakit.</p></div>",
  "<div class=\"kertas poster\"><h4>AYO TANAM POHON!</h4><p>Satu pohon yang kamu tanam hari ini memberi udara segar untuk esok hari.</p></div>",
];
function soalTujuan(L) {
  const jenis = pilih(Object.keys(TUJUAN));
  const bacaan = jenis === "info" ? (e => bacaanHtml(e.judul, e.para))(pilih(INFO)) : jenis === "prosedur" ? (p => `<h4>${p.judul}</h4>${daftarBernomor(p.langkah)}`)(pilih(PROSEDUR))
    : jenis === "fabel" ? (k => bacaanHtml(k.judul, k.para))(kisahAcak(pilih(KISAH.filter(x => x.jenis === "fabel")))) : jenis === "iklan" ? pilih(IKLAN)
      : jenis === "ajakan" ? pilih(AJAKAN) : bacaanHtml("", bahanPengumuman().para);
  const salah = Object.keys(TUJUAN).filter(k => k !== jenis && !TUJUAN_BENTROK[jenis].includes(k)).map(k => TUJUAN[k]);
  return pgL("Tujuan penulisan teks tersebut adalah …", TUJUAN[jenis], salah, L, { bacaan, petunjuk: "Tanyakan: penulis ingin pembaca melakukan apa setelah membaca teks ini?", bahas: `Teks itu bertujuan ${TUJUAN[jenis]}.` });
}
/* Membandingkan dua teks tentang hewan (fakta dari buku IPAS SD) */
const HEWAN = [
  { n: "kucing", mk: "karnivora", mkD: "daging dan ikan", biak: "melahirkan", hidup: "darat", tutup: "rambut" },
  { n: "sapi", mk: "herbivora", mkD: "rumput", biak: "melahirkan", hidup: "darat", tutup: "rambut" },
  { n: "kambing", mk: "herbivora", mkD: "rumput dan daun", biak: "melahirkan", hidup: "darat", tutup: "rambut" },
  { n: "harimau", mk: "karnivora", mkD: "daging", biak: "melahirkan", hidup: "darat", tutup: "rambut" },
  { n: "kelinci", mk: "herbivora", mkD: "sayuran dan rumput", biak: "melahirkan", hidup: "darat", tutup: "rambut" },
  { n: "ayam", mk: "omnivora", mkD: "biji-bijian dan cacing", biak: "bertelur", hidup: "darat", tutup: "bulu" },
  { n: "bebek", mk: "omnivora", mkD: "biji-bijian, siput, dan ikan kecil", biak: "bertelur", hidup: "darat dan air", tutup: "bulu" },
  { n: "ikan mas", mk: "omnivora", mkD: "lumut dan hewan air kecil", biak: "bertelur", hidup: "air", tutup: "sisik" },
  { n: "katak", mk: "karnivora", mkD: "serangga", biak: "bertelur", hidup: "darat dan air", tutup: "kulit yang licin" },
  { n: "buaya", mk: "karnivora", mkD: "ikan dan hewan lain", biak: "bertelur", hidup: "darat dan air", tutup: "sisik yang keras" },
  { n: "paus", mk: "karnivora", mkD: "udang kecil dan ikan", biak: "melahirkan", hidup: "air", tutup: "kulit yang tebal" },
];
const SIFAT = {
  mk: { sama: v => `sama-sama termasuk hewan ${v}`, satu: v => `termasuk hewan ${v}`, nilai: ["herbivora", "karnivora", "omnivora"] },
  biak: { sama: v => `sama-sama berkembang biak dengan cara ${v}`, satu: v => `berkembang biak dengan cara ${v}`, nilai: ["bertelur", "melahirkan"] },
  hidup: { sama: v => `sama-sama hidup di ${v.replace(" dan ", " dan di ")}`, satu: v => `hidup di ${v.replace(" dan ", " dan di ")}`, nilai: ["darat", "air", "darat dan air"] },
};
const teksHewan = h => { const N = besarAwal(h.n), k = [`${N} hidup di ${h.hidup.replace(" dan ", " dan di ")}.`, `${N} memakan ${h.mkD} sehingga termasuk hewan ${h.mk}.`, `${N} berkembang biak dengan cara ${h.biak}.`, `Tubuhnya ditutupi ${h.tutup}.`];
  return ya() ? k.join(" ") : [k[2], k[0], k[1], k[3]].join(" "); };
function pasangHewan() {
  for (;;) { const [a, b] = ambil(HEWAN, 2), sama = Object.keys(SIFAT).filter(s => a[s] === b[s]), beda = Object.keys(SIFAT).filter(s => a[s] !== b[s]); if (sama.length && beda.length) return { a, b, sama, beda }; }
}
const bacaanDuaTeks = (a, b) => `<p class="ket-bacaan"><b>Teks 1</b></p><p>${teksHewan(a)}</p><p class="ket-bacaan"><b>Teks 2</b></p><p>${teksHewan(b)}</p>`;
function soalBandingHewan(L) {
  const { a, b, sama, beda } = pasangHewan(), cariSama = ya(), A = besarAwal(a.n);
  const o = { bacaan: bacaanDuaTeks(a, b), petunjuk: "Bandingkan kedua teks satu per satu: tempat hidup, makanan, dan cara berkembang biak." };
  if (cariSama) {
    const s = pilih(sama), salah = beda.map(x => SIFAT[x].sama(pilih([a[x], b[x]])));
    for (const x of Object.keys(SIFAT)) for (const v of SIFAT[x].nilai) if (v !== a[x] && v !== b[x]) salah.push(SIFAT[x].sama(v));
    return pgL(`Persamaan ${a.n} dan ${b.n} berdasarkan kedua teks adalah …`, SIFAT[s].sama(a[s]), salah, L, { ...o, bahas: `Keduanya ${SIFAT[s].sama(a[s]).replace("sama-sama ", "")}.` });
  }
  const s = pilih(beda), f = SIFAT[s], kal = (x, y) => `${A} ${f.satu(x)}, sedangkan ${b.n} ${f.satu(y)}.`;
  const salah = [kal(b[s], a[s]), ...sama.map(x => `${A} ${SIFAT[x].satu(pilih(SIFAT[x].nilai.filter(v => v !== a[x])))}, sedangkan ${b.n} ${SIFAT[x].satu(b[x])}.`), ...beda.filter(x => x !== s).map(x => `${A} ${SIFAT[x].satu(b[x])}, sedangkan ${b.n} ${SIFAT[x].satu(a[x])}.`)];
  return pgL(`Perbedaan ${a.n} dan ${b.n} berdasarkan kedua teks adalah …`, kal(a[s], b[s]), salah, L, { ...o, bahas: kal(a[s], b[s]) });
}
function soalBandingBS(L) {
  const { a, b } = pasangHewan(), sifat = ambil(Object.keys(SIFAT), 3), nilai = campurBS(3);
  const butir = sifat.map((x, i) => {
    const benar = nilai[i], samaNyata = a[x] === b[x];
    if (samaNyata) return { t: benar ? `${besarAwal(a.n)} dan ${b.n} ${SIFAT[x].sama(a[x])}.` : `${besarAwal(a.n)} ${SIFAT[x].satu(a[x])}, sedangkan ${b.n} ${SIFAT[x].satu(pilih(SIFAT[x].nilai.filter(v => v !== a[x])))}.`, b: benar };
    return { t: benar ? `${besarAwal(a.n)} ${SIFAT[x].satu(a[x])}, sedangkan ${b.n} ${SIFAT[x].satu(b[x])}.` : `${besarAwal(a.n)} dan ${b.n} ${SIFAT[x].sama(pilih([a[x], b[x]]))}.`, b: benar };
  });
  const o = { bacaan: bacaanDuaTeks(a, b), bahas: sifat.map(x => `${besarAwal(a.n)}: ${a[x]} · ${besarAwal(b.n)}: ${b[x]}`).join("<br>") };
  return L >= 10 && ya() ? pgk("Pilih <b>semua</b> pernyataan yang sesuai dengan kedua teks.", butir, o) : bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan berdasarkan kedua teks.", butir, o);
}
daftarMisi("nal", "bi9", "Fakta, opini & tujuan teks", "⚖️", {
  1: [() => soalCariOpini(1)], 2: [() => soalCariOpini(2)], 3: [() => soalCariOpini(3)], 4: [() => soalFOParagraf(4), () => soalCariOpini(4)],
  5: [() => soalFOParagraf(5), () => soalTujuan(5)], 6: [() => soalTujuan(6), () => soalFOParagraf(6)], 7: [() => soalTujuan(7), () => soalFOParagraf(7), () => soalBandingHewan(7)],
  8: [() => soalBandingHewan(8), () => soalFOParagraf(8), () => soalTujuan(8)], 9: [() => soalBandingHewan(9), () => soalBandingBS(9), () => soalFOParagraf(9)],
  10: [() => soalBandingBS(10), () => soalBandingHewan(10), () => soalTujuan(10)],
});
