import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper,
  Collapse
} from '@material-ui/core'
import { PanelToolbar } from '../Panel'
import { ColumnItem } from '../Columns'

const style = theme => ({
  root: {
    padding: '0 0.5em',
    paddingBottom: theme.spacing.unit,
    boxSizing: 'border-box',
  },
  bodyWrapper: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    position: 'relative'
  },
  bodyWrapperDense: {
    position: 'relative'
  },
  title: {
    flex: '0 0 auto',
  },
  heading: {
    textTransform: 'uppercase'
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap'
  },
  toolbar: {
    minHeight: 48,
    paddingRight: 5
  }
})

class Panel extends React.Component {
  constructor (props) {
    super()
    this.state = { open: !props.collapsible }
  }

  onToggle = () => {
    const { open } = this.state
    this.setState({ open: !open })
  }

  render () {
    const {
      classes,
      title,
      subtitle,
      actions,
      dense,
      children,
      collapsible
    } = this.props

    const {
      open
    } = this.state

    return (
      <ColumnItem>
        <Paper className={classes.root} elevation={2}>
          {
            title &&
            <PanelToolbar title={title} subtitle={subtitle} actions={actions} collapsible={collapsible} collapsed={!open} onToggle={this.onToggle} />
          }
          <div className={dense ? classes.bodyWrapperDense : classes.bodyWrapper}>
            <Collapse in={open} transitionDuration="auto" unmountOnExit>
              { children }
            </Collapse>
          </div>
        </Paper>
      </ColumnItem>
    )
  }
}


export default withStyles(style)(Panel)
