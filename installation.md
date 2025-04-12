# Panduan Deployment Sistem Login Google Apps Script

Berikut adalah langkah-langkah untuk men-deploy sistem login sederhana menggunakan Google Apps Script:

## 1. Membuat Project Google Apps Script Baru

1. Buka [Google Apps Script](https://script.google.com/)
2. Klik "New Project" untuk membuat project baru
3. Ini akan membuka editor Google Apps Script

## 2. Menambahkan File-file Kode

### File Code.gs
1. Hapus semua kode default di file `Code.gs`
2. Salin dan tempel kode dari file `Code.gs` yang telah disediakan
3. Jika Anda telah membuat spreadsheet terlebih dahulu, isi variabel `SPREADSHEET_ID` dengan ID spreadsheet Anda
   - ID spreadsheet dapat ditemukan di URL spreadsheet: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
4. Jika tidak, biarkan kosong dan sistem akan membuat spreadsheet baru saat pertama kali dijalankan
5. Ubah nilai `ENCRYPTION_KEY` menjadi kunci rahasia Anda sendiri

### File index.html
1. Klik ikon + di sebelah "Files" di panel sebelah kiri
2. Beri nama file sebagai `index.html`
3. Salin dan tempel kode HTML dari file `index.html` yang telah disediakan

## 3. Menyimpan Project
1. Klik ikon disk (save) atau tekan Ctrl+S (Windows/Linux) atau Cmd+S (Mac) untuk menyimpan project
2. Beri nama project, misalnya "Sistem Login Sederhana"

## 4. Men-deploy Sebagai Web App
1. Klik menu "Deploy" > "New deployment"
2. Pilih "Web app" sebagai tipe deployment
3. Isi deskripsi deployment (opsional)
4. Pada "Execute as", pilih "Me" (project akan dijalankan dengan akun Google Anda)
5. Pada "Who has access", pilih salah satu:
   - "Only myself" - hanya Anda yang dapat mengakses
   - "Anyone" - semua orang dapat mengakses
   - "Anyone with Google account" - hanya pengguna dengan akun Google yang dapat mengakses
6. Klik "Deploy"
7. Berikan izin yang diminta oleh Google
8. Salin URL web app yang muncul setelah berhasil di-deploy

## 5. Pengaturan Keamanan (Penting)
1. Setelah pertama kali men-deploy, buka Console (Lihat > Console) untuk melihat ID spreadsheet yang dibuat otomatis
2. Salin ID tersebut dan tempelkan ke variabel `SPREADSHEET_ID` di file `Code.gs`
3. Ubah nilai `ENCRYPTION_KEY` menjadi string acak yang kompleks
4. Simpan perubahan dan deploy ulang (Deploy > New deployment)

## 6. Mengakses Web App
1. Buka URL yang telah disalin pada langkah 4
2. Web app dengan sistem login Anda sekarang dapat diakses

## Catatan Penting:
- Sistem ini menggunakan Google Apps Script Properties Service untuk mengelola session, yang memiliki batas penyimpanan
- Enkripsi password yang digunakan adalah metode sederhana menggunakan HMAC-SHA256, bukan metode yang sangat aman untuk sistem produksi
- Untuk sistem produksi, pertimbangkan untuk menggunakan metode autentikasi yang lebih kuat seperti OAuth 2.0 atau layanan autentikasi pihak ketiga
- Pastikan untuk mengganti `ENCRYPTION_KEY` dengan nilai rahasia yang kuat
- Jika Anda menggunakan sistem ini untuk aplikasi nyata, tambahkan validasi input yang lebih ketat

## Mengubah Tampilan
Anda dapat mengubah tampilan dengan memodifikasi bagian CSS di dalam file `index.html`. Gaya saat ini menggunakan warna biru Google, tetapi Anda bebas untuk menyesuaikan sesuai kebutuhan.

## Menambahkan Fitur
Sistem ini dapat diperluas dengan fitur tambahan seperti:
- Reset password
- Verifikasi email
- Tingkat akses berbeda (admin, user, dll)
- Captcha untuk keamanan tambahan
