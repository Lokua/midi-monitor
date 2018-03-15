import React from 'react'
import { connect } from './context'

export default connect(['inputs', 'selectedInputs', 'onToggle'])(
  ({ inputs, selectedInputs, onToggle }) => (
    <div>
      {inputs ? (
        <ul>
          {inputs.map(input => (
            <li key={input.id} onClick={() => onToggle(input)}>
              [{selectedInputs.includes(input) ? 'x' : ' '}]{input.name}
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  )
)
