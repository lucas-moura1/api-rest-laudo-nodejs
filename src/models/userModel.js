import mongoose from '../config/mongoose'

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    }
},
{ versionKey: false }
)

export default mongoose.model('User', UserSchema)
