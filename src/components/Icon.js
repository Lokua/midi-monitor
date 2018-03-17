import React from 'react'
import styled from 'styled-components'

import verticalAlignBottom from '@lokua/mdi-svg/svg/verticalAlignBottom.svg'
import checkBox from '@lokua/mdi-svg/svg/checkBox.svg'
import checkBoxOutlineBlank from '@lokua/mdi-svg/svg/checkBoxOutlineBlank.svg'
import close from '@lokua/mdi-svg/svg/close.svg'
import settings from '@lokua/mdi-svg/svg/settings.svg'
import ax from '../styles'

const svgs = {
  verticalAlignBottom,
  checkBox,
  checkBoxOutlineBlank,
  close,
  settings
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
