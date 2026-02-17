<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Header -->
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6">
       <h2 class="text-2xl font-bold">Laporan Harian</h2>
       <p class="text-indigo-100 text-sm opacity-90">Pantau performa jualanmu hari ini</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      
      <!-- Date Picker -->
      <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
         <button @click="changeDate(-1)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600 active:bg-slate-200">‹</button>
         <div class="text-center relative">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tanggal Laporan</div>
            <div class="font-bold text-slate-700 flex items-center justify-center gap-1">
               {{ formattedDate }}
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <!-- Hidden Date Input Overlay -->
            <input 
               type="date" 
               v-model="dateInputValue"
               class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
         </div>
         <button @click="changeDate(1)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600 active:bg-slate-200">›</button>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="text-xs text-slate-500 mb-1">Total Omzet</div>
            <div class="text-xl font-bold text-indigo-600">Rp {{ formatK(summary.total) }}</div>
         </div>
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="text-xs text-slate-500 mb-1">Transaksi</div>
            <div class="text-xl font-bold text-slate-700">{{ summary.count }}x</div>
         </div>
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 col-span-2">
            <div class="flex justify-between items-center">
               <div>
                 <div class="text-xs text-slate-500 mb-1">Rata-rata Keranjang</div>
                 <div class="text-lg font-bold text-slate-700">Rp {{ formatNumber(summary.avg) }}</div>
               </div>
               <div class="bg-indigo-50 p-2 rounded-lg">
                  📈
               </div>
            </div>
         </div>
      </div>

      <!-- Transaction List -->
      <div>
         <h3 class="font-bold text-slate-700 mb-3 ml-1">Riwayat Transaksi</h3>
         <div class="space-y-3">
            <div v-for="t in transactions" :key="t.id" class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
               <div>
                  <div class="font-bold text-slate-700 text-sm">{{ t.invoice_number }}</div>
                  <div class="text-[10px] text-slate-400">{{ formatTime(t.date) }} • {{ t.payment_method }}</div>
               </div>
               <div class="text-right">
                  <div class="font-bold text-indigo-600 text-sm">Rp {{ formatNumber(t.total_amount) }}</div>
               </div>
            </div>
            
            <div v-if="transactions.length === 0" class="text-center py-8 text-slate-400 text-sm">
               Belum ada transaksi hari ini.
            </div>
         </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const selectedDate = ref(new Date());

const startOfDay = computed(() => {
   const d = new Date(selectedDate.value);
   d.setHours(0,0,0,0);
   return d.getTime();
});

const endOfDay = computed(() => {
   const d = new Date(selectedDate.value);
   d.setHours(23,59,59,999);
   return d.getTime();
});

// Query Transactions for selected date range
const transactions = useObservable(
  liveQuery(() => 
     db.transactions
       .where('date')
       .between(startOfDay.value, endOfDay.value, true, true)
       .reverse()
       .toArray()
  )
) || ref([]);

const summary = computed(() => {
   const list = transactions.value || [];
   const total = list.reduce((sum, t) => sum + t.total_amount, 0);
   const count = list.length;
   return {
      total,
      count,
      avg: count ? total / count : 0
   };
});

const changeDate = (days) => {
   const d = new Date(selectedDate.value);
   d.setDate(d.getDate() + days);
   selectedDate.value = d;
};

const dateInputValue = computed({
   get: () => {
      const d = new Date(selectedDate.value);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   },
   set: (val) => {
      if (val) {
         selectedDate.value = new Date(val);
      }
   }
});

const formattedDate = computed(() => {
   return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(selectedDate.value);
});

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
const formatK = (n) => {
   if (n >= 1000000) return (n / 1000000).toFixed(1) + 'jt';
   if (n >= 1000) return (n / 1000).toFixed(0) + 'rb';
   return n;
};
const formatTime = (ts) => new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
</script>
