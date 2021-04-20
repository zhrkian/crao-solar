import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import { AddBox as AddBoxIcon } from '@material-ui/icons'

import { JobCreate } from './index'

const s = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.A700,
        backgroundColor: theme.palette.secondary.A100,
      }
      : {
        color: theme.palette.secondary.A100,
        backgroundColor: theme.palette.secondary.A700,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'inline-flex',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})

class JobsToolbar extends React.Component {
  state = { openJob: false }

  onCreateOpen = () => this.setState({ openJob: true })

  onCreateClose = () => this.setState({ openJob: false })

  render () {
    const { openJob } = this.state
    const {
      classes
    } = this.props

    return (
      <div>
        <Toolbar>
          <div className={classes.title}>
            <Typography type="title">{ 'Jobs' }</Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip title="Create Job">
              <IconButton aria-label="Create Job" onClick={this.onCreateOpen}>
                <AddBoxIcon />
              </IconButton>
            </Tooltip>

          </div>
        </Toolbar>

        { openJob && <JobCreate open={openJob} onClose={this.onCreateClose}/> }
      </div>
    )
  }
}

export default withStyles(s)(JobsToolbar)
