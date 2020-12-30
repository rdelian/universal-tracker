import { CheckParams } from '../../helpers/network'
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient({ log: ["query"] })
    const params = ["days", "time", "date", "answerType", "trackName"]
    const rTypes = { "bool": 1, "int": 2, "str": 3 }

    // try {
    if (CheckParams(params, req.body)) {
        const { days, time, date, answerType, trackName } = req.body
        const track = prisma.tracks.create({
            "data": {
                // "user": 1,
                // "responseType": rTypes[answerType],
                "title": trackName,
                "days": days,
                "hour": time,
                "createDate": new Date(),
                "nextDate": new Date(), // TODO: Build next date based on days
                "finishDate": date
            }
        })
        console.log("track:", track)
        res.status(201).json({ track })
    } else {
        res.status(500).json({ "error": "param missing" })
    }
    // } catch (error) {
    // res.status(500).json({ "error": "something went wrong. " + error })
    // } finally {
    // await prisma.$disconnect()
    // }
}