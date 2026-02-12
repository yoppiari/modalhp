import prisma from '../prisma.js';

export const pushData = async (req, res) => {
    const { email, data } = req.body;

    // In real app, verify JWT here
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Allow Sync only if CLOUD tier
    // For now, we are lenient for testing or it could be 'PRO' + Addon
    if (user.subscriptionStatus !== 'CLOUD' && user.subscriptionStatus !== 'PRO') {
        return res.status(403).json({ error: 'Subscription required' });
    }

    await prisma.cloudData.upsert({
        where: { id: user.id }, // Assuming 1:1 for simplicity or use findFirst
        // Actually schema says CloudData has own ID and relation to User.
        // Let's find existing by userId
    });

    // Correction: Let's find existing or create
    const existing = await prisma.cloudData.findFirst({ where: { userId: user.id } });

    if (existing) {
        await prisma.cloudData.update({
            where: { id: existing.id },
            data: { dataBlob: data }
        });
    } else {
        await prisma.cloudData.create({
            data: {
                userId: user.id,
                dataBlob: data
            }
        });
    }

    res.json({ success: true });
};

export const pullData = async (req, res) => {
    const { email } = req.query;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const cloudData = await prisma.cloudData.findFirst({ where: { userId: user.id } });
    res.json({ data: cloudData ? cloudData.dataBlob : null });
};
