import { UserService } from '../../../src/services/userService'
import mockUserSchema from '../../../src/validators/userSchema'
import { UserController } from '../../../src/controllers/userController'
import { verifyIdExist } from '../../../src/helpers/supportFunctions'

jest.mock('../../../src/validators/userSchema')
jest.mock('../../../src/services/userService')
jest.mock('../../../src/helpers/supportFunctions')

const newUser = {
    nome: 'Teste',
    email: 'teste@teste.com',
    senha: 'objectId1324'
}

describe('Test User Controller', () => {
    beforeEach(() => {
        UserService.mockClear()
    })

    const requestMock = (userObject = {}, userId = '') => {
        return {
            body: {
                ...userObject
            },
            params: {
                id: userId
            }
        }
    }

    const responseMock = () => {
        const res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    }

    const userController = new UserController()

    test('Test create user', async () => {
        const body = newUser

        await mockUserSchema.validate.mockResolvedValue(body)

        const req = requestMock(body)
        const res = responseMock()

        expect(UserService).not.toHaveBeenCalled()

        await userController.createUser(req, res)

        const mockUserServiceInstance = UserService.mock.instances[0]
        const mockUserServiceCreateUser = mockUserServiceInstance.createUser

        expect(mockUserSchema.validate).toHaveBeenCalled()
        expect(UserService).toHaveBeenCalled()
        expect(mockUserServiceCreateUser).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test get all users', async () => {
        const req = requestMock()
        const res = responseMock()

        expect(UserService).not.toHaveBeenCalled()

        const mockGetAllUsers = jest.fn().mockResolvedValue([{}])

        UserService.getAllUsers = mockGetAllUsers

        await userController.getAllUsers(req, res)

        expect(UserService.getAllUsers).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })

    test('Test get user by id', async () => {
        const userId = '1234'
        const req = requestMock({}, userId)
        const res = responseMock()

        expect(UserService).not.toHaveBeenCalled()
        const mockGetUserById = jest.fn().mockResolvedValue({})

        UserService.getUserById = mockGetUserById

        verifyIdExist.mockReturnValue(undefined)

        await userController.getUserById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(UserService.getUserById).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })

    test('Test update user', async () => {
        const body = newUser
        const userId = '1234'

        await mockUserSchema.validate.mockResolvedValue(body)

        const req = requestMock(body, userId)
        const res = responseMock()

        expect(UserService).not.toHaveBeenCalled()

        verifyIdExist.mockReturnValue(undefined)

        await userController.updateUser(req, res)

        const mockUserServiceInstance = UserService.mock.instances[0]
        const mockUserServiceUpdateUser = mockUserServiceInstance.updateUser

        expect(verifyIdExist).toHaveBeenCalled()
        expect(mockUserSchema.validate).toHaveBeenCalled()
        expect(UserService).toHaveBeenCalled()
        expect(mockUserServiceUpdateUser).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
    })

    test('Test delet user by id', async () => {
        const req = requestMock()
        const res = responseMock()

        expect(UserService).not.toHaveBeenCalled()

        const mockdeleteUserById = jest.fn().mockResolvedValue([{}])

        verifyIdExist.mockReturnValue(undefined)

        UserService.deleteUserById = mockdeleteUserById

        await userController.deleteUserById(req, res)

        expect(verifyIdExist).toHaveBeenCalled()
        expect(UserService.deleteUserById).toHaveBeenCalled()
        expect(res.json).toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })
})
