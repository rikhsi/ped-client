import { ApplicationType } from './application';
import { AttestationType } from './attestation';
import { BaseResult } from './base';

/**
 * Сезон с подробной информацией.
 */
export interface Season {
  /** Уникальный идентификатор сезона */
  id: number;

  /** Название сезона */
  name: string;

  /** Описание сезона */
  description: string;

  /** Тип заявления, связанного с сезоном */
  applicationType: ApplicationType;

  /** Список типов аттестаций, связанных с сезоном */
  attestationTypes: AttestationType[];

  /** Активен ли сезон */
  active: boolean;

  /** Показать опцию надбавки из фонда министра */
  showMinisterFundAllowanceOption: boolean;

  /** Показать опцию "Учитель года" */
  showTeacherOfTheYearOption: boolean;

  /** Дата окончания сезона (ISO 8601) */
  endDate: string;

  /** Дата начала сезона (ISO 8601) */
  startDate: string;

  certificateValidateDate: string;

  /** URL изображения сезона (опционально) */
  image?: string;
}

/**
 * Краткая информация о сезоне.
 */
export interface SeasonShortItem {
  /** Уникальный идентификатор сезона */
  id: number;

  /** Название сезона */
  name: string;
}

/**
 * Результат API с массивом сезонов.
 */
export type SeasonsResult = BaseResult<Season[]>;
