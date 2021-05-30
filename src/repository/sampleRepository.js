import Sample from '../models/sampleModel'
import logger from '../config/logger'
import { RequestError } from '../errors/requestError'

class SampleRepository {
    async create (sampleDatas) {
        try {
            logger.info('[SAMPLE REPOSITORY] Creating sample in database')

            const sample = new Sample(sampleDatas)

            const response = await sample.save()

            logger.info(`[SAMPLE REPOSITORY] Sample created with id: ${sample._id}`)

            return response
        } catch (err) {
            logger.info(`[SAMPLE REPOSITORY] Error to creating sample >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async getAll () {
        try {
            logger.info('[SAMPLE REPOSITORY] Getting all samples')

            const samples = await Sample.find({}, { _id: false }).lean().exec()

            return samples
        } catch (err) {
            logger.info(`[SAMPLE REPOSITORY] Error to getting all samples >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async getById (sampleId) {
        try {
            logger.info(`[SAMPLE REPOSITORY] Getting sample by id: ${sampleId}`)

            const query = { codigo_amostra: sampleId }

            const sample = await Sample.findOne(query, { _id: false }).lean().exec()

            return sample
        } catch (err) {
            logger.info(`[SAMPLE REPOSITORY] Error to getting sample by id >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }

    static async deleteById (sampleId) {
        try {
            logger.info(`[SAMPLE REPOSITORY] Deleting sample by id: ${sampleId}`)

            const query = { codigo_amostra: sampleId }

            const sample = await Sample.deleteOne(query).exec()

            return sample
        } catch (err) {
            logger.info(`[SAMPLE REPOSITORY] Error to delete sample by id >> ${JSON.stringify(err)}`)

            throw new RequestError()
        }
    }
}

export { SampleRepository }
