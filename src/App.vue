<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 pb-24">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Bottom Nav: Only show in Apps -->
    <nav v-if="showNav" class="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-around p-2 pb-4 shadow-lg z-50">
      <router-link to="/apps" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300" active-class="text-blue-600 scale-110" exact-active-class="font-semibold text-blue-600">
        <component :is="HomeIcon" size="24" stroke-width="2" />
        <span class="text-[10px]">Home</span>
      </router-link>
      <router-link to="/apps/ekstra" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300" active-class="text-blue-600 scale-110">
         <component :is="StarIcon" size="24" stroke-width="2" />
         <span class="text-[10px]">Ekstra</span>
      </router-link>
      <router-link to="/apps/settings" class="flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300" active-class="text-blue-600 scale-110">
        <component :is="SettingsIcon" size="24" stroke-width="2" />
        <span class="text-[10px]">Settings</span>
      </router-link>
    </nav>
    
    <!-- PWA Install Prompt -->
    <div v-if="deferredPrompt && !installDismissed" class="fixed bottom-24 right-4 z-50 flex items-center gap-2">
      <button @click="installApp" class="bg-slate-900 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm font-bold">
        <component :is="DownloadIcon" size="16"/>
        Install App
      </button>
      <button @click="installDismissed = true" class="bg-white text-slate-500 w-7 h-7 rounded-full shadow-lg flex items-center justify-center text-xs font-bold hover:bg-slate-100">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { 
  Home as HomeIcon, 
  Settings as SettingsIcon, 
  Star as StarIcon,
  Download as DownloadIcon
} from 'lucide-vue-next';

const route = useRoute();
const showNav = computed(() => {
  return route.path.startsWith('/apps') && route.name !== 'Login';
});

const deferredPrompt = ref(null);
const installDismissed = ref(false);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});

const installApp = async () => {
  if (!deferredPrompt.value) return;
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;
  if (outcome === 'accepted') {
    deferredPrompt.value = null;
  }
};
</script>

