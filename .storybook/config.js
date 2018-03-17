import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/styles'
import '../src/styles/global'

const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(req)
}

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

configure(loadStories, module)
