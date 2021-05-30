import { UserRepository } from '../repository/userRepository'
import logger from '../config/logger'

class UserService {
    async createUser (userDatas) {
        logger.info('[USER SERVICE] Process to save new user')

        try {
            const userRepository = new UserRepository()

            const response = await userRepository.create(userDatas)

            return response
        } catch (err) {
            logger.info(`[USER SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async getAllUsers () {
        logger.info('[USER SERVICE] Process to get all users')

        try {
            const users = await UserRepository.getAll()

            return users
        } catch (err) {
            logger.info(`[USER SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async getUserById (userId) {
        logger.info('[USER SERVICE] Process to get user by Id')

        try {
            const user = await UserRepository.getById(userId)

            return user
        } catch (err) {
            logger.info(`[USER SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    async updateUser (userDatas, userId) {
        logger.info('[USER SERVICE] Process to update user')

        try {
            const userRepository = new UserRepository()

            const response = await userRepository.update(userDatas, userId)

            return response
        } catch (err) {
            logger.info(`[USER SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async deleteUserById (userId) {
        logger.info('[USER SERVICE] Process to delete user by id')

        try {
            const user = await UserRepository.deleteById(userId)

            return user
        } catch (err) {
            logger.info(`[USER SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }
}

export { UserService }
