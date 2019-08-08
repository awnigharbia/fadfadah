import React from 'react'
import {Trigger} from 'grommet-icons'
import {useQuery, useMutation} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {updateTrendingHashtags} from '../wall/tags/resolvers'

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

const GET_TRENDING = gql`
  {
    trending {
      id
      title
    }
  }
`

export default function Trending() {
  const followHashtag = useMutation(FOLLOW_HASHTAG, {
    update: updateTrendingHashtags,
  })

  return (
    <div className="trending-content">
      <div className="trending-content-title">
        <Trigger size="25px" color="hsl(202, 57%, 15%);" />
        <p>Trending </p>
      </div>
      <div className="trending-items">
        <LoadTrending followHashtag={followHashtag} />
      </div>
    </div>
  )
}

function LoadTrending({followHashtag}) {
  const {loading, error, data} = useQuery(GET_TRENDING)

  if (loading) return <div>Loading ...</div>
  if (error) return <div>Something went wrong!</div>

  return data.trending.map(i => (
    <div
      className="trending-item"
      onClick={() =>
        followHashtag({
          variables: {hashtagId: i.id},
        })
      }
    >
      <p key={i.id}># {i.title}</p>
      <button>Follow</button>
    </div>
  ))
}
