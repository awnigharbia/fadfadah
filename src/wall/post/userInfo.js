import React from 'react';
import userPhoto from "../../imgs/user.png";


const UserInfo = props => {
    return (
      <div className="user-info-wrapper">
        <img src={userPhoto} alt="userPhoto" />
        <div className="ut">
          <h1>{props.name}</h1>
          <p>{props.time}</p>
        </div>
      </div>
    );
  };

  export default UserInfo;