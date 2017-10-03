import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import DevTools from 'mobx-react-devtools'
import GrabbedData from './GrabbedData'
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

        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact
                 path='/'
                 state={{ title: 'Grabbed Data' }}
                 component={GrabbedData}
          />

          <Route path='/jobs'
                 state={{ title: 'Jobs' }}
                 component={Jobs}
          />

          <Route exact
                 path='/sunspots'
                 state={{ title: 'Sunspots' }}
                 component={Sunspots}
          />

          <Route path='/sunspots/:id'
                 state={{ back: true, defaultBack: '/sunspots' }}
                 component={Sunspot} />
        </Switch>
        { isModal ? <Route path='/sunspots/:id' component={Modal} /> : null }
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