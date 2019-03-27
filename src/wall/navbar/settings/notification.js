import React, { Component } from "react";
import Auth from '../../../auth';
import "../../css/Wall.css";


class Notification extends Component {
  constructor(props) {
      super(props);

      this.state = {
        appN: '',
        browserN: '',
        NotificationS: '',
      }
  }

  appN = () => {
    const {appN} = this.state;
    if ( appN ) {
      this.setState({
        appN: false,
      })
    } else {
      this.setState({
        appN: true,
      })
    }
  }

  browserN = () => {
    const {browserN} = this.state;

    if ( browserN ) {
      this.setState({
        browserN: false,
      })
    } else {
      this.setState({
        browserN: true,
      })
    }
  }

  NotificationS = () => {
    const {NotificationS} = this.state;

    if ( NotificationS ) {
      this.setState({
        NotificationS: false,
      })
    } else {
      this.setState({
        NotificationS: true,
      })
    }

  }

  save = e => {
    e.preventDefault();

    fetch('http://localhost:3001/notification', {
          method:'put',
          headers: {
              "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "auth": Auth.getToken(),
            },
            body: `appN=${this.state.appN}&browserN=${this.state.browserN}&NotificationS=${this.state.NotificationS}`,
        })
  }

  componentDidMount() {
    fetch('http://localhost:3001/user', {
          headers: {
              "auth": Auth.getToken(),
            },
        }).then((res) => {
          return res.json();
        }).then((json) => {
          this.setState({
            appN: json.user.appN,
            browserN: json.user.browserN,
            NotificationS: json.user.NotificationS
          })
        })
  }

  render() {
    const {  appN, browserN, NotificationS } = this.state;

    return (
      <form className="notifications-settings" style={{ display: this.props.show ? "flex" : "none" }} >
        <div className="notifications-settings-content">
          <Nwidget name="App Notification" check={appN} change={this.appN} />
          <Nwidget name="Browser Notification" check={browserN} change={this.browserN} />
          <Nwidget name="Notification Sound" check={NotificationS} change={this.NotificationS} />
          <Nwidget name="Email Notification" check={false} />
        </div>
        <div className="notification-bottom">
          <button onClick={this.props.hide}>Cancel</button>
          <button onClick={this.save}>Save</button>
        </div>
      </form>
    );
  }
};


const Nwidget = props => {

  return (
    <div className="n-widget">
      <p>{props.name}</p>
      <label className="switch">
      {props.check ? <input type="checkbox" defaultChecked onClick={props.change} /> : <input type="checkbox" onClick={props.change} /> }


        <span className="slider round" />
      </label>
    </div>
  );
};

export default Notification;
