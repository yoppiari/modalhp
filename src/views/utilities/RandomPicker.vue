<template>
  <div class="bg-violet-50 min-h-screen pb-24">
    <div class="bg-violet-600 text-white px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Acak Pemenang</h2>
      <p class="text-violet-100 text-sm opacity-90">Undian doorprize dari pelanggan toko</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6 text-center pt-6">

       <!-- Source Toggle -->
       <div class="bg-white p-2 rounded-2xl shadow-sm border border-violet-100 flex gap-2">
          <button @click="sourceMode = 'db'" :class="sourceMode === 'db' ? 'bg-violet-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50'" class="flex-1 py-2 rounded-xl font-bold text-sm transition-all">
             Data Pelanggan
          </button>
          <button @click="sourceMode = 'manual'" :class="sourceMode === 'manual' ? 'bg-violet-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-50'" class="flex-1 py-2 rounded-xl font-bold text-sm transition-all">
             Input Manual
          </button>
       </div>

       <!-- Manual Input Form -->
       <div v-if="sourceMode === 'manual'" class="bg-white p-4 rounded-2xl shadow-sm border border-violet-100 text-left">
          <label class="text-xs font-bold text-slate-500 uppercase mb-2 block">Daftar Nama (Pisahkan dengan koma/baris baru)</label>
          <textarea v-model="manualInput" rows="4" placeholder="Cth: Budi, Siti, Andi&#10;Atau 1 nama per baris..." class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-violet-500"></textarea>
          <div class="text-[10px] text-slate-400 mt-2 text-right">{{ manualParticipants.length }} nama terdeteksi</div>
       </div>
       
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
             <p class="text-xs mt-2">{{ activeParticipants.length }} Peserta {{ sourceMode === 'db' ? 'Terdaftar' : 'Manual' }}</p>
          </div>
          
          <!-- Confetti Decor (CSS only simple dots) -->
          <div v-if="winner" class="absolute inset-0 pointer-events-none overflow-hidden">
             <!-- Simplified logic: just using generic celebration layout -->
          </div>
       </div>

       <!-- Controls -->
       <button @click="spin" :disabled="isSpinning || activeParticipants.length < 2" 
               class="w-full bg-violet-600 disabled:bg-slate-300 text-white py-4 rounded-2xl font-bold text-xl shadow-lg shadow-violet-200 active:scale-95 transition-all">
          {{ isSpinning ? 'Mengacak...' : 'Putar Undian! 🎲' }}
       </button>
       
       <p v-if="activeParticipants.length < 2" class="text-xs text-red-400">
          Minimal butuh 2 nama peserta untuk diacak.
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
import { ref, computed } from 'vue';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const customers = useObservable(liveQuery(() => db.customers.toArray())) || ref([]);
const sourceMode = ref('db'); // 'db' or 'manual'
const manualInput = ref('');

const manualParticipants = computed(() => {
   if (!manualInput.value.trim()) return [];
   // Split by comma or newline, trim spaces, remove empty
   return manualInput.value
      .split(/[\n,]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(name => ({ name, phone: '-' })); // Normalize to match DB structure
});

const activeParticipants = computed(() => {
   return sourceMode.value === 'db' ? customers.value : manualParticipants.value;
});

const isSpinning = ref(false);
const winner = ref(null);
const history = ref([]);

const spin = () => {
   const participants = activeParticipants.value;
   if (participants.length < 2) return;
   
   isSpinning.value = true;
   winner.value = null;
   
   // Fake spin effect
   setTimeout(() => {
      const idx = Math.floor(Math.random() * participants.length);
      const selected = participants[idx];
      
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
