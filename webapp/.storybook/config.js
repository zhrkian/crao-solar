import React from 'react'
import { configure, addDecorator } from '@kadira/storybook'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme()

addDecorator(story => <MuiThemeProvider theme={theme}>{story()}</MuiThemeProvider>)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
