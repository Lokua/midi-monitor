import { init } from '../context'

describe('context', () => {
  let getState
  let update
  let state
  let midiAccess

  beforeEach(() => {
    midiAccess = {
      addEventListener: jest.fn(),
      inputs: new Map(),
      outputs: new Map()
    }

    global.navigator = {
      requestMIDIAccess: jest.fn(() => Promise.resolve(midiAccess))
    }

    getState = jest.fn()
    update = jest.fn()

    state = init({ getState, update })

    update.mockImplementation(update => {
      Object.assign(state, update)
    })

    getState.mockImplementation(() => state)
  })

  it('state should be an object', () => {
    expect(typeof state).toEqual('object')
  })

  describe('initMidiAccess', () => {
    it('should add statechange listener', async () => {
      jest.spyOn(state, 'updateMidiPorts')
      jest.spyOn(state, 'initPortsFromStore')
      await state.initMidiAccess()
      expect(global.navigator.requestMIDIAccess).toHaveBeenCalled()
      expect(update).toHaveBeenCalledWith({ midiAccess })
      expect(state.updateMidiPorts).toHaveBeenCalled()
      expect(state.initPortsFromStore).toHaveBeenCalled()
    })
  })
})
