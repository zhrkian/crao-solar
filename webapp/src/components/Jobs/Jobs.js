import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'

import Spreedsheet from './components/Spreedsheet'
import Setup from './components/Setup'
import Sunspots from './Sunspots'

import s from './Jobs.styles'

class Jobs extends Component {
  constructor (props) {
    super(props)

    this.state = { job: props.job || {} }
  }

  updateJob = field => {
    const { job } = this.state
    this.setState({ job: { ...job, ...field }})
  }

  onUrlChange = sheet_url => this.updateJob({ sheet_url })
  onNameChange = name => this.updateJob({ name })

  onKindChange = kind => this.updateJob({ kind })

  onOptionsChange = options => this.updateJob({ options })

  render () {
    const { classes } = this.props
    const { job } = this.state
    const { name, sheet_url } = job
    const { kind = true } = job
    const { options } = job
    const sheetProps = { onUrlChange: this.onUrlChange, onNameChange: this.onNameChange, name, sheet_url }
    const setupProps = { onKindChange: this.onKindChange, kind: kind || '' }
    const sunspotProps = { onChange: this.onOptionsChange, options }

    console.log(job)

    return (
      <div className={classes.root}>
        <div className={classes.content} style={{ width: kind ? '50%' : '100%'}}>
          <Spreedsheet {...sheetProps} />
          <Setup {...setupProps}/>
        </div>
        {
          kind ? (
            <div className={classes.job}>
              <Sunspots {...sunspotProps} />
            </div>
          ) : null
        }

      </div>
    )
  }
}

export default withStyles(s)(Jobs)