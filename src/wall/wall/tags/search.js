import React, {useRef} from 'react'
import _ from 'lodash'
import {useSetState} from '../../../hooks/useSetState'
import {Search as SearchIcon, Add, Checkmark} from 'grommet-icons'
import * as Styled from './styled'
import MyLoader from './hashtagLoader'
import useTags from '../../../hooks/useTags'
import useOnClickOutside from '../../../hooks/useOutsideClick'
import {useMutation} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import withContext from '../../../hooks/useAuthenticatedUser'
import {updateFollowedHashtags} from './resolvers'

const FOLLOW_HASHTAGS = gql`
  mutation followHashtag($hashtagId: String!) {
    followHashtag(hashtagId: $hashtagId) {
      hashtags {
        id
        title
      }
    }
  }
`
function Search({user}) {
  const [state, setState] = useSetState({
    searchHashtag: '',
    followedHashtags: [],
  })
  const followHashtag = useMutation(FOLLOW_HASHTAGS)
  const {loading, tags} = useTags(state.searchHashtag)
  const ref = useRef()
  useOnClickOutside(ref, () => setState({searchHashtag: ''}))

  return (
    <Styled.container ref={ref}>
      {loading && (
        <Styled.searchResult display="block">
          <MyLoader />
        </Styled.searchResult>
      )}

      <Styled.searchResult display={_.isEmpty(tags) ? 'none' : 'block'}>
        {_.filter(tags, x => !_.find(user.hashtags, x)).map(i => {
          return (
            <Styled.searchItem
              key={i.id}
              onClick={() =>
                followHashtag({
                  variables: {hashtagId: i.id},
                  update: (proxy, res) => {
                    updateFollowedHashtags(proxy, res)
                    setState({
                      followedHashtags: [...state.followedHashtags, i.id],
                    })
                  },
                })
              }
            >
              {i.title}
              {_.includes(state.followedHashtags, i.id) ? (
                <Checkmark color="green" size="small" />
              ) : (
                <Add size="small" />
              )}
            </Styled.searchItem>
          )
        })}
      </Styled.searchResult>
      <Styled.searchInput>
        <SearchIcon size="18px" />
        <Styled.input
          type="text"
          placeholder="Search #"
          value={state.searchHashtag}
          onChange={e => setState({searchHashtag: e.target.value})}
        />
      </Styled.searchInput>
    </Styled.container>
  )
}

export default withContext(Search)
