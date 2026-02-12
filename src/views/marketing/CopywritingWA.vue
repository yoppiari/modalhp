<template>
  <div class="bg-teal-50 min-h-screen pb-24">
    <div class="bg-teal-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Autotext WA</h2>
      <p class="text-teal-100 text-sm opacity-90">Template chat biar gak bingung</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-4">
       <!-- Categories -->
       <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button v-for="cat in categories" :key="cat.id" 
                  @click="selectedCat = cat.id"
                  :class="selectedCat === cat.id ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'"
                  class="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-sm border border-transparent transition-all">
             {{ cat.name }}
          </button>
       </div>

       <!-- Template List -->
       <div class="space-y-3">
          <div v-for="(tpl, idx) in filteredTemplates" :key="idx" class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
             <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-slate-700 text-sm">{{ tpl.title }}</h3>
                <span class="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400">{{ tpl.category }}</span>
             </div>
             
             <div class="bg-slate-50 p-3 rounded-lg text-xs leading-relaxed text-slate-600 whitespace-pre-wrap font-mono mb-3 border border-slate-100">
                {{ tpl.text }}
             </div>

             <div class="flex gap-2">
                <button @click="copyText(tpl.text)" class="flex-1 bg-white border border-teal-200 text-teal-600 py-2 rounded-lg text-xs font-bold active:bg-teal-50">
                   📋 Salin Teks
                </button>
                <button @click="sendWA(tpl.text)" class="flex-1 bg-teal-500 text-white py-2 rounded-lg text-xs font-bold shadow-md active:scale-95">
                   📱 Kirim WA
                </button>
             </div>
          </div>
       </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { WHATSAPP_API_URL } from '@/utils/constants';

const selectedCat = ref('greeting');

const categories = [
   { id: 'greeting', name: '👋 Sapaan Awal' },
   { id: 'followup', name: '⏳ Follow Up' },
   { id: 'closing', name: '💰 Closing / Bayar' },
   { id: 'promo', name: '🎉 Info Promo' }
];

const templates = [
   { category: 'greeting', title: 'Sapa Pelanggan Baru', text: 'Halo Kak! 👋 Terimakasih sudah menghubungi kami.\n\nAda yang bisa kami bantu? Silakan lihat katalog kami dulu ya kak.' },
   { category: 'greeting', title: 'Respon Stok Ready', text: 'Halo Kak, untuk produk tersebut STOK READY ya! 😊\n\nMau dikirim hari ini? Silakan isi form order berikut:\nNama:\nAlamat:\nNo HP:' },
   
   { category: 'followup', title: 'Tanya Jadi Order', text: 'Halo Kak, bagaimana dengan orderannya? 🤔\n\nKebetulan stoknya tinggal sedikit nih. Kalau kaka jadi ambil, aku simpankan slot pengiriman hari ini ya.' },
   { category: 'followup', title: 'Konfirmasi Sudah Transfer', text: 'Halo Kak, mohon maaf mau konfirmasi lagi, apakah sudah jadi transfer? 🙏\n\nKarena ada customer lain yang mau ambil produk yang sama. Ditunggu kabarnya ya kak.' },
   
   { category: 'closing', title: 'Info Rekening', text: 'Baik Kak, Totalnya jadi Rp [HARGA].\n\nSilakan transfer ke:\nBCA: 1234567890 (a.n Toko Saya)\n\nMohon kirim bukti transfer jika sudah ya kak! 🙏' },
   { category: 'closing', title: 'Terima Kasih', text: 'Terima kasih kak sudah belanja di toko kami! 🙏\n\nDitunggu paketnya sampai ya. Semoga suka dengan produknya. Ditunggu orderan selanjutnya!' },

   { category: 'promo', title: 'Promo Gajian', text: 'PROMO GAJIAN! 🎉\n\nDapatkan diskon 20% khusus pembelian hari ini. Stok terbatas lho kak.\n\nYuk buruan order sebelum kehabisan!' }
];

const filteredTemplates = computed(() => {
   return templates.filter(t => t.category === selectedCat.value);
});

const copyText = (text) => {
   navigator.clipboard.writeText(text);
   alert('Teks berhasil disalin!');
};

const sendWA = (text) => {
   window.open(`${WHATSAPP_API_URL}?text=${encodeURIComponent(text)}`, '_blank');
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
