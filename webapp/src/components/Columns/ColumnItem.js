import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'

const style = theme => ({
  root: {
    display: 'inline-block',
    width: 'calc(100% - 1.6em)',
    margin: '0.8em',
    boxSizing: 'border-box',
    position: 'relative'
  }
})

@withStyles(style)
class ColumnItem extends Component {
  render() {
    const {classes, children} = this.props
    return (
      <div className = {classes.root}>{children}</div>
    )
  }
}

export default ColumnItem
