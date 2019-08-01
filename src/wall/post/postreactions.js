import React from 'react'
import '../css/Wall.css'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'
import {useSetState} from '../../hooks/useSetState'

//imgs
import motivatee from '../../imgs/motivation.png'
import motivated from '../../imgs/motivated.png'
import comment from '../../imgs/comment.png'

//components
import Comments from './comments'

const SEND_LIKE = gql`
  mutation likeMutation($storyId: String!) {
    addLike(storyId: $storyId) {
      likedBy {
        id
      }
    }
  }
`

const SEND_NOTIFICATION = gql`
  mutation sendNotification($storyId: String!, $code: String!) {
    sendNotification(storyId: $storyId, code: $code) {
      id
      code
    }
  }
`

const REMOVE_LIKE = gql`
  mutation removeLike($storyId: String!) {
    unLike(storyId: $storyId) {
      isUnliked
    }
  }
`

export default function PostReactions({motivate, ...props}) {
  const [state, setState] = useSetState({
    likesLength: props.likes.length,
    commentsLength: props.comments.length,
    liked: motivate,
  })

  const sendNotification = useMutation(SEND_NOTIFICATION)

  const sendLike = useMutation(SEND_LIKE, {
    variables: {storyId: props.id},
    update: () => {
      setState({
        likesLength: state.likesLength + 1,
        liked: true,
        commentShow: false,
      })
    },
  })

  const removeLike = useMutation(REMOVE_LIKE, {
    variables: {storyId: props.id},
    update: (proxy, mutationResult) => {
      const success = mutationResult.data.unLike.isUnliked
      setState({
        liked: success ? false : state.liked,
        likesLength: success ? state.likesLength - 1 : state.likesLength,
      })
    },
  })

  function handleLike(id) {
    if (state.liked) removeLike()
    else {
      sendNotification({
        variables: {
          storyId: id,
          code: '0',
        },
      })
      sendLike()
    }
  }

  return (
    <div>
      <div className="post-reactions">
        <ul>
          <li onClick={() => handleLike(props.id)}>
            <Tooltip name="Motivate !" />
            <img
              id="motivate"
              src={state.liked ? motivated : motivatee}
              alt="motivate"
            />
          </li>
          <p className="count">{state.likesLength}</p>
          <li onClick={() => setState({commentShow: !state.commentShow})}>
            <Tooltip name="Comment" />
            <img src={comment} alt="motivate" />
          </li>
          <p className="count">{state.commentsLength}</p>
        </ul>
      </div>
      <Comments
        comShow={state.commentShow}
        comments={props.comments}
        id={props.id}
      />
    </div>
  )
}

const Tooltip = props => {
  return (
    <div className="tooltip">
      <span className="tooltiptext">{props.name}</span>
    </div>
  )
}
