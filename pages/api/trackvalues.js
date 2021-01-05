import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    const prisma = new PrismaClient()
    try {
        if (req.method === 'POST') {
            // 
        } else if (req.method === 'GET') {
            const { user } = req.query
            const tracksvalues = await prisma.trackvalues.findMany({
                where: { tracks: { user: Number(user) } },
                include: { tracks: true }
            })
            // console.log(tracksvalues)
            res.setHeader('Content-Type', 'application/json')
            res.status(201).end(JSON.stringify({ tracksvalues }))
        }
    } catch (e) {
        console.error("something went wrong. " + e);
        res.status(500).json({ "error": "something went wrong. " + e })
    } finally {
        await prisma.$disconnect()
    }
}