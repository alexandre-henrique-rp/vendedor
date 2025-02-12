const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const requestIp = require('./src/scripts/requestIp')
const runMigrations = require('./src/db/migration')



const createWindow = () => {
  if (!app.isReady()) {
    throw new Error('Tried to create window before app was ready')
  }

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'api', 'preload.js')
    }
  })

  win.loadFile('src/app/index.html')

  if (!win.webContents) {
    throw new Error('Failed to load window')
  }
}

app.whenReady().then(() => {
  createWindow()
  runMigrations()

  //api ---------------------

  ipcMain.handle('ip', async() =>  await requestIp())

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})