<template>
  <div class="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
    
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            M
          </div>
          <span class="font-extrabold text-xl tracking-tight text-slate-800">ModalHP<span class="text-blue-600">.</span></span>
        </div>
        
        <div class="flex items-center gap-4">
          <a href="/apps/login" class="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
            Login <span class="hidden sm:inline">Sekarang</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero / Problem Section (P of PAS) -->
    <section class="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div class="absolute top-40 -right-20 w-[400px] h-[400px] bg-purple-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div class="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div class="flex flex-col items-center gap-4 mb-8">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Rilis Versi Beta 1.0
          </div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-xl border border-slate-700">
             <svg class="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
             <span class="text-left w-full sm:w-auto">100% Offline First. Tanpa Internet. Tanpa Kuota.</span>
          </div>
        </div>
        
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Pusing Kelola Usaha Karena<br class="hidden md:block"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Aplikasi Berantakan?</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-12 font-medium">
          Tinggalkan cara lama yang bikin ribet dan mahal. ModalHP hadir memajukan usaha Anda dengan sistem komplit yang <strong class="text-slate-800">100% bisa dipakai tanpa internet</strong>. Sekali bayar, pakai sepuasnya!
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#solusi" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-3">
            Lihat Solusinya
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Agitation Section (A of PAS) -->
    <section class="py-16 bg-slate-50 relative border-y border-slate-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8 relative">
            <h2 class="text-3xl md:text-4xl font-bold leading-tight">
              Kenyataan Pahit Menjadi<br/>
              <span class="text-red-500">Pemilik Usaha Hari Ini</span>
            </h2>
            
            <div class="space-y-6">
              <div class="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-1">Langganan Software Mahal</h3>
                  <p class="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                    Setiap bulan harus bayar biaya berlangganan aplikasi kasir, sistem stok, hingga pembuat promo yang terpisah-pisah. Laba makin tipis.
                  </p>
                </div>
              </div>

              <div class="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 flex-shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-1">Data Tercecer & Tidak Keruan</h3>
                  <p class="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                    Rekap manual makan waktu. Data penjualan di HP Kasir, sisa stok di buku catatan, data pelanggan entah di mana. Rentan salah hitung.
                  </p>
                </div>
              </div>
              
              <div class="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <h3 class="font-bold text-lg mb-1">Ketergantungan Internet</h3>
                  <p class="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                    Sedang jualan tapi sinyal ilang? Aplikasi kasir tiba-tiba tidak bisa dipakai. Pelanggan ngantri lama dan kabur.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative hidden lg:block">
            <!-- Decorative Visual -->
             <div class="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-3xl transform rotate-3"></div>
             <div class="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 transform -rotate-1">
                <div class="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <span class="font-bold text-slate-700">Tagihan Bulanan Anda</span>
                  </div>
                  <span class="text-sm font-semibold text-red-500">Bayar Terus Tiap Bulan</span>
                </div>
                <div class="space-y-4 mb-8">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500">Software POS & Keuangan</span>
                    <span class="font-medium">Rp 100.000 / bln</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500">Marketing & QR Code Tools</span>
                    <span class="font-medium">Rp 60.000 / bln</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500">Sistem Operasional & HPP</span>
                    <span class="font-medium">Rp 50.000 / bln</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-slate-500">Pencatat Utang & Utilitas</span>
                    <span class="font-medium">Rp 50.000 / bln</span>
                  </div>
                </div>
                <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span class="font-bold text-slate-800">Total Pengeluaran</span>
                  <div class="text-right">
                    <span class="block text-xl font-black text-red-600">Rp 260.000+</span>
                    <span class="text-xs text-red-400 font-medium">Setiap Bulannya. Hangus.</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Section (S of PAS) -->
    <section id="solusi" class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Kenalkan, <span class="text-blue-600">ModalHP.</span><br/>
            Satu Aplikasi, Semua Ada.
          </h2>
          <p class="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            Lupakan langganan bulanan selamanya. ModalHP menggabungkan 14+ tools eksklusif yang Anda butuhkan ke dalam satu sistem yang efisien dan cepat di HP.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <!-- Tool Feature 1 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Kasir Pintar (POS) & Stok</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Catat transaksi kilat offline, cetak struk bluetooth, & pantau mutasi Kartu Stok barang rapi.
            </p>
          </div>

          <!-- Tool Feature 2 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Keuangan & Invoice</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Pantau arus kas lewat Laporan Harian interaktif dan buat Invoice PDF profesional kilat.
            </p>
          </div>

          <!-- Tool Feature 3 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Payroll Karyawan</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Atur daftar gaji karyawan, otomatisasi hitung lembur mingguan, perhitungan gaji, dan cetak Slip Gaji instan.
            </p>
          </div>

          <!-- Tool Feature 4 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Pencatat Utang & Kasbon</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Kelola utang/piutang pelanggan dan kasbon karyawan. Tidak ada lagi catat buku rentan hilang atau lupa tagih.
            </p>
          </div>

          <!-- Tool Feature 5 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Kalkulator Bisnis & F&B</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Hitung presisi HPP resep makanan, optimasi harga jual GoFood/GrabFood, hingga simulasi Generator Diskon cerdas.
            </p>
          </div>
          
          <!-- Tool Feature 6 -->
          <div class="group p-6 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all hover:-translate-y-1">
            <div class="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800">Marketing & Utilitas</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Buat QR Code canggih untuk Menu/Wifi, Split Bill akurat, panggil arisan, hingga bikin Link WA instan untuk pesanan.
            </p>
          </div>
        </div>
        
        <!-- Request New App Banner -->
        <div class="mt-12 md:mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 md:p-8 text-center max-w-4xl mx-auto shadow-sm">
          <h3 class="text-xl md:text-2xl font-bold text-slate-800 mb-3">Tidak Menemukan Aplikasi yang Anda Cari?</h3>
          <p class="text-slate-600 text-sm md:text-base mb-6 max-w-2xl mx-auto leading-relaxed">
            Tim ModalHP siap membuatkan aplikasi kustom khusus untuk kebutuhan usaha Anda secara <strong class="text-blue-700">GRATIS!</strong> Bayangkan bayar sekali hari ini, dan terus dapat update fitur seumur hidup.
          </p>
          <a href="/apps/login" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 text-sm md:text-base">
            Request Aplikasi Baru
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Intip Tampilan Aplikasi (App Preview) -->
    <section class="py-16 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      <div class="absolute top-20 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-3xl -z-10 opacity-40"></div>
      
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            Intip Tampilannya
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
            Simpel, Cepat, dan<br class="hidden md:block"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Langsung Bisa Dipakai.</span>
          </h2>
          <p class="text-lg text-slate-500 font-medium leading-relaxed">
            Tidak perlu pelatihan khusus. Antarmuka ModalHP dirancang seintuisi mungkin — siapa pun bisa langsung menguasainya dalam hitungan menit, bahkan tanpa koneksi internet.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mt-12 w-full max-w-5xl mx-auto">
          <!-- Screenshot 1: Dashboard -->
          <div class="relative group mx-auto w-full max-w-[340px]">
            <!-- Glowing aura behind the phone -->
            <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <!-- Phone Frame -->
            <div class="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700 hover:-translate-y-2 border border-slate-700/50">
              <!-- Notch/Dynamic Island -->
              <div class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2 shadow-inner">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                <div class="w-1 h-1 rounded-full bg-blue-500/80 shadow-[0_0_4px_rgba(59,130,246,0.8)]"></div>
              </div>
              
              <!-- Screen container -->
              <div class="relative bg-white rounded-[2.25rem] overflow-hidden aspect-[9/19.5] border-[0.5px] border-slate-800">
                <!-- Screen Glare Effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 z-10 pointer-events-none"></div>
                <div class="absolute -inset-x-20 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent transform -skew-y-12 z-10 pointer-events-none"></div>
                
                <!-- The actual image -->
                <img src="/preview-dashboard.jpg" alt="Dashboard ModalHP" class="w-full h-full object-cover relative z-0" loading="lazy" />
              </div>
            </div>
            
            <!-- Description -->
            <div class="mt-8 text-center px-4">
              <h3 class="font-bold text-xl text-slate-800 mb-2">Semua Tools dalam Satu Layar</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Kasir, Stok, Laporan Omzet, Pencatat Hutang — semuanya tinggal satu ketukan jari Anda.</p>
            </div>
          </div>

          <!-- Screenshot 2: Settings & Offline -->
          <div class="relative group mx-auto w-full max-w-[340px] mt-8 md:mt-12">
            <!-- Glowing aura behind the phone -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-[3rem] blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <!-- Phone Frame -->
            <div class="relative bg-slate-900 rounded-[3rem] p-3 shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-700 hover:-translate-y-2 border border-slate-700/50">
              <!-- Notch/Dynamic Island -->
              <div class="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2 shadow-inner">
                <div class="w-1.5 h-1.5 rounded-full bg-slate-800/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
                <div class="w-1 h-1 rounded-full bg-indigo-500/80 shadow-[0_0_4px_rgba(99,102,241,0.8)]"></div>
              </div>
              
              <!-- Screen container -->
              <div class="relative bg-white rounded-[2.25rem] overflow-hidden aspect-[9/19.5] border-[0.5px] border-slate-800">
                <!-- Screen Glare Effect -->
                <div class="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 z-10 pointer-events-none"></div>
                <div class="absolute -inset-x-20 top-0 h-[40%] bg-gradient-to-b from-white/10 to-transparent transform -skew-y-12 z-10 pointer-events-none"></div>
                
                <!-- The actual image -->
                <img src="/preview-settings.jpg" alt="Settings ModalHP" class="w-full h-full object-cover relative z-0" loading="lazy" />
              </div>
            </div>
            
            <!-- Description -->
            <div class="mt-8 text-center px-4">
              <h3 class="font-bold text-xl text-slate-800 mb-2">Personalisasi & Mode Offline</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Kelola profil usaha dan aktifkan Mode Offline — aplikasi 100% siap dipakai tanpa internet.</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="https://beli.modalhp.com/lifetime" class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-slate-200 transition-all hover:-translate-y-0.5 text-sm md:text-base">
            Coba Sekarang — Bayar Sekali, Pakai Selamanya
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- Keunggulan Section -->
    <section class="py-16 bg-slate-50 border-t border-slate-100 relative">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            Keunggulan Utama
          </div>
          <h2 class="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">
            Mengapa Ratusan Pengusaha <br class="hidden md:block"/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Beralih ke ModalHP?</span>
          </h2>
          <p class="text-lg text-slate-500 font-medium leading-relaxed">
            Lebih dari sekadar kasir. Sistem kami dirancang secara fundamental untuk memberikan ketenangan pikiran, kecepatan, dan efisiensi biaya.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          <!-- 100% Offline -->
          <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">100% Offline (PWA)</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Lancar jaya meski tanpa kuota internet atau wilayah susah sinyal. Teknologi PWA & IndexedDB memastikan bisnis Anda tidak pernah terhenti.
            </p>
          </div>

          <!-- Ringan & Cepat -->
          <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Kinerja Super Cepat</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Akses instan tanpa loading lama. Dioptimalkan secara khusus untuk berjalan mulus layaknya mentega di HP spesifikasi minim atau RAM kecil.
            </p>
          </div>

          <!-- Privasi Terjamin -->
          <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Privasi 100% Terjamin</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Kami tidak bisa mencuri data pelanggan Anda. Seluruh rekap transaksi mutlak disimpan LOKAL dan dienkripsi di peramban perangkat yang Anda gunakan.
            </p>
          </div>

          <!-- Berbagi Super Cepat WA -->
          <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Integrasi Ekosistem WA</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Dirancang sesuai kebiasaan orang Indonesia. Bagikan struk belanja, tagihan piutang, hingga pesanan semudah satu klik langsung ke WA pelanggan.
            </p>
          </div>

          <!-- Install Instan (PWA) -->
          <div class="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">Install Instan via Web</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Hemat ruang penyimpanan HP Anda. Tak perlu ribet mencari di Play Store/App Store. Cukup klik tombol <i>Install</i> di aplikasi ini, dan ModalHP langsung terpasang di layar utama Anda!
            </p>
          </div>
          
          <!-- Bayar Sekali -->
          <div class="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl border border-blue-500 shadow-xl hover:-translate-y-1 transition-all duration-300 text-white relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div class="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
               <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Bebas Biaya Bulanan!</h3>
            <p class="text-blue-100 leading-relaxed text-sm">
              Selamat tinggal sewa aplikasi per bulan. Cukup <strong class="text-yellow-300">beli satu kali di awal</strong> untuk pemakaian seumur hidup. Jauh lebih hemat & melipatgandakan profit!
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- Pricing / FOMO Offer Section with 60% Discount -->
    <section class="py-16 bg-slate-900 relative">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdib3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Q0EzbkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djI2SDM0VjM2aC0yMnYyNGgtMnYtMjZoLTh2LTJoOHYtOGgtOHYtMmgyNHYtMjRWMmgydjIwaDIwdjJoLTIwdjgwaC0ydjhoLTJ6TTM2IDM2aC0ydjJOMzYiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="max-w-4xl mx-auto px-6 relative z-10">
        <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-1 md:p-1.5 shadow-2xl">
          <div class="bg-slate-900/90 backdrop-blur-xl rounded-[22px] md:rounded-[20px] p-6 md:p-12 text-center border border-white/10">
            
            <!-- Urgency Badge -->
            <div class="flex flex-col items-center gap-3 mb-6">
              <span class="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-red-500/20 border border-red-400/40 text-red-400 text-xs font-bold tracking-widest uppercase animate-pulse shadow-inner">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
                </span>
                Kuota Sangat Terbatas
              </span>
              <span class="inline-block py-1 px-3 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold tracking-widest uppercase shadow-inner">
                🔥 Diskon 60% — Hanya untuk Early Adopters
              </span>
            </div>

            <h2 class="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">
              15 Aplikasi Lengkap Seumur Hidup<br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-sm leading-normal">Dengan Harga Secangkir Kopi.</span>
            </h2>
            
            <p class="text-slate-300 text-sm md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Katakan selamat tinggal pada langganan bulanan yang mengeringkan keuntungan Anda. Bayar <strong class="text-white">sekali hari ini</strong>, pakai bebas <strong class="text-white">selamanya</strong> — tanpa batas kuota transaksi, tanpa biaya tersembunyi.
            </p>

            <!-- Price Comparison -->
            <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10 max-w-md mx-auto">
              <div class="flex items-center justify-center gap-3 mb-3">
                <span class="text-slate-400 line-through text-lg md:text-2xl font-bold">Rp 499.000</span>
                <span class="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">-60%</span>
              </div>
              <div class="text-4xl md:text-5xl font-black text-white mb-1">
                Rp 199.000
              </div>
              <p class="text-yellow-400 text-sm font-bold">Sekali bayar. Seumur Hidup. Selesai.</p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="https://beli.modalhp.com/lifetime" class="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 hover:from-yellow-300 hover:to-yellow-400 font-black py-4 px-10 rounded-2xl shadow-[0_0_40px_rgba(250,204,21,0.4)] transition-all hover:scale-105 text-base md:text-lg flex items-center justify-center gap-2">
                 🚀 Ambil Diskon 60% Sekarang
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
               </a>
            </div>
            
            <div class="mt-6 space-y-2">
              <p class="text-xs text-slate-400">⚡ Harga naik kapan saja tanpa pemberitahuan sebelumnya.</p>
              <p class="text-xs text-slate-400">🛡️ Garansi uang kembali 14 hari penuh. 100% bebas risiko.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Simple Footer with Blog Link -->
    <footer class="bg-white border-t border-slate-100 py-8">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded border-2 border-slate-900 flex items-center justify-center font-bold text-xs">
            M
          </div>
          <span class="font-bold text-slate-800 text-sm">ModalHP</span>
        </div>
        
        <nav class="flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-500">
          <a href="#" class="hover:text-blue-600 transition-colors">Fitur</a>
          <a href="#" class="hover:text-blue-600 transition-colors">Harga</a>
          <a href="/blog" class="hover:text-blue-600 transition-colors flex items-center gap-1">
            Baca Blog Kami
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </nav>
        
        <p class="text-slate-400 text-xs">
          &copy; 2026 ModalHP Software.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Empty setup script for now, as interactivity logic is kept minimal on this static-ish landing page.
</script>

<style scoped>
/* Scoped styles for extra animations if needed */
html {
  scroll-behavior: smooth;
}
</style>
