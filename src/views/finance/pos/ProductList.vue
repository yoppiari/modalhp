<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <!-- Header -->
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6">
      <div class="flex justify-between items-center">
        <div>
           <h2 class="text-2xl font-bold">Produk Saya</h2>
           <p class="text-indigo-100 text-sm opacity-90">Kelola barang jualan & stok</p>
        </div>
        <button @click="showForm = true" class="bg-white text-indigo-600 p-3 rounded-full shadow-lg active:scale-95 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    </div>

    <div class="px-4 max-w-md mx-auto">
      <!-- Search -->
      <div class="bg-white p-2 rounded-xl border border-slate-100 shadow-sm mb-4 flex gap-2">
         <input v-model="searchQuery" placeholder="Cari nama barang..." class="flex-1 p-2 bg-transparent border-none focus:ring-0 text-sm" />
      </div>

      <!-- Product List -->
      <div class="space-y-3">
        <div v-for="product in products" :key="product.id" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
          <div>
            <h3 class="font-bold text-slate-800">{{ product.name }}</h3>
            <div class="text-xs text-slate-500 flex gap-2 mt-1">
               <span class="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{{ product.category }}</span>
               <span>Stok: <b :class="product.stock < 5 ? 'text-red-500' : 'text-slate-700'">{{ product.stock }}</b></span>
            </div>
          </div>
          <div class="text-right">
             <div class="font-bold text-indigo-600">Rp {{ formatNumber(product.price) }}</div>
             <div class="text-[10px] text-slate-400">Modal: {{ formatNumber(product.cost) }}</div>
             <div class="mt-2 flex gap-2 justify-end">
                <button @click="editProduct(product)" class="text-xs text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded">Edit</button>
                <button @click="deleteProduct(product.id)" class="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Hapus</button>
             </div>
          </div>
        </div>
        
        <div v-if="products.length === 0" class="text-center py-10 text-slate-400 text-sm">
           Belum ada produk. Tambah sekarang!
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div v-if="showForm" class="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
       <div class="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl animate-slide-up">
          <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit Produk' : 'Tambah Produk Baru' }}</h3>
          
          <div class="space-y-3">
             <div>
               <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Produk</label>
               <input v-model="form.name" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Contoh: Kopi Susu Gula Aren" />
             </div>
             
             <div class="grid grid-cols-2 gap-3">
               <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Harga Jual</label>
                 <input v-model.number="form.price" type="number" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm" />
               </div>
                <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Harga Modal (HPP)</label>
                 <input v-model.number="form.cost" type="number" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm" />
               </div>
             </div>

             <div class="grid grid-cols-2 gap-3">
               <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Stok Awal</label>
                 <input v-model.number="form.stock" type="number" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm" />
               </div>
                <div>
                 <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                 <input v-model="form.category" class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 text-sm" list="categories" />
                 <datalist id="categories">
                   <option>Makanan</option>
                   <option>Minuman</option>
                   <option>Jasa</option>
                   <option>Lainnya</option>
                 </datalist>
               </div>
             </div>
          </div>
          
          <div class="flex gap-3 mt-6">
             <button @click="resetForm" class="flex-1 py-3 text-slate-500 font-bold bg-slate-100 rounded-xl">Batal</button>
             <button @click="saveProduct" class="flex-1 py-3 text-white font-bold bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">Simpan</button>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { db } from '../../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const showForm = ref(false);
const searchQuery = ref('');

// Reactive Form
const form = reactive({
  id: null,
  name: '',
  price: 0,
  cost: 0,
  stock: 0,
  category: '',
  code: ''
});

// Live Query for Products
const products = useObservable(
  liveQuery(() => {
    if (searchQuery.value) {
       return db.products
        .where('name').startsWithIgnoreCase(searchQuery.value)
        .toArray();
    }
    return db.products.toArray();
  })
);

const saveProduct = async () => {
   if (!form.name) return alert('Nama produk wajib diisi');
   
   const payload = {
      name: form.name,
      price: form.price || 0,
      cost: form.cost || 0,
      stock: form.stock || 0,
      category: form.category || 'Umum',
      code: form.code || Math.random().toString(36).substring(7), // Simple auto-code
      is_active: 1,
      updated_at: Date.now()
   };

   try {
     if (form.id) {
       await db.products.update(form.id, payload);
     } else {
       await db.products.add({ ...payload, created_at: Date.now() });
     }
     resetForm();
   } catch (error) {
     console.error('Failed to save', error);
     alert('Gagal menyimpan produk: ' + error.message);
   }
};

const editProduct = (p) => {
  form.id = p.id;
  form.name = p.name;
  form.price = p.price;
  form.cost = p.cost;
  form.stock = p.stock;
  form.category = p.category;
  form.code = p.code;
  showForm.value = true;
};

const deleteProduct = async (id) => {
  if (confirm('Yakin hapus produk ini?')) {
     await db.products.delete(id);
  }
};

const resetForm = () => {
  showForm.value = false;
  form.id = null;
  form.name = '';
  form.price = 0;
  form.cost = 0;
  form.stock = 0;
  form.category = '';
  form.code = '';
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
