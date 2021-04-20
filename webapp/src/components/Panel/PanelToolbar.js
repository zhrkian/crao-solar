import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@material-ui/core'
import {
  ExpandMore,
  ExpandLess
} from '@material-ui/icons'

console.log(Tooltip)

const s = theme => ({
  title: {
    flex: '0 0 auto'
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
  root: {
    minHeight: 48,
    paddingRight: 5
  }
})

const PanelToolbar = ({ classes, actions, title, subtitle, collapsible, collapsed, onToggle }) =>
  <Toolbar className={ classes.root }>
    <div className={ classes.title }>
      <Typography type='body2' className={ classes.heading }>{ title }</Typography>
      <Typography type='caption'>{ subtitle }</Typography>
    </div>
    <div className={ classes.spacer }/>
    <div className={ classes.actions }>
      { actions }
      {
        collapsible && (
          <Tooltip placement="top" title={ collapsed ? 'More' : 'Less' }>
            <div>
              { collapsed && <IconButton color={'accent'} onClick={onToggle}><ExpandMore/></IconButton> }
              { !collapsed && <IconButton color={'accent'} onClick={onToggle}><ExpandLess/></IconButton> }
            </div>
          </Tooltip>
        )
      }
    </div>
  </Toolbar>

export default withStyles(s)(PanelToolbar)
