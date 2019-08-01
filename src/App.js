import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import withContext from "./hooks/useAuthenticatedUser";
//Components
import Login from "./home/login/";
import Signup from "./home/signup/";
import Start from "./home/";
import ResetPassword from "./home/resetPassword";

const LoginWithUser = withContext(Login);

export default class app extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Start
                  changeToArabic={this.props.changeToArabic}
                  changeToEnglish={this.props.changeToEnglish}
                />
              )}
            />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={LoginWithUser} />
            <Route path="/ResetPassword" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}
