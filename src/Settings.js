import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'lodash/fp'

import { connect } from './context'
import ax, { palettes } from './styles'
import CheckField from './components/CheckField'
import Select from './components/Select'

const Container = styled.div`
  height: 100%;
  overflow: auto;
  color: ${ax.color('text')};

  section {
    margin-bottom: 2rem;
  }
`

const enhance = connect([
  'settings',
  'toggleColumnEnabled',
  'toggleRecallPortSelections',
  'updateTheme',
  'theme',
  'palette',
  'toggleFilterEnabled'
])

const Settings = ({
  settings,
  toggleColumnEnabled,
  toggleRecallPortSelections,
  updateTheme,
  palette,
  toggleFilterEnabled
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
    <div>
      <h3>Filters</h3>
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
      <section>
        <h4>Types</h4>
        {Object.keys(settings.console.filters.types).map(filter => (
          <CheckField
            key={filter}
            value={settings.console.filters.types[filter]}
            onClick={() => toggleFilterEnabled('types', filter)}
          >
            {filter}
          </CheckField>
        ))}
      </section>
      <section>
        <h4>Channels</h4>
        {settings.console.filters.channels.map((value, index) => (
          <CheckField
            key={index}
            value={value}
            onClick={() => toggleFilterEnabled('channels', index)}
          >
            {parseInt(index, 10) + 1}
          </CheckField>
        ))}
      </section>
    </div>
  </Container>
)

export default enhance(Settings)
