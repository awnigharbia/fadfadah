import React, {useState} from 'react'
import {Field, Form, ErrorMessage} from 'formik'

import Link from '../home-components/myLink'

export default function signupForm({status}) {
  return (
    <Form className="form">
      <div id="signup" className="form-normal">
        <h1>Sign up</h1>
        {status && status.msg && <p id="errS">{status.msg}</p>}
        <ErrorMessage name="username" component="div" className="err-message" />
        <Field name="username" type="text" placeholder="username" />

        <ErrorMessage name="email" component="div" className="err-message" />
        <Field name="email" type="email" placeholder="email" />

        <ErrorMessage name="password" component="div" className="err-message" />
        <Field name="password" type="password" placeholder="passsword" />
        <button type="submit">SIGN UP</button>
        <p>
          Alredy have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </Form>
  )
}
