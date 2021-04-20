import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Masonry from 'react-masonry-css'
import Heading from './ColumnsHeading'

const breakpointColumnsObj = {
    default:  3,
    1920:     3,
    1919.95:  2,
    959.95:   1
}

const style = theme => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  column: {
    backgroundClip: 'padding-box'
  }
})

@withStyles(style)
class Columns extends Component {
  render() {
    const { classes, children, heading, subheading, breakpoints } = this.props
    return (
      <div>
        <Heading>{heading}</Heading>
        { subheading }
        <Masonry
          breakpointCols={breakpoints || breakpointColumnsObj}
          className={classes.root}
          columnClassName={classes.column}>
          {children}
        </Masonry>
      </div>)
  }
}

export default Columns
