<template>
  <div class="bg-white rounded-xl shadow p-4">
    <h3 class="font-bold text-lg mb-4">Offline Tools Manager</h3>
    <p class="text-sm text-slate-500 mb-4">Download tools agar bisa digunakan tanpa internet.</p>
    
    <div class="space-y-3">
      <div v-for="tool in tools" :key="tool.id" class="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
        <div>
          <p class="font-semibold text-sm">{{ tool.name }}</p>
          <p class="text-[10px] text-slate-400">{{ tool.status }}</p>
        </div>
        <button 
          @click="downloadTool(tool)" 
          :disabled="tool.downloaded || tool.loading"
          class="bg-blue-100 text-blue-700 p-2 rounded-lg text-xs font-bold disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-400"
        >
          <span v-if="tool.downloaded">✓ Ready</span>
          <span v-else-if="tool.loading">...</span>
          <span v-else>Download</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tools = ref([]);

onMounted(() => {
  // Filter routes that are actual tools
  tools.value = router.getRoutes()
    .filter(r => r.path.startsWith('/apps/') && r.name !== 'Login' && r.name !== 'Dashboard' && r.name !== 'Settings')
    .map(r => ({
      id: r.name,
      name: formatName(r.name),
      status: 'Cloud Only', // Default
      downloaded: false, // In a real app, check cache existence
      loader: r.components?.default
    }));
});

const formatName = (name) => {
  return name.replace(/([A-Z])/g, ' $1').trim(); // CamelCase to Spaced
};

const downloadTool = async (tool) => {
  if (!tool.loader) return;
  
  tool.loading = true;
  try {
    // Trigger dynamic import
    await tool.loader();
    
    // In a real PWA, you might also want to fetch specific assets manually if import() isn't enough
    // But with our StaleWhileRevalidate strategy on 'tool_*.js', this works.
    
    tool.downloaded = true;
    tool.status = 'Offline Ready';
  } catch (e) {
    console.error(e);
    tool.status = 'Error';
  } finally {
    tool.loading = false;
  }
};
</script>
