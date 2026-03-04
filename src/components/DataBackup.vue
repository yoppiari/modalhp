<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
    <div class="flex items-center gap-3 mb-4">
      <div class="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shadow-sm border border-emerald-200/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="stroke-current" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      </div>
      <div>
        <h3 class="font-bold text-slate-800 leading-tight">Backup & Restore Data</h3>
        <p class="text-[10px] text-slate-500 font-medium">Export/import semua data transaksi, produk, dll.</p>
      </div>
    </div>

    <!-- Backup Size Info -->
    <div v-if="backupSize" class="mb-4 bg-slate-50 rounded-lg p-3">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-semibold text-slate-600">Ukuran Backup</span>
        <span class="text-[11px] text-slate-500">{{ backupSize }}</span>
      </div>
      <p class="text-[10px] text-slate-400 mt-1">Data: Produk, Transaksi, Pelanggan, Karyawan, Kasbon, Stok</p>
    </div>

    <!-- Export Button -->
    <button
      @click="handleExport"
      :disabled="isExporting"
      class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait mb-3"
    >
      <svg v-if="!isExporting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      <span v-if="isExporting">Mengexport...</span>
      <span v-else>📥 Export Data (.mdl)</span>
    </button>

    <!-- Import Section -->
    <div class="border-t border-slate-100 pt-4">
      <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1">
        Import Data Backup
      </label>

      <div class="relative">
        <input
          ref="fileInput"
          type="file"
          accept=".mdl"
          @change="handleFileSelect"
          class="hidden"
        />
        <button
          @click="$refs.fileInput.click()"
          :disabled="isImporting"
          class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
        >
          <svg v-if="!isImporting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          <span v-if="isImporting">Mengimport...</span>
          <span v-else>📁 Pilih File .mdl</span>
        </button>
      </div>

      <!-- Warning -->
      <div class="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-600 mt-0.5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="12" y2="12"/></svg>
        <p class="text-[10px] text-amber-700 leading-tight">
          <strong>Perhatian!</strong> Import akan mengganti SEMUA data existing. Pastikan sudah export data lama sebelum import.
        </p>
      </div>
    </div>

    <!-- Status Message -->
    <div v-if="statusMessage" class="mt-4 rounded-xl p-3 text-xs font-medium" :class="statusType === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { exportData, importData, getBackupSizeEstimate } from '../composables/useDataBackup';

const fileInput = ref(null);
const isExporting = ref(false);
const isImporting = ref(false);
const backupSize = ref('');
const statusMessage = ref('');
const statusType = ref('');

onMounted(async () => {
  backupSize.value = await getBackupSizeEstimate();
});

const handleExport = async () => {
  isExporting.value = true;
  statusMessage.value = '';

  const result = await exportData();

  isExporting.value = false;

  if (result.success) {
    // Trigger download
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    statusType.value = 'success';
    statusMessage.value = '✅ Data berhasil diexport! File akan terdownload otomatis.';
  } else {
    statusType.value = 'error';
    statusMessage.value = result.error;
  }

  setTimeout(() => {
    statusMessage.value = '';
  }, 5000);
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Confirm before import
  const confirmed = confirm(
    '⚠️ PERINGATAN: Import akan REPLACE semua data existing!\n\n' +
    'Apakah Anda yakin sudah export data lama?\n\n' +
    'Klik OK untuk lanjut, atau BATAL untuk membatalkan.'
  );

  if (!confirmed) {
    event.target.value = '';
    return;
  }

  isImporting.value = true;
  statusMessage.value = '';

  const result = await importData(file);

  isImporting.value = false;
  event.target.value = '';

  if (result.success) {
    statusType.value = 'success';
    statusMessage.value = `✅ ${result.message}`;

    // Reload page after 2 seconds
    setTimeout(() => {
      location.reload();
    }, 2000);
  } else {
    statusType.value = 'error';
    statusMessage.value = result.error;
  }

  setTimeout(() => {
    statusMessage.value = '';
  }, 10000);
};
</script>
