import React, { Component } from "react";
import "../css/Wall.css";

//components
import PostReactions from "./postreactions";
import PostText from "./posttext";
import UserInfo from "./userInfo";
import PostDropdown from "./dropdown";

export default class Post extends Component {
  state = {
    more: false
  };

  moreShow = () => {
    const { more } = this.state;

    more ? this.setState({ more: false }) : this.setState({ more: true });
  };

  render() {
    return (
      <div className="post">
        <div className="user-info">
          {/* Top user information  */}
          <UserInfo name="Anonymous 👻👻" time="about an hour" />
          {/* Dropdown for save and report post  */}
          <PostDropdown
            {...this.state}
            moreShow={this.moreShow}
            id={this.props.id}
          />
        </div>
        {/* the text of the post */}
        <PostText text={this.props.text} />
        {/* conatins the comments and the post reactions */}
        <PostReactions {...this.props} />
      </div>
    );
  }
}
