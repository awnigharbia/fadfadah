import React, { Component } from "react";
import Auth from '../../auth';
import "../css/Wall.css";


//components
import PostReactions from "./postreactions";
import PostText from "./posttext";
import UserInfo from './userInfo';
import DropdownMore from './dropdown';

export default class Post extends Component {
  state = {
    reported:false,
    more: false
  };

  moreShow = () => {
    const { more } = this.state;

    more ? this.setState({ more: false }) : this.setState({ more: true });
  };

  sendReport = async() => {
    const sendReport =   await fetch('http://localhost:3001/rpost', {
      method:'post',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "auth": Auth.getToken(),
        },
        body:`postId=${this.props.id}&userId=${this.props.user_id}`
      });
      const data = await sendReport.json()
      if(data.success) {
        this.setState({
          reported:true,
        }, () => {
          setTimeout(() => {
            this.setState({
              reported: false,
            })
          }, 1500)
        })
      }
  }

  render() {
    return (
      <div className="post">
        <div className="user-info">
          {/* Top user information  */}
          <UserInfo name="Anonymous 👻👻" time="about an hour" />
          {/* Dropdown for save and report post  */}
          <DropdownMore 
              {...this.state}
              moreShow={this.moreShow}
              sendReport={this.sendReport} 
                />
        </div>
          {/* the text of the post */}
          <PostText text={this.props.text} />
          {/* conatins the comments and the post reactions */}
          <PostReactions 
            id={this.props.id} 
            motivate={this.props.motivate}
            user_id={this.props.user_id} />
      </div>
    );
  }
}


