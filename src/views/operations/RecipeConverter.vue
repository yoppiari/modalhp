<template>
  <div class="bg-yellow-50 min-h-screen pb-24">
    <div class="bg-yellow-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Resep Scaler</h2>
      <p class="text-yellow-100 text-sm opacity-90">Ubah porsi resep otomatis</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      <!-- Scale Control -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-yellow-100 flex items-center gap-4">
         <div class="flex-1">
            <label class="text-xs font-bold text-slate-500 uppercase block mb-1">Porsi Awal</label>
            <input v-model.number="basePortion" type="number" class="w-full p-2 bg-slate-50 rounded-lg font-bold text-center" />
         </div>
         <div class="text-slate-300 text-2xl">→</div>
         <div class="flex-1">
            <label class="text-xs font-bold text-slate-500 uppercase block mb-1">Porsi Baru</label>
            <input v-model.number="targetPortion" type="number" class="w-full p-2 bg-slate-50 rounded-lg font-bold text-center text-yellow-600 border border-yellow-200" />
         </div>
      </div>
      
      <div class="text-center text-xs text-slate-400 font-bold">
         Multiplier: {{ multiplier.toFixed(2) }}x
      </div>

      <!-- Ingredients -->
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-yellow-100">
         <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-slate-700">Bahan-bahan</h3>
            <button @click="addIng" class="text-xs bg-yellow-50 text-yellow-600 font-bold px-3 py-1 rounded-full">+ Item</button>
         </div>

         <div class="space-y-3">
            <div v-for="(ing, idx) in ingredients" :key="idx" class="flex gap-2 items-center">
               <input v-model="ing.name" placeholder="Nama Bahan" class="flex-[2] p-2 bg-slate-50 rounded-lg text-sm border-none shadow-sm" />
               <input v-model.number="ing.qty" type="number" placeholder="Qty" class="flex-1 p-2 bg-slate-50 rounded-lg text-center font-bold text-sm border-none shadow-sm" />
               <input v-model="ing.unit" placeholder="Unit" class="w-16 p-2 bg-slate-50 rounded-lg text-center text-xs text-slate-500 border-none shadow-sm" />
               <button @click="removeIng(idx)" class="text-slate-300 hover:text-red-500 px-1">×</button>
            </div>
         </div>
      </div>

      <!-- Result -->
      <div class="bg-yellow-600 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
         <div class="relative z-10">
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
               📝 Resep Baru ({{ targetPortion }} Porsi)
            </h3>
            <div class="space-y-2 text-sm">
               <div v-for="(ing, idx) in ingredients" :key="idx" class="flex justify-between border-b border-yellow-500/50 pb-1">
                  <span>{{ ing.name || 'Bahan...' }}</span>
                  <span class="font-bold">{{ formatNumber(ing.qty * multiplier) }} {{ ing.unit }}</span>
               </div>
            </div>
         </div>
         <!-- Decor -->
         <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const basePortion = ref(1);
const targetPortion = ref(10);
const ingredients = ref([
   { name: 'Tepung Terigu', qty: 250, unit: 'gr' },
   { name: 'Telur', qty: 2, unit: 'btr' },
   { name: 'Gula Pasir', qty: 100, unit: 'gr' }
]);

const multiplier = computed(() => targetPortion.value / basePortion.value);

const addIng = () => ingredients.value.push({ name: '', qty: 0, unit: '' });
const removeIng = (i) => ingredients.value.splice(i, 1);

const formatNumber = (n) => {
   if (Number.isInteger(n)) return n;
   return n.toFixed(1).replace('.0', '');
};
</script>
