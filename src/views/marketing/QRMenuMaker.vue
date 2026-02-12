<template>
  <div class="bg-indigo-50 min-h-screen pb-24">
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">QR Menu Maker</h2>
      <p class="text-indigo-100 text-sm opacity-90">Bikin buku menu digital otomatis</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
       <!-- Preview Section -->
       <div class="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center" id="menu-area">
          <div class="mb-4">
             <canvas ref="qrCanvas" class="mx-auto rounded-xl border border-slate-100 shadow-sm"></canvas>
          </div>
          <h3 class="font-bold text-lg text-slate-800">Scan untuk Lihat Menu</h3>
          <p class="text-xs text-slate-500 mb-6">Daftar harga terbaru Warung Kami</p>

          <!-- List Product Preview -->
          <div class="text-left space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
             <div v-for="p in products" :key="p.id" class="flex justify-between items-center text-sm border-b border-dashed border-slate-100 pb-2">
                <div>
                   <div class="font-bold text-slate-700">{{ p.name }}</div>
                   <div class="text-[10px] text-slate-400">{{ p.category }}</div>
                </div>
                <div class="font-bold text-indigo-600">Rp {{ formatNumber(p.price) }}</div>
             </div>
          </div>
       </div>

       <!-- Actions -->
       <div class="grid grid-cols-2 gap-3">
          <button @click="generateQR" class="col-span-2 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-all">
             🔄 Refresh Data Menu
          </button>
          
          <div class="col-span-2 text-center text-xs text-slate-400 leading-relaxed bg-white p-3 rounded-xl border border-dashed border-slate-200">
             ℹ️ <b>Info:</b> Fitur ini akan membuat QR Code yang berisi daftar text menu Anda. Pelanggan tidak perlu internet untuk melihatnya (fitur Text-QR).
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../../db';
import QRCode from 'qrcode';

const products = ref([]);
const qrCanvas = ref(null);

onMounted(async () => {
   await loadProducts();
   await generateQR();
});

const loadProducts = async () => {
   products.value = await db.products.where('is_active').equals(1).toArray();
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);

const generateQR = async () => {
   await loadProducts(); // Refresh data first
   
   // Generate Text-Based Menu for QR (Since we are offline/local first)
   // In a real app, this would be a URL to a publicized page.
   // For now, we simulate a "Text Menu" that appears when scanned.
   
   let menuText = "📋 MENU WARUNG KAMI\n\n";
   let currentCat = '';
   
   // Sort by category first
   const sorted = [...products.value].sort((a,b) => a.category.localeCompare(b.category));

   sorted.forEach(p => {
      if (p.category !== currentCat) {
         menuText += `\n[ ${p.category} ]\n`;
         currentCat = p.category;
      }
      menuText += `${p.name} ... Rp ${formatNumber(p.price)}\n`;
   });

   menuText += `\nTerima Kasih!`;

   try {
      await QRCode.toCanvas(qrCanvas.value, menuText, {
         width: 200,
         margin: 2,
         color: {
            dark: '#4f46e5',
            light: '#ffffff'
         }
      });
   } catch (err) {
      console.error(err);
   }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
