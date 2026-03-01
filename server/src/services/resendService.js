import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : { emails: { send: async () => ({ error: 'No API Key' }) } };

export async function sendOtpEmail(email, otp) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. OTP code:", otp);
        try {
            const logPath = path.resolve('otp.txt');
            fs.writeFileSync(logPath, `Last OTP for ${email}: ${otp}\nDate: ${new Date().toISOString()}`);
            console.log("OTP written to", logPath);
        } catch (e) {
            console.error("Failed to write OTP log:", e);
        }
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'ModalHP <onboarding@resend.dev>',
            to: email,
            subject: 'Kode Login ModalHP',
            html: `<p>Kode login Anda adalah: <strong>${otp}</strong></p><p>Kode berlaku selama 5 menit.</p>`
        });

        if (error) {
            console.error('Resend Error:', error);
            throw error;
        }

        return data;
    } catch (err) {
        console.error('Email sending failed:', err);
        throw err;
    }
}

export async function sendSupportEmail(name, email, message, type = 'CS') {
    const toEmail = 'tickets@modalhp.p.tawk.email';
    const subject = type === 'CS' ? `[Bantuan CS] ${name}` : `[Request Fitur] ${name}`;

    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. Support msg:", message);
        return { success: true, simulated: true };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'ModalHP App <onboarding@resend.dev>',
            to: toEmail,
            subject,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\\n/g, '<br/>')}</p>`,
            reply_to: email
        });

        if (error) {
            console.error('Resend Error:', error);
            throw error;
        }

        return data;
    } catch (err) {
        console.error('Support email failed:', err);
        throw err;
    }
}
