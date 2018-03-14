import createContext from './createContext'

const { Provider, Consumer, connect } = createContext({
  midiAccess: null,
  inputs: null,
  selectedInputs: [],
  outputs: null,
  view: 'ports',
  log: [],

  midiMessageHandler(e) {
    this.update({
      log: [...this.getState().log, e.data]
    })
  }
})

export { Provider, Consumer, connect }
