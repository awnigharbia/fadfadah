import React from 'react'
import {Helmet} from 'react-helmet'

import '../css/Wall.css'
import loveMessage from '../../imgs/love-message.png'
import LoadMessages from './loadMessages'

export default function DailyMsg() {
  return (
    <div className="container">
      <Helmet>
        <title>Messages | Fadfada.com</title>
      </Helmet>
      <h1>
        Daily Message <img src={loveMessage} alt="love-message" />
      </h1>
      <span>Every 24 hours you'll get a new msg !</span>
      <LoadMessages />
    </div>
  )
}
