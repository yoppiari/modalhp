<template>
  <div class="px-0 pb-24 max-w-md mx-auto min-h-screen bg-slate-50 print:bg-white print:p-0 print:m-0 print:max-w-none">
    
    <!-- App Header (Hidden on Print) -->
    <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100/50 px-4 py-3 mb-4 transition-all duration-300 print:hidden">
      <div class="flex items-center gap-3">
        <button @click="$router.push('/apps')" class="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <div>
          <h1 class="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kalkulator Gaji Bersih / Template Slip Gaji</h1>
          <p class="text-[10px] text-slate-500 font-medium">Buat dan cetak slip gaji karyawan dengan cepat</p>
        </div>
      </div>
    </div>

    <!-- Main Content (Hidden on Print) -->
    <div class="px-4 space-y-4 print:hidden">

      <!-- Section: Data Karyawan -->
      <section class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
        <h2 class="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="bg-blue-100 p-1.5 rounded-lg text-blue-600"><component :is="UserIcon" size="14" /></span>
          Data Karyawan
        </h2>
        <div class="space-y-3">
          <div>
            <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Nama Karyawan</label>
            <input v-model="form.employeeName" type="text" placeholder="Budi Santoso" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Jabatan</label>
              <input v-model="form.position" type="text" placeholder="Kasir" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400">
            </div>
            <div>
              <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Periode</label>
              <input v-model="form.period" type="text" placeholder="Januari 2026" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400">
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Penerimaan (Pendapatan) -->
      <section class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
        <h2 class="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="bg-emerald-100 p-1.5 rounded-lg text-emerald-600"><component :is="BanknoteIcon" size="14" /></span>
          Penerimaan
        </h2>
        
        <div class="space-y-3">
          <!-- Gaji Pokok -->
          <div>
            <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Gaji Pokok</label>
            <div class="relative">
               <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
               <input v-model="form.basicSalary" type="number" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400">
            </div>
          </div>

          <!-- Uang Makan / Tunjangan -->
          <div>
             <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Tunjangan / Uang Makan</label>
            <div class="relative">
               <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
               <input v-model="form.allowance" type="number" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400">
            </div>
          </div>

          <!-- Lembur -->
          <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <label class="block text-[10px] font-bold text-slate-700 mb-2">Hitung Lembur</label>
            <div class="grid grid-cols-2 gap-3 mb-2">
              <div>
                <label class="block text-[9px] font-semibold text-slate-500 mb-1">Tarif / Jam</label>
                <div class="relative">
                  <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">Rp</span>
                  <input v-model="form.overtimeRatePerHour" type="number" class="w-full bg-white border border-slate-200 text-slate-700 rounded-lg pl-8 pr-2 py-2 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
                </div>
              </div>
              <div>
                <label class="block text-[9px] font-semibold text-slate-500 mb-1">Total Jam</label>
                 <div class="relative">
                  <input v-model="form.overtimeHours" type="number" class="w-full bg-white border border-slate-200 text-slate-700 rounded-lg pl-3 pr-8 py-2 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
                  <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">Jam</span>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center text-xs bg-emerald-50 p-2 rounded-lg border border-emerald-100">
              <span class="text-emerald-700 font-medium">Total Lembur:</span>
              <span class="font-bold text-emerald-800">{{ formatRupiah(calculatedOvertime) }}</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Section: Potongan -->
      <section class="bg-white p-4 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-50">
        <h2 class="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span class="bg-red-100 p-1.5 rounded-lg text-red-600"><component :is="ArrowDownRightIcon" size="14" /></span>
          Potongan
        </h2>
        <div class="space-y-3">
          <div>
            <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Kasbon / Cicilan</label>
            <div class="relative">
               <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
               <input v-model="form.cashAdvance" type="number" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all">
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-500 mb-1 ml-1">Keterlambatan / Lainnya</label>
            <div class="relative">
               <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
               <input v-model="form.otherDeductions" type="number" class="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all">
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Summary -->
      <section class="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-3xl shadow-xl shadow-slate-200">
         <div class="flex justify-between items-center mb-2">
            <span class="text-xs text-slate-400 font-medium">Take Home Pay</span>
         </div>
         <div class="text-3xl font-black text-white mb-4 tracking-tight">
            {{ formatRupiah(netSalary) }}
         </div>
         <div class="flex gap-2">
            <button @click="resetForm" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-2xl text-xs font-bold transition-all active:scale-95 text-center">
              Reset
            </button>
            <button @click="printSlip" class="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/30 active:scale-95 flex items-center justify-center gap-2">
              <component :is="PrinterIcon" size="16" />
              Cetak / Save PDF
            </button>
         </div>
      </section>

    </div>

    <!-- Print Template (Only visible when printing) -->
    <div class="hidden print:block font-sans text-black p-8 max-w-[14cm] mx-auto border border-gray-200 min-h-[14cm]">
       
       <!-- Header -->
       <div class="text-center border-b-2 border-black pb-4 mb-6">
          <h1 class="text-2xl font-black uppercase tracking-wider mb-1">SLIP GAJI KARYAWAN</h1>
          <p class="text-sm font-medium text-gray-600">Periode: {{ form.period || '-' }}</p>
       </div>

       <!-- Info Karyawan -->
       <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
         <div>
           <p class="text-gray-500 mb-1">Nama Karyawan:</p>
           <p class="font-bold uppercase">{{ form.employeeName || '-' }}</p>
         </div>
         <div class="text-right">
           <p class="text-gray-500 mb-1">Jabatan:</p>
           <p class="font-bold uppercase">{{ form.position || '-' }}</p>
         </div>
       </div>

       <div class="w-full flex">
         <!-- Rincian Pendapatan -->
         <div class="w-1/2 pr-4 border-r border-gray-300">
           <h3 class="font-bold mb-3 border-b border-gray-200 pb-1 text-sm uppercase">Pendapatan</h3>
           <div class="space-y-2 text-sm">
             <div class="flex justify-between">
                <span class="text-gray-600">Gaji Pokok</span>
                <span class="font-medium">{{ formatRupiah(form.basicSalary) }}</span>
             </div>
             <div class="flex justify-between">
                <span class="text-gray-600">Tunj./Makan</span>
                <span class="font-medium">{{ formatRupiah(form.allowance) }}</span>
             </div>
             <div class="flex justify-between">
                <span class="text-gray-600 flex flex-col">
                  <span>Lembur</span>
                  <span class="text-[10px] text-gray-400">({{ form.overtimeHours || 0 }} jam x {{ formatRupiah(form.overtimeRatePerHour) }})</span>
                </span>
                <span class="font-medium">{{ formatRupiah(calculatedOvertime) }}</span>
             </div>
           </div>
           
           <div class="flex justify-between mt-4 pt-2 border-t border-gray-400 font-bold text-sm">
             <span>Total Penerimaan</span>
             <span>{{ formatRupiah(totalEarnings) }}</span>
           </div>
         </div>

         <!-- Rincian Potongan -->
         <div class="w-1/2 pl-4">
           <h3 class="font-bold mb-3 border-b border-gray-200 pb-1 text-sm uppercase">Potongan</h3>
           <div class="space-y-2 text-sm">
             <div class="flex justify-between">
                <span class="text-gray-600">Kasbon/Pinjaman</span>
                <span class="font-medium">{{ formatRupiah(form.cashAdvance) }}</span>
             </div>
             <div class="flex justify-between">
                <span class="text-gray-600">Keterlambatan/Lain</span>
                <span class="font-medium">{{ formatRupiah(form.otherDeductions) }}</span>
             </div>
           </div>

           <div class="flex justify-between mt-4 pt-2 border-t border-gray-400 font-bold text-sm text-red-600">
             <span>Total Potongan</span>
             <span>{{ formatRupiah(totalDeductions) }}</span>
           </div>
         </div>
       </div>

       <!-- Take Home Pay -->
       <div class="mt-8 bg-gray-100 p-4 border border-gray-300 flex justify-between items-center text-lg">
         <span class="font-bold uppercase tracking-wide">Penerimaan Bersih</span>
         <span class="font-black">{{ formatRupiah(netSalary) }}</span>
       </div>

       <!-- Signatures -->
       <div class="mt-12 flex justify-between px-4 text-center text-sm">
         <div>
           <p class="mb-16">Pemberi Kerja,</p>
           <div class="border-t border-black w-32 mx-auto"></div>
         </div>
         <div>
           <p class="mb-16">Penerima,</p>
           <p class="font-bold uppercase mb-1">{{ form.employeeName || '(....................)' }}</p>
           <div class="border-t border-gray-400 w-32 flex mx-auto"></div>
         </div>
       </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { 
  User as UserIcon,
  Banknote as BanknoteIcon,
  ArrowDownRight as ArrowDownRightIcon,
  Printer as PrinterIcon
} from 'lucide-vue-next';

