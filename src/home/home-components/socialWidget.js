import React from 'react';

const SocialWidget = (props) => {
  return (
    <div className="socialWidget" style={{background:props.color}}>
      <img src={props.img} alt="facebook-login" />
      <p>{props.text}</p>
  </div>
  )
}

export default SocialWidget;
