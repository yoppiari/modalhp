import prisma from '../prisma.js';

export const handleScalevWebhook = async (req, res) => {
    // TODO: Add Signature Verification if Scalev provides it
    const payload = req.body;
    console.log('Scalev Webhook Received:', JSON.stringify(payload, null, 2));

    // Determine email and status from payload (Adjust based on actual Scalev Webhook structure)
    // Assuming payload.customer_email and payload.payment_status or similar
    const email = payload.customer_email || payload.email;
    const status = payload.status || payload.payment_status;

    if (!email) {
        console.warn('Webhook received without email');
        return res.status(200).send('No action needed');
    }

    try {
        if (status === 'paid' || status === 'settlement' || status === 'capture') {
            await prisma.user.upsert({
                where: { email },
                update: { subscriptionStatus: 'PRO' },
                create: {
                    email,
                    subscriptionStatus: 'PRO'
                }
            });
            console.log(`User ${email} upgraded to PRO`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook processing failed:', error);
        res.status(500).send('Server Error');
    }
};
