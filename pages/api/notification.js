import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient()
    const { subscription } = req.body
    try {
        if (req.method === 'POST') {
            console.log('[notification]', subscription);
            // FIXME: VARCHAR(1024) for token doesn't work
            // looks like prisma sets the val to 191 by default
            // and Edge has a large token
            await prisma.notifications.create({
                "data": {
                    users: {
                        connect: { id: subscription.user } // TODO: Get logged user.id
                    },
                    token: subscription.endpoint,
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth
                }
            })
        } else if (req.method === 'DELETE') {
            const temp = await prisma.notifications.deleteMany({
                where: {
                    token: subscription.endpoint,
                    user: subscription.user
                }
            })
        }
        res.status(201).end()
    } catch (e) {
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}