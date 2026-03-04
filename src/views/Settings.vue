<template>
  <div class="bg-white min-h-screen p-6 max-w-md mx-auto">
    <div class="mb-6 flex items-center justify-between">
       <h1 class="text-2xl font-bold text-slate-800">Settings</h1>
    </div>

    <!-- Profil Usaha -->
    <div class="bg-white border border-slate-100 rounded-2xl p-5 mb-6 shadow-sm shadow-slate-200/50 relative overflow-hidden">
      <!-- Decorative background element -->
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-60"></div>
      
      <div class="flex items-center gap-3 mb-5 relative z-10">
        <div class="bg-blue-100 p-2.5 rounded-xl text-blue-600 shadow-sm border border-blue-200/50">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="stroke-current" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
        <div>
           <h3 class="font-bold text-slate-800 leading-tight">Profil Usaha</h3>
           <p class="text-[10px] text-slate-500 font-medium">Informasi untuk di struk & slip gaji.</p>
        </div>
      </div>
      
      <div class="space-y-4 relative z-10">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Nama Usaha</label>
          <input v-model="formProfile.businessName" type="text" placeholder="Contoh: Warung Berkah" class="w-full bg-slate-50 border border-slate-200/80 text-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium">
        </div>
        
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Alamat Singkat</label>
          <input v-model="formProfile.address" type="text" placeholder="Contoh: Jl. Sudirman No 12" class="w-full bg-slate-50 border border-slate-200/80 text-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Telepon / WA</label>
            <input v-model="formProfile.phone" type="tel" placeholder="0812..." class="w-full bg-slate-50 border border-slate-200/80 text-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium">
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-1">Nama Pemilik</label>
            <input v-model="formProfile.ownerName" type="text" placeholder="(Untuk Slip Gaji)" class="w-full bg-slate-50 border border-slate-200/80 text-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium">
          </div>
        </div>
        
        <button @click="handleSaveProfile" :disabled="isSaving" class="w-full mt-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait shadow-md shadow-slate-800/20">
          <span v-if="!isSaving">{{ saveSuccess ? '✅ Berhasil Disimpan' : 'Simpan Profil' }}</span>
          <span v-else>Menyimpan...</span>
        </button>
      </div>
    </div>
    
    <!-- Mode Offline -->
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

    <!-- Backup & Restore -->
    <div class="mb-6">
      <DataBackup />
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
import { ref, watch, onMounted } from 'vue';
import OfflineManager from '../components/OfflineManager.vue';
import DataBackup from '../components/DataBackup.vue';
import { useBusinessProfile } from '../composables/useBusinessProfile';

// Account State
const userEmail = ref('Loading...');
const userStatus = ref('Free');

// Business Profile State
const { businessProfile, saveProfile } = useBusinessProfile();
const formProfile = ref({
  businessName: '',
  address: '',
  phone: '',
  ownerName: ''
});
const isSaving = ref(false);
const saveSuccess = ref(false);

// Watch for changes from DB and update form
watch(businessProfile, (newProfile) => {
  if (newProfile) {
    formProfile.value = { ...newProfile };
  }
}, { immediate: true, deep: true });

const handleSaveProfile = async () => {
  if (!formProfile.value.businessName) {
    alert('Nama Usaha minimal harus diisi!');
    return;
  }
  
  isSaving.value = true;
  saveSuccess.value = false;
  
  const success = await saveProfile(formProfile.value);
  
  isSaving.value = false;
  if (success) {
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 2000);
  } else {
    alert('Gagal menyimpan profil.');
  }
};

onMounted(() => {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    const user = JSON.parse(userData);
    userEmail.value = user.email;
    userStatus.value = user.subscriptionStatus || 'Free';
  }
});
</script>
