<template>
  <div class="bg-pink-50 min-h-screen pb-24">
    <div class="bg-pink-600 text-white px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Cek Diskon</h2>
      <p class="text-pink-100 text-sm opacity-90">Hitung promo biar gak boncos</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6 pt-6">
       <!-- Scenario 1: % Discount -->
       <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div class="absolute -right-4 -top-4 w-16 h-16 bg-pink-100 rounded-full"></div>
          <h3 class="font-bold text-slate-700 mb-4 relative z-10">Skenario A: Diskon Persen</h3>
          
          <div class="grid grid-cols-2 gap-3 mb-2">
             <div>
                <label class="text-[10px] uppercase font-bold text-slate-400">Harga Normal</label>
                <input v-model.number="price" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm" />
             </div>
             <div>
                <label class="text-[10px] uppercase font-bold text-slate-400">HPP (Modal)</label>
                <input v-model.number="cost" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm" />
             </div>
          </div>
           <div>
                <label class="text-[10px] uppercase font-bold text-slate-400">Diskon (%)</label>
                <input v-model.number="discPercent" type="range" class="w-full accent-pink-600" min="0" max="90" step="5" />
                <div class="text-right font-bold text-pink-600 text-sm">{{ discPercent }}%</div>
             </div>
             
          <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-sm">
             <div class="flex justify-between">
                <span class="text-slate-500">Harga Promo:</span>
                <span class="font-bold">Rp {{ formatNumber(priceAfterDisc) }}</span>
             </div>
             <div class="flex justify-between" :class="profitDisc < 0 ? 'text-red-500' : 'text-green-600'">
                <span>Profit:</span>
                <span class="font-bold">Rp {{ formatNumber(profitDisc) }}</span>
             </div>
          </div>
       </div>

       <!-- Scenario 2: Buy X Get Y -->
       <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
           <div class="absolute -right-4 -top-4 w-16 h-16 bg-blue-100 rounded-full"></div>
          <h3 class="font-bold text-slate-700 mb-4 relative z-10">Skenario B: Buy X Get Y</h3>
          
          <div class="flex items-center gap-2 mb-4">
             <span class="text-sm text-slate-600">Beli</span>
             <input v-model.number="buyQty" type="number" class="w-12 p-2 bg-slate-50 rounded text-center text-sm font-bold" />
             <span class="text-sm text-slate-600">Gratis</span>
             <input v-model.number="getQty" type="number" class="w-12 p-2 bg-slate-50 rounded text-center text-sm font-bold" />
          </div>

          <div class="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-sm">
             <div class="flex justify-between">
                <span class="text-slate-500">Total Barang Keluar:</span>
                <span class="font-bold">{{ buyQty + getQty }} pcs</span>
             </div>
            <div class="flex justify-between">
                <span class="text-slate-500">Total Omzet:</span>
                <span class="font-bold">Rp {{ formatNumber(price * buyQty) }}</span>
             </div>
             <div class="flex justify-between" :class="profitBxg < 0 ? 'text-red-500' : 'text-green-600'">
                <span>Total Profit:</span>
                <span class="font-bold">Rp {{ formatNumber(profitBxg) }}</span>
             </div>
             <div class="flex justify-between text-xs text-slate-400 pt-2 border-t border-dashed border-slate-200 mt-2">
                <span>Setara Diskon:</span>
                <span>{{ equivalentDisc.toFixed(1) }}%</span>
             </div>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const price = ref(50000);
const cost = ref(30000);

const discPercent = ref(20);
const priceAfterDisc = computed(() => price.value * (1 - discPercent.value/100));
const profitDisc = computed(() => priceAfterDisc.value - cost.value);

const buyQty = ref(2);
const getQty = ref(1);

const profitBxg = computed(() => {
   const revenue = price.value * buyQty.value;
   const totalCost = cost.value * (buyQty.value + getQty.value);
   return revenue - totalCost;
});

const equivalentDisc = computed(() => {
   const totalItems = buyQty.value + getQty.value;
   const normalRevenue = price.value * totalItems;
   const actualRevenue = price.value * buyQty.value;
   return ((normalRevenue - actualRevenue) / normalRevenue) * 100;
});

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
</script>
