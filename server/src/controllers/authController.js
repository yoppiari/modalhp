import prisma from '../prisma.js';
import { sendOtpEmail } from '../services/emailService.js';
import crypto from 'crypto';

export const requestOtp = async (req, res) => {
    console.log('requestOtp hit. Body:', req.body);
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    try {
        await prisma.otp.create({
            data: {
                email,
                code: otpCode,
                expiresAt
            }
        });

        await sendOtpEmail(email, otpCode);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Request OTP Error:', error);
        res.status(500).json({ error: 'Failed to send OTP. Check server logs.' });
    }
};

export const verifyOtp = async (req, res) => {
    const email = req.body.email ? req.body.email.toLowerCase().trim() : null;
    const { code } = req.body;

    if (!email || !code) return res.status(400).json({ error: 'Email and code required' });

    try {
        const validOtp = await prisma.otp.findFirst({
            where: {
                email,
                code,
                expiresAt: { gt: new Date() }
            }
        });

        if (!validOtp) {
            console.log(`Verify Failed for ${email}. Input: ${code}. Time: ${new Date().toISOString()}`);

            // Debug why
            const debugOtp = await prisma.otp.findFirst({ where: { email, code } });
            if (debugOtp) {
                return res.status(400).json({
                    error: `OTP Expired saved at ${debugOtp.expiresAt.toISOString()}. Server time: ${new Date().toISOString()}`
                });
            }

            // Check if any active OTP exists
            const activeOtp = await prisma.otp.findFirst({ where: { email, expiresAt: { gt: new Date() } } });
            if (activeOtp) {
                return res.status(400).json({ error: `Incorrect Code. A valid code exists (ends with ...${activeOtp.code.slice(-2)}).` });
            }

            return res.status(400).json({ error: 'Invalid OTP Code' });
        }

        // Upsert User
        const user = await prisma.user.upsert({
            where: { email },
            update: {},
            create: { email }
        });

        // Clean up OTPs
        await prisma.otp.deleteMany({ where: { email } });

        res.json({ user, token: 'mock-jwt-token' });
    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ error: 'Verification failed' });
    }
};
