import React from 'react'
import styled from 'styled-components'

import { connect } from './context'
import CheckField from './components/CheckField'
import IconField from './components/IconField'
import Icon from './components/Icon'

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .settings {
    margin-right: auto;
  }
`

const enhance = connect(['consoleSettings', 'clearLog', 'toggleFollow'])

const ConsoleSettings = ({ consoleSettings, toggleFollow, clearLog }) => (
  <Container>
    {/* <Icon name="settings" className="settings" /> */}
    <CheckField value={consoleSettings.follow} onClick={toggleFollow}>
      Follow
    </CheckField>
    <div style={{ marginRight: '1rem' }} />
    <IconField name="close" onClick={clearLog}>
      Clear
    </IconField>
  </Container>
)

export default enhance(ConsoleSettings)
