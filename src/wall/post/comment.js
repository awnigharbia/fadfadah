import React, { Component } from "react";
import { Twemoji } from 'react-emoji-render'
import "../css/Wall.css";

//imgs
import userPhoto from "../../imgs/user.png";

export default class Comment extends Component {
  state = {
    slicedText: '',
    showmore: false
  };
  showFullComment = e => {
    e.preventDefault();
    this.setState({
      showmore: false,
    });
  };
  componentDidMount() {
    const { text } = this.props;
    if (text.length > 200) {
      this.setState({ slicedText: text.slice(0, 100), showmore: true });
    } else {
      this.setState({
        showmore: false
      });
    }
  }

  render() {
    const { text } = this.props;
    const { slicedText, showmore } = this.state;
    return (
      <div className="comment">
        <div className="comment-img">
          <img src={userPhoto} alt="userimg" />
        </div>
        <div className="comment-text">
          <p>
            {showmore ? <Twemoji svg text={slicedText} /> : <Twemoji svg text={text} />}
            <a
              href=""
              onClick={this.showFullComment}
              style={{ display: showmore ? "block" : "none" }}
            >
              Show more
            </a>
          </p>
        </div>
      </div>
    );
  }
}
