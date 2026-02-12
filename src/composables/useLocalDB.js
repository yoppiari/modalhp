import { get, set, update } from 'idb-keyval';

export function useLocalDB() {
    const saveDocument = async (storeName, data) => {
        // We can use a single array for simplicity or separate stores.
        // idb-keyval uses a default store. We'll simulate collections by keys or prefix.
        // Better: use an object { finance_invoices: [] }
        await update(storeName, (val) => val ? [...val, data] : [data]);
    };

    const getDocuments = async (storeName) => {
        return (await get(storeName)) || [];
    };

    return {
        saveDocument,
        getDocuments
    };
}
