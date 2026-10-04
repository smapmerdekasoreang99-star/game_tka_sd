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
/* Cerita mini (3–4 kalimat) dengan amanat gamblang untuk level awal bi8. {A} = nama acak.
   amanat/jd/tiru: b = kunci, s = pengecoh (≥ 4). tk = tokoh yang sikapnya patut ditiru. */
const KISAH_MINI = [
  { judul: "Kelereng yang Dikembalikan", t: ["Sepulang sekolah, {A} menemukan sebuah kelereng biru di halaman.", "Ia tahu kelereng itu milik Rudi, teman sekelasnya.", "Keesokan harinya, {A} mengembalikan kelereng itu kepada Rudi.", "Rudi sangat senang dan berterima kasih."],
    amanat: { b: "Kembalikanlah barang yang bukan milik kita.", s: ["Kita harus rajin bermain kelereng.", "Kita harus pulang sekolah tepat waktu.", "Kita harus membeli kelereng yang bagus.", "Kita tidak boleh bermain di halaman."] },
    jd: { b: "Kelereng yang Dikembalikan", s: ["Lomba Kelereng", "Halaman Sekolah yang Luas", "Toko Mainan Baru", "Kelereng Paling Mahal"] },
    tk: "{A}", tiru: { b: "jujur mengembalikan barang milik teman", s: ["menyimpan barang temuan untuk diri sendiri", "pulang sekolah tanpa pamit", "suka mengambil mainan teman", "bermain sampai lupa waktu"] } },
  { judul: "Payung untuk Berdua", t: ["Hujan turun deras saat jam pulang sekolah.", "{A} membawa payung, sedangkan Tari tidak.", "“Ayo, kita pakai payungku berdua,” ajak {A}.", "Mereka pun pulang bersama tanpa kehujanan."],
    amanat: { b: "Saling menolonglah dengan teman yang membutuhkan.", s: ["Kita harus membeli payung yang besar.", "Kita tidak boleh pulang saat hujan.", "Kita harus berlari ketika hujan turun.", "Kita harus menunggu hujan sampai malam."] },
    jd: { b: "Payung untuk Berdua", s: ["Hujan Sepanjang Malam", "Toko Payung", "Jalan Menuju Pasar", "Payung yang Hilang"] },
    tk: "{A}", tiru: { b: "mau berbagi payung dengan temannya", s: ["membiarkan temannya kehujanan", "pulang lebih dulu tanpa menunggu teman", "menyembunyikan payungnya", "bermain hujan sampai sakit"] } },
  { judul: "Merak yang Sombong", jenis: "fabel", t: ["Merak selalu membanggakan bulunya yang indah dan mengejek Pipit yang kecil.", "Suatu hari, badai datang dan Merak kesulitan terbang karena bulunya basah dan berat.", "Pipit menolongnya dengan menunjukkan gua tempat berteduh.", "Merak merasa malu dan meminta maaf kepada Pipit."],
    amanat: { b: "Jangan sombong dan jangan mengejek orang lain.", s: ["Kita harus berteduh di gua saat hujan.", "Kita harus merawat bulu burung.", "Kita harus pandai terbang tinggi.", "Kita tidak boleh keluar rumah saat badai."] },
    jd: { b: "Merak yang Sombong", s: ["Gua di Dalam Hutan", "Bulu yang Basah", "Burung-Burung Bernyanyi", "Musim Kemarau Panjang"] },
    tk: "Pipit", tiru: { b: "tetap menolong meskipun pernah diejek", s: ["membalas ejekan dengan ejekan", "membanggakan diri di depan teman", "pergi meninggalkan teman yang kesulitan", "suka mengejek hewan lain"] } },
  { judul: "Belajar Bersepeda", t: ["{A} sedang belajar naik sepeda.", "Ia terjatuh berkali-kali sampai lututnya lecet.", "Namun, {A} tidak menyerah dan terus berlatih setiap sore.", "Seminggu kemudian, ia sudah pandai bersepeda keliling kampung."],
    amanat: { b: "Jangan mudah menyerah ketika belajar sesuatu.", s: ["Kita harus membeli sepeda baru.", "Kita tidak boleh bermain pada sore hari.", "Kita harus bersepeda ke sekolah setiap hari.", "Kita harus mengobati luka dengan cepat."] },
    jd: { b: "Belajar Bersepeda", s: ["Lutut yang Lecet", "Toko Sepeda", "Keliling Kota", "Lomba Balap Motor"] },
    tk: "{A}", tiru: { b: "tekun berlatih walaupun sering terjatuh", s: ["berhenti berlatih karena takut jatuh", "menangis dan marah ketika gagal", "menyalahkan sepedanya", "hanya mau berlatih sekali saja"] } },
  { judul: "Keran yang Menetes", t: ["Saat jam istirahat, {A} melihat keran di dekat kelas terus meneteskan air.", "Ia segera memutar keran itu sampai tertutup rapat.", "Setelah itu, {A} melapor kepada penjaga sekolah agar keran itu diperbaiki."],
    amanat: { b: "Hematlah air dan jangan membiarkannya terbuang sia-sia.", s: ["Kita harus bermain air saat istirahat.", "Kita harus membeli keran baru.", "Kita harus minum air sebanyak-banyaknya.", "Kita tidak boleh berbicara dengan penjaga sekolah."] },
    jd: { b: "Keran yang Menetes", s: ["Jam Istirahat yang Ramai", "Kantin Sekolah", "Penjaga Sekolah yang Baru", "Kolam Renang Kota"] },
    tk: "{A}", tiru: { b: "peduli dan tidak membiarkan air terbuang", s: ["membiarkan keran tetap menetes", "bermain air di dekat kelas", "merusak keran sekolah", "pura-pura tidak melihat"] } },
  { judul: "Anak Itik yang Bandel", jenis: "fabel", t: ["Induk Itik melarang anak-anaknya berenang ke tengah sungai yang arusnya deras.", "Seekor anak itik tidak mau mendengar dan berenang sendirian ke sana.", "Ia hampir terseret arus, untunglah induknya segera menolong.", "Sejak itu, anak itik selalu mematuhi nasihat induknya."],
    amanat: { b: "Patuhilah nasihat orang tua.", s: ["Kita harus pandai berenang di sungai.", "Kita harus bermain sendirian.", "Kita harus memelihara itik di rumah.", "Kita tidak boleh mandi di rumah."] },
    jd: { b: "Anak Itik yang Bandel", s: ["Sungai yang Jernih", "Kolam Ikan Pak Tani", "Lomba Berenang", "Rumah Baru Induk Itik"] },
    tk: "induk itik", tiru: { b: "sayang dan sigap menolong anaknya", s: ["membiarkan anaknya dalam bahaya", "marah dan meninggalkan anaknya", "berenang jauh sendirian", "tidak peduli pada anaknya"] } },
  { judul: "Semut-Semut Mengangkat Roti", jenis: "fabel", t: ["Seekor semut menemukan remah roti yang besar.", "Ia mencoba mengangkatnya sendiri, tetapi roti itu terlalu berat.", "Semut lalu memanggil teman-temannya.", "Bersama-sama, mereka mengangkat roti itu ke sarang dengan mudah."],
    amanat: { b: "Pekerjaan yang berat menjadi ringan jika dikerjakan bersama.", s: ["Kita harus makan roti setiap pagi.", "Kita tidak boleh membuang sisa makanan.", "Kita harus membangun rumah yang besar.", "Kita harus bekerja sendiri tanpa bantuan."] },
    jd: { b: "Semut-Semut Mengangkat Roti", s: ["Toko Roti di Ujung Jalan", "Semut yang Kesepian", "Sarang yang Rusak", "Roti Basi"] },
    tk: "semut-semut itu", tiru: { b: "mau bekerja sama", s: ["saling berebut makanan", "bermalas-malasan di sarang", "menyimpan makanan sendiri", "mudah menyerah"] } },
  { judul: "Pensil yang Patah", t: ["{A} meminjam pensil milik Sinta untuk menggambar.", "Tanpa sengaja, pensil itu terjatuh dan patah.", "{A} segera meminta maaf kepada Sinta.", "Esok harinya, ia membawa pensil baru untuk mengganti pensil Sinta."],
    amanat: { b: "Mintalah maaf dan bertanggung jawablah jika berbuat salah.", s: ["Kita harus pandai menggambar.", "Kita tidak boleh memakai pensil.", "Kita harus membeli banyak pensil.", "Kita harus menggambar setiap hari."] },
    jd: { b: "Pensil yang Patah", s: ["Lomba Menggambar", "Buku Gambar Baru", "Toko Alat Tulis", "Pelajaran Matematika"] },
    tk: "{A}", tiru: { b: "meminta maaf dan mengganti barang yang dirusaknya", s: ["menyembunyikan pensil yang patah", "menyalahkan Sinta", "pura-pura tidak tahu", "membuang pensil teman"] } },
  { judul: "Kelinci Kecil Menanam Wortel", jenis: "fabel", t: ["Kelinci Kecil menanam wortel di kebun.", "Setiap hari, ia mencabut wortelnya untuk melihat apakah sudah besar sehingga wortel itu layu.", "Ibunya menasihati, “Bersabarlah, wortel perlu waktu untuk tumbuh.”", "Kelinci Kecil menanam lagi dan menunggu dengan sabar sampai wortelnya besar."],
    amanat: { b: "Bersabarlah karena hasil yang baik memerlukan waktu.", s: ["Kita harus makan wortel setiap hari.", "Kita harus menanam bunga di kebun.", "Kita tidak boleh bermain di kebun.", "Kita harus mencabut tanaman setiap hari."] },
    jd: { b: "Kelinci Kecil Menanam Wortel", s: ["Kebun Bunga yang Indah", "Wortel yang Dicuri", "Rumah Kelinci", "Hujan di Kebun"] },
    tk: "Kelinci Kecil", tiru: { b: "mau mendengar nasihat dan menunggu dengan sabar", s: ["tidak sabar dan mudah marah", "mencabut wortel setiap hari", "menyerah dan tidak mau menanam lagi", "mengambil wortel milik tetangga"] } },
  { judul: "Bungkus Permen di Taman", t: ["{A} sedang bermain di taman kota.", "Ia melihat bungkus permen berserakan di bawah bangku.", "{A} memungut bungkus-bungkus itu dan membuangnya ke tempat sampah.", "Teman-temannya ikut membantu sehingga taman menjadi bersih."],
    amanat: { b: "Jagalah kebersihan lingkungan.", s: ["Kita harus banyak makan permen.", "Kita harus duduk di bangku taman.", "Kita tidak boleh bermain di taman.", "Kita harus membeli permen di taman."] },
    jd: { b: "Taman yang Kembali Bersih", s: ["Permen Kesukaanku", "Bangku Taman yang Rusak", "Bermain Layang-Layang", "Pasar Malam di Kota"] },
    tk: "{A}", tiru: { b: "memungut sampah dan membuangnya ke tempat sampah", s: ["membuang bungkus permen di bawah bangku", "membiarkan taman kotor", "menyuruh orang lain memungut sampah", "bermain sambil merusak tanaman"] } },
  { judul: "Monyet dan Toples Kacang", jenis: "fabel", t: ["Monyet memasukkan tangannya ke dalam toples kacang.", "Ia menggenggam kacang sebanyak-banyaknya sehingga tangannya tidak bisa keluar.", "Setelah melepaskan sebagian kacang, barulah tangannya dapat keluar."],
    amanat: { b: "Jangan serakah karena dapat menyusahkan diri sendiri.", s: ["Kita harus makan kacang setiap hari.", "Kita harus menyimpan kacang di dalam toples.", "Kita tidak boleh bermain dengan monyet.", "Kita harus memanjat pohon dengan hati-hati."] },
    jd: { b: "Monyet yang Serakah", s: ["Toples Kaca yang Pecah", "Kebun Kacang Pak Tani", "Monyet Pandai Memanjat", "Pesta di Hutan"] },
    tk: "monyet", tiru: { b: "mau melepaskan sebagian kacang agar tangannya bebas", s: ["menggenggam kacang sebanyak-banyaknya", "memecahkan toples dengan marah", "mengambil kacang milik hewan lain", "menangis tanpa mencari jalan keluar"] } },
  { judul: "Anak Kucing di Selokan", t: ["{A} mendengar suara anak kucing dari dalam selokan.", "Anak kucing itu basah dan menggigil kedinginan.", "{A} mengangkatnya dengan hati-hati, lalu mengeringkannya dengan kain.", "Ia juga memberinya makanan sampai anak kucing itu kuat kembali."],
    amanat: { b: "Sayangilah hewan dan tolonglah hewan yang kesulitan.", s: ["Kita harus membersihkan selokan setiap hari.", "Kita harus memelihara banyak kucing.", "Kita tidak boleh keluar rumah saat dingin.", "Kita harus membeli kain yang lembut."] },
    jd: { b: "Menolong Anak Kucing", s: ["Selokan yang Kotor", "Kucing yang Nakal", "Kain Baru Ibu", "Hujan Sore Hari"] },
    tk: "{A}", tiru: { b: "menyayangi dan menolong hewan", s: ["membiarkan anak kucing kedinginan", "mengusir anak kucing itu", "menakut-nakuti hewan", "membuang sampah ke selokan"] } },
  { judul: "Berani Membaca Puisi", t: ["{A} takut membaca puisi di depan kelas.", "Di rumah, ia berlatih membaca puisi di depan cermin setiap hari.", "Saat gilirannya tiba, {A} membaca puisi dengan lancar.", "Teman-teman pun bertepuk tangan untuknya."],
    amanat: { b: "Rajinlah berlatih agar berani dan percaya diri.", s: ["Kita harus membeli cermin yang besar.", "Kita harus bertepuk tangan setiap hari.", "Kita tidak boleh membaca puisi.", "Kita harus menulis puisi yang panjang."] },
    jd: { b: "Berani Membaca Puisi", s: ["Cermin di Kamarku", "Tepuk Tangan yang Meriah", "Buku Puisi yang Hilang", "Pelajaran Olahraga"] },
    tk: "{A}", tiru: { b: "berlatih dengan sungguh-sungguh untuk melawan rasa takut", s: ["pura-pura sakit agar tidak maju", "menyerah karena takut", "menyuruh teman membacakan puisinya", "menangis di depan kelas"] } },
  { judul: "Membantu Ibu", t: ["Ibu baru pulang dari pasar dan tampak sangat lelah.", "Tanpa disuruh, {A} mencuci piring dan menyapu lantai.", "Ibu tersenyum dan memeluk {A}."],
    amanat: { b: "Bantulah orang tua dengan ikhlas.", s: ["Kita harus sering pergi ke pasar.", "Kita harus membeli sapu baru.", "Kita tidak boleh mencuci piring.", "Kita harus tidur siang setiap hari."] },
    jd: { b: "Membantu Ibu", s: ["Pasar yang Ramai", "Piring yang Pecah", "Sapu Baru", "Liburan ke Pantai"] },
    tk: "{A}", tiru: { b: "membantu pekerjaan rumah tanpa disuruh", s: ["menunggu disuruh dulu baru bekerja", "bermain gawai saat ibu lelah", "meminta upah setiap membantu", "mengeluh ketika diminta membantu"] } },
  { judul: "Janji kepada Adik", t: ["{A} berjanji mengajari adiknya membaca sepulang sekolah.", "Siang itu, teman-temannya mengajak {A} bermain bola.", "“Maaf, aku sudah berjanji kepada adikku,” jawab {A} dengan sopan.", "Ia pun pulang dan mengajari adiknya membaca."],
    amanat: { b: "Tepatilah janji yang sudah kita buat.", s: ["Kita harus bermain bola setiap siang.", "Kita harus membeli buku cerita.", "Kita tidak boleh bermain dengan teman.", "Kita harus pulang sekolah lebih awal."] },
    jd: { b: "Janji kepada Adik", s: ["Bermain Bola di Lapangan", "Buku Bacaan Baru", "Teman Baru di Sekolah", "Lomba Sepak Bola"] },
    tk: "{A}", tiru: { b: "menepati janji kepada adiknya", s: ["melupakan janji demi bermain", "menolak ajakan teman dengan kasar", "berbohong kepada adiknya", "pulang terlambat tanpa kabar"] } },
  { judul: "Belajar Sedikit demi Sedikit", t: ["Seminggu sebelum ulangan, {A} mulai belajar.", "Setiap malam, ia membaca satu bab dan mengerjakan latihan soal.", "Saat ulangan tiba, {A} dapat menjawab soal dengan tenang.", "Nilainya pun sangat memuaskan."],
    amanat: { b: "Rajinlah belajar sejak jauh hari.", s: ["Kita harus belajar hanya pada malam sebelum ulangan.", "Kita harus membeli banyak buku.", "Kita tidak boleh mengikuti ulangan.", "Kita harus menyontek saat ulangan."] },
    jd: { b: "Belajar Sedikit demi Sedikit", s: ["Buku yang Tertinggal", "Libur Panjang", "Ulangan yang Dibatalkan", "Bermain Sepulang Sekolah"] },
    tk: "{A}", tiru: { b: "rajin belajar sedikit demi sedikit", s: ["belajar hanya pada malam sebelum ulangan", "menyontek jawaban teman", "bermain sepanjang malam", "panik ketika ulangan tiba"] } },
  { judul: "Kalah dengan Lapang Dada", t: ["{A} mengikuti lomba catur di sekolah.", "Di babak akhir, ia kalah dari Bima.", "{A} menjabat tangan Bima dan mengucapkan selamat.", "Sejak itu, ia makin rajin berlatih catur."],
    amanat: { b: "Terimalah kekalahan dengan lapang dada.", s: ["Kita harus selalu menang dalam lomba.", "Kita harus membeli papan catur.", "Kita tidak boleh mengikuti lomba.", "Kita harus bermain catur setiap malam."] },
    jd: { b: "Kalah dengan Lapang Dada", s: ["Papan Catur Baru", "Juara Lomba Lari", "Hadiah dari Kepala Sekolah", "Bermain di Lapangan"] },
    tk: "{A}", tiru: { b: "memberi selamat kepada lawan yang menang", s: ["marah dan membanting bidak catur", "menuduh lawannya curang", "berhenti bermain catur selamanya", "menolak berjabat tangan"] } },
  { judul: "Gajah yang Penolong", jenis: "fabel", t: ["Kelinci, rusa, dan kambing ingin memetik buah di pohon yang tinggi.", "Mereka tidak sampai walaupun sudah melompat berkali-kali.", "Gajah datang dan memetikkan buah itu dengan belalainya.", "Mereka pun menikmati buah bersama-sama."],
    amanat: { b: "Gunakan kelebihan kita untuk menolong orang lain.", s: ["Kita harus melompat setinggi-tingginya.", "Kita harus menanam pohon buah.", "Kita tidak boleh makan buah.", "Kita harus memanjat pohon sendirian."] },
    jd: { b: "Gajah yang Penolong", s: ["Pohon yang Tumbang", "Lomba Melompat", "Kebun Sayur Kelinci", "Hutan yang Gelap"] },
    tk: "gajah", tiru: { b: "memakai kelebihannya untuk menolong teman", s: ["memakan buah itu sendirian", "menertawakan teman yang tidak sampai", "pergi tanpa peduli", "merobohkan pohon itu"] } },
  { judul: "Laba-Laba yang Tekun", jenis: "fabel", t: ["Laba-laba membuat jaring di antara dua ranting.", "Angin kencang merusak jaringnya berkali-kali.", "Laba-laba tidak berputus asa dan terus menganyam jaring yang baru.", "Akhirnya, jaringnya selesai dan kokoh."],
    amanat: { b: "Teruslah berusaha dan jangan berputus asa.", s: ["Kita harus menjauhi angin kencang.", "Kita harus memelihara laba-laba.", "Kita tidak boleh memanjat ranting.", "Kita harus membersihkan sarang laba-laba."] },
    jd: { b: "Laba-Laba yang Tekun", s: ["Angin Musim Hujan", "Ranting yang Patah", "Serangga di Kebun", "Pohon Tertinggi"] },
    tk: "laba-laba", tiru: { b: "tekun dan tidak berputus asa", s: ["berhenti setelah gagal sekali", "marah kepada angin", "mengambil jaring milik laba-laba lain", "bermalas-malasan di ranting"] } },
  { judul: "Bangun Lebih Pagi", t: ["{A} sering terlambat datang ke sekolah.", "Ia lalu tidur lebih awal dan memasang jam weker.", "Kini {A} selalu tiba di sekolah sebelum bel berbunyi."],
    amanat: { b: "Biasakanlah hidup disiplin dan menghargai waktu.", s: ["Kita harus membeli jam weker yang mahal.", "Kita harus tidur siang di sekolah.", "Kita tidak boleh pergi ke sekolah.", "Kita harus bermain sebelum bel berbunyi."] },
    jd: { b: "Bangun Lebih Pagi", s: ["Jam Weker yang Rusak", "Bel Sekolah", "Mimpi Indah", "Jalan Menuju Pasar"] },
    tk: "{A}", tiru: { b: "mau memperbaiki kebiasaan buruknya", s: ["tetap tidur larut malam", "mematikan jam weker lalu tidur lagi", "menyalahkan orang lain karena terlambat", "membolos sekolah"] } },
];
const PTK_AMANAT = "Amanat adalah pesan baik yang ingin disampaikan pengarang. Lihat apa yang terjadi pada tokoh di akhir cerita.";
function kisahMini(L) {
  const k = pilih(KISAH_MINI), A = nama(), f = s => isiNama(s, A);
  return { k, f, bacaan: judul => bacaanHtml(judul ? k.judul : "", [k.t.map(f)]) };
}
function soalAmanatMini(L) {
  const { k, bacaan } = kisahMini(L);
  return pgL("Amanat yang terkandung dalam cerita tersebut adalah …", k.amanat.b, k.amanat.s, L, { bacaan: bacaan(true), petunjuk: PTK_AMANAT, bahas: `Amanatnya: ${k.amanat.b}` });
}
function soalJudulMini(L) {
  const { k, bacaan } = kisahMini(L);
  return pgL("Judul yang paling tepat untuk cerita tersebut adalah …", k.jd.b, k.jd.s, L,
    { bacaan: bacaan(false), petunjuk: "Judul yang tepat mewakili isi seluruh cerita, bukan hanya satu bagian kecil.", bahas: `Judul yang mewakili seluruh cerita: <b>${k.jd.b}</b>.` });
}
function soalTiruMini(L) {
  const { k, f, bacaan } = kisahMini(L), tk = f(k.tk);
  return pgL(`Sikap ${tk} yang patut ditiru adalah …`, f(k.tiru.b), k.tiru.s.map(f), L,
    { bacaan: bacaan(true), petunjuk: "Sikap yang patut ditiru adalah perbuatan baik tokoh, bukan perbuatan yang merugikan.", bahas: `Sikap ${tk} yang patut ditiru: ${f(k.tiru.b)}.` });
}

