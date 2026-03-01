<template>
  <div class="bg-slate-50 min-h-screen pb-24 relative">
    <!-- Top Bar -->
    <div class="bg-indigo-600 px-4 pt-4 pb-8 rounded-b-[2rem] shadow-lg sticky top-0 z-10">
      <div class="flex justify-between items-center text-white mb-4">
        <h2 class="font-bold text-lg">Kasir Warung</h2>
        <div class="bg-indigo-500/50 px-3 py-1 rounded-full text-xs font-mono">
           {{ cartTotalItems }} items
        </div>
      </div>
      
      <!-- Search Bar -->
      <div class="bg-white/10 backdrop-blur p-1 rounded-xl flex items-center border border-white/20">
         <span class="pl-3 text-indigo-200">🔍</span>
         <input v-model="searchQuery" placeholder="Cari barang..." class="w-full bg-transparent border-none text-white placeholder-indigo-200 focus:ring-0 text-sm p-3" />
      </div>
    </div>

    <!-- Product Grid -->
    <div class="px-4 mt-4 grid grid-cols-2 gap-3 pb-32">
       <div v-for="product in filteredProducts" :key="product.id" 
            @click="addToCart(product)"
            class="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-32 active:scale-95 transition-transform relative overflow-hidden">
          
          <div v-if="product.stock <= 0" class="absolute inset-0 bg-white/60 flex items-center justify-center font-bold text-red-500 text-sm z-10 backdrop-blur-[1px]">HABIS</div>
          
          <div>
            <h3 class="font-medium text-slate-800 text-sm line-clamp-2 leading-snug">{{ product.name }}</h3>
            <p class="text-[10px] text-slate-400 mt-1">{{ product.category }}</p>
          </div>
          <div class="flex justify-between items-end mt-2">
            <span class="font-bold text-indigo-600 text-sm">Rp {{ formatK(product.price) }}</span>
            <div class="bg-indigo-50 text-indigo-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shadow-sm">+</div>
          </div>
       </div>
    </div>

    <!-- Cart Floating Action -->
    <div v-if="cart.length > 0" class="fixed bottom-0 inset-x-0 p-4 z-[100] bg-white border-t border-slate-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
       <div class="flex justify-between items-center mb-4" @click="showCartDetail = !showCartDetail">
          <div>
             <div class="text-xs text-slate-400">Total Belanja</div>
             <div class="text-2xl font-bold text-indigo-700">Rp {{ formatNumber(cartTotal) }}</div>
          </div>
          <div class="bg-indigo-50 p-2 rounded-full cursor-pointer">
             <span class="text-indigo-600 text-xl font-bold" :class="showCartDetail ? 'rotate-180 block' : ''">^</span>
          </div>
       </div>
       
       <!-- Cart Detail Expandable -->
       <div v-if="showCartDetail" class="max-h-60 overflow-y-auto mb-4 space-y-2 border-t border-slate-100 pt-2 text-sm">
          <div v-for="(item, idx) in cart" :key="idx" class="flex justify-between items-center py-1">
             <div class="flex gap-2 items-center">
                 <button @click="decreaseQty(idx)" class="w-6 h-6 bg-slate-100 rounded-full text-slate-500 font-bold flex items-center justify-center">-</button>
                 <span class="font-bold w-4 text-center">{{ item.qty }}</span>
                 <button @click="increaseQty(idx)" class="w-6 h-6 bg-indigo-50 rounded-full text-indigo-600 font-bold flex items-center justify-center">+</button>
             </div>
             <div class="flex-1 px-3 truncate">{{ item.name }}</div>
             <div class="font-medium">Rp {{ formatNumber(item.subtotal) }}</div>
          </div>
       </div>

       <button @click="checkout" class="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all flex justify-between px-6">
          <span>Proses Bayar</span>
          <span>→</span>
       </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../../db';
import { liveQuery } from 'dexie';
import { useObservable } from '@vueuse/rxjs';

const searchQuery = ref('');
const showCartDetail = ref(false);
const cart = ref([]);

// Using useObservable for reactive Dexie query
const products = useObservable(
  liveQuery(() => db.products.where('is_active').equals(1).toArray())
);

const filteredProducts = computed(() => {
   if (!products.value) return [];
   let list = products.value;
   if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || (p.code && p.code.toLowerCase().includes(q)));
   }
   return list;
});

const cartTotal = computed(() => cart.value.reduce((sum, item) => sum + item.subtotal, 0));
const cartTotalItems = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0));

const addToCart = (product) => {
   if (product.stock <= 0) return alert('Stok Habis!');
   
   // Check stock vs cart qty logic could be added here
   
   const existing = cart.value.find(i => i.product_id === product.id);
   if (existing) {
      existing.qty++;
      existing.subtotal = existing.qty * existing.price_at_sale;
   } else {
      cart.value.push({
         product_id: product.id,
         name: product.name,
         price_at_sale: product.price,
         cost_at_sale: product.cost, // Important for profit calculation
         qty: 1,
         subtotal: product.price
      });
   }
};

const increaseQty = (idx) => {
   cart.value[idx].qty++;
   cart.value[idx].subtotal = cart.value[idx].qty * cart.value[idx].price_at_sale;
};

const decreaseQty = (idx) => {
  if (cart.value[idx].qty > 1) {
    cart.value[idx].qty--;
    cart.value[idx].subtotal = cart.value[idx].qty * cart.value[idx].price_at_sale;
  } else {
    cart.value.splice(idx, 1);
    if (cart.value.length === 0) showCartDetail.value = false;
  }
};

const checkout = async () => {
   if (!confirm(`Total Bayar: Rp ${formatNumber(cartTotal.value)}. Proses?`)) return;

   const transaction = {
      date: Date.now(),
      invoice_number: `INV-${Date.now()}`,
      type: 'SALE',
      payment_method: 'CASH', // Hardcoded for now, can add selector
      total_amount: cartTotal.value, 
      final_amount: cartTotal.value,
      discount: 0,
   };

   try {
      await db.transaction('rw', db.transactions, db.transaction_items, db.products, async () => {
         // 1. Save Transaction
         const transId = await db.transactions.add(transaction);

         // 2. Save Items & Update Stock
         for (const item of cart.value) {
            await db.transaction_items.add({
               transaction_id: transId,
               product_id: item.product_id,
               product_name_at_sale: item.name,
               price_at_sale: item.price_at_sale,
               cost_at_sale: item.cost_at_sale,
               qty: item.qty,
               subtotal: item.subtotal
            });

            // Decrement Stock
            const product = await db.products.get(item.product_id);
            if (product) {
               await db.products.update(item.product_id, { stock: product.stock - item.qty });
            }
         }
      });
      
      alert('Transaksi Berhasil!');
      cart.value = [];
      showCartDetail.value = false;
   } catch (e) {
      console.error(e);
      alert('Gagal memproses transaksi');
   }
};

const formatNumber = (n) => new Intl.NumberFormat('id-ID').format(n);
const formatK = (n) => {
   if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
   return n;
};
</script>
