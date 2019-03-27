import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import qs from "qs";
import { Picker } from "emoji-mart";
import { Twemoji } from "react-emoji-render";
import Auth from "../../auth";
import "../css/Wall.css";
import "../css/picker.css";

import status from "../../imgs/status.png";
import post from "../../imgs/post.png";
import Close from "../../imgs/close.png";
import talk from "../../imgs/talk.svg";
import talkOffline from "../../imgs/talkOffline.svg";

export default class NewPost extends Component {
  state = {
    tags: false,
    postValue: "",
    alert: { text: "The max length 1000 *", color: "lightgray", post: true },
    close: false,
    picker: false,
    tag: []
  };

  onFocus = () => {
    this.setState(
      {
        tags: true,
        close: true
      },
      () => {
        this.getTags();
      }
    );
  };

  hideTags = () => {
    const { alert } = this.state;
    let newAlert = Object.assign({}, alert);
    newAlert.text = "The max length 1000 *";
    newAlert.color = "lightgray";

    this.setState({
      tags: false,
      close: false,
      alert: newAlert,
      postValue: ""
    });
  };

  triggerPicker = () => {
    const { picker } = this.state;

    if (picker) {
      this.setState({
        picker: false,
        tags: false
      });
    } else {
      this.setState({
        picker: true,
        tags: true
      });
    }
  };

  activePostTag = (id, key) => {
    const { tag } = this.state;
    var newState = Object.assign({}, this.state);
    newState = newState.tag.slice();

    if (newState[key].active === true) {
      this.setState({
        tag: [
          ...tag.map(x => {
            if (x._id === id) {
              return {
                ...x,
                active: false
              };
            }
            return x;
          })
        ]
      });
    } else {
      this.setState({
        tag: [
          ...tag.map(x => {
            if (x._id === id) {
              return {
                ...x,
                active: true
              };
            }
            return x;
          })
        ]
      });
    }
  };

  changePostText = e => {
    const { alert } = this.state;
    let newAlert = Object.assign({}, alert);
    newAlert.text = e.target.value.length + " / 1000";
    newAlert.color = "gray";

    if (e.target.value.length >= 1001) return;
    this.setState({
      postValue: e.target.value,
      alert: newAlert
    });
  };

  getTags = async () => {
    const gTags = await fetch("http://localhost:3001/tag", {
      headers: {
        auth: Auth.getToken()
      }
    });
    const tags = await gTags.json();
    if (tags.length !== 0) {
      await this.setState({
        tag: tags
      });
    }
  };

