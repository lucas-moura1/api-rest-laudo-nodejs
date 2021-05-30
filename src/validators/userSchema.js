import * as yup from 'yup'

const userSchema = yup.object().shape({

    nome: yup
        .string()
        .required('O campo nome é obrigatório'),

    email: yup
        .string()
        .required('O campo email é obrigatório')
        .email(),

    senha: yup
        .string()
        .required('O campo senha é obrigatório')
        .min(6, 'Insira uma senha de no mínimo 6 caracteres')
})

export default userSchema
