import React, { Component } from "react";
import Auth from "../../auth";
import "../css/Wall.css";

//imgs
import notificationImg from "../../imgs/notification.jpg";

//Components
import NotificationItem from "./notificationItem";

export default class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: []
    };
  }
  getNoti = () => {
    fetch("http://localhost:3001/noti", {
      headers: {
        auth: Auth.getToken()
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        // const {notification} = this.state

        this.setState(
          prevState => {
            if (json.noti.length > prevState.notification.length) {
              return {
                notification: json.noti
              };
            } else {
              return null;
            }
          },
          () => {
            if (this.state.notification.length !== 0) {
              const lastID = this.state.notification[0].count;
              this.props.setLastSeenNoti(lastID);
            }
          }
        );
      });
  };
  componentDidMount() {
    this.getNoti();
  }
  render() {
    const { notification } = this.state;
    return (
      <div className="notifications">
        <h1>
          Notifications <img src={notificationImg} alt="notification" />
        </h1>
        <div className="notification-list">
          <ul>
            {notification.map(item =>
              item.notiCode === 1 ? (
                <NotificationItem
                  key={item._id}
                  postId={item.post_id}
                  text="Somebody motivate your post"
                />
              ) : item.notiCode === 2 ? (
                <NotificationItem
                  key={item._id}
                  postId={item.post_id}
                  text="Somebody Commented on your post"
                />
              ) : null
            )}
          </ul>
        </div>
      </div>
    );
  }
}
