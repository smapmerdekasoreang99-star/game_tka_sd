/* Bacaan cerita berpola — Pulau Bahasa Indonesia
   Setiap pembuat cerita mengacak nama, tempat, benda, dan angka, lalu
   mengembalikan bahan untuk soalFakta() ditambah `urut` (urutan peristiwa). */
"use strict";

const lainDari = (arr, kecuali, n = 4) => ambil(arr.filter(x => !kecuali.includes(x)), n);
const namaLain = (pakai, n = 4) => lainDari(NAMA, pakai, n);
const LOMBA_C = [
  { n: "menggambar", bawa: "krayon dan kertas gambar" }, { n: "membaca puisi", bawa: "buku kumpulan puisi" },
  { n: "mendongeng", bawa: "boneka tangan berbentuk kancil" }, { n: "menyanyi", bawa: "sebotol air hangat" },
  { n: "mewarnai", bawa: "sekotak pensil warna" }, { n: "cerdas cermat", bawa: "buku catatan berisi rangkuman pelajaran" },
];
const TEMPAT_ACARA = ["balai desa", "aula kecamatan", "gedung olahraga", "taman kota", "pendapa kabupaten"];
const SEKOLAH_LAIN = ["SD Harapan", "SD Pelita", "SD Tunas Bangsa", "SD Cahaya", "SD Mekar Sari"];
const PENDAMPING = ["ayah", "ibu", "paman", "kakak", "bibi"];
const BUAH_P = ["mangga", "rambutan", "jambu air", "jeruk", "belimbing"];
const LOKASI_S = ["kantin sekolah", "perpustakaan", "lapangan basket", "taman sekolah", "ruang kesenian"];
const BARANG_H = ["topi", "botol minum", "kotak pensil", "jaket", "payung"];
const WARNA_B = ["merah", "biru", "hijau", "kuning", "ungu", "cokelat"];
const ALAT_K = ["sapu lidi", "cangkul", "karung", "ember", "sekop", "gunting rumput"];
const SASARAN_K = ["selokan di sepanjang jalan", "taman bermain", "halaman masjid", "lapangan voli"];
const SUGUHAN = ["bubur kacang hijau", "pisang goreng", "nasi uduk", "singkong rebus", "kue lapis"];
const REGU = ["Melati", "Mawar", "Elang", "Rajawali", "Kenanga", "Harimau"];
const BUMI = ["bumi perkemahan di kaki gunung", "bumi perkemahan di tepi danau", "lapangan desa", "hutan pinus dekat sekolah"];
const PENTAS = ["drama singkat", "lagu daerah", "tari tradisional", "pembacaan puisi"];
const INGIN = ["sepatu olahraga", "buku ensiklopedia hewan", "tas sekolah baru", "bola sepak", "kotak musik"];
const CELENG = ["ayam", "ikan", "rumah", "kucing"];
const TOKO = ["Sinar Jaya", "Maju Bersama", "Cahaya Abadi", "Sumber Rezeki"];
const PELIHARAAN = [{ h: "kucing", mk: "ikan" }, { h: "kelinci", mk: "wortel" }, { h: "burung parkit", mk: "biji-bijian" }, { h: "marmut", mk: "sayuran segar" }];
const NAMA_HEWAN = ["Belang", "Mochi", "Oren", "Cimot", "Bulu", "Tompel"];
const BENTUK_ROTI = ["kura-kura", "bintang", "bunga", "ikan"];
const RASA_ROTI = ["cokelat", "keju", "pisang", "kacang hijau", "stroberi"];
const kali_ = n => terbilang(n);

