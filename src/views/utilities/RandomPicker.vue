<template>
  <div class="bg-violet-50 min-h-screen pb-24">
    <div class="bg-violet-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Acak Pemenang</h2>
      <p class="text-violet-100 text-sm opacity-90">Undian doorprize dari pelanggan toko</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6 text-center">
       
       <!-- Stage -->
       <div class="bg-white rounded-3xl p-8 shadow-xl border border-violet-100 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
          
          <div v-if="isSpinning" class="animate-bounce text-6xl mb-4">🎰</div>
          
          <div v-if="winner" class="scale-up">
             <div class="text-sm text-slate-400 font-bold uppercase mb-2">Selamat Kepada</div>
             <div class="text-3xl font-black text-violet-600 mb-1">{{ winner.name }}</div>
             <div class="text-lg text-violet-400">{{ winner.phone }}</div>
          </div>

          <div v-else-if="!isSpinning" class="text-slate-400">
             <div class="text-4xl mb-4">🎁</div>
             <p>Siap untuk mengundi?</p>
             <p class="text-xs mt-2">{{ customers.length }} Peserta Terdaftar</p>
          </div>
          
          <!-- Confetti Decor (CSS only simple dots) -->
          <div v-if="winner" class="absolute inset-0 pointer-events-none overflow-hidden">
             <!-- Simplified logic: just using generic celebration layout -->
          </div>
       </div>

       <!-- Controls -->
       <button @click="spin" :disabled="isSpinning || customers.length < 2" 
               class="w-full bg-violet-600 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-violet-200 active:scale-95 transition-all">
          {{ isSpinning ? 'Mengacak...' : 'Putar Undian! 🎲' }}
       </button>
       
       <p v-if="customers.length < 2" class="text-xs text-red-400">
          Minimal butuh 2 data pelanggan di database.
       </p>
       
       <!-- Recent Winners -->
       <div class="text-left mt-8">
          <h3 class="font-bold text-slate-700 mb-3 ml-2">Pemenang Sebelumnya</h3>
          <div class="space-y-2">
             <div v-for="(w, i) in history" :key="i" class="bg-white px-4 py-2 rounded-lg text-sm text-slate-600 flex justify-between">
                <span>{{ w.name }}</span>
                <span class="text-slate-400 text-xs">{{ new Date(w.date).toLocaleTimeString() }}</span>
             </div>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const customers = useObservable(liveQuery(() => db.customers.toArray())) || ref([]);
const isSpinning = ref(false);
const winner = ref(null);
const history = ref([]);

const spin = () => {
   if (customers.value.length < 2) return;
   
   isSpinning.value = true;
   winner.value = null;
   
   // Fake spin effect
   setTimeout(() => {
      const idx = Math.floor(Math.random() * customers.value.length);
      const selected = customers.value[idx];
      
      winner.value = selected;
      isSpinning.value = false;
      
      history.value.unshift({ 
         name: selected.name, 
         date: Date.now() 
      });
      
      // Vibrate
      if ('vibrate' in navigator) navigator.vibrate([100, 50, 100]);
      
   }, 2000);
};
</script>

<style scoped>
.scale-up {
   animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes scaleUp {
   from { transform: scale(0.5); opacity: 0; }
   to { transform: scale(1); opacity: 1; }
}
</style>
