import Dexie from 'dexie';

export const db = new Dexie('UMKM_KIT_DB');

db.version(1).stores({
    // Products Master
    // id (auto), code (searchable), name (searchable), category
    products: '++id, code, name, category, is_active',

    // Transactions (POS)
    // id (auto), date (index for range queries), type, customer_id (foreign key)
    transactions: '++id, date, type, payment_method, customer_id',

    // Transaction Items (Detail)
    // transaction_id (foreign key), product_id (foreign key)
    transaction_items: '++id, transaction_id, product_id',

    // Customers (CRM)
    // id (auto), phone (unique), name
    customers: '++id, &phone, name, total_debt',

    // Settings
    // key (unique)
    // Settings
    // key (unique)
    settings: 'key'
});

db.version(2).stores({
    // Inventory History
    // product_id (foreign key), date (index)
    inventory_log: '++id, product_id, date, type, qty, note'
});

// Helper to check if DB is open
export const isDbReady = async () => {
    try {
        await db.open();
        return true;
    } catch (e) {
        console.error('Database failed to open', e);
        return false;
    }
};
