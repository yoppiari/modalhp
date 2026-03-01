<template>
  <div class="bg-red-50 min-h-screen pb-24">
    <div class="bg-red-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Catat Hutang & Reminder WA</h2>
      <p class="text-red-100 text-sm opacity-90">Catat piutang, dan otomatis kirim tagihan via WhatsApp</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
      
      <!-- Summary Card -->
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-red-100 text-center">
         <div class="text-xs text-slate-400 font-bold uppercase mb-1">Total Piutang (Belum Dibayar)</div>
         <div class="text-3xl font-black text-red-600 tracking-tight">Rp {{ formatNumber(totalDebt) }}</div>
      </div>

      <!-- Add New Button -->
      <button @click="openModal()" class="w-full bg-red-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-200 active:scale-95 transition-all">
         + Catat Hutang Baru
      </button>

      <!-- Customer List -->
      <div class="space-y-3">
         <div v-for="c in customers" :key="c.id" class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center group active:scale-[0.98] transition-all" @click="viewDetail(c)">
            <div>
               <div class="font-bold text-slate-700">{{ c.name }}</div>
               <div class="text-xs text-slate-400">{{ c.phone }}</div>
            </div>
            <div class="text-right">
               <div class="font-bold text-red-600">Rp {{ formatNumber(c.total_debt) }}</div>
               <div class="text-[10px] text-slate-400">Ketuk untuk detail ></div>
            </div>
         </div>
         
         <div v-if="customers.length === 0" class="text-center py-10 text-slate-400 text-sm">
            Belum ada catatan hutang.
         </div>
      </div>
      
      <!-- Input Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
         <div class="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-up">
            <h3 class="font-bold text-lg mb-4 text-slate-800">Catat Hutang</h3>
            <div class="space-y-3 mb-6">
               <input v-model="form.name" placeholder="Nama Pelanggan" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-red-500" />
               <input v-model="form.phone" placeholder="No. HP / WA" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-red-500" />
               <div class="relative">
                  <span class="absolute left-3 top-3 text-slate-400 font-bold">Rp</span>
                  <input v-model.number="form.amount" type="number" class="w-full pl-10 p-3 bg-slate-50 rounded-xl text-lg font-bold border-none focus:ring-2 focus:ring-red-500" />
               </div>
               <input v-model="form.note" placeholder="Catatan (Tgl, Barang, dll)" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div class="flex gap-3">
               <button @click="showModal = false" class="flex-1 py-3 text-slate-500 font-bold bg-slate-100 rounded-xl">Batal</button>
               <button @click="saveDebt" class="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg">Simpan</button>
            </div>
         </div>
      </div>

       <!-- Detail Modal -->
       <div v-if="selectedCustomer" class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
          <div class="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-up h-[80vh] flex flex-col">
             <div class="flex justify-between items-center mb-6">
                <div>
                   <h3 class="font-bold text-xl text-slate-800">{{ selectedCustomer.name }}</h3>
                   <p class="text-sm text-slate-500">{{ selectedCustomer.phone }}</p>
                </div>
                <button @click="selectedCustomer = null" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold">×</button>
             </div>
             
             <div class="bg-red-50 p-4 rounded-xl text-center mb-6">
                <div class="text-xs text-red-400 font-bold uppercase">Sisa Hutang</div>
                <div class="text-3xl font-black text-red-600">Rp {{ formatNumber(selectedCustomer.total_debt) }}</div>
             </div>
             
             <!-- Actions -->
             <div class="grid grid-cols-2 gap-3 mb-6">
                <button @click="addDebtToCustomer" class="bg-red-100 text-red-700 py-3 rounded-xl font-bold text-sm">+ Tambah Hutang</button>
                <button @click="payDebt" class="bg-green-100 text-green-700 py-3 rounded-xl font-bold text-sm">✅ Bayar / Lunas</button>
             </div>

             <!-- History (Prototype: Only showing current total for now, full history would require separate table) -->
             <div class="flex-1 overflow-y-auto">
                <p class="text-center text-slate-400 text-sm italic mt-10">
                   Riwayat transaksi detail akan segera hadir.
                   <br>Saat ini hanya mencatat saldo total.
                </p>
                
                <div class="mt-8 text-center">
                   <button @click="sendBillWA" class="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-xs shadow-md">
                      📱 Kirim Tagihan via WA
                   </button>
                </div>
             </div>
             
             <!-- Delete -->
             <button @click="deleteCustomer" class="mt-4 w-full py-3 text-red-400 text-xs font-bold hover:bg-red-50 rounded-xl">
                 Hapus Data Pelanggan
             </button>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { WHATSAPP_API_URL } from '@/utils/constants';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const customers = useObservable(liveQuery(() => db.customers.where('total_debt').above(0).toArray())) || ref([]);
