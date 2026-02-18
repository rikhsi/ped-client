import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Элемент фильтра или сортировки.
 */
export interface ResFilterItem {
  /** Ключ фильтра или поля для сортировки */
  key: string;

  /** Значение фильтра или сортировки (любой тип) */
  value: NzSafeAny;
}

/**
 * Параметры запроса с пагинацией, сортировкой и фильтрацией.
 */
export interface ResFilter {
  /** Индекс текущей страницы (начинается с 1) */
  pageIndex: number;

  /** Количество элементов на странице */
  pageSize: number;

  /** Список правил сортировки */
  sort: ResFilterItem[];

  /** Список правил фильтрации */
  filter: ResFilterItem[];
}
