/* Pulau Bahasa Indonesia · Pos 2 — Jurus Memahami */
"use strict";

/* ================= Misi: Makna kata ================= */
/* Sinonim/antonim. Tidak ada dua entri yang maknanya berdekatan, supaya pengecoh pasti salah;
   x = kata yang tidak boleh menjadi pengecoh karena bisa dianggap benar. */
const SINO = [
  { k: "gembira", sin: "senang", ant: "sedih", kal: "Adik sangat <b>gembira</b> menerima hadiah dari kakek." },
  { k: "rajin", sin: "tekun", ant: "malas", kal: "Dina <b>rajin</b> mengerjakan tugas sekolah." },
  { k: "cepat", sin: "lekas", ant: "lambat", kal: "Kakak berjalan <b>cepat</b> agar tidak terlambat." },
  { k: "kuat", sin: "kokoh", ant: "lemah", kal: "Jembatan itu dibangun dengan tiang yang <b>kuat</b>." },
  { k: "mudah", sin: "gampang", ant: "sulit", kal: "Soal latihan hari ini <b>mudah</b> dikerjakan." },
  { k: "benar", sin: "betul", ant: "salah", kal: "Jawaban Raka semuanya <b>benar</b>." },
  { k: "sepi", sin: "sunyi", ant: "ramai", kal: "Jalan di desa itu <b>sepi</b> pada malam hari." },
  { k: "pelit", sin: "kikir", ant: "dermawan", x: ["boros", "hemat", "irit"], kal: "Tokoh dalam dongeng itu sangat <b>pelit</b> kepada tetangganya." },
  { k: "hemat", sin: "irit", ant: "boros", x: ["dermawan", "pelit", "kikir"], kal: "Ibu selalu <b>hemat</b> saat berbelanja." },
  { k: "awal", sin: "permulaan", ant: "akhir", kal: "Pada <b>awal</b> cerita, tokoh itu tinggal di sebuah desa." },
  { k: "lezat", sin: "enak", ant: "hambar", kal: "Nenek memasak sayur asam yang <b>lezat</b>." },
  { k: "sahabat", sin: "kawan", ant: "musuh", kal: "Rani dan Tasya sudah lama menjadi <b>sahabat</b>." },
  { k: "lelah", sin: "letih", ant: "bugar", kal: "Setelah bermain bola, Bayu merasa <b>lelah</b>." },
  { k: "untung", sin: "laba", ant: "rugi", kal: "Pedagang itu mendapat <b>untung</b> besar hari ini." },
  { k: "teliti", sin: "cermat", ant: "ceroboh", kal: "Periksalah jawabanmu dengan <b>teliti</b>." },
  { k: "sombong", sin: "angkuh", ant: "rendah hati", kal: "Kelinci dalam dongeng itu sangat <b>sombong</b>." },
  { k: "kecil", sin: "mungil", ant: "besar", kal: "Adik memelihara seekor kucing <b>kecil</b>." },
  { k: "luas", sin: "lapang", ant: "sempit", kal: "Lapangan sekolah kami sangat <b>luas</b>." },
  { k: "pintar", sin: "cerdas", ant: "bodoh", kal: "Ilham anak yang <b>pintar</b> dan suka membaca." },
  { k: "indah", sin: "elok", ant: "buruk", kal: "Pemandangan di puncak bukit itu sangat <b>indah</b>." },
  { k: "tiba", sin: "sampai", ant: "berangkat", kal: "Kereta itu <b>tiba</b> di stasiun pukul delapan." },
  { k: "membantu", sin: "menolong", kal: "Kita harus <b>membantu</b> teman yang sedang kesulitan." },
  { k: "hampir", sin: "nyaris", kal: "Gelas itu <b>hampir</b> jatuh dari meja." },
  { k: "wajah", sin: "muka", kal: "<b>Wajah</b> adik tampak ceria pagi ini." },
  { k: "pakaian", sin: "busana", kal: "Para penari memakai <b>pakaian</b> adat yang indah." },
  { k: "berusaha", sin: "berupaya", kal: "Fajar <b>berusaha</b> keras agar lolos seleksi." },
  { k: "naik", ant: "turun", kal: "Kami <b>naik</b> tangga ke lantai dua." },
  { k: "terang", ant: "gelap", kal: "Lampu kamar itu sangat <b>terang</b>." },
  { k: "jauh", ant: "dekat", kal: "Rumah Joko <b>jauh</b> dari sekolah." },
  { k: "membeli", ant: "menjual", kal: "Ayah <b>membeli</b> sayur di pasar." },
  { k: "tua", ant: "muda", kal: "Pohon beringin itu sudah sangat <b>tua</b>." },
  { k: "maju", ant: "mundur", kal: "Barisan regu itu bergerak <b>maju</b>." },
  { k: "jujur", ant: "curang", kal: "Pemain itu bertanding dengan <b>jujur</b>." },
  { k: "banyak", ant: "sedikit", kal: "Pengunjung pameran hari ini sangat <b>banyak</b>." },
  { k: "berani", ant: "takut", kal: "Dimas <b>berani</b> tampil di depan kelas." },
];
function soalSinonim(L) {
  const e = pilih(SINO.filter(x => x.sin)), lain = SINO.filter(x => x !== e).flatMap(x => [x.sin, x.k]).filter(x => x && !(e.x || []).includes(x));
  return pgWajib(`Kata yang <b>sama</b> artinya dengan kata <b>${e.k}</b> adalah …`, e.sin, e.ant ? [e.ant] : [], lain, L,
    { bacaan: `<p>${e.kal}</p>`, petunjuk: "Ganti kata yang ditebalkan dengan pilihan jawaban. Pilih yang artinya tetap sama.", bahas: `<b>${e.k}</b> = <b>${e.sin}</b>.${e.ant ? ` Lawan katanya <b>${e.ant}</b>.` : ""}` });
}
function soalAntonim(L) {
  const e = pilih(SINO.filter(x => x.ant)), lain = SINO.filter(x => x !== e).flatMap(x => [x.ant, x.k]).filter(x => x && !(e.x || []).includes(x));
  return pgWajib(`<b>Lawan kata</b> dari kata <b>${e.k}</b> adalah …`, e.ant, e.sin ? [e.sin] : [], lain, L,
    { bacaan: `<p>${e.kal}</p>`, petunjuk: "Lawan kata artinya berkebalikan. Contoh: panas ↔ dingin.", bahas: `Lawan kata <b>${e.k}</b> adalah <b>${e.ant}</b>.${e.sin ? ` Persamaan katanya <b>${e.sin}</b>.` : ""}` });
}

/* Makna kata dalam kalimat. g = kelompok makna berdekatan, x = kata yang juga bisa masuk ke kalimat rumpangnya */
const MAKNA = [
  { k: "tekun", m: "rajin dan bersungguh-sungguh", g: "usaha", kal: "Berkat <b>tekun</b> berlatih setiap hari, Dina akhirnya mahir bermain angklung." },
  { k: "lapuk", m: "rusak dan rapuh karena sudah lama", kal: "Kayu jembatan itu sudah <b>lapuk</b> sehingga berbahaya dilewati.", x: ["curam"] },
  { k: "lestari", m: "tetap terjaga seperti keadaan semula", kal: "Kita harus menjaga hutan agar tetap <b>lestari</b>.", x: ["rimbun", "jernih"] },
  { k: "melimpah", m: "sangat banyak", kal: "Hasil panen padi tahun ini <b>melimpah</b>." },
  { k: "tandus", m: "kering dan tidak subur", kal: "Tanah di daerah itu <b>tandus</b> sehingga sulit ditanami.", x: ["curam", "lapuk"] },
  { k: "waspada", m: "berhati-hati dan siap siaga", kal: "Kita harus <b>waspada</b> saat menyeberang jalan.", x: ["sigap"] },
  { k: "terampil", m: "cakap dan cekatan dalam mengerjakan sesuatu", g: "cakap", kal: "Para perajin itu sangat <b>terampil</b> membuat anyaman bambu.", x: ["tekun", "telaten", "gigih"] },
  { k: "sigap", m: "cepat dan tangkas bertindak", g: "cakap", kal: "Petugas pemadam kebakaran <b>sigap</b> memadamkan api.", x: ["gigih", "tekun", "tangguh"] },
  { k: "lalai", m: "kurang hati-hati sehingga lupa akan kewajibannya", kal: "Karena <b>lalai</b>, ia lupa mematikan keran air.", x: ["tergesa-gesa", "cemas"] },
  { k: "gigih", m: "tetap berusaha dan tidak mudah menyerah", g: "usaha", kal: "Para pahlawan berjuang dengan <b>gigih</b> melawan penjajah.", x: ["tangguh"] },
  { k: "sederhana", m: "tidak berlebihan", kal: "Rumah nenek <b>sederhana</b>, tetapi bersih dan nyaman.", x: ["lapuk"] },
  { k: "cemas", m: "khawatir dan gelisah", kal: "Ibu <b>cemas</b> karena adik belum pulang.", x: ["lesu"] },
  { k: "takjub", m: "sangat kagum dan heran", kal: "Wisatawan <b>takjub</b> melihat megahnya Candi Borobudur." },
  { k: "jenaka", m: "lucu dan membuat orang tertawa", kal: "Pelawak itu menceritakan kisah yang <b>jenaka</b>." },
  { k: "rimbun", m: "lebat daunnya", kal: "Kami berteduh di bawah pohon beringin yang <b>rimbun</b>.", x: ["lapuk", "tangguh"] },
  { k: "curam", m: "sangat terjal dan hampir tegak", kal: "Jalan menuju puncak bukit itu sangat <b>curam</b>.", x: ["hening"] },
  { k: "punah", m: "habis sama sekali dan tidak ada keturunannya lagi", kal: "Dinosaurus sudah <b>punah</b> jutaan tahun yang lalu." },
  { k: "lantang", m: "keras dan jelas (tentang suara)", kal: "Ketua kelas membacakan teks Pancasila dengan suara <b>lantang</b>.", x: ["jenaka"] },
  { k: "mengamati", m: "memperhatikan dengan teliti", kal: "Siswa <b>mengamati</b> pertumbuhan biji kacang hijau setiap hari." },
  { k: "hening", m: "sunyi sekali", kal: "Suasana kelas <b>hening</b> saat ujian berlangsung." },
  { k: "jernih", m: "bening dan tidak keruh", kal: "Air sungai di desa itu sangat <b>jernih</b>.", x: ["hening", "curam"] },
  { k: "polusi", m: "pencemaran", kal: "Asap kendaraan menyebabkan <b>polusi</b> udara." },
  { k: "telaten", m: "sabar dan tekun mengerjakan sesuatu", g: "usaha", kal: "Nenek <b>telaten</b> merawat tanaman anggreknya.", x: ["sigap", "terampil"] },
  { k: "semarak", m: "meriah", kal: "Perayaan tujuh belasan di kampung kami sangat <b>semarak</b>.", x: ["jenaka"] },
  { k: "lesu", m: "lemah dan tidak bersemangat", kal: "Karena belum sarapan, Fajar terlihat <b>lesu</b>.", x: ["cemas"] },
  { k: "tergesa-gesa", m: "terburu-buru", kal: "Karena bangun kesiangan, Joko berangkat dengan <b>tergesa-gesa</b>.", x: ["lesu", "cemas"] },
  { k: "mengungsi", m: "pindah ke tempat yang lebih aman", kal: "Warga <b>mengungsi</b> ke balai desa karena banjir." },
  { k: "dermawan", m: "suka memberi kepada orang lain", kal: "Pak Hasan dikenal <b>dermawan</b> karena sering membantu tetangga." },
  { k: "kemarau", m: "musim tanpa hujan", kal: "Pada musim <b>kemarau</b>, sumur warga mulai kering." },
  { k: "tangguh", m: "kuat dan tidak mudah dikalahkan", kal: "Tim voli sekolah kami sangat <b>tangguh</b>.", x: ["terampil", "sigap", "gigih"] },
];
const maknaLain = e => MAKNA.filter(x => x !== e && (!e.g || x.g !== e.g));
function soalMakna(L) {
  const e = pilih(MAKNA);
  return pgL(`Makna kata <b>${e.k}</b> pada kalimat tersebut adalah …`, e.m, maknaLain(e).map(x => x.m), L,
    { bacaan: `<p>${e.kal}</p>`, petunjuk: "Baca seluruh kalimat. Kata-kata di sekitarnya memberi petunjuk arti kata yang ditebalkan.", bahas: `<b>${e.k}</b> berarti ${e.m}.` });
}
function soalRumpang(L) {
  const e = pilih(MAKNA), salah = maknaLain(e).filter(x => !(e.x || []).includes(x.k)).map(x => x.k);
  return pgL("Kata yang tepat untuk melengkapi kalimat tersebut adalah …", e.k, salah, L,
    { bacaan: `<p>${e.kal.replace(/<b>.*?<\/b>/, "….")}</p>`, petunjuk: "Coba masukkan setiap pilihan ke dalam kalimat. Pilih yang paling masuk akal.", bahas: `${e.kal} (<b>${e.k}</b> = ${e.m})` });
}
function soalMaknaBS(L) {
  const es = ambil(MAKNA, L >= 8 ? 4 : 3), nilai = campurBS(es.length);
  const butir = es.map((e, i) => ({ t: `<b>${e.k}</b> berarti “${nilai[i] ? e.m : pilih(maknaLain(e)).m}”`, b: nilai[i] }));
  const bahas = es.map(e => `<b>${e.k}</b> = ${e.m}`).join("<br>");
  return ya() ? bs("Tentukan <b>Benar</b> atau <b>Salah</b> pasangan kata dan maknanya berikut.", butir, { bahas }) : pgk("Pilih <b>semua</b> pasangan kata dan makna yang tepat.", butir, { bahas });
}

