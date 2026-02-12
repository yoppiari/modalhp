<template>
  <div class="bg-fuchsia-50 min-h-screen pb-24">
    <div class="bg-fuchsia-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Kalkulator Kain</h2>
      <p class="text-fuchsia-100 text-sm opacity-90">Estimasi kebutuhan bahan baju</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-5">
       
       <!-- Presets -->
       <div class="grid grid-cols-2 gap-3">
          <button v-for="type in types" :key="type.label" @click="selectType(type)"
             class="bg-white p-3 rounded-xl shadow-sm border border-fuchsia-100 text-left hover:border-fuchsia-300 transition-all active:scale-95">
             <div class="text-xl mb-1">{{ type.icon }}</div>
             <div class="font-bold text-slate-700 text-sm">{{ type.label }}</div>
          </button>
       </div>

       <!-- Calculator -->
       <div class="bg-white p-5 rounded-2xl shadow-sm border border-fuchsia-100 space-y-4">
          <h3 class="font-bold text-slate-700">Hitung Custom</h3>
          
          <div class="grid grid-cols-2 gap-3">
             <div>
                <label class="text-xs font-bold text-slate-500 uppercase">Panjang Baju (cm)</label>
                <input v-model.number="length" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-center" />
             </div>
             <div>
                <label class="text-xs font-bold text-slate-500 uppercase">Panjang Lengan (cm)</label>
                <input v-model.number="sleeve" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-center" />
             </div>
          </div>
          
          <div class="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
             <label class="text-xs font-bold text-slate-500 uppercase block mb-2">Lebar Kain (Bidang)</label>
             <div class="flex gap-2">
                <button @click="width = 115" :class="width === 115 ? 'bg-fuchsia-600 text-white' : 'bg-white text-slate-600'" class="flex-1 py-1 rounded-lg text-xs font-bold border">1.15m (Kecil)</button>
                <button @click="width = 150" :class="width === 150 ? 'bg-fuchsia-600 text-white' : 'bg-white text-slate-600'" class="flex-1 py-1 rounded-lg text-xs font-bold border">1.50m (Besar)</button>
             </div>
          </div>
       </div>

       <!-- Result -->
       <div class="bg-fuchsia-600 text-white p-6 rounded-2xl shadow-lg text-center">
          <p class="text-fuchsia-200 text-xs uppercase font-bold mb-1">Estimasi Kebutuhan Kain</p>
          <div class="text-4xl font-black tracking-tight flex items-end justify-center gap-1">
             <span>{{ result }}</span>
             <span class="text-lg font-bold opacity-80 mb-1">Meter</span>
          </div>
          <p class="text-[10px] mt-2 opacity-70">*Sudah termasuk toleransi kampuh jahitan</p>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const length = ref(70);
const sleeve = ref(25);
const width = ref(150);

const types = [
   { label: 'Kemeja Pendek', icon: '👕', l: 75, s: 25 },
   { label: 'Kemeja Panjang', icon: '👔', l: 75, s: 60 },
   { label: 'Gamis / Dress', icon: '👗', l: 135, s: 58 },
   { label: 'Celana Panjang', icon: '👖', l: 100, s: 0 },
];

const selectType = (t) => {
   length.value = t.l;
   sleeve.value = t.s;
};

const result = computed(() => {
   // Simple formula approximation
   // Total Length = (Body Length + Sleeve Length + Hem Allowance)
   // If Width 1.5m (Bidang Besar) -> usually 1x length is enough for S-M size, but let's be safe
   // Use standard tailor formula approximation
   
   let totalCm = length.value + sleeve.value + 10; // +10cm for allowance
   
   if (width.value === 115) {
      // Bidang Kecil needs 2x length for body usually if size > M
      totalCm = totalCm * 1.5; 
   }
   
   // Round up to nearest 0.1m
   return (Math.ceil(totalCm / 10) / 100).toFixed(2);
});
</script>
