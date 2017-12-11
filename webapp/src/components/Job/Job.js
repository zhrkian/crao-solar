import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import { SunspotsFilter } from '../Filters'
import Typography from 'material-ui/Typography'
import CsvCreator from 'react-csv-creator'
import JobStore from '../../stores/job'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'

const s = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 3
  },
  tableWrapper: {},
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.unit * 3
  }
})

const HEADERS = [
  {"id":"NOAA","display":"NOAA"},
  {"id":"BEGIN","display":"BEGIN"},
  {"id":"END","display":"END"},
  {"id":"DAYS","display":"DAYS"},
  {"id":"POSITION","display":"POSITION"},
  {"id":"MAX FLARE","display":"MAX FLARE"},
  {"id":"FLARE INDEX","display":"FLARE INDEX"},
]

const getHeaders = data => {
  let headers = []

  console.log(data)

  if (!data || !data.length) return []

  for (let key in data[0]) {
    if (data[0].hasOwnProperty(key)) {
      headers.push({
        id: key,
        display: key
      })
    }
  }
  return headers
}

@withRouter
@withStyles(s)
@observer
export default class Job extends Component {
  constructor (props) {
    super(props)

    const { id } = props.match.params
    console.log(props)

    this.store = new JobStore(id)
  }

  componentWillMount () {

  }

  render () {
    const {
      classes,
    } = this.props

    const {
      thinking,
      name,
      options,
      result
    } = this.store

    if (thinking) {
      return <Paper className={classes.root}>Thinking...</Paper>
    }

    const { sunspots } = options

    return (
      <Paper className={classes.root}>
        <Typography className={classes.row} type="title" align="center" gutterBottom>
          { name }
        </Typography>

        { !sunspots && <SunspotsFilter filters={options} readOnly/> }

        {
          !!sunspots && (
            <div className={classes.row}>
              {
                sunspots.map(sunspot => (
                  <Chip
                    disabled
                    label={`NOAA ${sunspot}`}
                    key={sunspot}
                    className={classes.chip}
                  />
                ))
              }
            </div>
          )
        }

        {
          result ? (
            <div>
              <div className={classes.row}>
                <Button raised className={classes.button}>
                  <CsvCreator
                    filename={name.replace(/\s/g, '_')}
                    headers={HEADERS}
                    rows={result}>
                    Download CSV
                  </CsvCreator>

                </Button>
              </div>

              <div className={classes.row}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      { HEADERS.map(column => <TableCell key={column.id}>{ column.display }</TableCell>) }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      result.map((row, index) => {
                        return (
                          <TableRow key={index} hover>
                            { HEADERS.map(column => <TableCell key={column.id}>{ row[column.display] }</TableCell>) }
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : <div className={classes.row}>No result for this Job ;(</div>
        }
      </Paper>
    )
  }
}
