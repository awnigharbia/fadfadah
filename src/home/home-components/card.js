import React from 'react';
import '../../App.css';
import './start.css';

const Card = props => {
    return (
      <div className="f-card">
        <div className="f-img">
          {<img src={props.src} alt={props.src}/>}
          </div>  
          <div className="f-t">
              <h1>{props.title}</h1>
            </div>
          <div className="f-d">
            <p>{props.breif}</p>
            </div>
         </div>
    )
  }
  
  export default Card