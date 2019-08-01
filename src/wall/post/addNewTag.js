import React from 'react'
import {useMutation} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {useSetState} from '../../hooks/useSetState'
import {FormCheckmark, Add} from 'grommet-icons'
import useUnmount from '../../hooks/useUnmount'

const NEW_HASHTAG_MUTATION = gql`
  mutation addNewTag($title: String!, $isModerator: Boolean!) {
    createHashtag(title: $title, isModerator: $isModerator) {
      id
      title
    }
  }
`

export default function AddNewTag() {
  const [state, setState] = useSetState({
    showAddNewTag: false,
    newTag: '',
    added: false,
    moderator: false,
  })

  const addNewTag = useMutation(NEW_HASHTAG_MUTATION)

  useUnmount(() =>
    setState({
      newTag: '',
      added: false,
      moderator: false,
    }),
  )

  function handleAddHashtag() {
    if (state.newTag.trim() !== '') {
      addNewTag({
        variables: {title: state.newTag, isModerator: state.moderator},
        update: (proxy, data) => {
          const hashtags = proxy.readQuery({
            query: gql`
              {
                hashtags {
                  id
                  title
                }
              }
            `,
          })

          proxy.writeData({
            data: {
              hashtags: [data.data.createHashtag, ...hashtags.hashtags],
            },
          })
          if (data) {
            setState({added: true, newTag: ''})
          }
        },
      })
    }
  }

  return (
    <div style={{position: 'relative'}}>
      <div
        id="add-hashtags"
        onClick={() => setState({showAddNewTag: !state.showAddNewTag})}
      >
        <span>Add #</span>
      </div>
      <div style={{display: state.showAddNewTag ? 'block' : 'none'}}>
        <div className="triangle-dropdown" />
        <div className="select-post-tags-dropdown">
          <div
            className="moderator-checkbox"
            onClick={() => setState({moderator: !state.moderator})}
          >
            <input type="checkbox" checked={state.moderator} />
            <span style={{fontSize: '13px'}}>Moderator</span>
          </div>

          <div className="add-new-tag">
            <input
              type="text"
              id="tag-search-text"
              placeholder="Hashtag.."
              value={state.newTag}
              onChange={e => setState({newTag: e.target.value})}
            />
            <button
              id="add-new-tag-btn"
              onClick={handleAddHashtag}
              style={{backgroundColor: state.added ? '#00c853' : 'lightgray'}}
            >
              {state.added ? (
                <FormCheckmark size="13px" color="white" />
              ) : (
                <Add size="13px" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
