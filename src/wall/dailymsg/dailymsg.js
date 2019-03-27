import React, { Component } from "react";
import { Twemoji } from 'react-emoji-render'
import Auth from '../../auth';
import "../css/Wall.css";

import mail from '../../imgs/mail.png';
// import garbage from '../../imgs/garbage.png';
import loveMessage from '../../imgs/love-message.png';

export default class Dailymsg extends Component {
  constructor(props) {
    super(props);

    this.state = {
       msgs:[],
    }
  }

  getDaily = () => {
    fetch('http://localhost:3001/daily', {
        headers: {
              "auth":Auth.getToken(),
          },
      }).then((res) => {
        return res.json();
      }).then((json) => {
        this.setState({
          msgs:json.msgs,
        }, () => {
          if (this.state.msgs.length !== 0) {
            const lastID = this.state.msgs[0].count
            this.props.setLastSeenMsg(lastID)
          }
        });
      });
  }
  componentDidMount() {
    this.getDaily();
  }

  render() {
    const {msgs} = this.state;

    return (
      <div className="container">
        <h1>Daily Message <img src={loveMessage} alt="love-message" /></h1>
        <span>Every 24 hours you will get a new msg !</span>
        {msgs.map((msg) => {
          return <Message
                    key={msg._id}
                    title={msg.title}
                    body={msg.description}
                  />
              })}
      </div>
    );
  }
}

const Message = (props) => {
  return (
    <div className="message">
      <div className="msg-header">
          <img src={mail} alt="mail" />
      </div>
      <div className="msg-body">
        <p id="body"><Twemoji svg text={props.body} style={{fontSize:15}} /></p>
      </div>
    </div>
  )
}
