import React, { Component } from 'react'
import styled from 'styled-components'

import { connect } from './context'
import ax from './styles'
import PortSelector from './PortSelector'
import Console from './Console'
import ConsoleSettings from './ConsoleSettings'

const Layout = styled.div`
  display: grid;
  height: 100%;
  color: ${ax.color('text')};
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr;
  overflow: hidden;
  padding: 1rem;

  > section:first-child {
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
    const { inputs, selectedInputs, toggleInputSelected } = this.props

    return (
      <Layout>
        <Main>
          <section>
            <h3>Input Ports</h3>
            <PortSelector
              inputs={inputs}
              selectedInputs={selectedInputs}
              onToggle={toggleInputSelected}
            />
          </section>
          <ConsoleSection>
            <ConsoleSettings />
            <Console />
          </ConsoleSection>
        </Main>
      </Layout>
    )
  }
}

export default connect()(App)
