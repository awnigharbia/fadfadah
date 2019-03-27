import React, {Component} from 'react'
import './App.css'
import {Route} from 'react-router-dom'

//Components
import Login from './home/login'
import Signup from './home/signup'
import Start from './home/start'
import ResetPassword from './home/resetPassword'

export default class app extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="app">
          <Route
            exact
            path="/home/start"
            render={() => (
              <Start
                changeToArabic={this.props.changeToArabic}
                changeToEnglish={this.props.changeToEnglish}
              />
            )}
          />
          <Route exact path="/home/Signup" component={Signup} />
          <Route exact path="/home/Login" component={Login} />
          <Route exact path="/home/ResetPassword" component={ResetPassword} />
        </div>
      </div>
    )
  }
}
