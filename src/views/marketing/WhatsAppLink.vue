<template>
  <div class="bg-slate-50 min-h-screen pb-24">
    <div class="bg-green-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6">
      <h2 class="text-2xl font-bold">WA Link Maker</h2>
      <p class="text-green-100 text-sm opacity-90">Bikin link chat WhatsApp instan</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div>
           <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nomor WhatsApp</label>
           <div class="flex items-center bg-slate-50 rounded-xl px-3 border border-transparent focus-within:ring-2 focus-within:ring-green-500 focus-within:bg-white transition-all">
             <span class="text-slate-400 font-bold mr-2 text-sm">🇮🇩 +62</span>
             <input v-model="phone" type="tel" placeholder="812-3456-7890" class="w-full py-3 bg-transparent border-none focus:ring-0 text-sm font-medium" />
           </div>
        </div>
        <div>
           <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Pesan Otomatis</label>
           <textarea v-model="message" rows="4" placeholder="Halo kak, saya mau tanya..." class="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-green-500 text-sm font-medium resize-none"></textarea>
        </div>
      </div>
      
      <transition name="page">
        <div v-if="generatedLink" class="bg-green-50 p-4 rounded-2xl border border-green-200">
          <p class="text-xs text-green-700 font-bold mb-2 uppercase">Preview Link:</p>
          <div class="break-all text-xs text-slate-600 bg-white p-2 rounded border border-green-100 mb-3 font-mono">
            {{ generatedLink }}
          </div>
          <button @click="copyLink" class="w-full bg-white text-green-700 border border-green-200 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-green-50 transition-all flex items-center justify-center gap-2">
             <span>Salin Link</span>
          </button>
        </div>
      </transition>

      <button @click="generate" class="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 active:scale-95 transition-all">
        Buat Link Sekarang
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { WHATSAPP_API_URL } from '@/utils/constants';

const phone = ref('');
const message = ref('');
const generatedLink = ref('');

const generate = () => {
  let p = phone.value.replace(/\D/g, '');
  if (p.startsWith('0')) p = '62' + p.substring(1);
  if (!p.startsWith('62')) p = '62' + p;
  
  const encodedMsg = encodeURIComponent(message.value);
  generatedLink.value = `${WHATSAPP_API_URL}${p}?text=${encodedMsg}`;
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(generatedLink.value);
    alert('Link copied!');
  } catch (err) {
    console.error('Failed to copy', err);
  }
};
</script>
