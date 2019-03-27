import React from 'react';
import { injectIntl } from 'react-intl'
import '../../App.css';
import './start.css';

import Link from './myLink'

const f9 = "https://cdn.filestackcontent.com/F0sTEPScuI9Ppgr81uJg";

const Intro = ({ intl }) => (
    <div className="intro">
    <div className="t-intro">
       <h1>{intl.formatMessage({id:'intro.h1'})}<span className="fadeIn" id="changeable">{intl.formatMessage({id:'intro.h11'})}</span></h1>
    </div>
    <p>{intl.formatMessage({id:'intro.p'})}</p>
    <div className="sl-btns">
        <Link to="/home/login">{intl.formatMessage({id:'intro.login'})}</Link>
        <Link to="/home/signup">{intl.formatMessage({id:'intro.signup'})}</Link>
      </div>
      <img src={f9} alt="f9" />
  </div>
  )
  
  export default injectIntl(Intro)