import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'

import './styles/global'
import { theme } from './styles'
import { Provider } from './context'
import App from './App'

render(
  <ThemeProvider theme={theme}>
    <Provider>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
