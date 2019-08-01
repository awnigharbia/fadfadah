import React, { Component } from "react";
import Link from "../../home/home-components/myLink";
import "../css/Wall.css";

import notificationMsg from "../../imgs/notification-msg.png";

class NotificationItem extends Component {
  render() {
    const url = `/account/post/${this.props.postId}`;
    return (
      <Link className="notification-item" to={url}>
        <img src={notificationMsg} alt="notificationMsg" />
        <p>{this.props.text}</p>
      </Link>
    );
  }
}

export default NotificationItem;
