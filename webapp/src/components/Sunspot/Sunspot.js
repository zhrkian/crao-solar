import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import moment from 'moment'
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs'
import axios from 'axios'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import s from './Sunspot.styles'

import CreateChartContainer from '../ResponsiveChartContainer'
import { Legend } from 'react-easy-chart'

const AreaChart = CreateChartContainer('AreaChart')
const ScatterPlot = CreateChartContainer('ScatterPlot')

const AreaChartBar = ({ data, xLabel, yLabel }) => {
  return (
    <AreaChart
      axes
      grid
      dataPoints
      interpolate={'cardinal'}
      xType={'text'}
      axisLabels={{ x: xLabel, y: yLabel }}
      yTicks={3}
      data={[ data ]}/>
  )
}

// const FlaresScatter = ({ flares }) => {
//   let data = []
//   Object.keys(flares).map(date => {
//     Object.keys(flares[date]).map(flareClass => {
//       flares[date][flareClass].forEach(flare => {
//         if (!flare) return
//         data.push({
//           x: moment(new Date(date)).format('DD MMM'),
//           y: flare,
//           type: `${flareClass} flare class`
//         })
//       })
//     })
//   })
//
//   return (
//     <div>
//       <ScatterPlot
//         axes
//         grid
//         yType={'text'}
//         xType={'text'}
//         data={data} />
//       <Legend data={data} dataId={'type'} />
//     </div>
//   )
// }
//
// const ClassesScatter = ({ classes }) => {
//   let data = []
//   Object.keys(classes).map(date => {
//     if (!classes[date]) return
//     data.push({
//       x: moment(new Date(date)).format('DD MMM'),
//       y: classes[date],
//       type: `${classes[date]} - class`
//     })
//   })
//
//   return (
//     <div>
//       <ScatterPlot
//         axes
//         grid
//         xType={'text'}
//         data={data} />
//       <Legend data={data} dataId={'type'} />
//     </div>
//   )
// }

const TabContainer = ({ children }) => <div style={{ padding: 8 * 3 }}>{children}</div>

@withStyles(s)
class Sunspot extends Component {
  state = { tab: 0, thinking: true }

  async componentWillMount () {
    const { id, onSetTitle } = this.props
    const { data } = await axios.get(`/api/sunspots/${id}`)
    const { sunspot, success } = data

    if (success) {
      this.setState({ thinking: false, sunspot })
    }
    return onSetTitle && sunspot ? onSetTitle(`NOAA ${sunspot.number}`) : null
  }

  handleTabChange = (event, tab) => {
    this.setState({ tab })
  }

  render () {
    const { classes } = this.props
    const { tab, thinking, sunspot } = this.state

    if (thinking) {
      return <div className={classes.root}>Thinking...</div>
    }

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
            <Tab label={'Images'} />
            <Tab label={'Number of Spots/Area'} />
            <Tab label={'Sunspot Flares'} />
            {/*<Tab label={'Hale Classes'} />*/}
            {/*<Tab label={'MacIntosh Flares'} />*/}
          </Tabs>
        </AppBar>
        {
          tab === 0 && (
            <TabContainer>
              <Carousel
                showArrows
                width="681">
                {
                  sunspot.info.map(info => (
                    <div key={info.date}>
                      <img src={info.image} />
                    </div>
                  ))
                }
              </Carousel>
            </TabContainer>
          )
        }
        {
          tab === 1 && (
            <TabContainer>
              <AreaChartBar
                classes={classes}
                data={sunspot.info.map(info => {
                  return {
                    x: moment(new Date(info.date)).format('DD MMM'),
                    y: info.sunspots_amount
                  }
                }).filter(item => item.y)}
                yLabel={'Number of Spots'} />
              <AreaChartBar
                classes={classes}
                data={sunspot.info.map(info => {
                  return {
                    x: moment(new Date(info.date)).format('DD MMM'),
                    y: info.area
                  }
                }).filter(item => item.y)}
                yLabel={'Sunspot Area [millionths]'} />
            </TabContainer>
          )
        }
        {
          tab === 2 && (
            <TabContainer>
              {/*<FlaresScatter {...sunspot} />*/}
            </TabContainer>
          )
        }
      </div>
    )
  }
}

export default Sunspot
