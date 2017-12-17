import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'
import AddCircle from 'material-ui-icons/AddCircle'
import Cancel from 'material-ui-icons/Clear'
import Edit from 'material-ui-icons/Edit'
import Save from 'material-ui-icons/Save'
import Tooltip from 'material-ui/Tooltip'


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

// const DiscardBlock = ({ hidden, disabled, onDiscard }) => {
//   if (hidden) return null
//   return (
//     <Tooltip placement="bottom" title={'Cancel'}>
//       <IconButton disabled={disabled} onClick={onDiscard}><Cancel/></IconButton>
//     </Tooltip>
//   )
// }


const DiscardBlock = ({ hidden, disabled, onDiscard }) => {
  if (hidden) return null
  return (
    <Button
      disabled={disabled}
      dense
      color={'contrast'}
      style={{marginLeft: 10}}
      onClick={onDiscard}>
      Discard
    </Button>
  )
}

// const SaveBlock = ({ hidden, disabled, onSave }) => {
//   if (hidden) return null
//   return (
//     <Tooltip placement="bottom" title={'Save'}>
//       <IconButton color={'accent'} disabled={disabled} onClick={onSave}><Save/></IconButton>
//     </Tooltip>
//   )
// }
const SaveBlock = ({ hidden, disabled, onSave }) => {
  if (hidden) return null
  return (
    <Button
      disabled={disabled}
      raised
      dense
      style={{marginLeft: 10}}
      color={'accent'}
      onClick={onSave}>
      Save
    </Button>
  )
}

const EditBlock = ({ hidden, onEdit }) => {
  if (hidden) return null
  return (
    <Tooltip placement="top" title={<span>Edit</span>}>
      <IconButton color={'accent'} onClick={onEdit}><Edit/></IconButton>
    </Tooltip>
  )
}


const PanelToolbar = props =>
  <Toolbar className={props.classes.root}>
    <div className={props.classes.title}>
      <Typography type='body2' className={props.classes.heading}>{props.title}</Typography>
    </div>
    <div className={props.classes.spacer}/>
    <div className={props.classes.actions}>
      {props.actions}

      { props.editable && <DiscardBlock hidden={!props.edit} disabled={props.disabled} onDiscard={props.onDiscard} />}
      { props.editable && <SaveBlock hidden={!props.edit} disabled={props.disabled} onSave={props.onSave} />}
      { props.editable && <EditBlock hidden={props.edit} disabled={props.disabled} onEdit={props.onEdit} />}

    </div>
  </Toolbar>

export default withStyles(s)(PanelToolbar)