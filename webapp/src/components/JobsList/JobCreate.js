import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Dialog, { DialogContent, DialogTitle, DialogActions } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import { SunspotsFilter } from '../Filters'

const s = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 10
  },
  item: {
    background: 'white',
    display: 'inline-flex',
    flexDirection: 'column',
    margin: '1em'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 5,
    width: '80%',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
  chipsRow: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  }
})

@inject(stores => ({
  thinking: stores.jobsStore.createThinking,
  success: stores.jobsStore.createSuccess,
  error: stores.jobsStore.createError,
  onCreate: (name, options) => stores.jobsStore.createJob(name, options)
}))
@observer
@withStyles(s)
class JobCreate extends Component {
  constructor (props) {
    super(props)
    const sunspots = props.sunspots || []
    this.state = { sunspots, filters: { flareClasses: [], position: [], start: '', end: '', flareIndex: false} }
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState({ [name]: value })
  }

  handleRemoveSunspot = (sunspot) => () => {
    const sunspots = [...this.state.sunspots]
    const sunspotToDelete = sunspots.indexOf(sunspot)
    sunspots.splice(sunspotToDelete, 1)
    this.setState({ sunspots })
  }

  onCreate = () => {
    const { onCreate } = this.props
    const { name, sunspots, filters } = this.state

    if (sunspots && sunspots.length) {
      return onCreate(name, { sunspots })
    }

    return onCreate(name, filters)
  }

  onChange = filters => this.setState({ filters })

  onReset = filters => this.setState({ filters })

  componentWillUpdate (nextProps) {
    if (!this.props.success && nextProps.success) {
      this.props.onClose()
    }
  }

  render() {
    const {
      classes,
      open,
      thinking,
      onClose,
    } = this.props

    const {
      name,
      sunspots,
      filters
    } = this.state

    return (
      <Dialog
        open={open}
        onRequestClose={onClose}>
        <DialogTitle>
          { 'Create job' }
        </DialogTitle>

        <DialogContent>
          <div className={classes.row}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              disabled={thinking}
              className={classes.textField}
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </div>

          { !sunspots.length && <SunspotsFilter filters={filters} onChange={this.onChange} onReset={this.onReset} /> }

          {
            !!sunspots.length && (
              <div className={classes.chipsRow}>
                {
                  sunspots.map(sunspot => (
                    <Chip
                      disabled={thinking}
                      label={`NOAA ${sunspot}`}
                      key={sunspot}
                      onRequestDelete={this.handleRemoveSunspot(sunspot)}
                      className={classes.chip}
                    />
                  ))
                }
              </div>
            )
          }

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" disabled={thinking}>
            Cancel
          </Button>
          <Button onClick={this.onCreate} color="primary" disabled={!name || thinking} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default JobCreate

