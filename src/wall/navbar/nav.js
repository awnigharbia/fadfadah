import React, {Component, Suspense} from 'react'
import {Redirect} from 'react-router-dom'
import '../css/Wall.css'
import Auth from '../../auth'

//components
import Mnav from './mnav'
import Wnav from './wnav'
const Settings = React.lazy(() => import('./settings/settings'))

export default class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dropdown: false,
      loggedOut: false,
      isSettings: false,
    }
  }

  hideSetting = event => {
    if (event.target.className === 'modal') {
      this.setState({
        isSettings: false,
      })
    }
  }
  logout = e => {
    Auth.deauthenticateUser()
    this.setState({
      loggedOut: true,
    })
  }

  handleToggle = (prop, value) => {
    this.setState(prevState => ({
      [prop]: value,
    }))
  }

  render() {
    const {dropdown, isSettings, loggedOut} = this.state

    if (loggedOut) {
      return <Redirect to="/" push />
    } else {
      return (
        <div className="wall">
          <div className="top" />
          <Wnav
            hideDropdown={() => this.handleToggle('dropdown', false)}
            showDropdown={() => this.handleToggle('dropdown', true)}
            logout={this.logout}
            showSettings={() => this.handleToggle('isSettings', true)}
            alert={this.props.alert}
            dropdown={dropdown}
          />
          <Mnav
            logout={this.logout}
            showSettings={() => this.handleToggle('isSettings', true)}
            alertNotification={this.props.alertNotification}
            alertDailyMsgs={this.props.alertDailyMsgs}
          />
          {isSettings && (
            <Suspense fallback={<div>Loading...</div>}>
              <Settings
                hideSetting={this.hideSetting}
                hideSettings={() => this.handleToggle('isSettings', false)}
                changeToArabic={this.props.changeToArabic}
                changeToEnglish={this.props.changeToEnglish}
                lang={this.props.lang}
              />
            </Suspense>
          )}
        </div>
      )
    }
  }
}
