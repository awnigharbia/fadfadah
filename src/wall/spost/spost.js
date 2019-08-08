import React from 'react'
import {injectIntl} from 'react-intl'
import gql from 'graphql-tag'
import withContext from '../../hooks/useAuthenticatedUser'
import {useQuery} from 'react-apollo-hooks'
import '../css/Wall.css'
import _ from 'lodash'

//components
import Post from '../post/post'
import Support from '../widgets/support'

const STORY_QUERY = gql`
  query Story($storyId: String!) {
    story(storyId: $storyId) {
      id
      body
      likes {
        id
        likedBy {
          id
        }
      }
      comments {
        id
        body
      }
    }
  }
`

function SinglePost({intl, match, user}) {
  const {loading, data, err} = useQuery(STORY_QUERY, {
    variables: {storyId: match.params.id},
  })

  if (err) return <div>Something went wrong!</div>

  if (loading)
    return (
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    )
  if (_.isEmpty(data)) return <div>Post Not Found!</div>

  return (
    <div className="wa">
      <div className="wa-wrapper">
        <div className="center">
          <div className="posts">
            <Post
              id={data.story.id}
              motivate={
                _.find(data.story.likes, {likedBy: {id: user.id}})
                  ? true
                  : false
              }
              text={data.story.body}
              {...[data.story]}
            />
          </div>
        </div>

        <div className="right">
          <Support msg={intl.formatMessage({id: 'support.h1'})} />
        </div>
      </div>
    </div>
  )
}

export default injectIntl(withContext(SinglePost))
