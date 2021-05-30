const {
    PORT,
    DB_MONGODB_DOMAIN,
    NODE_ENV,
    LOGGER_LEVEL,
    SECRET_KEY
} = process.env

const IS_TEST = NODE_ENV === 'test'

const dataBaseName = {
    test: process.env.DB_MONGODB_NAME_TEST,
    development: process.env.DB_MONGODB_NAME,
    production: process.env.DB_MONGODB_NAME
}[NODE_ENV]

const dataBaseUrl = `${DB_MONGODB_DOMAIN}/${dataBaseName}`

const dataBaseConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}

const drougs = {
    cocaine: process.env.COCAINE,
    amphetamine: process.env.AMPHETAMINE,
    methamphetamine: process.env.METHAMPHETAMINE,
    MDA: process.env.MDA,
    MDMA: process.env.MDMA,
    THC: process.env.THC,
    morphine: process.env.MORPHINE,
    codeine: process.env.CODEINE,
    heroine: process.env.HEROINE
}

export {
    PORT,
    IS_TEST,
    LOGGER_LEVEL,
    SECRET_KEY,
    dataBaseUrl,
    dataBaseConfig,
    drougs,
    NODE_ENV
}
