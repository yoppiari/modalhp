# Tools Core Ecosystem — Manajemen Utama Warung

Kumpulan 6 fitur inti yang saling terintegrasi menggunakan database lokal (IndexedDB).

## 1. Kasir Warung (POS Lite)
- **Akses:** /finance/pos
- **Fungsi:** Mencatat transaksi penjualan, stok berkurang otomatis saat transaksi.

## 2. Produk Manager
- **Akses:** /finance/products
- **Fungsi:** Tambah, edit, hapus data produk dan stok barang.

## 3. Laporan Harian
- **Akses:** /finance/report
- **Fungsi:** Rekap omzet harian & riwayat seluruh transaksi.

## 4. Buku Hutang (Debt Manager)
- **Akses:** /utilities/debt-manager
- **Fungsi:** Catat hutang pelanggan & otomatis kirim tagihan/reminder via WhatsApp.

## 5. Generator Kuitansi (Receipt)
- **Akses:** /finance/invoice
- **Fungsi:** Cetak ulang struk atau share via WA dari riwayat transaksi.

## 6. Kartu Stok Digital
- **Akses:** /operations/stock-card
- **Fungsi:** Catat barang masuk/keluar & histori mutasi stok. Alternatif template stok excel.

## Catatan Penting untuk CS
- Tool 1–6 **saling terhubung**: Transaksi di Kasir → stok otomatis berkurang di Produk Manager & Kartu Stok.
- Data transaksi dari Kasir otomatis masuk ke Laporan Harian.
- Struk dari Kasir bisa dicetak ulang di Generator Kuitansi.
