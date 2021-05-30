import jwt from 'jsonwebtoken'
import logger from '../config/logger'
import { UnauthorizedError } from '../errors/unauthorizedError'
import { SECRET_KEY } from '../config'
import { UserRepository } from '../repository/userRepository'
import User from '../models/userModel'

class UserAuthorization {
    isOAuth (token) {
        logger.info('[USER AUTHORIZATION] Verifying is OAuth2')
        if (!token) throw new UnauthorizedError()

        const splitToken = token.split(' ')
        const typeAuth = splitToken[0]
        const accessToken = splitToken[1]

        if (typeAuth !== 'OAuth2') throw new UnauthorizedError()

        return accessToken
    }

    async verifyUser (email) {
        logger.info(`[USER AUTHORIZATION] Verifying user exists-> ${email}`)

        const user = await UserRepository.getByEmail(email)

        if (!user) return false

        return true
    }

    verifyError (message) {
        if (message === 'jwt expired') throw new UnauthorizedError('Token expirado')

        throw new UnauthorizedError()
    }

    async isAuthorizated (token) {
        logger.info(`[USER AUTHORIZATION] Verifying access token -> ${token}`)
        const accessToken = this.isOAuth(token)

        try {
            const payload = jwt.verify(
                accessToken,
                SECRET_KEY)

            return await this.verifyUser(payload.user)
        } catch (err) {
            logger.error(`[USER AUTHORIZATION] Error -> ${err}`)

            const numUsers = await User.estimatedDocumentCount().exec()

            if (numUsers === 0) return true

            this.verifyError(err.message)
        }
    }
}

export { UserAuthorization }
