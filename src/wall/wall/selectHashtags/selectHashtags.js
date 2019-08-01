import React from 'react'
import {Twemoji} from 'react-emoji-render'
import {Redirect} from 'react-router-dom'
import {useSetState} from '../../../hooks/useSetState'
import LoadHashtags from './loadingHashtags'
import _ from 'lodash'
import {Search} from 'grommet-icons'

export default function SelectHashtags() {
  const [state, setState] = useSetState({
    redirect: false,
  })

  if (state.redirect) return <Redirect push from="/login" to="/account/wall" />

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
            <input type="text" placeholder="Search for hashtag.." />
          </div>
        </div>

        <LoadHashtags hashtags={state.hashtags} />
        <div className="modal-bottom">
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}