  checkStatusToPost = callback => {
    const { postValue, alert, tag } = this.state;
    const Check = postValue.trim();
    const tags = [];

    tag.map(item => (item.active === true ? tags.push(item._id) : null));

    //Check if the text is empty or not
    if (Check === "") {
      let newAlert = Object.assign({}, alert);
      newAlert.text = "The post shouldn't be empty";
      newAlert.color = "#E53935";
      newAlert.post = false;

      this.setState({
        alert: newAlert
      });
      return callback(false);
    }

    //check the post length >= 100
    if (postValue.length <= 100) {
      let newAlert = Object.assign({}, alert);
      newAlert.text = "Your post length must be at least 100 charactar";
      newAlert.color = "#E53935";
      newAlert.post = false;

      this.setState({
        alert: newAlert
      });
      return callback(false);
    }

    //Check specific words in text
    const distenctWords = [
      "fuck",
      "pussy",
      "boobs",
      "puss",
      "fucked",
      "fucking",
      "ass",
      "dick",
      "sex",
      "sexy",
      "sexxy",
      "sexxx",
      "sexygirl"
    ];

    distenctWords.map(item => {
      if (postValue.indexOf(item) !== -1) {
        let newAlert = Object.assign({}, alert);
        newAlert.text = "Dont use bad words";
        newAlert.color = "#E53935";
        newAlert.post = false;

        this.setState({
          alert: newAlert
        });
        return callback(false);
      }

      return null;
    });

    //Check if the text have links
    if (this.ValidURL(postValue)) {
      let newAlert = Object.assign({}, alert);
      newAlert.text = "Links not allowed in post";
      newAlert.color = "#E53935";
      newAlert.post = false;

      this.setState({
        alert: newAlert
      });
      return callback(false);
    }
    //Check if the text have phone number
    if (!this.ValidPhone(postValue)) {
      let newAlert = Object.assign({}, alert);
      newAlert.text = "Phone number not allowed in post";
      newAlert.color = "#E53935";
      newAlert.post = false;

      this.setState({
        alert: newAlert
      });
      return callback(false);
    }

    // Check if the tags are more than 3
    if (!this.ValidateTags(tags)) {
      let newAlert = Object.assign({}, alert);
      newAlert.text = "You must at least 3 tags";
      newAlert.color = "#E53935";
      newAlert.post = false;

      this.setState({
        alert: newAlert
      });
      return callback(false);
    }

    return callback(true);
  };
  posted = () => {
    let newAlert = Object.assign({}, alert);
    newAlert.text = "Posted !!";
    newAlert.color = "lightgray";
    newAlert.post = true;
    // Reset the form
    this.setState(
      {
        alert: newAlert,
        postValue: "",
        close: false,
        tags: false
      },
      () => {
        // refresh the posts component ..
        this.props.refresh();
      }
    );
  };
  submitPost = e => {
    e.preventDefault();
    const { postValue, tag } = this.state;
    // const Check = postValue.trim();
    const tags = [];

    tag.map(item => (item.active === true ? tags.push(item._id) : null));

    this.checkStatusToPost(result => {
      if (result) {
        const t = qs.stringify({ tags }, { indices: false });
        fetch("http://localhost:3001/post", {
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            auth: Auth.getToken()
          },
          body: `description=${postValue}&` + t
        })
          .then(res => {
            // Check if the status
            if (res.status === 200) {
              this.posted();
            }
          })
          .catch(function(err) {
            // console.log(err)
          });
      }
    });
  }; //Submit Post

  addEmoji = emoji => {
    this.setState(prevState => {
      return {
        postValue: prevState.postValue + emoji.native
      };
    });
  };

  ///////////////////////// Validation //////////////////////////////////
  ValidURL = str => {
    var expression = /[-a-zA-Z0-9@:%_.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_.~#?&//=]*)?/gi;
    var pattern = new RegExp(expression);
    if (!pattern.test(str)) {
      return false;
    } else {
      return true;
    }
  };
  ValidPhone = str => {
    if (str.replace(/[^0-9]/g, "").length >= 5) {
      return false;
    } else {
      return true;
    }
  };
  ValidateTags = tags => {
    if (tags.length < 3) {
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {}

  render() {
    const { tags, tag, close, postValue, alert, picker } = this.state;

    return (
      <div className="post-wrapper">
        <Topics />
        <div className="addPost">
          <img
            src={Close}
            alt="close"
            id="close"
            onClick={this.hideTags}
            style={{ display: close ? "block" : "none" }}
          />
          <div className="add-post-text">
            <TextareaAutosize
              rows={4}
              onFocus={this.onFocus}
              value={postValue}
              onChange={this.changePostText}
              placeholder="What is in your mind ? "
            />
            <div className="tags" style={{ display: tags ? "flex" : "" }}>
              <ul>
                {tag.map((item, key) => (
                  <p
                    key={item._id}
                    className={item.active ? "activeHash" : ""}
                    onClick={() => this.activePostTag(item._id, key)}
                  >
                    #{item.name}
                  </p>
                ))}
              </ul>
            </div>
          </div>
          <Picker
            set="emojione"
            onClick={this.addEmoji}
            style={{ display: picker ? "block" : "none" }}
          />
          <BottomPost
            text={alert.text}
            color={alert.color}
            picker={picker}
            triggerPicker={this.triggerPicker}
            submitPost={this.submitPost}
          />
        </div>
      </div>
    );
  }
}

const Topics = () => {
  return (
    <div className="topics">
      <div className="topic">
        <img src={status} alt="status" />
        <p>
          Share a story <Twemoji text="🤐" />
        </p>
      </div>
    </div>
  );
};

const BottomPost = props => {
  return (
    <div className="add-post-bottom">
      <div className="post">
        <p
          style={{
            opacity: props.text !== "" ? "1" : "0",
            backgroundColor: props.color !== "" ? props.color : ""
          }}
        >
          {props.text}
        </p>
        <div className="emoji-picker" onClick={props.triggerPicker}>
          <img src={props.picker ? talk : talkOffline} alt="empoji-picker" />
        </div>
        <button onClick={props.submitPost}>
          POST <img src={post} alt="post-img" />
        </button>
      </div>
    </div>
  );
};
