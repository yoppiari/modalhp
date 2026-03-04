import { ref, computed } from 'vue';

// ESC/POS Commands
const ESC_POS = {
  INIT: '\x1B\x40',           // Initialize printer
  RESET: '\x1B\x40',          // Reset printer
  TEXT_ALIGN_LEFT: '\x1B\x61\x00',
  TEXT_ALIGN_CENTER: '\x1B\x61\x01',
  TEXT_ALIGN_RIGHT: '\x1B\x61\x02',
  BOLD_ON: '\x1B\x45\x01',
  BOLD_OFF: '\x1B\x45\x00',
  DOUBLE_SIZE_ON: '\x1B\x21\x11',
  DOUBLE_SIZE_OFF: '\x1B\x21\x00',
  UNDERLINE_ON: '\x1B\x2D\x01',
  UNDERLINE_OFF: '\x1B\x2D\x00',
  LINE_FEED: '\x0A',
  CUT_PAPER: '\x1D\x56\x00',
  OPEN_DRAWER: '\x1B\x70\x00\x3C\xFF',

  // Font size
  TEXT_NORMAL: '\x1B\x21\x00',
  TEXT_LARGE: '\x1B\x21\x11',
  TEXT_HEIGHT_DOUBLE: '\x1B\x21\x01',
  TEXT_WIDTH_DOUBLE: '\x1B\x21\x10',
};

