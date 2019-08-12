import React, {useRef} from 'react'
import '../css/Wall.css'
import {Support, FormClose, StatusGood, Announce} from 'grommet-icons'
import {useSetState} from '../../hooks/useSetState'
import {useMutation} from 'react-apollo-hooks'
import gql from 'graphql-tag'
import _ from 'lodash'
import TextareaAutosize from 'react-autosize-textarea'
import useOnClickOutside from '../../hooks/useOutsideClick'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

const SEND_FEEDBACK = gql`
  mutation sendFeedback($topic: String!, $description: String!) {
    sendFeedback(topic: $topic, description: $description) {
      id
    }
  }
`

export default function SupportWidget() {
  const sendFeedback = useMutation(SEND_FEEDBACK)

  const [state, setState] = useSetState({
    modal: false,
    topics: ['Personal', 'Technical', 'Content', 'Bug', 'Other'],
    description: '',
    activeTopic: null,
    done: false,
  })

  function handleFeedback() {
    if (!_.isEmpty(state.description) && _.isNumber(state.activeTopic)) {
      sendFeedback({
        variables: {
          topic: state.topics[state.activeTopic],
          description: state.description,
        },
        update: (proxy, mutationResult) => {
          if (mutationResult) {
            setState({done: true})
          }
        },
      })
    }
  }

  return (
    <div className="support-wrapper">
      {state.modal && (
        <Modal
          setState={setState}
          state={state}
          handleFeedback={handleFeedback}
        />
      )}
      <div className="left">
        <Support size="large" color="hsl(202, 57%, 15%)" />
      </div>
      <div className="right">
        <p>Support</p>
        <span>Do you have any problem ?</span>
        <button onClick={() => setState({modal: true})}>Send Feedback</button>
      </div>
    </div>
  )
}

////// Topic Component ////////
function Topic({name, active, onClick}) {
  return (
    <div
      className={active ? 'issue-topic issue-active' : 'issue-topic'}
      onClick={onClick}
    >
      <StatusGood
        size="medium"
        color={active ? 'hsl(243, 100%, 69%)' : 'lightgray'}
        style={{marginRight: '5px'}}
      />
      {name}
    </div>
  )
}

///////Modal Component////////
function Modal({setState, handleFeedback, state}) {
  const ref = useRef()
  useOnClickOutside(ref, () => setState({modal: false}))
  useLockBodyScroll()
  return (
    <div className="modal">
      <div className="support-modal-content" ref={ref}>
        <div className="topbar">
          <div className="feedback-title">
            <Announce size="medium" color="gray" />
            <p>Send Feedback</p>
          </div>
          <FormClose
            size="medium"
            color="gray"
            style={{
              height: '25px',
              width: '25px',
              margin: '5px',
              borderRadius: '50%',
              backgroundColor: 'hsl(210, 0%, 92%)',
            }}
            onClick={() => setState({modal: false, done: false})}
          />
        </div>
        <p id="sec-title">Select Topic:</p>
        <div className="issue-topics">
          {state.topics.map((i, key) => (
            <Topic
              name={i}
              key={key}
              active={key === state.activeTopic}
              onClick={() => setState({activeTopic: key})}
            />
          ))}
        </div>
        <div className="issue-field">
          <TextareaAutosize
            rows={10}
            value={state.description}
            placeholder="Write your issue.."
            onChange={e => setState({description: e.target.value})}
            style={{
              width: '100%',
              border: 'none',
              padding: '10px 20px',
              boxSizing: 'border-box',
              outline: 'none',
              resize: 'none',
              fontSize: '13.5px',
              fontWeight: '500',
              letterSpacing: '1px',
            }}
            autoFocus
          />
        </div>
        <div className="issue-btn">
          <button
            id="feedback-close"
            onClick={() => setState({modal: false, done: false})}
          >
            Close
          </button>
          <button
            id="feedback-send"
            disabled={state.description.length === 0 && state.done}
            onClick={handleFeedback}
          >
            {state.done ? 'Sent!' : 'Send Feedback'}
          </button>
        </div>
      </div>
    </div>
  )
}
