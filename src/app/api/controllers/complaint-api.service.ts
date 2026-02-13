import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services/base-api.service';
import {
  ComplaintResult,
  ComplaintsResult,
  PaginationResponse,
} from '@api/models';
import { Observable } from 'rxjs';

/**
 * Complaint API Service
 *
 * Сервис для работы с жалобами (Complaints).
 * Содержит методы для получения списка жалоб
 * и детальной информации по конкретной жалобе.
 */
@Injectable({
  providedIn: 'root',
})
export class ComplaintApiService {
  /**
   * Базовый endpoint для запросов, связанных с жалобами
   */
  private readonly endpoint = 'complaint';

  /**
   * @param baseApi Базовый сервис для выполнения HTTP-запросов
   */
  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение детальной информации по жалобе
   *
   * @param id Идентификатор жалобы
   * @returns Observable с данными жалобы
   */
  public getComplaint$(id: number): Observable<ComplaintResult> {
    return this.baseApi.getQuery$<ComplaintResult>(`${this.endpoint}/${id}`);
  }

  /**
   * Получение списка жалоб с пагинацией
   *
   * @param pagination Параметры пагинации
   *  - номер страницы
   *  - размер страницы
   *  - сортировка / фильтры
   *
   * @returns Observable с пагинированным списком жалоб
   */
  public getComplaints$(
    pagination: PaginationResponse,
  ): Observable<ComplaintsResult> {
    return this.baseApi.postQuery$(`${this.endpoint}/all`, pagination);
  }
}
