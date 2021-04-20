import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Dialog,
  DialogContent,
  Typography,
  Toolbar,
  IconButton,
  Slide
} from '@material-ui/core'
import {
  Close as CloseIcon
} from '@material-ui/icons'
import s from './SunspotModal.styles'

import Sunspot from '../Sunspot'

@withRouter
@withStyles(s)
class SunspotModal extends React.Component {
  state = { open: true, title: '' }

  setTitle = title => this.setState({ title })

  handleRequestClose = () => {
    this.props.history.goBack()
    this.setState({ open: false })
  }

  render() {
    const { title } = this.state
    const { classes } = this.props
    const { id } = this.props.match.params
    return (
      <Dialog
        fullScreen
        open={this.state.open}
        onRequestClose={this.handleRequestClose}
        transition={<Slide direction="up" />}
      >
        <AppBar>
          <Toolbar>
            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography type="title" color="inherit">
              { title }
            </Typography>

          </Toolbar>
        </AppBar>

        <DialogContent className={classes.content}>
          <Sunspot id={id} onSetTitle={this.setTitle} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default SunspotModal
