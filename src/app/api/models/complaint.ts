import { BaseResult } from './base';
import { PaginationResultWithItems } from './pagination';

/**
 * Полная информация о жалобе
 */
export interface ComplaintItem {
  /** Идентификатор жалобы */
  id: number;

  /** Название жалобы */
  name: string;

  /** Варианты ответа / выбора для жалобы */
  variants: ComplaintVariant[];
}

/**
 * Вариант жалобы
 */
export interface ComplaintVariant {
  /** Идентификатор варианта */
  id: number;

  /** Текстовое значение варианта */
  value: string;
}

/**
 * Краткая информация о жалобе
 *
 * Используется для списков и таблиц
 */
export interface ComplaintShortItem {
  /** Идентификатор жалобы */
  id: number;

  /** Название жалобы */
  name: string;

  /** Количество доступных вариантов */
  variantsCount: number;
}

/**
 * Информация о выбранной жалобе при обращении
 */
export interface ComplaintAppealItem {
  /** Идентификатор жалобы */
  complaintId: number;

  /** Идентификатор выбранного варианта */
  complaintVariantId: number;

  /** Название жалобы */
  name: string;

  /** Значение выбранного варианта */
  value: string;
}

/**
 * Результат запроса одной жалобы
 */
export interface ComplaintResult extends BaseResult<ComplaintItem> {}

/**
 * Результат запроса списка жалоб с пагинацией
 */
export interface ComplaintsResult
  extends BaseResult<PaginationResultWithItems<ComplaintShortItem>> {}
