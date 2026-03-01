<template>
  <div class="bg-white rounded-xl shadow p-4">
    <div class="flex items-center justify-between mb-3">
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

    <!-- Storage Indicator -->
    <div v-if="storageInfo.supported" class="mb-4 bg-slate-50 rounded-lg p-3">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[11px] font-semibold text-slate-600">💾 Penyimpanan Offline</span>
        <span class="text-[11px] text-slate-500">{{ storageInfo.usedText }} / {{ storageInfo.totalText }}</span>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div 
          class="h-2 rounded-full transition-all duration-500"
          :class="storageInfo.percent > 80 ? 'bg-red-500' : storageInfo.percent > 50 ? 'bg-amber-500' : 'bg-emerald-500'"
          :style="{ width: storageInfo.percent + '%' }"
        ></div>
      </div>
      <p class="text-[10px] mt-1" :class="storageInfo.percent > 80 ? 'text-red-500' : 'text-slate-400'">
        {{ storageInfo.percent > 80 ? '⚠ Penyimpanan hampir penuh' : 'Sisa ' + storageInfo.freeText + ' tersedia' }}
      </p>
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const STORAGE_KEY = 'modalhp-offline-tools';
const router = useRouter();
const tools = ref([]);
const isDownloadingAll = ref(false);
const storageInfo = reactive({
  supported: false,
  usedText: '–',
  totalText: '–',
  freeText: '–',
  percent: 0
});

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

// Format bytes to human-readable string
const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

// Update storage usage info using Storage API
const updateStorageInfo = async () => {
  if (!navigator.storage?.estimate) return;
  storageInfo.supported = true;
  try {
    const { usage, quota } = await navigator.storage.estimate();
    const free = quota - usage;
    storageInfo.usedText = formatBytes(usage);
    storageInfo.totalText = formatBytes(quota);
    storageInfo.freeText = formatBytes(free);
    storageInfo.percent = Math.round((usage / quota) * 100);
  } catch {
    storageInfo.supported = false;
  }
};

// Read downloaded tool IDs from localStorage (instant, synchronous)
const getDownloadedIds = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

// Save a tool ID as downloaded to localStorage
const markAsDownloaded = (toolId) => {
  const ids = getDownloadedIds();
  if (!ids.includes(toolId)) {
    ids.push(toolId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
};

onMounted(() => {
  const routes = router.getRoutes();
  const orderedKeys = Object.keys(APP_DETAILS);
  const downloadedIds = getDownloadedIds();
  
  const mappedTools = routes
    .filter(r => APP_DETAILS[r.name])
    .map(r => {
      const isDownloaded = downloadedIds.includes(r.name);
      return {
        id: r.name,
        name: APP_DETAILS[r.name].name,
        description: APP_DETAILS[r.name].desc,
        status: isDownloaded ? 'Offline Ready' : 'Cloud Only',
        downloaded: isDownloaded,
        loading: false,
        loader: r.components?.default
      };
    })
    .sort((a, b) => orderedKeys.indexOf(a.id) - orderedKeys.indexOf(b.id));

  tools.value = mappedTools;
  updateStorageInfo();
});

const downloadTool = async (tool) => {
  if (!tool.loader || typeof tool.loader !== 'function') return;
  
  tool.loading = true;
  try {
    await tool.loader();
    tool.downloaded = true;
    tool.status = 'Offline Ready';
    markAsDownloaded(tool.id);
    await updateStorageInfo();
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
