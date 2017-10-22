import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs'
import s from './Sunspot.styles'

import CreateChartContainer from '../ResponsiveChartContainer'

const AreaChart = CreateChartContainer('AreaChart')

const AreaChartBar = ({ data, xLabel, yLabel }) => {
  const values = Object.keys(data).map(date => ({ x: moment(new Date(date)).format('DD MMM') /*.split('-')[2]*/, y: data[date] }))
  return (
    <AreaChart
      axes
      grid
      dataPoints
      interpolate={'cardinal'}
      xType={'text'}
      axisLabels={{ x: xLabel, y: yLabel }}
      yTicks={3}
      data={[ values ]}/>
  )
}

const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>

@withStyles(s)
class Sunspot extends Component {
  state = { tab: 0 }

  handleTabChange = (event, tab) => {
    this.setState({ tab })
  }

  render () {
    const { classes } = this.props
    const { sunspot } = this.props
    const { tab } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            <Tab label={'Number of Spots/Area'} />
            {/*<Tab label={'Sunspot Area Info'} />*/}
          </Tabs>
        </AppBar>
        {
          tab === 0 && (
            <TabContainer>
              <AreaChartBar classes={classes} data={sunspot.sunspots_amount} yLabel={'Number of Spots'} />
              <AreaChartBar classes={classes} data={sunspot.area} yLabel={'Sunspot Area [millionths]'} />
            </TabContainer>
          )
        }
        {/*{tab === 1 && <TabContainer>Item Two</TabContainer>}*/}
      </div>
    )
  }
}

export default Sunspot
