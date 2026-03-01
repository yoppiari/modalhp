import { sendSupportEmail } from '../services/emailService.js';

export const submitSupportRequest = async (req, res) => {
    const { name, email, message, type } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
        await sendSupportEmail(name, email, message, type || 'CS');
        res.json({ message: 'Pesan berhasil dikirim' });
    } catch (error) {
        console.error('Support Request Error:', error);
        res.status(500).json({ error: 'Gagal mengirim pesan' });
    }
};
