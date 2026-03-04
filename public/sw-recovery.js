// SW Recovery: detects blank screen and auto-recovers by clearing stale service workers
// IMPORTANT: Skip entirely when offline — SW cache is essential for offline use
(function () {
    if (!navigator.onLine) return;
    var retries = parseInt(sessionStorage.getItem('sw_retries') || '0');
    setTimeout(function () {
        if (!navigator.onLine) return; // re-check after timeout
        var app = document.getElementById('app');
        if (app && app.children.length === 0 && retries < 3) {
            sessionStorage.setItem('sw_retries', String(retries + 1));
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function (regs) {
                    return Promise.all(regs.map(function (r) { return r.unregister(); }));
                }).then(function () {
                    return caches.keys();
                }).then(function (names) {
                    return Promise.all(names.map(function (n) { return caches.delete(n); }));
                }).then(function () {
                    location.reload();
                });
            } else {
                location.reload();
            }
        } else if (app && app.children.length > 0) {
            sessionStorage.removeItem('sw_retries');
        }
    }, 3000);
})();
