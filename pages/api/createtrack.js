export default async (req, res) => {

    // Get data from the request
    // const { email, username, fbuid } = req.body

    try {
        console.log('params:', req.body)
        res.status(201)
        res.json({"suc": 'ces'})
        // res.json({ user })
    } catch (error) {
        console.log('err', error)
        res.status(500)
        res.json({ error: 'error message' })
    } finally {
        console.log('final')
    }
}