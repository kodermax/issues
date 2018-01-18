import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import blue from 'material-ui/colors/blue'
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles'
const theme = createMuiTheme({
  palette: {
    secondary: blue,
    accent: blue,
    type: 'light'
  },
})

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme} >
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}
export default AppContainer
