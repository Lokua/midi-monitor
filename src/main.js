const electron = require('electron')
const path = require('path')
const url = require('url')

const { app } = electron
const BrowserWindow = electron.BrowserWindow
const isDev = process.env.NODE_ENV === 'development'

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 512,
    minHeight: 512,
    title: 'Launchpad',
    titleBarStyle: 'hidden',
    show: false,
    icon: path.join(__dirname, 'resources/png/64x64.png')
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.resolve(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  isDev &&
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
