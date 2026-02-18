import { Injectable } from '@angular/core';
import { PaginationResponse, PlaceListResult } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Exam Locations API Service
 *
 * Сервис для работы с локациями экзаменов:
 * - получение списка доступных мест проведения экзаменов
 */
@Injectable({
  providedIn: 'root',
})
export class ExamLocationsApiService {
  /** Базовый endpoint для локаций экзаменов */
  private readonly endpoint = 'examlocations';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка мест проведения экзаменов с пагинацией
   *
   * @param payload Параметры пагинации (страница, размер, сортировка)
   * @returns Observable с пагинированным списком локаций
   */
  public getPlaces$(
    payload: PaginationResponse,
  ): Observable<PlaceListResult> {
    return this.baseApi.postQuery$(`${this.endpoint}/all`, payload);
  }
}
