import React, { Component } from 'react'
import { without } from 'lodash/fp'

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

  toggleInputSelected(input) {
    const { selectedInputs, update, midiMessageHandler } = this.props
    const had = selectedInputs.includes(input)

    update({
      selectedInputs: had
        ? without([input], selectedInputs)
        : selectedInputs.concat(input)
    })

    if (!had) {
      input.addEventListener('midimessage', midiMessageHandler)
    } else {
      input.removeEventListener('midimessage', midiMessageHandler)
    }
  }

  render() {
    const { inputs, selectedInputs, view, log } = this.props
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
            {inputs ? (
              <ul>
                {inputs.map(input => (
                  <li
                    key={input.id}
                    onClick={() => this.toggleInputSelected(input)}
                  >
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedInputs.includes(input)}
                        readOnly
                      />
                      {input.name}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              'Loading...'
            )}
          </div>
        )}

        {view === 'console' && (
          <div>
            {log.map((message, index) => (
              <pre key={index}>{message.toString()}</pre>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default connect()(App)
