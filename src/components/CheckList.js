import React from 'react'
import List from './List'

const CheckList = ({ items, onClickItem }) => (
  <List>
    {items.map(item => (
      <List.Item
        key={item.key || item.value}
        onClick={e => onClickItem(e, item)}
      >
        {item.value}
      </List.Item>
    ))}
  </List>
)

export default CheckList
