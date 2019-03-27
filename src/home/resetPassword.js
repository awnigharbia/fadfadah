import React, { Component } from "react";
import "../App.css";

import Link from "./home-components/myLink";
//logo
import logo from "../imgs/logo.webp";

export default class ResetPassword extends Component {
  render() {
    return (
      <div className="form-wrap">
        <Link to="/home/start">
          <img src={logo} alt="logo" />
        </Link>
        <div className="form-reset">
          <h1>Reset Password</h1>
          <input
            type="text"
            placeholder="email"
            autoFocus
            style={{ marginTop: 0 }}
          />
          <button type="submit">Reset</button>
        </div>
      </div>
    );
  }
}
