import React, {useRef} from 'react'
import {CircleInformation} from 'grommet-icons'
import useOnClickOutside from '../../hooks/useOutsideClick'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import {motion} from 'framer-motion'

export default function DeleteModal({onClick, setDeleteModal}) {
  const ref = useRef()
  useOnClickOutside(ref, () => setDeleteModal(false))
  useLockBodyScroll()

  return (
    <div className="delete-confirm-modal">
      <motion.div
        className="delete-modal-content"
        ref={ref}
        initial={{scale: 1.1, y: -10}}
        animate={{scale: 1, y: 0}}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className="delete-modal-right-container">
          <div>
            <CircleInformation
              size="medium"
              color="#f44336"
              style={{border: '4px solid #f4433642', borderRadius: '50%'}}
            />
          </div>
          <div className="delete-modal-text">
            <h1>Delete Post</h1>
            <span>
              Are you sure you want to delete this post? By doing this you will
              lose access to this post and lose all comments and likes.
            </span>
          </div>
        </div>
        <div className="confirm-bottom-btns">
          <button
            className="delete-cancel-btn"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </button>
          <button className="delete-confirm-btn" onClick={onClick}>
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  )
}
