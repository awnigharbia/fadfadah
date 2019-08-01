import React, {useState} from 'react'
import '../../css/Wall.css'
import {useMutation} from 'react-apollo-hooks'
import withContext from '../../../hooks/useAuthenticatedUser'
import palestine from '../../../imgs/palestine.png'
import unitedstate from '../../../imgs/united-states.png'
import success from '../../../imgs/success.png'
import {UPDATE_USER_MUTATION} from './updateUserMutation'
import gql from 'graphql-tag'

const GET_USER = gql`
  {
    userInfo {
      id
      username
      hashtags {
        id
        title
      }
      stories {
        id
        body
      }
      verified
      banned
      language
    }
  }
`

function Languages({show, user}) {
  const [language, setLanguage] = useState(user.language)
  const updateUser = useMutation(UPDATE_USER_MUTATION)

  function handleUpdate(lang) {
    updateUser({
      variables: {property: 'language', value: lang},
      update: (proxy, res) => {
        if (res.data.updateUser.isUpdated) {
          const data = proxy.readQuery({query: GET_USER})
          data.userInfo.language = lang

          proxy.writeQuery({query: GET_USER, data})
          setLanguage(lang)
        }
      },
    })
  }

  return (
    <div className="languages" style={{display: show ? 'flex' : 'none'}}>
      <div
        onClick={() => handleUpdate('ar-SA')}
        className={'arabic ' + (language === 'ar-SA' ? 'activelanguage' : '')}
      >
        <img src={palestine} alt="arabic language" />
        <p>Arabic</p>
        <img
          id="success"
          src={success}
          alt="success"
          style={{display: language === 'ar-SA' ? 'block' : 'none'}}
        />
      </div>
      <div
        onClick={() => handleUpdate('en-GB')}
        className={'english ' + (language === 'en-GB' ? 'activelanguage' : '')}
      >
        <img src={unitedstate} alt="united state" />
        <p>English</p>
        <img
          id="success"
          src={success}
          alt="success"
          style={{display: language === 'en-GB' ? 'block' : 'none'}}
        />
      </div>
    </div>
  )
}

export default withContext(Languages)
