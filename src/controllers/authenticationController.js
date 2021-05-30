import logger from '../config/logger'
import { UserAuthentication } from '../auth/authentication'

class UserAuthenticationController {
    async authentication (req, res) {
        logger.info('[USER AUTHENTICATION CONTROLLER] Initializing authentication')

        try {
            const userEncoded = req.body.user

            const userAuthentication = new UserAuthentication()

            const token = await userAuthentication.generateToken(userEncoded)

            return res.status(200).json(token)
        } catch (err) {
            logger.info(`[USER AUTHENTICATION CONTROLLER] Error >> ${err}`)

            res.status(err.status || 401).json({ messagem: err.message })
        }
    }
}

export { UserAuthenticationController }
