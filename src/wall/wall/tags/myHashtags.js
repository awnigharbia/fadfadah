import React, {useState} from 'react'
import withContext from '../../../hooks/useAuthenticatedUser'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'
import {FormClose} from 'grommet-icons'

const UNFOLLOW_MUTATION = gql`
  mutation unfollowHashtag($hashtagId: String!) {
    unFollowHashtag(hashtagId: $hashtagId) {
      id
      hashtags {
        id
        title
      }
    }
  }
`

function MyHashtags({user}) {
  const [toggle, setToggle] = useState(false)
  const [loadMore, setLoadMore] = useState(5)
  const {hashtags} = user
  const unFollowHashtag = useMutation(UNFOLLOW_MUTATION)

  return (
    <div className="my-tags-wrapper">
      <div className="my-tags" onClick={() => setToggle(!toggle)}>
        #
      </div>
      {toggle && (
        <div className="dropdown-wrapper">
          <div className="triangle-dropdown" style={{left: '15px'}} />
          <div className="select-post-tags-dropdown" style={{right: 0}}>
            {hashtags.slice(0, loadMore).map(i => (
              <SearchItem
                key={i.id}
                title={i.title}
                onClick={() =>
                  unFollowHashtag({
                    variables: {
                      hashtagId: i.id,
                    },
                  })
                }
              />
            ))}
            {hashtags.length > loadMore && (
              <div
                className="load-more-tags"
                onClick={() => setLoadMore(loadMore + 5)}
              >
                Load More..
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SearchItem({onClick, title}) {
  return (
    <div className="tag-search-result" onClick={onClick}>
      <div className="tag-search-item">
        {title}
        <FormClose size="15px" />
      </div>
    </div>
  )
}

export default withContext(MyHashtags)
