import React from 'react'
import gql from 'graphql-tag'
import {useQuery, useMutation} from 'react-apollo-hooks'
import _ from 'lodash'
import MyLoader from './myLoader'
import withContext from '../../../hooks/useAuthenticatedUser'
import {updateFollowedHashtags} from './resolvers'

const GET_HASHTAGS = gql`
  {
    hashtags {
      id
      title
    }
  }
`

const FOLLOW_HASHTAG = gql`
  mutation followHashtag($hashtagId: String!) {
    followHashtag(hashtagId: $hashtagId) {
      hashtags {
        id
        title
      }
    }
  }
`

function LoadHashtags({user}) {
  const {loading, data, error} = useQuery(GET_HASHTAGS, {
    fetchPolicy: 'cache-and-network',
  })
  const followHashtag = useMutation(FOLLOW_HASHTAG, {
    update: updateFollowedHashtags,
  })

  const hashtags = _.filter(
    data.hashtags,
    x => !_.find(user.hashtags, {id: x.id}),
  )

  if (loading) return <MyLoader color="#f3f3f3" />
  if (error) return <p>Something went wrong!</p>
  return (
    <>
      {hashtags.map(i => (
        <h6
          key={i.id}
          onClick={e => {
            e.target.classList.add('activeHash')
            followHashtag({
              variables: {hashtagId: i.id},
            })
          }}
        >
          #{i.title}
        </h6>
      ))}
    </>
  )
}
export default withContext(LoadHashtags)
