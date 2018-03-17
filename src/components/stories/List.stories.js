import React from 'react'
import { storiesOf } from '@storybook/react'
import List from '../List'

storiesOf('List').add('default', () => (
  <div>
    <List>
      <List.Item>One</List.Item>
      <List.Item>Two</List.Item>
      <List.Item>Three</List.Item>
    </List>
  </div>
))
