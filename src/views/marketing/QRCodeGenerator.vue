<template>
  <div class="pb-24">
    <!-- Header -->
    <div class="bg-emerald-600 px-4 pt-6 pb-6 rounded-b-[2rem] shadow-lg mb-6 shadow-emerald-600/20 relative overflow-hidden">
      <!-- Decorative background elements -->
       <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
       <div class="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10"></div>
       
      <div class="flex items-center gap-3 relative z-10 text-white mb-2">
        <button @click="$router.push('/apps')" class="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-xl font-bold leading-tight">QR Code Generator</h1>
          <p class="text-emerald-100 text-xs mt-0.5">Buat QR Teks, Link, Menu, dan WiFi</p>
        </div>
      </div>
    </div>

    <div class="px-4 space-y-6 max-w-md mx-auto relative z-10 -mt-8">
      <!-- Tabs -->
      <div class="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex gap-1 mb-6">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="flex-1 py-2 px-1 text-xs font-bold rounded-xl transition-all duration-300 relative"
          :class="activeTab === tab.id ? 'text-emerald-700 bg-emerald-50 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'">
          {{ tab.label }}
        </button>
      </div>

       <!-- Main Content Area -->
       <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          
          <!-- Tab 1: Link/URL -->
          <div v-if="activeTab === 'link'" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Tautan Website / URL</label>
              <input v-model="inputLink" type="url" placeholder="https://contoh.com" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-sm placeholder:text-slate-400">
              <p class="text-[10px] text-slate-500 mt-1.5 ml-1">QR akan mengarahkan ke website saat di-scan.</p>
            </div>
            <button @click="generateQR(inputLink)" :disabled="!inputLink" class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/20">
              Buat QR Code
            </button>
          </div>

          <!-- Tab 2: Teks -->
          <div v-if="activeTab === 'text'" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Masukkan Teks / Pesan</label>
              <textarea v-model="inputText" rows="3" placeholder="Ketik pesan rahasia, pengumuman, atau catatan di sini..." class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-sm placeholder:text-slate-400 resize-none"></textarea>
            </div>
             <button @click="generateQR(inputText)" :disabled="!inputText" class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/20">
              Buat QR Code
            </button>
          </div>

          <!-- Tab 3: WiFi -->
           <div v-if="activeTab === 'wifi'" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div class="bg-blue-50 text-blue-800 p-3 rounded-xl border border-blue-100 flex gap-3 text-xs mb-2">
              <svg class="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p>Pengunjung warung tinggal scan QR ini untuk otomatis terhubung ke WiFi tanpa perlu mengetik password.</p>
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama WiFi (SSID)</label>
              <input v-model="wifiSSID" type="text" placeholder="Contoh: Warkop Berkah" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-sm">
            </div>
             <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Password WiFi</label>
              <input v-model="wifiPassword" type="password" placeholder="Masukkan kata sandi" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-sm">
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Jenis Keamanan</label>
               <select v-model="wifiEncryption" class="w-full border-slate-200 rounded-xl px-4 py-3 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50 text-sm">
                 <option value="WPA">WPA/WPA2/WPA3 (Umum)</option>
                 <option value="WEP">WEP</option>
                 <option value="nopass">Tanpa Password</option>
               </select>
            </div>
            <button @click="generateWifiQR" :disabled="!wifiSSID" class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/20">
              Buat QR WiFi
            </button>
          </div>

          <!-- Tab 4: Menu Items -->
          <div v-if="activeTab === 'menu'" class="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div class="bg-indigo-50 text-indigo-800 p-3 rounded-xl border border-indigo-100 flex gap-3 text-xs mb-2">
              <svg class="w-5 h-5 flex-shrink-0 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p>Pilih produk untuk dijadikan QR berbentuk teks struk menu. Berguna jika Anda belum punya website menu.</p>
            </div>
             
             <button v-if="!isSelectingProducts" @click="openProductSelector" class="w-full border-2 border-dashed border-slate-300 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-2 transition-all">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
               <span>Pilih Produk dari Database</span>
             </button>

             <div v-else>
                 <div class="flex justify-between items-center mb-2">
                     <span class="text-sm font-bold text-slate-700">Daftar Menu Terpilih:</span>
                     <button @click="isSelectingProducts = false; selectedProducts = []" class="text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded hover:bg-red-100">Batal</button>
                 </div>
                 
                 <!-- List of Products to Select From -->
                 <div class="space-y-2 max-h-48 overflow-y-auto mb-4 border border-slate-100 p-2 rounded-xl bg-slate-50">
                    <div v-if="products.length === 0" class="text-center py-4 text-xs text-slate-500">Belum ada produk. Tambah di Kasir.</div>
                    <label v-for="product in products" :key="product.id" class="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 cursor-pointer hover:border-emerald-200">
                        <input type="checkbox" :value="product" v-model="selectedProducts" class="rounded text-emerald-500 focus:ring-emerald-500 w-4 h-4">
                        <div class="flex-1">
                            <p class="text-sm font-bold text-slate-700">{{product.name}}</p>
                            <p class="text-xs text-slate-500">{{formatCurrency(product.price)}}</p>
                        </div>
                    </label>
                 </div>

                 <button @click="generateMenuQR" :disabled="selectedProducts.length === 0" class="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] shadow-sm shadow-emerald-600/20">
                    Buat QR Menu ({{selectedProducts.length}} Produk)
                 </button>
             </div>
          </div>
       </div>

      <!-- QR Result Area -->
      <div v-show="qrCodeUrl" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center animate-in fade-in zoom-in duration-300 mt-6">
        <h3 class="text-center font-bold text-slate-800 mb-4 whitespace-pre-line">{{qrTitle}}</h3>
        
        <div class="bg-white p-3 rounded-2xl border-2 border-slate-100 mb-5 relative group">
           <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center pointer-events-none"></div>
           <img :src="qrCodeUrl" alt="QR Code" class="w-48 h-48 object-contain" />
        </div>
        
        <div class="flex gap-3 w-full">
           <button @click="shareQR" v-if="canShare" class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
            Kirim WA
          </button>
          <button @click="downloadQR" class="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Simpan HP
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import { db } from '../../db';

