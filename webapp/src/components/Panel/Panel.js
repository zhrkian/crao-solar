import React from 'react'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import {PanelToolbar} from '../Panel'
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

const Panel = props =>
  <ColumnItem>
    <Paper className={props.classes.root} elevation={2}>
      {props.title && <PanelToolbar title={props.title} actions={props.actions} edit={props.edit} editable={props.editable} onEdit={props.onEdit} onDiscard={props.onDiscard} onSave={props.onSave}/>}
      <div className={props.dense ? props.classes.bodyWrapperDense : props.classes.bodyWrapper}>
        {props.children}
      </div>
    </Paper>
  </ColumnItem>

export default withStyles(style)(Panel)