import React from 'react'
import { storiesOf } from '@storybook/react'
import Icon from '../Icon'

storiesOf('Icon').add('default', () => (
  <div>
    <Icon name="checkBox" />
    <Icon name="checkBoxOutlineBlank" />
  </div>
))
