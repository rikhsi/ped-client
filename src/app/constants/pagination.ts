import { PaginationResponse } from '@app/api/models';

/**
 * Утилита для построения объекта пагинации
 *
 * @param pageIndex - номер страницы (по умолчанию 0)
 * @param pageSize - количество элементов на странице (по умолчанию 20)
 * @returns объект PaginationResponse со значениями по умолчанию
 */
export function buildPagination(
  pageIndex: number = 0,
  pageSize: number = 20,
): PaginationResponse {
  return {
    pageIndex,
    pageSize,
    sort: [], // массив сортировок (по умолчанию пустой)
    filter: [], // массив фильтров (по умолчанию пустой)
  };
}
