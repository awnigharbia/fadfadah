import React, {Component} from 'react'
import '../App.css'

import Link from './home-components/myLink'
//logo
import logo from '../imgs/logo.webp'

export default class ResetPassword extends Component {
  render() {
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
        <div className="form-reset">
          <h1 style={{fontWeight: 500}}>Reset Password</h1>
          <input
            type="text"
            placeholder="email"
            autoFocus
            style={{marginTop: 0}}
          />
          <button type="submit">Reset</button>
        </div>
      </div>
    )
  }
}
