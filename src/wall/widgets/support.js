import React from 'react'
import '../css/Wall.css'

//imgs
import support from '../../imgs/support.png'

const Support = props => {
  return (
    <div className="support-wrapper">
      <div className="support">
        <div className="overlay">
          <a href="eval:void(0)">
            <img src={support} alt="support" />
            {props.msg}
          </a>
        </div>
      </div>
    </div>
  )
}

export default Support
