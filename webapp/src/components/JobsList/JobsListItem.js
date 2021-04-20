import React, { Component } from 'react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TableCell, TableRow, Checkbox } from '@material-ui/core'

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
class JobsListItem extends Component {
  render () {
    const {
      job,
      selected,
      onSelect
    } = this.props

    const { id, name, spots, createdAt, status } = job

    const onClick = (e) => {
      const { nodeName, type } = e.target
      const { history } = this.props

      if (nodeName === 'INPUT' && type === 'checkbox') {
        return
      } else {
        history.push(`/jobs/${id}`, { modal: true })
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
                    onClick={event => onSelect(id)}/>
        </TableCell>
        <TableCell padding='none'>{name}</TableCell>
        <TableCell padding='none'>{ spots }</TableCell>
        <TableCell padding='none'>{ createdAt && moment(new Date(createdAt)).format('DD MMM YYYY').toString() }</TableCell>
        <TableCell>{ status }</TableCell>

      </TableRow>
    )
  }
}

export default withStyles(s)(JobsListItem)
