import { CheckParams } from '../../helpers/network'
import { GetNextDate } from '../../helpers/track'
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient()

    try {
        if (req.method === 'POST') {
            const params = ["days", "hour", "date", "answerType", "trackName"]
            if (CheckParams(params, req.body)) {
                const { days, hour, date, answerType, trackName } = req.body
                const rTypedId = await prisma.responsetypes.findFirst({
                    where: { type: answerType }
                })
                console.log('rTypedId', rTypedId)
                const track = await prisma.tracks.create({
                    "data": {
                        users: { connect: { id: 1 } }, // TODO: Get logged user.id
                        responsetypes: { connect: { id: rTypedId.id } },
                        title: trackName,
                        days: days,
                        hour: hour,
                        createDate: new Date(),
                        nextDate: GetNextDate(new Date(), hour, days),
                        finishDate: new Date(date)
                    }
                })
                res.status(201).json({ track })
            } else {
                console.error("param missing");
                res.status(500).json({ "error": "param missing" })
            }
        }
        else if (req.method === "GET") {
            const { user } = req.body
            const tracks = await pristma.track.findMany({
                where: { user: user }
            })
            res.status(201).json({ tracks })
        }
    } catch (e) {
        console.error("something went wrong. " + e);
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}