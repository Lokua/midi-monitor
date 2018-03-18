import React from 'react'
import styled from 'styled-components'

import checkBox from '@lokua/mdi-svg/svg/checkBox.svg'
import checkBoxOutlineBlank from '@lokua/mdi-svg/svg/checkBoxOutlineBlank.svg'
import close from '@lokua/mdi-svg/svg/close.svg'
import input from '@lokua/mdi-svg/svg/input.svg'
import settings from '@lokua/mdi-svg/svg/settings.svg'
import midi from './midi.svg'
import ax from '../../styles'

const svgs = {
  checkBox,
  checkBoxOutlineBlank,
  close,
  input,
  settings,
  midi
}

const Container = styled.div`
  svg {
    fill: ${ax.color('text')};
    display: block;
  }
`

export default ({ name, className = '', ...rest }) => (
  <Container
    className={`Icon ${className}`}
    dangerouslySetInnerHTML={{ __html: svgs[name] }}
    {...rest}
  />
)
