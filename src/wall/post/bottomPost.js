import React from 'react'
import {Edit} from 'grommet-icons'
import PostTags from './postTags'
import {useSetState} from '../../hooks/useSetState'
import useTags from '../../hooks/useTags'
import _ from 'lodash'
import AddNewTag from './addNewTag.js'

const BottomPost = ({errors, color, values, setValues, isSubmitting}) => {
  const [state, setState] = useSetState({
    tagSearch: '',
    isTags: false,
  })

  const {loading, tags} = useTags(state.tagSearch)
  const error = _.values(errors)
  return (
    <div className="add-post-bottom">
      <div className="post">
        <div className="post-options">
          <PostTags
            setState={setState}
            values={values}
            setValues={setValues}
            {...state}
            tags={tags}
            loading={loading}
          />
          <AddNewTag />
        </div>
        {error[0] && (
          <p
            style={{
              opacity: error[0] !== '' ? '1' : '0',
              backgroundColor: color !== '' ? color : '',
            }}
          >
            {error[0]}
          </p>
        )}
        <button type="submit" disabled={isSubmitting} id="post-btn">
          <Edit size="20px" color="white" />
        </button>
      </div>
    </div>
  )
}

export default BottomPost
