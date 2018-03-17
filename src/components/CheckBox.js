import React from 'react'
import styled from 'styled-components'

import Icon from './Icon'
import ax from '../styles'

const CheckboxIcon = styled(Icon)`
  svg {
    fill: ${ax.color('icon')};
  }
`

export default ({ value, onClick, ...rest }) => (
  <CheckboxIcon
    name={value ? 'checkBox' : 'checkBoxOutlineBlank'}
    onClick={onClick}
    {...rest}
  />
)
