<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <div class="mb-6 flex items-center gap-3">
      <button @click="$router.push('/apps')" class="bg-white p-2 rounded-full shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors">
        <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
      </button>
      <h1 class="text-xl font-bold text-slate-800">Ekstra</h1>
    </div>

    <div class="mb-6 bg-blue-50/80 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
      <component :is="WifiIcon" size="20" class="text-blue-500 shrink-0 mt-0.5" />
      <p class="text-sm text-blue-800 leading-relaxed">
        Fitur-fitur di halaman Ekstra ini (seperti Bantuan CS dan Request Fitur) memerlukan <span class="font-bold">koneksi internet yang stabil</span> untuk berfungsi dengan optimal.
      </p>
    </div>

    <div class="space-y-4">
      <router-link 
        to="/apps/ekstra/cs"
        class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors group"
      >
        <div class="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-100 transition-colors">
          <component :is="MailIcon" size="24" class="text-blue-500" />
        </div>
        <div class="flex-1">
          <h2 class="text-base font-bold text-slate-800">Bantuan CS</h2>
          <p class="text-slate-500 text-xs mt-1">
            Hubungi Customer Service via email.
          </p>
        </div>
        <component :is="ChevronRightIcon" size="20" class="text-slate-400" />
      </router-link>

      <router-link 
        to="/apps/ekstra/request-fitur"
        class="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors group"
      >
        <div class="bg-amber-50 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4 group-hover:bg-amber-100 transition-colors">
          <component :is="LightbulbIcon" size="24" class="text-amber-500" />
        </div>
        <div class="flex-1">
          <h2 class="text-base font-bold text-slate-800">Request Fitur</h2>
          <p class="text-slate-500 text-xs mt-1">
            Kirimkan ide atau fitur yang Anda butuhkan.
          </p>
        </div>
        <component :is="ChevronRightIcon" size="20" class="text-slate-400" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft as ArrowLeftIcon, Mail as MailIcon, Lightbulb as LightbulbIcon, ChevronRight as ChevronRightIcon, Wifi as WifiIcon } from 'lucide-vue-next';
</script>
