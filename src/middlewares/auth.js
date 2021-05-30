import { UserAuthorization } from '../auth/authorization'
import { UnauthorizedError } from '../errors/unauthorizedError'
import logger from '../config/logger'

const auth = async (req, resp, next) => {
    logger.info('[AUTH MIDDLEWARE] Initializing authorization')

    try {
        const userAuthorization = new UserAuthorization()

        const token = req.headers.authorization

        const isAuthorized = await userAuthorization.isAuthorizated(token)

        if (!isAuthorized) throw new UnauthorizedError()

        next()
    } catch (err) {
        logger.info(`[AUTH MIDDLEWARE] Authorization Error -> ${err}`)

        resp.status(err.statusCode || 401).json({ messagem: err.message })
    }
}
export { auth }
