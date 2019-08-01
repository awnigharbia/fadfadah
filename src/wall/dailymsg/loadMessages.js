import React from 'react'
import gql from 'graphql-tag'
import {useQuery} from 'react-apollo-hooks'
import Message from './message'
import MyLoader from './myLoader'

const QUERY_MESSAGES = gql`
  {
    messages {
      id
      body
    }
  }
`

export default function LoadMessages() {
  const {loading, error, data} = useQuery(QUERY_MESSAGES, {
    fetchPolicy: 'cache-and-network',
  })
  if (error) return <div>Something went wrong!!</div>
  if (loading) return <MyLoader i={5} />

  return (
    <>
      {data.messages.map(msg => {
        return <Message key={msg.id} body={msg.body} />
      })}
    </>
  )
}
