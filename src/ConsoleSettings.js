import React from 'react'
import styled from 'styled-components'

import { connect } from './context'
import CheckField from './components/CheckField'
import IconField from './components/IconField'
import Icon from './components/Icon'

const Container = styled.div`
  display: flex;

  > section {
    display: flex;
    align-items: center;
  }

  > section:first-child {
    margin-right: auto;

    .Icon:not(:last-child) {
      margin-right: 1rem;
    }
  }
`

const enhance = connect([
  'settings',
  'clearLog',
  'toggleFollow',
  'portSelectorOpen',
  'togglePortSelectorOpen',
  'toggleSettingsOpen'
])

const ConsoleSettings = ({
  settings,
  toggleFollow,
  clearLog,
  togglePortSelectorOpen,
  toggleSettingsOpen
}) => (
  <Container>
    <section>
      <Icon
        name="input"
        onClick={togglePortSelectorOpen}
        style={{
          transform: `rotate(${settings.portSelectorOpen ? 180 : 0}deg)`
        }}
      />
      <Icon name="settings" onClick={toggleSettingsOpen} />
    </section>
    <section>
      <CheckField value={settings.console.follow} onClick={toggleFollow}>
        Follow
      </CheckField>
      <div style={{ marginRight: '1rem' }} />
      <IconField name="close" onClick={clearLog}>
        Clear
      </IconField>
    </section>
  </Container>
)

export default enhance(ConsoleSettings)
