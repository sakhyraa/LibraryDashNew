# Library Dash Web Prototype

Prototipe game runner 3D berbasis HTML, CSS, JavaScript, dan Three.js. Tidak membutuhkan Unity atau Node.js.

## Menjalankan
1. Ekstrak folder proyek.
2. Buka folder di Visual Studio Code.
3. Jalankan `index.html` menggunakan ekstensi Live Server.
4. Pastikan koneksi internet aktif agar Three.js dari CDN dapat dimuat.

## Kontrol
- `←` / `→` atau `A` / `D`: berpindah lajur.
- `Space` / `↑` / `W`: melompat.
- Tombol di layar: tersedia untuk perangkat sentuh.
- Tombol Jeda: menghentikan permainan sementara.

## Fitur prototipe
- Runner 3D dengan tiga lajur, rintangan, perpustakaan 3D, skor, dan kontrol laptop/ponsel.
- Misi literasi sepanjang 2.000 meter, dengan 10 checkpoint soal pada setiap 200 meter. Permainan berhenti ketika soal ditampilkan.
- Koin emas muncul di jalur kiri, tengah, atau kanan; setiap koin yang disentuh bernilai 1 koin dan langsung ditambahkan ke saldo. Mystery Box muncul secara berkala; saat disentuh, permainan berhenti dan pemain bisa membuka hadiah acak: 5, 10, atau 20 koin, atau 1 kunci buku.
- Koin tersimpan pada saldo pemain; kunci disimpan di Rak Bukuku dan dapat dipakai untuk membuka satu cerita terkunci.
- Progres tersimpan di `localStorage` pada browser yang digunakan.
- Tampilan menu dan HUD diperbarui dengan gaya arcade yang lebih berwarna.

## Catatan
Ini masih prototipe front-end. Progres tersimpan lokal pada browser/perangkat yang sama, belum tersinkron ke akun atau server. Tampilan dan alur perlu diuji langsung pada browser desktop dan ponsel sebelum dipakai sebagai versi final.

## V6 revisions
- Mystery Box dibuat lebih jarang muncul (sekitar setiap 18–24 detik) dan tidak muncul di mode Misi.
- Koin mode Misi bersifat sementara: koin lintasan dan bonus jawaban baru ditambahkan ke saldo setelah seluruh misi selesai. Jika gagal/menabrak, koin misi tidak disimpan.
- Suasana runner diubah ke palet hangat seperti perpustakaan dengan rak kayu, buku berwarna, dan pencahayaan hangat.
- Obstacle meja memakai warna kayu gelap agar tidak terlihat seperti kotak hadiah kecil berwarna krem.


## Library Dash V7
- Menu utama kini menampilkan Cara Bermain, Perpustakaan, Tantangan checkpoint, Misi Harian/Mingguan, Rak Bukuku, dan Pencapaian.
- Perpustakaan berisi 10 cerita digital dan ensiklopedia mini istilah: katalog, nomor panggil, pustakawan, kartu anggota, koleksi, referensi, e-book, dan tanggal kembali.
- Misi harian: baca 1 cerita, kerjakan 1 kuis, kumpulkan 10 koin. Misi mingguan: baca 3 cerita dan selesaikan 2 sesi runner. Hadiah baru bisa diklaim setelah target selesai.
- Progres misi memakai penyimpanan lokal browser; aktivitas dan klaim hadiah tersimpan pada browser/perangkat yang sama.
- Jalankan melalui Live Server di VS Code agar lebih konsisten daripada membuka file langsung.


## Revisi V8
- Menghapus lampu kubus krem yang tampak melayang di tengah jalur runner.
- Mengembalikan palet runner ke biru/navy dan cyan agar selaras dengan visual menu utama.
- Koin emas dan Mystery Box tetap dipertahankan.


## V9 update
- Menu 'Misi' berisi 18 tugas harian/mingguan dengan klaim hadiah.
- Perpustakaan memiliki 15 buku: 9 buku pengetahuan perpustakaan dan 6 cerita anak; setiap buku memiliki bacaan dan kuis.
- Ensiklopedia mini ditempatkan sebelum toko buku.
- Tombol Mode Terang / Mode Gelap tersedia di header dan preferensi tema disimpan lokal.
- Mystery Box memiliki halo berdenyut agar terlihat sebagai item yang perlu diambil.


## Update: 15 Level Petualangan
- Menu Level Petualangan dengan 15 level bertahap.
- Level berikutnya terbuka setelah level sebelumnya selesai.
- Tiap level memiliki target koin, jarak, kuis, dan hadiah.
- Hadiah level hanya diklaim satu kali; progres tersimpan di localStorage browser.
- Buka `index.html` lewat Live Server.

## Pembaruan Level Petualangan
- Dalam Level Petualangan, koin dan mystery box tidak muncul di lintasan; hanya buku merah atau huruf target serta rintangan.
- Untuk level buku, pemain mengumpulkan 6 buku merah (level hard: 10 buku). Untuk level huruf, pemain menyusun kata sesuai petunjuk.
- Soal muncul di tengah tantangan setelah kumpulan koleksi tertentu, bukan di akhir. Jawaban harus benar dan semua target harus terpenuhi untuk menang.
- Hadiah level reguler: 20 koin. Level hard (5, 10, 15): 50 koin, sekali klaim per level.
- Toko buku menggunakan harga yang lebih murah dalam kelipatan 50 koin.
- Tampilan menggunakan mode gelap saja, dengan teks kontras dan panel kemenangan khusus.


## Perbaikan terbaru
- Background beranda menggunakan ilustrasi perpustakaan yang diberikan pengguna.
- Setiap menu berpindah ke tampilan halaman konten tersendiri; beranda tidak ditumpuk dengan isi halaman lain.
- Runner level dan Free Run memulai renderer setelah layar permainan tampil, lalu memperbarui ukuran canvas.
- Level Petualangan hanya menampilkan target level (buku/huruf), tanpa koin reguler yang mengganggu.
- Jika Three.js gagal dimuat, halaman menampilkan pesan bantuan dan tombol kembali, bukan gagal tanpa penjelasan.

Pastikan internet aktif saat menjalankan Live Server karena Three.js dimuat dari CDN.
