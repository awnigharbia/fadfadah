import React, {Component} from 'react'
import Scroll from 'react-scroll'
import {Route, Switch} from 'react-router-dom'
import io from 'socket.io-client'
import Auth from '../auth'
import '../App.css'

//components
import Nav from './navbar/nav'
import Wall from './wall/wall'
import Profile from './profile/profile'
import Dailymsg from './dailymsg/dailymsg'
import Notification from './notification/notifications'
import Spost from './spost/spost'

const scroll = Scroll.animateScroll
const socket = io.connect('http://localhost:3001', {
    query: 'token=' + Auth.getToken()
  });


export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empty:false,
      newNotification:{},
      alertNotification:false,
      alertDailyMsgs:false,
    }
  }

  getUserId = () => {
    fetch('http://localhost:3001/user', {
      headers: {
            "auth":Auth.getToken(),
        },
      })
      .then((res) => {
        if(res.status === 401) {
          Auth.deauthenticateUser()
        } else {
          return res.json()
        }
      })
      .then((json) => {
        const lastSeenNoti = json.user.lastSeenNoti;
        const lastSeenMsg = json.user.lastSeenMsg;

        // check the daily Alerts
        fetch('http://localhost:3001/daily', {
          headers: {
                "auth":Auth.getToken(),
            },
        }).then((res) => {
          return res.json();
        }).then((json) => {
            if (json.msgs.length !== 0 && json.msgs[0].count > lastSeenMsg) {
              this.setState({
                alertDailyMsgs:true,
              })
            }
        });
        
        //Check the notification alerts
        fetch('http://localhost:3001/noti', {
          headers: {
              "auth": Auth.getToken(),
            },
        })
        .then((res) => res.json())
        .then((json) => {
          if(json.noti.length !== 0 && json.noti[0].count > lastSeenNoti) {
            this.setState({
              alertNotification:true,
            })
          }
        })
        
        // Fire sockt.io listener to the notifications
        socket.on(`${json.user._id} + 'notification'`, (data) => {
            if (data.count > lastSeenNoti) {
              this.setState({
                alertNotification:true,
              })
            }
          })

         // Fire sockt.io listener to the dailymsgs  
        socket.on('dailyMsg', (data) => {
          if(data.count > lastSeenMsg) {
            this.setState({
              alertDailyMsgs:true,
            })
          }
        })
      })
  }

  setLastSeenNoti = (lastseen) => {
    const {alertNotification} = this.state;

    fetch('http://localhost:3001/lastseennoti', {
      method:'put',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "auth": Auth.getToken(),
        },
        body: `lastSeenNoti=${lastseen}`,
    })
    // make sure that alertNotifiction is not false by default..
    if ( alertNotification !== false) {
      this.setState({
        alertNotification:false,
      })
    }
  }

  setLastSeenMsg = (lastseen) => {
    const {alertDailyMsgs} = this.state;

    fetch('http://localhost:3001/lastseenmsg', {
      method:'put',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "auth": Auth.getToken(),
        },
        body: `lastSeenMsg=${lastseen}`,
    })

    // make sure that alertNotifiction is not false by default..
    if ( alertDailyMsgs !== false) {
      this.setState({
        alertDailyMsgs:false,
      })
    }
  }
  componentDidMount() {
    this.getUserId()
  }
  render() {
    return (
      <div className="wall-wrapper">
        <Nav  
            changeToArabic={this.props.changeToArabic}
            changeToEnglish={this.props.changeToEnglish} 
            lang={this.props.lang}
            alertNotification={this.state.alertNotification}
            alertDailyMsgs={this.state.alertDailyMsgs}
            />
        <div className="content">
          <Switch>
            <Route exact path ="/account/wall" render={() => {
              scroll.scrollToTop()
              return (
                <Wall />
              )
            }} />
            <Route exact path="/account/post/:id" component={Spost} />
            <Route exact  path="/account/profile" render={() => {
              scroll.scrollToTop()
              return (
                <Profile />
              )
            }} />
            <Route exact  path="/account/dailymsg" render={() => {
              scroll.scrollToTop()
              return (
                <Dailymsg
                  setLastSeenMsg={this.setLastSeenMsg}
                  />
              )
            }} />
            <Route exact  path="/account/notifications" render={() => {
              scroll.scrollToTop()
              return (
                <Notification 
                  setLastSeenNoti={this.setLastSeenNoti}
                  />
              )
            }} />
          </Switch>
        </div>
      </div>
    )
  } 
}
