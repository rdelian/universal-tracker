import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient()
    const { subscription } = req.body
    try {
        if (req.method === 'POST') {
            console.log('[notification]', subscription);
            const temp = await prisma.notifications.create({
                "data": {
                    users: {
                        connect: { id: subscription.user } // TODO: Get logged user.id
                    }, 
                    token: subscription.endpoint,
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth
                }
            })
            console.log(temp)
        } else if (req.method === 'DELETE') {
            // TODO: Delete subs
        }
        res.status(201).end()
    } catch (e) {
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}
