<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <!-- Breadcrumb Header -->
    <div class="mb-6 flex items-center gap-3">
      <button @click="$router.push('/apps/ekstra')" class="bg-white p-2 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
        <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
      </button>
      <div class="flex flex-col">
        <span class="text-xs text-slate-500 font-medium">Ekstra</span>
        <h1 class="text-xl font-bold text-slate-800 leading-tight">AI Poster Maker</h1>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Main Info Card -->
      <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
        <div class="flex items-center gap-3 mb-4">
          <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M12 3v18"/></svg>
          </div>
          <div>
            <h2 class="text-lg font-bold">AI Poster Maker</h2>
            <p class="text-purple-100 text-xs">Buat poster promosi keren dengan AI Google</p>
          </div>
        </div>

        <a
          href="https://aistudio.google.com/apps/b1f66a69-d297-45c9-9aa8-2b2c60f8bea7?fullscreenApplet=true&showPreview=true&showAssistant=true"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-xl hover:bg-purple-50 transition-colors active:scale-[0.98] shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
          Buka AI Poster Maker
        </a>
      </div>

      <!-- Instructions Card -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex items-start gap-3 mb-4">
          <div class="bg-purple-100 p-2.5 rounded-xl shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-slate-800 mb-3">Panduan Penggunaan</h3>
            <ol class="space-y-3 text-sm text-slate-600">
              <li class="flex items-start gap-3">
                <span class="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                <div>
                  <p class="font-medium text-slate-800">Wajib login dengan akun Gmail</p>
                  <p class="text-xs text-slate-500 mt-0.5">Pastikan Anda sudah login ke akun Google/Gmail Anda</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                <div>
                  <p class="font-medium text-slate-800">Klik tombol "Buka AI Poster Maker"</p>
                  <p class="text-xs text-slate-500 mt-0.5">Tombol di atas akan membuka Google AI Studio</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <span class="bg-purple-100 text-purple-600 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                <div>
                  <p class="font-medium text-slate-800">Klik "OK" / "Setuju" semua</p>
                  <p class="text-xs text-slate-500 mt-0.5">Teruskan klik setuju sampai aplikasi tampil sempurna</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Info Card -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
        <div class="flex-1">
          <p class="text-xs text-slate-500 leading-relaxed">
            <span class="font-medium text-slate-700">Catatan:</span> AI Poster Maker adalah tool dari Google yang memerlukan koneksi internet. Pastikan koneksi stabil untuk pengalaman terbaik.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next';
</script>
