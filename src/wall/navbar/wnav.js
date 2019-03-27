import React from "react";
import "../css/Wall.css";
import {Old} from './old';

//imgs
import logo from "../../imgs/small.png";
import setting from "../../imgs/settings.png";

const Wnav = props => {
  const {dropdown} = props;
    return (
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="links-wrapper">
          <div className="links">
            <Old to="/account/wall" activeOnlyWhenExact={true} label="Wall" />
            <Old to="/account/dailymsg" label="Daily Messages" alertD={props.alertDailyMsgs}/>
            <Old to="/account/profile" label="Profile" />
            <Old  to="/account/notifications" label="Notification" alert={props.alertNotification}/>
            <div
              id="settings"
              onMouseLeave={props.hideDropdown}
              onMouseEnter={props.showDropdown}
            >
              <img src={setting} alt="settings" />
              <div
                className="dropdown-content"
                style={{ display: dropdown ? "block" : "none" }}
              >
                <button onClick={props.showSettings}>Settings</button>
                <button onClick={props.logout}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Wnav;
