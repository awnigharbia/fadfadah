import React from "react";
import "../css/Wall.css";
import { Oldd } from "./old";

//imgs
import logo from "../../imgs/small.png";
import wall from "../../imgs/newspaper.png";
import dailymsg from "../../imgs/letter.png";
import profile from "../../imgs/userM.png";
import notifications from "../../imgs/notification.png";
import settingsTop from "../../imgs/settingsT.png";
import logout from "../../imgs/logoutT.png";

const Mnav = props => {
  return (
    <nav id="mobile">
      <div className="top-nav-wrapper">
        <div className="small-logo">
          <div id="settings">
            <img
              onClick={props.showSettings}
              src={settingsTop}
              alt="settings"
            />
          </div>
          <img src={logo} alt="logo" />
          <div id="logout">
            <img src={logout} onClick={props.logout} alt="logout" />
          </div>
        </div>
        <div className="links-wrapper">
          <div className="links">
            <Oldd to="/account/wall" activeOnlyWhenExact={true} img={wall} />
            <Oldd to="/account/dailymsg" img={dailymsg} />
            <Oldd to="/account/profile" img={profile} />
            <Oldd to="/account/notifications" img={notifications} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Mnav;
