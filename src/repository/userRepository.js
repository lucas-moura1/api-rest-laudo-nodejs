import bcrypt from 'bcrypt'
import User from '../models/userModel'
import logger from '../config/logger'
import { RequestError } from '../errors/requestError'

class UserRepository {
    saltRounds = 10

    async create (userDatas) {
        try {
            logger.info('[USER REPOSITORY] Creating user in database')

            const passwordHash = await bcrypt.hash(userDatas.senha, this.saltRounds)

            userDatas.senha = passwordHash

            const user = new User(userDatas)

            const response = await user.save()

            logger.info(`[USER REPOSITORY] User created with id: ${user._id}`)

            return response
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to creating user >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async getAll () {
        try {
            logger.info('[USER REPOSITORY] Getting all users')

            const users = await User.find().lean().exec()

            return users
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to getting all users >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async getById (userId) {
        try {
            logger.info(`[USER REPOSITORY] Getting user by id: ${userId}`)

            const user = await User.findById(userId).lean().exec()

            return user
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to getting user by id >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async getByEmail (email) {
        try {
            logger.info(`[USER REPOSITORY] Getting user by email: ${email}`)

            const user = await User.findOne({ email }).lean().exec()

            return user
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to getting user by email >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    async update (newUserDatas, userId) {
        try {
            logger.info('[USER REPOSITORY] Updating user in database')

            const user = await User.findById(userId).exec()

            user.nome = newUserDatas.nome
            user.email = newUserDatas.email

            const passwordHash = await bcrypt.hash(newUserDatas.senha, this.saltRounds)

            user.senha = passwordHash

            const response = await user.save()

            logger.info(`[USER REPOSITORY] User updated with id: ${user._id}`)

            return response
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to updating user >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async deleteById (userId) {
        try {
            logger.info(`[USER REPOSITORY] Deleting user by id: ${userId}`)

            const query = { _id: userId }

            const user = await User.deleteOne(query).exec()

            return user
        } catch (err) {
            logger.info(`[USER REPOSITORY] Error to delete user by id >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }
}

export { UserRepository }
