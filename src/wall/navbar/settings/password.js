import React, { Component } from "react"
import "../../css/Wall.css"
import Auth from '../../../auth'


class Password extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      oldPassword:'',
      newPassword:'',
      checkPassword:'',
      msg:'',
    }
  }

  oldPassword = e => {
    const old = e.target.value;

    this.setState({
      oldPassword: old,
    })
  }

  newPassword = e => {
    const newPassword = e.target.value;

      this.setState({
        newPassword: newPassword,
      })
  }
  checkPassword = e => {
    const checkPassword = e.target.value;

      this.setState({
        checkPassword: checkPassword,
      })
  }

  checkPasswordF = () => {
    const { newPassword, checkPassword, oldPassword } =  this.state;

    if (newPassword !== '' && checkPassword !== '' && oldPassword !== '') {
      if( newPassword === checkPassword ) {
            fetch('http://localhost:3001/password', {
              method:'put',
              headers: {
                  "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "auth": Auth.getToken(),
                },
                body: `oldPassword=${this.state.oldPassword}&newPassword=${this.state.newPassword}`,
            }).then((res) => {
                return res.json()
            }).then((json) => {
                this.setState({
                  oldPassword:'',
                  newPassword:'',
                  checkPassword:'',
                  msg:'Password updated successfully'
                })
            })
        }
      } else {
        this.setState({
          msg:"Password doesn't match !",
        })
      }
  }

  save = e => {
    e.preventDefault();
    this.checkPasswordF();
  }

  render() {
    const {oldPassword, newPassword, checkPassword} = this.state;

    return (
      <div className="password" style={{ display: this.props.show ? "flex" : "none" }}>
        <div className="password-content">
          <label>Enter the Old Password:</label>
          <input type="password" value={oldPassword} onChange={this.oldPassword} placeholder="Old Password" />
          <label>Enter the new Password:</label>
          <input type="password" value={newPassword} onChange={this.newPassword} placeholder="New Password" />
          <label>Confirm the new Password:</label>
          <input type="password" value={checkPassword} onChange={this.checkPassword} placeholder="New Password" />
        </div>
        <div className="bottom">
          <button onClick={this.props.hide}>Cancel</button>
          <button onClick={this.save}>Save</button>
        </div>
      </div>
    );
}
};

export default Password;
