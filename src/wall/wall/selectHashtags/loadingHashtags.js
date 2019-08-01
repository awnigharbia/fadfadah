import React from 'react'
import _ from 'lodash'
import withContext from '../../../hooks/useAuthenticatedUser'
import MyLoader from '../tags/myLoader'

function LoadHashtags({
  loading,
  error,
  hashtags,
  user,
  followHashtag,
  selectedTags,
  setState,
}) {
  if (loading) return <MyLoader color="white" />
  if (error) return <p>Something went wrong!</p>

  return (
    <div className="modal-body-signup">
      {hashtags.map(i => {
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
              setState({
                selectedTags: [...selectedTags, i.id],
              })
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
