import userSchema from '../../../src/validators/userSchema'

describe('Test validate User Schema', () => {
    test('Test validation with success ', async () => {
        const body = {
            nome: 'Teste',
            email: 'teste@teste.com',
            senha: 'objectId1324'
        }

        const responseValidateSchema = await userSchema.validate(body)

        await expect(responseValidateSchema).toHaveProperty(['nome'])
        await expect(responseValidateSchema).toHaveProperty(['email'])
        await expect(responseValidateSchema).toHaveProperty(['senha'])
    })

    test('Test validation with error on format without email field', async () => {
        const body = {
            nome: 'Teste',
            senha: 'teste1234'
        }

        await expect(userSchema.validate(body)).rejects.toThrow('O campo email é obrigatório')
    })

    test('Test validation with error on format without senha field', async () => {
        const body = {
            nome: 'Teste',
            email: 'teste@teste.com',
            senha: 'test1'
        }

        await expect(userSchema.validate(body)).rejects.toThrow('Insira uma senha de no mínimo 6 caracteres')
    })
})