import osUtils from "os-utils";
import os from "os";
import fs from "fs";
import { BrowserWindow } from "electron";
import { ipcWebContentsHandle } from "./util.js";

const POLLING_INTERVAL = 500;
export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageUsage = getStorageData();
    ipcWebContentsHandle("statistics", mainWindow.webContents, {
      cpuUsage,
      ramUsage,
      storageUsage: storageUsage.usage
    });
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemory = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemory
  };
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total
  };
}
