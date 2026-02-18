/**
 * Результат пагинации с элементами.
 * Используется, когда вместе с метаданными нужно вернуть список записей.
 */
export interface PaginationResultWithItems<T> {
  /** Номер текущей страницы (начинается с 0 или 1, в зависимости от API) */
  pageIndex: number;

  /** Размер страницы (количество элементов на страницу) */
  pageSize: number;

  /** Общее количество элементов (до фильтрации) */
  total: number;

  /** Общее количество страниц */
  pageTotal: number;

  /** Количество элементов после применения фильтров */
  filteredTotal: number;

  /** Список элементов текущей страницы */
  items: T[];
}

/**
 * Результат пагинации без списка элементов.
 * Используется как метаинформация (например, в составе других DTO).
 */
export interface PaginationResult {
  pageIndex: number;
  pageSize: number;
  total: number;
  pageTotal: number;
  filteredTotal: number;
}

/**
 * Универсальная модель для сортировки и фильтрации.
 */
export interface PaginationFilter {
  /** Название поля, по которому производится фильтрация/сортировка */
  key: string;

  /** Значение фильтра или параметр сортировки */
  value: number | number[] | string;
}

/**
 * Параметры запроса для получения страницы данных.
 */
export interface PaginationResponse {
  /** Номер страницы */
  pageIndex: number;

  /** Размер страницы */
  pageSize: number;

  /** Параметры сортировки */
  sort: PaginationFilter[];

  /** Параметры фильтрации */
  filter: PaginationFilter[];
}
