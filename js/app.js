/* UI, story reader, quiz, local progress and navigation */
(() => {
  const $=id=>document.getElementById(id);
  const KEY='libraryDashWeb_v1';
  const stories=[
    {id:1,title:'Petualangan Pertama di Perpustakaan',emoji:'🏛️',cost:0,desc:'Kenali perpustakaan, pustakawan, area koleksi, dan aturan dasar.',pages:[
      ['Hari Pertama Nara','📚','Hari ini Nara mengunjungi perpustakaan untuk pertama kalinya. Ruangan itu tenang, dipenuhi rak buku dan meja baca. Di pintu, Nara melihat papan petunjuk yang membantunya menemukan tempat yang ia cari.'],
      ['Bertemu Pustakawan','🧑‍🏫','Seorang pustakawan menyambut Nara. Ia menjelaskan bahwa perpustakaan adalah tempat untuk mencari informasi, belajar, membaca, dan menggunakan koleksi dengan bertanggung jawab.'],
      ['Menjelajahi Koleksi','🗂️','Nara menemukan rak fiksi, ensiklopedia, majalah, dan buku pengetahuan. Label pada rak membantunya memilih buku sesuai topik. Jika bingung, Nara dapat bertanya kepada pustakawan.'],
      ['Aturan Bersama','🤫','Nara menjaga suara agar tidak mengganggu pembaca lain. Ia mengembalikan buku ke tempat yang ditentukan dan menjaga kebersihan ruang baca. Perpustakaan terasa nyaman untuk semua orang.']
    ],quiz:[['Apa fungsi perpustakaan?',['Tempat mencari informasi dan belajar','Tempat bermain bola','Tempat menyimpan makanan'],0],['Siapa yang membantu pengguna menemukan koleksi?',['Penjaga parkir','Pustakawan','Koki'],1],['Apa yang sebaiknya dilakukan di ruang baca?',['Berteriak','Merusak buku','Menjaga ketenangan'],2],['Bagaimana menemukan topik buku?',['Melihat label rak atau katalog','Menebak saja','Membawa semua buku'],0],['Setelah membaca, kita perlu…',['Meninggalkan sampah','Menjaga dan mengembalikan buku sesuai aturan','Melipat halaman'],1]]},
    {id:2,title:'Misi Meminjam Buku',emoji:'🪪',cost:50,desc:'Belajar mencari buku, meminjam, dan mengembalikannya tepat waktu.',pages:[
      ['Buku yang Dicari','🔎','Raka ingin meminjam buku tentang luar angkasa. Ia menelusuri katalog dan mencatat judul serta nomor panggil buku agar mudah menemukannya di rak.'],
      ['Memeriksa Koleksi','📖','Raka menemukan buku yang tepat. Ia memeriksa kondisi buku lalu membawa buku tersebut ke meja layanan peminjaman.'],
      ['Proses Peminjaman','🪪','Petugas memproses peminjaman sesuai aturan perpustakaan. Raka memperhatikan tanggal pengembalian dan menyimpannya sebagai pengingat.'],
      ['Kembali Tepat Waktu','📅','Sebelum batas waktu, Raka mengembalikan buku. Ia belajar bahwa mematuhi aturan peminjaman membantu pengguna lain mendapatkan kesempatan membaca.']
    ],quiz:[['Apa yang membantu menemukan buku di rak?',['Nomor panggil','Warna sepatu','Nomor kendaraan'],0],['Di mana peminjaman diproses?',['Kantin','Meja layanan peminjaman','Taman'],1],['Mengapa tanggal pengembalian perlu diperhatikan?',['Agar buku bisa dijaga dan dipakai bergiliran','Agar buku hilang','Agar tidak perlu membaca'],0],['Sebelum meminjam, sebaiknya…',['Merobek sampul','Memeriksa kondisi koleksi','Mencoret halaman'],1],['Apa yang dilakukan saat jatuh tempo?',['Menyembunyikan buku','Mengembalikan sesuai aturan','Memberikan ke orang asing'],1]]},
    {id:3,title:'Penjaga Buku Hebat',emoji:'🧤',cost:50,desc:'Kenali cara merawat buku agar tetap bersih dan awet.',pages:[
      ['Janji Penjaga Buku','🧤','Mira senang membaca dan ingin buku kesayangannya tetap awet. Ia berjanji memperlakukan setiap buku dengan hati-hati, baik buku milik sendiri maupun milik perpustakaan.'],
      ['Tangan Bersih','🫧','Sebelum membaca, Mira memastikan tangannya bersih dan kering. Ia menjauhkan makanan serta minuman dari buku agar halaman tidak terkena noda.'],
      ['Halaman yang Rapi','📘','Mira tidak melipat sudut halaman atau mencoret isi buku. Ia memakai pembatas buku untuk menandai halaman yang sedang dibaca.'],
      ['Simpan dengan Baik','🗄️','Setelah selesai, Mira menyimpan buku di tempat yang kering dan bersih. Buku dikembalikan sesuai aturan agar pembaca lain dapat menemukannya.']
    ],quiz:[['Mengapa tangan perlu bersih sebelum membaca?',['Supaya halaman tidak kotor','Supaya buku lebih berat','Supaya tulisan hilang'],0],['Bagaimana menandai halaman?',['Melipat ujung halaman','Mencoret teks','Menggunakan pembatas buku'],2],['Apa yang sebaiknya dijauhkan dari buku?',['Pembatas buku','Makanan dan minuman','Rak buku'],1],['Buku sebaiknya disimpan di tempat…',['Basah','Kotor','Kering dan bersih'],2],['Apa contoh merusak buku?',['Membaca dengan hati-hati','Merobek halaman','Menggunakan pembatas'],1]]},
    {id:4,title:'Rahasia Memilih Bacaan',emoji:'🧭',cost:50,desc:'Pilih bacaan berdasarkan minat, kebutuhan, dan informasi katalog.',pages:[
      ['Banyak Pilihan','🧭','Dina ingin membaca sesuatu yang baru. Ada banyak pilihan di rak, jadi ia mulai dengan memikirkan hal yang paling ia sukai: hewan, petualangan, atau sains.'],
      ['Baca Informasi Buku','🔍','Dina memperhatikan judul, sampul, daftar isi, penulis, dan deskripsi buku. Informasi itu memberi gambaran tentang isi dan tingkat kesulitan bacaan.'],
      ['Cocok dengan Kebutuhan','🎯','Dina memilih buku yang sesuai dengan minat dan tujuan belajarnya. Jika belum yakin, ia membaca beberapa halaman atau meminta rekomendasi pustakawan.'],
      ['Nikmati Bacaan','🌱','Setelah memilih, Dina membaca dengan nyaman. Ia tahu bahwa tidak semua buku harus dibaca sekaligus; yang penting, ia menemukan bacaan yang bermanfaat dan menyenangkan.']
    ],quiz:[['Apa yang sebaiknya dipertimbangkan saat memilih buku?',['Minat dan kebutuhan','Warna tas saja','Ukuran sepatu'],0],['Informasi apa yang membantu mengenali isi buku?',['Nomor kursi','Judul dan deskripsi','Cuaca'],1],['Jika bingung memilih buku, kita bisa…',['Merobek sampul','Berhenti mencari informasi','Meminta rekomendasi pustakawan'],2],['Bagaimana mengetahui tingkat kesulitan?',['Melihat isi dan bahasa buku','Menghitung rak','Melihat warna lantai'],0],['Tujuan memilih bacaan adalah…',['Menumpuk buku','Menemukan bacaan yang sesuai','Menghindari membaca'],1]]},
    {id:5,title:'Petualangan Buku Digital',emoji:'💻',cost:50,desc:'Mengenal e-book dan menggunakan sumber digital secara bijak.',pages:[
      ['Buku di Layar','💻','Bima menemukan e-book, yaitu buku dalam format digital yang dapat dibaca melalui perangkat yang mendukung. Ia dapat membawa banyak bacaan tanpa harus membawa semua buku cetak.'],
      ['Temukan Sumber Tepercaya','🌐','Saat mencari informasi, Bima memeriksa siapa penulisnya, kapan informasi diterbitkan, dan apakah sumbernya dapat dipercaya. Ia tidak langsung membagikan semua informasi yang ditemukan.'],
      ['Baca dengan Nyaman','👓','Bima mengatur ukuran huruf dan kecerahan layar agar nyaman. Ia juga beristirahat secara berkala dan menjaga perangkat dengan baik.'],
      ['Gunakan dengan Bijak','🔐','Bima menghormati hak cipta, menjaga data pribadi, dan mengikuti aturan akses koleksi digital. Teknologi membantunya belajar ketika digunakan secara bertanggung jawab.']
    ],quiz:[['Apa itu e-book?',['Buku format digital','Rak buku kayu','Kartu anggota'],0],['Bagaimana memeriksa sumber informasi?',['Langsung percaya semuanya','Memeriksa penulis dan sumbernya','Melihat jumlah warna'],1],['Apa yang baik saat membaca layar?',['Tidak pernah istirahat','Menaikkan kecerahan setinggi mungkin','Beristirahat secara berkala'],2],['Apa yang harus dihormati saat memakai buku digital?',['Hak cipta','Kata sandi orang lain','Informasi palsu'],0],['Informasi pribadi di internet harus…',['Dibagikan kepada semua orang','Dijaga dengan baik','Ditulis di semua situs'],1]]},
    {id:11,title:'Rahasia Katalog Buku',emoji:'🔎',cost:50,desc:'Nisa belajar memakai katalog untuk menemukan buku yang ia cari.',pages:[['Mencari Buku','🔎','Nisa ingin membaca buku tentang dinosaurus. Ia membuka katalog perpustakaan, yaitu daftar informasi buku yang bisa dicari berdasarkan judul, penulis, atau topik.'],['Catat Informasinya','📝','Di katalog, Nisa menemukan judul buku dan nama penulisnya. Ia juga melihat nomor panggil agar tahu di rak mana buku itu berada.'],['Buku Ditemukan','📚','Nisa mengikuti petunjuk rak dan menemukan buku yang dicari. Jika belum paham, ia boleh meminta bantuan pustakawan.']],quiz:[['Apa fungsi katalog?',['Membantu mencari informasi buku','Menghias meja','Menghitung koin'],0],['Kita bisa mencari katalog berdasarkan…',['Warna baju','Judul atau penulis','Cuaca'],1],['Jika kesulitan memakai katalog, kita bisa…',['Menutup perpustakaan','Merusak komputer','Meminta bantuan pustakawan'],2]]},
    {id:12,title:'Petunjuk Nomor Panggil',emoji:'🏷️',cost:50,desc:'Ikuti kode sederhana agar buku bisa ditemukan di rak yang tepat.',pages:[['Kode di Punggung Buku','🏷️','Beni melihat label kecil di punggung buku. Label itu berisi nomor panggil, yaitu kode yang membantu menunjukkan lokasi buku di rak.'],['Ikuti Petunjuk','🧭','Beni membaca kode pada katalog, lalu mencari label rak yang sesuai. Ia berjalan perlahan dan melihat tulisan pada rak.'],['Buku di Tempatnya','📖','Beni menemukan buku yang tepat dan mengembalikannya dengan hati-hati setelah membaca. Ia tidak memindahkan buku lain sembarangan.']],quiz:[['Nomor panggil membantu kita…',['Menemukan lokasi buku','Menentukan harga makanan','Membuka pintu kelas'],0],['Nomor panggil biasanya bisa ditemukan pada…',['Kotak pensil','Label buku','Sepatu'],1],['Saat selesai membaca buku perpustakaan, kita harus…',['Menyembunyikannya','Mencoret labelnya','Mengikuti aturan pengembalian'],2]]},
    {id:13,title:'Teman Pustakawan',emoji:'🧑‍🏫',cost:50,desc:'Belajar meminta bantuan dengan sopan dan memakai perpustakaan bersama.',pages:[['Pertanyaan Dito','🙋','Dito belum menemukan buku tentang planet. Ia menghampiri pustakawan dan bertanya dengan sopan di mana buku itu bisa ditemukan.'],['Bantuan yang Ramah','💬','Pustakawan membantu Dito mencari melalui katalog dan menunjukkan bagian rak pengetahuan. Dito mengucapkan terima kasih.'],['Perpustakaan untuk Semua','🤝','Dito belajar bahwa perpustakaan digunakan bersama. Setiap pengunjung perlu menjaga koleksi dan menghormati orang lain.']],quiz:[['Siapa pustakawan?',['Orang yang membantu layanan perpustakaan','Penjual es krim','Wasit sepak bola'],0],['Saat meminta bantuan, kita sebaiknya…',['Berteriak','Berbicara sopan','Mendorong orang'],1],['Perpustakaan digunakan…',['Hanya untuk satu orang','Tanpa menjaga buku','Bersama dengan saling menghormati'],2]]},
    {id:14,title:'Ensiklopedia dan Kamus',emoji:'📚',cost:100,desc:'Kenali buku referensi untuk mencari jawaban dan arti kata.',pages:[['Pertanyaan Rani','❓','Rani ingin tahu fakta tentang paus. Ia mencari ensiklopedia, buku referensi yang berisi informasi tentang banyak topik.'],['Mencari Arti Kata','🔤','Ketika menemukan kata yang sulit, Rani membuka kamus untuk mengetahui arti kata dan cara penggunaannya.'],['Gunakan Buku yang Tepat','💡','Rani belajar memilih sumber sesuai kebutuhan: ensiklopedia untuk informasi umum dan kamus untuk arti kata.']],quiz:[['Ensiklopedia berisi…',['Informasi tentang banyak topik','Hanya daftar nilai kelas','Resep satu makanan saja'],0],['Kamus membantu kita mencari…',['Nomor kendaraan','Arti kata','Jadwal bus'],1],['Buku referensi digunakan untuk…',['Menghias rak','Mengganti tas','Mencari informasi tertentu'],2]]},
    {id:6,title:'Jejak Harta Karun Kata',emoji:'🗺️',cost:100,desc:'Ikuti petunjuk, pahami kata baru, dan temukan makna dari bacaan.',pages:[['Peta Rahasia','🗺️','Alya menemukan peta di dalam buku petualangan. Untuk memahami petunjuknya, ia membaca kalimat dengan teliti dan menandai kata-kata penting.'],['Kata yang Baru','🔎','Alya menemukan kata yang belum ia kenal. Ia membaca kalimat di sekitarnya lalu membuka kamus untuk memeriksa maknanya.'],['Petunjuk Berurutan','🧩','Setiap petunjuk membawanya ke petunjuk berikutnya. Alya belajar bahwa memahami bacaan perlu kesabaran dan perhatian.']],quiz:[['Apa yang bisa membantu memahami kata baru?',['Menebak tanpa membaca','Kamus dan konteks kalimat','Menutup buku'],1],['Saat membaca petunjuk, kita sebaiknya…',['Membaca dengan teliti','Langsung melompat ke akhir','Mengabaikan kata penting'],0],['Apa arti konteks kalimat?',['Warna sampul','Kata-kata di sekitar sebuah kata','Nomor rak'],1]]},
    {id:7,title:'Klub Detektif Informasi',emoji:'🕵️',cost:100,desc:'Belajar membedakan fakta, pendapat, dan informasi yang perlu diperiksa.',pages:[['Berita Mengejutkan','📰','Dito membaca kabar mengejutkan di papan sekolah. Sebelum membagikannya, ia mencari tahu dari mana kabar itu berasal.'],['Periksa Bukti','🔍','Dito membandingkan informasi dari sumber tepercaya dan melihat tanggal penerbitannya. Ia tidak langsung percaya pada judul yang heboh.'],['Fakta atau Pendapat','💡','Dito belajar bahwa fakta dapat diperiksa kebenarannya, sedangkan pendapat menyampaikan pandangan seseorang.']],quiz:[['Sebelum membagikan kabar, kita perlu…',['Memeriksa sumbernya','Mengubah judulnya','Langsung menyebarkan'],0],['Fakta adalah informasi yang…',['Selalu lucu','Dapat diperiksa kebenarannya','Hanya berupa pendapat'],1],['Apa yang perlu diperhatikan pada sumber informasi?',['Warna huruf saja','Jumlah emoji','Penulis dan tanggal'],2]]},
    {id:8,title:'Ensiklopedia Alam Ajaib',emoji:'🌿',cost:100,desc:'Jelajahi pengetahuan tentang hewan, tumbuhan, dan lingkungan.',pages:[['Pertanyaan Lala','🌱','Lala ingin tahu mengapa tanaman membutuhkan cahaya. Ia mencari jawabannya di ensiklopedia alam.'],['Cari Berdasarkan Topik','📚','Daftar isi dan indeks membantu Lala menemukan halaman tentang tumbuhan tanpa harus membaca seluruh buku dari awal.'],['Pengetahuan Jadi Aksi','🌳','Setelah membaca, Lala mulai merawat tanaman di halaman rumah dan menghemat air. Pengetahuan terasa berguna ketika diterapkan.']],quiz:[['Apa fungsi indeks buku?',['Menemukan topik atau istilah','Menghias sampul','Mengganti halaman'],0],['Saat mencari topik khusus, kita bisa melihat…',['Daftar belanja','Indeks atau daftar isi','Halaman terakhir saja'],1],['Pengetahuan bisa bermanfaat jika…',['Hanya disimpan','Dilupakan','Diterapkan dengan baik'],2]]},
    {id:9,title:'Petualangan Arsip Waktu',emoji:'🕰️',cost:100,desc:'Kenali arsip dan pentingnya menyimpan catatan sejarah.',pages:[['Kotak Kenangan','📦','Rafi menemukan foto lama keluarganya. Kakek menjelaskan bahwa foto, surat, dan catatan dapat menjadi bukti tentang masa lalu.'],['Rawat Dokumen','🗂️','Dokumen disimpan dengan rapi, diberi keterangan, dan dijauhkan dari air. Dengan begitu, orang lain dapat memahaminya di kemudian hari.'],['Cerita dari Masa Lalu','🧭','Rafi menyadari bahwa arsip membantu kita mengingat peristiwa dan mempelajari perubahan dari waktu ke waktu.']],quiz:[['Arsip dapat berupa…',['Hanya mainan','Foto, surat, dan dokumen','Makanan'],1],['Mengapa arsip dirawat?',['Agar tetap bisa digunakan sebagai sumber informasi','Agar cepat rusak','Agar tidak ditemukan'],0],['Keterangan pada dokumen membantu kita…',['Mengubah isi sejarah','Membuat dokumen basah','Memahami konteksnya'],2]]},
    {id:10,title:'Pustakawan Cilik',emoji:'🧑‍🏫',cost:150,desc:'Jadilah sahabat pembaca dengan membantu orang lain menemukan bacaan.',pages:[['Teman yang Kebingungan','🤝','Salsa melihat temannya bingung mencari buku tentang planet. Ia menawarkan bantuan dan bertanya informasi apa yang sedang dicari.'],['Cari Bersama','🔎','Mereka menggunakan katalog dan membaca label rak. Jika masih bingung, mereka meminta bantuan pustakawan.'],['Berbagi dengan Baik','💛','Salsa mengingatkan temannya untuk menjaga buku dan mengembalikannya sesuai aturan. Membantu orang lain membuat perpustakaan lebih ramah.']],quiz:[['Bagaimana membantu teman mencari buku?',['Menyembunyikan buku','Bertanya tentang topik lalu mencari bersama','Menyuruhnya pergi'],1],['Jika belum menemukan koleksi, kita bisa…',['Meminta bantuan pustakawan','Merusak rak','Mengambil buku sembarangan'],0],['Perpustakaan yang ramah berarti…',['Hanya untuk satu orang','Tidak punya aturan','Membantu pengguna dan menjaga koleksi'],2]]},
    {id:15,title:'Peri Kecil Penjaga Bintang',emoji:'🌟',cost:150,desc:'Cerita tentang keberanian, persahabatan, dan menolong teman.',pages:[['Cahaya yang Hilang','🌌','Di sebuah desa kecil, Lili si peri melihat satu bintang kecil kehilangan cahayanya. Ia ingin membantu, tetapi harus mencari tahu mengapa bintang itu sedih.'],['Teman-teman Membantu','🤝','Lili mengajak Kiko si kelinci dan Momo si burung mencari bunga cahaya. Mereka saling mendengarkan ide dan bekerja sama melewati hutan.'],['Bintang Bersinar Lagi','✨','Mereka menemukan bunga cahaya dan membawanya ke bukit. Bintang itu kembali bersinar. Lili belajar bahwa keberanian terasa lebih mudah saat teman saling membantu.']],quiz:[['Apa yang ingin dilakukan Lili?',['Menyembunyikan bintang','Membantu bintang kecil','Mengambil semua bunga'],1],['Bagaimana teman-teman menyelesaikan masalah?',['Bekerja sama','Bertengkar terus','Berjalan sendiri-sendiri'],0],['Apa pelajaran dari cerita ini?',['Jangan pernah bertanya','Teman tidak dibutuhkan','Kerja sama dan saling membantu itu penting'],2]]}
  ];
  const missionQuestions=[
    ['Apa fungsi perpustakaan?',['Tempat mencari informasi','Tempat balapan mobil','Tempat memasak'],0],
    ['Siapa yang membantu kita mencari buku di perpustakaan?',['Pustakawan','Pilot','Dokter hewan'],0],
    ['Apa yang sebaiknya dilakukan saat berada di ruang baca?',['Berteriak keras','Menjaga ketenangan','Berlari di antara rak'],1],
    ['Bagaimana cara menandai halaman buku?',['Merobek sudutnya','Mencoret halaman','Memakai pembatas buku'],2],
    ['Apa yang perlu dijauhkan dari buku?',['Makanan dan minuman','Pembatas buku','Rak buku'],0],
    ['Apa yang membantu menemukan buku di rak?',['Nomor panggil atau katalog','Warna sepatu','Nomor rumah'],0],
    ['Apa yang harus dilakukan setelah meminjam buku?',['Menyembunyikannya','Mengembalikan tepat waktu','Membiarkannya di lantai'],1],
    ['Apa itu e-book?',['Buku digital','Buku yang terbuat dari batu','Kartu perpustakaan'],0],
    ['Saat mencari informasi di internet, kita sebaiknya…',['Percaya semua informasi','Memeriksa sumbernya','Membagikan kata sandi'],1],
    ['Bagaimana menjaga buku agar awet?',['Melipat semua halaman','Menulis di setiap halaman','Menjaga buku tetap bersih'],2]
  ];
  const levelQuestionBank=[
    [['Apa tujuan utama perpustakaan?',['Membantu orang menemukan informasi','Tempat menyimpan makanan','Tempat balapan'],0],['Siapa yang membantu mencari koleksi?',['Pustakawan','Pilot','Koki'],0]],
    [['Apa yang dimaksud kategori koleksi?',['Pengelompokan buku berdasarkan ciri/topik','Warna lantai','Urutan pengunjung'],0],['Buku tentang hewan paling sesuai dicari pada topik…',['Zoologi/hewan','Matematika saja','Olahraga air'],0]],
    [['Mengapa kita menjaga ketenangan ruang baca?',['Agar semua bisa berkonsentrasi','Agar buku berubah warna','Agar cepat pulang'],0],['Jika ingin berbicara di perpustakaan, sebaiknya…',['Berbicara pelan','Berteriak','Memutar musik keras'],0]],
    [['Katalog perpustakaan digunakan untuk…',['Menelusuri informasi koleksi','Mengukur tinggi rak','Mencatat menu kantin'],0],['Kata kunci yang baik untuk mencari buku planet adalah…',['Planet','Sepatu basah','Kue cokelat'],0]],
    [['Nomor panggil membantu menunjukkan…',['Lokasi buku di rak','Harga makanan','Nomor kendaraan'],0],['Informasi apa yang umumnya ada pada katalog?',['Judul dan penulis','Warna tas pembaca','Menu makan siang'],0]],
    [['Apa salah satu tugas pustakawan?',['Membantu layanan informasi dan koleksi','Memperbaiki kendaraan','Menjual tiket pesawat'],0],['Jika tidak menemukan buku, langkah tepat adalah…',['Bertanya kepada pustakawan','Mengacak semua rak','Membawa pulang tanpa izin'],0]],
    [['Cara merawat buku yang tepat adalah…',['Menjaga buku tetap bersih dan kering','Melipat semua halaman','Mencoret isi buku'],0],['Mengapa makanan sebaiknya dijauhkan dari buku?',['Mencegah noda dan kerusakan','Agar buku lebih berat','Agar tulisan pudar'],0]],
    [['Sumber informasi yang tepercaya sebaiknya memiliki…',['Penulis dan sumber yang jelas','Judul heboh saja','Banyak emoji saja'],0],['Saat menemukan berita mengejutkan, kita sebaiknya…',['Memeriksa sumber dan bukti','Langsung menyebarkannya','Mengubah isinya'],0]],
    [['E-book adalah…',['Buku dalam format digital','Buku dari batu','Kartu anggota'],0],['Hak cipta berarti kita perlu…',['Menghormati hak pencipta karya','Mengaku karya orang lain','Menyebarkan semua file tanpa aturan'],0]],
    [['Ensiklopedia biasanya berisi…',['Informasi rujukan tentang beragam topik','Hanya satu daftar belanja','Kumpulan nomor telepon pribadi'],0],['Jika mencari arti kata, sumber yang cocok adalah…',['Kamus','Atlas saja','Buku menu'],0]],
    [['Daftar isi membantu pembaca mengetahui…',['Susunan bagian atau bab buku','Harga rak','Nama semua pengunjung'],0],['Indeks biasanya disusun untuk membantu menemukan…',['Topik atau istilah tertentu','Warna sampul','Nomor sepatu'],0]],
    [['Apa yang perlu dilakukan sebelum membagikan informasi online?',['Memeriksa fakta dan sumber','Percaya judul saja','Meneruskan tanpa membaca'],0],['Pernyataan fakta adalah pernyataan yang…',['Dapat diperiksa kebenarannya','Selalu berupa selera','Tidak perlu bukti'],0]],
    [['Contoh arsip adalah…',['Surat, foto, dan dokumen penting','Makanan ringan','Mainan sekali pakai saja'],0],['Mengapa arsip diberi keterangan?',['Agar konteks dan isinya mudah dipahami','Agar sulit ditemukan','Agar cepat rusak'],0]],
    [['Saat mencari informasi, kita perlu menentukan…',['Kebutuhan informasi dan kata kunci','Warna sepatu','Menu makan malam'],0],['Jika dua sumber berbeda pendapat, sebaiknya…',['Bandingkan bukti dan kredibilitas sumber','Pilih yang paling heboh','Abaikan semua fakta'],0]],
    [['Apa sikap baik seorang pengguna perpustakaan?',['Menjaga koleksi dan menghormati orang lain','Menyembunyikan buku','Mengganggu pembaca lain'],0],['Mengapa koleksi perlu disusun rapi?',['Agar mudah ditemukan dan digunakan','Agar tidak bisa dipinjam','Agar rak cepat kosong'],0]]
  ];
  let data=load(),activeStory=null,pageIndex=0,quizIndex=0,quizScore=0,quizAnswered=false;
  let missionIndex=0,missionScore=0,missionAnswered=false,missionFinished=false,missionDistance=0,missionRewardCoins=0,currentCorrectIndex=0;
  let levelMode=false, activeLevel=null, levelCoins=0;
  const levelTitles=['Kenalan dengan Buku','Jelajah Rak Warna','Aturan Perpustakaan','Misi Katalog','Nomor Panggil','Sahabat Pustakawan','Penjaga Buku','Pemburu Informasi','Dunia E-book','Kuis Ensiklopedia','Jejak Indeks','Detektif Informasi','Arsip Waktu','Tantangan Literasi','Pustakawan Cilik'];
  const levelTopics=['fungsi perpustakaan','warna dan kategori koleksi','aturan ruang baca','katalog buku','nomor panggil','peran pustakawan','perawatan koleksi','sumber informasi tepercaya','buku digital dan hak cipta','buku referensi','indeks dan daftar isi','fakta dan hoaks','arsip dan dokumen','literasi informasi','pengetahuan perpustakaan'];
  const levelPlans=[
    {type:'books',count:6,word:'BUKU'}, {type:'letters',word:'BACA'}, {type:'books',count:8,word:'BUKU'},
    {type:'letters',word:'RAK'}, {type:'books',count:10,word:'BUKU'}, {type:'letters',word:'ARSIP'},
    {type:'books',count:9,word:'BUKU'}, {type:'letters',word:'KODE'}, {type:'books',count:10,word:'BUKU'},
    {type:'letters',word:'LITERASI'}, {type:'books',count:11,word:'BUKU'}, {type:'letters',word:'INDEKS'},
    {type:'books',count:12,word:'BUKU'}, {type:'letters',word:'KATALOG'}, {type:'books',count:14,word:'BUKU'}
  ];
  let runningDistance=450;
  const levels=levelPlans.map((plan,i)=>{const n=i+1,hard=n%5===0;if(n>1)runningDistance+=hard?100:25;const targetType=plan.type,word=plan.word,targetCount=targetType==='books'?plan.count:word.length,questions=2;return {id:n,title:levelTitles[i],topic:levelTopics[i],targetType,targetCount,word,desc:targetType==='books'?`Kumpulkan ${targetCount} buku merah di sepanjang lintasan dan jawab ${questions} soal ${levelTopics[i]}.`:`Kumpulkan huruf untuk menyusun kata “${word}” dan jawab ${questions} soal ${levelTopics[i]}.`,distance:runningDistance,questions,reward:hard?50:20,hard};});
  function fresh(){return {coins:0,keys:0,best:0,totalRuns:0,totalScore:0,owned:[1],read:[],quizBest:{},missions:[],badges:[],lastRunCoins:0,activity:{reads:[],quizzes:[],runs:[],coins:[]},missionClaims:[],levelsCompleted:[],levelRewards:[]};}
  function load(){try{const saved={...fresh(),...JSON.parse(localStorage.getItem(KEY)||'{}')};if(typeof saved.keys!=='number')saved.keys=0;saved.activity={...fresh().activity,...(saved.activity||{})};saved.missionClaims=saved.missionClaims||[];saved.levelsCompleted=saved.levelsCompleted||[];saved.levelRewards=saved.levelRewards||[];return saved}catch(e){return fresh()}}
  function save(){localStorage.setItem(KEY,JSON.stringify(data));updateHeader()}
  function recordActivity(type,value){if(!data.activity)data.activity={reads:[],quizzes:[],runs:[],coins:[]};if(!data.activity[type])data.activity[type]=[];data.activity[type].push({at:Date.now(),value});}
  function periodKey(kind){const d=new Date();if(kind==='daily')return `D-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;const jan1=new Date(d.getFullYear(),0,1);const week=Math.ceil((((d-jan1)/86400000)+jan1.getDay()+1)/7);return `W-${d.getFullYear()}-${String(week).padStart(2,'0')}`;}
  function activityCount(type,kind){const now=new Date();const start=new Date(now.getFullYear(),now.getMonth(),now.getDate());if(kind==='weekly'){const day=(now.getDay()+6)%7;start.setDate(now.getDate()-day);}return (data.activity?.[type]||[]).filter(x=>x.at>=start.getTime()).length;}

  function updateHeader(){$('headerCoins').textContent=data.coins;$('headerBest').textContent=data.best;if($('headerKeys'))$('headerKeys').textContent=data.keys||0}
  function showScreen(name){['homeScreen','gameScreen','contentScreen'].forEach(id=>$(id).classList.toggle('hidden',id!==name));}
  function mount(title,kicker,desc,body,count=''){ $('contentMount').innerHTML=`<div class="content-heading"><div class="content-heading-copy"><h2>${title}</h2><p>${desc}</p></div>${count?`<span class="content-count">${count}</span>`:''}</div>${body}`;showScreen('contentScreen');}
  function storyCard(s,ownedMode=false){
    const owned=data.owned.includes(s.id),read=data.read.includes(s.id),canAfford=data.coins>=s.cost;
    let label,disabled=false,action='';
    if(ownedMode){label=read?'Baca Lagi':'Mulai Membaca';action=`open-story-${s.id}`}
    else if(owned){label=read?'Baca Lagi':'Mulai Membaca';action=`open-story-${s.id}`}
    else if(canAfford){label=`Buka · ${s.cost} koin`;action=`unlock-story-${s.id}`}
    else if((data.keys||0)>0){label='Buka · 1 kunci';action=`unlock-story-key-${s.id}`}
    else{label=`🔒 ${s.cost} koin`;disabled=true}
    return `<article class="story-card"><div class="story-cover">${s.emoji}</div><div class="story-meta"><span>BUKU ${String(s.id).padStart(2,'0')}</span><span>${read?'✓ Sudah dibaca':owned?'Dimiliki':`<span class="locked-label">🔒 Terkunci</span>`}</span></div><h3>${s.title}</h3><p>${s.desc}</p><button class="btn ${owned?'btn-secondary':'btn-primary'}" data-action="${action}" ${disabled?'disabled':''}>${label}</button></article>`;
  }
  function openLibrary(){
    const terms=[['🔎','Katalog','Daftar informasi tentang buku. Kamu bisa mencari berdasarkan judul, penulis, atau topik.'],['🏷️','Nomor Panggil','Kode pada label buku yang membantu menemukan buku di rak.'],['🧑‍🏫','Pustakawan','Orang yang membantu pengunjung mencari buku dan menggunakan perpustakaan.'],['🧒','Pemustaka','Orang yang menggunakan layanan atau koleksi perpustakaan, misalnya untuk membaca dan belajar.'],['🪪','Kartu Anggota','Kartu identitas untuk menggunakan layanan perpustakaan sesuai aturan.'],['📚','Koleksi','Semua bahan yang tersedia, seperti buku cerita, majalah, ensiklopedia, dan e-book.'],['📖','Buku Referensi','Buku untuk mencari jawaban atau informasi tertentu, seperti kamus dan ensiklopedia.'],['💻','E-book','Buku digital yang dibaca lewat komputer, tablet, atau ponsel.'],['📅','Tanggal Kembali','Batas tanggal untuk mengembalikan buku pinjaman.'],['📑','Daftar Isi','Daftar bab atau bagian buku beserta halaman awalnya.'],['🔤','Indeks','Daftar istilah atau topik yang membantu menemukan halaman tertentu.'],['🧾','ISBN','Nomor khusus untuk mengenali sebuah edisi buku.'],['📰','Majalah','Terbitan yang berisi artikel, berita, gambar, atau topik tertentu.']];
    const termSection=`<section class="glossary-section glossary-first"><div class="glossary-grid">${terms.map(t=>`<article class="glossary-card"><span>${t[0]}</span><div><h3>${t[1]}</h3><p>${t[2]}</p></div></article>`).join('')}</div></section>`;
    mount('Perpustakaan','ENSIKLOPEDIA MINI','Kenali orang, istilah, dan layanan yang sering kamu temui di perpustakaan.',termSection,'13 ISTILAH');
  }
  function storeBookCard(s){
    const owned=data.owned.includes(s.id);
    return `<article class="store-book"><div class="store-book-cover" aria-hidden="true"><span>${s.emoji}</span><i>LIBRARY DASH</i></div><h3>${s.title}</h3><p class="store-book-price">${owned?'Sudah dimiliki':s.cost===0?'Gratis':`🪙 ${s.cost} koin`}</p><button class="btn btn-primary store-view-btn" data-action="view-book-${s.id}">Lihat</button></article>`;
  }
  function openBookstore(){
    const libraryBooks=stories.filter(s=>[1,2,3,4,5,11,12,13,14].includes(s.id));
    const storyBooks=stories.filter(s=>[6,7,8,9,10,15].includes(s.id));
    const storeSection=`<section class="bookstore-section"><h3 class="book-category-title">Belajar tentang Perpustakaan <span>9 buku</span></h3><div class="store-book-grid">${libraryBooks.map(storeBookCard).join('')}</div><h3 class="book-category-title story-category-title">Cerita Anak <span>6 buku</span></h3><div class="store-book-grid">${storyBooks.map(storeBookCard).join('')}</div><dialog class="book-detail-dialog" id="bookDetailDialog"><div id="bookDetailContent"></div></dialog></section>`;
    mount('Toko Buku','TOKO BUKU DIGITAL','Gunakan koin untuk membuka koleksi bacaan.',storeSection,`KOIN: ${data.coins}`);
  }
  function showBookDetails(id){
    const s=stories.find(book=>book.id===id);if(!s)return;
    const owned=data.owned.includes(s.id),canAfford=data.coins>=s.cost,hasKey=(data.keys||0)>0;
    const action=owned?`open-story-${s.id}`:canAfford?`unlock-story-${s.id}`:hasKey?`unlock-story-key-${s.id}`:'';
    const buyLabel=owned?'Baca Buku':s.cost===0?'Ambil Buku Gratis':canAfford?`Beli Buku · ${s.cost} koin`:hasKey?'Gunakan 1 Kunci Buku':`Butuh ${s.cost-data.coins} koin lagi`;
    const content=$('bookDetailContent');
    content.innerHTML=`<div class="book-detail-cover">${s.emoji}</div><span class="eyebrow">DETAIL BUKU</span><h2>${s.title}</h2><p class="book-detail-description">${s.desc}</p><div class="book-detail-price">${owned?'Sudah ada di Rak Bukumu':s.cost===0?'Gratis':`Harga: ${s.cost} koin`}</div><div class="book-detail-actions"><button class="btn btn-secondary" type="button" data-action="close-book-detail">Kembali</button><button class="btn btn-primary" type="button" data-action="${action||'cannot-buy-book'}" ${(!owned&&!canAfford&&!hasKey&&s.cost>0)?'disabled':''}>${buyLabel}</button></div>`;
    const dialog=$('bookDetailDialog');if(dialog&&!dialog.open)dialog.showModal();
  }
  function openShelf(){const owned=stories.filter(s=>data.owned.includes(s.id));mount('Rak Bukuku','KOLEKSI PRIBADI','Semua cerita yang sudah kamu buka ada di sini.',`<div class="inventory-strip"><div class="inventory-item">🗝️ <span><b>${data.keys||0}</b><small>Kunci Buku</small></span></div><div class="inventory-item">🪙 <span><b>${data.coins}</b><small>Koin Tersimpan</small></span></div></div>${owned.length?`<div class="story-grid">${owned.map(s=>storyCard(s,true)).join('')}</div>`:`<div class="notice">Rak bukumu masih kosong. Kunjungi Perpustakaan untuk membuka cerita pertama.</div>`}`,`${owned.length} CERITA`);}
  function openStory(id){activeStory=stories.find(s=>s.id===id);pageIndex=0;renderPage();}
  function renderPage(){
    const p=activeStory.pages[pageIndex];
    $('contentMount').innerHTML=`<div class="story-reader"><div class="reader-top"><span>LIBRARY DASH · CERITA ${activeStory.id}</span><span>HALAMAN ${pageIndex+1}/${activeStory.pages.length}</span></div><div class="progress-track" style="margin-top:12px"><div class="progress-fill" style="width:${(pageIndex+1)/activeStory.pages.length*100}%"></div></div><div class="reader-illustration">${p[1]}</div><span class="eyebrow">PETUALANGAN LITERASI</span><h2>${p[0]}</h2><p>${p[2]}</p><div class="reader-controls"><button class="btn btn-secondary" data-action="prev-page" ${pageIndex===0?'disabled':''}>← Sebelumnya</button>${pageIndex<activeStory.pages.length-1?`<button class="btn btn-primary" data-action="next-page">Berikutnya →</button>`:`<button class="btn btn-primary" data-action="finish-story">Selesai Membaca ✓</button>`}</div>${pageIndex===activeStory.pages.length-1?'<button class="btn btn-secondary" style="width:100%;margin-top:10px" data-action="start-quiz">Lanjut ke Kuis →</button>':''}</div>`;
    showScreen('contentScreen');
  }
  function finishStory(){if(!data.read.includes(activeStory.id))data.read.push(activeStory.id);recordActivity('reads',activeStory.id);save();openShelf();}
  function startQuiz(){quizIndex=0;quizScore=0;quizAnswered=false;renderQuiz();}
  function renderQuiz(){
    const qs=activeStory.quiz;
    if(quizIndex>=qs.length){finishQuiz();return;}
    const q=qs[quizIndex];
    $('contentMount').innerHTML=`<div class="story-reader"><div class="reader-top"><span>KUIS PEMAHAMAN</span><span>SOAL ${quizIndex+1}/${qs.length}</span></div><div class="progress-track" style="margin-top:12px"><div class="progress-fill" style="width:${(quizIndex+1)/qs.length*100}%"></div></div><span class="eyebrow" style="display:block;margin-top:28px">CERITA: ${activeStory.title}</span><h2 style="font-size:24px">${q[0]}</h2><div class="quiz-options">${q[1].map((opt,i)=>`<button class="quiz-option" data-action="answer" data-answer="${i}" ${quizAnswered?'disabled':''}>${String.fromCharCode(65+i)}. ${opt}</button>`).join('')}</div><div id="quizFeedback"></div><button id="nextQuizBtn" class="btn btn-primary" style="width:100%;margin-top:8px" data-action="next-question" disabled>${quizIndex===qs.length-1?'Lihat Hasil':'Soal Berikutnya →'}</button></div>`;
    showScreen('contentScreen');
  }
  function answerQuiz(index){
    if(quizAnswered)return;quizAnswered=true;const q=activeStory.quiz[quizIndex],correct=index===q[2];if(correct)quizScore++;
    document.querySelectorAll('.quiz-option').forEach((el,i)=>{if(i===(levelMode?currentCorrectIndex:q[2]))el.classList.add('correct');else if(i===index)el.classList.add('wrong')});
    $('quizFeedback').innerHTML=`<div class="notice">${correct?'Benar! Hebat, kamu memahami ceritanya.':'Belum tepat. Tidak apa-apa, pelajari kembali jawabannya.'}</div>`;
    $('nextQuizBtn').disabled=false;
  }
  function finishQuiz(){
    const prior=data.quizBest[activeStory.id]||0;data.quizBest[activeStory.id]=Math.max(prior,quizScore);
    if(quizScore===activeStory.quiz.length&&!data.badges.includes('Pembaca Cermat'))data.badges.push('Pembaca Cermat');
    const bonus=quizScore===activeStory.quiz.length?15:Math.floor(quizScore*2);data.coins+=bonus;recordActivity('quizzes',activeStory.id);save();
    mount('Hasil Kuis','SELESAI MEMBACA','Setiap halaman adalah pengetahuan baru.',`<div class="story-reader" style="text-align:center"><div class="reader-illustration">${quizScore===5?'🏅':'📖'}</div><span class="eyebrow">SKOR KUIS</span><h2 style="font-size:54px">${quizScore*20}<small style="font-size:18px">/100</small></h2><p>Kamu menjawab ${quizScore} dari ${activeStory.quiz.length} pertanyaan dengan benar.</p><div class="notice">Hadiah ${bonus} koin ditambahkan ke koleksimu${quizScore===5?' · Lencana Pembaca Cermat diperoleh!':''}</div><div class="reader-controls"><button class="btn btn-secondary" data-action="library">Perpustakaan</button><button class="btn btn-primary" data-action="shelf">Rak Bukuku</button></div></div>`);
  }
  function openLevels(){
    const completed=data.levelsCompleted||[];
    const worldIcons=['🏰','📚','🧪','🏜️','🏛️','🏘️','🌴','🗝️','🦉','🌌','🧙','📖','🌳','✨','👑'];
    const cards=levels.map(l=>{const unlocked=l.id===1||completed.includes(l.id-1),done=completed.includes(l.id);return `<button class="level-number-tile ${done?'is-done':''} ${!unlocked?'is-locked':''}" data-action="start-level" data-level="${l.id}" aria-label="Level ${l.id}${done?', selesai':!unlocked?', terkunci':''}" ${unlocked?'':'disabled'}><span>${l.id}</span>${done?'<i aria-hidden="true">✓</i>':!unlocked?'<i aria-hidden="true">🔒</i>':''}</button>`}).join('');
    mount('Level Petualangan','PILIH LEVEL','',`<div class="level-number-grid">${cards}</div>`,'LEVEL');
  }
  let pendingRunMode='level',pendingLevelId=1;
  function startLevel(id){
    const l=levels.find(x=>x.id===id),completed=data.levelsCompleted||[];
    if(!l||(id!==1&&!completed.includes(id-1)))return;
    pendingRunMode='level';pendingLevelId=id;
    $('runIntroIcon').textContent='📚';$('runIntroKicker').textContent='PERSIAPAN PETUALANGAN';$('runIntroTitle').textContent=`Level ${id}`;
    $('runIntroDescription').textContent=l.targetType==='books'?`Kumpulkan ${l.targetCount} buku merah di sepanjang lintasan.`:`Kumpulkan huruf untuk menyusun kata “${l.word}”.`;
    $('runIntroTargets').innerHTML=`<div class="intro-target"><span>📖</span><b>${l.targetType==='books'?`${l.targetCount} buku merah`:`Kata ${l.word}`}</b></div><div class="intro-target"><span>🧠</span><b>Jawab ${l.questions} soal dengan benar</b></div><div class="intro-target"><span>🏆</span><b>Capai garis akhir untuk menang</b></div><p class="intro-note">Jawaban salah akan langsung mengakhiri level. Siap-siap, ya!</p>`;
    $('runIntroDialog').showModal();
  }
  function beginLevel(id){
    const l=levels.find(x=>x.id===id);if(!l)return;
    activeLevel=l;levelMode=true;$('gameScreen').classList.add('level-run');levelCoins=0;missionIndex=0;missionScore=0;missionAnswered=false;missionFinished=false;missionDistance=0;missionRewardCoins=0;
    showScreen('gameScreen');$('gameOverOverlay').classList.add('hidden');$('pauseOverlay').classList.add('hidden');$('missionHud').classList.add('hidden');$('missionHud').classList.remove('done');$('gameHint').textContent=l.targetType==='books'?`LEVEL ${id} · Kumpulkan ${l.targetCount} buku · Jawab ${l.questions} soal`:`LEVEL ${id} · Susun kata ${l.word} · Jawab ${l.questions} soal`;  $('pauseBtn').classList.remove('hidden');
    requestAnimationFrame(()=>{try{window.LibraryDashGame.start({mission:true,level:true,distance:l.distance,checkpointEvery:l.distance/(l.questions+1),targetType:l.targetType,targetCount:l.targetCount,targetWord:l.word});}catch(err){console.error(err);showRunnerLoadError(err);}});
  }
  function onLevelCoinCollected(){/* Koin lintasan tidak dihitung sebagai objektif level. */}
  function onLevelCollectibleCollected(type,letter){if(!activeLevel)return;if(type==='book')levelCoins++;else if(type==='letter'&&letter===activeLevel.word[levelCoins])levelCoins++;else if((type==='letter'||type==='wrong-letter')&&letter!==activeLevel.word[levelCoins]){ $('missionFeedback').textContent=`Huruf ${letter} belum sesuai urutan. Cari huruf ${activeLevel.word[levelCoins]||'berikutnya'}!`; }
    $('gameHint').textContent=activeLevel.targetType==='books'?`LEVEL ${activeLevel.id} · Buku merah ${Math.min(levelCoins,activeLevel.targetCount)}/${activeLevel.targetCount}`:`LEVEL ${activeLevel.id} · Kata ${activeLevel.word.slice(0,levelCoins)}${'＿'.repeat(Math.max(0,activeLevel.word.length-levelCoins))}`;
  }
  function finishLevel(){
    if(missionFinished)return;missionFinished=true;
    const success=levelCoins>=activeLevel.targetCount&&missionScore===activeLevel.questions;
    $('missionHud').classList.remove('hidden');$('missionHud').classList.add('done');
    if(success){
      const done=data.levelsCompleted||(data.levelsCompleted=[]);if(!done.includes(activeLevel.id))done.push(activeLevel.id);
      if(!data.levelRewards)data.levelRewards=[];
      data.coins+=activeLevel.reward;recordActivity('coins',activeLevel.reward);save();
      $('missionProgress').textContent='✦ MISI BERHASIL';
      $('missionQuestion').innerHTML=`<div class="victory-content"><div class="victory-medal">🏆</div><p class="victory-kicker">LEVEL ${String(activeLevel.id).padStart(2,'0')} SELESAI</p><h2>Hebat! Kamu berhasil!</h2><p>Kamu mengumpulkan ${activeLevel.targetCount} ${activeLevel.targetType==='books'?'buku merah':`huruf untuk kata ${activeLevel.word}`} dan menjawab ${missionScore} soal dengan benar.</p><div class="victory-reward"><span>HADIAH KOIN</span><strong>+${activeLevel.reward} 🪙</strong><small>Koin sudah ditambahkan ke saldo</small></div></div>`;
      $('missionFeedback').textContent=activeLevel.hard?'Level HARD ditaklukkan! Siap menghadapi tantangan berikutnya?':'Teruskan petualanganmu untuk membuka level berikutnya!';
    }else{
      $('missionProgress').textContent='MISI BELUM BERHASIL';
      $('missionQuestion').innerHTML=`<div class="victory-content"><div class="victory-medal">📚</div><p class="victory-kicker">COBA LAGI</p><h2>Sedikit lagi!</h2><p>Objektif ${Math.min(levelCoins,activeLevel.targetCount)}/${activeLevel.targetCount} terkumpul dan ${missionScore}/${activeLevel.questions} soal dijawab benar. Lengkapi semua target untuk mendapat hadiah.</p></div>`;
      $('missionFeedback').textContent='Kamu bisa mencoba level ini lagi. Semangat!';
    }
    $('missionAnswers').innerHTML=`<button class="mission-answer" data-action="level-result">${success?'Pilih Level Berikutnya':'Kembali ke Level'}</button><button class="mission-answer" data-action="level-retry">Coba Lagi</button>`;
    window.LibraryDashGame.stop();
  }
  function leaveLevel(){levelMode=false;$('gameScreen').classList.remove('level-run');activeLevel=null;$('missionHud').classList.add('hidden');$('gameHint').textContent='← → pindah lajur · SPACE lompat';window.LibraryDashGame.stop();openLevels();}
  function openMissions(){
    const completed=data.missions.includes('tenQuestions');
    mount('Misi Literasi','TANTANGAN CHECKPOINT','Selesaikan lintasan 2.000 meter. Setiap 200 meter, permainan berhenti sebentar untuk satu soal literasi.',`<div class="story-reader"><div class="reader-illustration">🏃📚</div><h2>Runner Kuis Literasi</h2><p>Lari sejauh 2.000 meter sambil menghindari rintangan dan mengumpulkan koin. Di setiap checkpoint, permainan akan berhenti otomatis agar kamu bisa membaca dan menjawab soal dengan tenang.</p><div class="notice">2.000 meter · 10 checkpoint · 1 soal setiap 200 meter · Anak SD</div><button class="btn btn-primary" style="width:100%;margin-top:18px" data-action="start-mission">${completed?'Mainkan Lagi':'Mulai Misi'}</button></div>`,completed?'MISI PERNAH SELESAI':'2.000 METER');
  }
  function startMission(){
    $('gameScreen').classList.remove('level-run');levelMode=false;activeLevel=null;missionIndex=0;missionScore=0;missionAnswered=false;missionFinished=false;missionDistance=0;missionRewardCoins=0;
    showScreen('gameScreen');
    $('gameOverOverlay').classList.add('hidden');$('pauseOverlay').classList.add('hidden');
    $('missionHud').classList.add('hidden');$('missionHud').classList.remove('done');
    $('gameHint').textContent='Checkpoint soal setiap 200 m · ← → pindah lajur · SPACE lompat';
    $('pauseBtn').classList.remove('hidden');
    requestAnimationFrame(()=>{try{window.LibraryDashGame.start({mission:true});}catch(err){console.error(err);showRunnerLoadError(err);}});
  }
  function renderMissionQuestion(){
    const questionSet=levelMode?levelQuestionBank[activeLevel.id-1]:missionQuestions;
    if(missionIndex>=questionSet.length){levelMode?finishLevel():finishMission();return}
    const q=questionSet[missionIndex];
    $('missionProgress').textContent=levelMode?`SOAL ${missionIndex+1}/${activeLevel.questions} · LEVEL ${activeLevel.id}`:`CHECKPOINT ${missionIndex+1}/10 · ${missionDistance} M`; 
    $('missionQuestion').textContent=q[0];
    let shownOptions=q[1].map((text,index)=>({text,index}));
    if(levelMode)shownOptions.sort(()=>Math.random()-.5);
    currentCorrectIndex=shownOptions.findIndex(option=>option.index===q[2]);
    $('missionAnswers').innerHTML=shownOptions.map((opt,i)=>`<button class="mission-answer" data-action="mission-answer" data-answer="${i}">${String.fromCharCode(65+i)}. ${opt.text}</button>`).join('');
    $('missionFeedback').textContent='Permainan dijeda. Pilih jawaban yang menurutmu benar.';
    $('missionFeedback').classList.remove('bad');
    missionAnswered=false;
  }
  function answerMission(index){
    if(missionAnswered||missionFinished)return;
    missionAnswered=true;
    const q=(levelMode?levelQuestionBank[activeLevel.id-1]:missionQuestions)[missionIndex],correct=index===(levelMode?currentCorrectIndex:q[2]);
    document.querySelectorAll('.mission-answer').forEach((el,i)=>{
      el.disabled=true;
      if(i===(levelMode?currentCorrectIndex:q[2]))el.classList.add('correct');
      else if(i===index)el.classList.add('wrong');
    });
    if(correct){
      missionScore++;if(!levelMode)missionRewardCoins+=5;
      $('missionFeedback').textContent=levelMode?'Benar! Kamu lanjut berlari.':'Benar! Bonus 5 koin akan masuk setelah seluruh misi berhasil diselesaikan.';
      $('missionFeedback').classList.remove('bad');
      if(levelMode){continueMission();return;}
    }else{
      $('missionFeedback').textContent=levelMode?'Jawaban belum tepat. Level berakhir.':'Belum tepat. Jawaban benar ditandai hijau.';
      $('missionFeedback').classList.add('bad');
      if(levelMode){finishLevel();return;}
    }
    $('missionAnswers').insertAdjacentHTML('beforeend','<button class="mission-answer mission-continue" data-action="mission-continue">Lanjutkan Lari →</button>');
  }
  function onCheckpoint(distance,number,total){
    if(missionFinished)return;
    missionDistance=distance;
    $('missionHud').classList.remove('hidden');$('missionHud').classList.remove('done');
    $('missionProgress').textContent=`CHECKPOINT ${number}/10 · ${distance} / ${total} M`;
    renderMissionQuestion();
  }
  function continueMission(){
    if(!missionAnswered||missionFinished)return;
    missionIndex++;
    if(levelMode){
      // Setiap soal berada pada checkpoint jarak tetap; setelah menjawab, runner lanjut menuju checkpoint berikutnya.
      $('missionHud').classList.add('hidden');if(missionIndex>=activeLevel.questions)window.LibraryDashGame.continueLevelPhase();else window.LibraryDashGame.continueCheckpoint();return;
    }
    if(missionIndex>=missionQuestions.length){finishMission();return;}
    $('missionHud').classList.add('hidden');window.LibraryDashGame.continueCheckpoint();
  }
  function onMissionDistanceComplete(){if(levelMode)finishLevel();else finishMission();}
  function finishMission(){
    missionFinished=true;
    $('missionHud').classList.remove('hidden');
    $('missionHud').classList.add('done');
    $('missionProgress').textContent='MISI SELESAI';
    $('missionQuestion').textContent=`Lintasan 2.000 meter selesai! Kamu menjawab ${missionScore} dari 10 pertanyaan dengan benar.`;
    $('missionAnswers').innerHTML=`<button class="mission-answer" data-action="mission-result-menu">Lihat Hasil & Kembali ke Menu</button><button class="mission-answer" data-action="mission-retry">Ulangi Misi</button>`;
    const runResult=window.LibraryDashGame.getState();
    const earnedCoins=(runResult.coins||0)+missionRewardCoins;
    data.coins+=earnedCoins;
    $('missionFeedback').textContent=`Misi berhasil! ${runResult.coins||0} koin lintasan + ${missionRewardCoins} koin bonus soal = ${earnedCoins} koin masuk ke saldo.`;
    if(!data.missions.includes('tenQuestions'))data.missions.push('tenQuestions');
    if(missionScore>=8&&!data.badges.includes('Jago Literasi'))data.badges.push('Jago Literasi');
    save();
    window.LibraryDashGame.stop();
  }
  function leaveMission(){
    $('missionHud').classList.add('hidden');
    $('gameHint').textContent='← → pindah lajur · SPACE lompat';
    window.LibraryDashGame.stop();showScreen('homeScreen');
  }
  function openDailyWeekly(){
    const dailyKey=periodKey('daily'),weeklyKey=periodKey('weekly');
    const tasks=[
      {id:'d-read1',period:'daily',key:dailyKey,title:'Baca 1 buku',desc:'Selesaikan satu bacaan hari ini.',icon:'📖',progress:Math.min(1,activityCount('reads','daily')),goal:1,reward:10},
      {id:'d-quiz1',period:'daily',key:dailyKey,title:'Kerjakan 1 kuis',desc:'Jawab kuis setelah membaca.',icon:'🧠',progress:Math.min(1,activityCount('quizzes','daily')),goal:1,reward:10},
      {id:'d-coin5',period:'daily',key:dailyKey,title:'Ambil 5 koin',desc:'Kumpulkan koin saat berlari.',icon:'🪙',progress:Math.min(5,activityCount('coins','daily')),goal:5,reward:5},
      {id:'d-coin10',period:'daily',key:dailyKey,title:'Pemburu koin',desc:'Kumpulkan 10 koin hari ini.',icon:'💰',progress:Math.min(10,activityCount('coins','daily')),goal:10,reward:10},
      {id:'d-read2',period:'daily',key:dailyKey,title:'Baca 2 buku',desc:'Selesaikan dua bacaan berbeda hari ini.',icon:'📚',progress:Math.min(2,activityCount('reads','daily')),goal:2,reward:20},
      {id:'d-quiz2',period:'daily',key:dailyKey,title:'Asah otak',desc:'Selesaikan dua kuis hari ini.',icon:'🧩',progress:Math.min(2,activityCount('quizzes','daily')),goal:2,reward:15},
      {id:'d-run',period:'daily',key:dailyKey,title:'Mulai petualangan',desc:'Selesaikan satu sesi runner biasa.',icon:'🏃',progress:Math.min(1,activityCount('runs','daily')),goal:1,reward:10},
      {id:'d-perfect',period:'daily',key:dailyKey,title:'Jawab dengan cermat',desc:'Dapatkan nilai sempurna pada kuis buku mana pun hari ini.',icon:'🌟',progress:Math.min(1,(data.badges||[]).includes('Pembaca Cermat')?1:0),goal:1,reward:15},
      {id:'d-own',period:'daily',key:dailyKey,title:'Tambah koleksi',desc:'Buka satu buku baru di toko buku.',icon:'🔓',progress:Math.min(1,Math.max(0,data.owned.length-1)),goal:1,reward:10},
      {id:'d-glossary',period:'daily',key:dailyKey,title:'Jelajah ensiklopedia',desc:'Selesaikan satu bacaan bertema pengetahuan hari ini.',icon:'🔎',progress:Math.min(1,activityCount('reads','daily')),goal:1,reward:5},
      {id:'w-read3',period:'weekly',key:weeklyKey,title:'Pembaca tekun',desc:'Selesaikan 3 bacaan minggu ini.',icon:'📚',progress:Math.min(3,activityCount('reads','weekly')),goal:3,reward:30},
      {id:'w-read5',period:'weekly',key:weeklyKey,title:'Pencinta buku',desc:'Selesaikan 5 bacaan minggu ini.',icon:'📘',progress:Math.min(5,activityCount('reads','weekly')),goal:5,reward:50},
      {id:'w-quiz3',period:'weekly',key:weeklyKey,title:'Jago kuis',desc:'Selesaikan 3 kuis minggu ini.',icon:'🧠',progress:Math.min(3,activityCount('quizzes','weekly')),goal:3,reward:30},
      {id:'w-run3',period:'weekly',key:weeklyKey,title:'Pelari perpustakaan',desc:'Selesaikan 3 sesi runner minggu ini.',icon:'🏃',progress:Math.min(3,activityCount('runs','weekly')),goal:3,reward:35},
      {id:'w-coins30',period:'weekly',key:weeklyKey,title:'Penimbun koin',desc:'Kumpulkan 30 koin dari lintasan minggu ini.',icon:'🪙',progress:Math.min(30,activityCount('coins','weekly')),goal:30,reward:40},
      {id:'w-quiz5',period:'weekly',key:weeklyKey,title:'Penasaran dan pintar',desc:'Selesaikan 5 kuis minggu ini.',icon:'💡',progress:Math.min(5,activityCount('quizzes','weekly')),goal:5,reward:50},
      {id:'w-own2',period:'weekly',key:weeklyKey,title:'Kurator cilik',desc:'Miliki setidaknya 3 buku di Rak Bukuku.',icon:'🗝️',progress:Math.min(3,data.owned.length),goal:3,reward:35},
      {id:'w-read7',period:'weekly',key:weeklyKey,title:'Bintang pembaca',desc:'Selesaikan 7 bacaan minggu ini.',icon:'🏅',progress:Math.min(7,activityCount('reads','weekly')),goal:7,reward:70}
    ];
    const body=tasks.map(t=>{const claimId=`${t.id}-${t.key}`,done=t.progress>=t.goal,claimed=(data.missionClaims||[]).includes(claimId);return `<article class="daily-mission-card"><div class="daily-mission-icon">${t.icon}</div><div class="daily-mission-main"><div class="daily-mission-meta"><span>${t.period==='daily'?'MISI HARIAN':'MISI MINGGUAN'}</span><span>${t.progress}/${t.goal}</span></div><h3>${t.title}</h3><p>${t.desc}</p><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,t.progress/t.goal*100)}%"></div></div><small>🎁 Hadiah: ${t.reward} koin</small></div><button class="btn ${done&&!claimed?'btn-primary':'btn-secondary'}" data-action="claim-period-mission" data-claim="${claimId}" data-reward="${t.reward}" ${!done||claimed?'disabled':''}>${claimed?'Sudah diklaim':done?'Klaim hadiah':'Belum selesai'}</button></article>`}).join('');
    mount('Misi','TUGAS HARIAN & MINGGUAN','Selesaikan kegiatan kecil untuk mendapat hadiah koin. Progres harian diperbarui setiap hari, dan misi mingguan setiap pekan.',`<div class="mission-list daily-weekly-list">${body}</div><div class="notice" style="margin-top:16px">Tips: selesaikan bacaan sampai halaman terakhir, lalu lanjutkan kuis agar progres misi tercatat.</div>`,'HADIAH KOIN');
  }
  function claimPeriodMission(btn){const id=btn.dataset.claim,reward=Number(btn.dataset.reward);if(!id||!reward||(data.missionClaims||[]).includes(id))return;if(!data.missionClaims)data.missionClaims=[];data.missionClaims.push(id);data.coins+=reward;save();openDailyWeekly();}
  function openAchievements(){
    const total=stories.filter(s=>data.owned.includes(s.id)).length;
    mount('Koleksi & Pencapaian','JEJAK PETUALANGANMU','Setiap langkah kecil membawamu lebih dekat ke cerita berikutnya.',`<div class="stats-grid"><div class="big-stat"><small>KOIN</small><strong>${data.coins}</strong></div><div class="big-stat"><small>SKOR TERBAIK</small><strong>${data.best}</strong></div><div class="big-stat"><small>CERITA DIMILIKI</small><strong>${total}/15</strong></div></div><div class="mission-list"><div class="achievement-item"><div class="mission-symbol">🏃</div><div><h3>Runner Perpustakaan</h3><p>${data.totalRuns} sesi permainan diselesaikan.</p></div></div><div class="achievement-item"><div class="mission-symbol">📖</div><div><h3>Pembaca Aktif</h3><p>${data.read.length} dari 15 buku telah ditandai selesai dibaca.</p></div></div><div class="achievement-item"><div class="mission-symbol">🧠</div><div><h3>Pembaca Cermat</h3><p>${data.badges.includes('Pembaca Cermat')?'Lencana diperoleh dengan nilai sempurna.':'Jawab semua 5 soal kuis cerita dengan benar untuk mendapat lencana.'}</p></div></div></div><button class="btn btn-secondary" style="margin-top:18px" data-action="reset-progress">Reset progres lokal</button><p style="font-size:11px;color:#89959d">Reset hanya menghapus progres Library Dash di browser ini.</p>`);
  }
  function claimMission(id){
    const rewards={coins10:10,read1:10,quiz1:15,runner1:10};
    if(data.missions.includes(id))return;data.missions.push(id);data.coins+=rewards[id]||0;save();openMissions();
  }
  let mysteryReward=null;
  function onMysteryBox(){
    if(window.LibraryDashGame&&window.LibraryDashGame.isMission())return;
    const rewards=[
      {type:'coins',amount:5,title:'5 Koin!',desc:'Lumayan! Koin tambahan sudah masuk ke saldo kamu.'},
      {type:'coins',amount:20,title:'20 Koin!',desc:'Wah, jackpot! Kamu mendapat 20 koin tambahan.'},
      {type:'key',amount:1,title:'Kunci Buku!',desc:'Satu kunci disimpan di Rak Bukumu. Kumpulkan kunci untuk fitur koleksi spesial.'},
      {type:'coins',amount:10,title:'Bonus 10 Koin!',desc:'Hadiah kejutan! Sepuluh koin ditambahkan ke saldo kamu.'}
    ];
    mysteryReward=rewards[Math.floor(Math.random()*rewards.length)];
    $('mysteryTitle').textContent='Mystery Box!';
    $('mysteryDescription').textContent='Kamu menemukan kotak misteri! Buka sekarang untuk mengetahui hadiah rahasianya.';
    $('openMysteryBtn').classList.remove('hidden');$('continueMysteryBtn').classList.add('hidden');
    $('mysteryOverlay').classList.remove('hidden');
  }
  $('openMysteryBtn').addEventListener('click',()=>{
    if(!mysteryReward)return;
    if(mysteryReward.type==='coins'){data.coins+=mysteryReward.amount;if(window.LibraryDashGame)window.LibraryDashGame.addRunCoins(mysteryReward.amount)}else data.keys=(data.keys||0)+mysteryReward.amount;
    save();
    $('mysteryTitle').textContent=mysteryReward.title;
    $('mysteryDescription').textContent=mysteryReward.desc;
    $('openMysteryBtn').classList.add('hidden');$('continueMysteryBtn').classList.remove('hidden');
    $('mysteryOverlay').classList.add('reward-revealed');
  });
  $('continueMysteryBtn').addEventListener('click',()=>{
    $('mysteryOverlay').classList.add('hidden');$('mysteryOverlay').classList.remove('reward-revealed');
    mysteryReward=null;window.LibraryDashGame.continueMystery();
  });
  function onRunComplete(score,coins){data.totalRuns++;data.totalScore+=score;data.best=Math.max(data.best,score);data.lastRunCoins=coins;recordActivity('runs',score);save();}
  function updateRunCoins(coins){$('runCoins').textContent=coins;}
  function onCoinCollected(amount=1){if(window.LibraryDashGame&&window.LibraryDashGame.isMission())return;data.coins+=amount;for(let i=0;i<amount;i++)recordActivity('coins',1);save();}
  function startGame(){$('gameScreen').classList.remove('level-run');levelMode=false;activeLevel=null;showScreen('gameScreen');$('gameOverOverlay').classList.add('hidden');$('pauseOverlay').classList.add('hidden');$('missionHud').classList.add('hidden');$('mysteryOverlay').classList.add('hidden');requestAnimationFrame(()=>{try{window.LibraryDashGame.start();}catch(err){console.error(err);showRunnerLoadError(err);}});}
  function showRunnerLoadError(err){const hud=$('missionHud');hud.classList.remove('hidden');hud.classList.add('done');$('missionProgress').textContent='RUNNER BELUM DAPAT DIMUAT';$('missionQuestion').textContent='Pastikan koneksi internet aktif agar Three.js dapat dimuat, lalu kembali ke menu dan coba lagi.';$('missionAnswers').innerHTML='<button class="mission-answer" data-action="mission-result-menu">Kembali ke Menu</button>'; $('missionFeedback').textContent=String(err?.message||'Terjadi kendala saat memuat runner.');}
  function startFreeRun(){pendingRunMode='free';$('runIntroIcon').textContent='🏃';$('runIntroKicker').textContent='MODE BEBAS';$('runIntroTitle').textContent='Free Runner';$('runIntroDescription').textContent='Berlari sejauh mungkin di perpustakaan cerah, kumpulkan koin, dan hindari rintangan.';$('runIntroTargets').innerHTML='<div class="intro-target"><span>🪙</span><b>Kumpulkan koin sebanyak-banyaknya</b></div><div class="intro-target"><span>↔️</span><b>Pindah lajur dan lompat untuk menghindari rintangan</b></div><p class="intro-note">Tidak ada target level. Raih skor terbaikmu!</p>';$('runIntroDialog').showModal();}
  function beginFreeRun(){startGame();$('gameHint').textContent='FREE RUN · Kumpulkan koin, hindari rintangan, dan raih skor tertinggi!';}

  const themeBtn=$('themeToggleBtn');
  function setTheme(){document.body.classList.remove('light-mode');if(themeBtn){themeBtn.textContent='🌙 Mode Gelap';themeBtn.setAttribute('aria-pressed','true');themeBtn.disabled=true;}try{localStorage.setItem('libraryDashTheme','dark')}catch(e){}}
  setTheme();
  $('startGameBtn').addEventListener('click',openLevels);
  $('runIntroStart').addEventListener('click',()=>{$('runIntroDialog').close();if(pendingRunMode==='level')beginLevel(pendingLevelId);else beginFreeRun();});
  $('runIntroClose').addEventListener('click',()=>$('runIntroDialog').close());
  $('runIntroCancel').addEventListener('click',()=>$('runIntroDialog').close());
  $('howToBtn').addEventListener('click',()=>$('howToDialog').showModal());
  $('exitGameBtn').addEventListener('click',()=>{if(window.LibraryDashGame.isMission()){$('missionHud').classList.add('hidden');$('gameHint').textContent='← → pindah lajur · SPACE lompat';}window.LibraryDashGame.stop();showScreen('homeScreen')});
  $('pauseBtn').addEventListener('click',()=>window.LibraryDashGame.pause());
  $('resumeBtn').addEventListener('click',()=>window.LibraryDashGame.resume());
  $('restartBtn').addEventListener('click',startGame);
  $('gameOverMenuBtn').addEventListener('click',()=>{window.LibraryDashGame.stop();showScreen('homeScreen')});
  $('leftBtn').addEventListener('pointerdown',e=>{e.preventDefault();window.LibraryDashGame.move(-1)});
  $('rightBtn').addEventListener('pointerdown',e=>{e.preventDefault();window.LibraryDashGame.move(1)});
  $('jumpBtn').addEventListener('pointerdown',e=>{e.preventDefault();window.LibraryDashGame.jump()});
  $('backHomeBtn').addEventListener('click',()=>showScreen('homeScreen'));
  document.querySelectorAll('[data-panel]').forEach(el=>el.addEventListener('click',()=>{const routes={library:openLibrary,bookstore:openBookstore,missions:openMissions,dailyWeekly:openDailyWeekly,shelf:openShelf,achievements:openAchievements,levels:openLevels,freeRun:startFreeRun};const route=routes[el.dataset.panel];if(route)route();}));
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-action]');if(!btn)return;
    const action=btn.dataset.action;
    if(action.startsWith('view-book-')){showBookDetails(Number(action.split('-').pop()));return}
    if(action==='close-book-detail'){const d=$('bookDetailDialog');if(d)d.close();return}
    if(action==='cannot-buy-book')return;
    if(action.startsWith('open-story-')){const d=$('bookDetailDialog');if(d?.open)d.close();openStory(Number(action.split('-').pop()));return}
    if(action.startsWith('unlock-story-key-')){const id=Number(action.split('-').pop());if((data.keys||0)>0&&!data.owned.includes(id)){data.keys--;data.owned.push(id);save();openBookstore()}return}
    if(action.startsWith('unlock-story-')){const id=Number(action.split('-').pop()),s=stories.find(x=>x.id===id);if(s&&data.coins>=s.cost&&!data.owned.includes(id)){data.coins-=s.cost;data.owned.push(id);save();openBookstore()}return}
    if(action==='prev-page'){pageIndex=Math.max(0,pageIndex-1);renderPage()}
    if(action==='next-page'){pageIndex=Math.min(activeStory.pages.length-1,pageIndex+1);renderPage()}
    if(action==='finish-story'){finishStory()}
    if(action==='start-quiz'){startQuiz()}
    if(action==='answer'){answerQuiz(Number(btn.dataset.answer))}
    if(action==='next-question'&&quizAnswered){quizIndex++;quizAnswered=false;renderQuiz()}
    if(action==='library')openLibrary()
    if(action==='shelf')openShelf()
    if(action==='claim-mission')claimMission(btn.dataset.id)
    if(action==='claim-period-mission')claimPeriodMission(btn)
    if(action==='start-mission')startMission()
    if(action==='start-level')startLevel(Number(btn.dataset.level))
    if(action==='level-result')leaveLevel()
    if(action==='level-retry'&&activeLevel)startLevel(activeLevel.id)
    if(action==='mission-answer')answerMission(Number(btn.dataset.answer))
    if(action==='mission-continue')continueMission()
    if(action==='mission-result-menu')leaveMission()
    if(action==='mission-retry')startMission()
    if(action==='reset-progress'&&confirm('Hapus semua progres Library Dash di browser ini?')){data=fresh();save();openAchievements()}
  });
  window.addEventListener('keydown',e=>{
    if(e.key==='Escape'&& !$('howToDialog').open && !$('gameScreen').classList.contains('hidden')){if(!document.getElementById('pauseOverlay').classList.contains('hidden'))window.LibraryDashGame.resume();else window.LibraryDashGame.pause();}
    if($('gameScreen').classList.contains('hidden'))return;
    if(['ArrowLeft','ArrowRight','ArrowUp',' ','a','A','d','D','w','W'].includes(e.key))e.preventDefault();
    if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')window.LibraryDashGame.move(-1);
    if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')window.LibraryDashGame.move(1);
    if(e.key===' '||e.key==='ArrowUp'||e.key==='w'||e.key==='W')window.LibraryDashGame.jump();
  });
  window.LibraryDashApp={onRunComplete,updateRunCoins,onCheckpoint,onMissionDistanceComplete,onMysteryBox,onCoinCollected,onLevelCoinCollected,onLevelCollectibleCollected};
  updateHeader();
})();