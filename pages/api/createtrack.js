import { CheckParams, Error } from '../../helpers/network'

export default async (req, res) => {
    console.log('params:', req.body)
    if (CheckParams(["days", "time", "date", "answerType", "trackName"], req.body)) {
        res.status(201)
        res.json({"user": true})
        // res.json({ user })
    } else {
        console.log("Something's wrong")
        res.status(500)
        res.json(Error("user created"))
    }
}