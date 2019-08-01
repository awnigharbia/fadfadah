import React from 'react'

import {Twemoji} from 'react-emoji-render'

function ProfilePost({position, onClick, text}) {
  return (
    <div className={`con con-${position}`}>
      <div className="cont">
        <div className="cont-up">
          <h2>
            <Twemoji svg text="📌📌" />
          </h2>
          <button onClick={onClick}>X</button>
        </div>
        <p>
          <Twemoji svg text={text} />
        </p>
      </div>
    </div>
  )
}

export default ProfilePost
