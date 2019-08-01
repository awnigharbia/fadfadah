import React from 'react'
import {Twemoji} from 'react-emoji-render'

import mail from '../../imgs/mail.png'

export default function Message({body}) {
  return (
    <div className="message">
      <div className="msg-header">
        <img src={mail} alt="mail" />
      </div>
      <div className="msg-body">
        <Twemoji svg text={body} />
      </div>
    </div>
  )
}
