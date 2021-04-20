import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import { observer } from 'mobx-react'
import Slider from 'react-slick'
import { Line } from 'react-chartjs'
import { withStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import Columns , { ColumnsHeading } from '../Columns'
import Panel, { PanelToolbar } from '../Panel'
import SunspotStore from '../../stores/sunspot'


const chart = {
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3]
    }]
  },
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}

const s = theme => ({
  slideContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 681,
    width: 681,
  },
  slider: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 5,
  }
})

const ChartInfo = ({ title, labels, data }) => {
  const options = { responsive: true, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }

  return (
    <Panel title={title}><Line data={{ labels, datasets: [ { data } ]}} options={options}/></Panel>
  )
}

const ClassInfo = ({ title, subtitle, header, info }) => (
  <Panel title={title} subtitle={subtitle} collapsible>
    <Table>
      <TableHead>
        <TableRow>
          {
            header.map(h => <TableCell key={h}>{ h }</TableCell>)
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          info.map((row, index) => {
            return (
              <TableRow key={index} hover>
                <TableCell>{ moment(new Date(row.date)).format('DD MMM YYYY').toString() }</TableCell>
                <TableCell>{ row.value || '-.-' }</TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
    </Table>
  </Panel>
)

const FlaresInfo = ({ title, subtitle, info }) => {
  const flares = []

  info.forEach(i => {
    const date = moment(new Date(i.date)).format('DD MMM YYYY').toString()
    i.flares.reverse().forEach(f => {
      flares.push({
        date: `${date} ${f.time}`,
        'class': f['class'],
        value: f.value
      })
    })
  })

  if (!flares.length) return null

  return (
    <Panel title={title} subtitle={subtitle} collapsible>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{ 'Date (Time)' }</TableCell>
            <TableCell>{ 'Class' }</TableCell>
            <TableCell>{ 'Value' }</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            flares.map((row, index) => {
              return (
                <TableRow key={index} hover>
                  <TableCell>{ row.date }</TableCell>
                  <TableCell>{ row['class'] }</TableCell>
                  <TableCell>{ row.value }</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </Panel>
  )
}

@withStyles(s)
class ImagesSlider extends Component {
  // 681
  render () {
    const {
      classes,
      info
    } = this.props

    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    }

    return (
      <div className={classes.slider}>
        <Slider {...settings}>
          {
            info.map((i, index) => (
              <div
                key={index}>
                <div
                  className={classes.slideContainer}>
                  <span>{ moment(new Date(i.date)).format('DD MMM YYYY').toString() }</span>
                  <a target={'_blank'} href={i.image}>
                    <img className={classes.image} src={!i.image || i.image.indexOf('placeholder') > -1 ? '//via.placeholder.com/681x681' : i.image }/>
                  </a>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }
}

@withRouter
@withStyles(s)
@observer
export default class Sunspot extends Component {
  constructor (props) {
    super(props)
    const { id } = props.match.params
    this.store = new SunspotStore(id)
  }

  render () {
    const {
      classes,
    } = this.props

    const {
      thinking,
      number,
      position,
      flareIndex,
      maxFlare,
      info
    } = this.store

    if (thinking) {
      return <Panel>Thinking...</Panel>
    }

    if (!info || !info.length) {
      return <Panel title={'Result'}>No info for this sunspot ;(</Panel>
    }

    const flareInfoString =
      (!!flareIndex && !!maxFlare)
      && (
      <span>
        Flare index {`${flareIndex.toFixed(3)}`} and Maximal flare {`${maxFlare['class']}${maxFlare['value']}`} at {`${moment(new Date(maxFlare['date'])).format('D MMM YYYY')} ${maxFlare['time']}`}
      </span>
      )

    return (
      <div style={{flexGrow: 1}}>
        <Columns
          heading={`NOAA${number}`}
          subheading={<ImagesSlider info={info}/>}>

          <ClassInfo
            title={`Position`}
            subtitle={!!position && `Average sunspot position "${position}"`}
            header={['Date', 'Coordinates']}
            info={info.map(i => ({ date: i.date, value: i.position }))}/>

          <ClassInfo
            title={'McIntosh Class'}
            header={['Date', 'Class']}
            info={info.map(i => ({ date: i.date, value: i.macintosh_class }))}/>

          <ClassInfo
            title={'Hale Class'}
            header={['Date', 'Class']}
            info={info.map(i => ({ date: i.date, value: i.hale_class }))}/>

          <FlaresInfo
            title={'Flares'}
            subtitle={flareInfoString}
            info={info}/>

          <ChartInfo
            title={'Sunspot Area [millionths]'}
            labels={info.map(i => moment(new Date(i.date)).format('DD MMM YYYY').toString())}
            data={info.map(i => i.area)}/>

          <ChartInfo
            title={'Number of Spots'}
            labels={info.map(i => moment(new Date(i.date)).format('DD MMM YYYY').toString())}
            data={info.map(i => i.sunspots_amount)} />

        </Columns>
      </div>
    )
  }
}
