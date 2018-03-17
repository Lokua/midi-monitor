import React from 'react'

import CheckBox from './CheckBox'
import { Container } from './IconField'

export default ({ value, children, onClick, ...rest }) => (
  <Container onClick={onClick} {...rest}>
    <CheckBox value={value} />
    <label>{children}</label>
  </Container>
)
