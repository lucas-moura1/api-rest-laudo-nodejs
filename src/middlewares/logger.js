import logger from '../config/logger'
import { nanoid } from 'nanoid'

const loggerMiddleware = (req, res, next) => {
    logger.requestId = nanoid()
    logger.method = req.method

    next()
}

export default loggerMiddleware
