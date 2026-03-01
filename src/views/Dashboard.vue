<template>
  <div class="px-0 pb-6 max-w-md mx-auto min-h-screen bg-slate-50">
    
    <!-- Sticky Header -->
    <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3 mb-4 transition-all duration-300">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">ModalHP</h1>
          <p class="text-[10px] text-slate-500 font-medium">Aplikasi Usaha Serbaguna</p>
        </div>
        <button @click="logout" class="text-[10px] font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 flex items-center gap-1">
          <span>Keluar</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 space-y-8">

      <!-- Search Bar -->
      <div class="relative group">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg class="w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="text" placeholder="Mau cari alat apa?" class="w-full bg-white border border-slate-100 text-slate-700 rounded-2xl pl-10 pr-4 py-3.5 text-sm shadow-[0_2px_10px_-5px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium">
      </div>

      <!-- Categories -->
      <div class="space-y-8 pb-20">
        
        <!-- Category 1: Core Ecosystem (Manajemen Utama Warung) -->
        <section>
          <div class="flex items-center justify-between mb-4 px-1">
            <h2 class="font-bold text-slate-800 text-base">Manajemen Utama</h2>
            <component :is="BanknoteIcon" size="18" class="text-blue-500 bg-blue-50 p-0.5 rounded" />
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <!-- Kasir - Hero Card -->
            <router-link to="/apps/finance/pos" class="bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-5 rounded-3xl shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 col-span-2 relative overflow-hidden group">
              <div class="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              <div class="flex items-center justify-between relative z-10">
                <div class="flex items-center gap-4">
                   <div class="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm shadow-inner border border-white/10 group-hover:rotate-6 transition-transform">
                    <component :is="ShoppingCartIcon" size="24" stroke-width="2.5" />
                  </div>
                  <div>
                    <span class="block font-bold text-lg leading-tight">Kasir Warung</span>
                    <span class="text-indigo-100 text-xs font-medium">Mulai Jualan</span>
                  </div>
                </div>
                <div class="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
                </div>
              </div>
            </router-link>

             <!-- Produk -->
            <router-link to="/apps/finance/products" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-indigo-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="PackageIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Produk</h3>
              <p class="text-[10px] text-slate-400 font-medium">Kelola Stok</p>
            </router-link>

            <!-- Laporan -->
            <router-link to="/apps/finance/report" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-blue-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="BarChartIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Laporan</h3>
              <p class="text-[10px] text-slate-400 font-medium">Cek Omzet</p>
            </router-link>

            <!-- Buku Hutang -->
             <router-link to="/apps/utilities/debt-manager" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-red-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-red-50 w-12 h-12 rounded-2xl flex items-center justify-center text-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="BookIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Hutang</h3>
              <p class="text-[10px] text-slate-400 font-medium">Catat Kasbon</p>
            </router-link>

            <!-- Invoice -->
            <router-link to="/apps/finance/invoice" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-indigo-100 hover:shadow-lg transition-all active:scale-95 relative group">
              <div class="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="FileTextIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Kuitansi</h3>
              <p class="text-[10px] text-slate-400 font-medium">Cetak Struk</p>
            </router-link>

            <!-- Kartu Stok -->
            <router-link to="/apps/operations/stock-card" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-blue-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="ClipboardIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Kartu Stok</h3>
              <p class="text-[10px] text-slate-400 font-medium">Mutasi Barang</p>
            </router-link>
          </div>
        </section>

        <!-- Category 2: SEO & Traffic Magnets -->
        <section>
          <div class="flex items-center justify-between mb-4 px-1">
             <h2 class="font-bold text-slate-800 text-base">Alat Usaha Harian</h2>
             <component :is="LayersIcon" size="18" class="text-orange-500 bg-orange-50 p-0.5 rounded" />
          </div>
          <div class="grid grid-cols-2 gap-4">
             <!-- Slip Gaji -->
            <router-link to="/apps/finance/payroll" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-emerald-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="UsersIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Slip Gaji</h3>
              <p class="text-[10px] text-slate-400 font-medium">Hitung Gaji</p>
            </router-link>

            <!-- Cek HPP -->
            <router-link to="/apps/operations/hpp-calculator" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-orange-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="CalculatorIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Cek HPP</h3>
              <p class="text-[10px] text-slate-400 font-medium">Modal Kuliner</p>
            </router-link>

             <!-- WA Link -->
            <router-link to="/apps/marketing/whatsapp-link" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-green-100 hover:shadow-lg transition-all active:scale-95 relative group">
              <div class="bg-green-50 w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="MessageCircleIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">WA Link</h3>
              <p class="text-[10px] text-slate-400 font-medium">Link Auto Chat</p>
            </router-link>

             <!-- Simulasi Kredit -->
             <router-link to="/apps/utilities/credit-simulator" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-violet-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-violet-50 w-12 h-12 rounded-2xl flex items-center justify-center text-violet-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="MoreHorizontalIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Kredit</h3>
              <p class="text-[10px] text-slate-400 font-medium">Simulasi Cicilan</p>
            </router-link>
          </div>
        </section>

        <!-- Category 3: Marketing & Sales -->
        <section>
          <div class="flex items-center justify-between mb-4 px-1">
            <h2 class="font-bold text-slate-800 text-base">Penunjang Jualan</h2>
            <component :is="MegaphoneIcon" size="18" class="text-green-500 bg-green-50 p-0.5 rounded" />
          </div>
          <div class="grid grid-cols-2 gap-4">
             <!-- Diskon Planner -->
             <router-link to="/apps/marketing/discount" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-pink-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-pink-50 w-12 h-12 rounded-2xl flex items-center justify-center text-pink-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="PercentIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Diskon</h3>
              <p class="text-[10px] text-slate-400 font-medium">Hitung Promo</p>
            </router-link>

            <!-- Harga Ojol -->
            <router-link to="/apps/marketing/food-delivery" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-emerald-100 hover:shadow-lg transition-all active:scale-95 relative group">
              <div class="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="CalculatorIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Harga Ojol</h3>
              <p class="text-[10px] text-slate-400 font-medium">Anti Rugi Potongan</p>
            </router-link>

            <!-- QR Code All-In-One -->
            <router-link to="/apps/marketing/qr-code" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-blue-100 hover:shadow-lg transition-all active:scale-95 relative group col-span-2">
               <div class="flex items-center gap-4">
                  <div class="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <component :is="QrCodeIcon" size="24" stroke-width="2" />
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-700 text-base mb-0.5">QR Code Serbaguna</h3>
                    <p class="text-[11px] text-slate-400 font-medium leading-tight">Buat QR untuk Link, Teks, Menu, atau WiFi Otomatis.</p>
                  </div>
               </div>
            </router-link>
          </div>
        </section>

        <!-- Category 4: Viral Loop & Engagement -->
        <section>
          <div class="flex items-center justify-between mb-4 px-1">
             <h2 class="font-bold text-slate-800 text-base">Seru-Seruan</h2>
             <component :is="MessageSquareIcon" size="18" class="text-violet-500 bg-violet-50 p-0.5 rounded" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <!-- Split Bill -->
            <router-link to="/apps/utilities/bill-splitter" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-blue-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="ReceiptIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Split Bill</h3>
              <p class="text-[10px] text-slate-400 font-medium">Patungan Makan</p>
            </router-link>

            <!-- Random Picker -->
             <router-link to="/apps/utilities/random-picker" class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] border border-slate-50 hover:border-indigo-100 hover:shadow-lg transition-all active:scale-95 relative group">
               <div class="bg-indigo-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                <component :is="UsersIcon" size="24" stroke-width="2" />
              </div>
              <h3 class="font-bold text-slate-700 text-sm mb-0.5">Doorprize</h3>
              <p class="text-[10px] text-slate-400 font-medium">Acak Pemenang</p>
            </router-link>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const logout = () => {
  if(confirm('Yakin ingin keluar?')) {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    router.push('/apps/login');
  }
};

import { 
  Banknote as BanknoteIcon, 
  FileText as FileTextIcon, 
  Receipt as ReceiptIcon,
  Megaphone as MegaphoneIcon,
  MessageCircle as MessageCircleIcon,
  Package as PackageIcon,
  Calculator as CalculatorIcon,
  ShoppingCart as ShoppingCartIcon,
  Layers as LayersIcon,
  BarChart2 as BarChartIcon,
  QrCode as QrCodeIcon,
  Percent as PercentIcon,
  ClipboardList as ClipboardIcon,
  MoreHorizontal as MoreHorizontalIcon,
  Book as BookIcon,
  Users as UsersIcon,
  MessageSquare as MessageSquareIcon
} from 'lucide-vue-next';
</script>
