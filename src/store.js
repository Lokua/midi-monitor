import Store from 'electron-store'
import isElectron from 'is-electron'

export default (isElectron()
  ? new Store()
  : {
      get: (_, x) => x,
      set() {},
      delete() {}
    })
