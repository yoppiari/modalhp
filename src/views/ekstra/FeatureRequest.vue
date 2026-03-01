<template>
  <div class="px-4 py-6 max-w-2xl mx-auto">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button @click="$router.push('/apps/ekstra')" class="bg-white p-2 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
          <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
        </button>
        <div>
          <h1 class="text-2xl font-bold text-slate-800 leading-tight">Feature Requests</h1>
          <p class="text-sm text-slate-500">Bantu kami menentukan fitur selanjutnya</p>
        </div>
      </div>
      <button 
        @click="showModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
      >
        <component :is="PlusIcon" size="16" />
        <span class="hidden sm:inline">Ajukan Fitur</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <component :is="Loader2Icon" class="animate-spin text-blue-500" size="32" />
    </div>

    <!-- Empty State -->
    <div v-else-if="features.length === 0" class="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
      <div class="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <component :is="LightbulbIcon" size="32" class="text-slate-400" />
      </div>
      <h3 class="text-lg font-bold text-slate-800 mb-2">Belum Ada Request</h3>
      <p class="text-slate-500 text-sm mb-6 max-w-sm mx-auto">Jadilah yang pertama untuk mengusulkan ide brilian agar aplikasi ini semakin baik.</p>
      <button @click="showModal = true" class="text-blue-600 font-medium hover:text-blue-700">Ajukan Ide Pertama</button>
    </div>

    <!-- Feature List -->
    <div v-else class="space-y-4">
      <div 
        v-for="feature in features" 
        :key="feature.id"
        class="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex gap-4 shadow-sm hover:border-slate-200 transition-colors"
      >
        <!-- Vote Button Column -->
        <div class="shrink-0 flex flex-col items-center">
          <button 
            @click="toggleVote(feature)"
            :class="[
              'w-12 h-14 rounded-xl flex flex-col items-center justify-center border transition-all',
              feature.hasVoted 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
            ]"
            :disabled="votingId === feature.id"
          >
            <component 
              :is="votingId === feature.id ? Loader2Icon : ChevronUpIcon" 
              size="24" 
              :class="{'animate-spin': votingId === feature.id, 'mb-0.5': true}" 
            />
            <span class="text-sm font-bold leading-none">{{ feature.votesCount }}</span>
          </button>
        </div>

        <!-- Content Column -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2 mb-1">
            <h3 class="font-bold text-slate-800 truncate text-base sm:text-lg">{{ feature.title }}</h3>
            <span :class="['px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold whitespace-nowrap', getStatusColor(feature.status)]">
              {{ feature.status }}
            </span>
          </div>
          <p class="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-3">{{ feature.description }}</p>
          <div class="text-xs text-slate-400 flex items-center gap-2">
            <span>{{ formatDate(feature.createdAt) }}</span>
            <span v-if="feature.authorEmail" class="hidden sm:inline">&bull; </span>
            <span v-if="feature.authorEmail" class="hidden sm:inline truncate">{{ feature.authorEmail.split('@')[0] }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- New Request Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-xl" @click.stop>
        <div class="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-slate-800">Ajukan Ide Fitur</h2>
          <button @click="showModal = false" class="text-slate-400 hover:text-slate-600 p-1">
            <component :is="XIcon" size="20" />
          </button>
        </div>
        
        <form @submit.prevent="submitFeature" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Judul Singkat <span class="text-red-500">*</span></label>
            <input v-model="form.title" type="text" required maxlength="100" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Contoh: Ekspor laporan ke PDF">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Deskripsi & Alasan <span class="text-red-500">*</span></label>
            <textarea v-model="form.description" required rows="4" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm resize-none" placeholder="Tolong bantu jelaskan masalah apa yang diselesaikan fitur ini..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Email <span class="text-red-500">*</span> </label>
            <input v-model="form.email" type="email" required class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm" placeholder="Sebagai ID Vote agar tidak dobel">
            <p class="text-[11px] text-slate-400 mt-1">Satu email hanya bisa vote 1x per fitur.</p>
          </div>
          
          <div class="pt-4 flex gap-3">
            <button type="button" @click="showModal = false" class="flex-1 px-4 py-3 rounded-xl font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Batal
            </button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 px-4 py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors flex justify-center items-center gap-2">
              <component v-if="isSubmitting" :is="Loader2Icon" class="animate-spin" size="18" />
              Kirim Ide
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ArrowLeft as ArrowLeftIcon, Plus as PlusIcon, ChevronUp as ChevronUpIcon, Loader2 as Loader2Icon, Lightbulb as LightbulbIcon, X as XIcon } from 'lucide-vue-next';

// Generate a random stable id if user has no email to track votes anonymously (fallback)
const getAnonymousId = () => {
  let id = localStorage.getItem('anon_vote_id');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('anon_vote_id', id);
  }
  return id;
};

// Try to get email from localStorage (assume they might be logged in), else use anon
const getVoterId = () => {
    // For simplicity right now, if they submitted an email in a past request, remember it
    let storedEmail = localStorage.getItem('voter_email');
    return storedEmail || getAnonymousId();
};


const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const features = ref([]);
const loading = ref(true);
const showModal = ref(false);
const isSubmitting = ref(false);
const votingId = ref(null);

const form = ref({
  title: '',
  description: '',
  email: localStorage.getItem('voter_email') || ''
});

const loadFeatures = async () => {
    loading.value = true;
    try {
        const voterId = getVoterId();
        const res = await fetch(`${apiUrl}/api/features?email=${encodeURIComponent(voterId)}`);
        const data = await res.json();
        features.value = data;
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadFeatures();
});

const getStatusColor = (status) => {
    const map = {
        'PENDING': 'bg-slate-100 text-slate-600 border border-slate-200',
        'PLANNED': 'bg-amber-50 text-amber-600 border border-amber-200',
        'IN_PROGRESS': 'bg-blue-50 text-blue-600 border border-blue-200',
        'COMPLETED': 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    };
    return map[status] || map['PENDING'];
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' });
};

const toggleVote = async (feature) => {
    if (votingId.value) return;
    votingId.value = feature.id;
    
    // Optimistic UI Update
    const originalVoted = feature.hasVoted;
    feature.hasVoted = !feature.hasVoted;
    feature.votesCount += feature.hasVoted ? 1 : -1;

    try {
        let voterId = getVoterId();
        // Prompt for email if they haven't set one and used an anon ID (for better tracking, optional but good UX)
        if (voterId.startsWith('anon_')) {
            const tempMail = prompt("Masukkan email Anda untuk merekam vote secara permanen (atau biarkan kosong untuk anonymous):");
            if (tempMail) {
                voterId = tempMail;
                localStorage.setItem('voter_email', voterId);
            }
        }

        await fetch(`${apiUrl}/api/features/${feature.id}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: voterId })
        });
        
    } catch (e) {
        console.error(e);
        // Revert 
        feature.hasVoted = originalVoted;
        feature.votesCount += feature.hasVoted ? 1 : -1;
    } finally {
        votingId.value = null;
    }
};

const submitFeature = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    try {
        // Save email for future voting
        if(form.value.email) {
            localStorage.setItem('voter_email', form.value.email);
        }

        const res = await fetch(`${apiUrl}/api/features`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value)
        });
        
        if (res.ok) {
            showModal.value = false;
            form.value.title = '';
            form.value.description = '';
            await loadFeatures();
        } else {
            alert('Gagal mengirim fitur.');
        }
    } catch (e) {
        console.error(e);
        alert('Terjadi kesalahan koneksi.');
    } finally {
        isSubmitting.value = false;
    }
};
</script>
