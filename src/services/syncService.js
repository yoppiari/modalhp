export async function syncToCloud(dbData) {
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    if (user.subscriptionStatus !== 'CLOUD') return;

    try {
        await fetch('/api/sync/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                data: JSON.stringify(dbData) // Determine how to serialize Dexie
            })
        });
        console.log('Sync success');
    } catch (e) {
        console.error('Sync failed', e);
    }
}

export async function pullFromCloud(email) {
    const res = await fetch(`/api/sync/pull?email=${email}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ? JSON.parse(json.data) : null;
}