/* Kata bermakna ganda: dua kalimat untuk setiap kata */
const GANDA = [
  { k: "bisa", m: [["Ular kobra memiliki <b>bisa</b> yang berbahaya.", "racun"], ["Adik sudah <b>bisa</b> membaca.", "mampu"]] },
  { k: "genting", m: [["Hujan deras membuat <b>genting</b> rumah kami bocor.", "atap rumah dari tanah liat"], ["Keadaan menjadi <b>genting</b> ketika air sungai meluap.", "gawat dan berbahaya"]] },
  { k: "buku", m: [["<b>Buku</b> jari kakek terasa sakit saat cuaca dingin.", "ruas atau sendi pada jari"], ["Rani meminjam <b>buku</b> cerita di perpustakaan.", "lembaran kertas berjilid untuk dibaca"]] },
  { k: "kali", m: [["Anak-anak memancing ikan di <b>kali</b> dekat sawah.", "sungai"], ["Tim kami sudah tiga <b>kali</b> menjadi juara.", "kata untuk menyatakan banyaknya kejadian"]] },
  { k: "rapat", m: [["Para guru sedang <b>rapat</b> di ruang kepala sekolah.", "pertemuan untuk membicarakan sesuatu"], ["Tutup toples itu dengan <b>rapat</b> agar kue tidak melempem.", "tertutup tanpa celah"]] },
  { k: "bulan", m: [["<b>Bulan</b> bersinar terang malam itu.", "benda langit yang tampak bersinar pada malam hari"], ["Liburan sekolah berlangsung selama satu <b>bulan</b>.", "satuan waktu sekitar tiga puluh hari"]] },
  { k: "kepala", m: [["<b>Kepala</b> desa meresmikan jembatan baru.", "pemimpin"], ["Topi itu terlalu kecil untuk <b>kepala</b> Bayu.", "bagian tubuh paling atas"]] },
  { k: "mata", m: [["<b>Mata</b> pisau itu sangat tajam.", "bagian yang tajam pada pisau"], ["Debu masuk ke <b>mata</b> Sari.", "alat indra untuk melihat"]] },
  { k: "tanggal", m: [["Gigi susu adik <b>tanggal</b> kemarin sore.", "lepas atau copot"], ["Hari ini <b>tanggal</b> 17 Agustus.", "hari dalam bulan"]] },
  { k: "sayap", m: [["Perpustakaan terletak di <b>sayap</b> kanan gedung sekolah.", "bagian samping sebuah bangunan"], ["<b>Sayap</b> burung itu terluka.", "anggota tubuh burung untuk terbang"]] },
  { k: "kaki", m: [["Desa nenek terletak di <b>kaki</b> gunung.", "bagian bawah gunung"], ["<b>Kaki</b> Dimas terkilir saat bermain bola.", "anggota tubuh untuk berjalan"]] },
  { k: "bunga", m: [["Tabungan Ayah di bank mendapat <b>bunga</b> setiap bulan.", "tambahan uang dari tabungan"], ["Ibu menanam <b>bunga</b> mawar di halaman.", "bagian tumbuhan yang biasanya indah dan harum"]] },
];
function soalGanda(L) {
  const g = pilih(GANDA), i = acak(0, 1), [kal, m] = g.m[i], lain = GANDA.filter(x => x !== g).flatMap(x => x.m.map(y => y[1]));
  return pgWajib(`Makna kata <b>${g.k}</b> pada kalimat tersebut adalah …`, m, [g.m[1 - i][1]], lain, L,
    { bacaan: `<p>${kal}</p>`, petunjuk: `Kata <b>${g.k}</b> punya lebih dari satu arti. Perhatikan kata-kata lain di kalimat itu.`, bahas: `Pada kalimat ini, <b>${g.k}</b> berarti ${m}. Pada kalimat lain, ${g.m[1 - i][0]} — artinya ${g.m[1 - i][1]}.` });
}
function soalGandaPilih(L) {
  const g = pilih(GANDA), i = acak(0, 1), [kal, m] = g.m[i], lain = ambil(GANDA.filter(x => x !== g), 2).map(x => pilih(x.m)[0]);
  return pg(`Kata bercetak tebal yang bermakna “${m}” terdapat pada kalimat …`, kal, [g.m[1 - i][0], ...lain], { bahas: `${kal} — <b>${g.k}</b> berarti ${m}.` });
}
function soalGandaBS(L) {
  const gs = ambil(GANDA, L >= 9 ? 4 : 3), nilai = campurBS(gs.length);
  const butir = gs.map((g, i) => { const j = acak(0, 1); return { t: `Kata <b>${g.k}</b> pada kalimat “${tanpaTag(g.m[j][0])}” berarti ${nilai[i] ? g.m[j][1] : g.m[1 - j][1]}.`, b: nilai[i] }; });
  return bs("Tentukan <b>Benar</b> atau <b>Salah</b> setiap pernyataan berikut.", butir, { bahas: gs.map(g => g.m.map(([k, m]) => `${tanpaTag(k)} → ${m}`).join("<br>")).join("<br>") });
}

const BAKU = [["aktif", "aktip"], ["apotek", "apotik"], ["atlet", "atlit"], ["cabai", "cabe"], ["jadwal", "jadual"], ["karier", "karir"], ["kualitas", "kwalitas"],
  ["nasihat", "nasehat"], ["praktik", "praktek"], ["risiko", "resiko"], ["sistem", "sistim"], ["teknik", "tehnik"], ["telur", "telor"], ["izin", "ijin"],
  ["objek", "obyek"], ["sekadar", "sekedar"], ["silakan", "silahkan"], ["provinsi", "propinsi"], ["rezeki", "rejeki"], ["zaman", "jaman"], ["analisis", "analisa"],
  ["Februari", "Pebruari"], ["kuitansi", "kwitansi"], ["ekstrem", "ekstrim"], ["lembap", "lembab"], ["hakikat", "hakekat"], ["jenazah", "jenasah"], ["kreatif", "kreatip"],
  ["antre", "antri"], ["napas", "nafas"], ["sopir", "supir"], ["imbau", "himbau"]];
function soalBaku(L) {
  const [e, ...lain] = ambil(BAKU, 4), cariTB = L >= 7 && ya();
  return cariTB ? pg("Kata berikut yang <b>tidak baku</b> adalah …", e[1], lain.map(x => x[0]), { petunjuk: "Kata baku adalah kata yang penulisannya sesuai kaidah (KBBI).", bahas: `“${e[1]}” tidak baku. Bentuk bakunya “${e[0]}”.` })
    : pg("Penulisan kata <b>baku</b> yang benar adalah …", e[0], lain.map(x => x[1]), { petunjuk: "Kata baku adalah kata yang penulisannya sesuai kaidah (KBBI).", bahas: `Kata baku: <b>${e[0]}</b>. Bentuk baku pilihan lain: ${lain.map(x => `${x[1]} → ${x[0]}`).join(", ")}.` });
}

