import React from 'react'
import gql from 'graphql-tag'
import {useQuery, useMutation} from 'react-apollo-hooks'
import _ from 'lodash'
import withContext from '../../../hooks/useAuthenticatedUser'
import {updateFollowedHashtags} from '../tags/resolvers'
import MyLoader from '../tags/myLoader'

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
  const {loading, error, data} = useQuery(GET_HASHTAGS)
  const followHashtag = useMutation(FOLLOW_HASHTAG, {
    update: updateFollowedHashtags,
  })

  if (loading) return <MyLoader color="white" />
  if (error) return <p>Something went wrong!</p>

  return (
    <div className="modal-body-signup">
      {data.hashtags.map(i => {
        return (
          <p
            key={i.id}
            className={
              _.find(user.hashtags, {id: i.id}) !== undefined
                ? 'activeHash'
                : ''
            }
            onClick={e => {
              e.target.classList.add('activeHash')
              followHashtag({
                variables: {hashtagId: i.id},
              })
            }}
          >
            #{i.title}
          </p>
        )
      })}
    </div>
  )
}

export default withContext(LoadHashtags)
