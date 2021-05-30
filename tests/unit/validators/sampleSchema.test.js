import sampleSchema from '../../../src/validators/sampleSchema'

describe('Test validate Sample Schema', () => {
    test('Test validation with success ', async () => {
        const body = {
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

        const responseValidateSchema = await sampleSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['cocaina'])
        await expect(responseValidateSchema).toHaveProperty(['anfetamina'])
        await expect(responseValidateSchema).toHaveProperty(['metanfetamina'])
        await expect(responseValidateSchema).toHaveProperty(['MDA'])
        await expect(responseValidateSchema).toHaveProperty(['MDMA'])
        await expect(responseValidateSchema).toHaveProperty(['THC'])
        await expect(responseValidateSchema).toHaveProperty(['morfina'])
        await expect(responseValidateSchema).toHaveProperty(['codeina'])
        await expect(responseValidateSchema).toHaveProperty(['heroina'])
        await expect(responseValidateSchema).toHaveProperty(['benzoilecgonina'])
        await expect(responseValidateSchema).toHaveProperty(['cocaetileno'])
        await expect(responseValidateSchema).toHaveProperty(['norcocaina'])
    })

    test('Test validation with error on format without email field', async () => {
        const body = {
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
            cocaetileno: 0
        }

        await expect(sampleSchema.validate(body)).rejects.toThrow('O campo norcocaina é obrigatório')
    })

    test('Test validation with error on format without senha field', async () => {
        const body = {
            cocaina: -1,
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

        await expect(sampleSchema.validate(body)).rejects.toThrow('O campo cocaina deve ser no mínimo zero')
    })
})
