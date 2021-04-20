import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Job from './Job'
import Jobs from './Jobs'
import Sunspot from './Sunspot'
import Sunspots from './Sunspots'
import AppBar from '../components/AppBar'

const s = theme => ({
  content: {
    width: '100%',
    marginTop: theme.spacing.unit * 9,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  tableWrapper: {}
})

@withStyles(s)
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
    const {
      classes,
      location
    } = this.props

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    )
    return (
      <div>
        {/*<DevTools />*/}
        <AppBar />

        <div className={classes.content}>
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
