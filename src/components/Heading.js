import React from 'react'
import PropTypes from 'prop-types'
import g from 'glamorous'

const base = {
  margin: '0.25em 0'
}

const headings = {
  H1: g.h1(base),
  H2: g.h2(base),
  H3: g.h3(base),
  H4: g.h4(base),
  H5: g.h5(base),
  H6: g.h6(base)
}

const Heading = ({ level, ...rest }) => {
  const Component = headings[`H${level}`]
  return <Component {...rest} />
}

Heading.propTypes = {
  level: PropTypes.number.isRequired
}

export default Heading
