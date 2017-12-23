import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Checkbox from 'material-ui/Checkbox'
import { TableCell, TableRow } from 'material-ui/Table'

const s = theme => ({
  root: {
    background: theme.palette.background.paper,
    margin: theme.spacing.unit / 3
  },
  name: {
    flex: '0.3 0.3 auto'
  }
})

@withRouter
class SunspotListItem extends Component {
  render () {
    const {
      sunspot,
      selected,
      onSelect
    } = this.props

    const { id, number, start_at, end_at, days, position, maxFlare, flareIndex } = sunspot

    const onClick = (e) => {
      const { nodeName, type } = e.target
      const { history } = this.props

      if (nodeName === 'INPUT' && type === 'checkbox') {
        return
      } else {
        history.push(`/sunspots/${id}`, { modal: true })
      }
    }

    return (
      <TableRow
        hover
        role='checkbox'
        onClick={onClick}
        aria-checked={selected}
        tabIndex={-1}
        selected={selected}
      >
        <TableCell padding='checkbox'>
          <Checkbox checked={selected}
                    onClick={event => onSelect(number)}/>
        </TableCell>
        <TableCell padding='none'>{ `NOAA${number}` }</TableCell>
        <TableCell padding='none'>{ start_at && moment(new Date(start_at)).format('DD MMM YYYY').toString() }</TableCell>
        <TableCell padding='none'>{ end_at && moment(new Date(end_at)).format('DD MMM YYYY').toString() }</TableCell>
        <TableCell>{ days }</TableCell>

        <TableCell>
          { position }
        </TableCell>

        {/*<TableCell>*/}
          {/*2*/}
        {/*</TableCell>*/}

        {/*<TableCell>*/}
          {/*3*/}
        {/*</TableCell>*/}

        {/*<TableCell>*/}
          {/*4*/}
        {/*</TableCell>*/}

        {/*<TableCell>*/}
          {/*5*/}
        {/*</TableCell>*/}

        <TableCell>
          {
            maxFlare ? (
              <div>
                <p>{maxFlare['class']}{maxFlare.value}</p>
                <p>{moment(new Date(maxFlare.date)).format('DD MMM YYYY')} {maxFlare.time}</p>
              </div>
            ) : '-.-'
          }
        </TableCell>

        <TableCell>
          { flareIndex ? flareIndex.toFixed(3) : '-.-' }
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(s)(SunspotListItem)