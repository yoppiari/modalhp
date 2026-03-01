<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <!-- Breadcrumb Header -->
    <div class="mb-6 flex items-center gap-3">
      <button @click="$router.push('/apps/ekstra')" class="bg-white p-2 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
        <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
      </button>
      <div class="flex flex-col">
        <span class="text-xs text-slate-500 font-medium">Ekstra</span>
        <h1 class="text-xl font-bold text-slate-800 leading-tight">Bantuan CS</h1>
      </div>
    </div>

    <div class="space-y-4">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <component :is="MailIcon" size="32" class="text-blue-500" />
        </div>
        <h2 class="text-lg font-bold text-slate-800 text-center mb-2">Hubungi Customer Service</h2>
        <p class="text-slate-500 text-sm text-center mb-6">
          Sampaikan pertanyaan atau masalah Anda. Tim kami akan segera membalas melalui email.
        </p>
        
        <form @submit.prevent="submitForm" class="space-y-4 text-left">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="Masukkan nama Anda">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email Balasan</label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm" placeholder="email@anda.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Pesan / Pertanyaan</label>
            <textarea v-model="form.message" required rows="4" class="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none" placeholder="Tuliskan pesan Anda di sini..."></textarea>
          </div>
          
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            <component :is="activeIcon" size="20" :class="{'animate-spin': isSubmitting}" />
            {{ isSubmitting ? 'Mengirim...' : (isSuccess ? 'Terkirim!' : 'Kirim Pesan') }}
          </button>
        </form>
      </div>

      <!-- Alternative Info Card -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
        <component :is="InfoIcon" size="20" class="text-slate-400 shrink-0 mt-0.5" />
        <p class="text-xs text-slate-500 leading-relaxed">
          Jam operasional CS kami adalah Senin-Jumat, 09:00 - 17:00 WIB. Email di luar jam kerja akan dibalas pada hari kerja berikutnya.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ArrowLeft as ArrowLeftIcon, Mail as MailIcon, Info as InfoIcon, Loader2 as Loader2Icon, CheckCircle2 as CheckCircle2Icon } from 'lucide-vue-next';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSubmitting = ref(false);
const isSuccess = ref(false);

const activeIcon = computed(() => {
  if (isSubmitting.value) return Loader2Icon;
  if (isSuccess.value) return CheckCircle2Icon;
  return MailIcon;
});

const submitForm = async () => {
  if (isSubmitting.value) return;
  
  isSubmitting.value = true;
  isSuccess.value = false;
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/support`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...form.value,
        type: 'CS'
      })
    });
    
    if (!response.ok) throw new Error('Gagal mengirim');
    
    isSuccess.value = true;
    form.value.message = ''; // Reset message
    
    setTimeout(() => {
      isSuccess.value = false;
    }, 3000);
    
    alert('Pesan berhasil dikirim! Kami akan membalas ke email Anda.');
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Maaf, ada kendala saat mengirim pesan. Coba lagi nanti.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
