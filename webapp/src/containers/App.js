import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'

import Job from './Job'
import Jobs from './Jobs'
import Sunspot from './Sunspot'
import Sunspots from './Sunspots'
import AppBar from '../components/AppBar'



class AppSwitch extends React.Component {
  previousLocation = this.props.location

  componentWillUpdate(nextProps) {
    const { location } = this.props
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  render() {
    const { location } = this.props
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <div>
        <DevTools />
        <AppBar />

        <Switch location={location}>
          <Route
            exact
            path='/'
            render={() => (<Redirect to={{ pathname: `/sunspots`, state: { title: 'Sunspots' } }} />)}
            // state={{ title: 'Grabbed Data' }}
            // component={GrabbedData}
          />

          <Route
            exact
            path='/jobs'
            state={{ title: 'Jobs' }}
            component={Jobs}
          />

          <Route
            exact
            path='/jobs/:id'
            state={{ title: 'Jobs' }}
            component={Job}
          />

          <Route
            exact
            path='/sunspots'
            state={{ title: 'Sunspots' }}
            component={Sunspots}
          />

          <Route
            exact
            path='/sunspots/:id'
            state={{ title: 'Sunspots' }}
            component={Sunspot} />
        </Switch>
      </div>
    )
  }
}

const App = () => (
  <Router>
    <Route component={AppSwitch} />
  </Router>
)

export default App