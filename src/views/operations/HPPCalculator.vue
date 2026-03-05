<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <div class="bg-orange-500 text-white px-6 pt-6 pb-10 rounded-b-[2.5rem] shadow-lg sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Cara Hitung HPP Makanan</h2>
      <p class="text-orange-100 text-sm opacity-90">Hitung modal pokok produksi dengan detail & mudah</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-5 pt-6">
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
          <div class="flex items-center gap-1 mb-2">
            <h3 class="font-bold text-slate-700 text-xs">Tenaga Kerja</h3>
            <div class="relative">
              <button @click="showTooltipLabor = !showTooltipLabor" class="text-slate-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              </button>
              <div v-if="showTooltipLabor" class="absolute bottom-full left-0 mb-2 bg-slate-800 text-white text-[10px] p-2 rounded-lg shadow-lg w-48 z-10">
                💡 Upah untuk pekerja yang memproduksi barang ini. Contoh: Rp 50.000 untuk 1 orang yang bikin 10 porsi.
              </div>
            </div>
          </div>
          <input v-model.number="laborCost" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-1 focus:ring-orange-400" placeholder="0" />
          <p class="text-[10px] text-slate-400 mt-1">Total upah produksi</p>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div class="flex items-center gap-1 mb-2">
            <h3 class="font-bold text-slate-700 text-xs">Overhead</h3>
            <div class="relative">
              <button @click="showTooltipOverhead = !showTooltipOverhead" class="text-slate-400 hover:text-orange-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              </button>
              <div v-if="showTooltipOverhead" class="absolute bottom-full left-0 mb-2 bg-slate-800 text-white text-[10px] p-2 rounded-lg shadow-lg w-48 z-10">
                💡 Biaya tidak langsung: listrik, gas, air, sewa tempat. Contoh: Rp 2.000/porsi untuk listrik & gas.
              </div>
            </div>
          </div>
          <input v-model.number="overheadCost" type="number" class="w-full p-2 bg-slate-50 rounded-lg text-sm font-bold text-slate-700 border-none focus:ring-1 focus:ring-orange-400" placeholder="0" />
          <p class="text-[10px] text-slate-400 mt-1">Listrik, gas, dll</p>
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
           <p v-if="sellingPrice > 0" class="text-xs text-slate-400 mt-2">
             Estimasi Profit: <span class="text-green-600 font-bold">Rp {{ formatNumber(sellingPrice - hppPerUnit) }}</span> /pcs
           </p>
        </div>
      </section>

      <!-- Action Buttons -->
      <div v-if="hppPerUnit > 0" class="space-y-3 sticky bottom-20">
         <!-- Row 1: Selling Price Input -->
         <div class="bg-white p-3 rounded-xl shadow border border-slate-100">
             <label class="text-[10px] font-bold text-slate-400 uppercase">Rencana Harga Jual</label>
             <input v-model.number="sellingPrice" type="number" class="w-full font-bold text-slate-700 border-none focus:ring-0 p-0" placeholder="0" />
         </div>

         <!-- Row 2: Save & History Buttons -->
         <div class="flex gap-3">
            <button @click="saveCalculation" class="flex-1 bg-slate-800 text-white rounded-xl font-bold py-3 px-4 shadow-lg active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="17 3 17 9 23 9"/></svg>
              Simpan Perhitungan
            </button>
            <button @click="showHistory = true" class="flex-1 bg-orange-100 text-orange-700 rounded-xl font-bold py-3 px-4 shadow active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20V10M18 20v-4"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/></svg>
              Riwayat
            </button>
         </div>
      </div>

    </div>

    <!-- History Modal -->
    <div v-if="showHistory" class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl max-h-[80vh] overflow-hidden flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-slate-800">📋 Riwayat Perhitungan HPP</h3>
          <button @click="showHistory = false" class="text-slate-400 hover:text-slate-600 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="overflow-y-auto flex-1 space-y-3">
          <div v-for="calc in hppCalculations" :key="calc.id" class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div class="flex justify-between items-start mb-3">
              <div>
                <h4 class="font-bold text-slate-800">{{ calc.product_name }}</h4>
                <p class="text-[10px] text-slate-400">{{ formatDate(calc.created_at) }}</p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-orange-600">Rp {{ formatNumber(calc.hpp_per_unit) }}</div>
                <p class="text-[10px] text-slate-400">HPP/Unit • {{ calc.quantity }} pcs</p>
              </div>
            </div>

            <!-- Raw Materials Summary -->
            <div class="mb-3">
              <p class="text-[10px] font-bold text-slate-500 uppercase mb-1">Bahan Baku:</p>
              <div class="flex flex-wrap gap-1">
                <span v-for="(mat, idx) in calc.raw_materials" :key="idx" class="text-[10px] bg-white px-2 py-1 rounded border border-slate-200">
                  {{ mat.name || 'Item ' + (idx + 1) }}: Rp {{ formatNumber(mat.cost) }}
                </span>
              </div>
            </div>

            <!-- Cost Breakdown -->
            <div class="grid grid-cols-3 gap-2 mb-3 text-[10px]">
              <div class="bg-white p-2 rounded">
                <p class="text-slate-400">Bahan</p>
                <p class="font-bold text-slate-700">Rp {{ formatNumber(calc.total_raw) }}</p>
              </div>
              <div class="bg-white p-2 rounded">
                <p class="text-slate-400">Tenaga</p>
                <p class="font-bold text-slate-700">Rp {{ formatNumber(calc.labor_cost) }}</p>
              </div>
              <div class="bg-white p-2 rounded">
                <p class="text-slate-400">Overhead</p>
                <p class="font-bold text-slate-700">Rp {{ formatNumber(calc.overhead_cost) }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button @click="reviewCalculation(calc)" class="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-2 rounded-lg">
                Review
              </button>
              <button @click="transferToProduct(calc)" class="flex-1 bg-orange-500 text-white text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/><path d="M3 16v5h5"/><path d="M16 21h5v-5"/></svg>
                Jadikan Produk
              </button>
            </div>
          </div>

          <div v-if="hppCalculations.length === 0" class="text-center py-8 text-slate-400 text-sm">
            Belum ada riwayat perhitungan.
          </div>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="showReview" class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl max-h-[80vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-slate-800">Review: {{ reviewing?.product_name }}</h3>
          <button @click="showReview = false" class="text-slate-400 hover:text-slate-600 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase mb-2">Bahan Baku</p>
            <div class="space-y-2">
              <div v-for="(mat, idx) in reviewing?.raw_materials" :key="idx" class="flex justify-between text-sm">
                <span class="text-slate-600">{{ mat.name || 'Item ' + (idx + 1) }}</span>
                <span class="font-bold text-slate-700">Rp {{ formatNumber(mat.cost) }}</span>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-3">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-slate-600">Total Bahan Baku</span>
              <span class="font-bold text-slate-700">Rp {{ formatNumber(reviewing?.total_raw) }}</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-slate-600">Tenaga Kerja</span>
              <span class="font-bold text-slate-700">Rp {{ formatNumber(reviewing?.labor_cost) }}</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span class="text-slate-600">Overhead</span>
              <span class="font-bold text-slate-700">Rp {{ formatNumber(reviewing?.overhead_cost) }}</span>
            </div>
            <div class="border-t border-slate-100 pt-2 mt-2">
              <div class="flex justify-between text-base">
                <span class="font-bold text-slate-800">Total Produksi</span>
                <span class="font-bold text-slate-800">Rp {{ formatNumber(reviewing?.total_cost) }}</span>
              </div>
              <div class="flex justify-between text-base mt-1">
                <span class="font-bold text-orange-600">HPP per Unit ({{ reviewing?.quantity }} pcs)</span>
                <span class="font-bold text-orange-600">Rp {{ formatNumber(reviewing?.hpp_per_unit) }}</span>
              </div>
            </div>
          </div>

          <button @click="transferToProduct(reviewing)" class="w-full bg-orange-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/><path d="M3 16v5h5"/><path d="M16 21h5v-5"/></svg>
            Jadikan Produk
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../db';

const productName = ref('');
const rawMaterials = ref([{ name: '', cost: 0 }]);
const laborCost = ref(0);
const overheadCost = ref(0);
const quantity = ref(1);
const sellingPrice = ref(0);

const showTooltipLabor = ref(false);
const showTooltipOverhead = ref(false);
const showHistory = ref(false);
const showReview = ref(false);
const reviewing = ref(null);
const hppCalculations = ref([]);

const addRaw = () => rawMaterials.value.push({ name: '', cost: 0 });
const removeRaw = (i) => rawMaterials.value.splice(i, 1);

const totalRaw = computed(() => rawMaterials.value.reduce((sum, item) => sum + (item.cost || 0), 0));
const totalProductionCost = computed(() => totalRaw.value + (laborCost.value || 0) + (overheadCost.value || 0));
const hppPerUnit = computed(() => quantity.value > 0 ? totalProductionCost.value / quantity.value : 0);

const formatCurrency = (val) => {
  if (val === 0) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
};

const formatNumber = (val) => {
  return new Intl.NumberFormat('id-ID').format(val);
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const loadCalculations = async () => {
  try {
    hppCalculations.value = await db.hpp_calculations.orderBy('created_at').reverse().toArray();
  } catch (error) {
    console.error('Failed to load calculations:', error);
  }
};

const saveCalculation = async () => {
  if (!productName.value) {
    alert('Isi nama produk dulu!');
    return;
  }

  try {
    const calculation = {
      product_name: productName.value,
      raw_materials: rawMaterials.value.filter(m => m.name || m.cost > 0).map(m => ({ name: m.name || '', cost: Number(m.cost) || 0 })),
      total_raw: Number(totalRaw.value) || 0,
      labor_cost: Number(laborCost.value) || 0,
      overhead_cost: Number(overheadCost.value) || 0,
      total_cost: Number(totalProductionCost.value) || 0,
      quantity: Number(quantity.value) || 1,
      hpp_per_unit: Number(hppPerUnit.value) || 0,
      selling_price: Number(sellingPrice.value) || 0,
      created_at: Date.now()
    };

    await db.hpp_calculations.add(calculation);

    alert('✅ Perhitungan berhasil disimpan!');

    // Reload history
    await loadCalculations();

  } catch (err) {
    alert('Gagal menyimpan: ' + err.message);
  }
};

const reviewCalculation = (calc) => {
  reviewing.value = calc;
  showReview.value = true;
};

const transferToProduct = async (calc) => {
  if (!confirm(`Jadikan "${calc.product_name}" sebagai produk dengan HPP Rp ${formatNumber(calc.hpp_per_unit)}?`)) {
    return;
  }

  try {
    await db.products.add({
      name: calc.product_name,
      category: 'Produksi Sendiri',
      code: 'HPP-' + Date.now().toString().slice(-6),
      cost: calc.hpp_per_unit,
      price: calc.selling_price || calc.hpp_per_unit * 1.3, // Default 30% markup
      stock: 0, // Start with 0, user can adjust later
      unit: 'pcs',
      is_active: 1,
      created_at: Date.now(),
      hpp_detail: {
        raw_materials: calc.raw_materials,
        labor_cost: calc.labor_cost,
        overhead_cost: calc.overhead_cost
      }
    });

    alert('✅ Produk berhasil ditambahkan! Stok dapat disesuaikan di menu Produk.');
    showHistory.value = false;
    showReview.value = false;

  } catch (err) {
    alert('Gagal menambah produk: ' + err.message);
  }
};

onMounted(() => {
  loadCalculations();
});
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
