import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { inject, observer } from 'mobx-react'
import Pane from '../Grid/Pane'
import { BarChart } from 'react-d3-components'
import s from './Sunspot.styles'

const SunSportsBar = ({ classes, sunspots }) => {
  const values = Object.keys(sunspots).map(date => ({ x: date.split('-')[2], y: sunspots[date] }))
  return (
    <div className={classes.item}>
      <Pane title='Number of Spots'>
        <BarChart
          data={[ { label: 'Number of Spots', values }]}
          width={450}
          height={300}
          xAxis={{label: 'Days'}}
          yAxis={{innerTickSize: 1, label: 'Number of Spots'}}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      </Pane>
    </div>
  )
}

@withRouter
@inject((stores, props) => {
    return {
      sunspot: stores.sunspotsStore.findById(props.match.params.id)
    }
  }
)
@observer
class Sunspot extends Component {
  render () {
    const { classes } = this.props
    const { sunspot } = this.props

    console.log(this.props, sunspot)

    return (
      <div className={classes.root}>
        <SunSportsBar classes={classes} sunspots={sunspot.sunspots_amount} />
        <SunSportsBar classes={classes} sunspots={sunspot.sunspots_amount} />
        <SunSportsBar classes={classes} sunspots={sunspot.sunspots_amount} />
        {/*<div className={classes.item}>*/}
          {/*<Pane title="Some title">*/}
            {/*<BarChart*/}
              {/*data={data}*/}
              {/*width={400}*/}
              {/*height={300}/>*/}
          {/*</Pane>*/}
        {/*</div>*/}
        {/*<div className={classes.item}>*/}
          {/*<Pane title="Some title">*/}
            {/*<BarChart*/}
              {/*data={data}*/}
              {/*width={400}*/}
              {/*height={300}/>*/}
          {/*</Pane>*/}
        {/*</div>*/}
        {/*<div className={classes.item}>*/}
          {/*<Pane title="Some title">*/}
            {/*<BarChart*/}
              {/*data={data}*/}
              {/*width={400}*/}
              {/*height={300}/>*/}
          {/*</Pane>*/}
        {/*</div>*/}
      </div>
    )
  }
}

export default withStyles(s)(Sunspot)