const UNGKAPAN = [
  { u: "panjang tangan", m: "suka mencuri", kal: "Pedagang itu kehilangan dompet karena ulah orang yang <b>panjang tangan</b>." },
  { u: "ringan tangan", m: "suka menolong", kal: "Raka dikenal <b>ringan tangan</b>; ia selalu membantu teman yang kesulitan." },
  { u: "buah tangan", m: "oleh-oleh", kal: "Paman datang dari Padang membawa <b>buah tangan</b> berupa rendang." },
  { u: "besar kepala", m: "sombong", kal: "Meskipun menang lomba, ia tidak menjadi <b>besar kepala</b>." },
  { u: "keras kepala", m: "tidak mau mendengar nasihat", kal: "Adik sangat <b>keras kepala</b>; ia tetap bermain hujan walaupun sudah dilarang." },
  { u: "tangan kanan", m: "orang kepercayaan", kal: "Pak Slamet adalah <b>tangan kanan</b> kepala desa." },
  { u: "kambing hitam", m: "orang yang dipersalahkan", kal: "Jangan menjadikan temanmu <b>kambing hitam</b> atas kesalahanmu sendiri." },
  { u: "anak emas", m: "anak kesayangan", kal: "Guru yang baik tidak memiliki <b>anak emas</b> di kelasnya." },
  { u: "naik darah", m: "marah", kal: "Pak Darto <b>naik darah</b> karena tanamannya dirusak." },
  { u: "banting tulang", m: "bekerja keras", kal: "Ayah <b>banting tulang</b> untuk membiayai sekolah kami." },
  { u: "buah bibir", m: "bahan pembicaraan orang", kal: "Kemenangan tim sepak bola desa itu menjadi <b>buah bibir</b> warga." },
  { u: "cakar ayam", m: "tulisan yang jelek dan sulit dibaca", kal: "Bu guru meminta Udin memperbaiki tulisannya yang seperti <b>cakar ayam</b>." },
  { u: "gulung tikar", m: "bangkrut", kal: "Toko itu terpaksa <b>gulung tikar</b> karena sepi pembeli." },
  { u: "angkat kaki", m: "pergi", kal: "Para penjajah akhirnya <b>angkat kaki</b> dari Indonesia." },
  { u: "kabar burung", m: "kabar yang belum tentu benar", kal: "Jangan mudah percaya pada <b>kabar burung</b>." },
  { u: "lintah darat", m: "orang yang meminjamkan uang dengan bunga sangat tinggi", kal: "Petani itu terjerat utang kepada <b>lintah darat</b>." },
];
function soalUngkapan(L) {
  const e = pilih(UNGKAPAN);
  return pgL("Makna ungkapan bercetak tebal pada kalimat tersebut adalah …", e.m, UNGKAPAN.filter(x => x !== e).map(x => x.m), L,
    { bacaan: `<p>${e.kal}</p>`, petunjuk: "Ungkapan tidak diartikan kata per kata. Pikirkan maksud kalimat secara keseluruhan.", bahas: `<b>${e.u}</b> berarti ${e.m}.` });
}
function soalUngkapanBS(L) {
  const es = ambil(UNGKAPAN, 4), nilai = campurBS(4), butir = es.map((e, i) => ({ t: `<b>${e.u}</b> berarti ${nilai[i] ? e.m : pilih(UNGKAPAN.filter(x => x !== e)).m}.`, b: nilai[i] }));
  return pgk("Pilih <b>semua</b> pasangan ungkapan dan makna yang tepat.", butir, { bahas: es.map(e => `<b>${e.u}</b> = ${e.m}`).join("<br>") });
}
/* g = kelompok peribahasa yang maknanya berdekatan (tidak muncul bersama) */
const PERIBAHASA = [
  { p: "Sedikit demi sedikit, lama-lama menjadi bukit.", m: "hal kecil yang dikumpulkan terus-menerus lama-kelamaan menjadi banyak", g: "hemat", sit: "Setiap hari, Wulan menabung Rp2.000. Setahun kemudian, ia dapat membeli sepeda dari tabungannya." },
  { p: "Berakit-rakit ke hulu, berenang-renang ke tepian; bersakit-sakit dahulu, bersenang-senang kemudian.", m: "bersusah payah dahulu agar dapat bersenang-senang kemudian", sit: "Galih belajar dengan tekun setiap malam selama berbulan-bulan. Akhirnya, ia diterima di sekolah impiannya." },
  { p: "Bagai air di daun talas.", m: "orang yang tidak tetap pendiriannya", sit: "Hari ini Tono ingin ikut klub sepak bola, besok ingin ikut klub renang, lusa berganti lagi ke klub catur." },
  { p: "Ada udang di balik batu.", m: "ada maksud tersembunyi di balik suatu perbuatan", sit: "Tiba-tiba Oki rajin membantu temannya. Ternyata, ia ingin meminjam sepeda baru temannya itu." },
  { p: "Air beriak tanda tak dalam.", m: "orang yang banyak bicara biasanya sedikit ilmunya" },
  { p: "Seperti katak dalam tempurung.", m: "orang yang pengetahuannya sempit karena tidak pernah ke mana-mana" },
  { p: "Bersatu kita teguh, bercerai kita runtuh.", m: "persatuan membuat kita kuat, sedangkan perpecahan membuat kita lemah", g: "bersama", sit: "Warga desa bergotong royong membangun jembatan. Pekerjaan yang berat pun cepat selesai." },
  { p: "Malu bertanya, sesat di jalan.", m: "orang yang tidak mau bertanya akan mengalami kesulitan", sit: "Dimas tidak mau bertanya kepada guru tentang tugas yang belum ia pahami. Akibatnya, tugasnya salah semua." },
  { p: "Ringan sama dijinjing, berat sama dipikul.", m: "suka dan duka ditanggung bersama", g: "bersama" },
  { p: "Bagai kacang lupa akan kulitnya.", m: "orang yang lupa pada asal-usulnya atau pada orang yang pernah menolongnya", sit: "Setelah sukses di kota, Budi tidak pernah lagi mengunjungi kampung halaman dan guru-guru yang dulu mendidiknya." },
  { p: "Nasi sudah menjadi bubur.", m: "sesuatu yang sudah terjadi tidak dapat diubah lagi", sit: "Rani menyesal tidak belajar sebelum ulangan. Namun, nilai ulangannya sudah diumumkan." },
  { p: "Tak ada gading yang tak retak.", m: "tidak ada sesuatu yang sempurna", sit: "Meskipun sudah berlatih keras, penampilan tari kelas kami masih ada sedikit kesalahan. Bu guru berkata bahwa hal itu wajar." },
  { p: "Di mana bumi dipijak, di situ langit dijunjung.", m: "kita harus menghormati adat di tempat kita tinggal", sit: "Saat tinggal di Bali, keluarga Agus menghormati dan mengikuti aturan adat setempat." },
  { p: "Bagai pinang dibelah dua.", m: "dua orang yang sangat mirip", sit: "Wajah Laras dan saudara kembarnya sangat mirip sehingga sulit dibedakan." },
  { p: "Rajin pangkal pandai, hemat pangkal kaya.", m: "orang yang rajin akan pandai dan orang yang hemat akan kaya", g: "hemat" },
];
const pbLain = e => PERIBAHASA.filter(x => x !== e && (!e.g || x.g !== e.g));
function soalPeribahasa(L) {
  const e = pilih(PERIBAHASA);
  return pgL(`Makna peribahasa “<i>${e.p}</i>” adalah …`, e.m, pbLain(e).map(x => x.m), L, { petunjuk: "Peribahasa adalah kalimat kiasan. Pikirkan pesan di baliknya.", bahas: `“${e.p}” bermakna ${e.m}.` });
}
function soalPeribahasaSituasi(L) {
  const e = pilih(PERIBAHASA.filter(x => x.sit));
  return pgL("Peribahasa yang sesuai dengan cerita tersebut adalah …", e.p, pbLain(e).map(x => x.p), L,
    { bacaan: `<p>${e.sit}</p>`, petunjuk: "Tentukan dulu pesan ceritanya, lalu cari peribahasa yang maknanya sama.", bahas: `“${e.p}” bermakna ${e.m}.` });
}

daftarMisi("pah", "bi4", "Makna kata & ungkapan", "🔤", {
  1: [soalSinonim, soalAntonim].map(f => () => f(1)), 2: [soalSinonim, soalAntonim].map(f => () => f(2)),
  3: [soalSinonim, soalAntonim, soalMakna].map(f => () => f(3)), 4: [soalMakna, soalRumpang, soalAntonim].map(f => () => f(4)),
  5: [soalMakna, soalRumpang, soalBaku].map(f => () => f(5)), 6: [soalMakna, soalRumpang, soalBaku, soalMaknaBS].map(f => () => f(6)),
  7: [soalGanda, soalBaku, soalMaknaBS, soalGandaPilih].map(f => () => f(7)), 8: [soalGanda, soalUngkapan, soalGandaBS, soalBaku].map(f => () => f(8)),
  9: [soalUngkapan, soalPeribahasa, soalGandaBS, soalUngkapanBS].map(f => () => f(9)), 10: [soalPeribahasaSituasi, soalPeribahasa, soalUngkapanBS, soalGandaBS].map(f => () => f(10)),
});

/* ================= Misi: Ide pokok & urutan ================= */
/* Paragraf dengan kalimat utama yang jelas. akhir = kalimat utama bila diletakkan di akhir paragraf (induktif).
   jd = judul paragraf { b, s }. g = kelompok topik berdekatan: kalimat dari paragraf segolongan tidak dijadikan
   "kalimat sumbang" karena bisa terasa padu. */
