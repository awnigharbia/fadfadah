import React, {useState} from 'react'
import {Redirect} from 'react-router'
import '../../App.css'
import {Formik} from 'formik'
import {validationSchema} from './validationSchema'
import LoginForm from './loginForm'
import Auth from '../../auth'
import Link from '../home-components/myLink'
//logo
import logo from '../../imgs/logo.webp'
// import facebook from '../imgs/facebook.png'
// import twitter from '../imgs/twitter.png'
// import google from '../imgs/google-plus.png'

//components
import SocialWidget from '../home-components/socialWidget'

const defaultValues = {
  email: '',
  password: '',
}

export default function login({context}) {
  const [LoggedIn, setLoggedIn] = useState(false)
  const [redirectTo, setRedirect] = useState('wall')

  if (LoggedIn) {
    return <Redirect push from="/login" to={`/account/${redirectTo}`} />
  } else {
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
        <div className="form">
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                const data = await context.actions.signIn(values)
                const token = data.login.token

                await Auth.authenticateUser(token)
                await Auth.saveUser({...data.login, token})
                // check if the user have hashtags or not
                if (data.login.user.hashtags.length === 0) {
                  setRedirect('selecthashtags')
                  setLoggedIn(true)
                }
                setLoggedIn(true)
              } catch (e) {
                actions.setSubmitting(false)
                actions.setStatus({msg: e.message.split(':')[1]})
              }
            }}
            render={props => <LoginForm {...props} />}
          />
        </div>
      </div>
    )
  }
}
