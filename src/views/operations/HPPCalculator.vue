<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <div class="bg-orange-500 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Cara Hitung HPP Makanan</h2>
      <p class="text-orange-100 text-sm opacity-90">Hitung modal pokok produksi dengan detail & mudah</p>
    </div>
    
    <div class="px-4 max-w-md mx-auto space-y-5">
      <!-- Product Name Input -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
         <label class="text-xs font-bold text-slate-500 uppercase mb-1">Nama Produk Hasil</label>
         <input v-model="productName" placeholder="Contoh: Kopi Susu Gula Aren" class="w-full p-2 bg-slate-50 rounded-lg font-bold text-slate-700 border-none focus:ring-1 focus:ring-orange-400" />
      </div>

      <!-- Raw Materials -->
      <section class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-bold text-slate-700 text-sm flex items-center gap-2">
            <span class="w-2 h-6 bg-orange-400 rounded-full"></span>
            Bahan Baku
          </h3>
          <button @click="addRaw" class="text-orange-600 text-xs font-bold bg-orange-50 px-3 py-1 rounded-full">+ Item</button>
        </div>
        
        <div class="space-y-2">
           <transition-group name="list">
            <div v-for="(item, idx) in rawMaterials" :key="idx" class="flex gap-2">
              <input v-model="item.name" placeholder="Nama Bahan" class="flex-1 p-2 bg-slate-50 rounded-lg text-xs border-none focus:ring-1 focus:ring-orange-400" />
              <input v-model.number="item.cost" type="number" placeholder="Biaya" class="w-24 p-2 bg-slate-50 rounded-lg text-xs border-none focus:ring-1 focus:ring-orange-400 text-right" />
              <button @click="removeRaw(idx)" class="text-slate-300 hover:text-red-500 px-1">×</button>
            </div>
           </transition-group>
        </div>
        <div class="mt-3 text-right text-xs text-slate-500 font-medium">Subtotal: {{ formatCurrency(totalRaw) }}</div>
      </section>

      <!-- Labor & Overhead -->
      <section class="grid grid-cols-2 gap-3">
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="font-bold text-slate-700 text-xs mb-2">Tenaga Kerja (Total)</h3>
          <input v-model.number="laborCost" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-1 focus:ring-orange-400" />
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <h3 class="font-bold text-slate-700 text-xs mb-2">Overhead (Total)</h3>
          <input v-model.number="overheadCost" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-1 focus:ring-orange-400" />
        </div>
      </section>

      <!-- Output -->
      <section class="bg-white p-5 rounded-2xl shadow-lg border border-orange-100">
         <div class="flex items-center gap-3 mb-4">
            <label class="text-xs font-bold text-slate-500 uppercase flex-1">Jumlah Hasil Produksi (Pcs)</label>
            <input v-model.number="quantity" type="number" class="w-24 p-2 bg-slate-100 rounded-lg text-center font-bold text-orange-600" />
        </div>
        
        <div class="border-t border-slate-100 pt-3 text-center">
           <p class="text-xs text-slate-400 mb-1">HPP per Unit (Modal Pokok)</p>
           <div class="text-3xl font-bold text-orange-600 tracking-tight">
             {{ formatCurrency(hppPerUnit) }}
           </div>
        </div>
      </section>
      
      <!-- Save Action -->
      <div v-if="hppPerUnit > 0" class="flex gap-3 sticky bottom-20">
         <div class="bg-white p-3 rounded-xl shadow border border-slate-100 flex-1">
             <label class="text-[10px] font-bold text-slate-400 uppercase">Rencana Harga Jual</label>
             <input v-model.number="sellingPrice" type="number" class="w-full font-bold text-slate-700 border-none focus:ring-0 p-0" placeholder="0" />
         </div>
         <button @click="saveProduct" class="flex-1 bg-slate-800 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-all">
            💾 Simpan Produk
         </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { db } from '../../db';

const productName = ref('');
const rawMaterials = ref([{ name: '', cost: 0 }]);
const laborCost = ref(0);
const overheadCost = ref(0);
const quantity = ref(1);
const sellingPrice = ref(0);

const addRaw = () => rawMaterials.value.push({ name: '', cost: 0 });
const removeRaw = (i) => rawMaterials.value.splice(i, 1);

const totalRaw = computed(() => rawMaterials.value.reduce((sum, item) => sum + (item.cost || 0), 0));
const totalProductionCost = computed(() => totalRaw.value + (laborCost.value || 0) + (overheadCost.value || 0));
const hppPerUnit = computed(() => quantity.value > 0 ? totalProductionCost.value / quantity.value : 0);

const formatCurrency = (val) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
};

const saveProduct = async () => {
   if (!productName.value) {
      alert('Isi nama produk dulu!');
      return;
   }
   
   try {
      await db.products.add({
         name: productName.value,
         category: 'Produksi Sendiri',
         code: 'HPP-' + Date.now().toString().slice(-6),
         cost: hppPerUnit.value,
         price: sellingPrice.value || hppPerUnit.value, // Default to HPP if empty
         stock: quantity.value, // Initialize stock with produced qty
         unit: 'pcs',
         is_active: 1,
         created_at: Date.now()
      });
      
      if (confirm('Produk berhasil disimpan! Stok awal ditambahkan: ' + quantity.value + ' pcs. Lihat di menu Produk?')) {
          // In real app using router push
          // router.push('/finance/products');
      }
      
      // Reset
      productName.value = '';
      rawMaterials.value = [{ name: '', cost: 0 }];
      laborCost.value = 0;
      overheadCost.value = 0;
      quantity.value = 1;
      sellingPrice.value = 0;

   } catch (err) {
      alert('Gagal simpan: ' + err.message);
   }
};
</script>
