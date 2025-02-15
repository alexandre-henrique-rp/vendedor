import { BrowserWindow, app, ipcMain } from "electron";
import { IsDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManeger.js";
import { getPreloadPath, getUiPath } from "./pathResolver.js";

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });

  if (IsDev()) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(getUiPath());
  }
  pollResources(win);

  ipcMain.handle("ping", () => {
    return getStaticData();
  });

  handleGetStaticData(() => getStaticData())
});

function handleGetStaticData(callback: () => StaticData) {
  ipcMain.handle("getStaticData", callback);
}