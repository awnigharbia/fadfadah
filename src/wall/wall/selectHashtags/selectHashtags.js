import React from 'react'
import {Twemoji} from 'react-emoji-render'
import {Redirect} from 'react-router-dom'
import {useQuery, useMutation} from 'react-apollo-hooks'
import {useSetState} from '../../../hooks/useSetState'
import LoadHashtags from './loadingHashtags'
import useTags from '../../../hooks/useTags'
import {updateFollowedHashtags} from '../tags/resolvers'
import gql from 'graphql-tag'
import _ from 'lodash'
import {Search} from 'grommet-icons'

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

const GET_HASHTAGS = gql`
  {
    hashtags {
      id
      title
    }
  }
`

export default function SelectHashtags() {
  const [state, setState] = useSetState({
    redirect: false,
    selectedTags: [],
    searchHashtag: '',
  })
  const {loadingTags, error, data} = useQuery(GET_HASHTAGS)
  const followHashtag = useMutation(FOLLOW_HASHTAG, {
    update: updateFollowedHashtags,
  })
  const {loading, tags} = useTags(state.searchHashtag)
  if (state.redirect) return <Redirect push from="/login" to="/account/wall" />

  function handleRedirect() {
    if (state.selectedTags.length >= 3) {
      setState({redirect: true})
    }
  }

  return (
    <div id="myModal" className="modal-signup">
      <div className="modal-content-signup">
        <div className="modal-header-signup">
          <h2>
            Follow Tags to continue <Twemoji text="🙈🙈👇" />
          </h2>
          <span className="span-text">
            * You must select at least 3 hashtags
          </span>
        </div>
        <div className="modal-search">
          <div className="modal-search-input">
            <Search size="medium" color="gray" />
            <input
              type="text"
              placeholder="Search for hashtag.."
              value={state.searchHashtag}
              onChange={e => setState({searchHashtag: e.target.value})}
            />
          </div>
        </div>

        <LoadHashtags
          {...state}
          loading={state.searchHashtag.length !== 0 ? loading : loadingTags}
          error={error}
          hashtags={state.searchHashtag.length !== 0 ? tags : data.hashtags}
          setState={setState}
          followHashtag={followHashtag}
        />

        <div className="modal-bottom">
          <button
            disabled={state.selectedTags.length < 3}
            onClick={handleRedirect}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
