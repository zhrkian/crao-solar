import React from 'react'
import ReactDOM from 'react-dom'
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  ScatterplotChart
} from 'react-easy-chart'

const CreateResponsiveChart = (chartType) => {
  class Chart extends React.Component {
    constructor() {
      super()
      this.state = { size: { w: 0, h: 0 } }
    }

    fitToParentSize() {
      const elem = ReactDOM.findDOMNode(this)
      const w = elem.parentNode.offsetWidth
      const h = elem.parentNode.offsetHeight
      const currentSize = this.state.size
      if (w !== currentSize.w || h !== currentSize.h) {
        this.setState({ size: { w, h } })
      }
    }

    getChartClass() {
      let Component
      switch (chartType) {
        case 'BarChart':
          Component = BarChart
          break
        case 'LineChart':
          Component = LineChart
          break
        case 'AreaChart':
          Component = AreaChart
          break
        case 'ScatterPlot':
          Component = ScatterplotChart
          break
        case 'PieChart':
          Component = PieChart
          break
        default:
          console.error('Invalid Chart Type name.')
          break
      }
      return Component
    }

    componentDidMount() {
      window.addEventListener('resize', ::this.fitToParentSize)
      this.fitToParentSize()
    }

    componentWillReceiveProps() {
      this.fitToParentSize()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', ::this.fitToParentSize)
    }

    render() {
      let Component = this.getChartClass()
      let { width, height, margin, ...others } = this.props

      width = this.state.size.w || 100
      height = 300

      return (
        <Component
          width = {width}
          height = {height}
          margin = {margin}
          {...others}
        />
      )
    }
  }
  Chart.defaultProps = {
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    },
  }
  Chart.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    margin: React.PropTypes.object,
  }
  return Chart
}

export default CreateResponsiveChart