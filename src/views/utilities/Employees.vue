<!-- v2.1 - Karyawan & Kasbon Management -->
<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Header -->
    <div class="bg-emerald-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Karyawan</h2>
          <p class="text-emerald-100 text-sm opacity-90">Kelola data karyawan & kasbon</p>
        </div>
        <button @click="showAddModal = true" class="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-colors backdrop-blur-sm">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
      <!-- Search -->
      <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-2">
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input v-model="searchQuery" type="text" placeholder="Cari karyawan..." class="w-full bg-transparent border-none text-slate-700 text-sm focus:ring-0 outline-none">
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div class="text-xs text-slate-500 mb-1">Total Karyawan</div>
          <div class="text-2xl font-bold text-emerald-600">{{ filteredEmployees.length }}</div>
        </div>
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div class="text-xs text-slate-500 mb-1">Total Kasbon Aktif</div>
          <div class="text-2xl font-bold text-orange-600">{{ totalActiveKasbon }}</div>
        </div>
      </div>

      <!-- Employee List -->
      <div>
        <h3 class="font-bold text-slate-700 mb-3 ml-1">Daftar Karyawan</h3>
        <div class="space-y-3">
          <div v-for="emp in filteredEmployees" :key="emp.id" class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                  {{ emp.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <h4 class="font-bold text-slate-800">{{ emp.name }}</h4>
                  <p class="text-xs text-slate-500">{{ emp.position }} • {{ emp.nik }}</p>
                </div>
              </div>
              <div class="flex gap-2">
                <button @click="editEmployee(emp)" class="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button @click="deleteEmployee(emp)" class="p-2 text-slate-400 hover:text-red-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              {{ emp.phone || '-' }}
            </div>
            <!-- Quick Actions -->
            <div class="flex gap-2 mt-3 pt-3 border-t border-slate-100">
              <button @click="addKasbon(emp)" class="flex-1 bg-orange-50 text-orange-600 py-2 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors">
                + Kasbon
              </button>
              <button @click="viewKasbon(emp)" class="flex-1 bg-slate-50 text-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">
                Lihat Kasbon
              </button>
            </div>
          </div>

          <div v-if="filteredEmployees.length === 0" class="text-center py-8 text-slate-400 text-sm">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Belum ada karyawan. Tambahkan karyawan pertama Anda!
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Employee Modal -->
    <div v-if="showAddModal || editMode" class="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full">
        <h3 class="text-lg font-bold text-slate-800 mb-4">{{ editMode ? 'Edit Karyawan' : 'Tambah Karyawan' }}</h3>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">NIK</label>
            <input v-model="form.nik" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Nama Lengkap</label>
            <input v-model="form.name" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Jabatan</label>
            <input v-model="form.position" type="text" placeholder="Kasir, Pelayan, Dapur, dll" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">No. Telepon / WA</label>
            <input v-model="form.phone" type="tel" placeholder="0812..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="closeModal" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold transition-colors">
            Batal
          </button>
          <button @click="saveEmployee" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors">
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Add Kasbon Modal -->
    <div v-if="showKasbonModal" class="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Tambah Kasbon</h3>
        <p class="text-sm text-slate-500 mb-4">{{ selectedEmployee?.name }}</p>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Tanggal</label>
            <input v-model="kasbonForm.date" type="date" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Jumlah Kasbon</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">Rp</span>
              <input v-model.number="kasbonForm.amount" type="number" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none">
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Catatan</label>
            <textarea v-model="kasbonForm.note" rows="2" placeholder="Untuk keperluan apa?" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none resize-none"></textarea>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showKasbonModal = false" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold transition-colors">
            Batal
          </button>
          <button @click="saveKasbon" class="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold transition-colors">
            Simpan Kasbon
          </button>
        </div>
      </div>
    </div>

    <!-- View Kasbon Modal -->
    <div v-if="showViewKasbonModal" class="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-slate-800">Riwayat Kasbon</h3>
          <button @click="showViewKasbonModal = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="text-sm text-slate-500 mb-4">{{ selectedEmployee?.name }}</p>

        <div class="space-y-3">
          <div v-for="k in employeeKasbon" :key="k.id" class="border border-slate-100 rounded-xl p-3">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="text-xs text-slate-400">{{ formatDate(k.date) }}</p>
                <p class="text-sm font-bold text-slate-700 mt-1">Rp {{ formatNumber(k.amount) }}</p>
              </div>
              <span class="text-xs px-2 py-1 rounded-full font-bold" :class="k.status === 'ACTIVE' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'">
                {{ k.status === 'ACTIVE' ? 'Aktif' : 'Lunas' }}
              </span>
            </div>
            <p class="text-xs text-slate-500 mb-2">{{ k.note || '-' }}</p>
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400">Sisa: <span class="font-bold text-slate-600">Rp {{ formatNumber(k.remaining) }}</span></span>
              <button v-if="k.status === 'ACTIVE'" @click="payKasbon(k)" class="text-emerald-600 font-bold hover:text-emerald-700">
                Bayar
              </button>
            </div>
          </div>
          <div v-if="employeeKasbon.length === 0" class="text-center py-6 text-slate-400 text-sm">
            Belum ada riwayat kasbon
          </div>
        </div>
      </div>
    </div>

    <!-- Pay Kasbon Modal -->
    <div v-if="showPayKasbonModal" class="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full">
        <h3 class="text-lg font-bold text-slate-800 mb-4">Bayar Kasbon</h3>
        <p class="text-sm text-slate-500 mb-4">Sisa kasbon: <span class="font-bold text-orange-600">Rp {{ formatNumber(selectedKasbon?.remaining) }}</span></p>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Jumlah Bayar</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">Rp</span>
              <input v-model.number="payForm.amount" type="number" :max="selectedKasbon?.remaining" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none">
            </div>
          </div>
          <div class="bg-emerald-50 p-3 rounded-xl">
            <p class="text-xs text-emerald-600">Sisa setelah bayar: <span class="font-bold">Rp {{ formatNumber((selectedKasbon?.remaining || 0) - (payForm.amount || 0)) }}</span></p>
          </div>
        </div>

        <div class="flex gap-3 mt-6">
          <button @click="showPayKasbonModal = false" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-3 rounded-xl font-bold transition-colors">
            Batal
          </button>
          <button @click="confirmPayKasbon" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold transition-colors">
            Bayar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../db';

const searchQuery = ref('');
const showAddModal = ref(false);
const editMode = ref(false);
const showKasbonModal = ref(false);
const showViewKasbonModal = ref(false);
const showPayKasbonModal = ref(false);

const employees = ref([]);
const kasbonList = ref([]);
const selectedEmployee = ref(null);
const selectedKasbon = ref(null);
const employeeKasbon = ref([]);

const form = ref({
  id: null,
  nik: '',
  name: '',
  position: '',
  phone: '',
  is_active: 1
});

const kasbonForm = ref({
  employee_id: null,
  date: new Date().toISOString().split('T')[0],
  amount: 0,
  note: ''
});

const payForm = ref({
  amount: 0
});

const filteredEmployees = computed(() => {
  if (!searchQuery.value) return employees.value;
  const q = searchQuery.value.toLowerCase();
  return employees.value.filter(emp =>
    emp.name.toLowerCase().includes(q) ||
    emp.nik.toLowerCase().includes(q) ||
    emp.position.toLowerCase().includes(q)
  );
});

const totalActiveKasbon = computed(() => {
  return kasbonList.value.filter(k => k.status === 'ACTIVE').length;
});

onMounted(async () => {
  await loadData();
});

const loadData = async () => {
  employees.value = await db.employees.orderBy('name').toArray();
  kasbonList.value = await db.kasbon.orderBy('date').reverse().toArray();
};

const closeModal = () => {
  showAddModal.value = false;
  editMode.value = false;
  form.value = { id: null, nik: '', name: '', position: '', phone: '', is_active: 1 };
};

const saveEmployee = async () => {
  if (!form.value.nik || !form.value.name) {
    alert('NIK dan Nama wajib diisi!');
    return;
  }

  try {
    if (editMode.value && form.value.id) {
      await db.employees.update(form.value.id, form.value);
    } else {
      await db.employees.add(form.value);
    }
    await loadData();
    closeModal();
  } catch (e) {
    console.error(e);
    alert('Gagal menyimpan karyawan');
  }
};

const editEmployee = (emp) => {
  form.value = { ...emp };
  editMode.value = true;
  showAddModal.value = true;
};

const deleteEmployee = async (emp) => {
  if (!confirm(`Hapus karyawan "${emp.name}"? Data kasbon akan tetap tersimpan.`)) return;

  try {
    await db.employees.delete(emp.id);
    await loadData();
  } catch (e) {
    console.error(e);
    alert('Gagal menghapus karyawan');
  }
};

const addKasbon = (emp) => {
  selectedEmployee.value = emp;
  kasbonForm.value = {
    employee_id: emp.id,
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    note: ''
  };
  showKasbonModal.value = true;
};

const saveKasbon = async () => {
  if (!kasbonForm.value.amount || kasbonForm.value.amount <= 0) {
    alert('Jumlah kasbon harus diisi!');
    return;
  }

  try {
    await db.kasbon.add({
      ...kasbonForm.value,
      remaining: kasbonForm.value.amount,
      status: 'ACTIVE'
    });
    await loadData();
    showKasbonModal.value = false;
  } catch (e) {
    console.error(e);
    alert('Gagal menyimpan kasbon');
  }
};

const viewKasbon = async (emp) => {
  selectedEmployee.value = emp;
  employeeKasbon.value = kasbonList.value.filter(k => k.employee_id === emp.id);
  showViewKasbonModal.value = true;
};

const payKasbon = (k) => {
  selectedKasbon.value = k;
  payForm.value = { amount: k.remaining };
  showPayKasbonModal.value = true;
};

const confirmPayKasbon = async () => {
  if (!payForm.value.amount || payForm.value.amount <= 0) {
    alert('Jumlah bayar harus diisi!');
    return;
  }

  try {
    const newRemaining = selectedKasbon.value.remaining - payForm.value.amount;
    const newStatus = newRemaining <= 0 ? 'PAID' : 'ACTIVE';

    await db.kasbon.update(selectedKasbon.value.id, {
      remaining: newRemaining,
      status: newStatus
    });

    await loadData();
    showPayKasbonModal.value = false;

    // Refresh employee kasbon view
    if (selectedEmployee.value) {
      employeeKasbon.value = kasbonList.value.filter(k => k.employee_id === selectedEmployee.value.id);
    }
  } catch (e) {
    console.error(e);
    alert('Gagal memproses pembayaran');
  }
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
const formatDate = (ts) => new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
</script>
