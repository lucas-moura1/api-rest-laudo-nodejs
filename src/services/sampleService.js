import { SampleRepository } from '../repository/sampleRepository'
import { resultOfReport } from '../helpers/sampleHelper'
import logger from '../config/logger'

class SampleService {
    async createSample (sampleDatas) {
        logger.info('[SAMPLE SERVICE] Process to save new sample')

        try {
            const report = resultOfReport(sampleDatas)

            sampleDatas.laudo = report

            const sampleRepository = new SampleRepository()

            const sample = await sampleRepository.create(sampleDatas)

            const response = {
                codigo_amostra: sample.codigo_amostra,
                laudo: sample.laudo
            }

            return response
        } catch (err) {
            logger.info(`[SAMPLE SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async getAllSamples () {
        logger.info('[SAMPLE SERVICE] Process to get all samples')

        try {
            const samples = await SampleRepository.getAll()

            return samples
        } catch (err) {
            logger.info(`[SAMPLE SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async getSampleById (codigo_amostra) {
        logger.info('[SAMPLE SERVICE] Process to get sample by Id')

        try {
            const sample = await SampleRepository.getById(codigo_amostra)

            return sample
        } catch (err) {
            logger.info(`[SAMPLE SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }

    static async deleteSampleById (codigo_amostra) {
        logger.info('[SAMPLE SERVICE] Process to delete sample by id')

        try {
            const sample = await SampleRepository.deleteById(codigo_amostra)

            return sample
        } catch (err) {
            logger.info(`[SAMPLE SERVICE] Error >> ${JSON.stringify(err)}`)

            throw err
        }
    }
}

export { SampleService }
