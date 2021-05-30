import { UserRepository } from '../../../src/repository/userRepository'
import { UserService } from '../../../src/services/userService'

jest.mock('../../../src/repository/userRepository')

describe('Test User Service', () => {
    beforeEach(() => {
        UserRepository.mockClear()
    })

    test('Test create user', async () => {
        const drougs = {}

        expect(UserRepository).not.toHaveBeenCalled()

        const userService = new UserService()

        const mockCreate = jest.fn()

        UserRepository.prototype.create = mockCreate

        mockCreate.mockResolvedValue({})

        await userService.createUser(drougs)

        expect(UserRepository).toHaveBeenCalled()
        expect(UserRepository.prototype.create).toHaveBeenCalled()
    })

    test('Test get all users', async () => {
        expect(UserRepository).not.toHaveBeenCalled()

        const mockGetAll = jest.fn().mockResolvedValue([{}])

        UserRepository.getAll = mockGetAll

        await UserService.getAllUsers()

        expect(UserRepository.getAll).toHaveBeenCalled()
    })

    test('Test get user by id', async () => {
        const codigo_amostra = '12345678'

        expect(UserRepository).not.toHaveBeenCalled()

        const mockGetById = jest.fn().mockResolvedValue({})

        UserRepository.getById = mockGetById

        await UserService.getUserById(codigo_amostra)

        expect(UserRepository.getById).toHaveBeenCalled()
    })

    test('Test update user', async () => {
        const drougs = {}
        const userId = '1234'

        expect(UserRepository).not.toHaveBeenCalled()

        const userService = new UserService()

        const mockUpdate = jest.fn()

        UserRepository.prototype.update = mockUpdate

        mockUpdate.mockResolvedValue({})

        await userService.updateUser(drougs, userId)

        expect(UserRepository).toHaveBeenCalled()
        expect(UserRepository.prototype.update).toHaveBeenCalled()
    })

    test('Test delete user by id', async () => {
        const codigo_amostra = '12345678'

        expect(UserRepository).not.toHaveBeenCalled()

        const mockdeleteById = jest.fn().mockResolvedValue([{}])

        UserRepository.deleteById = mockdeleteById

        await UserService.deleteUserById(codigo_amostra)

        expect(UserRepository.deleteById).toHaveBeenCalled()
    })
})
