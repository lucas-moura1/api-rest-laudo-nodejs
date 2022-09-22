import bcrypt from 'bcrypt'
import { UserAuthentication } from '../../../src/auth/authentication'
import { UserRepository } from '../../../src/repository/userRepository'

jest.mock('../../../src/repository/userRepository')
jest.mock('bcrypt')

describe('Test User authentication class', () => {
    beforeEach(() => {
        UserRepository.mockClear()
    })

    const userAuthentication = new UserAuthentication()
    const userEncoded = 'dGVzdGVAdGVzdGUuY29tOnRlc3RlMTIzNA=='

    test('Teste verify user function', async () => {
        UserAuthentication.prototype.validateBase64 = jest.fn()

        const mockGetByEmail = jest.fn().mockResolvedValue({ senha: 'ysgdds' })

        UserRepository.getByEmail = mockGetByEmail

        bcrypt.compare.mockResolvedValue(true)

        await userAuthentication.verifyUser(userEncoded)

        expect(UserAuthentication.prototype.validateBase64).toBeCalled()
        expect(UserRepository.getByEmail).toHaveBeenCalled()
        expect(bcrypt.compare).toHaveBeenCalled()
    })

    test('Test generate token function', async () => {
        const mockGetByEmail = jest.fn().mockResolvedValue({ senha: 'ysgdds' })

        UserRepository.getByEmail = mockGetByEmail

        bcrypt.compare.mockResolvedValue(true)

        UserAuthentication.prototype.verifyUser = jest.fn()

        const response = await userAuthentication.generateToken(userEncoded)

        expect(UserAuthentication.prototype.verifyUser).toHaveBeenCalled()
        expect(response).toHaveProperty('token_acesso')
    })

    test('Teste validade base64 function', () => {
        const response = userAuthentication.validateBase64(userEncoded)

        expect(response).toBeUndefined()
    })
})
