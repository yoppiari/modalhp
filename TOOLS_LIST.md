# Direktori Tools ModalHP (Offline & No-AI)

Dokumen ini berisi daftar status implementasi dari 25 tools yang ada di dalam aplikasi UMKM Kit. Pengguna dapat merujuk ke dokumen ini untuk mengetahui fitur apa saja yang sudah tersedia.

---

## 📂 Core Ecosystem (Terintegrasi Database)
Tools ini menggunakan database lokal (`IndexedDB`) yang saling terhubung.

1. **[✅ Ready] Kasir Warung (POS Lite)**
   - **Path:** `/finance/pos`
   - **Fungsi:** Mencatat transaksi penjualan, stok berkurang otomatis.
   - **File:** `src/views/finance/pos/Cashier.vue`

2. **[✅ Ready] Produk Manager**
   - **Path:** `/finance/products`
   - **Fungsi:** Tambah, edit, hapus data produk dan stok.
   - **File:** `src/views/finance/pos/ProductList.vue`

3. **[✅ Ready] Laporan Harian**
   - **Path:** `/finance/report`
   - **Fungsi:** Rekap omzet harian & riwayat transaksi.
   - **File:** `src/views/finance/DailyReport.vue`

4. **[✅ Ready] Generator Kuitansi (Receipt)**
   - **Path:** `/finance/invoice`
   - **Fungsi:** Cetak ulang struk atau share via WA dari riwayat transaksi.
   - **File:** `src/views/finance/ReceiptGenerator.vue`

5. **[✅ Ready] Buku Hutang (Debt Manager)**
   - **Path:** `/utilities/debt-manager`
   - **Fungsi:** Catat hutang pelanggan & reminder WA.
   - **File:** `src/views/utilities/DebtManager.vue`

---

## 📂 Marketing (Pemasaran)
Alat bantu promosi dan penjualan.

6. **[✅ Ready] Kalkulator Harga Ojol**
   - **Path:** `/marketing/food-delivery`
   - **Fungsi:** Hitung harga jual agar aman dari potongan komisi aplikasi.
   - **File:** `src/views/marketing/FoodDeliveryPricing.vue`

7. **[✅ Ready] Link Bio Generator**
   - **Path:** `/marketing/link-bio`
   - **Fungsi:** Buat halaman profil link (HTML) sederhana.
   - **File:** `src/views/marketing/LinkBio.vue`

8. **[✅ Ready] Generator Kartu Nama**
   - **Path:** `/marketing/business-card`
   - **Fungsi:** Desain kartu nama instan siap download gambar.
   - **File:** `src/views/marketing/BusinessCard.vue`

9. **[✅ Ready] QR Menu Maker**
   - **Path:** `/marketing/qr-menu`
   - **Fungsi:** Generate QR Code berisi teks menu dari database produk.
   - **File:** `src/views/marketing/QRMenuMaker.vue`

10. **[✅ Ready] Banner Toko Generator**
    - **Path:** `/marketing/banner`
    - **Fungsi:** Buat gambar status WA (Buka/Tutup/Promo).
    - **File:** `src/views/marketing/BannerGenerator.vue`

11. **[✅ Ready] Template Copywriting WA**
    - **Path:** `/marketing/copywriting`
    - **Fungsi:** Template chat balasan otomatis (Auto Text).
    - **File:** `src/views/marketing/CopywritingWA.vue`

12. **[✅ Ready] Diskon Planner**
    - **Path:** `/marketing/discount`
    - **Fungsi:** Hitung profit saat memberikan diskon/promo.
    - **File:** `src/views/marketing/DiscountPlanner.vue`

13. **[✅ Ready] WhatsApp Link Generator**
    - **Path:** `/marketing/whatsapp-link`
    - **Fungsi:** Buat link `wa.me` dengan pesan pre-filled.
    - **File:** `src/utils/tools-config/marketing.js` (Config Based)

---

## 📂 Operations (Operasional)
Manajemen toko dan gudang.

14. **[✅ Ready] Kartu Stok Digital**
    - **Path:** `/operations/stock-card`
    - **Fungsi:** Catat barang masuk/keluar & histori mutasi stok.
    - **File:** `src/views/operations/StockCard.vue`

15. **[✅ Ready] Cetak Label Pengiriman**
    - **Path:** `/operations/shipping-label`
    - **Fungsi:** Form cetak label resi (PDF A6).
    - **File:** `src/views/operations/ShippingLabel.vue`

16. **[✅ Ready] Surat Jalan Generator**
    - **Path:** `/operations/delivery-order`
    - **Fungsi:** Cetak dokumen pengantar barang formal.
    - **File:** `src/views/operations/DeliveryOrder.vue`

17. **[✅ Ready] Konversi Resep (Recipe Scaler)**
    - **Path:** `/operations/recipe-scaler`
    - **Fungsi:** Kalkulator ubah porsi resep masakan.
    - **File:** `src/views/operations/RecipeConverter.vue`

18. **[✅ Ready] SOP Harian Checklist**
    - **Path:** `/operations/sop-checklist`
    - **Fungsi:** Daftar tugas harian karyawan yang reset otomatis.
    - **File:** `src/views/operations/SOPChecklist.vue`

19. **[✅ Ready] HPP Calculator**
    - **Path:** `/operations/hpp-calculator`
    - **Fungsi:** Hitung modal produksi & simpan jadi produk baru.
    - **File:** `src/views/operations/HPPCalculator.vue`

---

## 📂 Utilities & Niche (Lainnya)
Fitur pelengkap produktivitas.

20. **[✅ Ready] QR Wifi Maker**
    - **Path:** `/utilities/qr-wifi`
    - **Fungsi:** Generate QR Code untuk login Wifi otomatis.
    - **File:** `src/views/utilities/QRWifi.vue`

21. **[✅ Ready] Timer Dapur**
    - **Path:** `/utilities/kitchen-timer`
    - **Fungsi:** Timer masak multi-slot.
    - **File:** `src/views/utilities/KitchenTimer.vue`

22. **[✅ Ready] Split Bill Kalkulator**
    - **Path:** `/utilities/bill-splitter`
    - **Fungsi:** Hitung patungan makan (+Tax/Service).
    - **File:** `src/views/utilities/BillSplitter.vue`

23. **[✅ Ready] Simulasi Kredit**
    - **Path:** `/utilities/credit-simulator`
    - **Fungsi:** Hitung cicilan kredit barang/kendaraan.
    - **File:** `src/views/utilities/CreditSimulator.vue`

24. **[✅ Ready] Random Picker (Doorprize)**
    - **Path:** `/utilities/random-picker`
    - **Fungsi:** Acak pemenang dari database pelanggan.
    - **File:** `src/views/utilities/RandomPicker.vue`

25. **[✅ Ready] Kalkulator Kain**
    - **Path:** `/utilities/fabric-calc`
    - **Fungsi:** Estimasi kebutuhan kain (Tailor Mode).
    - **File:** `src/views/utilities/FabricCalculator.vue`

26. **[✅ Ready] Simple To-Do**
    - **Path:** `/utilities/simple-todo`
    - **Fungsi:** Catatan tugas sederhana.
    - **File:** `src/views/utilities/SimpleToDo.vue`

---
*Terakhir Diperbarui: 31 Januari 2026*
