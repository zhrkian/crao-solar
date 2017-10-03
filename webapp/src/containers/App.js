import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'

import AppBar from '../components/AppBar'

@withRouter
export default class App extends Component {
  render() {

    return (
      <div>
        <DevTools />

        <AppBar />

        <Route
          exact
          path='/'
          state={{ title: 'Grabbed Data' }}
          render={props => (
            <LazyRoute {...props} component={import('./GrabbedData')} />
          )}
        />
        <Route
          exact
          path='/jobs'
          state={{ title: 'Jobs' }}
          render={props => (
            <LazyRoute {...props} component={import('./Jobs')} />
          )}
        />
        <Route
          exact
          path='/sunspots'
          state={{ title: 'Sunspots' }}
          render={props => (
            <LazyRoute {...props} component={import('./Sunspots')} />
          )}
        />
      </div>
    )
  }
}
