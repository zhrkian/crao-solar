import React, {Component} from 'react'
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const style = theme => ({
  root: {
    padding: '1em',
  }
})

@withStyles(style)
class ColumnsHeading extends Component {
  render() {
    const {classes, children} = this.props
    return (
      <div className = {classes.root}>
        <Typography component={'h1'} type={'display1'}>
          {children}
        </Typography>
      </div>
    )
  }
}

export default ColumnsHeading
