import electron from 'electron';
import { ipcRenderer } from "electron";
import { stat } from 'fs';

electron.contextBridge.exposeInMainWorld('electronAPI', {
  subscribeStatistics: (callback) => {
    ipcOne('statistics', (stats) => {
      callback(stats);
    });
  },

  getStaticData: () => ipcInvoke('getStaticData'), // return static
} satisfies Window['electronAPI'])

function ipcInvoke<key extends keyof EventPayLoadMapping>(
  key: key,
): Promise<EventPayLoadMapping[key]> {
  return ipcRenderer.invoke(key);
}

function ipcOne<key extends keyof EventPayLoadMapping>(
  key: key,
  callback: (payload: EventPayLoadMapping[key]) => void
) {
  return ipcRenderer.on(key, (_, payload) => callback(payload));
}