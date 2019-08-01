import React, {useState} from 'react'
import Auth from '../../auth'
import {Redirect} from 'react-router-dom'
import '../../App.css'
import {Formik} from 'formik'
import {useMutation} from 'react-apollo-hooks'
import {REGISTER_MUTATION} from './signupMutation'
import {validationSchema} from './validationSchema'

//logo
import logo from '../../imgs/logo.webp'
//components
import Link from '../home-components/myLink'
import SignupForm from './signupForm'

const defaultValues = {
  email: '',
  username: '',
  password: '',
}

export default function Signup() {
  const [LoggedIn, setLoggedIn] = useState(false)
  const signupMutation = useMutation(REGISTER_MUTATION)

  if (LoggedIn) {
    return <Redirect to="/account/selecthashtags" />
  }

  return (
    <div className="form-wrap">
      <div className="login-header">
        <div className="login-seperate">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon class="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
      <Link to="/" id="login-logo">
        <img src={logo} alt="logo" />
      </Link>
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            const {data} = await signupMutation({variables: {...values}})
            Auth.authenticateUser(data.register.token)
            setLoggedIn(true)
          } catch (e) {
            actions.setSubmitting(false)
            actions.setStatus({
              msg: `${e.message.split('=')[1]} already exists `,
            })
          }
        }}
        render={props => <SignupForm {...props} />}
      />
      <div className="form-social">
        {/* <div className="content">
              <h1>Or you can Signup with:</h1>
              <hr />
              <hr />
              <SocialWidget
                img={facebook}
                text="Sign up with Facebook"
                color="#3D5B99"
              />
              <hr />
              <SocialWidget
                img={twitter}
                text="Sign up with Twitter"
                color="#55ACEE"
              />
              <hr />
              <SocialWidget
                img={google}
                text="Sign up with Google"
                color="#DC4E41"
              />
            </div> */}
      </div>
    </div>
  )
}
