import React from 'react'
import Icon from './Icon'
import styled from 'styled-components'
import ax from '../styles'

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${ax.color('text')};

  .Icon {
    margin-right: 0.25rem;
  }

  label {
    display: block;
    margin-bottom: -1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
  }
`

export default ({ name, children, onClick, ...rest }) => (
  <Container onClick={onClick} {...rest}>
    <Icon name={name} />
    <label>{children}</label>
  </Container>
)
