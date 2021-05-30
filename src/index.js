import { app } from './config/express'

const port = process.env.PORT || 5555

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
