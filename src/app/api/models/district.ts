import { RegionShortItem } from './region';

/**
 * Краткая информация о районе (административной единице).
 */
export interface DistrictShortItem {
  /** Уникальный идентификатор района */
  id: number;

  /** Название района */
  name: string;

  /** Информация о регионе, к которому относится район */
  region: RegionShortItem;
}
