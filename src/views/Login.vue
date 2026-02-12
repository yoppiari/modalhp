<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-slate-800">Login ModalHP</h1>
        <p class="text-slate-500 text-sm mt-2">Masuk untuk mengakses tools</p>
      </div>

      <div v-if="!otpSent">
        <form @submit.prevent="handleRequestOtp" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              v-model="email" 
              type="email" 
              required 
              placeholder="nama@email.com"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
          </div>
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Mengirim...' : 'Kirim Kode OTP' }}
          </button>
        </form>
      </div>

      <div v-else>
        <form @submit.prevent="handleVerifyOtp" class="space-y-4">
          <div class="text-center mb-4">
            <p class="text-sm text-slate-600">Kode OTP telah dikirim ke <strong>{{ email }}</strong></p>
            <button @click="otpSent = false" type="button" class="text-xs text-blue-600 hover:underline">Ubah Email</button>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Kode OTP</label>
            <input 
              v-model="otpCode" 
              type="text" 
              required 
              placeholder="123456"
              class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-center tracking-widest text-xl"
            >
          </div>
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {{ loading ? 'Memverifikasi...' : 'Masuk Aplikasi' }}
          </button>
        </form>
      </div>
      
      <p v-if="error" class="mt-4 text-center text-red-500 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const otpCode = ref('');
const otpSent = ref(false);
const loading = ref(false);
const error = ref('');

const API_URL = '/api/auth'; // Relative path via Vite Proxy

const handleRequestOtp = async () => {
  loading.value = true;
  error.value = '';
  try {
    console.log(`Sending to ${API_URL}/otp`);
    const res = await fetch(`${API_URL}/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    });
    
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server Error: ${res.status} - ${text}`);
    }
    
    otpSent.value = true;
  } catch (err) {
    console.error(err);
    error.value = `Gagal: ${err.message}. Pastikan backend running (cek port di .env/terminal).`;
  } finally {
    loading.value = false;
  }
};

const handleVerifyOtp = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, code: otpCode.value })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verifikasi gagal');

    // Store user/token
    localStorage.setItem('user_token', data.token); // Mock token
    localStorage.setItem('user_data', JSON.stringify(data.user));

    // Redirect to Dashboard
    router.push('/apps');
  } catch (err) {
    error.value = err.message || 'Kode salah';
  } finally {
    loading.value = false;
  }
};
</script>
