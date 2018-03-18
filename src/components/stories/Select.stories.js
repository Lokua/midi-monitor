import React from 'react'
import { storiesOf } from '@storybook/react'
import Story from './Story'
import Select from '../Select'

storiesOf('Select').add('default', () => (
  <Story title="Select">
    <Select value="red" onChange={() => {}} style={{ width: '256px' }}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Select>
    <br />
    <Select invert value="red" onChange={() => {}} style={{ width: '256px' }}>
      <option value="red">Red</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
    </Select>
  </Story>
))
