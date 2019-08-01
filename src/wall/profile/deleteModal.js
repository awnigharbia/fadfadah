import React from 'react'

export default function DeleteModal({onClick, setDeleteModal}) {
  return (
    <div className="delete-confirm-modal">
      <div className="delete-modal-content">
        <h1>Are you sure ?</h1>
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
      </div>
    </div>
  )
}
