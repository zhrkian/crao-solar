import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  FormGroup, FormLabel, FormControl, FormControlLabel,
  TextField,
  Button,
  Checkbox
} from '@material-ui/core'

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

const FlareClassFilter = ({ flareClasses, onChange, readOnly }) => {
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
                  disabled={readOnly}
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

const PositionFilter = ({ position, onChange, readOnly }) => {
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
                  disabled={readOnly}
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



const FlareIndexFilter = ({ flareIndex, onChange, readOnly }) => {
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
                disabled={readOnly}
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

const DateFilter = ({ classes, start, end, onChange, readOnly }) => {
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
          disabled={readOnly}
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
          disabled={readOnly}
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


const NumbersFilter = ({ numbers, onChange, readOnly }) => {
  const onFilterChange = (name) => ({ target: { value }} ) => onChange({ [name]: value })

  return (
    <FormControl component='fieldset' style={{ width: '50%' }}>
      <FormLabel component='legend'>{`Sunspot numbers`}</FormLabel>
      <FormGroup row>
        <TextField
          id="numbers"
          type="text"
          disabled={readOnly}
          value={numbers}
          multiline
          rows={3}
          fullWidth
          onChange={onFilterChange('numbers')}
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
    const { onChange } = this.props
    const newFilters = Object.assign(filters, { flareClasses: value })
    this.setState({ filters: newFilters })
    if (onChange) {
      onChange(newFilters)
    }
  }

  handlePositionFilterChange = value => {
    const { filters } = this.state
    const { onChange } = this.props
    const newFilters = Object.assign(filters, { position: value })
    this.setState({ filters: newFilters })
    if (onChange) {
      onChange(newFilters)
    }
  }

  handleDateFilterChange = value => {
    const { filters } = this.state
    const { onChange } = this.props
    const newFilters = Object.assign(filters, value)
    this.setState({ filters: newFilters })
    if (onChange) {
      onChange(newFilters)
    }

  }

  handleFlareIndexFilterChange = value => {
    const { filters } = this.state
    const { onChange } = this.props
    const newFilters = Object.assign(filters, { flareIndex: value })
    this.setState({ filters: newFilters })
    if (onChange) {
      onChange(newFilters)
    }
  }

  handleNumbersFilterChange = value => {
    const { filters } = this.state
    const { onChange } = this.props
    const newFilters = Object.assign(filters, value)
    this.setState({ filters: newFilters })
    if (onChange) {
      onChange(newFilters)
    }
  }

  onApplyFilters = () => {
    const { filters } = this.state
    const { onApply } = this.props
    return onApply(filters)
  }

  onResetFilters = () => {
    const { onReset } = this.props
    const newFilters = { flareClasses: [], position: [], start: '', end: '', numbers: '', flareIndex: false }
    return this.setState({ filters: newFilters }, () => onReset(newFilters))
  }

  render () {
    const { filters } = this.state
    const {
      classes,
      onChange,
      readOnly
    } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.filtersRow}>
          <FlareClassFilter {...filters}
                            readOnly={readOnly}
                            onChange={this.handleFlareFilterChange} />
          <PositionFilter {...filters}
                          readOnly={readOnly}
                          onChange={this.handlePositionFilterChange} />
        </div>

        <div className={classes.filtersRow}>
          <DateFilter classes={classes}
                      {...filters}
                      readOnly={readOnly}
                      onChange={this.handleDateFilterChange}/>

          <FlareIndexFilter {...filters}
                            readOnly={readOnly}
                            onChange={this.handleFlareIndexFilterChange} />
        </div>

        <div className={classes.filtersRow}>
          <NumbersFilter {...filters}
                         readOnly={readOnly}
                         onChange={this.handleNumbersFilterChange} />
        </div>

        {
          !readOnly && (
            <div className={classes.actions}>

              {
                !onChange && (
                  <Button raised
                          className={classes.button}
                          onClick={this.onApplyFilters}>
                    Apply
                  </Button>
                )
              }

              <Button raised
                      color='accent'
                      className={classes.button}
                      onClick={this.onResetFilters}>
                Reset
              </Button>
            </div>
          )
        }

      </div>
    )
  }
}

export default SunspotFilters
