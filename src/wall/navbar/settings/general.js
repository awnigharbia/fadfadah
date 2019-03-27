import React, { Component } from "react";
import "../../css/Wall.css";
import Auth from "../../../auth";

export default class General extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  email = e => {
    const newEmail = e.target.value;

    this.setState({
      email: newEmail
    });
  };

  save = e => {
    e.preventDefault();
    if (this.state.email === "") {
      console.log("Email Shoudln't be empty");
    } else {
      fetch("http://localhost:3001/user", {
        method: "put",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          auth: Auth.getToken()
        },
        body: `email=${this.state.email}`
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          console.log(json);
        });
    }
  };

  componentDidMount() {
    fetch("http://localhost:3001/user", {
      headers: {
        auth: Auth.getToken()
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          placeholder: json.user.email,
          username: json.user.username,
          fullname: json.user.fullname
        });
      });
  }

  render() {
    const { email, placeholder, username, fullname } = this.state;

    return (
      <form
        className="general"
        style={{ display: this.props.show ? "flex" : "none" }}
      >
        <div className="general-content">
          <label>Change your name:</label>
          <input
            type="text"
            disabled
            placeholder={fullname}
          />
          <label>Change your username:</label>
          <input
            type="text"
            disabled
            placeholder={username}
          />
          <label>Change your email:</label>
          <input
            type="email"
            value={email}
            onChange={this.email}
            placeholder={placeholder}
            required
          />
        </div>
        <div className="bottom">
          <button onClick={this.props.hide}>Cancel</button>
          <button onClick={this.save}>Save</button>
        </div>
      </form>
    );
  }
}
