import { BaseResult } from './base';

/**
 * Информация о надбавке к зарплате.
 */
export interface SalarySupplement {
  /** Уникальный идентификатор надбавки */
  id: number;

  /** Дата назначения надбавки (ISO 8601) */
  givenDate: string;

  /** Дата окончания действия надбавки (ISO 8601) */
  validDate: string;

  /** Название субъекта (например, отдела или категории работников) */
  subjectName: string;

  /** Категория надбавки (числовой код) */
  category: number;

  /** Название сезона или периода, к которому относится надбавка */
  seasonName: string;
}

/**
 * Результат API с массивом надбавок к зарплате.
 */
export interface SalarySupplementsResult
  extends BaseResult<SalarySupplement[]> {}
