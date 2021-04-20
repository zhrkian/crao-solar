import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core'

const s = theme => ({
  root: {
    position: 'fixed',
    zIndex: 1000,
    // marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 5,
  },
  link: {
    color: 'black',
    padding: 10
  },
  activeLink: {
    color: 'gray',
    padding: 10,
    textDecoration: 'underline'
  }
})

@withStyles(s)
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
            {/*<NavLink*/}
              {/*exact*/}
              {/*disabled*/}
              {/*to={{*/}
                {/*pathname: '/',*/}
                {/*state: {*/}
                  {/*title: 'Grabbed Data'*/}
                {/*}*/}
              {/*}}*/}
              {/*className={classes.link}*/}
              {/*activeClassName={classes.activeLink}>Grabbed Data</NavLink>*/}
            <NavLink
              to={{
                pathname: '/jobs',
                state: {
                  title: 'Jobs'
                }
              }}
              className={classes.link}
              activeClassName={classes.activeLink}>Jobs</NavLink>
            <NavLink
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

export default ApplicationBar
