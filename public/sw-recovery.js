// SW Recovery: detects blank screen and auto-recovers by clearing stale service workers
// IMPORTANT: Skip entirely when offline — SW cache is essential for offline use
(function () {
    if (!navigator.onLine) return;
    var retries = parseInt(sessionStorage.getItem('sw_retries') || '0');

    // Force clear old PWA cache on load (one-time migration)
    var cacheCleared = localStorage.getItem('pwa_cache_cleared_v2');
    if (!cacheCleared && 'caches' in window) {
        localStorage.setItem('pwa_cache_cleared_v2', 'true');
        caches.keys().then(function(names) {
            names.forEach(function(name) {
                // Clear old workbox precache to force fresh assets
                if (name.includes('workbox-precache') || name.includes('pwa-cache')) {
                    caches.delete(name);
                }
            });
        });
    }

    setTimeout(function () {
        if (!navigator.onLine) return; // re-check after timeout
        var app = document.getElementById('app');
        if (app && app.children.length === 0 && retries < 3) {
            sessionStorage.setItem('sw_retries', String(retries + 1));
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function (regs) {
                    return Promise.all(regs.map(function (r) {
                        console.log('[SW Recovery] Unregistering:', r.scope);
                        return r.unregister();
                    }));
                }).then(function () {
                    return caches.keys();
                }).then(function (names) {
                    console.log('[SW Recovery] Clearing caches:', names);
                    return Promise.all(names.map(function (n) { return caches.delete(n); }));
                }).then(function () {
                    console.log('[SW Recovery] Reloading...');
                    location.reload(true);
                });
            } else {
                location.reload(true);
            }
        } else if (app && app.children.length > 0) {
            sessionStorage.removeItem('sw_retries');
        }
    }, 2000);
})();
