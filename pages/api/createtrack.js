import { CheckParams } from '../../helpers/network'
import { GetNextDate } from '../../helpers/track'
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient({ log: ["query"] })
    const params = ["days", "hour", "date", "answerType", "trackName"]

    try {
        if (CheckParams(params, req.body)) {
            const { days, hour, date, answerType, trackName } = req.body
            const rTypedId = await prisma.responsetypes.findFirst({
                where: { type: answerType }
            })
            const track = await prisma.tracks.create({
                "data": {
                    users: { connect: { id: 1 } }, // TODO: Get logged user.id
                    responsetypes: { connect: { id: rTypedId.id } },
                    title: trackName,
                    days: days,
                    hour: hour,
                    createDate: new Date(),
                    nextDate: GetNextDate(new Date(), hour, days), // TODO: Build next date based on days
                    finishDate: new Date(date)
                }
            })
            res.status(201).json({ track })
        } else {
            console.error("param missing");
            res.status(500).json({ "error": "param missing" })
        }
    } catch (e) {
        console.error("something went wrong. " + e);
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}