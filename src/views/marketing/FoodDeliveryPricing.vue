<template>
  <div class="bg-green-50 min-h-screen pb-24">
    <div class="bg-green-600 text-white px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Kalkulator Ojol</h2>
      <p class="text-green-100 text-sm opacity-90">Hitung harga jual agar tidak rugi potong komisi</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6 pt-6">
       <!-- Input Section -->
       <div class="bg-white p-5 rounded-2xl shadow-sm border border-green-100 space-y-4">
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Harga Modal / Normal</label>
            <div class="relative">
               <span class="absolute left-3 top-3 text-slate-400 font-bold">Rp</span>
               <input v-model.number="basePrice" type="number" class="w-full pl-10 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-green-500 text-lg font-bold text-slate-700" placeholder="0" />
            </div>
          </div>
          
          <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Platform & Komisi</label>
            <div class="grid grid-cols-3 gap-2">
               <button @click="selectedPlatform = 'gofood'" :class="selectedPlatform === 'gofood' ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600' : 'bg-slate-100 text-slate-600'" class="py-2 rounded-lg font-bold text-sm transition-all">
                  GoFood
                  <span class="block text-[10px] font-normal opacity-80">20%</span>
               </button>
               <button @click="selectedPlatform = 'grab'" :class="selectedPlatform === 'grab' ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600' : 'bg-slate-100 text-slate-600'" class="py-2 rounded-lg font-bold text-sm transition-all">
                  Grab
                  <span class="block text-[10px] font-normal opacity-80">20%</span>
               </button>
               <button @click="selectedPlatform = 'shopee'" :class="selectedPlatform === 'shopee' ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600' : 'bg-slate-100 text-slate-600'" class="py-2 rounded-lg font-bold text-sm transition-all">
                  Shopee
                  <span class="block text-[10px] font-normal opacity-80">15%</span>
               </button>
            </div>
          </div>

          <div>
             <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Margin Keuntungan Tambahan (Opsional)</label>
             <div class="flex items-center gap-3">
                <input type="range" v-model.number="profitMargin" min="0" max="100" step="5" class="flex-1 accent-green-600" />
                <span class="font-bold text-green-700 w-12 text-right">{{ profitMargin }}%</span>
             </div>
          </div>
       </div>

       <!-- Result Section -->
       <div class="bg-white p-6 rounded-2xl shadow-lg border border-green-200 relative overflow-hidden">
          <div class="absolute -right-6 -top-6 bg-green-50 w-24 h-24 rounded-full"></div>
          
          <div class="relative z-10 text-center space-y-4">
             <div>
                <p class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Harga Jual di Aplikasi</p>
                <div class="text-4xl font-black text-green-600 tracking-tight">
                   Rp {{ formatNumber(suggestedPrice) }}
                </div>
                 <p class="text-[10px] text-slate-400 mt-1">*Sudah termasuk potongan {{ commission }}% + untung {{ profitMargin }}%</p>
             </div>

             <div class="border-t border-dashed border-slate-200 pt-4 flex justify-between text-xs text-slate-500">
                <span>Diterima Bersih:</span>
                <span class="font-bold text-slate-700">Rp {{ formatNumber(netReceived) }}</span>
             </div>
             
             <div class="bg-yellow-50 p-2 rounded-lg text-[10px] text-yellow-700 text-left leading-relaxed border border-yellow-100">
                💡 <b>Tips:</b> Jika hasilnya pecahan aneh (misal Rp 15.345), bulatkan ke atas jadi Rp 15.500 atau Rp 16.000 agar terlihat rapi.
             </div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const basePrice = ref(20000);
const selectedPlatform = ref('gofood');
const profitMargin = ref(0);

const commissions = {
  gofood: 20,
  grab: 20,
  shopee: 15
};

const commission = computed(() => commissions[selectedPlatform.value]);

// Rumus: Harga Jual = (Modal + (Modal * Margin%)) / (1 - Komisi%)
const suggestedPrice = computed(() => {
   const costWithProfit = basePrice.value + (basePrice.value * (profitMargin.value / 100));
   const price = costWithProfit / (1 - (commission.value / 100));
   return Math.ceil(price / 100) * 100; // Pembulatan ke 100 terdekat
});

const netReceived = computed(() => {
   return suggestedPrice.value * (1 - (commission.value / 100));
});

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
</script>
