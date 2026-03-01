<template>
  <div class="bg-cyan-50 min-h-screen pb-24">
    <div class="bg-cyan-600 text-white px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Simulasi Kredit</h2>
      <p class="text-cyan-100 text-sm opacity-90">Hitung cicilan barang elektronik/kendaraan</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-5 pt-6">
      
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-cyan-100 space-y-3">
         <div>
            <label class="text-xs font-bold text-slate-500 uppercase">Harga Barang</label>
            <div class="relative">
               <span class="absolute left-3 top-2.5 text-slate-400">Rp</span>
               <input v-model.number="price" type="number" class="w-full pl-10 p-2 bg-slate-50 rounded-lg font-bold" />
            </div>
         </div>
         
         <div>
            <label class="text-xs font-bold text-slate-500 uppercase">DP (Uang Muka)</label>
            <div class="relative">
               <span class="absolute left-3 top-2.5 text-slate-400">Rp</span>
               <input v-model.number="dp" type="number" class="w-full pl-10 p-2 bg-slate-50 rounded-lg font-bold" />
            </div>
         </div>

         <div class="grid grid-cols-2 gap-3">
            <div>
               <label class="text-xs font-bold text-slate-500 uppercase">Bunga / Thn (%)</label>
               <input v-model.number="rate" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-center" />
            </div>
            <div>
               <label class="text-xs font-bold text-slate-500 uppercase">Tenor (Bulan)</label>
               <select v-model="tenor" class="w-full p-2 bg-slate-50 rounded-lg">
                  <option :value="3">3 Bulan</option>
                  <option :value="6">6 Bulan</option>
                  <option :value="12">12 Bulan</option>
                  <option :value="24">24 Bulan</option>
                  <option :value="36">36 Bulan</option>
               </select>
            </div>
         </div>
      </div>

       <!-- Result -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-cyan-500">
         <p class="text-slate-400 text-xs uppercase font-bold mb-1">Angsuran Per Bulan</p>
         <div class="text-3xl font-black tracking-tight text-cyan-600 mb-2">Rp {{ formatNumber(monthlyPayment) }}</div>
         
         <div class="text-[10px] text-slate-400 space-y-1">
             <div class="flex justify-between">
                <span>Pokok Hutang:</span>
                <span>Rp {{ formatNumber(principal) }}</span>
             </div>
             <div class="flex justify-between">
                <span>Total Bunga:</span>
                <span>Rp {{ formatNumber(totalInterest) }}</span>
             </div>
             <div class="flex justify-between font-bold text-slate-600 pt-1 border-t border-dashed border-slate-200 mt-1">
                <span>Total Bayar:</span>
                <span>Rp {{ formatNumber(totalPaid) }}</span>
             </div>
         </div>
      </div>
       
       <p class="text-center text-[10px] text-slate-400 italic">
          *Perhitungan menggunakan metode Bunga Flat (Umum untuk leasing barang/motor).
       </p>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const price = ref(5000000);
const dp = ref(500000);
const rate = ref(10); // Yearly
const tenor = ref(12);

const principal = computed(() => price.value - dp.value);

// Flat Rate Calculation
const totalInterest = computed(() => {
   const p = principal.value;
   const r = rate.value / 100;
   const t = tenor.value / 12;
   return p * r * t;
});

const monthlyPayment = computed(() => {
   if (principal.value <= 0) return 0;
   return (principal.value + totalInterest.value) / tenor.value;
});

const totalPaid = computed(() => monthlyPayment.value * tenor.value + dp.value);

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(Math.round(n));
</script>
