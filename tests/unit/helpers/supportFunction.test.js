import { verifyIdExist } from '../../../src/helpers/supportFunctions'

describe('Test support function', () => {
    test('Test verifyIdExist function with success', () => {
        const id = 'sample123'

        const result = verifyIdExist(id)

        expect(result).toBeUndefined()
    })

    test('Test verifyIdExist function with error', () => {
        const id = null

        expect(() => verifyIdExist(id)).toThrow()
    })
})
