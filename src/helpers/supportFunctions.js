import { RequestError } from '../errors/requestError'

const verifyIdExist = (id) => {
    if (!id) throw new RequestError('Insira o id/codigo_amostra')
}

export { verifyIdExist }