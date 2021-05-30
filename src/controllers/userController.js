import { UserService } from '../services/userService'
import userSchema from '../validators/userSchema'
import logger from '../config/logger'
import { verifyIdExist } from '../helpers/supportFunctions'

class UserController {
    async createUser (req, res) {
        const body = req.body
        logger.info(`[USER CONTROLLER] Initializing creation of new user -> ${JSON.stringify(body)}`)

        try {
            await userSchema.validate(body)

            const userService = new UserService()

            const response = await userService.createUser(body)

            return res.json(response)
        } catch (err) {
            logger.info(`[USER CONTROLLER] Error >> ${JSON.stringify(err)}`)
            const message = err.message || err.errors.toString()

            res.status(err.statusCode || 409).json({ messagem: message })
        }
    }

    async getAllUsers (req, res) {
        logger.info('[USER CONTROLLER] Initializing get all users')

        try {
            const users = await UserService.getAllUsers()

            return res.json(users)
        } catch (err) {
            logger.info(`[USER CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async getUserById (req, res) {
        logger.info('[USER CONTROLLER] initializing get user by Id')

        try {
            const userId = req.params.id

            verifyIdExist(userId)

            const user = await UserService.getUserById(userId)

            return res.json(user)
        } catch (err) {
            logger.info(`[USER CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async updateUser (req, res) {
        logger.info('[USER CONTROLLER] Initializing updation of user')

        try {
            const body = req.body
            const userId = req.params.id

            verifyIdExist(userId)

            await userSchema.validate(body)

            const userService = new UserService()

            const response = await userService.updateUser(body, userId)

            return res.json(response)
        } catch (err) {
            logger.info(`[USER CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async deleteUserById (req, res) {
        logger.info('[USER CONTROLLER] Initializing delete user by id')

        try {
            const userId = req.params.id

            verifyIdExist(userId)

            const user = await UserService.deleteUserById(userId)

            return res.json(user)
        } catch (err) {
            logger.info(`[USER CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }
}

export { UserController }
