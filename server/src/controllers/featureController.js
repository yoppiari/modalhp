import prisma from '../prisma.js';

export const getFeatures = async (req, res) => {
    try {
        const email = req.query.email || null;

        const features = await prisma.featureRequest.findMany({
            include: {
                _count: {
                    select: { votes: true }
                }
            },
            orderBy: [
                { status: 'desc' },
                { votes: { _count: 'desc' } }
            ]
        });

        // Let's add a boolean to each feature: `hasVoted: true/false`
        const enrichedFeatures = await Promise.all(features.map(async (feature) => {
            let hasVoted = false;
            if (email) {
                const vote = await prisma.featureVote.findUnique({
                    where: {
                        featureRequestId_voterEmail: {
                            featureRequestId: feature.id,
                            voterEmail: email
                        }
                    }
                });
                hasVoted = !!vote;
            }

            return {
                ...feature,
                votesCount: feature._count.votes,
                hasVoted
            };
        }));

        // Sort by votes (Prisma doesn't easily let us order by _count of relation descending fully reliably combined with status mapping easily without custom raw query, so we do it in JS for safety in small boards)
        const sorted = enrichedFeatures.sort((a, b) => {
            // Priority: IN_PROGRESS/PLANNED etc can be sorted if needed.
            return b.votesCount - a.votesCount;
        });

        res.json(sorted);
    } catch (error) {
        console.error('Get Features Error:', error);
        res.status(500).json({ error: 'Gagal mengambil data fitur' });
    }
};

export const createFeature = async (req, res) => {
    try {
        const { title, description, email } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const feature = await prisma.featureRequest.create({
            data: {
                title,
                description,
                authorEmail: email || null,
                status: 'PENDING'
            }
        });

        // Auto-vote for the creator if they provided an email
        if (email) {
            await prisma.featureVote.create({
                data: {
                    featureRequestId: feature.id,
                    voterEmail: email
                }
            });
        }

        res.json(feature);
    } catch (error) {
        console.error('Create Feature Error:', error);
        res.status(500).json({ error: 'Gagal membuat request fitur' });
    }
};

export const toggleVote = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email identifier required to vote' });
        }

        const existingVote = await prisma.featureVote.findUnique({
            where: {
                featureRequestId_voterEmail: {
                    featureRequestId: id,
                    voterEmail: email
                }
            }
        });

        if (existingVote) {
            // Remove vote
            await prisma.featureVote.delete({
                where: { id: existingVote.id }
            });
            return res.json({ message: 'Vote removed', action: 'removed' });
        } else {
            // Add vote
            await prisma.featureVote.create({
                data: {
                    featureRequestId: id,
                    voterEmail: email
                }
            });
            return res.json({ message: 'Vote added', action: 'added' });
        }
    } catch (error) {
        console.error('Toggle Vote Error:', error);
        res.status(500).json({ error: 'Gagal memberikan vote' });
    }
};
