import fs from 'fs';
import path from 'path';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER = { name: 'ModalHP', email: 'noreply@modalhp.com' };

async function sendBrevoEmail({ to, subject, htmlContent, replyTo }) {
    const body = {
        sender: SENDER,
        to: [{ email: to }],
        subject,
        htmlContent
    };

    if (replyTo) {
        body.replyTo = { email: replyTo };
    }

    const response = await fetch(BREVO_API_URL, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Brevo API Error:', response.status, errorData);
        throw new Error(`Brevo API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    return await response.json();
}

export async function sendOtpEmail(email, otp) {
    if (!BREVO_API_KEY) {
        console.warn("BREVO_API_KEY is missing. OTP code:", otp);
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
        const data = await sendBrevoEmail({
            to: email,
            subject: 'Kode Login ModalHP',
            htmlContent: `
                <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
                    <h2 style="color: #1e293b; margin-bottom: 8px;">Kode Login ModalHP</h2>
                    <p style="color: #64748b; margin-bottom: 24px;">Masukkan kode berikut untuk login ke akun Anda:</p>
                    <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                        <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #1e293b;">${otp}</span>
                    </div>
                    <p style="color: #94a3b8; font-size: 13px;">Kode berlaku selama 5 menit. Jangan bagikan kode ini kepada siapapun.</p>
                </div>
            `
        });
        console.log('OTP email sent via Brevo:', data);
        return data;
    } catch (err) {
        console.error('OTP email sending failed:', err);
        throw err;
    }
}

export async function sendSupportEmail(name, email, message, type = 'CS') {
    const toEmail = 'tickets@modalhp.p.tawk.email';
    const subject = type === 'CS' ? `[Bantuan CS] ${name}` : `[Request Fitur] ${name}`;

    if (!BREVO_API_KEY) {
        console.warn("BREVO_API_KEY is missing. Support msg:", message);
        return { success: true, simulated: true };
    }

    try {
        const data = await sendBrevoEmail({
            to: toEmail,
            subject,
            htmlContent: `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
                    <h3 style="color: #1e293b;">${subject}</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                        <tr><td style="padding: 8px 0; color: #64748b; width: 80px;"><strong>Nama</strong></td><td style="padding: 8px 0;">${name}</td></tr>
                        <tr><td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td><td style="padding: 8px 0;">${email}</td></tr>
                    </table>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;"/>
                    <p style="color: #334155; line-height: 1.6;">${message.replace(/\\n/g, '<br/>')}</p>
                </div>
            `,
            replyTo: email
        });
        console.log('Support email sent via Brevo:', data);
        return data;
    } catch (err) {
        console.error('Support email failed:', err);
        throw err;
    }
}