const PARAGRAF = [
  { ide: "manfaat olahraga bagi tubuh", utama: "Olahraga memiliki banyak manfaat bagi tubuh.", akhir: "Jadi, olahraga sangat bermanfaat bagi tubuh.", g: "sehat",
    jelas: ["Olahraga membuat otot dan tulang menjadi kuat.", "Jantung pun dapat bekerja lebih baik.", "Selain itu, tidur kita menjadi lebih nyenyak setelah berolahraga."], s: ["otot dan tulang yang kuat", "cara tidur yang nyenyak", "kerja jantung manusia"],
    jd: { b: "Manfaat Olahraga bagi Tubuh", s: ["Jantung Manusia", "Lomba Lari Antarkelas", "Cara Membuat Jus Buah"] } },
  { ide: "pasar tradisional yang selalu ramai pada pagi hari", utama: "Pasar tradisional di desa kami selalu ramai pada pagi hari.", akhir: "Begitulah, pasar tradisional di desa kami selalu ramai pada pagi hari.",
    jelas: ["Para pedagang sudah menata dagangan sejak subuh.", "Pembeli berdatangan untuk membeli sayur, ikan, dan buah.", "Suara tawar-menawar terdengar di mana-mana."], s: ["pedagang yang datang sejak subuh", "harga sayur dan ikan", "cara tawar-menawar"],
    jd: { b: "Ramainya Pasar Tradisional pada Pagi Hari", s: ["Harga Ikan Laut", "Toko Sepatu Baru", "Bermain di Taman Kota"] } },
  { ide: "manfaat membaca buku", utama: "Membaca buku memberikan banyak manfaat.", akhir: "Dengan demikian, membaca buku memberikan banyak manfaat.",
    jelas: ["Dengan membaca, pengetahuan kita bertambah.", "Kosakata kita juga semakin kaya.", "Membaca cerita bahkan dapat melatih daya khayal."], s: ["kosakata yang kaya", "buku cerita di perpustakaan", "daya khayal anak-anak"],
    jd: { b: "Manfaat Membaca Buku", s: ["Toko Alat Tulis", "Lomba Menggambar", "Kamus Bahasa Inggris"] } },
  { ide: "kucing disukai sebagai hewan peliharaan", utama: "Kucing banyak disukai sebagai hewan peliharaan.", akhir: "Itulah sebabnya kucing banyak disukai sebagai hewan peliharaan.",
    jelas: ["Bulunya lembut dan tingkahnya lucu.", "Kucing juga mudah dirawat.", "Selain itu, kucing dapat membantu mengusir tikus di rumah."], s: ["bulu kucing yang lembut", "cara mengusir tikus", "perawatan hewan"],
    jd: { b: "Kucing, Hewan Peliharaan Kesayangan", s: ["Cara Menangkap Tikus", "Kebun Binatang Kota", "Ikan Hias di Akuarium"] } },
  { ide: "siswa menjaga kebersihan kelas bersama-sama", utama: "Seluruh siswa ikut menjaga kebersihan kelas.", akhir: "Jadi, seluruh siswa ikut menjaga kebersihan kelas.",
    jelas: ["Setiap hari ada regu piket yang menyapu lantai.", "Siswa membuang sampah ke tempat sampah.", "Meja dan kursi dirapikan sebelum pulang."], s: ["regu piket yang menyapu", "tempat sampah di kelas", "meja dan kursi yang rapi"],
    jd: { b: "Bersama Menjaga Kebersihan Kelas", s: ["Jadwal Pelajaran Hari Senin", "Kantin Sekolah yang Ramai", "Meja Guru yang Baru"] } },
  { ide: "pentingnya sarapan sebelum sekolah", utama: "Sarapan sangat penting sebelum berangkat sekolah.", akhir: "Oleh karena itu, sarapan sangat penting sebelum berangkat sekolah.", g: "sehat",
    jelas: ["Sarapan memberi tenaga untuk belajar.", "Anak yang sarapan lebih mudah berkonsentrasi.", "Tanpa sarapan, perut terasa lapar dan badan lemas saat pelajaran."], s: ["perut yang lapar", "tenaga untuk bermain", "pelajaran di sekolah"],
    jd: { b: "Pentingnya Sarapan Pagi", s: ["Makan Malam Bersama", "Pelajaran Olahraga", "Resep Kue Lapis"] } },
  { ide: "penyebab terjadinya banjir", utama: "Banjir dapat terjadi karena beberapa sebab.", akhir: "Jadi, banjir dapat terjadi karena beberapa sebab.", g: "air",
    jelas: ["Hujan turun sangat deras dalam waktu lama.", "Selokan tersumbat oleh sampah.", "Pohon-pohon di hulu sungai banyak ditebang."], s: ["hujan yang deras", "sampah di selokan", "pohon di hulu sungai"],
    jd: { b: "Penyebab Banjir", s: ["Musim Kemarau Panjang", "Lomba Perahu di Sungai", "Indahnya Hujan Sore"] } },
  { ide: "keindahan pantai di desa nelayan", utama: "Pantai di desa nelayan itu sangat indah.", akhir: "Sungguh, pantai di desa nelayan itu sangat indah.",
    jelas: ["Pasirnya putih dan bersih.", "Airnya jernih sehingga ikan-ikan kecil terlihat.", "Saat sore, matahari terbenam dengan warna jingga yang memesona."], s: ["pasir yang putih", "ikan-ikan kecil", "matahari terbenam"],
    jd: { b: "Indahnya Pantai Desa Nelayan", s: ["Cara Menangkap Ikan", "Pasar Ikan di Kota", "Mendaki Gunung"] } },
  { ide: "manfaat pohon di sekitar rumah", utama: "Pohon di sekitar rumah memiliki banyak manfaat.", akhir: "Jadi, pohon di sekitar rumah memiliki banyak manfaat.", g: "air",
    jelas: ["Daunnya yang rimbun membuat halaman teduh.", "Pohon menghasilkan udara yang segar.", "Akarnya menyerap air hujan sehingga mencegah genangan."], s: ["halaman yang teduh", "air hujan", "daun yang rimbun"],
    jd: { b: "Manfaat Pohon di Sekitar Rumah", s: ["Cara Menebang Pohon", "Daun yang Berguguran", "Taman Bunga Kota"] } },
  { ide: "warga bergotong royong membangun pos ronda", utama: "Warga kampung bergotong royong membangun pos ronda.", akhir: "Begitulah, warga kampung bergotong royong membangun pos ronda.", g: "kampung",
    jelas: ["Bapak-bapak mengangkut kayu dan semen.", "Ibu-ibu menyiapkan makanan dan minuman.", "Anak-anak membantu membersihkan sisa bahan bangunan."], s: ["kayu dan semen", "makanan untuk warga", "sisa bahan bangunan"],
    jd: { b: "Gotong Royong Membangun Pos Ronda", s: ["Ibu-Ibu Memasak", "Harga Semen dan Kayu", "Pasar Malam di Kampung"] } },
  { ide: "cara menghemat air di rumah", utama: "Ada beberapa cara menghemat air di rumah.", akhir: "Itulah beberapa cara menghemat air di rumah.", g: "air",
    jelas: ["Matikan keran setelah digunakan.", "Gunakan gayung saat mandi agar air tidak terbuang.", "Air bekas mencuci sayur dapat dipakai untuk menyiram tanaman."], s: ["keran air", "mandi dengan gayung", "menyiram tanaman"],
    jd: { b: "Cara Menghemat Air di Rumah", s: ["Banjir di Kota", "Kolam Renang Baru", "Bermain Air di Sungai"] } },
  { ide: "kegemaran Sari menggambar", utama: "Sari sangat gemar menggambar.", akhir: "Jelaslah bahwa Sari sangat gemar menggambar.", g: "tokoh",
    jelas: ["Ia selalu membawa buku gambar ke mana pun pergi.", "Setiap ada waktu luang, ia menggambar pemandangan atau hewan.", "Kamarnya pun penuh dengan gambar buatannya sendiri."], s: ["buku gambar Sari", "kamar Sari", "gambar pemandangan"],
    jd: { b: "Sari Gemar Menggambar", s: ["Kamar Tidur Sari", "Toko Buku Gambar", "Sari Pandai Menyanyi"] } },
  { ide: "perpustakaan sekolah yang nyaman", utama: "Perpustakaan sekolah kami sangat nyaman.", akhir: "Jadi, perpustakaan sekolah kami sangat nyaman.",
    jelas: ["Ruangannya sejuk dan terang.", "Buku-bukunya tersusun rapi di rak.", "Ada karpet dan bantal untuk membaca sambil duduk."], s: ["rak buku yang rapi", "karpet dan bantal", "ruangan yang terang"],
    jd: { b: "Perpustakaan Sekolah yang Nyaman", s: ["Toko Karpet dan Bantal", "Lampu Kelas yang Rusak", "Lomba Bercerita"] } },
  { ide: "kegunaan sapi bagi petani", utama: "Sapi sangat berguna bagi petani.", akhir: "Itulah sebabnya sapi sangat berguna bagi petani.",
    jelas: ["Sapi dapat membantu membajak sawah.", "Kotorannya dapat diolah menjadi pupuk.", "Susu sapi juga dapat dijual untuk menambah penghasilan."], s: ["pupuk dari kotoran sapi", "harga susu sapi", "sawah yang luas"],
    jd: { b: "Sapi, Hewan yang Berguna bagi Petani", s: ["Harga Susu di Pasar", "Kebun Sayur Pak Tani", "Lomba Pacuan Kuda"] } },
  { ide: "persiapan warga menyambut Hari Kemerdekaan", utama: "Warga kampung bersiap menyambut Hari Kemerdekaan.", akhir: "Begitulah, warga kampung bersiap menyambut Hari Kemerdekaan.", g: "kampung",
    jelas: ["Bendera merah putih dipasang di depan setiap rumah.", "Gapura kampung dicat ulang dengan warna merah dan putih.", "Panitia menyiapkan berbagai lomba untuk anak-anak."], s: ["bendera di depan rumah", "gapura kampung", "lomba untuk anak-anak"],
    jd: { b: "Menyambut Hari Kemerdekaan", s: ["Gapura yang Rusak", "Liburan Akhir Tahun", "Toko Cat di Kampung"] } },
  { ide: "Dika anak yang rajin", utama: "Dika adalah anak yang rajin.", akhir: "Jelaslah bahwa Dika adalah anak yang rajin.", g: "tokoh",
    jelas: ["Setiap pagi, ia membantu ibu menyapu halaman.", "Sepulang sekolah, ia langsung mengerjakan PR.", "Ia juga tidak pernah lupa merapikan tempat tidurnya."], s: ["halaman rumah yang bersih", "PR dari sekolah", "tempat tidur Dika"],
    jd: { b: "Dika Anak yang Rajin", s: ["Halaman Rumah Dika", "PR Matematika", "Dika Pandai Bernyanyi"] } },
  { ide: "bahaya sampah plastik bagi lingkungan", utama: "Sampah plastik berbahaya bagi lingkungan.", akhir: "Jadi, sampah plastik berbahaya bagi lingkungan.", g: "air",
    jelas: ["Plastik sangat sulit terurai di dalam tanah.", "Sampah plastik di selokan dapat menyebabkan banjir.", "Hewan laut bisa mati karena memakan plastik."], s: ["hewan laut", "selokan yang tersumbat", "tanah di kebun"],
    jd: { b: "Bahaya Sampah Plastik", s: ["Hewan-Hewan di Laut", "Cara Membuat Layang-Layang", "Kebun Sekolah"] } },
  { ide: "kebiasaan baik sebelum tidur", utama: "Ada beberapa kebiasaan baik sebelum tidur.", akhir: "Itulah beberapa kebiasaan baik sebelum tidur.",
    jelas: ["Kita menggosok gigi agar gigi tetap sehat.", "Kita juga menyiapkan buku untuk pelajaran besok.", "Jangan lupa berdoa sebelum memejamkan mata."], s: ["gigi yang sehat", "buku pelajaran", "mata yang mengantuk"],
    jd: { b: "Kebiasaan Baik sebelum Tidur", s: ["Mimpi yang Indah", "Pasta Gigi Baru", "Bangun Kesiangan"] } },
  { ide: "lebah sebagai serangga yang bermanfaat", utama: "Lebah adalah serangga yang bermanfaat.", akhir: "Jadi, lebah adalah serangga yang bermanfaat.",
    jelas: ["Lebah menghasilkan madu yang menyehatkan.", "Saat mengisap sari bunga, lebah membantu penyerbukan.", "Lilin dari sarang lebah juga dapat dimanfaatkan manusia."], s: ["madu yang menyehatkan", "sari bunga", "sarang lebah"],
    jd: { b: "Lebah, Serangga yang Bermanfaat", s: ["Bunga Mawar di Taman", "Sengatan Lebah", "Kupu-Kupu yang Indah"] } },
  { ide: "ramainya stasiun menjelang Lebaran", utama: "Stasiun kereta api sangat ramai menjelang Lebaran.", akhir: "Begitulah, stasiun kereta api sangat ramai menjelang Lebaran.",
    jelas: ["Ribuan orang datang untuk pulang ke kampung halaman.", "Antrean panjang terlihat di depan loket.", "Para petugas bekerja keras mengatur penumpang."], s: ["loket tiket", "petugas stasiun", "kampung halaman"],
    jd: { b: "Ramainya Stasiun Menjelang Lebaran", s: ["Kereta Api Tercepat", "Petugas Loket", "Liburan ke Pantai"] } },
  { ide: "manfaat sayuran bagi kesehatan", utama: "Sayuran baik untuk kesehatan tubuh.", akhir: "Jadi, sayuran baik untuk kesehatan tubuh.", g: "sehat",
    jelas: ["Wortel mengandung zat yang baik untuk mata.", "Bayam membantu tubuh membentuk darah.", "Sayuran juga mengandung serat yang melancarkan pencernaan."], s: ["wortel untuk mata", "darah manusia", "pencernaan"],
    jd: { b: "Sayuran untuk Kesehatan", s: ["Kebun Wortel Kakek", "Pedagang Sayur Keliling", "Resep Kue Bolu"] } },
  { ide: "persiapan Regu Melati untuk berkemah", utama: "Regu Melati bersiap untuk berkemah.", akhir: "Begitulah, Regu Melati bersiap untuk berkemah.",
    jelas: ["Mereka memeriksa tenda dan tali.", "Setiap anggota membawa senter dan perlengkapan makan.", "Kakak pembina mengingatkan agar semua membawa jas hujan."], s: ["tenda dan tali", "senter", "jas hujan"],
    jd: { b: "Persiapan Berkemah Regu Melati", s: ["Hujan di Perkemahan", "Senter yang Rusak", "Lomba Menyanyi"] } },
];
/* Paragraf lain yang topiknya jauh (untuk kalimat sumbang) */
const topikLain = p => PARAGRAF.filter(q => q !== p && (!p.g || q.g !== p.g));
/* Paragraf induktif hanya dari paragraf yang kalimat pertamanya tidak bergantung pada kalimat utama (mis. diawali “Ia …” atau “Bulunya …”) */
const bisaInduktif = p => !/^(Ia |Mereka |\S+nya\b)|, ia /.test(p.jelas[0]);
const ambilParagraf = induktif => pilih(induktif ? PARAGRAF.filter(bisaInduktif) : PARAGRAF);
const PTK_IDE = "Ide pokok adalah gagasan utama yang dibahas seluruh kalimat dalam paragraf, bukan hanya satu kalimat.";
function soalIdeParagraf(L) {
  const induktif = L >= 5 && ya(0.4), p = ambilParagraf(induktif), kal = induktif ? [...p.jelas, p.akhir] : [p.utama, ...p.jelas];
  return pgL("Ide pokok paragraf tersebut adalah …", p.ide, p.s, L, { bacaan: `<p>${kal.join(" ")}</p>`, petunjuk: PTK_IDE, bahas: `Kalimat utamanya: ${kutip(induktif ? p.akhir : p.utama)} Jadi, ide pokoknya ${p.ide}.` });
}
function soalIdeInfo(L) {
  const e = pilih(INFO), i = acak(0, e.para.length - 1), penuh = L >= 7;
  const salah = penuh ? [...e.ide[i].s, ...e.ide.filter((_, j) => j !== i).map(x => x.b)] : e.ide[i].s;
  return pgL(penuh ? `Ide pokok paragraf ke-${i + 1} bacaan tersebut adalah …` : "Ide pokok paragraf tersebut adalah …", e.ide[i].b, salah, L,
    { bacaan: penuh ? bacaanHtml(e.judul, e.para) : bacaanHtml("", [e.para[i]]), petunjuk: PTK_IDE, bahas: `Paragraf ${penuh ? "ke-" + (i + 1) + " " : ""}membahas ${e.ide[i].b}.` });
}
function soalIdeBS(L) {
  const e = pilih(INFO), n = e.para.length, nilai = campurBS(n);
  const butir = e.ide.map((x, i) => ({ t: `Ide pokok paragraf ke-${i + 1} adalah ${nilai[i] ? x.b : e.ide[(i + 1) % n].b}.`, b: nilai[i] }));
  return bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan tentang ide pokok berikut.", butir, { bacaan: bacaanHtml(e.judul, e.para), petunjuk: PTK_IDE, bahas: e.ide.map((x, i) => `Paragraf ${i + 1}: ${x.b}`).join("<br>") });
}
function soalKalimatUtama(L) {
  const induktif = L >= 5 && ya(0.5), p = ambilParagraf(induktif), kal = induktif ? [...p.jelas, p.akhir] : [p.utama, ...p.jelas], utama = induktif ? p.akhir : p.utama;
  if (L <= 5) return pgL("Kalimat utama paragraf tersebut adalah …", utama, p.jelas, L, { bacaan: `<p>${kal.join(" ")}</p>`, petunjuk: "Kalimat utama berisi gagasan yang dijelaskan oleh kalimat-kalimat lainnya.", bahas: `Kalimat utamanya ${kutip(utama)} Kalimat lain menjelaskannya.` });
  const no = kal.indexOf(utama) + 1, letak = L >= 7 && ya();
  return letak ? pgTetap("Kalimat utama paragraf tersebut terletak di …", ["awal paragraf", "akhir paragraf", "tengah paragraf", "awal dan akhir paragraf"], induktif ? "akhir paragraf" : "awal paragraf",
    { bacaan: bernomor(kal), bahas: `Kalimat utama ${kutip(utama)} ada di ${induktif ? "akhir (paragraf induktif)" : "awal (paragraf deduktif)"}.` })
    : pgTetap("Kalimat utama paragraf tersebut ditandai nomor …", kal.map((_, i) => `(${i + 1})`), `(${no})`, { bacaan: bernomor(kal), bahas: `Kalimat (${no}) ${kutip(utama)} adalah kalimat utama.` });
}
function soalSumbang(L) {
  const p = pilih(PARAGRAF), q = pilih(topikLain(p)), kal = [p.utama, ...p.jelas], sisip = pilih(q.jelas), pos = acak(1, kal.length);
  kal.splice(pos, 0, sisip);
  return pgTetap("Kalimat yang <b>tidak padu</b> (tidak sesuai dengan ide pokok) dalam paragraf tersebut ditandai nomor …", kal.map((_, i) => `(${i + 1})`), `(${pos + 1})`,
    { bacaan: bernomor(kal), petunjuk: "Tentukan dulu ide pokok paragraf. Cari kalimat yang membahas hal lain.", bahas: `Ide pokok paragraf: ${p.ide}. Kalimat (${pos + 1}) ${kutip(sisip)} membahas hal lain.` });
}
/* Urutan: tampilkan langkah/peristiwa teracak, minta urutan nomornya */
function urutanAcak(benar) {
  const n = benar.length, idx = kocok(benar.map((_, i) => i)), tampil = idx.map(i => benar[i]);
  const kunci = benar.map((_, i) => idx.indexOf(i) + 1), tulis = a => a.map(x => `(${x})`).join(" – ");
  const salah = new Set();
  for (let t = 0; t < 60 && salah.size < 3; t++) { const a = kunci.slice(), i = acak(0, n - 2), j = ya() ? i + 1 : acak(0, n - 1); [a[i], a[j]] = [a[j], a[i]]; if (tulis(a) !== tulis(kunci)) salah.add(tulis(a)); }
  return { tampil, benar: tulis(kunci), salah: [...salah] };
}
function soalUrutProsedur(L) {
  const p = pilih(PROSEDUR), langkah = L <= 5 ? p.langkah.slice(0, 4) : p.langkah, u = urutanAcak(langkah);
  return pg(`Urutan langkah yang tepat untuk “${p.judul.toLowerCase()}” adalah …`, u.benar, u.salah,
    { bacaan: `<h4>${p.judul}</h4>${daftarBernomor(u.tampil)}`, petunjuk: "Cari langkah pertama (biasanya menyiapkan bahan), lalu pikirkan apa yang harus dilakukan sesudahnya.", bahas: daftarBernomor(langkah) });
}
function soalLangkahBerikut(L) {
  const p = pilih(PROSEDUR), i = acak(0, p.langkah.length - 2), sesudah = p.langkah[i + 1];
  return pgL(`Langkah yang dilakukan sesudah “${kecilAwal(p.langkah[i].replace(/\.$/, ""))}” adalah …`, sesudah, p.langkah.filter((_, j) => j !== i + 1 && j !== i), L,
    { bacaan: `<h4>${p.judul}</h4>${daftarBernomor(kocok(p.langkah))}`, petunjuk: "Bayangkan kamu sedang melakukannya sendiri.", bahas: daftarBernomor(p.langkah) });
}
function soalUrutCerita(L) {
  const c = ceritaAcak(), u = urutanAcak(c.urut);
  return pg("Urutan peristiwa yang sesuai dengan cerita tersebut adalah …", u.benar, u.salah,
    { bacaan: bacaanHtml(c.judul, c.para) + `<p class="ket-bacaan">Peristiwa:</p>${daftarBernomor(u.tampil)}`, petunjuk: "Cari setiap peristiwa di dalam cerita, lalu lihat mana yang terjadi lebih dulu.", bahas: daftarBernomor(c.urut) });
}

