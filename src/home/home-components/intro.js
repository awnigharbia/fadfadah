import React from 'react'
import {injectIntl} from 'react-intl'
import '../../App.css'
import './start.css'

import Link from './myLink'

const Intro = ({intl}) => (
  <div className="intro">
    <div className="t-intro">
      <h1>
        {intl.formatMessage({id: 'intro.h1'})}
        <span className="fadeIn" id="changeable">
          {intl.formatMessage({id: 'intro.h11'})}
        </span>
      </h1>
    </div>
    <div className="intro-body-text">
      <p>
        <span>Join Us!</span> Share your problems
      </p>
      <p> without limits!</p>
      <div className="sl-btns">
        <Link to="/signup">{intl.formatMessage({id: 'intro.signup'})}</Link>
        <Link to="/login">{intl.formatMessage({id: 'intro.login'})}</Link>
      </div>
    </div>
  </div>
)

export default injectIntl(Intro)
