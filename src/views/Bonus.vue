<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <div class="mb-6 flex items-center gap-3">
      <button @click="$router.back()" class="bg-white p-2 rounded-full shadow-sm border border-slate-100">
        <component :is="ArrowLeftIcon" size="20" class="text-slate-600" />
      </button>
      <h1 class="text-xl font-bold text-slate-800">Bonus</h1>
    </div>

    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div class="bg-blue-50 p-6 rounded-full mb-4">
        <component :is="GiftIcon" size="48" class="text-blue-500" />
      </div>
      <h2 class="text-lg font-bold text-slate-800 mb-2">Coming Soon</h2>
      <p class="text-slate-500 text-sm max-w-xs">
        Halaman ini akan segera hadir dengan fitur-fitur menarik lainnya.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft as ArrowLeftIcon, Gift as GiftIcon } from 'lucide-vue-next';
</script>
