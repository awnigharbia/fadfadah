import {ApolloClient, ApolloLink} from 'apollo-boost'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {split} from 'apollo-boost'
import {onError} from 'apollo-link-error'
import {setContext} from 'apollo-link-context'
import {getMainDefinition} from 'apollo-utilities'
import Auth from './auth.js'
import {WebSocketLink} from 'apollo-link-ws'
import _ from 'lodash'

const cache = new InMemoryCache()

const wsLink = new WebSocketLink({
  uri: `wss://hidden-island-20400.herokuapp.com/`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: Auth.getToken(),
    },
  },
})

const httpLink = createHttpLink({
  uri: 'https://hidden-island-20400.herokuapp.com/',
})

const inspectError = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.map(({message, locations, path}) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, {headers}) => {
  const token = Auth.getToken()
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

export const client = new ApolloClient({
  link: ApolloLink.from([inspectError, link]),
  cache,
  queryDeduplication: false,
})
