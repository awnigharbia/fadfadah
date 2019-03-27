import React, { Component } from "react";
import Auth from '../../auth';
import "../css/Wall.css";

//imgs
import motivatee from "../../imgs/motivation.png";
import motivated from "../../imgs/motivated.png";
// import share from "../../imgs/share.png";
import comment from "../../imgs/comment.png";

//components
import Comments from "./comments";

export default class PostReactions extends Component {
  state = {
    motivate: this.props.motivate,
    likedUsersLength:0,
    comShow: false,
    comments:[],
  };

  getComments = async() => {
   const getComments = await fetch('http://localhost:3001/comments', {
      method:'post',
      headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth": Auth.getToken(),
        },
        body: `post_id=${this.props.id}`,
    });
    const Lcomments = await getComments.json();
    if (Lcomments.comments.length !== -1) {
      await this.setState({
        comments:Lcomments.comments,
      })
    }
  }
  
  refreshNumbers = () => {
    const id = this.props.id
    fetch(`http://localhost:3001/post/${id}`, {
      headers: {
            "auth":Auth.getToken(),
        },
    }).then((res) => {
      return res.json();
    }).then((json) => {
      if (json.post.liked_users.length !== -1) {
      this.setState({
        likedUsersLength:json.post.liked_users.length
      })
    }
    })
  }

  newNoti = (notiCode) => {
    fetch('http://localhost:3001/noti', {
      method:'post',
      headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth": Auth.getToken(),
        },
        body: `post_id=${this.props.id}&notiCode=${notiCode}&user_id=${this.props.user_id}`,
    })
  }

  //toggle the motivate icon
  motivate = () => {
    const {motivate} = this.state;
    if(motivate) {
       // UPDATE the DATABASE
       fetch('http://localhost:3001/remove_motivate', {
        method:'PUT',
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "auth": Auth.getToken(),
        },
        body: `post_id=${this.props.id}`,
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if(json.success) {
          this.setState({
            motivate:false,
          }, () => {
            this.refreshNumbers();
          })
        }
      })
    } else {
        // UPDATE the DATABASE
        fetch('http://localhost:3001/add_motivate', {
          method:'PUT',
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "auth": Auth.getToken(),
          },
          body: `post_id=${this.props.id}`,
        }).then((res) => {
         return res.json()
        }).then((json) => {
          if(json.success) {
            this.setState({
              motivate:true,
            }, () => {
              this.newNoti(1)
              this.refreshNumbers()
            })
          }
        })
    }
  };

  //Toggle the comment section
  showComments = () => {
    const { comShow } = this.state;
    if(comShow) {
      this.setState({
        comShow:false,
      })
    } else {
      this.setState({
        comShow:true,
      })
    }
  };
  refresh = () => {
    this.getComments();
  }
  componentDidMount() {
    this.getComments()
    // this.refreshNumbers()
  }
  render() {
    const { motivate, comShow, likedUsersLength } = this.state;

    return (
      <div>
        <div className="post-reactions">
          <ul>
            <li onClick={this.motivate}>
              <Tooltip name="Motivate !" />
              <img
                id="motivate"
                src={motivate ? motivated : motivatee}
                alt="motivate"
              />
            </li>
            <p className="count">{likedUsersLength}</p>
            <li onClick={this.showComments}>
              <Tooltip name="Comment" />
              <img src={comment} alt="motivate" />
            </li>
            <p className="count">{this.state.comments.length}</p>
          </ul>
        </div>
        <Comments 
          comShow={comShow}
          refresh={this.refresh}
          comments={this.state.comments}
          id={this.props.id}
          newNoti={this.newNoti}
          />
      </div>
    );
  }
}

const Tooltip = props => {
  return (
    <div className="tooltip">
      <span className="tooltiptext">{props.name}</span>
    </div>
  );
};
