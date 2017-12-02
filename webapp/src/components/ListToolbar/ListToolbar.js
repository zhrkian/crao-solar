import React from 'react'
import { withStyles } from 'material-ui/styles'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import AddBoxIcon from 'material-ui-icons/AddBox'
import FilterListIcon from 'material-ui-icons/FilterList'
import Collapse from 'material-ui/transitions/Collapse'

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
  state = { open: false }

  onToggleFilterPanel = () => {
    const { open } = this.state
    return this.setState({ open: !open })
  }

  render () {
    const { selected, title, classes } = this.props
    const { open } = this.state

    return (
      <div>
        <Toolbar>
          <div className={classes.title}>
            {selected > 0 ? (
              <Typography type="subheading">{selected} selected</Typography>
            ) : (
              <Typography type="title">{ title }</Typography>
            )}
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            {
              selected > 0 && (
                <Tooltip title="Create Job">
                  <IconButton aria-label="Create Job">
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
      </div>
    )
  }
}

export default withStyles(s)(ListToolbar)
