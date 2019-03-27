import React, {Component} from 'react';
import { Twemoji } from 'react-emoji-render'
import Auth from '../../auth';
import '../css/Wall.css';

import profileImg from '../../imgs/profile-img.png';

export default class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts:[],
      deleteConfirme:false,
      postId:'',
      userId:'',
    }
  }

  getPosts = () => {
    fetch('http://localhost:3001/userposts', {
        headers: {
              "auth":Auth.getToken(),
          },
      }).then((res) => {
        return res.json();
      }).then((json) => {
        if (json.posts.length !== -1) {
        this.setState({
          posts:json.posts,
        });
      }
      });
  }
  
  deleteConfirm = (postId, userId) => {
    if(this.state.deleteConfirme) {
      this.setState({
        deleteConfirme:false,
      })
    } else {
      this.setState({
        deleteConfirme:true,
        postId:postId,
        userId:userId
      })
    }
  }

  deletePost = () => {
    const postid = this.state.postId
    const userId = this.state.userId

    fetch('http://localhost:3001/delpost', {
      method:'post',
      headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "auth": Auth.getToken(),
        },
        body: `postId=${postid}&userId=${userId}`,
    }).then((res) =>  res.json())
      .then((json) => {
          this.setState({
            deleteConfirme:false,
            postId:'',
            userId:'',
          }, () => {
            this.getPosts()
          })
      })
  }
  componentDidMount() {
    this.getPosts();
  }
  render() {
    const {posts, deleteConfirme} = this.state;

    return (
      <div className="profile">
       {deleteConfirme && 
                  <div  className="delete-confirm-modal">  
                    <div className="delete-modal-content">
                      <h1>Are you sure ?</h1>
                      <div className="confirm-bottom-btns">
                       <button className="delete-cancel-btn" onClick={this.deleteConfirm}>Cancel</button>
                       <button className="delete-confirm-btn" onClick={this.deletePost}>Delete</button>
                      </div>
                    </div>
                  </div>
                }
        <div className="profile-info">
          <div className="profile-img">
            <img src={profileImg} alt="profile-img" />
          </div>
        </div>
        <div className="timeline">
            {posts.map((post, key) => {
              if(key % 2 === 0) {
                return <LeftPost 
                          key={post._id} 
                          text={post.description}
                          deleteConfirm={this.deleteConfirm}
                          postId={post._id}
                          userId={post.user_id} />
              } else {
                return <RightPost 
                          key={post._id} 
                          text={post.description}
                          deleteConfirm={this.deleteConfirm}
                          postId={post._id}
                          userId={post.user_id}  />
                }
            })}
        </div>
      </div>
    )
  }
}

const RightPost = props => {
  return (
    <div className="con con-right">
      <div className="cont">
      <div className="cont-up">
        <h2><Twemoji svg text="📌📌" /></h2>
        <button onClick={() => props.deleteConfirm(props.postId, props.userId)}>X</button>
      </div>
        <p><Twemoji svg text={props.text} /></p>
      </div>
    </div>
  )
}

const LeftPost = props => {
  return (
    <div className="con con-left">
      <div className="cont">
      <div className="cont-up">
        <h2><Twemoji svg text="📌📌" /></h2>
        <button onClick={() => props.deleteConfirm(props.postId, props.userId)}>X</button>
      </div>
        <p><Twemoji svg text={props.text} /></p>
      </div>
    </div>
  )
}
