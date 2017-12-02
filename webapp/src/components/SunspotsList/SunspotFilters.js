import React from 'react'
import { withStyles } from 'material-ui/styles'
import { FormGroup, FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'

const s = theme => ({
  root: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingBottom: 10
  },
  filtersRow: {
    display: 'inline-flex',
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    color: theme.palette.text.secondary,
    paddingBottom: 16
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  actions: {
    display: 'inline-flex',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    color: theme.palette.text.secondary,
    paddingTop: 16
  },
  button: {
    margin: theme.spacing.unit / 2,
  }
})

const FLARE_CLASSES = ['A', 'B', 'C', 'M', 'X']

const FlareClassFilter = ({ flareClasses, onChange }) => {
  const onFilterChange = value => (event, checked) => {
    if (checked) {
      return onChange([...flareClasses, value])
    }
    return onChange(flareClasses.filter(c => c !== value))
  }
  const filterLegendText = flareClasses && flareClasses.length ? `(sunspots with flares ${flareClasses.join(', ')})` : ''

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{`Flare class ${filterLegendText}`}</FormLabel>
      <FormGroup row>
        {
          FLARE_CLASSES.map(c => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  checked={flareClasses.indexOf(c) > -1}
                  onChange={onFilterChange(c)}
                />
              }
              label={`${c} class`}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  )
}

const POSITIONS = ['S', 'N']

const PositionFilter = ({ position, onChange }) => {
  const onFilterChange = value => (event, checked) => {
    if (checked) {
      return onChange([value])
    }
    return onChange(position.filter(c => c !== value))
  }
  const filterLegendText = position && position.length ? `(sunspots with position ${position.join(', ')})` : ''

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{`Position ${filterLegendText}`}</FormLabel>
      <FormGroup row>
        {
          POSITIONS.map(c => (
            <FormControlLabel
              key={c}
              control={
                <Checkbox
                  checked={position.indexOf(c) > -1}
                  onChange={onFilterChange(c)}
                />
              }
              label={`${c}`}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  )
}



const FlareIndexFilter = ({ flareIndex, onChange }) => {
  const onFilterChange = value => (event, checked) => {
    if (checked) {
      return onChange(true)
    }
    return onChange(false)
  }

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{`With flare index`}</FormLabel>
      <FormGroup row>
        {
          <FormControlLabel
            control={
              <Checkbox
                checked={flareIndex}
                onChange={onFilterChange()}
              />
            }
            label={`Has flare index`}
          />
        }
      </FormGroup>
    </FormControl>
  )
}

const DateFilter = ({ classes, start, end, onChange }) => {
  const onFilterChange = (name) => ({ target: { value }} ) => onChange({ [name]: value })

  const from = start && `from ${start}`
  const to = end && `to ${end}`

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>{`Date ${from} ${to}`}</FormLabel>
      <FormGroup row>
        <TextField
          id="start"
          label="From"
          type="date"
          value={start}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onFilterChange('start')}
        />
        <TextField
          id="end"
          label="To"
          type="date"
          value={end}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onFilterChange('end')}
        />
      </FormGroup>
    </FormControl>
  )
}

@withStyles(s)
class SunspotFilters extends React.Component {
  constructor (props) {
    super(props)
    const { filters } = props
    this.state = {
      filters: Object.assign({}, filters)
    }
  }

  handleFlareFilterChange = value => {
    const { filters } = this.state
    this.setState({ filters: Object.assign(filters, { flareClasses: value }) })
  }

  handlePositionFilterChange = value => {
    const { filters } = this.state
    this.setState({ filters: Object.assign(filters, { position: value }) })
  }

  handleDateFilterChange = value => {
    const { filters } = this.state
    console.log({ filters: Object.assign(filters, value) })
    this.setState({ filters: Object.assign(filters, value) })
  }

  handleFlareIndexFilterChange = value => {
    const { filters } = this.state
    this.setState({ filters: Object.assign(filters, { flareIndex: value }) })
  }

  onApplyFilters = () => {
    const { filters } = this.state
    const { onApply } = this.props
    return onApply(filters)
  }

  onResetFilters = () => {
    const { onReset } = this.props
    return this.setState({ filters: { flareClasses: [], position: [], start: '', end: '', flareIndex: false} }, onReset)
  }

  render () {
    const { filters } = this.state
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.filtersRow}>
          <FlareClassFilter {...filters}
                            onChange={this.handleFlareFilterChange} />
          <PositionFilter {...filters}
                          onChange={this.handlePositionFilterChange} />
        </div>

        <div className={classes.filtersRow}>
          <DateFilter classes={classes} {...filters} onChange={this.handleDateFilterChange}/>

          <FlareIndexFilter {...filters}
                            onChange={this.handleFlareIndexFilterChange} />
        </div>


        <div className={classes.actions}>
          <Button raised
                  className={classes.button}
                  onClick={this.onApplyFilters}>
            Apply
          </Button>
          <Button raised
                  color='accent'
                  className={classes.button}
                  onClick={this.onResetFilters}>
            Reset
          </Button>
        </div>
      </div>
    )
  }
}

export default SunspotFilters