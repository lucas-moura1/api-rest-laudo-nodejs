import jwt from 'jsonwebtoken'
import isBase64 from 'is-base64'
import bcrypt from 'bcrypt'
import { UnauthenticatedError } from '../errors/unauthenticatedError'
import { SECRET_KEY } from '../config'
import { UserRepository } from '../repository/userRepository'
import logger from '../config/logger'

class UserAuthentication {
    jsonToken (email) {
        return {
            user: email
        }
    }

    validateBase64 (userEncoded) {
        logger.info('[USER AUTHENTICATION] Validating is base64')
        if (!isBase64(userEncoded)) throw new UnauthenticatedError()
    }

    async verifyUser (userEncoded) {
        logger.info('[USER AUTHENTICATION] Verifying user')
        try {
            this.validateBase64(userEncoded)

            const userBuffer = Buffer.from(userEncoded, 'base64')
            const userLogin = userBuffer.toString('utf8').split(':')
            const email = userLogin[0]
            const senha = userLogin[1]

            const user = await UserRepository.getByEmail(email)

            if (!user) throw new UnauthenticatedError()

            const validPassword = await bcrypt.compare(senha, user.senha)

            if (!validPassword) throw new UnauthenticatedError()

            logger.info('[USER AUTHENTICATION] User found')

            return email
        } catch (err) {
            logger.error(`[USER AUTHENTICATION] Error verifying user-> ${err}`)

            throw err
        }
    }

    async generateToken (userEncoded) {
        logger.info('[USER AUTHENTICATION] Generating token')

        try {
            const email = await this.verifyUser(userEncoded)

            const token = jwt.sign(
                this.jsonToken(email),
                SECRET_KEY,
                { expiresIn: 60 * 9 })

            logger.info(`[USER AUTHENTICATION] Token generated -> ${token}`)

            return {
                token_acesso: token
            }
        } catch (err) {
            logger.error(`[USER AUTHENTICATION] Error -> ${err}`)

            throw err
        }
    }
}

export { UserAuthentication }
