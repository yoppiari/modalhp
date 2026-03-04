import CryptoJS from 'crypto-js';
import { db } from '../db';

const ENCRYPTION_KEY = 'modalhp_backup_secret_2024_internal_key';
const MAGIC_HEADER = 'MDL_DATA';
const FILE_VERSION = 1;

/**
 * Export semua data dari database ke file terenkripsi .mdl
 */
export async function exportData() {
  try {
    // Ambil semua data dari setiap tabel
    const allData = {
      products: await db.products.toArray(),
      transactions: await db.transactions.toArray(),
      transaction_items: await db.transaction_items.toArray(),
      customers: await db.customers.toArray(),
      employees: await db.employees.toArray(),
      kasbon: await db.kasbon.toArray(),
      inventory_log: await db.inventory_log.toArray(),
      settings: await db.settings.toArray()
    };

    // Serialize ke JSON
    const jsonString = JSON.stringify(allData);

    // Enkripsi dengan AES
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();

    // Buat payload dengan magic header
    const payload = {
      magic: MAGIC_HEADER,
      version: FILE_VERSION,
      timestamp: Date.now(),
      app: 'ModalHP',
      data: encrypted
    };

    return {
      success: true,
      payload,
      blob: new Blob([JSON.stringify(payload)], { type: 'application/json' }),
      fileName: `modalhp_backup_${new Date().toISOString().split('T')[0]}.mdl`
    };
  } catch (error) {
    console.error('Export failed:', error);
    return {
      success: false,
      error: 'Gagal mengexport data: ' + error.message
    };
  }
}

/**
 * Import data dari file .mdl ke database
 */
export async function importData(file) {
  try {
    // Baca file
    const text = await file.text();
    let payload;

    try {
      payload = JSON.parse(text);
    } catch (e) {
      return {
        success: false,
        error: 'File tidak valid atau corrupted'
      };
    }

    // Validasi magic header
    if (payload.magic !== MAGIC_HEADER) {
      return {
        success: false,
        error: 'Bukan file backup ModalHP (.mdl) yang valid'
      };
    }

    // Validasi version
    if (payload.version !== FILE_VERSION) {
      return {
        success: false,
        error: `Versi file tidak kompatibel (expected: ${FILE_VERSION}, got: ${payload.version})`
      };
    }

    // Decrypt data
    let decrypted;
    try {
      const bytes = CryptoJS.AES.decrypt(payload.data, ENCRYPTION_KEY);
      decrypted = bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      return {
        success: false,
        error: 'Gagal mendekripsi data. File mungkin corrupted atau bukan dari ModalHP.'
      };
    }

    if (!decrypted) {
      return {
        success: false,
        error: 'Gagal mendekripsi data. Password tidak sesuai.'
      };
    }

    // Parse JSON yang sudah didekripsi
    let importedData;
    try {
      importedData = JSON.parse(decrypted);
    } catch (e) {
      return {
        success: false,
        error: 'Data tidak valid setelah dekripsi'
      };
    }

    // Validasi struktur data
    const requiredTables = ['products', 'transactions', 'transaction_items', 'customers', 'employees', 'kasbon', 'inventory_log', 'settings'];
    for (const table of requiredTables) {
      if (!Array.isArray(importedData[table])) {
        return {
          success: false,
          error: `Data ${table} tidak ditemukan atau bukan array`
        };
      }
    }

    // Import data ke database dengan transaction
    await db.transaction('rw',
      db.products,
      db.transactions,
      db.transaction_items,
      db.customers,
      db.employees,
      db.kasbon,
      db.inventory_log,
      db.settings,
      async () => {
        // Clear semua tabel
        await db.products.clear();
        await db.transactions.clear();
        await db.transaction_items.clear();
        await db.customers.clear();
        await db.employees.clear();
        await db.kasbon.clear();
        await db.inventory_log.clear();
        await db.settings.clear();

        // Insert data yang baru
        if (importedData.products.length > 0) {
          await db.products.bulkAdd(importedData.products);
        }
        if (importedData.transactions.length > 0) {
          await db.transactions.bulkAdd(importedData.transactions);
        }
        if (importedData.transaction_items.length > 0) {
          await db.transaction_items.bulkAdd(importedData.transaction_items);
        }
        if (importedData.customers.length > 0) {
          await db.customers.bulkAdd(importedData.customers);
        }
        if (importedData.employees.length > 0) {
          await db.employees.bulkAdd(importedData.employees);
        }
        if (importedData.kasbon.length > 0) {
          await db.kasbon.bulkAdd(importedData.kasbon);
        }
        if (importedData.inventory_log.length > 0) {
          await db.inventory_log.bulkAdd(importedData.inventory_log);
        }
        if (importedData.settings.length > 0) {
          await db.settings.bulkAdd(importedData.settings);
        }
      }
    );

    return {
      success: true,
      message: 'Data berhasil diimport. Halaman akan reload otomatis.',
      stats: {
        products: importedData.products.length,
        transactions: importedData.transactions.length,
        customers: importedData.customers.length,
        employees: importedData.employees.length,
        kasbon: importedData.kasbon.length
      }
    };
  } catch (error) {
    console.error('Import failed:', error);
    return {
      success: false,
      error: 'Gagal mengimport data: ' + error.message
    };
  }
}

/**
 * Dapatkan ukuran data backup (estimasi)
 */
export async function getBackupSizeEstimate() {
  try {
    const allData = {
      products: await db.products.toArray(),
      transactions: await db.transactions.toArray(),
      transaction_items: await db.transaction_items.toArray(),
      customers: await db.customers.toArray(),
      employees: await db.employees.toArray(),
      kasbon: await db.kasbon.toArray(),
      inventory_log: await db.inventory_log.toArray(),
      settings: await db.settings.toArray()
    };

    const jsonString = JSON.stringify(allData);
    const encrypted = CryptoJS.AES.encrypt(jsonString, ENCRYPTION_KEY).toString();
    const payload = JSON.stringify({
      magic: MAGIC_HEADER,
      version: FILE_VERSION,
      timestamp: Date.now(),
      data: encrypted
    });

    const bytes = new Blob([payload]).size;

    // Format bytes to human readable
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } catch (e) {
    return 'Unknown';
  }
}
