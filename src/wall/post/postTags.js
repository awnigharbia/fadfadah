import React, {useRef} from 'react'
import {Add, FormCheckmark} from 'grommet-icons'
import _ from 'lodash'
import withContext from '../../hooks/useAuthenticatedUser'
import MyLoader from '../wall/tags/hashtagLoader'
import useOnClickOutside from '../../hooks/useOutsideClick'

function PostTags({
  setState,
  tagSearch,
  setValues,
  values,
  isTags,
  loading,
  tags,
  user,
}) {
  const hasTags = _.isEmpty(tags) ? user.hashtags : tags
  const ref = useRef()
  useOnClickOutside(ref, () => setState({isTags: false}))

  function handleSelectTag(id) {
    _.find(values.selectedTags, {id: id})
      ? setValues({
          ...values,
          selectedTags: _.filter(values.selectedTags, x => x.id !== id),
        })
      : setValues({...values, selectedTags: [...values.selectedTags, {id: id}]})
  }

  return (
    <div className="selectHashtags" ref={ref}>
      <div id="add-hashtags" onClick={() => setState({isTags: !isTags})}>
        <span>
          {_.isEmpty(values.selectedTags)
            ? 'Hashtags #'
            : `${values.selectedTags.length} #`}
        </span>
      </div>
      <div style={{display: isTags ? 'block' : 'none'}}>
        <div className="triangle-dropdown" />
        <div className="select-post-tags-dropdown">
          <input
            type="text"
            value={tagSearch}
            onChange={e => setState({tagSearch: e.target.value})}
            id="tag-search-text"
            placeholder="Search.."
          />
          <div className="tag-search-result">
            {loading && <MyLoader />}
            {!loading &&
              _.take(hasTags, 5).map(i => {
                return (
                  <div
                    key={i.id}
                    className="tag-search-item"
                    onClick={() => handleSelectTag(i.id)}
                  >
                    {i.title}
                    {_.find(values.selectedTags, {id: i.id}) ? (
                      <FormCheckmark size="15px" color="green" />
                    ) : (
                      <Add size="small" size="15px" />
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withContext(PostTags)
