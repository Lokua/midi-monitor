import React from 'react'
import { storiesOf } from '@storybook/react'
import Story from './Story'
import CheckField from '../CheckField'

storiesOf('CheckField').add('default', () => (
  <Story title="CheckField">
    <CheckField value>IAC Driver Foo</CheckField>
    <CheckField>IAC Driver Bar</CheckField>
  </Story>
))
