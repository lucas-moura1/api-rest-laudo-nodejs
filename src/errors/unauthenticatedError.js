class UnauthenticatedError extends Error {
    constructor (error, statusCode) {
        super(error || 'Não autenticado')
        this.statusCode = 401
    }
}

export { UnauthenticatedError }
