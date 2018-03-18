import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash/fp'

import { connect } from './context'
import ax from './styles'
import CheckField from './components/CheckField'

const Container = styled.div`
  color: ${ax.color('text')};

  > section {
    margin-bottom: 4rem;

    h3,
    h4 {
      margin-bottom: 1rem;
    }
  }
`

const enhance = connect([
  'settings',
  'toggleColumnEnabled',
  'toggleRecallPortSelections'
])

const Settings = ({
  settings,
  toggleColumnEnabled,
  toggleRecallPortSelections
}) => (
  <Container>
    <section>
      <h3>Settings</h3>
      <CheckField
        value={settings.recallPortSelections}
        onClick={toggleRecallPortSelections}
      >
        Recall port selections
      </CheckField>
    </section>
    <section>
      <h4>Columns</h4>
      {Object.keys(settings.console.columns).map(column => (
        <CheckField
          key={column}
          value={settings.console.columns[column]}
          onClick={() => toggleColumnEnabled(column)}
        >
          {capitalize(column)}
        </CheckField>
      ))}
    </section>
  </Container>
)

export default enhance(Settings)
