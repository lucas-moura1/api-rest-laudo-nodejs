import jwt from 'jsonwebtoken'
import { UserAuthorization } from '../../../src/auth/authorization'
import { UserRepository } from '../../../src/repository/userRepository'

jest.mock('../../../src/repository/userRepository')
jest.mock('jsonwebtoken')

describe('Test User authentication class', () => {
    beforeEach(() => {
        UserRepository.mockClear()
    })

    const userAuthorization = new UserAuthorization()
    const userEncoded = 'OAuth2 token123'

    test('Teste verify user function', async () => {
        const email = 'teste@teste.com'

        const mockGetByEmail = jest.fn().mockResolvedValue({ senha: 'ysgdds' })

        UserRepository.getByEmail = mockGetByEmail

        await userAuthorization.verifyUser(email)

        expect(UserRepository.getByEmail).toHaveBeenCalled()
    })

    test('Teste is OAuth function', () => {
        const response = userAuthorization.isOAuth(userEncoded)

        expect(response).toBe('token123')
    })

    test('Test is authorized function', async () => {
        const mockGetByEmail = jest.fn().mockResolvedValue({ senha: 'ysgdds' })

        UserRepository.getByEmail = mockGetByEmail

        UserAuthorization.prototype.isOAuth = jest.fn()

        jwt.verify.mockResolvedValue({})

        UserAuthorization.prototype.verifyUser = jest.fn()

        await userAuthorization.isAuthorizated(userEncoded)

        expect(UserAuthorization.prototype.isOAuth).toHaveBeenCalled()
        expect(UserAuthorization.prototype.verifyUser).toHaveBeenCalled()
    })
})
