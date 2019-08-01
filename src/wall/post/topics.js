import status from '../../imgs/status.png'
import React from 'react'
import {Twemoji} from 'react-emoji-render'

const Topics = () => {
  return (
    <div className="topics">
      <div className="topic">
        <img src={status} alt="status" />
        <p>
          Share a story <Twemoji text="🤐" />
        </p>
      </div>
    </div>
  )
}

export default Topics
