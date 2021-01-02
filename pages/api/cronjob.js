import { PrismaClient } from '@prisma/client'
import { GetNextDate, GetDaysFromBitmask } from '../../helpers/track'

export default async (req, res) => {
    const prisma = new PrismaClient()
    console.log("triggered")
    try {
        const tracks = await prisma.tracks.findMany({
            where: {
                nextDate: {
                    lte: new Date()
                }
            }
        })
        console.log(tracks)
        // TODO: Update tracks[i].nextDate to GetNextDate
        console.log('next_day:', GetNextDate(tracks[0].nextDate, tracks[0].hour, tracks[0].days))
        res.status(201).json({ tracks })
    } catch (e) {
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}
