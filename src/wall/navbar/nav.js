import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Auth from '../../auth';
import "../css/Wall.css";

//components
import Settings from './settings/settings';
import Mnav from './mnav';
import Wnav from './wnav';


export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      loggedOut: false,
    };
  }

  hideDropdown = () => {
    this.setState({
      dropdown: false,
    });
  };

  showDropdown = () => {
    this.setState({
      dropdown: true
    });
  };

  showSettings = () => {
    this.setState({
      setShow: true
    });
  };
  hideSettings = () => {
    this.setState({
      setShow: false
    });
  };
  hideSetting = event => {
    if (event.target.className === "modal") {
      this.setState({
        setShow: false
      });
    }
  };
  logout = e => {
    Auth.deauthenticateUser();
    this.setState({
      loggedOut: true,
    });
  }

  render() {
    const { dropdown, setShow, loggedOut } = this.state;

    if (loggedOut) {
      return  <Redirect to="/home/start" push />;
    } else {
        return (
          <div className="wall">
            <div className="top" />
            <Wnav
                hideDropdown={this.hideDropdown}
                showDropdown={this.showDropdown}
                logout={this.logout}
                showSettings={this.showSettings}
                alertNotification={this.props.alertNotification}
                alertDailyMsgs={this.props.alertDailyMsgs}
                dropdown={dropdown}
              />
            <Mnav
              logout={this.logout}
              showSettings={this.showSettings}
              alertNotification={this.props.alertNotification}
              alertDailyMsgs={this.props.alertDailyMsgs}
             />
            <Settings 
              setShow={setShow} 
              hideSetting={this.hideSetting} 
              hideSettings={this.hideSettings}
              changeToArabic={this.props.changeToArabic}
              changeToEnglish={this.props.changeToEnglish}
              lang={this.props.lang}
              />
          </div>
        );
      }
    }
  }
