import React, { Component } from 'react'
import { connect } from './context'
import Tabs from './components/Tabs'

export class App extends Component {
  static removeSplash() {
    global.document.body.removeChild(global.document.getElementById('splash'))
  }

  componentDidMount() {
    console.info(this)
    App.removeSplash()
    this.initMidiAccess()
  }

  async initMidiAccess() {
    await this.props.update({
      midiAccess: await global.navigator.requestMIDIAccess()
    })

    this.props.midiAccess.addEventListener(
      'statechange',
      this.onMidiAccessStateChange
    )

    this.updateMidiPorts()
  }

  updateMidiPorts() {
    const { update, midiAccess } = this.props

    update({
      inputs: Array.from(midiAccess.inputs.values()),
      outputs: Array.from(midiAccess.outputs.values())
    })
  }

  onMidiAccessStateChange = () => {
    this.updateMidiPorts()
  }

  render() {
    const { inputs, outputs, view } = this.props
    const views = ['ports', 'console']

    return (
      <div>
        <Tabs
          tabs={views}
          activeIndex={views.indexOf(view)}
          onClickTab={(index, view) => {
            this.props.update({ view })
          }}
        />
        {view === 'ports' && (
          <div>
            <h2>Inputs</h2>
            {inputs ? (
              <ul>
                {inputs.map(input => <li key={input.id}>{input.name}</li>)}
              </ul>
            ) : (
              'Loading...'
            )}

            <h2>Outputs</h2>
            {outputs ? (
              <ul>
                {outputs.map(output => <li key={output.id}>{output.name}</li>)}
              </ul>
            ) : (
              'Loading...'
            )}
          </div>
        )}

        {view === 'console' && <h1>Not Implemented</h1>}
      </div>
    )
  }
}

export default connect()(App)
