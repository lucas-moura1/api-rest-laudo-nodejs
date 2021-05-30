import express, { urlencoded } from 'express'
import cors from 'cors'
import loggerMiddleware from '../middlewares/logger'

import { route } from '../routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(loggerMiddleware)
app.use(route)

app.use((req, res) => {
    res.status(404).json({ messagem: 'Rota não encontrada' })
})

app.use(function (err, req, res, next) {
    return res.status(err.statusCode).json({ error: err.message })
})

export { app }
