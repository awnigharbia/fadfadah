import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import {ApolloProvider} from 'react-apollo-hooks'
import {ApolloProvider as ApolloProviderOfficial} from 'react-apollo'
import {client} from './apolloClient'
import {Provider} from './hooks/useAuthenticatedUser'
import Auth from './auth'

//pages
import HomeTr from './home/translation/tr'
import WallTr from './wall/translation/tr'

ReactDOM.render(
  <HashRouter>
    <ApolloProviderOfficial client={client}>
      <ApolloProvider client={client}>
        <Provider>
          <Switch>
            <Route
              path="/account/"
              render={() => {
                if (Auth.isUserAuthenticated()) {
                  return <WallTr />
                } else {
                  return <Redirect to="/" />
                }
              }}
            />
            <Route
              path="/"
              render={() => {
                if (Auth.isUserAuthenticated()) {
                  return <Redirect to="/account/wall" />
                } else {
                  return <HomeTr />
                }
              }}
            />
          </Switch>
        </Provider>
      </ApolloProvider>
    </ApolloProviderOfficial>
  </HashRouter>,
  document.getElementById('root'),
)
registerServiceWorker()
