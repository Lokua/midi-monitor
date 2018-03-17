import React from 'react'
import { storiesOf } from '@storybook/react'
import Story from './Story'
import CheckBox from '../CheckBox'

storiesOf('CheckBox').add('default', () => (
  <Story title="CheckBox">
    <CheckBox value />
    <CheckBox />
  </Story>
))
