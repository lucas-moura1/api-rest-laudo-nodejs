import { SampleService } from '../../../src/services/sampleService'
import mockSampleSchema from '../../../src/validators/sampleSchema'
import { SampleController } from '../../../src/controllers/sampleController'
import { verifyIdExist } from '../../../src/helpers/supportFunctions'

jest.mock('../../../src/validators/sampleSchema')
jest.mock('../../../src/services/sampleService')
jest.mock('../../../src/helpers/supportFunctions')

const drougs = {
    cocaina: 0.4,
    anfetamina: 0.1,
    metanfetamina: 0.1,
    MDA: 0.1,
    MDMA: 0,
    THC: 0.01,
    morfina: 0.1,
    codeina: 0.1,
    heroina: 0.1,
    benzoilecgonina: 0,
    cocaetileno: 0,
    norcocaina: 0
}

describe('Test Sample Controller', () => {
    beforeEach(() => {
        SampleService.mockClear()
    })

    const requestMock = (sampleObject = {}, sampleId = '') => {
        return {
            body: {
                ...sampleObject
            },
            params: {
                id: sampleId
            }
        }
    }

    const responseMock = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    const sampleController = new SampleController()

    test('Test create sample', async () => {
        const body = drougs

        await mockSampleSchema.validate.mockResolvedValue(body)

        const req = requestMock(body)
        const res = responseMock()

        expect(SampleService).not.toHaveBeenCalled()

        await sampleController.createSample(req, res)

        const mockSampleServiceInstance = SampleService.mock.instances[0]
        const mockSampleServiceCreateSample = mockSampleServiceInstance.createSample

        expect(mockSampleSchema.validate).toHaveBeenCalled()
        expect(SampleService).toHaveBeenCalled()
        expect(mockSampleServiceCreateSample).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test get all samples', async () => {
        const req = requestMock()
        const res = responseMock()

        expect(SampleService).not.toHaveBeenCalled()
        const mockGetAllSamples = jest.fn().mockResolvedValue([{}])

        SampleService.getAllSamples = mockGetAllSamples

        await sampleController.getAllSamples(req, res)

        expect(SampleService.getAllSamples).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })

    test('Test get sample by id', async () => {
        const sampleId = '1234'
        const req = requestMock({}, sampleId)
        const res = responseMock()

        expect(SampleService).not.toHaveBeenCalled()
        const mockGetSampleById = jest.fn().mockResolvedValue({})

        SampleService.getSampleById = mockGetSampleById

        verifyIdExist.mockReturnValue(undefined)

        await sampleController.getSampleById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(SampleService.getSampleById).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })

    test('Test delete sample by id', async () => {
        const req = requestMock()
        const res = responseMock()

        expect(SampleService).not.toHaveBeenCalled()
        const mockdeleteSampleById = jest.fn().mockResolvedValue([{}])

        SampleService.deleteSampleById = mockdeleteSampleById

        verifyIdExist.mockReturnValue(undefined)

        await sampleController.deleteSampleById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(SampleService.deleteSampleById).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })
})
