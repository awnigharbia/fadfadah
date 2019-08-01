import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import Auth from "../../auth";
import "../css/Wall.css";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { useSetState } from "../../hooks/useSetState";

//components
import Comment from "./comment";

const NEW_COMMENT = gql`
  mutation addCommentMutation($storyId: String!, $body: String!) {
    addComment(storyId: $storyId, body: $body) {
      id
      body
    }
  }
`;

export default function Comments({ comments, comShow, ...props }) {
  const [state, setState] = useSetState({
    commentBody: "",
    comments: comments
  });

  const newComment = useMutation(NEW_COMMENT, {
    variables: { body: state.commentBody, storyId: props.id },
    update: (proxy, mutationResults) => {
      setState({
        commentBody: "",
        comments: [mutationResults.data.addComment, ...state.comments]
      });
    }
  });

  function handleEnter(e) {
    if (e.charCode === 13) return newComment();

    return;
  }

  return (
    <form
      className="post-comments"
      style={comShow ? { display: "block" } : { display: "none" }}
    >
      <div className="new-comment">
        <TextareaAutosize
          value={state.commentBody}
          onChange={e => setState({ commentBody: e.target.value })}
          placeholder="type new comment..."
          rows={1}
          onKeyPress={handleEnter}
        />
      </div>
      <div className="comments">
        {state.comments &&
          state.comments.map(item => {
            return <Comment key={item.id} text={item.body} />;
          })}
      </div>
    </form>
  );
}

// export default class Comments extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       commentBody: '',
//     }
//   }
//   handleComment = e => {
//     const newComment = e.target.value
//     this.setState({
//       commentBody: newComment,
//     })
//   }
//   newComment = e => {

//   }

//   render() {
//     const {comShow, comments} = this.props

//   }
// }
