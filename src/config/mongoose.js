import mongoose from 'mongoose'
import { dataBaseUrl, dataBaseConfig, NODE_ENV } from './index'

if (NODE_ENV !== 'test') {
    mongoose
        .connect(dataBaseUrl, dataBaseConfig)
        .then(console.log('Database connected'))
        .catch(err => {
            console.error('Error database >> ', err)
            process.exit(1)
        })
}

export default mongoose
