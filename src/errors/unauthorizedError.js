class UnauthorizedError extends Error {
    constructor (error, statusCode) {
        super(error || 'Não autorizado')
        this.statusCode = 401
    }
}

export { UnauthorizedError }
