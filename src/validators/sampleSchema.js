import * as yup from 'yup'

const sampleSchema = yup.object().shape({
    cocaina: yup
        .number()
        .required('O campo cocaina é obrigatório')
        .min(0, 'O campo cocaina deve ser no mínimo zero'),

    anfetamina: yup
        .number()
        .required('O campo anfetamina é obrigatório')
        .min(0, 'O campo anfetamina deve ser no mínimo zero'),

    metanfetamina: yup
        .number()
        .required('O campo metanfetamina é obrigatório')
        .min(0, 'O campo metanfetamina deve ser no mínimo zero'),

    MDA: yup
        .number()
        .required('O campo MDA é obrigatório')
        .min(0, 'O campo MDA deve ser no mínimo zero'),

    MDMA: yup
        .number()
        .required('O campo MDMA é obrigatório')
        .min(0, 'O campo MDMA deve ser no mínimo zero'),

    THC: yup
        .number()
        .required('O campo THC é obrigatório')
        .min(0, 'O campo THC deve ser no mínimo zero'),

    morfina: yup
        .number()
        .required('O campo morfina é obrigatório')
        .min(0, 'O campo morfina deve ser no mínimo zero'),

    codeina: yup
        .number()
        .required('O campo codeína é obrigatório')
        .min(0, 'O campo codeina deve ser no mínimo zero'),

    heroina: yup
        .number()
        .required('O campo heroina é obrigatório')
        .min(0, 'O campo heroina deve ser no mínimo zero'),

    benzoilecgonina: yup
        .number()
        .required('O campo benzoilecgonina é obrigatório')
        .min(0, 'O campo benzoilecgonina deve ser no mínimo zero'),

    cocaetileno: yup
        .number()
        .required('O campo cocaetileno é obrigatório')
        .min(0, 'O campo cocaetileno deve ser no mínimo zero'),

    norcocaina: yup
        .number()
        .required('O campo norcocaina é obrigatório')
        .min(0, 'O campo norcocaina deve ser no mínimo zero')
})

export default sampleSchema