export function useBluetoothPrinter() {
  const device = ref(null);
  const server = ref(null);
  const characteristic = ref(null);
  const isConnected = ref(false);
  const isConnecting = ref(false);
  const isPrinting = ref(false);
  const error = ref(null);
  const savedDeviceId = ref(null);

  // Load saved device from localStorage
  const loadSavedDevice = () => {
    const saved = localStorage.getItem('bluetooth_printer_device');
    if (saved) {
      savedDeviceId.value = saved;
    }
  };

  // Save device to localStorage
  const saveDevice = () => {
    if (device.value) {
      localStorage.setItem('bluetooth_printer_device', device.value.id);
    }
  };

  // Check if Web Bluetooth is supported
  const isSupported = computed(() => {
    return 'bluetooth' in navigator;
  });

  // ESC/POS Service and Characteristic UUIDs (common for most printers)
  const ESC_POS_SERVICE_UUID = '000018f0-0000-1000-8000-00805f9b34fb';
  const ESC_POS_CHARACTERISTIC_UUID = '00002af1-0000-1000-8000-00805f9b34fb';

  // Alternative generic UUIDs for some printers
  const GENERIC_SERVICE_UUID = '4fafc201-1fb5-4591-8f7e-334d54769d73';
  const GENERIC_CHARACTERISTIC_UUID = 'd3e63b11-96b3-428e-a6ef-2fb2ac45bb67';

  // Connect to printer
  const connect = async () => {
    if (!isSupported.value) {
      error.value = 'Web Bluetooth tidak didukung oleh browser ini';
      return false;
    }

    isConnecting.value = true;
    error.value = null;

    try {
      // Request device
      device.value = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [ESC_POS_SERVICE_UUID] },
          { services: [GENERIC_SERVICE_UUID] },
          // Catch-all for thermal printers (use with caution)
          { namePrefix: 'POS' },
          { namePrefix: 'Printer' },
          { namePrefix: 'TP' },
          { namePrefix: 'MTP' },
        ],
        optionalServices: [ESC_POS_SERVICE_UUID, GENERIC_SERVICE_UUID]
      });

      // Connect to GATT server
      server.value = await device.value.gatt.connect();

      // Try to get the ESC/POS service first, then generic
      let service = null;
      try {
        service = await server.value.getPrimaryService(ESC_POS_SERVICE_UUID);
      } catch (e) {
        try {
          service = await server.value.getPrimaryService(GENERIC_SERVICE_UUID);
        } catch (e2) {
          // Last resort: try to find any service with write characteristic
          console.log('Trying to find any writable characteristic...');
        }
      }

      if (service) {
        characteristic.value = await service.getCharacteristic(ESC_POS_CHARACTERISTIC_UUID);
      } else {
        // Try to get any characteristic that supports write
        const services = await server.value.getPrimaryServices();
        for (const svc of services) {
          try {
            const chars = await svc.getCharacteristics();
            for (const char of chars) {
              if (char.properties.write || char.properties.writeWithoutResponse) {
                characteristic.value = char;
                break;
              }
            }
          } catch (e) {
            // Skip this service
          }
        }
      }

      if (!characteristic.value) {
        throw new Error('Tidak dapat menemukan karakteristik write pada printer');
      }

      isConnected.value = true;
      saveDevice();
      isConnecting.value = false;

      // Listen for disconnection
      device.value.addEventListener('gattserverdisconnected', onDisconnected);

      return true;
    } catch (err) {
      console.error('Bluetooth connection failed:', err);
      error.value = err.message;
      isConnecting.value = false;
      return false;
    }
  };

  // Handle disconnection
  const onDisconnected = () => {
    isConnected.value = false;
    device.value = null;
    server.value = null;
    characteristic.value = null;
    console.log('Printer disconnected');
  };

  // Disconnect from printer
  const disconnect = () => {
    if (device.value && device.value.gatt.connected) {
      device.value.gatt.disconnect();
    }
    onDisconnected();
  };

  // Send data to printer
  const sendData = async (data) => {
    if (!characteristic.value) {
      error.value = 'Printer tidak terhubung';
      return false;
    }

    try {
      isPrinting.value = true;

      // Convert string to Uint8Array if needed
      let bytes;
      if (typeof data === 'string') {
        const encoder = new TextEncoder();
        bytes = encoder.encode(data);
      } else if (data instanceof Uint8Array) {
        bytes = data;
      } else {
        bytes = new Uint8Array(data);
      }

      // Send in chunks (some printers have buffer limits)
      const CHUNK_SIZE = 20; // Bluetooth MTU is typically 20 bytes
      for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
        const chunk = bytes.slice(i, i + CHUNK_SIZE);
        await characteristic.value.writeValue(chunk);
        // Small delay between chunks
        await new Promise(resolve => setTimeout(resolve, 5));
      }

      isPrinting.value = false;
      return true;
    } catch (err) {
      console.error('Failed to send data:', err);
      error.value = 'Gagal mengirim data: ' + err.message;
      isPrinting.value = false;
      return false;
    }
  };

  // Print text with ESC/POS commands
  const printText = async (text, options = {}) => {
    const {
      bold = false,
      center = false,
      right = false,
      doubleSize = false,
      underline = false,
      lineFeed = true
    } = options;

    let commands = '';

    if (bold) commands += ESC_POS.BOLD_ON;
    if (doubleSize) commands += ESC_POS.TEXT_LARGE;
    if (underline) commands += ESC_POS.UNDERLINE_ON;
    if (center) commands += ESC_POS.TEXT_ALIGN_CENTER;
    if (right) commands += ESC_POS.TEXT_ALIGN_RIGHT;

    commands += text;

    if (bold) commands += ESC_POS.BOLD_OFF;
    if (doubleSize) commands += ESC_POS.TEXT_NORMAL;
    if (underline) commands += ESC_POS.UNDERLINE_OFF;
    if (lineFeed) commands += ESC_POS.LINE_FEED;

    // Reset alignment
    commands += ESC_POS.TEXT_ALIGN_LEFT;

    return await sendData(commands);
  };

  // Print receipt (full receipt)
  const printReceipt = async (receiptData) => {
    const {
      shopName = 'WARUNG BERKAH',
      address = '',
      phone = '',
      invoiceNumber = '',
      date = '',
      items = [],
      subtotal = 0,
      discount = 0,
      total = 0,
      paymentMethod = 'CASH',
      paidAmount = 0,
      change = 0,
      footer = 'Terima Kasih atas Kunjungan Anda'
    } = receiptData;

    try {
      isPrinting.value = true;

      // Initialize printer
      await sendData(ESC_POS.INIT);
      await new Promise(r => setTimeout(r, 50));

      // Print line function
      const printLine = async (left, right = '', width = 32) => {
        const leftWidth = width - (right ? right.length : 0);
        const leftTruncated = left.substring(0, leftWidth);
        if (right) {
          const spaces = ' '.repeat(leftWidth - leftTruncated.length);
          await printText(`${leftTruncated}${spaces}${right}`, { lineFeed: true });
        } else {
          await printText(leftTruncated, { lineFeed: true });
        }
      };

      // Header - Shop name (bold, center, double size)
      await printText(shopName, { bold: true, center: true, doubleSize: true });

      if (address) {
        await printText(address, { center: true });
      }
      if (phone) {
        await printText(`Telp: ${phone}`, { center: true });
      }

      await printText('', { lineFeed: true }); // Empty line

      // Invoice info
      await printText('--------------------------------', { lineFeed: true });
      await printText(`No: ${invoiceNumber}`, { lineFeed: true });
      await printText(`Tgl: ${date}`, { lineFeed: true });
      await printText(`Bayar: ${paymentMethod}`, { lineFeed: true });
      await printText('--------------------------------', { lineFeed: true });

      // Items
      for (const item of items) {
        const itemLine = `${item.name} x${item.qty}`;
        const price = `Rp ${item.subtotal.toLocaleString('id-ID')}`;
        await printLine(itemLine, price);
        if (item.price && item.qty > 1) {
          await printText(`   @ Rp ${item.price.toLocaleString('id-ID')}`, { lineFeed: true });
        }
      }

      await printText('--------------------------------', { lineFeed: true });

      // Totals
      if (discount > 0) {
        await printLine('Subtotal', `Rp ${subtotal.toLocaleString('id-ID')}`);
        await printLine('Diskon', `- Rp ${discount.toLocaleString('id-ID')}`);
      }

      await printText('', { lineFeed: true });
      await printText('TOTAL', { bold: true, doubleSize: true });
      await printText(`Rp ${total.toLocaleString('id-ID')}`, { bold: true, doubleSize: true, lineFeed: true });

      // Payment info
      if (paidAmount > 0) {
        await printLine('Dibayar', `Rp ${paidAmount.toLocaleString('id-ID')}`);
        await printLine('Kembali', `Rp ${change.toLocaleString('id-ID')}`);
      }

      // Footer
      await printText('--------------------------------', { lineFeed: true });
      await printText(footer, { center: true });
      await printText('Barang yang dibeli tidak dapat ditukar', { center: true });
      await printText('', { lineFeed: true });
      await printText('', { lineFeed: true });
      await printText('', { lineFeed: true });

      // Cut paper
      await sendData(ESC_POS.CUT_PAPER);

      isPrinting.value = false;
      return true;
    } catch (err) {
      console.error('Print receipt failed:', err);
      error.value = err.message;
      isPrinting.value = false;
      return false;
    }
  };

  // Print from transaction data (for InvoiceGenerator)
  const printTransactionReceipt = async (transaction, items, businessProfile) => {
    return await printReceipt({
      shopName: businessProfile?.businessName || 'WARUNG BERKAH',
      address: businessProfile?.address || '',
      phone: businessProfile?.phone || '',
      invoiceNumber: transaction.invoice_number,
      date: new Date(transaction.date).toLocaleString('id-ID'),
      items: items.map(item => ({
        name: item.product_name_at_sale,
        qty: item.qty,
        price: item.price_at_sale,
        subtotal: item.subtotal
      })),
      total: transaction.total_amount,
      paymentMethod: transaction.payment_method,
      footer: 'Terima Kasih atas Kunjungan Anda'
    });
  };

  // Auto-connect to saved device (if available)
  const autoConnect = async () => {
    if (!savedDeviceId.value || !isSupported.value) return false;

    try {
      // This only works if device was previously paired and is in range
      const devices = await navigator.bluetooth.getDevices();
      const savedDevice = devices.find(d => d.id === savedDeviceId.value);

      if (savedDevice) {
        device.value = savedDevice;
        server.value = await device.value.gatt.connect();

        // Try to get characteristic
        try {
          const service = await server.value.getPrimaryService(ESC_POS_SERVICE_UUID);
          characteristic.value = await service.getCharacteristic(ESC_POS_CHARACTERISTIC_UUID);
          isConnected.value = true;

          device.value.addEventListener('gattserverdisconnected', onDisconnected);
          return true;
        } catch (e) {
          console.log('Auto-connect failed, need manual pairing');
          return false;
        }
      }
      return false;
    } catch (err) {
      console.error('Auto-connect failed:', err);
      return false;
    }
  };

  // Initialize
  loadSavedDevice();

  return {
    // State
    device,
    isConnected,
    isConnecting,
    isPrinting,
    error,
    isSupported,

    // Methods
    connect,
    disconnect,
    sendData,
    printText,
    printReceipt,
    printTransactionReceipt,
    autoConnect
  };
}
