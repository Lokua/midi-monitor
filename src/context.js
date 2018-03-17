import { without } from 'lodash/fp'
import createContext from './createContext'

const init = ({ getState, update }) => ({
  midiAccess: null,
  inputs: null,
  selectedInputs: [],
  outputs: null,
  views: ['console', 'ports'],
  view: 'console',
  log: [],
  consoleSettings: {
    follow: true
  },

  async initMidiAccess() {
    const midiAccess = await global.navigator.requestMIDIAccess()

    midiAccess.addEventListener('statechange', this.updateMidiPorts)

    await update({ midiAccess })
    this.updateMidiPorts()
  },

  updateMidiPorts() {
    const { midiAccess } = getState()

    update({
      inputs: Array.from(midiAccess.inputs.values()),
      outputs: Array.from(midiAccess.outputs.values())
    })
  },

  midiMessageHandler(e) {
    const { log } = getState()

    update({
      log: [
        ...log,
        { input: e.currentTarget.name, data: e.data, timestamp: Date.now() }
      ]
    })
  },

  toggleInputSelected(input) {
    const { selectedInputs } = getState()
    const had = selectedInputs.includes(input)

    update({
      selectedInputs: had
        ? without([input], selectedInputs)
        : selectedInputs.concat(input)
    })

    had
      ? input.removeEventListener('midimessage', this.midiMessageHandler)
      : input.addEventListener('midimessage', this.midiMessageHandler)
  },

  clearLog() {
    update({
      log: []
    })
  },

  toggleFollow() {
    const { consoleSettings } = getState()

    update({
      consoleSettings: {
        ...consoleSettings,
        follow: !consoleSettings.follow
      }
    })
  }
})

const { Provider, Consumer, connect } = createContext(init)
export { Provider, Consumer, connect }
