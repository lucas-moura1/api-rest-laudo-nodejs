import { SampleService } from '../services/sampleService'
import sampleSchema from '../validators/sampleSchema'
import logger from '../config/logger'
import { verifyIdExist } from '../helpers/supportFunctions'

class SampleController {
    async createSample (req, res) {
        logger.info('[SAMPLE CONTROLLER] Initializing creation of new sample')

        try {
            const body = req.body

            await sampleSchema.validate(body)

            const sampleService = new SampleService()

            const response = await sampleService.createSample(body)

            return res.json(response)
        } catch (err) {
            logger.info(`[SAMPLE CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async getAllSamples (req, res) {
        logger.info('[SAMPLE CONTROLLER] Initializing get all samples')

        try {
            const samples = await SampleService.getAllSamples()

            return res.json(samples)
        } catch (err) {
            logger.info(`[SAMPLE CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async getSampleById (req, res) {
        logger.info('[SAMPLE CONTROLLER] initializing get sample by Id')

        try {
            const codigo_amostra = req.params.id

            verifyIdExist(codigo_amostra)

            const sample = await SampleService.getSampleById(codigo_amostra)

            return res.json(sample)
        } catch (err) {
            logger.info(`[SAMPLE CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }

    async deleteSampleById (req, res) {
        logger.info('[SAMPLE CONTROLLER] Initializing delete sample by id')

        try {
            const codigo_amostra = req.params.id

            verifyIdExist(codigo_amostra)

            const sample = await SampleService.deleteSampleById(codigo_amostra)

            return res.json(sample)
        } catch (err) {
            logger.info(`[SAMPLE CONTROLLER] Error >> ${JSON.stringify(err)}`)

            res.status(err.statusCode || 409).json({ messagem: err.message })
        }
    }
}

export { SampleController }
