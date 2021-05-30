import { resultOfReport } from '../../../src/helpers/sampleHelper'

describe('Test helpers function', () => {
    test('Test resultOfReport function return positivo', () => {
        const sample = {
            cocaina: 0.678,
            anfetamina: 0.1,
            metanfetamina: 0.1,
            MDA: 0.1,
            MDMA: 0,
            THC: 0.1,
            morfina: 0.1,
            codeina: 0.1,
            heroina: 0.1,
            benzoilecgonina: 0,
            cocaetileno: 0,
            norcocaina: 0.1
        }

        const result = resultOfReport(sample)

        expect(result).toBe('positivo')
    })

    test('Test resultOfReport function return negativo', () => {
        const sample = {
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

        const result = resultOfReport(sample)

        expect(result).toBe('negativo')
    })
})
