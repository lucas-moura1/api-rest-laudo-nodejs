import { SampleRepository } from '../../../src/repository/sampleRepository'
import { SampleService } from '../../../src/services/sampleService'
import { resultOfReport } from '../../../src/helpers/sampleHelper'

jest.mock('../../../src/helpers/sampleHelper')
jest.mock('../../../src/repository/sampleRepository')

describe('Test Sample Service', () => {
    beforeEach(() => {
        SampleRepository.mockClear()
    })

    test('Test create sample', async () => {
        const drougs = {}

        expect(SampleRepository).not.toHaveBeenCalled()

        resultOfReport.mockReturnValue('positivo')

        const sampleService = new SampleService()

        const mockCreate = jest.fn()

        SampleRepository.prototype.create = mockCreate

        mockCreate.mockResolvedValue({
            codigo_amostra: '12345678',
            laudo: 'positivo'
        })

        await sampleService.createSample(drougs)

        expect(resultOfReport).toHaveBeenCalled()
        expect(SampleRepository).toHaveBeenCalled()
        expect(SampleRepository.prototype.create).toHaveBeenCalled()
    })

    test('Test get all samples', async () => {
        expect(SampleRepository).not.toHaveBeenCalled()

        const mockGetAll = jest.fn().mockResolvedValue([{}])

        SampleRepository.getAll = mockGetAll

        await SampleService.getAllSamples()

        expect(SampleRepository.getAll).toHaveBeenCalled()
    })

    test('Test get sample by id', async () => {
        const codigo_amostra = '12345678'

        expect(SampleRepository).not.toHaveBeenCalled()

        const mockGetById = jest.fn().mockResolvedValue({})

        SampleRepository.getById = mockGetById

        await SampleService.getSampleById(codigo_amostra)

        expect(SampleRepository.getById).toHaveBeenCalled()
    })

    test('Test delete sample by id', async () => {
        const codigo_amostra = '12345678'

        expect(SampleRepository).not.toHaveBeenCalled()

        const mockdeleteById = jest.fn().mockResolvedValue([{}])

        SampleRepository.deleteById = mockdeleteById

        await SampleService.deleteSampleById(codigo_amostra)

        expect(SampleRepository.deleteById).toHaveBeenCalled()
    })
})
