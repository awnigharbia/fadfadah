import React from 'react'
import {injectIntl} from 'react-intl'
import '../../App.css';
import './start.css';

import Link from './myLink'

const Logo = "https://res.cloudinary.com/demo/image/fetch/w_250,h_250/https://cdn.filestackcontent.com/XFRIdxm4QXOhwSmOXv3m";


const About = ({intl}) => (
    <div className="about">
    <div className="a-i">
  
      <div className="a-l">
        <img src={Logo} alt="logo" />
      </div>
      <div className="a-in">
        <div className="a-in-item">
          <p>{intl.formatMessage({id: 'about.r1.p'})}</p>
            <ul>
              <li><Link to="#">{intl.formatMessage({id: 'about.r1.l1'})}</Link></li>
              <li><Link to="#">{intl.formatMessage({id: 'about.r1.l2'})}</Link></li>
              </ul>  
        </div>
        <div className="a-in-item">
            <p>{intl.formatMessage({id: 'about.r2.p'})}</p>
            <ul>
              <li><Link to="#">{intl.formatMessage({id: 'about.r2.l1'})}</Link></li>
              <li><Link to="#">{intl.formatMessage({id: 'about.r2.l2'})}</Link></li>
              </ul>  
        </div>
        <div className="a-in-item">
          <p>{intl.formatMessage({id: 'about.r3.p'})}</p>
            <ul>
              <li><Link to="#">{intl.formatMessage({id: 'about.r3.l1'})}</Link></li>
              <li><Link to="#">{intl.formatMessage({id: 'about.r3.l2'})}</Link></li>
              </ul>  
        </div>
        <div className="a-in-item">
          <p>{intl.formatMessage({id: 'about.r4.p'})}</p>
            <ul>
              <li><Link to="#">{intl.formatMessage({id: 'about.r4.l1'})}</Link></li>
              <li><Link to="#">{intl.formatMessage({id: 'about.r4.l2'})}</Link></li>
              </ul>  
        </div>
  </div>
  </div>
  
  
  <div className="a-b">
    <div className="a-b-r"></div>
    <div className="a-b-b">
      <div className="a-b-t">
      <h1>{intl.formatMessage({id: 'about.h1'})}</h1>
      <p>{intl.formatMessage({id: 'about.p'})}</p>
      </div>
      <div className="a-b-btn">
        <button>{intl.formatMessage({id: 'about.btn'})}</button>
        </div>
    </div>
    </div>
  </div> 
  )

  export default injectIntl(About)