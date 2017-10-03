import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import s from './AppBar.styles'

@withRouter
class ApplicationBar extends Component {
  render() {
    const { classes } = this.props
    const { title } = this.props.location.state || {}

    return (
      <div className={classes.root}>
        <AppBar position='static' color={'inherit'}>
          <Toolbar>
            <Typography type='title' color='inherit' className={classes.flex}>
              { title }
            </Typography>
            <NavLink exact
                     to={{
                       pathname: '/',
                       state: {
                         title: 'Grabbed Data'
                       }
                     }}
                     className={classes.link}
                     activeClassName={classes.activeLink}>Grabbed Data</NavLink>
            <NavLink exact
                     to={{
                       pathname: '/jobs',
                       state: {
                         title: 'Jobs'
                       }
                     }}
                     className={classes.link}
                     activeClassName={classes.activeLink}>Jobs</NavLink>
            <NavLink exact
                     to={{
                       pathname: '/sunspots',
                       state: {
                         title: 'Sunspots'
                       }
                     }}
                     className={classes.link}
                     activeClassName={classes.activeLink}>Sunspots</NavLink>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(s)(ApplicationBar)
