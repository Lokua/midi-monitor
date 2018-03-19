import { prop, merge, without, set } from 'lodash/fp'
import midiUtil from '@lokua/midi-util'

import createContext from './framework/createContext'
import { createTheme } from './styles'
import store from './store'

export const init = ({ getState, update }) => {
  const defaultSettings = {
    recallPortSelections: true,
    portSelectorOpen: true,
    console: {
      follow: true,
      columns: {
        timestamp: true,
        port: true,
        channel: true,
        type: true,
        status: true,
        data1: true,
        data2: true
      }
    }
  }

  const palette = store.get('palette', 'default')
  const theme = createTheme(palette)

  return {
    midiAccess: null,
    inputs: null,
    selectedInputs: [],
    outputs: null,
    view: 'console',
    log: [],
    settingsOpen: false,
    settings: merge(defaultSettings, store.get('settings', {})),
    theme,

    async initMidiAccess() {
      const midiAccess = await global.navigator.requestMIDIAccess()
      midiAccess.addEventListener('statechange', this.updateMidiPorts)
      await update({ midiAccess })
      await this.updateMidiPorts()
      this.initPortsFromStore()
    },

    initPortsFromStore() {
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
      this.appendLogMessage(e.currentTarget.name, e.data)
    },

    appendLogMessage(port, [status, data1, data2]) {
      const { log } = getState()
      const channel = midiUtil.getChannel(status)
      const type = midiUtil.getType(status)

      return update({
        log: [
          ...log,
          {
            timestamp: Date.now(),
            port,
            channel,
            type,
            status,
            data1,
            data2
          }
        ]
      })
    },

    async toggleInputSelected(input) {
      const { selectedInputs, settings } = getState()

      const had = selectedInputs.includes(input)
      const method = had ? 'removeEventListener' : 'addEventListener'
      input[method]('midimessage', this.midiMessageHandler)

      await update({
        selectedInputs: had
          ? without([input], selectedInputs)
          : selectedInputs.concat(input)
      })

      if (settings.recallPortSelections) {
        this.updateStoreSelectedPortIds()
      }
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

    updateTheme(palette) {
      const nextTheme = createTheme(palette)

      update({
        theme: nextTheme,
        palette
      }).then(() => this.updateStorePalette(palette))
    },

    updateStoreSettings() {
      store.set('settings', getState().settings)
    },

    updateStoreSelectedPortIds() {
      store.set('selectedPortIds', getState().selectedInputs.map(prop('id')))
    },

    updateStorePalette(palette) {
      store.set('palette', palette)
    },

    openStore() {
      store.openInEditor()
    }
  }
}

const { Provider, Consumer, connect } = createContext(init)
export { Provider, Consumer, connect }
