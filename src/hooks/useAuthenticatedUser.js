import React from 'react'
import {useMutation, useQuery} from 'react-apollo-hooks'
import {LOGIN_MUTATION} from './loginMutation'
import Auth from '../auth'
import {GET_USER} from '../query/currentUser'
import logo from '../imgs/small.png'

const Context = React.createContext()

export function Provider(props) {
  const loginMutation = useMutation(LOGIN_MUTATION)

  const signIn = async values => {
    const {data} = await loginMutation({
      variables: {...values},
    })

    return data
  }

  const signOut = () => {
    Auth.deauthenticateUser()
  }

  const value = {
    actions: {
      signIn: values => signIn(values),
      signOut: () => signOut(),
    },
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

export const Consumer = Context.Consumer

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withUser(Component) {
  return function ContextComponent(props) {
    const {loading, data, error} = useQuery(GET_USER, {
      fetchPolicy: 'cache-first',
    })
    if (loading) return <></>
    return (
      <Context.Consumer>
        {context => (
          <Component {...props} context={context} user={data.userInfo} />
        )}
      </Context.Consumer>
    )
  }
}
