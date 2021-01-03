import { RssFeedTwoTone } from '@material-ui/icons'

const webPush = require('web-push')

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
)

export default (req, res) => {
    if (req.method == 'POST') {
        const { subscription } = req.body
        console.log("req.body:", req.body)
        console.log("api:", subscription)
        webPush
            .sendNotification(subscription, JSON.stringify({ title: 'Universal Tracker', message: 'Cate flotari ai bagat azi bosultane?' }))
            .then(response => {
                res.writeHead(response.statusCode, response.headers).end(response.body)
            })
            .catch(err => {
                if ('statusCode' in err) {
                    res.writeHead(err.statusCode, err.headers).end(err.body)
                } else {
                    console.error(err)
                    res.status(500).end()
                }
            })
    } else {
        res.status(405).end()
    }
}