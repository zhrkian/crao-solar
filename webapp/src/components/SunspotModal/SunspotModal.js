import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogContent } from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Slide from 'material-ui/transitions/Slide'
import s from './SunspotModal.styles'

import { SunspotConnected as Sunspot } from '../Sunspot'

@withRouter
@withStyles(s)
class SunspotModal extends React.Component {
  state = { open: true }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleRequestClose = () => {
    this.props.history.goBack()
    this.setState({ open: false })
  }

  render() {

    console.log(this.props)
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
          </Toolbar>
        </AppBar>

        <DialogContent className={classes.content}>
          <Sunspot id={id} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default SunspotModal
