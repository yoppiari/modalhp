<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
    
    <!-- Hero Section -->
    <header class="relative overflow-hidden bg-white pb-16 pt-12 lg:pb-32 lg:pt-20">
      <div class="absolute inset-x-0 bottom-0 h-px bg-slate-100"></div>
      
      <div class="relative max-w-lg mx-auto px-6 text-center">
        <!-- Badge -->
        <span class="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600 mb-6 uppercase tracking-wider shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          Versi 2.0 (Swiss Army Style)
        </span>

        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.15]">
          Kelola Usaha <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Cuma Modal HP</span>.
        </h1>
        
        <p class="text-lg text-slate-500 mb-10 leading-relaxed max-w-sm mx-auto">
          Satu aplikasi serbaguna untuk semua kebutuhan. Kasir, pembukuan, stok, hingga marketing tools dalam genggaman.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/apps" class="w-full sm:w-auto bg-blue-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl hover:-translate-y-0.5 transition-all text-center flex items-center justify-center gap-2">
            <span>Buka Aplikasi</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </router-link>
          
          <a href="#features" class="w-full sm:w-auto text-slate-600 font-semibold py-4 px-8 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
            Pelajari Dulu
          </a>
        </div>
        
        <p class="mt-6 text-xs text-slate-400 font-medium">
          ✅ Tidak perlu login &nbsp;•&nbsp; ⚡ Akses Offline &nbsp;•&nbsp; 🔒 Data di HP
        </p>
      </div>
    </header>

    <!-- Features Grid -->
    <section id="features" class="py-20 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-3">Kenapa ModalHP?</h2>
        <p class="text-slate-500">Aplikasi praktis untuk usahawan yang gak mau ribet.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="bg-white p-6 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-blue-100 transition-colors group">
          <div class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 class="font-bold text-slate-800 text-lg mb-2">Offline First</h3>
          <p class="text-slate-500 text-sm leading-relaxed">
            Tidak butuh internet. Aplikasi berjalan cepat dan lancar dimanapun Anda berjualan.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="bg-white p-6 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-indigo-100 transition-colors group">
          <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
          </div>
          <h3 class="font-bold text-slate-800 text-lg mb-2">Database Terpusat</h3>
          <p class="text-slate-500 text-sm leading-relaxed">
            Satu database untuk Kasir, Stok, dan Laporan. Data selalu sinkron otomatis.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="bg-white p-6 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-orange-100 transition-colors group">
          <div class="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 class="font-bold text-slate-800 text-lg mb-2">Privasi Aman</h3>
          <p class="text-slate-500 text-sm leading-relaxed">
            Data tersimpan lokal di HP Anda. Tidak di-upload ke server cloud manapun.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-slate-400 text-xs text-center border-t border-slate-100 mt-auto">
      <p>&copy; 2026 ModalHP. Buat Usaha Jadi Mudah.</p>
    </footer>

  </div>
</template>

<script setup>
</script>
