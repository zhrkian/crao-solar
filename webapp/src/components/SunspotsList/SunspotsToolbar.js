import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Collapse,
  Toolbar,
  Tooltip,
  Typography,
  IconButton
} from '@material-ui/core'

import {
  AddBox as AddBoxIcon,
  FilterList as FilterListIcon
} from '@material-ui/icons'

import { JobCreate } from'../JobsList'

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

class ListToolbar extends React.Component {
  state = { open: false, openJob: false }

  onToggleFilterPanel = () => {
    const { open } = this.state
    return this.setState({ open: !open })
  }

  onCreateOpen = () => this.setState({ openJob: true })

  onCreateClose = () => this.setState({ openJob: false })

  render () {
    const { selected, title, classes } = this.props
    const { open, openJob } = this.state
    const selectedLength = selected.length

    return (
      <div>
        <Toolbar>
          <div className={classes.title}>
            { selectedLength > 0 ? (
              <Typography type="subheading">{selectedLength} selected</Typography>
            ) : (
              <Typography type="title">{ title }</Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {
              selectedLength > 0 && (
                <Tooltip title="Create Job">
                  <IconButton aria-label="Create Job" onClick={this.onCreateOpen}>
                    <AddBoxIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            {
              this.props.filters && (
                <Tooltip title="Filter list">
                  <IconButton color={ open ? 'accent' : 'default' } aria-label="Filter list" onClick={this.onToggleFilterPanel}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )
            }

          </div>
        </Toolbar>
        <Collapse in={open} transitionDuration="auto" unmountOnExit>
          { this.props.filters }
        </Collapse>

        { openJob && <JobCreate open={openJob} sunspots={selected} onClose={this.onCreateClose}/> }
      </div>
    )
  }
}

export default withStyles(s)(ListToolbar)