/* ---------- Bentuk tambahan untuk level awal ---------- */
const PTK_UTAMA = "Kalimat utama berisi gagasan yang dijelaskan oleh kalimat-kalimat lainnya.";
function soalJudulParagraf(L) {
  const induktif = L >= 5 && ya(0.4), p = ambilParagraf(induktif), kal = induktif ? [...p.jelas, p.akhir] : [p.utama, ...p.jelas];
  return pgL("Judul yang paling tepat untuk paragraf tersebut adalah …", p.jd.b, p.jd.s, L,
    { bacaan: `<p>${kal.join(" ")}</p>`, petunjuk: "Judul yang tepat mewakili isi seluruh paragraf, bukan hanya satu kalimat. Lihat kalimat utamanya.", bahas: `Paragraf itu membahas ${p.ide}. Judul yang mewakili: <b>${p.jd.b}</b>.` });
}
/* Kalimat sumbang dalam bentuk pilihan kalimat (tanpa nomor) */
function soalSumbangKalimat(L) {
  const p = pilih(PARAGRAF), sisip = pilih(pilih(topikLain(p)).jelas), kal = [p.utama, ...p.jelas];
  kal.splice(acak(1, kal.length), 0, sisip);
  return pgL("Kalimat yang <b>tidak sesuai</b> dengan ide pokok paragraf tersebut adalah …", sisip, p.jelas, L,
    { bacaan: `<p>${kal.join(" ")}</p>`, petunjuk: "Tentukan dulu ide pokok paragraf. Cari kalimat yang membahas hal lain.", bahas: `Ide pokok paragraf: ${p.ide}. Kalimat ${kutip(sisip)} membahas hal lain.` });
}
function soalLetakUtama(L) {
  const induktif = ya(), p = ambilParagraf(induktif), kal = induktif ? [...p.jelas, p.akhir] : [p.utama, ...p.jelas], utama = induktif ? p.akhir : p.utama;
  return pgTetap("Kalimat utama paragraf tersebut terletak di …", ["awal paragraf", "akhir paragraf", "tengah paragraf", "awal dan akhir paragraf"].slice(0, nOpsi(L)), induktif ? "akhir paragraf" : "awal paragraf",
    { bacaan: `<p>${kal.join(" ")}</p>`, petunjuk: `${PTK_UTAMA} Kalimat yang diawali <i>jadi, begitulah, itulah</i> sering menjadi kalimat utama di akhir paragraf.`,
      bahas: `Kalimat utamanya ${kutip(utama)} Letaknya di ${induktif ? "akhir paragraf (paragraf induktif)" : "awal paragraf (paragraf deduktif)"}.` });
}
/* Cerita pendek berurutan: t = kalimat (urut waktu), ev = peristiwa pada tiap kalimat. {A} dan {B} = nama acak. */
const URUT_MINI = [
  { t: ["Pagi itu, {A} bangun pukul lima.", "Setelah itu, ia merapikan tempat tidur.", "Kemudian, {A} mandi dan memakai seragam.", "Terakhir, ia sarapan bersama keluarga."],
    ev: ["bangun pukul lima", "merapikan tempat tidur", "mandi dan memakai seragam", "sarapan bersama keluarga"] },
  { t: ["Pertama, {A} dan ayah menggali lubang di halaman.", "Lalu, mereka memasukkan bibit mangga ke dalam lubang.", "Setelah itu, lubang ditutup kembali dengan tanah.", "Terakhir, {A} menyiram bibit itu dengan air."],
    ev: ["menggali lubang di halaman", "memasukkan bibit mangga ke dalam lubang", "menutup lubang dengan tanah", "menyiram bibit dengan air"] },
  { t: ["Saat istirahat, {A} pergi ke perpustakaan.", "Di sana, ia memilih sebuah buku cerita tentang hewan.", "Kemudian, {A} membaca buku itu di pojok baca.", "Sebelum bel masuk berbunyi, ia mengembalikan buku ke rak."],
    ev: ["pergi ke perpustakaan", "memilih buku cerita", "membaca buku di pojok baca", "mengembalikan buku ke rak"] },
  { t: ["Pagi-pagi, {A} menemani ibu ke pasar.", "Mula-mula, mereka membeli sayur dan tempe.", "Sesudah itu, mereka membeli ikan segar.", "Sebelum pulang, {A} dan ibu membeli kue putu."],
    ev: ["berangkat ke pasar bersama ibu", "membeli sayur dan tempe", "membeli ikan segar", "membeli kue putu"] },
  { t: ["Minggu pagi, {A} menyiapkan ember berisi air sabun.", "Lalu, ia menggosok sepedanya dengan spons.", "Setelah itu, sepeda dibilas dengan air bersih.", "Terakhir, {A} mengeringkan sepeda dengan kain."],
    ev: ["menyiapkan ember berisi air sabun", "menggosok sepeda dengan spons", "membilas sepeda dengan air bersih", "mengeringkan sepeda dengan kain"] },
  { t: ["Sesampai di sekolah, {A} membuka jendela kelas.", "Kemudian, ia menyapu lantai.", "Setelah lantai bersih, {A} menghapus papan tulis.", "Terakhir, ia membuang sampah ke tempat sampah besar."],
    ev: ["membuka jendela kelas", "menyapu lantai", "menghapus papan tulis", "membuang sampah"] },
  { t: ["Pertama, {A} dan kakek meraut bambu menjadi bilah tipis.", "Kemudian, bilah bambu diikat membentuk kerangka.", "Setelah itu, kerangka ditempeli kertas minyak.", "Terakhir, {A} memasang benang pada layang-layang."],
    ev: ["meraut bambu", "mengikat bilah bambu menjadi kerangka", "menempelkan kertas minyak pada kerangka", "memasang benang"] },
  { t: ["Sepulang sekolah, {A} membeli buah jeruk.", "Lalu, ia berjalan ke rumah {B} yang sedang sakit.", "Di sana, {A} memberikan jeruk itu kepada {B}.", "Sebelum pulang, ia mendoakan {B} agar cepat sembuh."],
    ev: ["membeli buah jeruk", "berjalan ke rumah {B}", "memberikan jeruk kepada {B}", "mendoakan {B} agar cepat sembuh"] },
  { t: ["Mula-mula, {A} mengupas dan memotong bawang.", "Lalu, ibu menumis bawang itu sampai harum.", "Setelah itu, nasi dan kecap dimasukkan, lalu diaduk rata.", "Terakhir, {A} menyajikan nasi goreng di piring."],
    ev: ["memotong bawang", "menumis bawang", "mengaduk nasi dan kecap", "menyajikan nasi goreng di piring"] },
  { t: ["Senin pagi, {A} dan teman-temannya berbaris di lapangan.", "Kemudian, bendera merah putih dikibarkan.", "Setelah itu, mereka mendengarkan amanat kepala sekolah.", "Upacara ditutup dengan doa bersama."],
    ev: ["berbaris di lapangan", "mengibarkan bendera merah putih", "mendengarkan amanat kepala sekolah", "berdoa bersama"] },
  { t: ["Siang itu, {A} menjemur pakaian di halaman.", "Tiba-tiba, langit menjadi gelap.", "{A} segera mengangkat semua jemuran ke dalam rumah.", "Tak lama setelah jemuran masuk, hujan turun dengan deras."],
    ev: ["menjemur pakaian", "langit menjadi gelap", "mengangkat jemuran", "hujan turun dengan deras"] },
  { t: ["Pukul tujuh pagi, rombongan kelas {A} berangkat dengan bus.", "Setiba di kebun binatang, mereka melihat gajah dan jerapah.", "Siang harinya, mereka makan bekal bersama di taman.", "Sore hari, rombongan pulang ke sekolah."],
    ev: ["berangkat dengan bus", "melihat gajah dan jerapah", "makan bekal bersama", "pulang ke sekolah"] },
  { t: ["Malam itu, {A} mengerjakan PR Matematika.", "Setelah PR selesai, ia memasukkan buku ke dalam tas.", "Kemudian, {A} menggosok gigi.", "Akhirnya, ia tidur setelah berdoa."],
    ev: ["mengerjakan PR Matematika", "memasukkan buku ke dalam tas", "menggosok gigi", "tidur setelah berdoa"] },
  { t: ["Kucing {A} sudah dua hari tidak pulang.", "{A} lalu mencarinya ke rumah tetangga.", "Kemudian, ia mendengar suara mengeong dari gudang.", "Ternyata, kucingnya terkunci di dalam gudang itu."],
    ev: ["kucing tidak pulang selama dua hari", "mencari kucing ke rumah tetangga", "mendengar suara mengeong dari gudang", "menemukan kucing di dalam gudang"] },
];
function urutMini() {
  const u = pilih(URUT_MINI), [A, B] = namaBeda(2), f = s => s.replace(/\{A\}/g, A).replace(/\{B\}/g, B);
  return { t: u.t.map(f), ev: u.ev.map(f) };
}
function soalUrutMini(L) {
  const { t, ev } = urutMini(), n = ev.length, jenis = pilih(["awal", "akhir", "sesudah", "sebelum"]);
  let teks, i;
  if (jenis === "awal") { i = 0; teks = "Peristiwa yang terjadi <b>pertama kali</b> dalam cerita tersebut adalah …"; }
  else if (jenis === "akhir") { i = n - 1; teks = "Peristiwa yang terjadi <b>paling akhir</b> dalam cerita tersebut adalah …"; }
  else if (jenis === "sesudah") { const j = acak(0, n - 2); i = j + 1; teks = `Peristiwa yang terjadi <b>sesudah</b> “${ev[j]}” adalah …`; }
  else { const j = acak(1, n - 1); i = j - 1; teks = `Peristiwa yang terjadi <b>sebelum</b> “${ev[j]}” adalah …`; }
  return pgL(teks, ev[i], ev.filter((_, k) => k !== i), L,
    { bacaan: `<p>${t.join(" ")}</p>`, petunjuk: "Perhatikan kata penanda urutan: <i>pertama, mula-mula, lalu, kemudian, setelah itu, akhirnya</i>.", bahas: `Urutan peristiwa:${daftarBernomor(ev)}` });
}
/* Kalimat acak disusun menjadi paragraf padu */
function soalSusunKalimat(L) {
  const { t } = urutMini(), u = urutanAcak(t);
  return pg("Susunan kalimat yang tepat agar menjadi paragraf yang padu adalah …", u.benar, u.salah,
    { banyak: nOpsi(L), bacaan: daftarBernomor(u.tampil), petunjuk: "Cari kalimat pembuka (biasanya menyebut nama tokoh dan waktu). Lalu ikuti kata penanda urutan: <i>lalu, kemudian, setelah itu, akhirnya</i>.", bahas: `<p>${t.join(" ")}</p>` });
}
/* Langkah pertama/terakhir dari teks prosedur yang diacak */
function soalLangkahUjung(L) {
  const p = pilih(PROSEDUR), awal = ya(), i = awal ? 0 : p.langkah.length - 1;
  return pgL(`Langkah <b>${awal ? "pertama" : "terakhir"}</b> dalam “${p.judul.toLowerCase()}” adalah …`, p.langkah[i], p.langkah.filter((_, j) => j !== i), L,
    { bacaan: `<h4>${p.judul}</h4>${daftarBernomor(kocok(p.langkah))}`, petunjuk: "Bayangkan kamu sedang melakukannya sendiri. Apa yang harus dikerjakan paling dulu? Apa yang paling akhir?", bahas: daftarBernomor(p.langkah) });
}
/* Benar–salah tentang satu paragraf bernomor: kalimat utama, letaknya, ide pokok, judul, kalimat penjelas */
function soalParagrafBS(L) {
  const induktif = ya(), p = ambilParagraf(induktif), kal = induktif ? [...p.jelas, p.akhir] : [p.utama, ...p.jelas], no = induktif ? kal.length : 1;
  const nJelas = pilih(kal.map((_, i) => i + 1).filter(i => i !== no)), nLain = pilih(kal.map((_, i) => i + 1).filter(i => i !== no));
  const cetak = [
    v => ({ t: `Kalimat utama paragraf tersebut adalah kalimat (${v ? no : nLain}).`, b: v }),
    v => ({ t: `Kalimat utama terletak di ${(induktif === v) ? "akhir" : "awal"} paragraf.`, b: v }),
    v => ({ t: `Ide pokok paragraf tersebut adalah ${v ? p.ide : pilih(p.s)}.`, b: v }),
    v => ({ t: `Judul yang tepat untuk paragraf tersebut adalah “${v ? p.jd.b : pilih(p.jd.s)}”.`, b: v }),
    v => ({ t: `Kalimat (${v ? nJelas : no}) merupakan kalimat penjelas.`, b: v }),
  ];
  const pakai = ambil(cetak, L >= 8 ? 4 : 3), nilai = campurBS(pakai.length), butir = pakai.map((c, i) => c(nilai[i]));
  const o = { bacaan: bernomor(kal), petunjuk: PTK_UTAMA,
    bahas: `Kalimat utama: (${no}) ${kutip(kal[no - 1])}, di ${induktif ? "akhir" : "awal"} paragraf.<br>Ide pokok: ${p.ide}.<br>Judul yang tepat: ${p.jd.b}.` };
  return L >= 7 && ya(0.4) ? pgk("Pilih <b>semua</b> pernyataan yang sesuai dengan paragraf tersebut.", butir, o) : bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan tentang paragraf tersebut.", butir, o);
}
daftarMisi("pah", "bi5", "Ide pokok & urutan", "🧩", {
  1: [() => soalIdeParagraf(1), () => soalKalimatUtama(1), () => soalJudulParagraf(1), () => soalUrutMini(1), () => soalUrutMini(1)],
  2: [() => soalIdeParagraf(2), () => soalIdeInfo(2), () => soalKalimatUtama(2), () => soalJudulParagraf(2), () => soalUrutMini(2), () => soalSumbangKalimat(2), () => soalSusunKalimat(2)],
  3: [() => soalIdeParagraf(3), () => soalIdeInfo(3), () => soalKalimatUtama(3), () => soalJudulParagraf(3), () => soalUrutMini(3), () => soalSumbangKalimat(3), () => soalSusunKalimat(3), () => soalLetakUtama(3), () => soalLangkahUjung(3)],
  4: [() => soalIdeInfo(4), () => soalKalimatUtama(4), () => soalLangkahBerikut(4), () => soalJudulParagraf(4), () => soalSumbangKalimat(4), () => soalLetakUtama(4)],
  5: [() => soalIdeParagraf(5), () => soalKalimatUtama(5), () => soalUrutProsedur(5), () => soalLangkahBerikut(5), () => soalJudulParagraf(5), () => soalSusunKalimat(5)],
  6: [() => soalKalimatUtama(6), () => soalUrutProsedur(6), () => soalIdeInfo(6), () => soalParagrafBS(6), () => soalSumbangKalimat(6), () => soalJudulParagraf(6)],
  7: [() => soalKalimatUtama(7), () => soalIdeInfo(7), () => soalUrutCerita(7), () => soalUrutProsedur(7), () => soalParagrafBS(7), () => soalSumbang(7)],
  8: [() => soalSumbang(8), () => soalIdeInfo(8), () => soalUrutCerita(8), () => soalIdeBS(8)], 9: [() => soalSumbang(9), () => soalIdeBS(9), () => soalUrutCerita(9), () => soalIdeInfo(9)],
  10: [() => soalSumbang(10), () => soalIdeBS(10), () => soalIdeInfo(10), () => soalUrutCerita(10)],
});

