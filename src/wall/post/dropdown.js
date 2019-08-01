import React, {useState} from 'react'
import {Twemoji} from 'react-emoji-render'
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo-hooks'

//imgs
import moree from '../../imgs/more.png'
import moreActive from '../../imgs/moreActive.png'

const SEND_REPORT = gql`
  mutation ReportStory($reason: String!, $story: String!) {
    reportStory(story: $story, reason: $reason) {
      isReported
    }
  }
`

export default function PostDropdown(props) {
  const [isReported, setIsReported] = useState(false)
  const sendReport = useMutation(SEND_REPORT, {
    variables: {reason: 'None for now ...', story: props.id},
    update: (proxy, mutationResult) => {
      setIsReported({isReported: mutationResult.data.reportStory.isReported})
    },
  })

  return (
    <div className="more">
      <img
        onClick={props.moreShow}
        src={props.more ? moreActive : moree}
        alt="more"
      />
      <div
        className="dropdown-content"
        style={{display: props.more ? 'block' : 'none'}}
      >
        <button onClick={sendReport}>
          {isReported ? <Twemoji svg text="Reported 🤦" /> : 'Report'}
        </button>
      </div>
    </div>
  )
}
