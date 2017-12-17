import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import ExpandMore from 'material-ui-icons/ExpandMore'
import ExpandLess from 'material-ui-icons/ExpandLess'
import Tooltip from 'material-ui/Tooltip'

console.log(Tooltip)

const s = theme => ({
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
  root: {
    minHeight: 48,
    paddingRight: 5
  }
})

const PanelToolbar = ({ classes, actions, title, collapsible, collapsed, onToggle }) =>
  <Toolbar className={ classes.root }>
    <div className={ classes.title }>
      <Typography type='body2' className={ classes.heading }>{ title }</Typography>
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