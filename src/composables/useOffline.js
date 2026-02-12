import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useOffline() {
    const isDownloading = ref(false);
    const progress = ref(0);
    const total = ref(0);
    const status = ref('');
    const router = useRouter();

    const downloadAllFeatures = async () => {
        isDownloading.value = true;
        status.value = 'Preparing...';

        // Get all routes
        const routes = router.getRoutes();
        const lazyRoutes = routes.filter(r => typeof r.components?.default === 'function');

        total.value = lazyRoutes.length;
        progress.value = 0;

        // We execute the import function to trigger the network request.
        // The Service Worker (if configured with runtime caching or if these are assets) will catch them.
        // Note: To strictly "cache" them, we usually rely on the SW interception.

        for (const route of lazyRoutes) {
            try {
                status.value = `Downloading ${route.name || 'component'}...`;
                // Trigger the dynamic import
                // route.components.default is the loadTool function: () => import(...)
                await route.components.default();
                progress.value++;
            } catch (e) {
                console.error(`Failed to load ${route.name}`, e);
            }
        }

        status.value = 'Download Complete!';
        isDownloading.value = false;
    };

    return {
        isDownloading,
        progress,
        total,
        status,
        downloadAllFeatures
    };
}
