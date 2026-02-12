<template>
  <div class="bg-gray-50 min-h-screen pb-24">
    <div class="bg-gray-700 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Catatan Toko</h2>
      <p class="text-gray-300 text-sm opacity-90">Ide, belanjaan, dan hal penting lainnya</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
      
      <!-- Input -->
      <div class="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex gap-2">
         <input v-model="newTask" @keyup.enter="add" placeholder="Tulis catatan..." class="flex-1 p-2 bg-transparent border-none focus:ring-0 text-sm" />
         <button @click="add" class="bg-gray-700 text-white px-4 rounded-lg font-bold text-sm">Simpan</button>
      </div>

      <!-- List -->
      <div class="space-y-2">
         <div v-for="(item, idx) in items" :key="item.id" class="bg-white p-4 rounded-xl shadow-sm border-l-4 border-gray-400 flex justify-between items-start group">
             <div class="flex-1 text-sm text-slate-700 whitespace-pre-wrap">{{ item.text }}</div>
             <button @click="remove(idx)" class="text-slate-300 hover:text-red-500 pl-3">🗑️</button>
         </div>
         
          <div v-if="items.length === 0" class="text-center py-12 opacity-50">
             <div class="text-4xl mb-2">📝</div>
             <div class="text-sm">Belum ada catatan.</div>
         </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const newTask = ref('');
const items = ref([]);

onMounted(() => {
   const saved = localStorage.getItem('simple_todo');
   if (saved) items.value = JSON.parse(saved);
});

watch(items, (val) => {
   localStorage.setItem('simple_todo', JSON.stringify(val));
}, { deep: true });

const add = () => {
   if(!newTask.value) return;
   items.value.unshift({ id: Date.now(), text: newTask.value });
   newTask.value = '';
};

const remove = (i) => items.value.splice(i, 1);
</script>
