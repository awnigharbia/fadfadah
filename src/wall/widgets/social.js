import React from "react";
import { Twemoji } from 'react-emoji-render';
import "../css/Wall.css";


import facebook from '../../imgs/facebookS.png';
import instagram from '../../imgs/instagram.png';
import twitter from '../../imgs/twitterS.png';
import messenger from '../../imgs/messenger.png';


const SocialMedial = () => {
    return (
      <div className="socialmedia">
        <h1>Stay with Us ? <Twemoji text="🤒🤕" /></h1>
        <div className="icons">
          <img src={facebook} alt="facebook" />
          <img src={twitter} alt="twitter" />
          <img src={instagram} alt="instagram" />
          <img src={messenger} alt="messenger" />
        </div>
      </div>
    )
  }
  
  export default SocialMedial;