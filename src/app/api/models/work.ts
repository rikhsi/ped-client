import { BaseResult } from './base';

/**
 * Трудовой стаж пользователя.
 */
export interface WorkExperience {
  /** Стаж работы в качестве педагога (в годах) */
  pedagogueExperiences: number;

  /** Общий трудовой стаж (в годах) */
  totalWorkExperiences: number;
}

/**
 * Результат API с данными о трудовом стаже.
 */
export interface WorkExperienceResult extends BaseResult<WorkExperience> {}

/**
 * Подробная информация о трудовом стаже.
 */
export interface WorkDetail {
  /** Общий трудовой стаж (в годах) */
  totalWorkExperience: number;

  /** Стаж работы в качестве педагога (в годах) */
  pedagogueWorkExperience: number;
}

/**
 * Запись трудовой истории пользователя.
 */
export interface WorkHistory {
  /** ИНН пользователя */
  tin: string;

  /** Название организации */
  institutionName: string;

  /** Номер контракта */
  contractNumber: string;

  /** Дата начала работы (ISO 8601) */
  startDate: string;

  /** Название отдела */
  departmentName: string;

  /** Дата окончания контракта (ISO 8601) */
  contractEndDate: string;

  /** Адрес организации */
  address: string;
}
