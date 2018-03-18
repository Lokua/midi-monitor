import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import { ThemeProvider } from 'styled-components'

import { theme } from '../src/styles'
import '../src/styles/global'

const req = require.context('../src', true, /.stories.js$/)
const loadStories = () => req.keys().forEach(req)

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)

setOptions({
  name: 'midi-monitor',
  showAddonPanel: false
})

configure(loadStories, module)
