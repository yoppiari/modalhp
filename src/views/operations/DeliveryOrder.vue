<template>
  <div class="bg-indigo-50 min-h-screen pb-24">
    <div class="bg-indigo-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Surat Jalan</h2>
      <p class="text-indigo-100 text-sm opacity-90">Dokumen pengantar barang (Tanpa Harga)</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      
      <!-- Info Section -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
         <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Nomor Surat Jalan</label>
            <input v-model="form.number" placeholder="SJ-001" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-indigo-500 font-bold" />
         </div>
         <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Penerima / Toko</label>
            <input v-model="form.receiver" placeholder="Nama Customer" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-indigo-500" />
         </div>
         <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Alamat / Tujuan</label>
            <textarea v-model="form.address" placeholder="Alamat Pengiriman" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-indigo-500" rows="2"></textarea>
         </div>
         <div>
            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Kirim</label>
            <input v-model="form.date" type="date" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-indigo-500" />
         </div>
      </div>

      <!-- Items -->
      <div>
         <div class="flex justify-between items-center mb-2 px-1">
            <h3 class="font-bold text-slate-700 text-sm">List Barang</h3>
            <button @click="addItem" class="text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1 rounded-full">+ Tambah</button>
         </div>
         
         <div class="space-y-2">
            <div v-for="(item, idx) in form.items" :key="idx" class="flex gap-2 items-center bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
               <input v-model.number="item.qty" type="number" placeholder="Qty" class="w-16 p-2 bg-slate-50 rounded-lg text-center font-bold text-sm" />
               <input v-model="item.name" placeholder="Nama Barang" class="flex-1 p-2 bg-slate-50 rounded-lg text-sm" />
               <input v-model="item.unit" placeholder="Satuan" class="w-16 p-2 bg-slate-50 rounded-lg text-center text-xs text-slate-500" />
               <button @click="removeItem(idx)" class="text-slate-300 hover:text-red-500 px-2">×</button>
            </div>
         </div>
      </div>

      <!-- Action -->
      <button @click="generatePDF" class="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-all">
         📄 Cetak PDF
      </button>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Ensure we have this or use manual text

const form = reactive({
   number: 'SJ-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-001',
   receiver: '',
   address: '',
   date: new Date().toISOString().slice(0,10),
   items: [{ qty: 1, name: '', unit: 'pcs' }]
});

const addItem = () => form.items.push({ qty: 1, name: '', unit: 'pcs' });
const removeItem = (i) => form.items.splice(i, 1);

const generatePDF = () => {
   const doc = new jsPDF();
   
   // Header
   doc.setFontSize(22);
   doc.setFont('helvetica', 'bold');
   doc.text('SURAT JALAN', 105, 20, { align: 'center' });
   
   doc.setFontSize(10);
   doc.setFont('helvetica', 'normal');
   doc.text('No: ' + form.number, 105, 27, { align: 'center' });

   // Sender Info (Fixed)
   doc.setFontSize(12);
   doc.setFont('helvetica', 'bold');
   doc.text('PENGIRIM:', 15, 40);
   doc.setFont('helvetica', 'normal');
   doc.setFontSize(10);
   doc.text('Warung Berkah\nJl. Contoh No. 123\nJakarta', 15, 46);

   // Receiver Info
   doc.setFontSize(12);
   doc.setFont('helvetica', 'bold');
   doc.text('PENERIMA:', 110, 40);
   doc.setFont('helvetica', 'normal');
   doc.setFontSize(10);
   doc.text(`${form.receiver}\n${form.address}\nTgl Kirim: ${form.date}`, 110, 46);

   // Table Header
   let y = 70;
   doc.setFillColor(240, 240, 240);
   doc.rect(15, y, 180, 10, 'F');
   doc.setFont('helvetica', 'bold');
   doc.text('QTY', 20, y+7);
   doc.text('UNIT', 40, y+7);
   doc.text('NAMA BARANG', 70, y+7);
   doc.text('CHECK', 180, y+7, { align: 'right' }); // Kolom cek fisik

   y += 10;
   doc.setFont('helvetica', 'normal');

   // Items
   form.items.forEach(item => {
      doc.text(item.qty.toString(), 20, y+7);
      doc.text(item.unit, 40, y+7);
      doc.text(item.name, 70, y+7);
      doc.rect(175, y+2, 6, 6); // Checkbox
      
      doc.line(15, y+10, 195, y+10); // horizontal line
      y += 10;
   });

   // Footer Signatures
   y += 20;
   doc.text('Penerima', 30, y);
   doc.text('Hormat Kami', 150, y);
   
   doc.text('( ....................... )', 20, y+25);
   doc.text('( ....................... )', 140, y+25);

   doc.save(`surat-jalan-${form.number}.pdf`);
};
</script>
