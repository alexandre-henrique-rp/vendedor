const { ipcRenderer, contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ip: () => ipcRenderer.invoke('ip'),
  // we can also expose variables, not just functions
})