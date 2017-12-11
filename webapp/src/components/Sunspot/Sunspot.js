import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import { withStyles } from 'material-ui/styles'
import SunspotStore from '../../stores/sunspot'

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

@withRouter
@withStyles(s)
@observer
export default class Sunspot extends Component {
  constructor (props) {
    super(props)
    const { id } = props.match.params
    this.store = new SunspotStore(id)
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
      return <p>Thinking...</p>
    }

    return (
      <div></div>
    )
  }
}
