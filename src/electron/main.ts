import { BrowserWindow, app } from "electron";
import path from "path";
import { IsDev } from "./util.js";
import { pollResources } from "./resourceManeger.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    }
  });

  if (IsDev()) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  pollResources(win);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
