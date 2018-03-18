import React, { Component } from 'react'
import styled from 'styled-components'

import { connect } from './context'
import ax from './styles'
import Modal from './components/Modal'
import PortSelector from './PortSelector'
import Console from './Console'
import ConsoleSettings from './ConsoleSettings'
import Settings from './Settings'

const Layout = styled.div`
  display: grid;
  height: 100%;
  color: ${ax.color('text')};
`

const Main = styled.main`
  display: grid;
  grid-template-columns: ${p => (p.portSelectorOpen ? '1fr 3fr' : '100%')};
  overflow: hidden;
  padding: 1rem;

  > section:first-child {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`

const ConsoleSection = styled.section`
  display: grid;
  grid-template-rows: 32px auto;
  overflow: hidden;
`

export class App extends Component {
  static removeSplash() {
    document.body.removeChild(document.getElementById('splash'))
  }

  componentDidMount() {
    App.removeSplash()
    this.props.initMidiAccess()
  }

  updateView = (index, view) => {
    this.props.update({ view })
  }

  render() {
    const {
      inputs,
      selectedInputs,
      toggleInputSelected,
      settings,
      settingsOpen,
      toggleSettingsOpen,
      openStore
    } = this.props

    return (
      <Layout>
        <Main portSelectorOpen={settings.portSelectorOpen}>
          {settings.portSelectorOpen && (
            <section>
              <h3>Input Ports</h3>
              <PortSelector
                inputs={inputs}
                selectedInputs={selectedInputs}
                onToggle={toggleInputSelected}
              />
              {process.env.NODE_ENV === 'development' && (
                <div onClick={openStore} style={{ marginTop: 'auto' }}>
                  config.json
                </div>
              )}
            </section>
          )}
          <ConsoleSection>
            <ConsoleSettings />
            <Console />
          </ConsoleSection>
        </Main>

        <Modal open={settingsOpen} onClose={toggleSettingsOpen}>
          {settingsOpen && <Settings />}
        </Modal>
      </Layout>
    )
  }
}

export default connect()(App)
