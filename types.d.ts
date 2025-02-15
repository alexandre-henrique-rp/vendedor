type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
}

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemory: number;
}

type EventPayLoadMapping={
  statistics: Statistics,
  getStaticData: StaticData
}

declare global {
  interface Window {
    electronAPI: {
      subscribeStatistics: (callback: (statistics: Statistics) => void) => void;
      getStaticData: () => Promise<StaticData> | StaticData;
    };
  }
}
