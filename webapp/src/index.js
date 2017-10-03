import('./styles/main.scss')
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'
import App from './containers/App'
import stores from './stores/stores'

const theme = createMuiTheme()

const renderApp = Component => {
	render(
		<AppContainer>
			<Router>
        <MuiThemeProvider theme={theme}>
          <Provider {...stores}>
            <Component />
          </Provider>
        </MuiThemeProvider>
			</Router>
		</AppContainer>,
		document.getElementById('root')
	)
}

renderApp(App)

if (module.hot) {
	module.hot.accept(() => renderApp(App))
}
