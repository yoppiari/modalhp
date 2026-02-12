<template>
  <div class="bg-sky-50 min-h-screen pb-24">
    <div class="bg-sky-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">QR WiFi</h2>
      <p class="text-sky-100 text-sm opacity-90">Bikin pelanggan connect tanpa tanya password</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
       <!-- Input -->
       <div class="bg-white p-5 rounded-2xl shadow-sm border border-sky-100 space-y-3">
          <div>
             <label class="text-xs font-bold text-slate-500 uppercase">Nama Wifi (SSID)</label>
             <input v-model="ssid" placeholder="Contoh: Warung Kopi Free" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
             <label class="text-xs font-bold text-slate-500 uppercase">Password</label>
             <input v-model="password" type="text" placeholder="Rahasia123" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
             <label class="text-xs font-bold text-slate-500 uppercase">Keamanan</label>
             <select v-model="encryption" class="w-full p-3 bg-slate-50 rounded-xl text-sm border-none focus:ring-2 focus:ring-sky-500">
                <option value="WPA">WPA/WPA2 (Umum)</option>
                <option value="WEP">WEP (Jadul)</option>
                <option value="nopass">Tanpa Password</option>
             </select>
          </div>
       </div>

       <!-- QR Result -->
       <div class="bg-white p-8 rounded-2xl shadow-lg border border-sky-100 text-center">
          <canvas ref="canvas" class="mx-auto rounded-xl shadow-sm border border-slate-100"></canvas>
          <p class="text-xs text-slate-400 mt-4">Simpan atau Screenshot gambar ini, lalu cetak dan tempel di meja pelanggan.</p>
       </div>
       
       <button @click="generate" class="w-full bg-sky-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-sky-200 active:scale-95 transition-all">
          🔄 Generate QR
       </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';

const ssid = ref('');
const password = ref('');
const encryption = ref('WPA');
const canvas = ref(null);

const generate = () => {
   if (!ssid.value) return;
   
   // Format: WIFI:T:WPA;S:MyNetwork;P:mypass;;
   const text = `WIFI:T:${encryption.value};S:${ssid.value};P:${password.value};;`;
   
   QRCode.toCanvas(canvas.value, text, {
      width: 200,
      margin: 2,
      color: {
         dark: '#0284c7',
         light: '#ffffff'
      }
   });
};

onMounted(() => {
   // Initial Render placeholder
   generate();
});
</script>
