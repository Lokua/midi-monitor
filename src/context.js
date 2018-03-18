import { prop, without, set } from 'lodash/fp'
import createContext from './createContext'
import store from './store'

const init = ({ getState, update }) => ({
  midiAccess: null,
  inputs: null,
  selectedInputs: [],
  outputs: null,
  views: ['console', 'ports'],
  view: 'console',
  log: [],
  settingsOpen: false,

  settings: store.get('settings', {
    recallPortSelections: true,
    portSelectorOpen: true,
    console: {
      follow: true,
      columns: {
        timestamp: true,
        port: true,
        status: true,
        data1: true,
        data2: true
      }
    }
  }),

  async initMidiAccess() {
    const midiAccess = await global.navigator.requestMIDIAccess()
    midiAccess.addEventListener('statechange', this.updateMidiPorts)

    await update({ midiAccess })

    await this.updateMidiPorts()

    const selectedPortIds = store.get('selectedPortIds', [])
    getState()
      .inputs.filter(input => selectedPortIds.includes(input.id))
      .forEach(this.toggleInputSelected)
  },

  updateMidiPorts() {
    const { midiAccess } = getState()
    const inputs = Array.from(midiAccess.inputs.values())
    const outputs = Array.from(midiAccess.outputs.values())

    return update({
      inputs,
      outputs
    })
  },

  midiMessageHandler(e) {
    const { log } = getState()
    const [status, data1, data2] = e.data

    return update({
      log: [
        ...log,
        {
          timestamp: Date.now(),
          port: e.currentTarget.name,
          status,
          data1,
          data2
        }
      ]
    })
  },

  toggleInputSelected(input) {
    const { selectedInputs, settings } = getState()
    const had = selectedInputs.includes(input)

    if (had) {
      input.removeEventListener('midimessage', this.midiMessageHandler)
    } else {
      input.addEventListener('midimessage', this.midiMessageHandler)
    }

    return update({
      selectedInputs: had
        ? without([input], selectedInputs)
        : selectedInputs.concat(input)
    }).then(() => {
      if (settings.recallPortSelections) {
        this.updateStoreSelectedPortIds()
      }
    })
  },

  clearLog() {
    return update({
      log: []
    })
  },

  toggleFollow() {
    const { settings } = getState()

    return update({
      settings: set('console.follow', !settings.console.follow, settings)
    })
  },

  togglePortSelectorOpen() {
    const { settings } = getState()

    return update({
      settings: set('portSelectorOpen', !settings.portSelectorOpen, settings)
    }).then(this.updateStoreSettings)
  },

  toggleSettingsOpen() {
    const { settingsOpen } = getState()

    return update({
      settingsOpen: !settingsOpen
    })
  },

  toggleColumnEnabled(column) {
    const { settings } = getState()

    return update({
      settings: set(
        `console.columns.${column}`,
        !settings.console.columns[column],
        settings
      )
    }).then(this.updateStoreSettings)
  },

  toggleRecallPortSelections() {
    const { settings } = getState()

    return update({
      settings: set(
        'recallPortSelections',
        !settings.recallPortSelections,
        settings
      )
    }).then(this.updateStoreSettings)
  },

  updateStoreSettings() {
    store.set('settings', getState().settings)
  },

  updateStoreSelectedPortIds() {
    store.set('selectedPortIds', getState().selectedInputs.map(prop('id')))
  },

  openStore() {
    store.openInEditor()
  }
})

const { Provider, Consumer, connect } = createContext(init)
export { Provider, Consumer, connect }
