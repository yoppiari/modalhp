<template>
  <div class="bg-white min-h-screen p-6 max-w-md mx-auto">
    <div class="mb-6 flex items-center justify-between">
       <h1 class="text-2xl font-bold text-slate-800">Settings</h1>
    </div>
    
    <div class="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mb-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="bg-white p-3 rounded-full text-indigo-600 shadow-sm">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
        </div>
        <div>
           <h3 class="font-bold text-indigo-900">Mode Offline</h3>
           <p class="text-xs text-indigo-600/80">Kelola penyimpanan perangkat.</p>
        </div>
      </div>
      
      <!-- Offline Manager Component -->
      <OfflineManager />
    </div>

    <!-- Account -->
    <div class="bg-white border border-slate-100 rounded-xl p-4 mb-6 shadow-sm">
       <h3 class="font-bold text-slate-800 mb-2">Akun Saya</h3>
       <div class="text-sm text-slate-600">
         <p>Email: {{ userEmail }}</p>
         <p>Status: {{ userStatus }}</p>
       </div>
    </div>

    <!-- Cloud Storage -->
    <div class="bg-white border border-slate-100 rounded-xl p-4 mb-6 shadow-sm">
       <div class="flex items-center justify-between mb-2">
         <h3 class="font-bold text-slate-800">Cloud Storage</h3>
         <div class="flex items-center gap-2">
           <span class="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full font-medium">Belum Aktif</span>
           <span class="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">Rp25.000/bln</span>
         </div>
       </div>
       <p class="text-sm text-slate-600 mb-4">
          Backup otomatis unlimited — data aman tanpa khawatir HP hilang, rusak, atau memori penuh. Ganti HP atau buka di perangkat lain? Tinggal login, semua data langsung tersedia.
        </p>
       <button disabled class="w-full text-center bg-slate-100 text-slate-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed">
         Segera Hadir
       </button>
    </div>

    <!-- Info -->
    <div class="text-center text-xs text-slate-400 mt-8">
      <p>ModalHP v2.0.0</p>
      <p>Made for Indonesian Local Business</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import OfflineManager from '../components/OfflineManager.vue';

const userEmail = ref('Loading...');
const userStatus = ref('Free');

onMounted(() => {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    const user = JSON.parse(userData);
    userEmail.value = user.email;
    userStatus.value = user.subscriptionStatus || 'Free';
  }
});
</script>
