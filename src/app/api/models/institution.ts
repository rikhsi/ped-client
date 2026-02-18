import { EduDirection } from './direction';
import { DistrictShortItem } from './district';

/**
 * Краткая информация об образовательном учреждении.
 */
export interface InstitutionShortItem {
  /** Уникальный идентификатор учреждения */
  id: number;

  /** Название учреждения */
  name: string;

  /** Направление образования учреждения */
  eduDirection: EduDirection;

  /** Район, в котором расположено учреждение */
  district: DistrictShortItem;

  /** ИНН учреждения */
  inn: string;
}
