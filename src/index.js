import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Auth from './auth'
import registerServiceWorker from './registerServiceWorker'
//pages
import HomeTr from './home/translation/tr'
import WallTr from './wall/translation/tr'

ReactDOM.render(
  <Router>
    <div style={{height: '100%'}}>
      <Switch>
        <Route
          path="/account/"
          render={() => {
            if (Auth.isUserAuthenticated()) {
              return <WallTr />
            } else {
              return <Redirect to="/home/start" />
            }
          }}
        />
        <Route
          path="/home/"
          render={() => {
            if (Auth.isUserAuthenticated()) {
              return <Redirect to="/account/wall" />
            } else {
              return <HomeTr />
            }
          }}
        />
      </Switch>
    </div>
  </Router>,

  document.getElementById('root'),
)
registerServiceWorker()
