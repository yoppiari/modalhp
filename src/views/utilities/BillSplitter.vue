<template>
  <div class="bg-indigo-50 min-h-screen pb-24">
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Patungan / Split Bill</h2>
      <p class="text-indigo-100 text-sm opacity-90">Hitung bayaran makan bareng</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-5">
      
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-indigo-100 space-y-4">
         <div>
            <label class="text-xs font-bold text-slate-500 uppercase">Subtotal (Makanan+Minum)</label>
            <div class="relative">
               <span class="absolute left-3 top-2.5 text-slate-400">Rp</span>
               <input v-model.number="subtotal" type="number" class="w-full pl-10 p-2 bg-slate-50 rounded-lg font-bold text-lg" />
            </div>
         </div>
         
         <div class="grid grid-cols-2 gap-3">
             <div>
               <label class="text-xs font-bold text-slate-500 uppercase">Pajak (%)</label>
               <input v-model.number="tax" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-center" />
            </div>
            <div>
               <label class="text-xs font-bold text-slate-500 uppercase">Layanan (%)</label>
               <input v-model.number="service" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-center" />
            </div>
         </div>

         <div>
             <label class="text-xs font-bold text-slate-500 uppercase">Jumlah Orang</label>
             <div class="flex items-center gap-2">
                <button @click="pax--" class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg font-bold">-</button>
                <input v-model.number="pax" type="number" class="flex-1 p-2 bg-slate-50 rounded-lg text-center font-bold text-lg" />
                <button @click="pax++" class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg font-bold">+</button>
             </div>
         </div>
      </div>

      <!-- Result -->
      <div class="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg text-center">
         <p class="text-indigo-200 text-xs uppercase font-bold mb-1">Per Orang Bayar</p>
         <div class="text-4xl font-black tracking-tight mb-4">Rp {{ formatNumber(perPerson) }}</div>
         
         <div class="grid grid-cols-2 gap-4 text-xs opacity-80 pt-4 border-t border-indigo-500">
            <div class="text-left">
               <div>Total Tagihan:</div>
               <div class="font-bold text-base">Rp {{ formatNumber(grandTotal) }}</div>
            </div>
            <div class="text-right">
               <div>Total Tax/Svc:</div>
               <div class="font-bold text-base">Rp {{ formatNumber(taxAmount) }}</div>
            </div>
         </div>
      </div>

      <button @click="shareWA" class="w-full bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-all">
         Share ke Grup WA
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { WHATSAPP_API_URL } from '@/utils/constants';

const subtotal = ref(100000);
const tax = ref(10);
const service = ref(5);
const pax = ref(4);

const taxAmount = computed(() => {
   const t = subtotal.value * (tax.value / 100);
   const s = subtotal.value * (service.value / 100);
   return t + s;
});

const grandTotal = computed(() => subtotal.value + taxAmount.value);
const perPerson = computed(() => pax.value > 0 ? Math.ceil(grandTotal.value / pax.value) : 0);

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);

const shareWA = () => {
   const text = `Halo guys, total makan hari ini Rp ${formatNumber(grandTotal.value)}. Per orang patungan *Rp ${formatNumber(perPerson.value)}* ya. Thanks!`;
   window.open(`${WHATSAPP_API_URL}?text=${encodeURIComponent(text)}`, '_blank');
};
</script>
