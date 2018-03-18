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
  height: 100%;
  color: ${ax.color('text')};
  background-color: ${ax.color('background')};
`

const Main = styled.main`
  display: flex;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
`

const PortsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: ${p => (p.show ? '25%' : '0% !important')};
  max-width: 250px;
  min-width: ${p => (p.show ? '200px' : 0)};
  overflow: auto;
  visibility: ${p => (p.show ? 'visible' : 'hidden')};
`

const ConsoleSection = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export class App extends Component {
  static removeSplash() {
    document.body.removeChild(document.getElementById('splash'))
  }

  componentDidMount() {
    App.removeSplash()
    this.props.initMidiAccess()
    this.updateTitleBarBackgroundColor(this.props.theme)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.theme.color.background !== nextProps.theme.color.background
    ) {
      this.updateTitleBarBackgroundColor(nextProps.theme)
    }
  }

  updateTitleBarBackgroundColor(theme) {
    document.getElementById('title-bar').style.backgroundColor =
      theme.color.background
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
          <PortsSection show={settings.portSelectorOpen}>
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
          </PortsSection>
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