// State Form
const form = ref({
  employeeName: '',
  position: '',
  period: '',
  basicSalary: '',
  allowance: '',
  overtimeRatePerHour: '',
  overtimeHours: '',
  cashAdvance: '',
  otherDeductions: ''
});

// Helper Formatting
const formatRupiah = (value) => {
  const val = Number(value) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(val);
};

// Computed Properties
const calculatedOvertime = computed(() => {
  return (Number(form.value.overtimeRatePerHour) || 0) * (Number(form.value.overtimeHours) || 0);
});

const totalEarnings = computed(() => {
  return (Number(form.value.basicSalary) || 0) + 
         (Number(form.value.allowance) || 0) + 
         calculatedOvertime.value;
});

const totalDeductions = computed(() => {
  return (Number(form.value.cashAdvance) || 0) + 
         (Number(form.value.otherDeductions) || 0);
});

const netSalary = computed(() => {
  return totalEarnings.value - totalDeductions.value;
});

// Actions
const resetForm = () => {
  form.value = {
    employeeName: '',
    position: '',
    period: '',
    basicSalary: '',
    allowance: '',
    overtimeRatePerHour: '',
    overtimeHours: '',
    cashAdvance: '',
    otherDeductions: ''
  };
};

const printSlip = () => {
  window.print();
};
</script>

<style>
/* Optimization for Print */
@media print {
  body {
    background-color: white !important;
  }
  @page {
    margin: 0;
    size: auto;
  }
}
</style>