/* Puisi anak pendek (satu bait) — bentuk sama dengan PUISI di bahasa-sastra.js */
const PUISI_MINI = [
  { judul: "Bulan", bait: [["Bulan bulat di langit malam", "Cahayanya lembut menerangi kampung", "Bintang berkelip menemaninya", "Aku tersenyum memandang dari jendela"]],
    tema: { b: "keindahan langit malam", s: ["kerja keras petani", "kebersihan sekolah", "kasih sayang guru", "bahaya banjir"] },
    rasa: { b: "kagum dan senang", s: ["marah dan kesal", "takut dan cemas", "sedih dan kecewa", "bosan dan malas"] },
    makna: [{ l: "Cahayanya lembut menerangi kampung", b: "sinar bulan membuat kampung tidak gelap", s: ["kampung itu memakai banyak lampu", "bulan jatuh ke kampung", "kampung itu terbakar", "warga menyalakan obor"] }],
    larik: [{ q: "Larik yang menunjukkan tempat penyair memandang bulan adalah …", b: "Aku tersenyum memandang dari jendela" }] },
  { judul: "Ayah", bait: [["Ayah berangkat saat fajar", "Pulang membawa peluh dan senyum", "Semua demi kami di rumah", "Terima kasih, Ayah tercinta"]],
    tema: { b: "kerja keras dan jasa ayah", s: ["keindahan pantai", "persahabatan di sekolah", "manfaat pohon", "permainan anak-anak"] },
    rasa: { b: "sayang dan berterima kasih kepada ayah", s: ["kesal kepada ayah", "takut kepada ayah", "kecewa kepada ayah", "iri kepada ayah"] },
    makna: [{ l: "Pulang membawa peluh dan senyum", b: "ayah lelah bekerja, tetapi tetap gembira", s: ["ayah pulang membawa oleh-oleh", "ayah sedang sakit", "ayah pulang sambil bernyanyi", "ayah tidak pernah bekerja"] },
      { l: "Ayah berangkat saat fajar", b: "ayah berangkat bekerja pagi-pagi sekali", s: ["ayah berangkat pada malam hari", "ayah pergi berlibur", "ayah bangun kesiangan", "ayah berangkat ke pasar ikan"] }],
    larik: [{ q: "Larik yang menyebutkan untuk siapa ayah bekerja keras adalah …", b: "Semua demi kami di rumah" }] },
  { judul: "Kelasku", bait: [["Kelasku bersih dan rapi", "Meja dan kursi tersusun indah", "Kami piket bergantian setiap hari", "Belajar pun terasa nyaman"]],
    tema: { b: "kebersihan kelas", s: ["keindahan gunung", "jasa pahlawan", "kasih sayang nenek", "suasana pasar"] },
    rasa: { b: "senang dan nyaman", s: ["sedih dan kesepian", "takut dan gelisah", "marah dan kecewa", "malas dan bosan"] },
    makna: [{ l: "Kami piket bergantian setiap hari", b: "siswa membersihkan kelas secara bergiliran", s: ["siswa bermain secara bergiliran", "siswa pulang secara bergiliran", "kelas dibersihkan oleh petugas saja", "siswa jarang membersihkan kelas"] }],
    larik: [{ q: "Larik yang menunjukkan akibat kelas yang bersih adalah …", b: "Belajar pun terasa nyaman" }] },
  { judul: "Kupu-Kupu", bait: [["Kupu-kupu bersayap warna-warni", "Hinggap dari bunga ke bunga", "Menari ringan diembus angin", "Taman pun tampak semakin indah"]],
    tema: { b: "keindahan kupu-kupu di taman", s: ["bahaya sampah plastik", "kerja keras nelayan", "cita-cita menjadi dokter", "jasa guru"] },
    rasa: { b: "kagum akan keindahan kupu-kupu", s: ["takut kepada kupu-kupu", "kesal kepada kupu-kupu", "sedih karena taman rusak", "bosan melihat taman"] },
    makna: [{ l: "Menari ringan diembus angin", b: "kupu-kupu terbang melayang dengan lincah tertiup angin", s: ["kupu-kupu ikut lomba menari", "angin bertiup sangat kencang", "kupu-kupu jatuh ke tanah", "penyair sedang menari di taman"] }],
    larik: [{ q: "Larik yang menggambarkan warna sayap kupu-kupu adalah …", b: "Kupu-kupu bersayap warna-warni" }] },
  { judul: "Sungai di Desaku", bait: [["Dulu airmu jernih berkilau", "Kini keruh penuh sampah", "Ikan-ikan pun menghilang", "Ayo, kita jaga sungai bersama"]],
    tema: { b: "ajakan menjaga kebersihan sungai", s: ["keindahan bulan purnama", "kasih sayang ayah", "kegembiraan bermain layang-layang", "jasa pahlawan"] },
    rasa: { b: "sedih dan prihatin melihat sungai yang kotor", s: ["senang melihat sungai yang kotor", "bangga karena sungai penuh sampah", "takut berenang di sungai", "bosan tinggal di desa"] },
    makna: [{ l: "Ikan-ikan pun menghilang", b: "ikan tidak dapat hidup di sungai yang kotor", s: ["ikan-ikan sedang bersembunyi", "ikan-ikan ditangkap nelayan", "ikan-ikan pindah ke kolam", "ikan-ikan pandai menghilang"] }],
    larik: [{ q: "Larik yang berisi ajakan kepada pembaca adalah …", b: "Ayo, kita jaga sungai bersama" }] },
  { judul: "Buku", bait: [["Buku, kau jendela dunia", "Lewat halamanmu aku berkelana", "Ke gunung, laut, dan negeri jauh", "Tanpa harus melangkahkan kaki"]],
    tema: { b: "manfaat membaca buku", s: ["keindahan pantai", "kebersihan kelas", "kerja keras ayah", "suasana pagi hari"] },
    rasa: { b: "senang dan gemar membaca", s: ["bosan membaca buku", "takut pergi jauh", "sedih karena bukunya hilang", "marah kepada buku"] },
    makna: [{ l: "Buku, kau jendela dunia", b: "buku membuka pengetahuan tentang berbagai hal di dunia", s: ["buku dapat dipakai sebagai jendela", "buku berbentuk seperti jendela", "buku disimpan di dekat jendela", "dunia hanya selebar jendela"] },
      { l: "Lewat halamanmu aku berkelana", b: "dengan membaca, penyair seolah-olah bepergian ke banyak tempat", s: ["penyair berjalan di atas halaman buku", "penyair tersesat di perpustakaan", "penyair pergi ke halaman rumah", "penyair menulis buku perjalanan"] }],
    larik: [{ q: "Larik yang menunjukkan penyair tidak perlu bepergian sungguhan adalah …", b: "Tanpa harus melangkahkan kaki" }] },
  { judul: "Pagi", bait: [["Ayam berkokok membangunkanku", "Mentari tersenyum di ufuk timur", "Embun berkilau di ujung daun", "Selamat pagi, hari yang baru"]],
    tema: { b: "suasana pagi hari", s: ["kesedihan berpisah dengan sahabat", "jasa pahlawan", "bahaya banjir", "keramaian pasar malam"] },
    rasa: { b: "gembira dan bersemangat menyambut pagi", s: ["malas dan mengantuk", "takut dan cemas", "sedih dan kesepian", "marah dan kesal"] },
    makna: [{ l: "Mentari tersenyum di ufuk timur", b: "matahari terbit dengan cerah", s: ["matahari terbenam di barat", "matahari tertutup awan gelap", "matahari dapat tersenyum seperti manusia", "hari sudah siang dan panas"] }],
    larik: [{ q: "Larik yang menunjukkan penyair dibangunkan oleh suara hewan adalah …", b: "Ayam berkokok membangunkanku" }] },
  { judul: "Nenek", bait: [["Rambut nenek putih seperti kapas", "Ceritanya merdu menjelang tidur", "Pelukannya hangat menenangkan", "Aku rindu saat jauh darinya"]],
    tema: { b: "kasih sayang nenek", s: ["keindahan kupu-kupu", "manfaat buku", "kebersihan sungai", "perjuangan pahlawan"] },
    rasa: { b: "sayang dan rindu kepada nenek", s: ["takut kepada nenek", "kesal kepada nenek", "bosan mendengar cerita nenek", "kecewa kepada nenek"] },
    makna: [{ l: "Rambut nenek putih seperti kapas", b: "rambut nenek sudah beruban", s: ["nenek memakai topi dari kapas", "nenek menjual kapas", "rambut nenek terkena cat putih", "nenek baru saja keramas"] }],
    larik: [{ q: "Larik yang menunjukkan kebiasaan nenek sebelum penyair tidur adalah …", b: "Ceritanya merdu menjelang tidur" }] },
  { judul: "Cita-Citaku", bait: [["Aku ingin menjadi dokter", "Menolong orang yang sakit", "Mulai hari ini aku belajar", "Agar cita-citaku tercapai"]],
    tema: { b: "cita-cita", s: ["keindahan alam", "kasih sayang ibu", "kebersihan kelas", "suasana malam"] },
    rasa: { b: "bersemangat meraih cita-cita", s: ["putus asa dan malas", "takut kepada dokter", "sedih karena sakit", "bosan bersekolah"] },
    makna: [{ l: "Mulai hari ini aku belajar", b: "penyair bersungguh-sungguh berusaha sejak sekarang", s: ["penyair baru pertama kali bersekolah", "penyair belajar hanya hari ini saja", "penyair menunda belajar", "penyair belajar menjadi guru"] }],
    larik: [{ q: "Larik yang menunjukkan alasan penyair ingin menjadi dokter adalah …", b: "Menolong orang yang sakit" }] },
  { judul: "Laut", bait: [["Ombak berkejaran di tepi pantai", "Pasir putih berkilau disinari mentari", "Nelayan berlayar menebar jala", "Laut memberi rezeki bagi kami"]],
    tema: { b: "keindahan dan manfaat laut", s: ["kasih sayang nenek", "kebersihan kelas", "cita-cita menjadi dokter", "suasana sekolah"] },
    rasa: { b: "kagum dan bersyukur atas laut", s: ["takut dan benci kepada laut", "sedih karena laut kotor", "bosan tinggal di pantai", "kesal kepada nelayan"] },
    makna: [{ l: "Ombak berkejaran di tepi pantai", b: "ombak datang susul-menyusul ke pantai", s: ["anak-anak bermain kejar-kejaran", "ombak sedang berlomba lari", "pantai itu sepi tanpa ombak", "ombak menghancurkan pantai"] },
      { l: "Laut memberi rezeki bagi kami", b: "laut menjadi sumber penghidupan, misalnya ikan bagi nelayan", s: ["laut memberi hadiah uang", "warga mendapat rezeki dari toko", "laut itu milik penyair", "nelayan tidak pernah mendapat ikan"] }],
    larik: [{ q: "Larik yang menggambarkan pekerjaan nelayan adalah …", b: "Nelayan berlayar menebar jala" }] },
];
/* Level 1–5 memakai puisi pendek; level 4 ke atas memakai semua puisi */
const PUISI_SEMUA = [...PUISI, ...PUISI_MINI];
const puisiL = L => pilih(L <= 3 ? PUISI_MINI : PUISI_SEMUA);
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
  const p = puisiL(L);
  return pgL("Tema puisi tersebut adalah …", p.tema.b, p.tema.s, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Puisi “${p.judul}” bertema ${p.tema.b}.` });
}
function soalPuisiRasa(L) {
  const p = puisiL(L);
  return pgL("Perasaan penyair dalam puisi tersebut adalah …", p.rasa.b, p.rasa.s, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Penyair merasa ${p.rasa.b}.` });
}
function soalPuisiMakna(L) {
  const p = puisiL(L), m = pilih(p.makna);
  return pgL(`Makna larik “<i>${m.l}</i>” adalah …`, m.b, m.s, L, { bacaan: puisiHtml(p), petunjuk: "Larik puisi sering memakai kiasan. Pikirkan maksudnya, bukan arti kata per kata.", bahas: `“${m.l}” bermakna ${m.b}.` });
}
function soalPuisiLarik(L) {
  const p = puisiL(L), x = pilih(p.larik), semua = p.bait.flat().filter(l => l !== x.b);
  return pgL(x.q, x.b, semua, L, { bacaan: puisiHtml(p), petunjuk: PTK_PUISI, bahas: `Larik yang tepat: “${x.b}”.` });
}
function soalPuisiBS(L) {
  const p = puisiL(L), m = pilih(p.makna), nilai = campurBS(L >= 9 ? 4 : 3), x = pilih(p.larik);
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
  1: [() => soalAmanatMini(1), () => soalAmanatMini(1), () => soalJudulMini(1), () => soalTiruMini(1), () => soalAmanat(1)],
  2: [() => soalAmanatMini(2), () => soalJudulMini(2), () => soalTiruMini(2), () => soalAmanat(2), () => soalPuisiTema(2)],
  3: [() => soalAmanatMini(3), () => soalJudulMini(3), () => soalTiruMini(3), () => soalAmanat(3), () => soalJudul(3), () => soalPuisiTema(3), () => soalPuisiRasa(3)],
  4: [() => soalAmanat(4), () => soalAmanatMini(4), () => soalTiruMini(4), () => soalJudul(4), () => soalJudulMini(4), () => soalPuisiTema(4), () => soalPuisiMakna(4)],
  5: [() => soalJudul(5), () => soalJudulMini(5), () => soalTiruMini(5), () => soalPuisiTema(5), () => soalPuisiRasa(5), () => soalPuisiMakna(5)], 6: [() => soalPuisiMakna(6), () => soalPuisiTema(6), () => soalAmanat(6)],
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
  return cariOpini ? pgL("Kalimat berikut yang merupakan <b>opini</b> adalah …", pilih(SEMUA_OPINI), ambil(SEMUA_FAKTA, 4).map(kalimatK), L, { petunjuk: PTK_FO, bahas: "Kalimat itu berisi pendapat yang tidak dapat dibuktikan benar atau salahnya." })
    : pgL("Kalimat berikut yang merupakan <b>fakta</b> adalah …", kalimatK(pilih(SEMUA_FAKTA)), ambil(SEMUA_OPINI, 4), L, { petunjuk: PTK_FO, bahas: "Kalimat itu dapat dibuktikan kebenarannya." });
}
/* Paragraf berisi fakta (f) dan opini (o) */
const FO_PARAGRAF = [
  [["Taman Kota Harapan dibuka pada tahun 2019.", "f"], ["Luas taman itu sekitar dua hektare.", "f"], ["Menurut saya, taman itu adalah tempat terbaik untuk bersantai.", "o"], ["Di sana terdapat kolam ikan dan taman bermain anak.", "f"], ["Taman itu buka setiap hari mulai pukul 06.00.", "f"]],
  [["Pentas seni sekolah diadakan pada hari Sabtu.", "f"], ["Acara itu dihadiri oleh sekitar dua ratus orang tua siswa.", "f"], ["Penampilan tari kelas lima sangat memukau.", "o"], ["Setiap kelas menampilkan satu pertunjukan.", "f"], ["Acara terbaik tahun ini tentu saja drama kelas enam.", "o"]],
  [["Pasar buah itu terletak di dekat terminal.", "f"], ["Pasar itu buka sejak pukul lima pagi.", "f"], ["Buah di pasar itu pasti lebih segar daripada buah di toko.", "o"], ["Harga mangga di sana Rp15.000 per kilogram.", "f"]],
  [["Bersepeda ke sekolah tidak menghasilkan asap kendaraan.", "f"], ["Bersepeda adalah cara paling menyenangkan untuk berangkat sekolah.", "o"], ["Di sekolah kami tersedia tempat parkir sepeda.", "f"], ["Sebaiknya semua siswa bersepeda ke sekolah.", "o"], ["Setiap pagi, sekitar tiga puluh siswa datang dengan sepeda.", "f"]],
  [["Buku cerita itu terdiri atas dua belas bab.", "f"], ["Buku itu ditulis oleh seorang guru SD.", "f"], ["Ceritanya sangat seru dan membuat penasaran.", "o"], ["Buku itu sudah dicetak ulang sebanyak tiga kali.", "f"], ["Semua anak pasti suka membaca buku itu.", "o"]],
  [["Kebun sekolah kami ditanami cabai, tomat, dan bayam.", "f"], ["Siswa kelas empat bertugas menyiram tanaman setiap pagi.", "f"], ["Tomat dari kebun sekolah rasanya paling manis.", "o"], ["Hasil panen dijual di koperasi sekolah.", "f"]],
  [["Kolam renang di kota kami dibuka pada tahun 2020.", "f"], ["Panjang kolam itu 25 meter.", "f"], ["Kolam renang itu buka setiap hari kecuali hari Senin.", "f"], ["Menurut saya, berenang di sana sangat menyenangkan.", "o"], ["Harga tiket masuknya Rp8.000 untuk anak-anak.", "f"]],
  [["Kantin sekolah kami menjual nasi uduk, bakwan, dan jus buah.", "f"], ["Kantin itu buka mulai pukul 07.00.", "f"], ["Nasi uduk di kantin itu adalah makanan yang paling enak.", "o"], ["Setiap hari, kantin dibersihkan oleh dua orang petugas.", "f"]],
  [["Lomba mewarnai di balai desa diikuti oleh 50 anak.", "f"], ["Setiap peserta mendapat selembar gambar dan satu kotak krayon.", "f"], ["Gambar yang paling bagus tentu saja milik adikku.", "o"], ["Pemenang lomba diumumkan pukul 11.00.", "f"]],
  [["Pohon mangga di halaman rumah kakek berumur sepuluh tahun.", "f"], ["Setiap musim panen, pohon itu menghasilkan ratusan buah.", "f"], ["Buahnya pasti lebih manis daripada mangga di pasar.", "o"], ["Kakek membagikan sebagian mangga kepada tetangga.", "f"]],
  [["Hari Minggu lalu, warga RW 03 mengadakan kerja bakti.", "f"], ["Kerja bakti dimulai pukul 06.30.", "f"], ["Warga membersihkan selokan dan memangkas rumput liar.", "f"], ["Sebaiknya kerja bakti diadakan setiap minggu.", "o"]],
  [["Perpustakaan keliling datang ke desa kami setiap hari Rabu.", "f"], ["Mobil perpustakaan itu membawa sekitar lima ratus buku.", "f"], ["Anak-anak boleh meminjam dua buku selama satu minggu.", "f"], ["Saya rasa perpustakaan keliling adalah program terbaik di desa kami.", "o"]],
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
/* ---------- Bentuk tambahan untuk level awal ---------- */
/* Fakta tambahan yang mudah dibuktikan */
const FAKTA_B = [
  "Satu tahun terdiri atas dua belas bulan.", "Lagu kebangsaan Indonesia berjudul Indonesia Raya.", "Ibu kota Provinsi Jawa Barat adalah Bandung.",
  "Pulau Jawa terletak di antara Pulau Sumatra dan Pulau Bali.", "Sapi termasuk hewan pemakan tumbuhan.", "Upacara bendera di sekolah kami dilaksanakan setiap hari Senin.",
  "Rumah Gadang adalah rumah adat dari Sumatra Barat.", "Matahari terbit di sebelah timur.",
  () => `Perpustakaan sekolah memiliki ${acak(3, 9)} rak buku.`, () => `Kakak membeli ${acak(2, 6)} buku tulis di koperasi sekolah.`,
  () => `Lomba lari dimulai pukul ${pilih(JAM_PAGI)}.`, () => `${nama()} lahir pada tanggal ${acak(1, 28)} ${pilih(BULAN)}.`,
];
/* Opini dengan satu kata penanda. w = kata penanda, s = kata lain dari kalimat itu (bukan penanda opini) */
const OPINI_P = [
  { t: "Menurut saya, perpustakaan baru itu nyaman untuk belajar.", w: "menurut saya", s: ["perpustakaan", "baru", "belajar"] },
  { t: "Sebaiknya kamu membawa payung karena langit mendung.", w: "sebaiknya", s: ["membawa", "payung", "langit"] },
  { t: "Es krim cokelat adalah es krim paling lezat.", w: "paling", s: ["es krim", "cokelat", "adalah"] },
  { t: "Saya rasa tim kelas lima akan menang besok.", w: "saya rasa", s: ["tim", "kelas lima", "besok"] },
  { t: "Sepertinya adik lebih suka bermain di taman.", w: "sepertinya", s: ["adik", "bermain", "taman"] },
  { t: "Pertunjukan wayang tadi malam sangat mengagumkan.", w: "sangat", s: ["pertunjukan", "wayang", "tadi malam"] },
  { t: "Seharusnya taman kota dibuka sampai malam.", w: "seharusnya", s: ["taman", "kota", "dibuka"] },
  { t: "Kue lapis buatan Bu Ratna pasti disukai semua tamu.", w: "pasti", s: ["kue lapis", "buatan", "tamu"] },
  { t: "Saya yakin kebun sekolah akan panen bulan depan.", w: "saya yakin", s: ["kebun", "panen", "bulan depan"] },
  { t: "Saya kira hujan akan reda sebentar lagi.", w: "saya kira", s: ["hujan", "reda", "lagi"] },
  { t: "Sebaiknya sampah plastik dipisahkan dari sampah daun.", w: "sebaiknya", s: ["sampah", "plastik", "daun"] },
  { t: "Gunung Bromo adalah tempat wisata paling indah di Jawa Timur.", w: "paling", s: ["Gunung Bromo", "tempat wisata", "Jawa Timur"] },
  { t: "Menurut kami, lomba kebersihan kelas perlu diadakan setiap bulan.", w: "menurut kami", s: ["lomba", "kelas", "setiap bulan"] },
  { t: "Batik buatan perajin desa itu sangat menawan.", w: "sangat", s: ["batik", "perajin", "desa"] },
  { t: "Seharusnya setiap siswa membawa botol minum sendiri.", w: "seharusnya", s: ["siswa", "botol", "minum"] },
  { t: "Barangkali paman datang terlambat karena jalan macet.", w: "barangkali", s: ["paman", "datang", "jalan"] },
];
const SEMUA_FAKTA = [...FAKTA_K, ...FAKTA_B], SEMUA_OPINI = [...OPINI_K, ...OPINI_P.map(x => x.t)];
const FO_ALASAN = { f: "fakta, karena dapat dibuktikan kebenarannya", o: "opini, karena berisi pendapat seseorang", f2: "fakta, karena berisi pendapat seseorang", o2: "opini, karena dapat dibuktikan kebenarannya" };
/* Satu kalimat: fakta atau opini? */
function soalFOSatu(L) {
  const fakta = ya(), kal = fakta ? kalimatK(pilih(SEMUA_FAKTA)) : pilih(SEMUA_OPINI);
  return pgWajib("Kalimat tersebut termasuk …", fakta ? FO_ALASAN.f : FO_ALASAN.o, [fakta ? FO_ALASAN.o : FO_ALASAN.f], [FO_ALASAN.f2, FO_ALASAN.o2], L,
    { bacaan: `<p>${kal}</p>`, petunjuk: PTK_FO, bahas: fakta ? "Kalimat itu dapat dibuktikan kebenarannya, jadi termasuk <b>fakta</b>." : "Kalimat itu berisi pendapat atau perasaan seseorang, jadi termasuk <b>opini</b>." });
}
function soalPenanda(L) {
  const e = pilih(OPINI_P);
  return pgL("Kata yang menunjukkan bahwa kalimat tersebut merupakan <b>opini</b> adalah …", e.w, e.s, L,
    { bacaan: `<p>${e.t}</p>`, petunjuk: PTK_FO, bahas: `Kata <b>${e.w}</b> menunjukkan pendapat seseorang.` });
}
/* Teks pendek untuk jenis & tujuan teks. j = kunci TUJUAN. kal (iklan/poster): [kalimat, jenis] —
   f = fakta, o = opini, a = ajakan (tepat satu), t = pertanyaan, x = kalimat lain */
const IKLAN_B = [
  { judul: "Roti Gembul", kal: [["Perutmu lapar saat jam istirahat?", "t"], ["Roti Gembul berisi selai nanas atau cokelat.", "f"], ["Setiap bungkus berisi dua potong roti.", "f"], ["Harganya Rp3.000 per bungkus.", "f"], ["Rasanya paling enak di antara roti lainnya.", "o"], ["Kamu pasti ketagihan setelah mencobanya.", "o"], ["Ayo, beli Roti Gembul di kantin sekolahmu!", "a"]] },
  { judul: "Tas Sekolah Kancil", kal: [["Tas Sekolah Kancil terbuat dari kain tahan air.", "f"], ["Tas ini memiliki tiga kantong dan dua tali bahu.", "f"], ["Tersedia warna merah, biru, dan hijau.", "f"], ["Modelnya sangat keren.", "o"], ["Tas ini adalah tas sekolah terbaik untukmu.", "o"], ["Segera dapatkan Tas Kancil di toko perlengkapan sekolah terdekat!", "a"]] },
  { judul: "Pensil Warna Pelangi", kal: [["Satu kotak Pensil Warna Pelangi berisi 24 warna.", "f"], ["Setiap pensil sudah diraut dan siap dipakai.", "f"], ["Harga satu kotak Rp25.000.", "f"], ["Warnanya sangat cerah dan indah.", "o"], ["Gambarmu pasti menjadi lebih bagus.", "o"], ["Ayo, beli Pensil Warna Pelangi sekarang juga!", "a"]] },
  { judul: "Sabun Segar Wangi", kal: [["Sabun Segar Wangi mengandung ekstrak daun sirih.", "f"], ["Berat setiap batang sabun 80 gram.", "f"], ["Sabun ini dijual di warung dan pasar swalayan.", "f"], ["Aromanya paling harum.", "o"], ["Kulitmu pasti terasa lebih segar.", "o"], ["Pakailah Sabun Segar Wangi setiap kali mandi!", "a"]] },
  { judul: "Kebun Stroberi Bukit Hijau", kal: [["Kebun Stroberi Bukit Hijau buka setiap hari pukul 08.00–16.00.", "f"], ["Pengunjung boleh memetik stroberi sendiri.", "f"], ["Tiket masuknya Rp10.000 per orang.", "f"], ["Pemandangannya sangat sejuk dan memanjakan mata.", "o"], ["Liburan di sini pasti tidak terlupakan.", "o"], ["Ajaklah keluargamu berlibur ke Kebun Stroberi Bukit Hijau!", "a"]] },
  { judul: "Susu Kedelai Sehat", kal: [["Susu Kedelai Sehat dibuat dari kacang kedelai pilihan.", "f"], ["Setiap botol berisi 200 mililiter.", "f"], ["Tersedia rasa asli dan rasa cokelat.", "f"], ["Rasanya sangat lezat dan menyegarkan.", "o"], ["Minuman ini paling cocok untuk sarapan.", "o"], ["Minumlah Susu Kedelai Sehat setiap pagi!", "a"]] },
];
const POSTER_B = [
  { judul: "KELAS BERSIH, BELAJAR NYAMAN", kal: [["Debu dan sampah dapat menjadi sarang kuman.", "x"], ["Kelas yang kotor membuat kita mudah sakit.", "x"], ["Sampah di kolong meja mengundang semut dan lalat.", "x"], ["Ayo, laksanakan piket sesuai jadwal!", "a"]] },
  { judul: "LISTRIK UNTUK MASA DEPAN", kal: [["Banyak lampu menyala pada siang hari tanpa digunakan.", "x"], ["Listrik yang terbuang membuat biaya menjadi mahal.", "x"], ["Sebagian besar listrik dihasilkan dari bahan bakar yang dapat habis.", "x"], ["Ayo, matikan lampu dan kipas angin jika tidak dipakai!", "a"]] },
  { judul: "SEHAT DENGAN SAYUR", kal: [["Sayur dan buah mengandung banyak vitamin.", "x"], ["Vitamin membantu tubuh melawan penyakit.", "x"], ["Wortel, bayam, dan kangkung mudah didapat di pasar.", "x"], ["Ayo, habiskan sayur di piringmu setiap makan!", "a"]] },
  { judul: "TERTIB DI JALAN", kal: [["Setiap pagi banyak kendaraan melintas di depan sekolah.", "x"], ["Menyeberang sembarangan dapat menyebabkan kecelakaan.", "x"], ["Petugas berjaga di depan sekolah setiap pagi.", "x"], ["Ayo, menyeberang di tempat penyeberangan bersama petugas!", "a"]] },
  { judul: "HEWAN JUGA MAKHLUK HIDUP", kal: [["Hewan dapat merasakan sakit dan lapar.", "x"], ["Banyak kucing liar kelaparan di jalan.", "x"], ["Hewan peliharaan membutuhkan makanan, air, dan tempat yang bersih.", "x"], ["Ayo, sayangi hewan dan jangan menyakitinya!", "a"]] },
  { judul: "GIGI SEHAT, SENYUM CERIA", kal: [["Sisa makanan di sela gigi dapat menyebabkan gigi berlubang.", "x"], ["Gigi berlubang terasa sangat sakit.", "x"], ["Gigi susu anak-anak lama-kelamaan diganti oleh gigi tetap.", "x"], ["Ayo, gosok gigi dua kali sehari!", "a"]] },
];
const htmlIklan = e => `<div class="kertas iklan"><h4>${e.judul}</h4><p>${e.kal.map(x => x[0]).join(" ")}</p></div>`;
const htmlPoster = e => `<div class="kertas poster"><h4>${e.judul}</h4><p>${e.kal.map(x => x[0]).join(" ")}</p></div>`;
const PENGUMUMAN_B = [
  ["Diberitahukan kepada seluruh siswa kelas 4 sampai 6 bahwa kegiatan pramuka hari Jumat ini ditiadakan karena lapangan sedang diperbaiki. Kegiatan akan dilanjutkan pada hari Jumat berikutnya.", "Pembina Pramuka"],
  ["Perpustakaan sekolah akan mengadakan lomba bercerita pada tanggal 12 Maret. Pendaftaran dibuka di meja petugas perpustakaan sampai tanggal 10 Maret.", "Petugas Perpustakaan"],
  ["Diberitahukan kepada warga RT 05 bahwa kerja bakti membersihkan selokan akan dilaksanakan pada hari Minggu pukul 07.00. Warga diharap membawa cangkul dan sapu lidi.", "Ketua RT 05"],
  ["Diberitahukan kepada seluruh orang tua siswa bahwa pembagian rapor akan dilaksanakan pada hari Sabtu pukul 08.00 di kelas masing-masing.", "Kepala Sekolah"],
].map(([isi, ttd]) => `<div class="kertas pengumuman"><h4>PENGUMUMAN</h4><p>${isi}</p><p class="ttd">${ttd}</p></div>`);
const PETUNJUK_B = [
  ["Resep Pisang Goreng", "4 buah pisang, 5 sendok makan tepung terigu, air secukupnya, dan sejumput garam", ["Kupas pisang, lalu belah menjadi dua.", "Campur tepung, garam, dan air hingga menjadi adonan.", "Celupkan pisang ke dalam adonan.", "Goreng pisang dalam minyak panas sampai kuning kecokelatan."]],
  ["Resep Es Buah", "semangka, melon, pepaya, sirup, air dingin, dan es batu", ["Potong semangka, melon, dan pepaya kecil-kecil.", "Masukkan potongan buah ke dalam mangkuk.", "Tuangkan sirup dan air dingin.", "Tambahkan es batu, lalu sajikan."]],
  ["Cara Membuat Kartu Ucapan", "kertas karton, pensil warna, dan amplop", ["Lipat kertas karton menjadi dua bagian.", "Gambar hiasan di bagian depan kartu.", "Tulis kalimat ucapan di bagian dalam kartu.", "Masukkan kartu ke dalam amplop."]],
  ["Cara Merawat Tanaman dalam Pot", "gembor berisi air bersih dan pupuk kompos", ["Siram tanah di sekitar batang secara perlahan setiap pagi.", "Jangan menyiram terlalu banyak agar akar tidak busuk.", "Beri pupuk kompos dua minggu sekali.", "Letakkan pot di tempat yang terkena cahaya matahari."]],
].map(([judul, bahan, langkah]) => `<h4>${judul}</h4><p><b>Bahan dan alat:</b> ${bahan}.</p>${daftarBernomor(langkah)}`);
const INFO_B = [
  ["Kelelawar", "Kelelawar adalah hewan menyusui yang dapat terbang. Hewan ini aktif pada malam hari dan tidur pada siang hari dengan tubuh bergantung terbalik. Sebagian kelelawar memakan buah, sedangkan sebagian lainnya memakan serangga."],
  ["Gunung Api", "Indonesia memiliki banyak gunung api. Gunung api dapat meletus dan mengeluarkan lava, abu, serta batu. Tanah di sekitar gunung api biasanya subur sehingga cocok untuk bertani."],
  ["Rumah Gadang", "Rumah Gadang adalah rumah adat masyarakat Minangkabau di Sumatra Barat. Atapnya runcing melengkung seperti tanduk kerbau. Rumah ini berbentuk panggung dan dibuat dari kayu."],
  ["Padi", "Padi adalah tanaman penghasil beras. Padi biasanya ditanam di sawah yang tergenang air. Sekitar tiga sampai empat bulan setelah ditanam, padi siap dipanen."],
].map(([judul, isi]) => `<h4>${judul}</h4><p>${isi}</p>`);
const JENIS_TEKS = { info: "teks informasi", prosedur: "teks petunjuk (prosedur)", fabel: "fabel", iklan: "iklan", pengumuman: "pengumuman", ajakan: "poster ajakan" };
const JENIS_BENTROK = { iklan: ["ajakan"], ajakan: ["iklan"] };
/* Pilih teks pendek beserta jenisnya */
function teksMini() {
  const j = pilih(Object.keys(JENIS_TEKS));
  const h = j === "iklan" ? pilih([...IKLAN_B.map(htmlIklan), ...IKLAN]) : j === "ajakan" ? pilih([...POSTER_B.map(htmlPoster), ...AJAKAN]) : j === "pengumuman" ? pilih(PENGUMUMAN_B)
    : j === "prosedur" ? pilih(PETUNJUK_B) : j === "info" ? pilih(INFO_B) : (k => bacaanHtml(k.judul, [k.t]))(pilih(KISAH_MINI.filter(x => x.jenis === "fabel")));
  return { j, h };
}
function soalJenisMini(L) {
  const { j, h } = teksMini(), salah = Object.keys(JENIS_TEKS).filter(k => k !== j && !(JENIS_BENTROK[j] || []).includes(k)).map(k => JENIS_TEKS[k]);
  return pgL("Teks tersebut termasuk jenis …", JENIS_TEKS[j], salah, L,
    { bacaan: h, petunjuk: "Perhatikan bentuk dan isi teks: menawarkan barang (iklan), memberi kabar kegiatan (pengumuman), berisi langkah (petunjuk), bercerita tentang hewan (fabel), mengajak berbuat baik (poster), atau menjelaskan pengetahuan (teks informasi).", bahas: `Teks itu termasuk <b>${JENIS_TEKS[j]}</b> karena bertujuan ${TUJUAN[j]}.` });
}
function soalTujuanMini(L) {
  const { j, h } = teksMini(), salah = Object.keys(TUJUAN).filter(k => k !== j && !TUJUAN_BENTROK[j].includes(k)).map(k => TUJUAN[k]);
  return pgL("Tujuan teks tersebut adalah …", TUJUAN[j], salah, L,
    { bacaan: h, petunjuk: "Tanyakan: penulis ingin pembaca melakukan apa setelah membaca teks ini?", bahas: `Teks itu (${JENIS_TEKS[j]}) bertujuan ${TUJUAN[j]}.` });
}
function soalAjakan(L) {
  const iklan = ya(), e = pilih(iklan ? IKLAN_B : POSTER_B), aj = e.kal.find(x => x[1] === "a")[0], nm = iklan ? "iklan" : "poster";
  return pgL(`Kalimat <b>ajakan</b> dalam ${nm} tersebut adalah …`, aj, e.kal.filter(x => x[1] !== "a").map(x => x[0]), L,
    { bacaan: iklan ? htmlIklan(e) : htmlPoster(e), petunjuk: "Kalimat ajakan meminta pembaca melakukan sesuatu. Biasanya memakai kata <i>ayo, mari, segera, -lah</i> dan diakhiri tanda seru.", bahas: `Kalimat ajakannya: ${kutip(aj)}` });
}
/* Fakta/opini di dalam iklan */
function soalFOIklan(L) {
  const e = pilih(IKLAN_B), cariOpini = ya(), cocok = e.kal.filter(x => x[1] === (cariOpini ? "o" : "f")).map(x => x[0]);
  const lawan = e.kal.filter(x => (cariOpini ? x[1] === "f" : x[1] === "o" || x[1] === "a")).map(x => x[0]), k = pilih(cocok);
  return pgL(`Kalimat <b>${cariOpini ? "opini" : "fakta"}</b> dalam iklan tersebut adalah …`, k, lawan, L,
    { bacaan: htmlIklan(e), petunjuk: PTK_FO, bahas: `${kutip(k)} ${cariOpini ? "berisi pendapat penulis iklan yang tidak dapat dibuktikan." : "dapat dibuktikan kebenarannya."}` });
}
daftarMisi("nal", "bi9", "Fakta, opini & tujuan teks", "⚖️", {
  1: [() => soalCariOpini(1), () => soalFOSatu(1), () => soalPenanda(1), () => soalJenisMini(1), () => soalTujuanMini(1), () => soalAjakan(1)],
  2: [() => soalCariOpini(2), () => soalFOSatu(2), () => soalPenanda(2), () => soalJenisMini(2), () => soalTujuanMini(2), () => soalAjakan(2)],
  3: [() => soalCariOpini(3), () => soalFOSatu(3), () => soalPenanda(3), () => soalJenisMini(3), () => soalTujuanMini(3), () => soalAjakan(3), () => soalFOIklan(3)],
  4: [() => soalFOParagraf(4), () => soalCariOpini(4), () => soalFOIklan(4), () => soalJenisMini(4), () => soalTujuanMini(4), () => soalAjakan(4), () => soalPenanda(4)],
  5: [() => soalFOParagraf(5), () => soalTujuan(5), () => soalFOIklan(5), () => soalJenisMini(5), () => soalPenanda(5), () => soalFOSatu(5)], 6: [() => soalTujuan(6), () => soalFOParagraf(6)], 7: [() => soalTujuan(7), () => soalFOParagraf(7), () => soalBandingHewan(7)],
  8: [() => soalBandingHewan(8), () => soalFOParagraf(8), () => soalTujuan(8)], 9: [() => soalBandingHewan(9), () => soalBandingBS(9), () => soalFOParagraf(9)],
  10: [() => soalBandingBS(10), () => soalBandingHewan(10), () => soalTujuan(10)],
});
