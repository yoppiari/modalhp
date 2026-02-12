<template>
  <div class="bg-gray-50 min-h-screen pb-24">
    <div class="bg-gray-800 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Link Bio Generator</h2>
      <p class="text-gray-400 text-sm opacity-90">Bikin halaman linktree sendiri gratis</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      
      <!-- Profile Section -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
         <h3 class="text-xs font-bold text-gray-500 uppercase mb-3">Profil Toko</h3>
         <div class="space-y-3">
            <input v-model="profile.name" placeholder="Nama Toko (@warungku)" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-gray-500" />
            <input v-model="profile.desc" placeholder="Deskripsi Singkat (Jualan aneka...)" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-gray-500" />
            
            <!-- Avatar Upload (Simple File Input) -->
            <div class="flex items-center gap-3">
               <div class="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <img v-if="profile.image" :src="profile.image" class="w-full h-full object-cover" />
                  <span v-else class="flex items-center justify-center h-full text-xs text-gray-400">Foto</span>
               </div>
               <input type="file" @change="handleImage" class="text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
            </div>
         </div>
      </div>

      <!-- Links Section -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
         <div class="flex justify-between items-center mb-3">
            <h3 class="text-xs font-bold text-gray-500 uppercase">Daftar Link</h3>
            <button @click="addLink" class="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">+ Tambah</button>
         </div>
         
         <div class="space-y-3">
            <div v-for="(link, idx) in links" :key="idx" class="flex gap-2 items-start">
               <div class="flex-1 space-y-1">
                  <input v-model="link.title" placeholder="Judul (ex: Order WA)" class="w-full p-2 bg-slate-50 rounded-lg text-xs border-none focus:ring-1 focus:ring-gray-500" />
                  <input v-model="link.url" placeholder="URL (https://...)" class="w-full p-2 bg-slate-50 rounded-lg text-xs border-none focus:ring-1 focus:ring-gray-500" />
               </div>
               <button @click="removeLink(idx)" class="text-gray-400 hover:text-red-500 p-1">×</button>
            </div>
         </div>
      </div>

      <!-- Preview & Generate -->
      <div>
         <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">Preview Hasil</h3>
         <div class="border rounded-xl overflow-hidden shadow-lg transform scale-95 origin-top bg-white">
             <!-- Live Preview rendered via raw HTML/CSS logic mimicking the output -->
             <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center min-h-[300px] flex flex-col items-center">
                 <div class="w-20 h-20 rounded-full bg-white mb-3 overflow-hidden border-2 border-white">
                    <img :src="profile.image || PLACEHOLDER_IMAGE_URL" class="w-full h-full object-cover">
                 </div>
                 <h1 class="text-white font-bold text-xl mb-1">{{ profile.name || 'Nama Toko' }}</h1>
                 <p class="text-indigo-100 text-sm mb-6">{{ profile.desc || 'Deskripsi toko anda disini...' }}</p>
                 
                 <div class="w-full space-y-3">
                    <div v-for="(l, i) in links" :key="i" class="bg-white/90 backdrop-blur text-indigo-900 py-3 px-4 rounded-full text-sm font-bold shadow-sm">
                       {{ l.title || 'Link Item' }}
                    </div>
                 </div>
             </div>
         </div>
         
         <div class="flex gap-3 mt-4">
            <button @click="copyHTML" class="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold shadow-lg">
               📋 Copy HTML Code
            </button>
             <button @click="downloadHTML" class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg">
               💾 Download File
            </button>
         </div>
         
         <p class="text-[10px] text-center text-gray-400 mt-2">File HTML bisa di-upload ke Hosting atau Google Drive untuk jadi website.</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { WHATSAPP_API_URL, PLACEHOLDER_IMAGE_URL } from '@/utils/constants';

const profile = reactive({
  name: '',
  desc: '',
  image: null
});

const links = ref([
   { title: 'Chat WhatsApp', url: `${WHATSAPP_API_URL}...` },
   { title: 'Toko Shopee', url: '' }
]);

const handleImage = (e) => {
   const file = e.target.files[0];
   if (file) {
      const reader = new FileReader();
      reader.onload = (e) => profile.image = e.target.result;
      reader.readAsDataURL(file);
   }
};

const addLink = () => links.value.push({ title: '', url: '' });
const removeLink = (i) => links.value.splice(i, 1);

const generateTemplate = () => {
   return `<!DOCTYPE html>
<html>
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>${profile.name} - Links</title>
   <style>
      body { background: linear-gradient(135deg, #6366f1, #a855f7); font-family: sans-serif; min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; color: white; margin: 0; }
      .avatar { width: 96px; height: 96px; border-radius: 50%; border: 3px solid white; margin-bottom: 12px; object-fit: cover; background: #eee; }
      h1 { margin: 0 0 8px 0; font-size: 24px; }
      p { margin: 0 0 32px 0; opacity: 0.9; text-align: center; font-size: 14px; max-width: 400px; }
      .links { width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 12px; }
      .btn { background: rgba(255,255,255,0.95); color: #4338ca; text-decoration: none; padding: 16px; border-radius: 50px; text-align: center; font-weight: bold; transition: transform 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .btn:hover { transform: scale(1.02); background: white; }
   </style>
</head>
<body>
   <img src="${profile.image || ''}" class="avatar">
   <h1>${profile.name}</h1>
   <p>${profile.desc}</p>
   <div class="links">
      ${links.value.map(l => `<a href="${l.url}" class="btn" target="_blank">${l.title}</a>`).join('')}
   </div>
</body>
</html>`;
};

const copyHTML = () => {
   navigator.clipboard.writeText(generateTemplate());
   alert('HTML Code berhasil dicopy! Paste di Notepad dan simpan sebagai .html');
};

const downloadHTML = () => {
   const blob = new Blob([generateTemplate()], { type: 'text/html' });
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   link.download = `mylinks-${profile.name.replace(/\s+/g, '-').toLowerCase() || 'site'}.html`;
   link.click();
};
</script>
