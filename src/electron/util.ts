import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUiPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function IsDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<key extends keyof EventPayLoadMapping>(
  key: key,
  handler: () => EventPayLoadMapping[key]
) {
  ipcMain.handle(key, (event) => {
    if (event.senderFrame) {
      validateEventFrame(event.senderFrame);
    } else {
      throw new Error("Invalid event: senderFrame is null");
    }
    return handler();
  });
}


export function ipcWebContentsHandle<key extends keyof EventPayLoadMapping>(
  key: key,
  webContents: WebContents,
  handler: EventPayLoadMapping[key]
) {
  webContents.send(key, handler);
}


export function validateEventFrame(frame: WebFrameMain) {
  console.log(frame.url);
  try {
    const frameUrl = new URL(frame.url);
    if (IsDev() && frameUrl.host === "localhost:3000") {
      return;
    }
    if (frameUrl.toString() !== pathToFileURL(getUiPath()).toString()) {
      throw new Error("Malicious event");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Invalid frame URL");
  }
}


