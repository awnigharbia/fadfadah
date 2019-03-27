import React from 'react';
import { Twemoji } from 'react-emoji-render'

//imgs
import moree from "../../imgs/more.png";
import moreActive from "../../imgs/moreActive.png";

const DropdownMore = props => {
    return (
      <div className="more">
        <img
          onClick={props.moreShow}
          src={props.more ? moreActive : moree}
          alt="more"
        />
        <div
          className="dropdown-content"
          style={{ display: props.more ? "block" : "none" }}
        >
          <button  onClick={props.sendReport}>{props.reported ? <Twemoji svg text="Reported 🤦" /> : 'Report'}</button>
        </div>
      </div>
    );
  };

  export default DropdownMore;
  