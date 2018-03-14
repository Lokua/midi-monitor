const electron = require('electron')
const path = require('path')
const url = require('url')

const { app } = electron
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  const width = 512
  const height = 780

  mainWindow = new BrowserWindow({
    width,
    minWidth: width,
    height,
    minHeight: height,
    x: 48,
    y: 16,
    title: 'Launchpad',
    titleBarStyle: 'hidden'
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.webContents.openDevTools({
    mode: 'detach'
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
