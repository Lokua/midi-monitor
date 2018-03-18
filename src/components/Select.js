import React from 'react'
import styled from 'styled-components'
import ax from '../styles'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`

const inverted = (a, b) => p => ax.color(p.invert ? a : b)(p)

const SelectComponent = styled.select`
  position: absolute;
  appearance: none;
  width: 100%;
  height: 24px;
  padding: 0 0.5em;
  color: ${inverted('text', 'background')};
  background-color: ${inverted('background', 'text')};
  background-image: none;
  border: 1px solid ${ax.color('text')};
  border-radius: 2px;
  box-shadow: none;
  font-size: 1em;
  font-weight: 400;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

const DownTriangle = styled.div`
  position: absolute;
  top: 0;
  right: 1rem;
  z-index: 1;
  display: block;
  color: ${inverted('text', 'background')};
  font-size: 1em;
  transform: rotate(90deg);
  pointer-events: none;
`

export default ({ children, className, style, invert, ...rest }) => (
  <Container className={className} style={style}>
    <SelectComponent invert={invert} {...rest}>
      {children}
    </SelectComponent>
    <DownTriangle invert={invert}>&#8227;</DownTriangle>
  </Container>
)
