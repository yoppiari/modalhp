<template>
  <div class="bg-white rounded-xl shadow p-4">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-bold text-lg leading-tight">Offline Tools Manager</h3>
        <p class="text-xs text-slate-500 mt-1">Download agar bisa dipakai tanpa internet.</p>
      </div>
      <button 
        @click="downloadAllTools" 
        :disabled="isDownloadingAll"
        class="bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-indigo-700 transition"
      >
        <span v-if="isDownloadingAll">Loading...</span>
        <span v-else>Download Semua</span>
      </button>
    </div>
    
    <div class="space-y-3">
      <div v-for="tool in tools" :key="tool.id" class="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
        <div>
          <p class="font-bold text-sm text-slate-700">{{ tool.name }}</p>
          <p class="text-[10px] text-slate-500 mb-0.5">{{ tool.description }}</p>
          <p class="text-[10px]" :class="tool.downloaded ? 'text-emerald-500 font-semibold' : 'text-slate-400'">
            {{ tool.status }}
          </p>
        </div>
        <button 
          @click="downloadTool(tool)" 
          :disabled="tool.downloaded || tool.loading"
          class="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50 disabled:bg-slate-50 disabled:text-slate-400 min-w-[80px] text-center"
        >
          <span v-if="tool.downloaded">✓ Ready</span>
          <span v-else-if="tool.loading">...</span>
          <span v-else>Download</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tools = ref([]);
const isDownloadingAll = ref(false);

const APP_DETAILS = {
  Cashier: { name: 'Kasir Warung', desc: 'Mulai Jualan' },
  ProductList: { name: 'Produk', desc: 'Kelola Stok' },
  DailyReport: { name: 'Laporan', desc: 'Cek Omzet' },
  DebtManager: { name: 'Hutang', desc: 'Catat Kasbon' },
  InvoiceGenerator: { name: 'Kuitansi', desc: 'Cetak Struk' },
  StockCard: { name: 'Kartu Stok', desc: 'Mutasi Barang' },
  Payroll: { name: 'Slip Gaji', desc: 'Hitung Gaji' },
  HPPCalculator: { name: 'Cek HPP', desc: 'Modal Kuliner' },
  WhatsAppLink: { name: 'WA Link', desc: 'Link Auto Chat' },
  CreditSimulator: { name: 'Kredit', desc: 'Simulasi Cicilan' },
  DiscountPlanner: { name: 'Diskon', desc: 'Hitung Promo' },
  FoodDeliveryPricing: { name: 'Harga Ojol', desc: 'Anti Rugi Potongan' },
  QRCodeGenerator: { name: 'QR Code Serbaguna', desc: 'Buat Kode QR Cepat' },
  BillSplitter: { name: 'Split Bill', desc: 'Patungan Makan' },
  RandomPicker: { name: 'Doorprize', desc: 'Acak Pemenang' }
};

// Check if a tool's JS chunk is already in the SW cache
const isToolCached = async (toolId) => {
  try {
    const cache = await caches.open('umkm-tools');
    const keys = await cache.keys();
    // Tool chunks have filenames like tool_finance_pos_Cashier-xxx.js
    return keys.some(req => req.url.includes(`tool_`) && req.url.includes(toolId));
  } catch {
    return false;
  }
};

onMounted(async () => {
  const routes = router.getRoutes();

  // Create an array with the same order as APP_DETAILS (keys)
  const orderedKeys = Object.keys(APP_DETAILS);
  
  const mappedTools = routes
    .filter(r => APP_DETAILS[r.name])
    .map(r => ({
      id: r.name,
      name: APP_DETAILS[r.name].name,
      description: APP_DETAILS[r.name].desc,
      status: 'Cloud Only',
      downloaded: false,
      loading: false,
      loader: r.components?.default
    }))
    .sort((a, b) => orderedKeys.indexOf(a.id) - orderedKeys.indexOf(b.id));

  tools.value = mappedTools;

  // Check cache status for each tool
  for (const tool of tools.value) {
    const cached = await isToolCached(tool.id);
    if (cached) {
      tool.downloaded = true;
      tool.status = 'Offline Ready';
    }
  }
});

const downloadTool = async (tool) => {
  if (!tool.loader || typeof tool.loader !== 'function') return;
  
  tool.loading = true;
  try {
    await tool.loader();
    tool.downloaded = true;
    tool.status = 'Offline Ready';
  } catch (e) {
    console.error(e);
    tool.status = 'Error';
  } finally {
    tool.loading = false;
  }
};

const downloadAllTools = async () => {
  isDownloadingAll.value = true;
  for (const tool of tools.value) {
    if (!tool.downloaded) {
      await downloadTool(tool);
    }
  }
  isDownloadingAll.value = false;
};
</script>

