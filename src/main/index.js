'use strict'
import config from '../renderer/connect/config' 
process.env.GOOGLE_API_KEY = config.GOOGLE_KEY

import { app, BrowserWindow } from 'electron'
import $os from '../renderer/plugins/osAndProcess'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 768,
    useContentSize: true,
    width: 1300,
    minHeight: 768,
    minWidth: 1300,
    webPreferences: {
      experimentalFeatures: true,
    },
    icon: __static + '/icons/icon.png'
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
  mainWindow.webContents.openDevTools()
}
app.on('ready', createWindow)
app.on("geolocation-request", function(event, webviewUrl) {
  1
  console.log(event)
  console.log(webviewUrl)
});
app.on('window-all-closed', () => {
  console.log('window.quit')
  $os.killAllStreamProcess()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
app.commandLine.appendSwitch('inspect', '5858')

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
