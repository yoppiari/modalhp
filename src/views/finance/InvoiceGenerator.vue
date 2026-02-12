<template>
  <div class="bg-indigo-50 min-h-screen pb-32">
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 relative z-10">
      <h2 class="text-2xl font-bold">Cetak Struk</h2>
      <p class="text-indigo-100 text-sm opacity-90">Cetak ulang nota transaksi lama</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
       <!-- Transaction Selector -->
       <div class="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100">
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Pilih Transaksi</label>
          <select v-model="selectedTransId" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm">
             <option :value="null">-- Pilih Transaksi --</option>
             <option v-for="t in transactions" :key="t.id" :value="t.id">
                {{ t.invoice_number }} - {{ formatTime(t.date) }} (Rp {{ formatNumber(t.total_amount) }})
             </option>
          </select>
       </div>

       <!-- Preview Receipt -->
       <div v-if="selectedTrans" class="bg-white p-6 rounded-none shadow-sm border-x border-slate-200 relative receipt-paper">
          <!-- Receipt Header -->
          <div class="text-center mb-6">
             <h3 class="font-bold text-xl text-slate-800">WARUNG BERKAH</h3>
             <p class="text-xs text-slate-500">Jl. Contoh No. 123, Jakarta</p>
             <p class="text-xs text-slate-500">Telp: 0812-3456-7890</p>
          </div>
          
          <div class="border-b-2 border-dashed border-slate-300 my-4"></div>
          
          <div class="flex justify-between text-xs text-slate-500 mb-2">
             <span>{{ selectedTrans.invoice_number }}</span>
             <span>{{ formatDateTime(selectedTrans.date) }}</span>
          </div>

          <!-- Items -->
          <div class="space-y-2 text-sm text-slate-700 mb-4">
             <div v-for="item in transactionItems" :key="item.id" class="flex justify-between">
                <span>{{ item.product_name_at_sale }} <span class="text-xs text-slate-400">x{{ item.qty }}</span></span>
                <span class="font-bold">Rp {{ formatNumber(item.subtotal) }}</span>
             </div>
          </div>

          <div class="border-b-2 border-dashed border-slate-300 my-4"></div>

          <!-- Totals -->
          <div class="flex justify-between font-bold text-lg text-slate-800">
             <span>TOTAL</span>
             <span>Rp {{ formatNumber(selectedTrans.total_amount) }}</span>
          </div>
          <div class="flex justify-between text-xs text-slate-500 mt-1">
             <span>Bayar ({{ selectedTrans.payment_method }})</span>
             <span>Rp {{ formatNumber(selectedTrans.total_amount) }}</span>
          </div>

          <div class="mt-8 text-center text-xs text-slate-400">
             <p>Terima Kasih atas Kunjungan Anda</p>
             <p>Barang yang dibeli tidak dapat ditukar</p>
          </div>
          
          <!-- Jagged Edge Effect Bottom -->
          <div class="absolute -bottom-2 left-0 w-full h-4 bg-indigo-50" style="clip-path: polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0);"></div>
       </div>

       <!-- Action Buttons -->
       <div v-if="selectedTrans" class="flex gap-3">
          <button @click="printReceipt" class="flex-1 bg-slate-800 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
             🖨️ Cetak
          </button>
          <button @click="shareWhatsapp" class="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
             📱 Kirim WA
          </button>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { WHATSAPP_API_URL } from '@/utils/constants';
import { db } from '../../db';
import { jsPDF } from 'jspdf';

const transactions = ref([]);
const selectedTransId = ref(null);
const selectedTrans = ref(null);
const transactionItems = ref([]);

onMounted(async () => {
   transactions.value = await db.transactions.orderBy('date').reverse().limit(50).toArray();
});

watch(selectedTransId, async (newId) => {
   if (newId) {
      selectedTrans.value = transactions.value.find(t => t.id === newId);
      transactionItems.value = await db.transaction_items.where('transaction_id').equals(newId).toArray();
   } else {
      selectedTrans.value = null;
      transactionItems.value = [];
   }
});

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
const formatDateTime = (ts) => new Date(ts).toLocaleString('id-ID');
const formatTime = (ts) => new Date(ts).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});

const printReceipt = () => {
   window.print();
};

const shareWhatsapp = () => {
   // Generate Text Receipt
   let text = `*WARUNG BERKAH*\n`;
   text += `--------------------------------\n`;
   text += `No: ${selectedTrans.value.invoice_number}\n`;
   text += `Tgl: ${formatDateTime(selectedTrans.value.date)}\n\n`;
   
   transactionItems.value.forEach(item => {
      text += `${item.product_name_at_sale} x${item.qty} = Rp ${formatNumber(item.subtotal)}\n`;
   });
   
   text += `--------------------------------\n`;
   text += `*TOTAL: Rp ${formatNumber(selectedTrans.value.total_amount)}*\n`;
   text += `Terima Kasih!`;
   
   const url = `${WHATSAPP_API_URL}?text=${encodeURIComponent(text)}`;
   window.open(url, '_blank');
};
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .receipt-paper, .receipt-paper * {
    visibility: visible;
  }
  .receipt-paper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    box-shadow: none;
    border: none;
  }
}
</style>
