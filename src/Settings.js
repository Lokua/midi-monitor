import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash/fp'

import { connect } from './context'
import ax, { palettes } from './styles'
import CheckField from './components/CheckField'
import Select from './components/Select'

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
  'toggleRecallPortSelections',
  'updateTheme',
  'theme',
  'palette'
])

const Settings = ({
  settings,
  toggleColumnEnabled,
  toggleRecallPortSelections,
  updateTheme,
  palette
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
      <br />
      <label>Theme</label>
      <Select
        value={palette}
        onChange={e => updateTheme(e.currentTarget.value)}
        style={{ width: '212px' }}
      >
        {Array.from(palettes.keys()).map(color => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </Select>
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
