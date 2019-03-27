import React, {Component} from 'react';
import TextareaAutosize from "react-autosize-textarea";
import Auth from '../../auth';
import '../css/Wall.css';

//components
import Comment from "./comment";

export default class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentBody:'',
    }
  }
  handleComment = e => {
    const newComment = e.target.value;
    this.setState({
      commentBody:newComment
    })
  }
  newComment = e => {
    if(e.charCode === 13){
      e.preventDefault(); // Ensure it is only this code that run
    if(this.state.commentBody !== '') {
      fetch('http://localhost:3001/comment', {
        method:'post',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "auth": Auth.getToken(),
          },
          body: `post_id=${this.props.id}&description=${this.state.commentBody}`,
       }).then((res) => {
          return res.json()
       }).then((json) => {
        if(json.success) {
          this.setState({
            commentBody:'',
          }, () => {
            this.props.newNoti(2);
            this.props.refresh();
          })
        }
      })
      }
    }
  }
 
  render() {
    const {comShow, comments} = this.props;
    
   return (
      <form
        className="post-comments"
        style={comShow ? { display: "block" } : { display: "none" }}>

        <div className="new-comment">
          <TextareaAutosize 
              value={this.state.commentBody} 
              onChange={this.handleComment} 
              placeholder="type new comment..." rows={1}
              onKeyPress={this.newComment}
              />
        </div>
        <div className="comments">
          {comments &&
              comments.map((item) => {
                return (
                  <Comment key={item._id} text={item.description} />
                )
              })}
        </div>
      </form>
    )
  }
}
