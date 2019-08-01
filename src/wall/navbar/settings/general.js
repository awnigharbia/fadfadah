import React, {useState} from 'react'
import '../../css/Wall.css'
import {useMutation} from 'react-apollo-hooks'
import {UPDATE_USER_MUTATION} from './updateUserMutation'

export default function General({show}) {
  const updateUser = useMutation(UPDATE_USER_MUTATION)

  return (
    <div className="general" style={{display: show ? 'flex' : 'none'}}>
      <div className="general-content">
        <SettingInput
          label="Change your email:"
          placeholder="email.."
          name="email"
          onClick={updateUser}
        />
        <SettingInput
          label="Change your username"
          placeholder="username.."
          name="username"
          onClick={updateUser}
        />
      </div>
    </div>
  )
}

function SettingInput({label, placeholder, onClick, name}) {
  const [isFocues, setIsFocused] = useState(false)
  const [InputValue, setInputValue] = useState('')

  return (
    <>
      <label>{label}</label>
      <input
        type="text"
        value={InputValue}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onChange={e => setInputValue(e.target.value)}
      />
      {isFocues && (
        <div className="bottom">
          <button
            onClick={() => {
              setInputValue('')
              setIsFocused(false)
            }}
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onClick({
                variables: {property: name, value: InputValue},
                update: (proxy, res) => {
                  console.log(res)
                },
              })
            }
          >
            Save
          </button>
        </div>
      )}
    </>
  )
}
