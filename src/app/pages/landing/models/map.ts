export interface RegionData {
  name: string;
  cx: number;
  cy: number;
  applications?: number;
}

export interface RegionDataMap {
  [key: string]: RegionData;
}
