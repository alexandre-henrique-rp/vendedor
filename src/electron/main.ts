import { BrowserWindow, app } from "electron"
import path from "path"


app.on('ready', () => {
  const win = new BrowserWindow({})

  win.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})