const CERITA = [
  /* 1. Lomba */
  () => {
    const [A, B, C] = namaBeda(3), lm = pilih(LOMBA_C), hari = pilih(HARI.slice(0, 6)), tempat = pilih(TEMPAT_ACARA), jam = pilih(JAM_PAGI),
      juara = pilih(["pertama", "kedua", "ketiga"]), sek = pilih(SEKOLAH_LAIN);
    return { judul: `Lomba ${besarAwal(lm.n)}`,
      para: [[`Hari ${hari} pagi, ${A} dan ${B} berangkat ke ${tempat}.`, `Mereka akan mengikuti lomba ${lm.n} tingkat kecamatan.`],
        [`${A} membawa ${lm.bawa} yang sudah disiapkannya sejak seminggu lalu.`, `Di sana, mereka bertemu ${C}, teman lama ${A} dari ${sek}.`, `Lomba dimulai tepat pukul ${jam}.`],
        [`Setelah lama menunggu, nama ${A} dipanggil sebagai juara ${juara}.`, `${B} bertepuk tangan paling keras.`, `Sore itu, ${A} pulang membawa piala dan senyum lebar.`]],
      urut: [`${A} dan ${B} berangkat ke ${tempat}.`, `${A} dan ${B} bertemu ${C}.`, `Lomba ${lm.n} dimulai.`, `Nama ${A} dipanggil sebagai juara ${juara}.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Hari apa ${A} dan ${B} berangkat ke ${tempat}?`, b: `hari ${hari}`, s: HARI.filter(h => h !== hari).map(h => `hari ${h}`), pr: v => `${A} dan ${B} berangkat pada ${v} pagi.` },
        { p: 0, k: [0, 0], q: `Ke mana ${A} dan ${B} pergi?`, b: `ke ${tempat}`, s: TEMPAT_ACARA.filter(t => t !== tempat).map(t => `ke ${t}`), pr: v => `${A} dan ${B} pergi ${v}.` },
        { p: 0, k: [0, 1], q: `Lomba apa yang akan diikuti ${A} dan ${B}?`, b: `lomba ${lm.n}`, s: LOMBA_C.filter(x => x !== lm).map(x => `lomba ${x.n}`), pr: v => `${A} dan ${B} mengikuti ${v}.` },
        { p: 0, k: [0, 0], q: `Siapa yang berangkat bersama ${A}?`, b: B, s: namaLain([A, B], 4), pr: v => `${A} berangkat bersama ${v}.` },
        { p: 1, k: [1, 0], q: `Apa yang dibawa ${A}?`, b: lm.bawa, s: LOMBA_C.filter(x => x !== lm).map(x => x.bawa), pr: v => `${A} membawa ${v}.` },
        { p: 1, k: [1, 1], q: `Siapakah ${C} dalam cerita tersebut?`, b: `teman lama ${A} dari ${sek}`, s: [`adik ${B}`, `juri lomba ${lm.n}`, `guru ${A} di sekolah`, `teman lama ${A} dari ${pilih(SEKOLAH_LAIN.filter(x => x !== sek))}`], pr: v => `${C} adalah ${v}.`, sulit: true },
        { p: 1, k: [1, 2], q: "Pukul berapa lomba dimulai?", b: `pukul ${jam}`, s: JAM_PAGI.filter(j => j !== jam).map(j => `pukul ${j}`), pr: v => `Lomba dimulai ${v}.` },
        { p: 2, k: [2, 0], q: `${A} menjadi juara berapa?`, b: `juara ${juara}`, s: ["pertama", "kedua", "ketiga", "harapan"].filter(j => j !== juara).map(j => `juara ${j}`), pr: v => `${A} menjadi ${v}.` },
        { p: 2, k: [2, 1], q: `Siapa yang bertepuk tangan paling keras saat nama ${A} dipanggil?`, b: B, s: [C, ...namaLain([A, B, C], 3)], pr: v => `${v} bertepuk tangan paling keras.`, sulit: true },
      ] };
  },
  /* 2. Rumah nenek */
  () => {
    const A = nama(), kota = pilih(KOTA), pd = pilih(PENDAMPING), kd = pilih(["kereta api", "bus", "mobil"]), jam = acak(2, 6), bh = pilih(BUAH_P);
    return { judul: "Libur di Rumah Nenek",
      para: [[`Saat libur sekolah, ${A} pergi ke rumah nenek di ${kota}.`, `${A} berangkat bersama ${pd} naik ${kd}.`],
        [`Perjalanan itu memakan waktu ${kali_(jam)} jam.`, `Nenek menyambut mereka di depan rumah dengan senyum hangat.`, `Di halaman rumah nenek, pohon ${bh} sedang berbuah lebat.`],
        [`Keesokan harinya, ${A} membantu nenek memetik buah ${bh}.`, `Sebagian buah itu dibagikan kepada tetangga.`, `Sisanya dimasukkan ke dalam kardus untuk oleh-oleh.`]],
      urut: [`${A} berangkat ke ${kota} bersama ${pd}.`, `Nenek menyambut mereka di depan rumah.`, `${A} membantu nenek memetik buah ${bh}.`, `Sebagian buah dibagikan kepada tetangga.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Di kota manakah rumah nenek ${A}?`, b: kota, s: KOTA.filter(x => x !== kota), pr: v => `Rumah nenek ${A} ada di ${v}.` },
        { p: 0, k: [0, 1], q: `${A} pergi ke rumah nenek bersama …`, b: pd, s: PENDAMPING.filter(x => x !== pd), pr: v => `${A} pergi ke rumah nenek bersama ${v}.` },
        { p: 0, k: [0, 1], q: `Kendaraan apa yang dinaiki ${A}?`, b: kd, s: ["kereta api", "bus", "mobil", "kapal laut", "pesawat terbang"].filter(x => x !== kd), pr: v => `${A} naik ${v} ke rumah nenek.` },
        { p: 1, k: [1, 0], q: "Berapa lama perjalanan ke rumah nenek?", b: `${kali_(jam)} jam`, s: [2, 3, 4, 5, 6, 8].filter(x => x !== jam).map(x => `${kali_(x)} jam`), pr: v => `Perjalanan ke rumah nenek memakan waktu ${v}.` },
        { p: 1, k: [1, 2], q: "Pohon apa yang sedang berbuah lebat di halaman rumah nenek?", b: `pohon ${bh}`, s: BUAH_P.filter(x => x !== bh).map(x => `pohon ${x}`), pr: v => `Di halaman rumah nenek, ${v} sedang berbuah lebat.` },
        { p: 2, k: [2, 0], q: `Kapan ${A} memetik buah ${bh}?`, b: "keesokan harinya", s: ["saat baru tiba", "sebelum berangkat", "seminggu kemudian"], pr: v => `${A} memetik buah ${bh} ${v}.`, sulit: true },
        { p: 2, k: [2, 1], q: `Kepada siapa sebagian buah ${bh} dibagikan?`, b: "kepada tetangga", s: ["kepada teman sekolah", "kepada penjual di pasar", "kepada guru"], pr: v => `Sebagian buah dibagikan ${v}.` },
        { p: 2, k: [2, 2], q: "Untuk apa sisa buah dimasukkan ke dalam kardus?", b: "untuk oleh-oleh", s: ["untuk dijual ke pasar", "untuk dibuat selai", "untuk disimpan nenek"], pr: v => `Sisa buah dimasukkan ke dalam kardus ${v}.`, sulit: true },
      ] };
  },
  /* 3. Barang hilang */
  () => {
    const [A, B, C] = namaBeda(3), br = pilih(BARANG_H), w = pilih(WARNA_B), [l1, l2] = ambil(LOKASI_S, 2), pt = pilih(["wali kelas", "penjaga sekolah", "kepala sekolah", "petugas perpustakaan"]);
    return { judul: `${besarAwal(br)} yang Hilang`,
      para: [[`${A} kehilangan ${br} berwarna ${w}.`, `Barang itu terakhir kali dibawanya ke ${l1}.`],
        [`${A} mencarinya ke mana-mana bersama ${B}, tetapi ${br} itu tidak ditemukan.`, `Mereka lalu melapor kepada ${pt}.`],
        [`Sore harinya, ${C} datang membawa ${br} milik ${A}.`, `${C} menemukannya di bawah bangku ${l2}.`, `${A} mengucapkan terima kasih kepada ${C}.`]],
      urut: [`${A} kehilangan ${br}.`, `${A} dan ${B} mencari ${br} itu.`, `Mereka melapor kepada ${pt}.`, `${C} datang membawa ${br} milik ${A}.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Barang apa yang hilang?`, b: br, s: BARANG_H.filter(x => x !== br), pr: v => `${A} kehilangan ${v}.` },
        { p: 0, k: [0, 0], q: `Apa warna ${br} milik ${A}?`, b: w, s: WARNA_B.filter(x => x !== w), pr: v => `${besarAwal(br)} milik ${A} berwarna ${v}.` },
        { p: 0, k: [0, 1], q: `Ke mana ${br} itu terakhir kali dibawa?`, b: `ke ${l1}`, s: LOKASI_S.filter(x => x !== l1).map(x => `ke ${x}`), pr: v => `${besarAwal(br)} itu terakhir kali dibawa ${v}.` },
        { p: 1, k: [1, 0], q: `Siapa yang membantu ${A} mencari ${br}?`, b: B, s: [C, ...namaLain([A, B, C], 3)], pr: v => `${v} membantu ${A} mencari ${br}.`, sulit: true },
        { p: 1, k: [1, 1], q: `Kepada siapa ${A} dan ${B} melapor?`, b: `kepada ${pt}`, s: ["wali kelas", "penjaga sekolah", "kepala sekolah", "petugas perpustakaan", "orang tua"].filter(x => x !== pt).map(x => `kepada ${x}`), pr: v => `${A} dan ${B} melapor ${v}.` },
        { p: 2, k: [2, 0], q: `Siapa yang menemukan ${br} milik ${A}?`, b: C, s: [B, ...namaLain([A, B, C], 3)], pr: v => `${v} menemukan ${br} milik ${A}.`, sulit: true },
        { p: 2, k: [2, 1], q: `Di mana ${br} itu ditemukan?`, b: `di bawah bangku ${l2}`, s: [`di bawah bangku ${l1}`, ...LOKASI_S.filter(x => x !== l1 && x !== l2).map(x => `di bawah bangku ${x}`)], pr: v => `${besarAwal(br)} itu ditemukan ${v}.`, sulit: true },
      ] };
  },
  /* 4. Kerja bakti */
  () => {
    const [A, B] = namaBeda(2), rt = "0" + acak(1, 9), pak = pilih(DEWASA), bu = pilih(DEWASA_BU), [a1, a2] = ambil(ALAT_K, 2), sas = pilih(SASARAN_K), mk = pilih(SUGUHAN);
    return { judul: "Kerja Bakti",
      para: [[`Hari Minggu pagi, warga RT ${rt} mengadakan kerja bakti.`, `Kegiatan itu dipimpin oleh Pak ${pak}, ketua RT.`],
        [`${A} membawa ${a1}, sedangkan ${B} membawa ${a2}.`, `Mereka membersihkan ${sas} bersama warga lain.`],
        [`Setelah semua selesai, Bu ${bu} membagikan ${mk} kepada warga.`, `Lingkungan RT ${rt} pun menjadi bersih dan rapi.`]],
      urut: [`Warga RT ${rt} berkumpul untuk kerja bakti.`, `Warga membersihkan ${sas}.`, `Bu ${bu} membagikan ${mk}.`, `Lingkungan RT ${rt} menjadi bersih dan rapi.`],
      fakta: [
        { p: 0, k: [0, 0], q: "Kapan kerja bakti diadakan?", b: "hari Minggu pagi", s: ["hari Sabtu sore", "hari Senin pagi", "hari Jumat siang"], pr: v => `Kerja bakti diadakan pada ${v}.` },
        { p: 0, k: [0, 1], q: "Siapa yang memimpin kerja bakti?", b: `Pak ${pak}`, s: DEWASA.filter(x => x !== pak).map(x => `Pak ${x}`), pr: v => `Kerja bakti dipimpin oleh ${v}.` },
        { p: 1, k: [1, 0], q: `Apa yang dibawa ${A}?`, b: a1, s: [a2, ...ALAT_K.filter(x => x !== a1 && x !== a2)], pr: v => `${A} membawa ${v}.`, sulit: true },
        { p: 1, k: [1, 0], q: `Apa yang dibawa ${B}?`, b: a2, s: [a1, ...ALAT_K.filter(x => x !== a1 && x !== a2)], pr: v => `${B} membawa ${v}.`, sulit: true },
        { p: 1, k: [1, 1], q: "Apa yang dibersihkan dalam kerja bakti itu?", b: sas, s: SASARAN_K.filter(x => x !== sas), pr: v => `Warga membersihkan ${v}.` },
        { p: 2, k: [2, 0], q: `Apa yang dibagikan Bu ${bu} kepada warga?`, b: mk, s: SUGUHAN.filter(x => x !== mk), pr: v => `Bu ${bu} membagikan ${v}.` },
        { p: 2, k: [2, 0], q: `Siapa yang membagikan ${mk}?`, b: `Bu ${bu}`, s: DEWASA_BU.filter(x => x !== bu).map(x => `Bu ${x}`), pr: v => `${v} membagikan ${mk} kepada warga.` },
      ] };
  },
  /* 5. Perkemahan */
  () => {
    const [A, B, C] = namaBeda(3), rg = pilih(REGU), bm = pilih(BUMI), n = acak(3, 4), pt = pilih(PENTAS);
    return { judul: `Regu ${rg} Berkemah`,
      para: [[`Regu ${rg} mengikuti perkemahan di ${bm}.`, `Perkemahan itu berlangsung selama ${kali_(n)} hari.`],
        [`${A} menjadi ketua regu.`, `${B} bertugas memasak, sedangkan ${C} bertugas mengambil air.`, "Pada malam kedua, ada acara api unggun."],
        [`Di acara itu, Regu ${rg} menampilkan ${pt}.`, "Penampilan mereka mendapat tepuk tangan meriah dari regu lain."]],
      urut: [`Regu ${rg} tiba di ${bm}.`, `${B} memasak dan ${C} mengambil air.`, "Acara api unggun dimulai.", `Regu ${rg} menampilkan ${pt}.`],
      fakta: [
        { p: 0, k: [0, 0], q: "Apa nama regu dalam cerita tersebut?", b: `Regu ${rg}`, s: REGU.filter(x => x !== rg).map(x => `Regu ${x}`), pr: v => `Nama regu dalam cerita adalah ${v}.` },
        { p: 0, k: [0, 0], q: "Di mana perkemahan itu diadakan?", b: `di ${bm}`, s: BUMI.filter(x => x !== bm).map(x => `di ${x}`), pr: v => `Perkemahan diadakan ${v}.` },
        { p: 0, k: [0, 1], q: "Berapa hari perkemahan itu berlangsung?", b: `${kali_(n)} hari`, s: [2, 3, 4, 5, 7].filter(x => x !== n).map(x => `${kali_(x)} hari`), pr: v => `Perkemahan berlangsung selama ${v}.` },
        { p: 1, k: [1, 0], q: "Siapa ketua regu?", b: A, s: [B, C, ...namaLain([A, B, C], 2)], pr: v => `Ketua regu adalah ${v}.` },
        { p: 1, k: [1, 1], q: "Siapa yang bertugas mengambil air?", b: C, s: [A, B, ...namaLain([A, B, C], 2)], pr: v => `${v} bertugas mengambil air.`, sulit: true },
        { p: 1, k: [1, 1], q: "Siapa yang bertugas memasak?", b: B, s: [A, C, ...namaLain([A, B, C], 2)], pr: v => `${v} bertugas memasak.`, sulit: true },
        { p: 1, k: [1, 2], q: "Kapan acara api unggun diadakan?", b: "pada malam kedua", s: ["pada malam pertama", "pada malam terakhir", "pada siang hari pertama"], pr: v => `Acara api unggun diadakan ${v}.`, sulit: true },
        { p: 2, k: [2, 0], q: `Apa yang ditampilkan Regu ${rg} di acara api unggun?`, b: pt, s: PENTAS.filter(x => x !== pt), pr: v => `Regu ${rg} menampilkan ${v}.` },
      ] };
  },
  /* 6. Menabung */
  () => {
    const A = nama(), br = pilih(INGIN), sisih = pilih([2000, 3000, 5000]), mg = acak(4, 8), total = sisih * 7 * mg, harga = Math.max(5000, Math.floor((total - acak(0, 3) * 5000) / 5000) * 5000);
    const cel = pilih(CELENG), pd = pilih(PENDAMPING), tk = pilih(TOKO);
    return { judul: "Celengan " + besarAwal(cel),
      para: [[`${A} ingin membeli ${br}.`, `Harganya ${rp(harga)}.`],
        [`Setiap hari, ${A} menyisihkan ${rp(sisih)} dari uang sakunya.`, `Uang itu dimasukkan ke dalam celengan berbentuk ${cel}.`],
        [`Setelah ${kali_(mg)} minggu, celengan itu dibuka bersama ${pd}.`, "Ternyata uangnya cukup!", `${A} pun membeli ${br} di Toko ${tk}.`]],
      urut: [`${A} ingin membeli ${br}.`, `${A} menyisihkan uang saku setiap hari.`, `Celengan dibuka bersama ${pd}.`, `${A} membeli ${br} di Toko ${tk}.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Apa yang ingin dibeli ${A}?`, b: br, s: INGIN.filter(x => x !== br), pr: v => `${A} ingin membeli ${v}.` },
        { p: 0, k: [0, 1], q: `Berapa harga ${br} itu?`, b: rp(harga), s: [harga + 5000, harga - 5000, harga + 10000, harga * 2].filter(x => x > 0).map(rp), pr: v => `Harga ${br} itu ${v}.` },
        { p: 1, k: [1, 0], q: `Berapa uang yang disisihkan ${A} setiap hari?`, b: rp(sisih), s: [1000, 2000, 3000, 5000, 10000].filter(x => x !== sisih).map(rp), pr: v => `${A} menyisihkan ${v} setiap hari.` },
        { p: 1, k: [1, 1], q: "Celengan itu berbentuk …", b: cel, s: CELENG.filter(x => x !== cel), pr: v => `Celengan ${A} berbentuk ${v}.` },
        { p: 2, k: [2, 0], q: "Setelah berapa lama celengan itu dibuka?", b: `${kali_(mg)} minggu`, s: [3, 4, 5, 6, 7, 8, 10].filter(x => x !== mg).map(x => `${kali_(x)} minggu`), pr: v => `Celengan dibuka setelah ${v}.`, sulit: true },
        { p: 2, k: [2, 0], q: "Bersama siapa celengan itu dibuka?", b: pd, s: PENDAMPING.filter(x => x !== pd), pr: v => `Celengan dibuka bersama ${v}.` },
        { p: 2, k: [2, 2], q: `Di toko mana ${A} membeli ${br}?`, b: `Toko ${tk}`, s: TOKO.filter(x => x !== tk).map(x => `Toko ${x}`), pr: v => `${A} membeli ${br} di ${v}.` },
      ] };
  },
  /* 7. Hewan peliharaan */
  () => {
    const A = nama(), hw = pilih(PELIHARAAN), nh = pilih(NAMA_HEWAN), pd = pilih(PENDAMPING), n = acak(2, 5), tt = pilih(["sudut kandang", "keranjang tidurnya", "bawah meja"]);
    return { judul: `${nh} Sakit`,
      para: [[`${A} memelihara seekor ${hw.h} bernama ${nh}.`, `Setiap pagi, ${A} memberinya makan ${hw.mk}.`],
        [`Suatu hari, ${nh} tidak mau makan dan hanya diam di ${tt}.`, `${A} merasa khawatir.`, `Ia lalu membawa ${nh} ke dokter hewan bersama ${pd}.`],
        [`Dokter hewan memeriksa ${nh} dan memberinya obat.`, `Kata dokter, ${nh} harus beristirahat selama ${kali_(n)} hari.`, `Seminggu kemudian, ${nh} sudah kembali lincah.`]],
      urut: [`${nh} tidak mau makan.`, `${A} membawa ${nh} ke dokter hewan.`, `Dokter hewan memberi ${nh} obat.`, `${nh} kembali lincah.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Hewan apa yang dipelihara ${A}?`, b: hw.h, s: PELIHARAAN.filter(x => x !== hw).map(x => x.h), pr: v => `${A} memelihara seekor ${v}.` },
        { p: 0, k: [0, 0], q: `Siapa nama hewan peliharaan ${A}?`, b: nh, s: NAMA_HEWAN.filter(x => x !== nh), pr: v => `Hewan peliharaan ${A} bernama ${v}.` },
        { p: 0, k: [0, 1], q: `Setiap pagi, ${nh} diberi makan …`, b: hw.mk, s: PELIHARAAN.filter(x => x !== hw).map(x => x.mk), pr: v => `Setiap pagi, ${nh} diberi makan ${v}.` },
        { p: 1, k: [1, 1], q: `Bagaimana perasaan ${A} saat ${nh} tidak mau makan?`, b: "khawatir", s: ["gembira", "bangga", "marah", "malu"], pr: v => `${A} merasa ${v} saat ${nh} tidak mau makan.` },
        { p: 1, k: [1, 2], q: `${A} membawa ${nh} ke dokter hewan bersama …`, b: pd, s: PENDAMPING.filter(x => x !== pd), pr: v => `${A} pergi ke dokter hewan bersama ${v}.` },
        { p: 2, k: [2, 1], q: `Berapa hari ${nh} harus beristirahat?`, b: `${kali_(n)} hari`, s: [1, 2, 3, 4, 5, 7].filter(x => x !== n).map(x => `${kali_(x)} hari`), pr: v => `${nh} harus beristirahat selama ${v}.`, sulit: true },
        { p: 2, k: [2, 2], q: `Kapan ${nh} kembali lincah?`, b: "seminggu kemudian", s: ["keesokan harinya", "sebulan kemudian", "dua hari kemudian"], pr: v => `${nh} kembali lincah ${v}.`, sulit: true },
      ] };
  },
  /* 8. Kunjungan ke pabrik roti */
  () => {
    const A = nama(), kls = acak(4, 6), sek = pilih(SEKOLAH_LAIN), jam = pilih(JAM_PAGI), bu = pilih(DEWASA_BU), bt = pilih(BENTUK_ROTI), n = acak(2, 3), rs = pilih(RASA_ROTI);
    return { judul: "Berkunjung ke Pabrik Roti",
      para: [[`Siswa kelas ${kls} ${sek} berkunjung ke pabrik roti.`, `Mereka berangkat naik bus pukul ${jam}.`],
        [`Di sana, mereka dipandu oleh Bu ${bu}.`, `Bu ${bu} menunjukkan cara membuat roti, mulai dari mencampur adonan sampai memanggang roti di oven besar.`, "Para siswa juga boleh mencoba membentuk adonan sendiri."],
        [`${A} membentuk adonan seperti ${bt}.`, `Sebelum pulang, setiap siswa mendapat ${kali_(n)} roti rasa ${rs}.`]],
      urut: [`Siswa berangkat naik bus pukul ${jam}.`, `Bu ${bu} menunjukkan cara membuat roti.`, `${A} membentuk adonan seperti ${bt}.`, `Setiap siswa mendapat roti rasa ${rs}.`],
      fakta: [
        { p: 0, k: [0, 0], q: `Ke mana siswa kelas ${kls} berkunjung?`, b: "ke pabrik roti", s: ["ke pabrik susu", "ke toko kue", "ke pasar tradisional"], pr: v => `Siswa kelas ${kls} berkunjung ${v}.` },
        { p: 0, k: [0, 0], q: "Siswa kelas berapa yang berkunjung?", b: `kelas ${kls}`, s: [3, 4, 5, 6].filter(x => x !== kls).map(x => `kelas ${x}`), pr: v => `Siswa yang berkunjung adalah siswa ${v}.` },
        { p: 0, k: [0, 1], q: "Pukul berapa mereka berangkat?", b: `pukul ${jam}`, s: JAM_PAGI.filter(x => x !== jam).map(x => `pukul ${x}`), pr: v => `Mereka berangkat ${v}.` },
        { p: 1, k: [1, 0], q: "Siapa yang memandu para siswa?", b: `Bu ${bu}`, s: DEWASA_BU.filter(x => x !== bu).map(x => `Bu ${x}`), pr: v => `Para siswa dipandu oleh ${v}.` },
        { p: 1, k: [1, 1], q: "Di mana roti dipanggang?", b: "di oven besar", s: ["di atas kompor kecil", "di bawah sinar matahari", "di dalam kulkas"], pr: v => `Roti dipanggang ${v}.` },
        { p: 2, k: [2, 0], q: `${A} membentuk adonan seperti …`, b: bt, s: BENTUK_ROTI.filter(x => x !== bt), pr: v => `${A} membentuk adonan seperti ${v}.` },
        { p: 2, k: [2, 1], q: "Apa yang didapat setiap siswa sebelum pulang?", b: `${kali_(n)} roti rasa ${rs}`, s: [`${kali_(n)} roti rasa ${pilih(RASA_ROTI.filter(x => x !== rs))}`, `${kali_(n + 2)} roti rasa ${rs}`, `satu kotak kue rasa ${rs}`], pr: v => `Setiap siswa mendapat ${v}.`, sulit: true },
      ] };
  },
];
const ceritaAcak = () => pilih(CERITA)();
