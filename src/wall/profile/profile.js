import React, {useState} from 'react'
import {useMutation} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import {Helmet} from 'react-helmet'
import '../css/Wall.css'
import withContext from '../../hooks/useAuthenticatedUser'
import ProfilePost from './profilePost'
import profileImg from '../../imgs/profile-img.png'
import DeleteModal from './deleteModal'

const DELETE_STORY = gql`
  mutation DeleteStory($storyId: String!) {
    deleteStory(storyId: $storyId) {
      isDeleted
    }
  }
`

function Profile({user}) {
  const {stories} = user
  const [deleteModal, setDeleteModal] = useState(false)
  const [storyId, setStoryId] = useState('')
  const deleteStory = useMutation(DELETE_STORY)
  function deleteConfirm() {
    deleteStory({
      variables: {storyId: storyId},
      update: (proxy, res) => {
        if (res.data.deleteStory.isDeleted) {
          setDeleteModal(false)
          setStoryId('')
        }
      },
    })
  }

  return (
    <div className="profile">
      <Helmet>
        <title>Profile | Fadfada.com</title>
      </Helmet>
      {deleteModal && (
        <DeleteModal setDeleteModal={setDeleteModal} onClick={deleteConfirm} />
      )}
      <div className="profile-info">
        <div className="profile-img">
          <img src={profileImg} alt="profile-img" />
        </div>
      </div>
      <div className="timeline">
        {stories.map((post, key) => {
          return (
            <ProfilePost
              position={key % 2 === 0 ? 'right' : 'left'}
              key={post.id}
              text={post.body}
              onClick={() => {
                setDeleteModal(true)
                setStoryId(post.id)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default withContext(Profile)