/* ================= Misi: Tokoh, watak & latar ================= */
/* g = kelompok watak yang berdekatan (tidak dijadikan pengecoh satu sama lain) */
const WATAK = [
  { w: "dermawan", g: "baik", p: ["{A} menyisihkan sebagian uang sakunya untuk membantu korban banjir.", "{A} sering membagikan makanan kepada tetangga yang kekurangan."] },
  { w: "suka menolong", g: "baik", p: ["{A} membantu seorang nenek menyeberang jalan.", "{A} mengantar temannya yang sakit ke ruang UKS."] },
  { w: "jujur", g: "jujur", p: ["{A} mengembalikan uang kembalian yang berlebih kepada penjual.", "Saat ulangan, {A} tidak mau menyontek walaupun ada kesempatan."] },
  { w: "bertanggung jawab", g: "jujur", p: ["{A} mengganti buku temannya yang tidak sengaja ia rusak.", "{A} menyelesaikan bagian tugas kelompoknya tepat waktu."] },
  { w: "rajin", g: "rajin", p: ["{A} selalu mengerjakan PR sepulang sekolah sebelum bermain.", "Setiap pagi, {A} membantu ibu menyapu halaman sebelum berangkat sekolah."] },
  { w: "disiplin", g: "rajin", p: ["{A} selalu datang ke sekolah sebelum bel berbunyi.", "{A} selalu mengembalikan buku perpustakaan tepat waktu."] },
  { w: "pemalas", g: "malas", p: ["{A} selalu menunda tugas dan lebih suka tidur sepanjang hari.", "{A} tidak pernah melaksanakan piket kelas yang menjadi tugasnya."] },
  { w: "sombong", g: "sombong", p: ["{A} sering memamerkan sepatu barunya dan mengejek sepatu temannya.", "{A} tidak mau bermain dengan teman yang menurutnya tidak sepintar dirinya."] },
  { w: "rendah hati", g: "rendah", p: ["Meskipun menjadi juara kelas, {A} tetap ramah dan tidak suka memamerkan prestasinya.", "Saat dipuji, {A} hanya tersenyum dan berterima kasih."] },
  { w: "penyabar", g: "sabar", p: ["Meskipun adiknya merusak mainannya, {A} tidak marah dan menasihatinya dengan lembut.", "{A} menunggu antrean panjang dengan tenang tanpa mengeluh."] },
  { w: "pemaaf", g: "sabar", p: ["Ketika temannya meminta maaf karena merusak bukunya, {A} langsung memaafkannya.", "{A} tidak menyimpan dendam kepada teman yang pernah mengejeknya."] },
  { w: "pemberani", g: "berani", p: ["{A} berani maju ke depan kelas untuk membacakan puisi walaupun baru pertama kali.", "{A} berani menegur temannya yang mengganggu adik kelas."] },
  { w: "ceroboh", g: "ceroboh", p: ["{A} sering lupa menaruh barang sehingga kotak pensilnya hilang berkali-kali.", "{A} menumpahkan cat air karena tergesa-gesa dan tidak berhati-hati."] },
  { w: "pelit", g: "pelit", p: ["{A} tidak mau meminjamkan penghapus kepada teman sebangkunya, padahal ia punya dua.", "{A} tidak pernah mau berbagi bekal dengan siapa pun."] },
];
function soalWatak(L) {
  const w = pilih(WATAK), A = nama(), kal = (L <= 2 ? [pilih(w.p)] : w.p).map(s => s.replace(/\{A\}/g, A));
  return pgL(`Watak ${A} berdasarkan bacaan tersebut adalah …`, w.w, WATAK.filter(x => x.g !== w.g).map(x => x.w), L,
    { bacaan: `<p>${A} adalah siswa kelas ${acak(4, 6)}. ${kal.join(" ")}</p>`, petunjuk: "Watak tokoh dapat dilihat dari perbuatannya.", bahas: `Perbuatan ${A} menunjukkan bahwa ia <b>${w.w}</b>.` });
}
const PERASAAN = [
  { r: "gembira", g: "positif", d: "{A} melompat-lompat sambil tertawa saat diberi tahu bahwa keluarganya akan berlibur ke pantai." },
  { r: "bangga", g: "positif", d: "Nama {A} dipanggil sebagai juara pertama lomba pidato. Ia melangkah ke panggung sambil menegakkan badan dan tersenyum lebar." },
  { r: "lega", g: "positif", d: "Setelah dicari ke mana-mana, kucing {A} ternyata tidur di dalam lemari. {A} mengusap dada sambil menghela napas panjang." },
  { r: "terkejut", g: "positif", d: "Saat {A} membuka pintu kamar, seluruh keluarganya berteriak, “Selamat ulang tahun!” {A} terdiam dengan mulut terbuka." },
  { r: "sedih", g: "sedih", d: "Layang-layang {A} putus dan terbang jauh. {A} menatap langit dengan mata berkaca-kaca." },
  { r: "kecewa", g: "sedih", d: "{A} sudah berlatih keras, tetapi namanya tidak terpilih menjadi anggota tim. Ia menunduk dan berjalan pulang perlahan." },
  { r: "takut", g: "takut", d: "Lampu tiba-tiba padam saat petir menyambar. {A} memeluk ibunya erat-erat sambil memejamkan mata." },
  { r: "cemas", g: "takut", d: "Sudah pukul delapan malam, tetapi kakak belum pulang. {A} berkali-kali melihat ke arah jalan." },
  { r: "marah", g: "marah", d: "Adik mencoret-coret buku gambar {A}. Wajah {A} memerah dan suaranya meninggi." },
  { r: "malu", g: "malu", d: "Saat maju ke depan kelas, {A} tersandung dan semua teman tertawa. Pipinya memerah dan ia menutup wajah dengan kedua tangan." },
];
function soalPerasaan(L) {
  const e = pilih(PERASAAN), A = nama();
  return pgL(`Perasaan ${A} dalam bacaan tersebut adalah …`, e.r, PERASAAN.filter(x => x.g !== e.g).map(x => x.r), L,
    { bacaan: `<p>${e.d.replace(/\{A\}/g, A)}</p>`, petunjuk: "Perhatikan sikap tubuh, wajah, dan perbuatan tokoh.", bahas: `Sikap ${A} menunjukkan perasaan <b>${e.r}</b>.` });
}
const LATAR_T = [
  { t: "pantai", w: [0, 3], d: "Ombak berdebur pelan. {A} membangun istana pasir sambil sesekali berlari menghindari air laut." },
  { t: "pasar", w: [0], d: "Pedagang sayur berteriak menawarkan dagangannya. {A} mengikuti ibu yang sedang menawar harga ikan." },
  { t: "perpustakaan", w: [0, 1], d: "Rak-rak tinggi berisi ribuan buku berjajar rapi. {A} berbicara pelan agar tidak mengganggu pengunjung yang sedang membaca." },
  { t: "sawah", w: [0, 1, 2], d: "Padi yang menguning terhampar luas. {A} membantu kakek mengusir burung pipit dari pematang." },
  { t: "stasiun kereta api", w: [0, 1, 2, 3], d: "Pengeras suara mengumumkan bahwa kereta akan segera tiba di jalur dua. {A} menggenggam tiket sambil menunggu di peron." },
  { t: "rumah sakit", w: [0, 1, 2], d: "Perawat berbaju putih lalu-lalang di lorong. {A} membawa buah-buahan untuk menjenguk neneknya yang dirawat." },
  { t: "kebun binatang", w: [0, 1], d: "Seekor jerapah menjulurkan lehernya yang panjang dari balik pagar. {A} memotretnya, lalu berjalan menuju kandang harimau." },
  { t: "dapur", w: [0, 2, 3], d: "Bau bawang goreng tercium harum. {A} membantu ibu mengaduk sayur di atas kompor." },
  { t: "bandara", w: [0, 1, 2, 3], d: "Pesawat-pesawat besar berjajar di landasan. {A} dan ayah antre di loket untuk melaporkan tiket dan koper." },
];
const LATAR_W = [
  { t: "pagi hari", c: "Ayam jantan berkokok dan matahari baru saja terbit." },
  { t: "siang hari", c: "Matahari bersinar terik tepat di atas kepala." },
  { t: "sore hari", c: "Matahari mulai terbenam dan langit berwarna jingga." },
  { t: "malam hari", c: "Bulan bersinar terang dan bintang-bintang bertaburan di langit." },
];
const SUASANA = [
  { t: "gembira", d: "Anak-anak bersorak dan bertepuk tangan. Balon warna-warni menghiasi panggung perayaan tujuh belasan." },
  { t: "menegangkan", d: "Skor masih imbang dan waktu tinggal satu menit. Semua penonton menahan napas saat bola melambung ke arah gawang." },
  { t: "menyedihkan", d: "Rumah-rumah warga hanyut terbawa banjir. Para pengungsi duduk termenung di tenda sambil memeluk anak-anak mereka." },
  { t: "sunyi", d: "Tidak terdengar suara apa pun di desa itu. Semua warga sudah tertidur lelap, hanya angin yang berdesir pelan." },
];
function soalLatarTempat(L) {
  const e = pilih(LATAR_T), A = nama();
  return pgL("Latar tempat dalam bacaan tersebut adalah …", e.t, LATAR_T.filter(x => x !== e).map(x => x.t), L,
    { bacaan: `<p>${e.d.replace(/\{A\}/g, A)}</p>`, petunjuk: "Latar tempat adalah tempat terjadinya peristiwa. Cari benda atau kegiatan yang khas di tempat itu.", bahas: `Petunjuknya ada pada kalimat ${kutip(e.d.replace(/\{A\}/g, A).split(". ")[0])} Jadi, latarnya ${e.t}.` });
}
function soalLatarWaktu(L) {
  const e = pilih(LATAR_W), A = nama();
  return pgL("Latar waktu dalam bacaan tersebut adalah …", e.t, LATAR_W.filter(x => x !== e).map(x => x.t), L,
    { bacaan: `<p>${e.c} ${A} ${pilih(["duduk di teras rumah bersama kakek.", "berjalan pulang bersama temannya.", "membantu ayah di halaman."])}</p>`, petunjuk: "Perhatikan keadaan matahari, bulan, atau suara hewan.", bahas: `${kutip(e.c)} menunjukkan ${e.t}.` });
}
function soalSuasana(L) {
  const e = pilih(SUASANA);
  return pgTetap("Suasana yang tergambar dalam bacaan tersebut adalah …", kocok(SUASANA.map(x => x.t)), e.t,
    { bacaan: `<p>${e.d}</p>`, petunjuk: "Bayangkan dirimu berada di sana. Apa yang kamu rasakan?", bahas: `Bacaan itu menggambarkan suasana <b>${e.t}</b>.` });
}
function soalLatarGabung(L) {
  const t = pilih(LATAR_T), wi = pilih(t.w), w = LATAR_W[wi], A = nama(), tl = pilih(LATAR_T.filter(x => x !== t)), wl = pilih(LATAR_W.filter(x => x !== w));
  return pg("Latar tempat dan waktu dalam bacaan tersebut adalah …", `${t.t}, ${w.t}`, [`${t.t}, ${wl.t}`, `${tl.t}, ${w.t}`, `${tl.t}, ${wl.t}`],
    { bacaan: `<p>${w.c} ${t.d.replace(/\{A\}/g, A)}</p>`, petunjuk: "Cari dua petunjuk: satu tentang tempat, satu tentang waktu.", bahas: `${kutip(w.c)} → ${w.t}. Kegiatan di bacaan → ${t.t}.` });
}
/* Watak tokoh dalam fabel/cerita yang lebih panjang */
function soalWatakKisah(L) {
  const k = kisahAcak(), tk = pilih(k.tokoh);
  return pgL(`Watak ${tk.n} dalam cerita tersebut adalah …`, tk.b, tk.s, L, { bacaan: bacaanHtml(k.judul, k.para), petunjuk: "Perhatikan perbuatan dan ucapan tokoh.", bahas: `${besarAwal(tk.n)} bersifat <b>${tk.b}</b>, terlihat dari perbuatannya dalam cerita.` });
}
function soalKisahBS(L) {
  const k = kisahAcak(), butir = k.tokoh.map(t => { const b = ya(); return { t: `${besarAwal(t.n)} bersifat ${b ? t.b : pilih(t.s)}.`, b }; });
  const b = ya(); butir.push({ t: `Amanat cerita: ${kecilAwal(b ? k.amanat.b : pilih(k.amanat.s))}`, b });
  if (butir.length < 3) { const c = ya(); butir.push({ t: `Peristiwa yang mungkin terjadi sesudah cerita: ${c ? k.lanjut.b : pilih(k.lanjut.s)}`, b: c }); }
  if (butir.every(x => x.b) || !butir.some(x => x.b)) { const t0 = k.tokoh[0]; butir[0].b = !butir[0].b; butir[0].t = `${besarAwal(t0.n)} bersifat ${butir[0].b ? t0.b : pilih(t0.s)}.`; }
  const o = { bacaan: bacaanHtml(k.judul, k.para), bahas: [...k.tokoh.map(t => `${besarAwal(t.n)}: ${t.b}`), `Amanat: ${k.amanat.b}`, `Kelanjutan: ${k.lanjut.b}`].join("<br>") };
  return L >= 9 && ya() ? pgk("Pilih <b>semua</b> pernyataan yang sesuai dengan cerita.", butir, o) : bs("Tentukan <b>Benar</b> atau <b>Salah</b> pernyataan tentang cerita tersebut.", butir, o);
}
daftarMisi("pah", "bi6", "Tokoh, watak & latar", "🎭", {
  1: [() => soalWatak(1), () => soalPerasaan(1)], 2: [() => soalWatak(2), () => soalPerasaan(2), () => soalLatarWaktu(2)],
  3: [() => soalWatak(3), () => soalLatarTempat(3), () => soalLatarWaktu(3)], 4: [() => soalPerasaan(4), () => soalLatarTempat(4), () => soalSuasana(4)],
  5: [() => soalWatak(5), () => soalSuasana(5), () => soalLatarTempat(5), () => soalWatakKisah(5)],
  6: [() => soalWatakKisah(6), () => soalSuasana(6), () => soalLatarGabung(6)], 7: [() => soalWatakKisah(7), () => soalKisahBS(7), () => soalLatarGabung(7)],
  8: [() => soalWatakKisah(8), () => soalKisahBS(8), () => soalLatarGabung(8)], 9: [() => soalKisahBS(9), () => soalWatakKisah(9), () => soalLatarGabung(9)],
  10: [() => soalKisahBS(10), () => soalWatakKisah(10)],
});
