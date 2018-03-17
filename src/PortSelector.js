import React from 'react'

import { connect } from './context'
import List from './components/List'
import CheckField from './components/CheckField'

const enhance = connect(['inputs', 'selectedInputs', 'onToggle'])

const PortSelector = ({ inputs, selectedInputs, onToggle }) => (
  <List>
    {(inputs || []).map(input => (
      <List.Item key={input.id} onClick={() => onToggle(input)}>
        <CheckField value={selectedInputs.includes(input)}>
          {input.name}
        </CheckField>
      </List.Item>
    ))}
  </List>
)

export default enhance(PortSelector)
