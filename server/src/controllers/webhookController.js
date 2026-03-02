import crypto from 'crypto';
import prisma from '../prisma.js';

export const handleScalevWebhook = async (req, res) => {
    try {
        const payload = req.body;
        console.log('Scalev Webhook Received, Event:', payload.event);

        // 1. Verify Webhook Signature (skipping testing events)
        if (payload.event !== 'business.test_event') {
            const signature = req.headers['x-scalev-hmac-sha256'];
            const secret = process.env.SCALEV_SIGNING_SECRET;

            if (!signature || !secret || !req.rawBody) {
                console.error('Scalev Webhook: Missing signature, secret, or rawBody');
                return res.status(401).send('Unauthorized: Missing signature or payload data');
            }

            const calculatedHmac = crypto
                .createHmac('sha256', secret)
                .update(req.rawBody)
                .digest('base64');

            if (signature !== calculatedHmac) {
                console.error('Scalev Webhook: Signature mismatch');
                return res.status(401).send('Unauthorized: Invalid Signature');
            }
        }

        // 2. Handle Initial Activation Event
        if (payload.event === 'business.test_event') {
            console.log('Scalev Webhook: Initial setup event received');
            return res.status(200).send('OK');
        }

        // 3. Process Order Event
        // We focus on `order.epayment_created`, `order.payment_status_changed`, or `order.created` based on what Scalev actually sends when paid
        if (!payload.data) {
            console.warn('Scalev Webhook: Received webhook without data payload');
            return res.status(200).send('No data payload');
        }

        const data = payload.data;
        const scalevOrderId = data.order_id;
        const email = data.destination_address?.email;
        const paymentStatus = data.payment_status; // Should be 'paid' or 'settlement'
        const productName = data.orderlines && data.orderlines.length > 0 ? data.orderlines[0].product_name : null;
        const amount = data.net_revenue || data.gross_revenue;

        if (!scalevOrderId || !email) {
            console.warn('Scalev Webhook: Missing required details (order_id or email). Payload:', JSON.stringify(payload));
            return res.status(200).send('Ignored: Missing order_id or email');
        }

        // Check if payment already processed
        const existingPayment = await prisma.payment.findUnique({
            where: { scalevOrderId }
        });

        // 4. Log Payment Activity
        const paymentData = {
            scalevEvent: payload.event,
            email: email,
            productName: productName,
            amount: amount?.toString(),
            paymentStatus: paymentStatus,
            rawPayload: JSON.stringify(payload)
        };

        if (existingPayment) {
            await prisma.payment.update({
                where: { scalevOrderId },
                data: paymentData
            });
            console.log(`Scalev Webhook: Updated existing payment for Order ID ${scalevOrderId}`);
        } else {
            await prisma.payment.create({
                data: {
                    scalevOrderId,
                    ...paymentData
                }
            });
            console.log(`Scalev Webhook: Created new payment record for Order ID ${scalevOrderId}`);
        }

        // 5. Upgrade User Subscription if Paid
        if (paymentStatus === 'paid' || paymentStatus === 'settlement' || paymentStatus === 'settled') {
            await prisma.user.upsert({
                where: { email },
                update: {
                    subscriptionStatus: 'PRO',
                    scalevOrderId: scalevOrderId
                },
                create: {
                    email: email,
                    subscriptionStatus: 'PRO',
                    scalevOrderId: scalevOrderId
                }
            });
            console.log(`Scalev Webhook: User ${email} upgraded to PRO based on order ${scalevOrderId}`);
        } else {
            console.log(`Scalev Webhook: Payment status for ${scalevOrderId} is ${paymentStatus}. No upgrade applied.`);
        }

        // Respond with 200 OK so Scalev doesn't retry
        return res.status(200).json({ received: true });

    } catch (error) {
        console.error('Scalev Webhook Processing Error:', error);
        // Important: Still return 200 or 500?
        // Scalev will retry if non-2xx. If it's a transient DB error, 500 makes sense to trigger retry.
        return res.status(500).send('Server Error');
    }
};
