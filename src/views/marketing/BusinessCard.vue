<template>
  <div class="bg-violet-50 min-h-screen pb-24">
    <div class="bg-violet-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Kartu Nama</h2>
      <p class="text-violet-100 text-sm opacity-90">Bikin desain kartu usaha instan</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      
      <!-- Input Form -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-violet-100 space-y-3">
         <input v-model="form.name" placeholder="Nama Toko / Usaha" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-violet-500" />
         <input v-model="form.owner" placeholder="Nama Pemilik" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-violet-500" />
         <input v-model="form.phone" placeholder="No. WA / Telp" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-violet-500" />
         <textarea v-model="form.address" placeholder="Alamat Singkat" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-violet-500" rows="2"></textarea>
      </div>

      <!-- Theme Selector -->
      <div>
         <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Pilih Tema</label>
         <div class="flex gap-2 overflow-x-auto pb-2">
            <button @click="theme = 'modern'" :class="theme === 'modern' ? 'ring-2 ring-violet-500' : ''" class="w-16 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg shrink-0"></button>
            <button @click="theme = 'fun'" :class="theme === 'fun' ? 'ring-2 ring-violet-500' : ''" class="w-16 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg shrink-0"></button>
            <button @click="theme = 'elegant'" :class="theme === 'elegant' ? 'ring-2 ring-violet-500' : ''" class="w-16 h-10 bg-gradient-to-br from-emerald-600 to-teal-800 rounded-lg shrink-0"></button>
            <button @click="theme = 'classic'" :class="theme === 'classic' ? 'ring-2 ring-violet-500' : ''" class="w-16 h-10 bg-white border border-slate-300 rounded-lg shrink-0"></button>
         </div>
      </div>

      <!-- Preview Canvas -->
      <div class="relative">
         <div id="card-preview" class="w-full aspect-[1.75/1] rounded-xl shadow-lg p-6 flex flex-col justify-center relative overflow-hidden transition-all" :class="themeClasses">
            <!-- Background Elements -->
            <div v-if="theme === 'fun'" class="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
            <div v-if="theme === 'elegant'" class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            
            <div class="relative z-10">
               <h3 class="text-2xl font-black mb-1 leading-none">{{ form.name || 'Nama Toko' }}</h3>
               <p class="text-[10px] opacity-80 uppercase tracking-widest mb-4">{{ form.owner || 'Owner Name' }}</p>
               
               <div class="space-y-1 text-xs opacity-90">
                  <div class="flex items-center gap-2">
                     <span>📞</span> <span>{{ form.phone || '0812-XXXX-XXXX' }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                     <span>📍</span> <span>{{ form.address || 'Jalan Merdeka No. 45' }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- Download Button -->
      <button @click="downloadCard" class="w-full bg-violet-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-violet-200 active:scale-95 transition-all">
         💾 Download Gambar
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import html2canvas from 'html2canvas';

const form = ref({
  name: '',
  owner: '',
  phone: '',
  address: ''
});

const theme = ref('modern');

const themeClasses = computed(() => {
   switch(theme.value) {
      case 'modern': return 'bg-slate-900 text-white';
      case 'fun': return 'bg-gradient-to-br from-orange-400 to-pink-500 text-white';
      case 'elegant': return 'bg-emerald-900 text-emerald-50 font-serif';
      case 'classic': return 'bg-white text-slate-800 border-2 border-slate-800';
      default: return 'bg-white';
   }
});

const downloadCard = async () => {
   const el = document.getElementById('card-preview');
   try {
      const canvas = await html2canvas(el, { scale: 3 });
      const link = document.createElement('a');
      link.download = `kartu-nama-${form.value.name || 'toko'}.png`;
      link.href = canvas.toDataURL();
      link.click();
   } catch (err) {
      alert('Gagal generate gambar');
   }
};
</script>
