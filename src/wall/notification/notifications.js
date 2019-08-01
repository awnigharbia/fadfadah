import React from "react";
import "../css/Wall.css";
import { Helmet } from "react-helmet";

//imgs
import notificationImg from "../../imgs/notification.jpg";

//Components
import LoadNotifications from "./loadNotifications";

export default function Notification() {
  return (
    <div className="notifications">
      <Helmet>
        <title>Notifications | Fadfada.com</title>
      </Helmet>
      <h1>
        Notifications <img src={notificationImg} alt="notification" />
      </h1>

      <LoadNotifications />
    </div>
  );
}
