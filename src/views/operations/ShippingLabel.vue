<template>
  <div class="bg-orange-50 min-h-screen pb-24">
    <div class="bg-orange-600 text-white p-6 rounded-b-[2.5rem] shadow-lg mb-6 sticky top-0 z-10">
      <h2 class="text-2xl font-bold">Label Pengiriman</h2>
      <p class="text-orange-100 text-sm opacity-90">Cetak label resi paket otomatis</p>
    </div>

    <div class="px-4 max-w-md mx-auto space-y-6">
      <!-- Sender & Receiver Form -->
      <div class="bg-white p-5 rounded-2xl shadow-sm border border-orange-100 space-y-4">
          <!-- Sender (Sender is usually fixed, but editable) -->
          <div>
            <div class="flex justify-between items-center mb-1">
               <label class="text-xs font-bold text-slate-500 uppercase">Pengirim</label>
               <button @click="loadSender" class="text-[10px] text-orange-600 font-bold bg-orange-50 px-2 rounded opacity-50 hover:opacity-100">Load Profil</button>
            </div>
            <input v-model="form.senderName" placeholder="Nama Toko" class="w-full p-2 bg-slate-50 rounded-lg text-sm mb-2 border-none focus:ring-1 focus:ring-orange-500" />
            <input v-model="form.senderPhone" placeholder="0812..." class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-orange-500" />
          </div>

          <div class="border-b border-dashed border-slate-200"></div>

          <!-- Receiver -->
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase mb-1">Penerima</label>
            <input v-model="form.receiverName" placeholder="Nama Penerima" class="w-full p-2 bg-slate-50 rounded-lg text-sm mb-2 border-none focus:ring-1 focus:ring-orange-500" />
            <input v-model="form.receiverPhone" placeholder="0812..." class="w-full p-2 bg-slate-50 rounded-lg text-sm mb-2 border-none focus:ring-1 focus:ring-orange-500" />
            <textarea v-model="form.receiverAddress" placeholder="Alamat Lengkap (Jalan, RT/RW, Kota, Kode Pos)" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-orange-500" rows="3"></textarea>
          </div>

          <!-- Logistics -->
          <div>
             <label class="text-xs font-bold text-slate-500 uppercase mb-1">Kurir / Ekspedisi</label>
             <div class="grid grid-cols-4 gap-2">
                <button v-for="c in couriers" :key="c" @click="form.courier = c" 
                   :class="form.courier === c ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'"
                   class="py-2 rounded-lg text-xs font-bold transition-all">
                   {{ c }}
                </button>
             </div>
             <input v-model="form.resi" placeholder="No. Resi / Booking (Opsional)" class="w-full mt-2 p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-orange-500" />
          </div>

           <!-- Content Note -->
          <div>
            <label class="text-xs font-bold text-slate-500 uppercase mb-1">Isi Paket / Catatan</label>
            <input v-model="form.note" placeholder="Contoh: Fragile / Hati-hati" class="w-full p-2 bg-slate-50 rounded-lg text-sm border-none focus:ring-1 focus:ring-orange-500" />
          </div>
      </div>

      <!-- Action -->
      <div class="flex gap-3">
         <button @click="resetForm" class="flex-1 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold text-sm">Reset</button>
         <button @click="generatePDF" class="flex-[2] py-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all">
            🖨️ Cetak Label (PDF)
         </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { jsPDF } from 'jspdf';

const couriers = ['JNE', 'J&T', 'SiCepat', 'Shopee'];

const form = reactive({
   senderName: '',
   senderPhone: '',
   receiverName: '',
   receiverPhone: '',
   receiverAddress: '',
   courier: 'J&T',
   resi: '',
   note: ''
});

const loadSender = () => {
   // In real app, load from settings DB
   form.senderName = 'Warung Berkah';
   form.senderPhone = '0812-9999-8888';
};

const resetForm = () => {
   form.receiverName = '';
   form.receiverPhone = '';
   form.receiverAddress = '';
   form.resi = '';
   form.note = '';
};

const generatePDF = () => {
   // A6 Size (105 x 148 mm) - Standard Thermal Label
   const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [105, 148]
   });

   // Courier Header
   doc.setFillColor(255, 87, 34); // Orange header
   doc.rect(0, 0, 105, 20, 'F');
   doc.setTextColor(255, 255, 255);
   doc.setFontSize(24);
   doc.setFont('helvetica', 'bold');
   doc.text(form.courier, 52.5, 13, { align: 'center' });

   // Resi Barcode Placeholder (Simple Box)
   doc.setFillColor(0, 0, 0);
   if (form.resi) {
      doc.rect(10, 25, 85, 15, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(form.resi, 52.5, 34, { align: 'center' });
   }

   // Receiver
   doc.setTextColor(0,0,0);
   doc.setFontSize(10);
   doc.text('Kepada:', 10, 50);
   doc.setFontSize(14);
   doc.setFont('helvetica', 'bold');
   doc.text(form.receiverName, 10, 56);
   doc.setFontSize(12);
   doc.setFont('helvetica', 'normal');
   doc.text(form.receiverPhone, 10, 62);
   
   // Address with word wrap
   doc.setFontSize(10);
   const splitAddress = doc.splitTextToSize(form.receiverAddress, 85);
   doc.text(splitAddress, 10, 68);

   const addressHeight = splitAddress.length * 5;
   let y = 68 + addressHeight + 10;

   doc.setLineWidth(0.5);
   doc.line(10, y, 95, y);
   y += 10;

   // Sender
   doc.setFontSize(8);
   doc.setTextColor(100, 100, 100);
   doc.text('Pengirim:', 10, y);
   doc.setTextColor(0, 0, 0);
   doc.setFontSize(10);
   doc.setFont('helvetica', 'bold');
   doc.text(`${form.senderName} (${form.senderPhone})`, 25, y);

   y += 10;
   // Note
   if (form.note) {
      doc.setFillColor(240, 240, 240);
      doc.roundedRect(10, y, 85, 15, 2, 2, 'F');
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.text(`Catatan: ${form.note}`, 15, y + 9);
   }

   doc.save(`label-${form.receiverName}.pdf`);
};
</script>
