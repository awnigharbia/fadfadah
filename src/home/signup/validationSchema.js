import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Minimum 5 char')
    .max(20, 'Maximum 20 char')
    .required('Required'),
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password should be 8 Characters at least')
    .max(30, 'Maximum 30 characters')
    .required('Required'),
})
