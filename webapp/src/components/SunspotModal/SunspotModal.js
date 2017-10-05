import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogContent } from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import s from './SunspotModal.styles'

import Sunspot from '../Sunspot'

class FullScreenDialog extends React.Component {
  state = { open: true }

  handleRequestClose = () => {
    this.props.history.goBack()
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
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
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.content}>
          <Sunspot />
        </DialogContent>
      </Dialog>
    )
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(s)(FullScreenDialog)