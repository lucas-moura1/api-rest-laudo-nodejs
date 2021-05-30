import { UserAuthentication } from '../../../src/auth/authentication'
import { UserAuthenticationController } from '../../../src/controllers/authenticationController'

jest.mock('../../../src/auth/authentication')

describe('Test Authentication Controller', () => {
    beforeEach(() => {
    })

    const requestMock = (user = {}) => {
        return {
            body: {
                ...user
            }
        }
    }

    const responseMock = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    const userAuthenticationController = new UserAuthenticationController()

    test('Test create sample', async () => {
        const body = { user: 'teste1234' }

        const req = requestMock(body)
        const res = responseMock()

        const mockGenerateToken = jest.fn()

        UserAuthentication.prototype.generateToken = mockGenerateToken

        mockGenerateToken.mockResolvedValue({})

        await userAuthenticationController.authentication(req, res)

        expect(UserAuthentication.prototype.generateToken).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })
})
