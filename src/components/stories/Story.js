import React from 'react'
import styled from 'styled-components'
import ax from '../../styles'

const Container = styled.div`
  padding: 2rem;
  color: ${ax.color('text')};
`

export default ({ title, children, ...rest }) => (
  <Container {...rest}>
    <h1>{title}</h1>
    <hr />
    {children}
  </Container>
)
