import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import './styles/global'
import { Provider, Consumer } from './context'
import App from './App'

render(
  <Provider>
    <Consumer>
      {context => (
        <ThemeProvider theme={context.theme}>
          <App />
        </ThemeProvider>
      )}
    </Consumer>
  </Provider>,
  document.getElementById('root')
)
