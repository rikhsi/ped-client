import { BaseResult } from './base';
import { PaginationResult } from './pagination';

/**
 * Время работы места.
 */
export interface WorkTime {
  /** Время начала работы (например, "09:00") */
  from: string;

  /** Время окончания работы (например, "18:00") */
  to: string;

  /** День недели (0 = воскресенье, 1 = понедельник, ..., 6 = суббота) */
  dayOfWeek: number;
}

/**
 * Регион (область, территория и т.д.).
 */
export interface Region {
  /** Уникальный идентификатор региона */
  id: number;

  /** Название региона */
  name: string;
}

/**
 * Район в регионе.
 */
export interface District {
  /** Уникальный идентификатор района */
  id: number;

  /** Название района */
  name: string;

  /** Регион, к которому относится район */
  region: Region;
}

/**
 * Информация о месте.
 */
export interface Place {
  /** Уникальный идентификатор места */
  id: number;

  /** Название места */
  name: string;

  /** Описание места */
  description: string;

  /** Адрес места */
  address: string;

  /** Район, в котором расположено место */
  district: District;

  /** Широта места */
  lat: number;

  /** Долгота места */
  lng: number;

  /** Расписание работы места */
  workTime: WorkTime[];

  /** Контактный телефон */
  phoneNumber: string;
}

/**
 * Результат пагинации для списка мест.
 */
export interface PlacePagination extends PaginationResult {
  /** Список мест на текущей странице */
  items: Place[];
}

/**
 * Результат API с пагинированным списком мест.
 */
export interface PlaceListResult extends BaseResult<PlacePagination> {}

/**
 * Параметры запроса списка мест.
 */
export interface PlaceListPayload {
  /** Индекс страницы (начинается с 1) */
  pageIndex: number;

  /** Количество элементов на странице */
  pageSize: number;
}
