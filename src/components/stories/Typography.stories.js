import React from 'react'
import { storiesOf } from '@storybook/react'
import Heading from '../Heading'

storiesOf('Typography').add('default', () => (
  <div>
    <Heading>Heading</Heading>
    <div>regular text</div>
    <b>bold</b>
    <br />
    <em>em</em>
    <pre>pre</pre>
    <code>code</code>
  </div>
))
