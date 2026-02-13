import { BaseResult } from './base';

/**
 * Статистика по региону.
 */
export interface RegionStatistics {
  /** Название региона */
  regionName: string;

  /** Общее количество записей/сертификатов/объектов в регионе */
  totalCount: number;

  /** Уникальный идентификатор региона (опционально) */
  regionId?: number;
}

/**
 * Результат API с массивом статистики по регионам.
 */
export interface RegionStatisticsResult extends BaseResult<RegionStatistics[]> {}

/**
 * Статистика по направлению образовательного сертификата.
 */
export interface DirectionCertificateStatistics {
  /** Количество высших баллов */
  highsCount: number;

  /** Количество первых баллов */
  firstsCount: number;

  /** Количество вторых баллов */
  secondsCount: number;

  /** Количество специалистов */
  specialistsCount: number;

  /** Идентификатор направления */
  direction: number;
}

/**
 * Результат API с массивом статистики по направлениям.
 */
export interface DirectionCertificateStatisticsResult
  extends BaseResult<DirectionCertificateStatistics[]> {}
