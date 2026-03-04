<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Header -->
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6">
       <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Laporan Harian</h2>
          <p class="text-indigo-100 text-sm opacity-90">Pantau performa jualanmu hari ini</p>
        </div>
        <button @click="exportReport" class="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors backdrop-blur-sm">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
        </button>
       </div>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">

      <!-- Date Picker -->
      <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
         <button @click="changeDate(-1)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600 active:bg-slate-200">‹</button>
         <div class="text-center relative">
            <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tanggal Laporan</div>
            <div class="font-bold text-slate-700 flex items-center justify-center gap-1">
               {{ formattedDate }}
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <input
               type="date"
               v-model="dateInputValue"
               class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
         </div>
         <button @click="changeDate(1)" class="w-8 h-8 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600 active:bg-slate-200">›</button>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-2 gap-3">
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="text-xs text-slate-500 mb-1">Total Omzet</div>
            <div class="text-xl font-bold text-indigo-600">Rp {{ formatK(summary.total) }}</div>
         </div>
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="text-xs text-slate-500 mb-1">Transaksi</div>
            <div class="text-xl font-bold text-slate-700">{{ summary.count }}x</div>
         </div>
         <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 col-span-2">
            <div class="flex justify-between items-center">
               <div>
                 <div class="text-xs text-slate-500 mb-1">Rata-rata Keranjang</div>
                 <div class="text-lg font-bold text-slate-700">Rp {{ formatNumber(summary.avg) }}</div>
               </div>
               <div class="bg-indigo-50 p-2 rounded-lg">
                  📈
               </div>
            </div>
         </div>
      </div>

      <!-- Chart Section -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="font-bold text-slate-700 mb-4 ml-1">Grafik Penjualan per Jam</h3>
        <div class="h-48">
          <Line v-if="chartData" :data="chartData" :options="chartOptions" />
          <div v-else class="h-full flex items-center justify-center text-slate-400 text-sm">
            Belum ada data untuk ditampilkan
          </div>
        </div>
      </div>

      <!-- Payment Method Breakdown -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="font-bold text-slate-700 mb-4 ml-1">Metode Pembayaran</h3>
        <div class="space-y-3">
          <div v-for="(item, key) in paymentBreakdown" :key="key" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg" :class="paymentColors[key] || 'bg-slate-100'">
                {{ paymentIcons[key] || '💵' }}
              </div>
              <div>
                <p class="text-sm font-bold text-slate-700">{{ key }}</p>
                <p class="text-xs text-slate-500">{{ item.count }}x transaksi</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-slate-700">Rp {{ formatNumber(item.total) }}</p>
              <p class="text-xs text-slate-500">{{ item.percentage }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="font-bold text-slate-700 mb-4 ml-1">Produk Terlaris</h3>
        <div class="space-y-3">
          <div v-for="(product, idx) in topProducts" :key="idx" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" :class="idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-slate-100 text-slate-600' : idx === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'">
                {{ idx + 1 }}
              </div>
              <span class="text-sm font-medium text-slate-700">{{ product.name }}</span>
            </div>
            <span class="text-sm font-bold text-slate-700">{{ product.qty }}x</span>
          </div>
          <div v-if="topProducts.length === 0" class="text-center py-4 text-slate-400 text-sm">
            Belum ada data produk terlaris
          </div>
        </div>
      </div>

      <!-- Transaction List -->
      <div>
         <h3 class="font-bold text-slate-700 mb-3 ml-1">Riwayat Transaksi</h3>
         <div class="space-y-3">
            <div v-for="t in transactions" :key="t.id" class="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
               <div>
                  <div class="font-bold text-slate-700 text-sm">{{ t.invoice_number }}</div>
                  <div class="text-[10px] text-slate-400">{{ formatTime(t.date) }} • {{ t.payment_method }}</div>
               </div>
               <div class="text-right">
                  <div class="font-bold text-indigo-600 text-sm">Rp {{ formatNumber(t.total_amount) }}</div>
               </div>
            </div>

            <div v-if="transactions.length === 0" class="text-center py-8 text-slate-400 text-sm">
               Belum ada transaksi hari ini.
            </div>
         </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { db } from '../../db';
import { liveQuery } from 'dexie';
import { useBusinessProfile } from '../../composables/useBusinessProfile';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const selectedDate = ref(new Date());
const { businessProfile, hasProfile } = useBusinessProfile();

// Reactive data
const transactions = ref([]);
const transactionItems = ref([]);

// Fetch transactions for selected date
const fetchTransactions = async () => {
  const start = startOfDay.value;
  const end = endOfDay.value;

  transactions.value = await db.transactions
    .where('date')
    .between(start, end, true, true)
    .reverse()
    .toArray();

  // Fetch transaction items for these transactions
  const transactionIds = transactions.value.map(t => t.id);
  if (transactionIds.length > 0) {
    transactionItems.value = await db.transaction_items
      .where('transaction_id')
      .anyOf(...transactionIds)
      .toArray();
  } else {
    transactionItems.value = [];
  }
};

// Watch date changes and refetch data
watch(selectedDate, () => {
  fetchTransactions();
}, { immediate: true });

const startOfDay = computed(() => {
   const d = new Date(selectedDate.value);
   d.setHours(0,0,0,0);
   return d.getTime();
});

const endOfDay = computed(() => {
   const d = new Date(selectedDate.value);
   d.setHours(23,59,59,999);
   return d.getTime();
});

const summary = computed(() => {
   const list = transactions.value || [];
   const total = list.reduce((sum, t) => sum + t.total_amount, 0);
   const count = list.length;
   return {
      total,
      count,
      avg: count ? total / count : 0
   };
});

// Chart data - sales per hour
const chartData = computed(() => {
  const list = transactions.value || [];
  if (list.length === 0) return null;

  const hourlyData = new Array(24).fill(0);
  const hourlyCount = new Array(24).fill(0);

  list.forEach(t => {
    const hour = new Date(t.date).getHours();
    hourlyData[hour] += t.total_amount;
    hourlyCount[hour]++;
  });

  // Only include hours that have data
  const labels = [];
  const data = [];
  const backgroundColor = [];
  const borderColor = [];

  for (let i = 0; i < 24; i++) {
    if (hourlyData[i] > 0) {
      labels.push(`${i}:00`);
      data.push(hourlyData[i]);
      backgroundColor.push('rgba(99, 102, 241, 0.2)');
      borderColor.push('rgba(99, 102, 241, 1)');
    }
  }

  return {
    labels,
    datasets: [
      {
        label: 'Omzet per Jam',
        data,
        backgroundColor,
        borderColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}jt`;
          if (value >= 1000) return `${(value / 1000).toFixed(0)}rb`;
          return value;
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

// Payment method breakdown
const paymentBreakdown = computed(() => {
  const list = transactions.value || [];
  const breakdown = {};
  const total = list.reduce((sum, t) => sum + t.total_amount, 0);

  list.forEach(t => {
    const method = t.payment_method || 'CASH';
    if (!breakdown[method]) {
      breakdown[method] = { count: 0, total: 0 };
    }
    breakdown[method].count++;
    breakdown[method].total += t.total_amount;
  });

  // Calculate percentage
  Object.keys(breakdown).forEach(key => {
    breakdown[key].percentage = total > 0 ? Math.round((breakdown[key].total / total) * 100) : 0;
  });

  return breakdown;
});

const paymentColors = {
  CASH: 'bg-green-100',
  TRANSFER: 'bg-blue-100',
  QRIS: 'bg-purple-100',
  DEBT: 'bg-orange-100',
  OTHER: 'bg-slate-100'
};

const paymentIcons = {
  CASH: '💵',
  TRANSFER: '🏦',
  QRIS: '📱',
  DEBT: '📒',
  OTHER: '💳'
};

// Top products
const topProducts = computed(() => {
  const items = transactionItems.value || [];
  const productMap = {};

  items.forEach(item => {
    const name = item.product_name_at_sale || 'Unknown';
    if (!productMap[name]) {
      productMap[name] = 0;
    }
    productMap[name] += item.qty;
  });

  return Object.entries(productMap)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);
});

const changeDate = (days) => {
   const d = new Date(selectedDate.value);
   d.setDate(d.getDate() + days);
   selectedDate.value = d;
};

const dateInputValue = computed({
   get: () => {
      const d = new Date(selectedDate.value);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   },
   set: (val) => {
      if (val) {
         selectedDate.value = new Date(val);
      }
   }
});

const formattedDate = computed(() => {
   return new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(selectedDate.value);
});

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
const formatK = (n) => {
   if (n >= 1000000) return (n / 1000000).toFixed(1) + 'jt';
   if (n >= 1000) return (n / 1000).toFixed(0) + 'rb';
   return n;
};
const formatTime = (ts) => new Date(ts).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
const formatDate = (ts) => new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Export to PDF
const exportReport = async () => {
  const doc = new jsPDF();
  const shopName = hasProfile.value ? businessProfile.value.businessName : 'ModalHP Report';

  // Header
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(shopName, 14, 20);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Laporan Harian', 14, 28);
  doc.text(`Tanggal: ${formattedDate.value}`, 14, 35);

  // Summary
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Ringkasan', 14, 45);

  doc.setFont('helvetica', 'normal');
  doc.text(`Total Omzet: Rp ${formatNumber(summary.value.total)}`, 14, 52);
  doc.text(`Jumlah Transaksi: ${summary.value.count}x`, 14, 58);
  doc.text(`Rata-rata Keranjang: Rp ${formatNumber(summary.value.avg)}`, 14, 64);

  // Transactions table
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Daftar Transaksi', 14, 75);

  const tableData = (transactions.value || []).map(t => [
    t.invoice_number,
    formatTime(t.date),
    t.payment_method,
    `Rp ${formatNumber(t.total_amount)}`
  ]);

  doc.autoTable({
    startY: 80,
    head: [['Invoice', 'Jam', 'Pembayaran', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241] }
  });

  // Save
  const fileName = `Laporan_${selectedDate.value.toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
</script>
