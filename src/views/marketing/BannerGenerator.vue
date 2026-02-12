<template>
  <div class="bg-purple-50 min-h-screen pb-24">
    <div class="bg-purple-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Banner Pembuat</h2>
      <p class="text-purple-100 text-sm opacity-90">Buat status WA toko & pengumuman</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      <!-- Controls -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-purple-100 space-y-3">
         <select v-model="template" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500 text-sm font-bold text-slate-700">
            <option value="open">🟢 Toko BUKA</option>
            <option value="closed">🔴 Toko TUTUP</option>
            <option value="promo">🎉 Promo Spesial</option>
            <option value="restock">📦 Restock Barang</option>
         </select>
         
         <input v-model="customText" placeholder="Teks Tambahan (Opsional)..." class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-purple-500 text-sm" />
      </div>

      <!-- Preview Canvas -->
      <div class="relative">
         <div id="banner-preview" class="w-full aspect-square rounded-xl shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden transition-all text-white" :class="bgClass">
            
            <div class="relative z-10 w-full">
               <div class="text-6xl mb-4 animate-bounce">{{ icon }}</div>
               <h3 class="text-3xl font-black uppercase tracking-tight mb-2 leading-none drop-shadow-md">{{ title }}</h3>
               <p class="text-lg font-medium opacity-90 drop-shadow-sm">{{ subtitle }}</p>
               
               <div v-if="customText" class="mt-6 bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30 text-sm font-medium">
                  {{ customText }}
               </div>
            </div>
            
            <!-- Watermark -->
            <div class="absolute bottom-4 text-[10px] opacity-60 font-mono tracking-widest">
               {{ getDate() }}
            </div>
         </div>
      </div>

      <!-- Actions -->
      <button @click="downloadBanner" class="w-full bg-purple-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-purple-200 active:scale-95 transition-all">
         💾 Download Gambar
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import html2canvas from 'html2canvas';

const template = ref('open');
const customText = ref('');

const config = computed(() => {
   switch(template.value) {
      case 'open': return { 
         title: 'KAMI BUKA!', 
         subtitle: 'Silakan mampir & order ya kak', 
         icon: '👋',
         bg: 'bg-gradient-to-br from-green-400 to-emerald-600' 
      };
      case 'closed': return { 
         title: 'MAAF TUTUP', 
         subtitle: 'Kami akan kembali besok', 
         icon: '🔒',
         bg: 'bg-gradient-to-br from-red-500 to-pink-600' 
      };
      case 'promo': return { 
         title: 'PROMO FLASH SALE', 
         subtitle: 'Diskon khusus hari ini saja!', 
         icon: '🔥',
         bg: 'bg-gradient-to-br from-orange-400 to-yellow-500' 
      };
      case 'restock': return { 
         title: 'BARANG READY!', 
         subtitle: 'Stok baru saja mendarat', 
         icon: '📦',
         bg: 'bg-gradient-to-br from-blue-400 to-indigo-600' 
      };
   }
});

const title = computed(() => config.value.title);
const subtitle = computed(() => config.value.subtitle);
const icon = computed(() => config.value.icon);
const bgClass = computed(() => config.value.bg);

const getDate = () => new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

const downloadBanner = async () => {
   const el = document.getElementById('banner-preview');
   try {
      const canvas = await html2canvas(el, { scale: 2 });
      const link = document.createElement('a');
      link.download = `banner-${template.value}.png`;
      link.href = canvas.toDataURL();
      link.click();
   } catch (err) {
      alert('Gagal generate gambar');
   }
};
</script>
