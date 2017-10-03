import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import Checkbox from 'material-ui/Checkbox'
import { TableCell, TableRow } from 'material-ui/Table'
import s from './SunspotListItem.styles'

const params = [
  { field: 'position', label: 'Position Info' },
  { field: 'hale_class', label: 'Hale Class Info' },
  { field: 'macintosh_class', label: 'MacIntosh Class Info' },
  { field: 'area', label: 'Area Info' },
  { field: 'sunspots_amount', label: 'Spots Amount Info' },
  { field: 'flares', label: 'Flares Info' }
]

@inject((stores, props) => {
  return {
    toggleSelected: () => props.sunspot.toggleSelected()
  }
})
@observer
class SunspotListItem extends Component {
  render () {
    const { sunspot } = this.props
    const { toggleSelected } = this.props
    const { start_at, end_at } = sunspot
    const days = start_at && end_at ? moment(end_at).diff(moment(start_at), 'days') + 1 : ' - '

    return (
      <TableRow
        hover
        role='checkbox'
        onClick={console.log}
        aria-checked={sunspot.selected}
        tabIndex={-1}
        selected={sunspot.selected}
      >
        <TableCell padding='checkbox'>
          <Checkbox checked={sunspot.selected}
                    onClick={event => toggleSelected()}/>
        </TableCell>
        <TableCell padding='none'>{ `NOAA${sunspot.number}` }</TableCell>
        <TableCell>{ days }</TableCell>
        {
          params.map(param => {
            const checked = sunspot[param.field] && Object.keys(sunspot[param.field]).length
            return (
              <TableCell key={param.field}>
                { checked ? ' + ' : ' - ' }
              </TableCell>
            )
          })
        }
      </TableRow>
    )
  }
}

export default withStyles(s)(SunspotListItem)