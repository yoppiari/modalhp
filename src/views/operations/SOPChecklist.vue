<template>
  <div class="bg-emerald-50 min-h-screen pb-24">
    <div class="bg-emerald-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">SOP Harian</h2>
      <p class="text-emerald-100 text-sm opacity-90">Ceklis tugas operasional toko</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      <!-- Header Info -->
      <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
         <div>
            <div class="text-xs text-slate-400 font-bold uppercase">Progress Hari Ini</div>
            <div class="font-black text-2xl text-emerald-600">{{ progress }}%</div>
         </div>
         <div class="text-right">
            <div class="text-xs text-slate-400 font-bold uppercase">{{ today }}</div>
            <div class="text-sm font-bold text-slate-600">{{ completedCount }} / {{ tasks.length }} Selesai</div>
         </div>
      </div>

      <!-- Task Groups -->
      <div class="space-y-4">
         
         <!-- Add New Task -->
         <div class="flex gap-2">
            <input v-model="newTask" @keyup.enter="addTask" placeholder="Tambah tugas baru..." class="flex-1 p-3 bg-white rounded-xl shadow-sm border-none focus:ring-2 focus:ring-emerald-500 text-sm" />
            <button @click="addTask" class="bg-emerald-600 text-white px-4 rounded-xl font-bold shadow-lg shadow-emerald-200">+</button>
         </div>

         <!-- List -->
         <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div v-for="(task, idx) in tasks" :key="task.id" 
                 class="p-4 border-b border-slate-100 last:border-0 flex items-center gap-3 transition-all"
                 :class="task.done ? 'bg-emerald-50/50' : ''">
               
               <button @click="toggleTask(idx)" 
                  class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all"
                  :class="task.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'">
                  <span v-if="task.done" class="text-white text-xs font-bold">✓</span>
               </button>
               
               <div class="flex-1">
                  <span :class="task.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'">{{ task.text }}</span>
               </div>
               
               <button @click="removeTask(idx)" class="text-slate-300 hover:text-red-500 px-2 text-lg">×</button>
            </div>
            
            <div v-if="tasks.length === 0" class="p-8 text-center text-slate-400 text-sm">
               Belum ada tugas SOP. Tambahkan dulu.
            </div>
         </div>

         <div class="text-center">
             <button @click="resetDay" class="text-xs text-slate-400 underline hover:text-red-500">Reset Checklist (Mulai Hari Baru)</button>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const newTask = ref('');
const tasks = ref([]);
const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short' });

// Load from LocalStorage
onMounted(() => {
   const saved = localStorage.getItem('sop_tasks');
   if (saved) {
      tasks.value = JSON.parse(saved);
      checkDailyReset();
   } else {
      // Default Tasks
      tasks.value = [
         { id: 1, text: 'Buka toko & nyalakan lampu', done: false },
         { id: 2, text: 'Cek stok bahan baku', done: false },
         { id: 3, text: 'Bersihkan area kasir', done: false },
         { id: 4, text: 'Siapkan uang kembalian', done: false },
         { id: 5, text: 'Hitung omzet & tutup kasir', done: false },
      ];
   }
});

watch(tasks, (newVal) => {
   localStorage.setItem('sop_tasks', JSON.stringify(newVal));
}, { deep: true });

const checkDailyReset = () => {
   const lastDate = localStorage.getItem('sop_last_date');
   const currentDate = new Date().toDateString();
   
   if (lastDate !== currentDate) {
      // Reset status only, keep list
      tasks.value.forEach(t => t.done = false);
      localStorage.setItem('sop_last_date', currentDate);
   }
};

const addTask = () => {
   if (!newTask.value) return;
   tasks.value.push({
      id: Date.now(),
      text: newTask.value,
      done: false
   });
   newTask.value = '';
};

const removeTask = (idx) => {
   tasks.value.splice(idx, 1);
};

const toggleTask = (idx) => {
   tasks.value[idx].done = !tasks.value[idx].done;
};

const resetDay = () => {
   if(confirm('Reset semua checklist?')) {
       tasks.value.forEach(t => t.done = false);
       localStorage.setItem('sop_last_date', new Date().toDateString());
   }
};

const completedCount = computed(() => tasks.value.filter(t => t.done).length);
const progress = computed(() => {
   if (tasks.value.length === 0) return 0;
   return Math.round((completedCount.value / tasks.value.length) * 100);
});
</script>
