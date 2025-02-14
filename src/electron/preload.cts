import { ipcRenderer } from "electron";

const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electronAPI', {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    ipcRenderer.on('statistics', (_: any, data: any) => {
      callback(data)
    });
  },

  getStaticData: () => ipcRenderer.invoke('getStaticData'), // return static
})