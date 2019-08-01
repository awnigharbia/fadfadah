import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password should be 8 Characters at least')
    .max(30, 'Maximum 30 characters')
    .required('Required'),
})
