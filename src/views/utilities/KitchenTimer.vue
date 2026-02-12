<template>
  <div class="bg-amber-50 min-h-screen pb-24">
    <div class="bg-amber-500 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Timer Dapur</h2>
      <p class="text-amber-100 text-sm opacity-90">Masak banyak menu tanpa gosong</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
       <!-- Add New Timer -->
       <div class="flex gap-2 mb-4">
          <input v-model="newLabel" placeholder="Nama Masakan..." class="flex-[2] p-3 bg-white rounded-xl shadow-sm border-none text-sm" />
          <input v-model.number="newMinutes" type="number" placeholder="Menit" class="w-20 p-3 bg-white rounded-xl shadow-sm border-none text-sm text-center font-bold" />
          <button @click="addTimer" class="bg-amber-500 text-white px-4 rounded-xl font-bold text-xl shadow-lg active:scale-95">+</button>
       </div>

       <!-- Active Timers -->
       <div class="space-y-3">
          <div v-for="(timer, idx) in timers" :key="timer.id" class="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 relative overflow-hidden transition-all" :class="{ 'ring-2 ring-red-500 bg-red-50': timer.isFinished }">
             
             <!-- Progress Bar -->
             <div class="absolute bottom-0 left-0 h-1 bg-amber-500 transition-all duration-1000" :style="{ width: timer.progress + '%' }"></div>
             
             <div class="flex justify-between items-center relative z-10">
                <div class="flex-1">
                   <div class="font-bold text-slate-700 text-sm mb-1">{{ timer.label }}</div>
                    <div class="font-mono text-3xl font-black tracking-widest text-amber-600">
                      {{ formatTime(timer.remaining) }}
                   </div>
                </div>

                <div class="flex gap-2">
                   <button @click="toggleTimer(idx)" class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md active:scale-95" :class="timer.isRunning ? 'bg-amber-400' : 'bg-green-500'">
                      {{ timer.isRunning ? '⏸' : '▶' }}
                   </button>
                   <button @click="removeTimer(idx)" class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-slate-100 text-slate-400 hover:text-red-500 active:scale-95">
                      ×
                   </button>
                </div>
             </div>

             <div v-if="timer.isFinished" class="absolute inset-0 bg-red-500/90 flex items-center justify-center backdrop-blur-sm z-20 animate-pulse" @click="removeTimer(idx)">
                <div class="text-white text-center">
                   <div class="text-2xl font-black">SELESAI!</div>
                   <div class="text-xs">Ketuk untuk matikan</div>
                </div>
             </div>
          </div>
       </div>

       <div v-if="timers.length === 0" class="text-center py-10 text-slate-400 text-sm">
          Belum ada timer aktif.
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';

const newLabel = ref('');
const newMinutes = ref('');
const timers = ref([]);
let interval = null;

const addTimer = () => {
   if (!newLabel.value || !newMinutes.value) return;
   
   const duration = newMinutes.value * 60;
   timers.value.push({
      id: Date.now(),
      label: newLabel.value,
      duration: duration,
      remaining: duration,
      isRunning: true,
      isFinished: false,
      progress: 100
   });
   
   newLabel.value = '';
   newMinutes.value = '';
   
   startLoop();
};

const removeTimer = (idx) => {
   timers.value.splice(idx, 1);
};

const toggleTimer = (idx) => {
   timers.value[idx].isRunning = !timers.value[idx].isRunning;
};

const startLoop = () => {
   if (interval) return;
   interval = setInterval(() => {
      let activeCount = 0;
      timers.value.forEach(t => {
         if (t.isRunning && t.remaining > 0) {
            t.remaining--;
            t.progress = (t.remaining / t.duration) * 100;
            activeCount++;
         } else if (t.remaining === 0 && !t.isFinished) {
            t.isFinished = true;
            t.isRunning = false;
            playSound();
         }
      });
      // if (activeCount === 0 && timers.value.every(t => !t.isRunning)) {
      //    clearInterval(interval);
      //    interval = null;
      // }
   }, 1000);
};

const playSound = () => {
   // Simple beep logic using AudioContext or default browser beep if possible, 
   // or just rely on visual alert for now in this offline webview context
   // We will rely on Visual Vibration (UI Pulse)
   if ('vibrate' in navigator) {
       navigator.vibrate([200, 100, 200]);
   }
};

const formatTime = (seconds) => {
   const m = Math.floor(seconds / 60);
   const s = seconds % 60;
   return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

onUnmounted(() => {
   if (interval) clearInterval(interval);
});
</script>
