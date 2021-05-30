import mongoose from '../config/mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890', 8)

const sampleSchema = new mongoose.Schema({

    codigo_amostra: {
        type: String,
        require: true,
        default: () => nanoid(),
        unique: true
    },
    cocaina: {
        type: Number,
        require: true
    },
    anfetamina: {
        type: Number,
        require: true
    },
    metanfetamina: {
        type: Number,
        require: true
    },
    MDA: {
        type: Number,
        require: true
    },
    MDMA: {
        type: Number,
        require: true
    },
    THC: {
        type: Number,
        require: true
    },
    morfina: {
        type: Number,
        require: true
    },
    codeina: {
        type: Number,
        require: true
    },
    heroina: {
        type: Number,
        require: true
    },
    benzoilecgonina: {
        type: Number,
        require: true
    },
    cocaetileno: {
        type: Number,
        require: true
    },
    norcocaina: {
        type: Number,
        require: true
    },
    laudo: {
        type: String,
        require: true
    }
},
{ versionKey: false }
)

export default mongoose.model('Sample', sampleSchema)
