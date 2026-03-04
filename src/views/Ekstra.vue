<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <div class="mb-6 flex items-center gap-3">
      <button @click="$router.push('/apps')" class="bg-white p-2 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
        <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
      </button>
      <h1 class="text-xl font-bold text-slate-800">Ekstra</h1>
    </div>

    <div class="mb-6 bg-blue-50/80 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
      <component :is="WifiIcon" size="20" class="text-blue-500 shrink-0 mt-0.5" />
      <p class="text-sm text-blue-800 leading-relaxed">
        Fitur-fitur di halaman Ekstra ini (seperti Bantuan CS dan Request Fitur) memerlukan <span class="font-bold">koneksi internet yang stabil</span> untuk berfungsi dengan optimal.
      </p>
    </div>

    <div class="space-y-4">
      <router-link 
        to="/apps/ekstra/cs"
        class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors group"
      >
        <div class="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-100 transition-colors">
          <component :is="MailIcon" size="24" class="text-blue-500" />
        </div>
        <div class="flex-1">
          <h2 class="text-base font-bold text-slate-800">Bantuan CS</h2>
          <p class="text-slate-500 text-xs mt-1">
            Hubungi Customer Service via email.
          </p>
        </div>
        <component :is="ChevronRightIcon" size="20" class="text-slate-400" />
      </router-link>

      <router-link
        to="/apps/ekstra/request-fitur"
        class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors group"
      >
        <div class="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 group-hover:bg-amber-100 transition-colors">
          <component :is="LightbulbIcon" size="24" class="text-amber-500" />
        </div>
        <div class="flex-1">
          <h2 class="text-base font-bold text-slate-800">Request Fitur</h2>
          <p class="text-slate-500 text-xs mt-1">
            Kirimkan ide atau fitur yang Anda butuhkan.
          </p>
        </div>
        <component :is="ChevronRightIcon" size="20" class="text-slate-400" />
      </router-link>

      <!-- AI Poster Maker - Step 1: Header -->
      <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-5 rounded-2xl shadow-lg text-white">
        <div class="flex items-center gap-3">
          <div class="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M12 3v18"/></svg>
          </div>
          <div>
            <h2 class="text-lg font-bold">AI Poster Maker</h2>
            <p class="text-purple-100 text-xs">Buat poster promosi keren dengan AI Google</p>
          </div>
        </div>
      </div>

      <!-- AI Poster Maker - Step 2: Instructions & Button -->
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex items-start gap-3 mb-4">
          <div class="bg-purple-100 p-2 rounded-lg shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-slate-800 text-sm mb-2">Cara Menggunakan:</h3>
            <ol class="space-y-2 text-sm text-slate-600">
              <li class="flex items-start gap-2">
                <span class="bg-purple-100 text-purple-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                <span>Wajib login dengan <strong>akun Gmail</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span class="bg-purple-100 text-purple-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                <span>Klik tombol di bawah untuk buka AI Poster Maker</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="bg-purple-100 text-purple-600 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                <span>Klik <strong>"OK" / "Setuju"</strong> semua sampai aplikasi tampil sempurna</span>
              </li>
            </ol>
          </div>
        </div>

        <a
          href="https://aistudio.google.com/apps/b1f66a69-d297-45c9-9aa8-2b2c60f8bea7?fullscreenApplet=true&showPreview=true&showAssistant=true"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-purple-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          Akses AI Poster Maker
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft as ArrowLeftIcon, Mail as MailIcon, Lightbulb as LightbulbIcon, ChevronRight as ChevronRightIcon } from 'lucide-vue-next';
</script>
