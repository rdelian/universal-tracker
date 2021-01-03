import { PrismaClient } from '@prisma/client'
import { GetNextDate, GetDaysFromBitmask } from '../../helpers/track'

export default async (req, res) => {
    const prisma = new PrismaClient()

    try {
        const tracks = await prisma.tracks.findMany({
            where: {
                nextDate: {
                    lte: new Date()
                }
            }
        })

        for (let i = 0; i < tracks.length; i++) {
            // TODO: Update tracks[i].nextDate to GetNextDate
            // console.log('next_day:', GetNextDate(tracks[0].nextDate, tracks[0].hour, tracks[0].days))
            prisma.notifications.findMany({
                where: { user: tracks[i].user }
            }).then(notification => {
                for (let i = 0; i < notification.length; i++) {
                    fetch('http://localhost:3000/api/postNotification', { // FIXME: https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            subscription: {
                                user: notification[0].user,
                                endpoint: notification[0].token,
                                keys: {
                                    p256dh: notification[0].p256dh,
                                    auth: notification[0].auth
                                }
                            }
                        })
                    })
                }
            })
        }
        res.status(201).json({ tracks })
    } catch (e) {
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}
