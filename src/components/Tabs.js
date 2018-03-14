import React from 'react'
import g from 'glamorous'
import Heading from './Heading'

const List = g.ul(p => ({
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  padding: 0,
  margin: '1rem 0',
  textAlign: 'center',
  cursor: 'pointer'
}))

const ListItem = g.li(
  p => ({
    flexGrow: 1,
    padding: '0.5em',
    color: 'lightgray',
    borderRadius: '2px',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: 'color 0.2s',

    ':hover': {
      color: 'black'
    }
  }),
  p => {
    const border = '1px solid gray'

    return p.active
      ? {
          color: 'black',
          borderTop: border,
          borderRight: border,
          borderLeft: border
        }
      : {
          borderBottom: border
        }
  }
)

const Tab = ({ active, text, ...rest }) => (
  <ListItem active={active} {...rest}>
    <Heading level={5}>{text}</Heading>
  </ListItem>
)

const Tabs = ({ tabs, activeIndex, onClickTab }) => (
  <List>
    {tabs.map((tab, index) => (
      <Tab
        key={tab}
        active={index === activeIndex}
        text={tab}
        onClick={() => onClickTab(index, tab)}
      />
    ))}
  </List>
)

export default Tabs