const tabs = [
  { id: 'link', label: 'Link' },
  { id: 'text', label: 'Teks' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'menu', label: 'Menu' }
];

const activeTab = ref('link');
const qrCodeUrl = ref('');
const qrTitle = ref('');

// Link & Text state
const inputLink = ref('');
const inputText = ref('');

// WiFi state
const wifiSSID = ref('');
const wifiPassword = ref('');
const wifiEncryption = ref('WPA');

// Menu state
const products = ref([]);
const isSelectingProducts = ref(false);
const selectedProducts = ref([]);

const canShare = ref(navigator.share !== undefined);

onMounted(async () => {
  // Load products for menu tab
  const data = await db.products.where('is_active').equals(1).toArray();
  products.value = data || [];
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

// Generic QR Generator
const generateQR = async (content) => {
  try {
    if(!content) return;
    qrCodeUrl.value = await QRCode.toDataURL(content, {
      width: 400,
      margin: 2,
      color: { dark: '#042f2e', light: '#ffffff' }
    });
    
    if(activeTab.value === 'link') qrTitle.value = 'Scan untuk Buka Link';
    if(activeTab.value === 'text') qrTitle.value = 'Scan untuk Baca Pesan';
    
  } catch (err) {
    console.error(err);
    alert('Gagal membuat QR Code');
  }
};

// WiFi QR specially formatted
const generateWifiQR = async () => {
    try {
        if(!wifiSSID.value) return;
        // Format: WIFI:T:WPA;S:Mynetwork;P:mypassword;;
        const hiddenInfo = false ? 'H:true;' : ''; // Add this option if needed later
        const pass = wifiEncryption.value !== 'nopass' ? `P:${wifiPassword.value};` : '';
        const wifiString = `WIFI:T:${wifiEncryption.value};S:${wifiSSID.value};${pass}${hiddenInfo};`;
        
        qrCodeUrl.value = await QRCode.toDataURL(wifiString, {
            width: 400,
            margin: 2,
            color: { dark: '#1e3a8a', light: '#ffffff' } // Blue-ish for wifi
        });
        qrTitle.value = `Scan untuk koneksi WiFi:\n"${wifiSSID.value}"`;
    } catch (err) {
        console.error(err);
        alert('Gagal membuat QR WiFi');
    }
};

const openProductSelector = () => {
    isSelectingProducts.value = true;
};

// Menu QR formatted as text list
const generateMenuQR = async () => {
    try {
        if(selectedProducts.value.length === 0) return;
        
        let menuText = "📜 DAFTAR MENU 📜\n\n";
        selectedProducts.value.forEach((p, index) => {
            menuText += `${index + 1}. ${p.name}\n   ${formatCurrency(p.price)}\n`;
        });
        menuText += "\nTerima kasih atas pesanannya!";

        qrCodeUrl.value = await QRCode.toDataURL(menuText, {
            width: 400,
            margin: 2,
            color: { dark: '#312e81', light: '#ffffff' } // Indigo-ish for menu
        });
        qrTitle.value = `Scan untuk melihat ${selectedProducts.value.length} Menu`;
        isSelectingProducts.value = false; // Close selector
    } catch (err) {
        console.error(err);
        alert('Gagal membuat QR Menu');
    }
}


const downloadQR = () => {
  if (!qrCodeUrl.value) return;
  const link = document.createElement('a');
  link.download = `QR_Code_${activeTab.value}_${Date.now()}.png`;
  link.href = qrCodeUrl.value;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const shareQR = async () => {
    if (!qrCodeUrl.value || !canShare.value) return;
    
    try {
        // Convert dataUrl to blob to share image
        const response = await fetch(qrCodeUrl.value);
        const blob = await response.blob();
        const file = new File([blob], `QR_Code.png`, { type: 'image/png' });

        await navigator.share({
            title: 'QR Code',
            text: 'Ini QR Code untuk Anda dari ModalHP',
            files: [file]
        });
    } catch (error) {
        console.log('Error sharing', error);
         // Fallback if sharing image fails (some devices only support text API)
         alert('Berbagi langsung mungkin tidak didukung di perangkat/browser ini. Silakan gunakan tombol Simpan HP.');
    }
};

</script>
