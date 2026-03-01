<template>
  <div class="bg-blue-50 min-h-screen pb-24">
    <div class="bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Alternatif Template Stok Barang Excel</h2>
      <p class="text-blue-100 text-sm opacity-90">Catat keluar masuk barang digital pengganti Excel</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
      
      <!-- Product Selector -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
         <select v-model="selectedProductId" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 text-sm font-bold text-slate-700">
            <option :value="null">-- Pilih Produk --</option>
            <option v-for="p in products" :key="p.id" :value="p.id">
               {{ p.name }} (Stok: {{ p.stock }})
            </option>
         </select>
      </div>

      <div v-if="selectedProduct" class="space-y-4">
         <!-- Current Stock Display -->
         <div class="bg-white p-6 rounded-2xl shadow border border-blue-100 text-center">
             <div class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Stok Saat Ini</div>
             <div class="text-5xl font-black text-blue-600 tracking-tighter">{{ selectedProduct.stock }}</div>
             <div class="text-xs text-slate-400 mt-2">{{ selectedProduct.unit || 'pcs' }}</div>
         </div>

         <!-- Actions -->
         <div class="grid grid-cols-2 gap-3">
             <button @click="openModal('IN')" class="bg-green-100 text-green-700 py-4 rounded-xl font-bold flex flex-col items-center gap-1 active:scale-95 transition-all">
                <span class="text-2xl">📥</span>
                <span>Barang Masuk</span>
             </button>
             <button @click="openModal('OUT')" class="bg-red-100 text-red-700 py-4 rounded-xl font-bold flex flex-col items-center gap-1 active:scale-95 transition-all">
                <span class="text-2xl">📤</span>
                <span>Barang Keluar</span>
             </button>
         </div>

         <!-- History Log -->
         <div>
            <h3 class="font-bold text-slate-700 mb-3 ml-1">Riwayat Mutasi</h3>
            <div class="space-y-2">
               <div v-for="log in logs" :key="log.id" class="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center text-sm">
                  <div>
                     <div class="font-bold" :class="log.type === 'IN' ? 'text-green-600' : 'text-red-500'">
                        {{ log.type === 'IN' ? 'Masuk' : 'Keluar' }}
                     </div>
                     <div class="text-[10px] text-slate-400">{{ formatDateTime(log.date) }}</div>
                     <div v-if="log.note" class="text-[10px] text-slate-500 italic">"{{ log.note }}"</div>
                  </div>
                  <div class="font-bold text-slate-700 text-base">
                     {{ log.type === 'IN' ? '+' : '-' }}{{ log.qty }}
                  </div>
               </div>
               <div v-if="logs.length === 0" class="text-center py-6 text-slate-400 text-xs">
                  Belum ada riwayat mutasi.
               </div>
            </div>
         </div>
      </div>

      <!-- Input Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
         <div class="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-up">
            <h3 class="font-bold text-lg mb-4 text-slate-800">
               {{ modalType === 'IN' ? 'Catat Barang Masuk' : 'Catat Barang Keluar' }}
            </h3>
            
            <div class="space-y-3 mb-6">
               <div>
                  <label class="text-xs font-bold text-slate-500 uppercase">Jumlah</label>
                  <input v-model.number="form.qty" type="number" class="w-full p-3 bg-slate-50 rounded-xl text-lg font-bold border-none focus:ring-2 focus:ring-blue-500" placeholder="0" />
               </div>
               <div>
                  <label class="text-xs font-bold text-slate-500 uppercase">Catatan</label>
                  <input v-model="form.note" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-blue-500" placeholder="Contoh: Kulakan, Rusak, dll" />
               </div>
            </div>

            <div class="flex gap-3">
               <button @click="showModal = false" class="flex-1 py-3 text-slate-500 font-bold bg-slate-100 rounded-xl">Batal</button>
               <button @click="submitStock" class="flex-1 py-3 text-white font-bold rounded-xl shadow-lg" :class="modalType === 'IN' ? 'bg-green-600' : 'bg-red-500'">
                  Simpan
               </button>
            </div>
         </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const products = useObservable(liveQuery(() => db.products.where('is_active').equals(1).toArray())) || ref([]);
const selectedProductId = ref(null);
const selectedProduct = ref(null);
const logs = ref([]);

const showModal = ref(false);
const modalType = ref('IN');
const form = ref({ qty: '', note: '' });

watch(selectedProductId, async (newId) => {
   if (newId) {
      selectedProduct.value = await db.products.get(newId);
      loadLogs(newId);
   } else {
      selectedProduct.value = null;
      logs.value = [];
   }
});

const loadLogs = async (productId) => {
   logs.value = await db.inventory_log
      .where('product_id').equals(productId)
      .reverse()
      .limit(20)
      .toArray();
};

const openModal = (type) => {
   modalType.value = type;
   form.value = { qty: '', note: '' };
   showModal.value = true;
};

const submitStock = async () => {
   if (!form.value.qty || form.value.qty <= 0) return;

   const qty = parseInt(form.value.qty);
   const currentStock = selectedProduct.value.stock || 0;
   const newStock = modalType.value === 'IN' ? currentStock + qty : currentStock - qty;

   await db.transaction('rw', db.products, db.inventory_log, async () => {
      // Update Product Stock
      await db.products.update(selectedProductId.value, { stock: newStock });
      
      // Add Log
      await db.inventory_log.add({
         product_id: selectedProductId.value,
         date: Date.now(),
         type: modalType.value,
         qty: qty,
         note: form.value.note
      });
   });

   // Refresh UI
   selectedProduct.value = await db.products.get(selectedProductId.value);
   await loadLogs(selectedProductId.value);
   showModal.value = false;
};

const formatDateTime = (ts) => new Date(ts).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
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
