import React from 'react'
import {Form, Field, ErrorMessage} from 'formik'

import Link from '../home-components/myLink'

export default function LoginForm({status}) {
  return (
    <Form className="form-normal" id="login">
      <h1>Sign in</h1>
      {status && status.msg && <p className="err">{status.msg}</p>}
      <ErrorMessage name="email" component="div" className="err-message" />
      <Field name="email" type="email" placeholder="Email" />

      <ErrorMessage name="password" component="div" className="err-message" />
      <Field name="password" type="password" placeholder="Password" />
      <button type="submit">Sign in</button>
      <Link to="/resetpassword" id="resetpassword">
        Forgot passowrd?
      </Link>
      <p>
        didn't have account yet? <Link to="/signup">Sign up</Link>
      </p>
    </Form>
  )
}
