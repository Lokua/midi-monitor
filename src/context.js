import createContext from './createContext'

const { Provider, Consumer, connect } = createContext({
  midiAccess: null,
  inputs: null,
  outputs: null,
  view: 'ports',
  foo() {
    return this.view
  }
})

export { Provider, Consumer, connect }