const totalDebt = computed(() => customers.value?.reduce((sum, c) => sum + c.total_debt, 0) || 0);

const showModal = ref(false);
const selectedCustomer = ref(null);
const form = ref({ name: '', phone: '', amount: '', note: '' });

const openModal = () => {
   form.value = { name: '', phone: '', amount: '', note: '' };
   selectedCustomer.value = null; // New customer mode
   showModal.value = true;
};

const saveDebt = async () => {
   if (!form.value.name || !form.value.amount) return;

   try {
      // Check if customer exists by phone (if provided)
      let customer = null;
      if (form.value.phone) {
         customer = await db.customers.where('phone').equals(form.value.phone).first();
      }

      const amount = parseInt(form.value.amount);

      if (customer) {
         await db.customers.update(customer.id, {
            total_debt: customer.total_debt + amount
         });
      } else {
         await db.customers.add({
            name: form.value.name,
            phone: form.value.phone || '-', // Default placeholder
            total_debt: amount
         });
      }
      
      showModal.value = false;
   } catch (e) {
      alert('Gagal simpan: ' + e.message);
   }
};

const viewDetail = (c) => {
   selectedCustomer.value = c;
};

const addDebtToCustomer = () => {
   // Pre-fill form for existing customer
   form.value = {
      name: selectedCustomer.value.name,
      phone: selectedCustomer.value.phone,
      amount: '',
      note: ''
   };
   // We will just use the normal save logic, but since phone/name matches, it might create specific logic
   // Actually simpler: Just update directly.
   const amount = prompt('Masukkan nominal Tambah Hutang:');
   if (amount && !isNaN(amount)) {
       db.customers.update(selectedCustomer.value.id, {
           total_debt: selectedCustomer.value.total_debt + parseInt(amount)
       }).then(() => {
           // Update local view
           selectedCustomer.value.total_debt += parseInt(amount);
       });
   }
};

const payDebt = () => {
    const amount = prompt('Masukkan nominal Pembayaran:', selectedCustomer.value.total_debt);
     if (amount && !isNaN(amount)) {
       const pay = parseInt(amount);
       const newDebt = Math.max(0, selectedCustomer.value.total_debt - pay);
       
       db.customers.update(selectedCustomer.value.id, {
           total_debt: newDebt
       }).then(() => {
           selectedCustomer.value.total_debt = newDebt;
           if (newDebt === 0) selectedCustomer.value = null; // Close if paid off
       });
   }
};

const sendBillWA = () => {
   const c = selectedCustomer.value;
   const text = `Halo Kak ${c.name}, mau menginfokan total tagihan saat ini sebesar Rp ${formatNumber(c.total_debt)}. Mohon dibantu pelunasannya ya kak. Terima kasih! 🙏`;
    window.open(`${WHATSAPP_API_URL}${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
};

const deleteCustomer = async () => {
    if(confirm('Hapus data pelanggan ini permanen?')) {
        await db.customers.delete(selectedCustomer.value.id);
        selectedCustomer.value = null;
    }
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
</script>

<style scoped>
.animate-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
