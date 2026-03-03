# Direktori Tools UMKM Kit (15 Tools)

Dokumen ini berisi daftar status implementasi dari 15 tools yang ada di dalam aplikasi UMKM Kit hasil perombakan terbaru. Pengguna dapat merujuk ke dokumen ini untuk mengetahui fitur apa saja yang sudah tersedia. Semua tool ini dibagi ke dalam 4 kategori utama.

## 🌟 Keunggulan Aplikasi ModalHP

- **100% Offline Support (PWA)**: Aplikasi dapat digunakan dengan lancar saat tidak ada koneksi internet. Data tersimpan aman secara lokal menggunakan teknologi `IndexedDB` dan caching *Service Worker*.
- **Cepat & Ringan (Lightweight)**: Akses web super instan tanpa lemot, dioptimalkan berjalan mulus pada HP spesifikasi rendah sekalipun.
- **Privasi Terjamin (Privacy-First)**: Data transaksi, laporan keuangan, pelanggan, serta inventaris barang Anda mutlak disimpan LOKAL di perangkat, tidak disinkronisasi ke server lain, sehingga 100% rahasia dan aman.
- **Bebas Biaya Bulanan (Pay Once)**: Tidak ada lagi uang sewa atau langganan bulanan yang memberatkan. Kumpulan alat berbisnis harian UMKM esensial ini cukup Anda bayar sekali di awal untuk penggunaan seumur hidup.
- **Berbagi Super Cepat**: Terintegrasi ekosistem WA mudah dalam sekali klik untuk membagikan nota/struk, tagihan piutang, hingga otomatisasi link WA.

---

## 📂 1. Core Ecosystem (Manajemen Utama Warung)
Kumpulan fitur dasar yang saling terintegrasi dan menggunakan database lokal (`IndexedDB`).

1. **Kasir Warung (POS Lite)**
   - **Path:** `/finance/pos`
   - **Fungsi:** Mencatat transaksi penjualan, stok berkurang otomatis.
   - **File:** `src/views/finance/pos/Cashier.vue`

2. **Produk Manager**
   - **Path:** `/finance/products`
   - **Fungsi:** Tambah, edit, hapus data produk dan stok.
   - **File:** `src/views/finance/pos/ProductList.vue`

3. **Laporan Harian**
   - **Path:** `/finance/report`
   - **Fungsi:** Rekap omzet harian & riwayat transaksi.
   - **File:** `src/views/finance/DailyReport.vue`

4. **Buku Hutang (Debt Manager)**
   - **Path:** `/utilities/debt-manager`
   - **Fungsi:** Catat hutang pelanggan & otomatis kirim tagihan via WhatsApp (Reminder WA).
   - **File:** `src/views/utilities/DebtManager.vue`

5. **Generator Kuitansi (Receipt)**
   - **Path:** `/finance/invoice`
   - **Fungsi:** Cetak ulang struk atau share via WA dari riwayat transaksi.
   - **File:** `src/views/finance/ReceiptGenerator.vue`

6. **Kartu Stok Digital**
   - **Path:** `/operations/stock-card`
   - **Fungsi:** Alternatif template stok barang excel. Catat barang masuk/keluar & histori mutasi stok.
   - **File:** `src/views/operations/StockCard.vue`

---

## 📂 2. SEO & Traffic Magnets (Alat Usaha Harian)
Aplikasi ringan dengan volume pencarian Google yang sangat tinggi. Ujung tombak akuisisi user organic.

7. **Generator Slip Gaji & Lembur**
   - **Path:** `/finance/payroll`
   - **Fungsi:** Kalkulator Gaji Bersih / Template Slip Gaji. Hitung lembur, cicilan, dan cetak slip gaji karyawan pdf.
   - **File:** `src/views/finance/Payroll.vue`

8. **Kalkulator HPP Makanan**
   - **Path:** `/operations/hpp-calculator`
   - **Fungsi:** Cara Hitung HPP Makanan. Hitung modal produksi dengan detail.
   - **File:** `src/views/operations/HPPCalculator.vue`

9. **WhatsApp Link Generator**
   - **Path:** `/marketing/whatsapp-link`
   - **Fungsi:** Cara Membuat Link WA Me dengan pesan otomatis.
   - **File:** `src/views/marketing/WhatsAppLink.vue`

10. **Simulasi Kredit**
    - **Path:** `/utilities/credit-simulator`
    - **Fungsi:** Kalkulator cicilan kredit barang/kendaraan harian maupun bulanan.
    - **File:** `src/views/utilities/CreditSimulator.vue`

---

## 📂 3. Marketing & Sales (Penunjang Jualan)
Tool yang sifatnya "nice to have" tapi sangat membantu untuk promosi.

11. **Diskon Planner**
    - **Path:** `/marketing/discount`
    - **Fungsi:** Hitung profit dan strategi harga saat memberikan diskon/promo agar tidak rugi.
    - **File:** `src/views/marketing/DiscountPlanner.vue`

12. **Kalkulator Harga Ojol**
    - **Path:** `/marketing/food-delivery`
    - **Fungsi:** Hitung harga jual GoFood/GrabFood agar aman dari potongan komisi aplikasi.
    - **File:** `src/views/marketing/FoodDeliveryPricing.vue`

13. **QR Code Generator (ALL-IN-ONE)**
    - **Path:** `/marketing/qr-code`
    - **Fungsi:** Pembuat QR Code (Teks, Link, Menu, dan WiFi Credentials) serbaguna.
    - **File:** `src/views/marketing/QRCodeGenerator.vue`

---

## 📂 4. Viral Loop & Engagement (Seru-Seruan)
Tool interaktif yang dapat memicu pengguna untuk membagikan aplikasi ke sesama rekan mereka.

14. **Split Bill Kalkulator**
    - **Path:** `/utilities/bill-splitter`
    - **Fungsi:** Hitung patungan makan tongkrongan lengkap dengan tambahan Tax dan Service.
    - **File:** `src/views/utilities/BillSplitter.vue`

15. **Random Picker (Doorprize)**
    - **Path:** `/utilities/random-picker`
    - **Fungsi:** Acak pemenang / picker online untuk sistem bonus atau arisan pelanggan.
    - **File:** `src/views/utilities/RandomPicker.vue`

---
*Terakhir Diperbarui: Sesuai hasil Revamp Februari 2026*
