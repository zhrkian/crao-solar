import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import Checkbox from 'material-ui/Checkbox'
import { TableCell, TableRow } from 'material-ui/Table'
import s from './SunspotListItem.styles'

import * as SunspotUtils from '../../utils/sunspot'


const params = [
  { field: 'position', label: 'Position Info' },
  { field: 'hale_class', label: 'Hale Class Info', getter: 'getHaleClass' },
  { field: 'macintosh_class', label: 'MacIntosh Class Info', getter: 'getMacIntoshClass' },
  { field: 'area', label: 'Area Info' },
  { field: 'sunspots_amount', label: 'Spots Amount Info' },
  { field: 'flares', label: 'Flares Info', getter: 'getMaximalFlare' }
]

@withRouter
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
    const { start_at, end_at } = SunspotUtils.getDates(sunspot.dates)
    const days = start_at && end_at ? moment(end_at).diff(moment(start_at), 'days') + 1 : ' - '
    const maxFlare = SunspotUtils.getMaxFlare(sunspot.info)
    const flareIndex = SunspotUtils.getFlareIndex(sunspot.info, days)



    const onClick = (e) => {
      const { nodeName, type } = e.target
      const { history } = this.props
      const { id } = sunspot

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
        aria-checked={sunspot.selected}
        tabIndex={-1}
        selected={sunspot.selected}
      >
        <TableCell padding='checkbox'>
          <Checkbox checked={sunspot.selected}
                    onClick={event => toggleSelected()}/>
        </TableCell>
        <TableCell padding='none'>{ `NOAA${sunspot.number}` }</TableCell>
        <TableCell padding='none'>{ start_at ? moment(start_at).format('YYYY/MM/DD').toString() : null }</TableCell>
        <TableCell padding='none'>{ end_at ? moment(end_at).format('YYYY/MM/DD').toString() : null }</TableCell>
        <TableCell>{ days }</TableCell>

        <TableCell>
          { SunspotUtils.getPosition(sunspot.info) || ' - '}
        </TableCell>

        <TableCell>
          2
        </TableCell>

        <TableCell>
          3
        </TableCell>

        <TableCell>
          4
        </TableCell>

        <TableCell>
          5
        </TableCell>

        <TableCell>
          {
            maxFlare && (
              <div>
                <p>{maxFlare['class']}{maxFlare.value}</p>
                <p>{maxFlare.date} {maxFlare.time}</p>
              </div>
            )
          }
        </TableCell>

        <TableCell>
          { flareIndex ? flareIndex.toFixed(3) : ' - ' }
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(s)(SunspotListItem)