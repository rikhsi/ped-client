import { Injectable } from '@angular/core';
import { PaginationResponse, PrivilegesResult } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Privileges API Service
 *
 * Сервис для работы с льготами:
 * - получение списка льгот с пагинацией
 */
@Injectable({
  providedIn: 'root',
})
export class PrivilegeApiService {
  /** Базовый endpoint для льгот */
  private readonly endpoint = 'privileges';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка всех льгот с пагинацией
   *
   * @param pagination Параметры пагинации (страница, размер, сортировка)
   * @returns Observable с пагинированным списком льгот
   */
  public getAllPrivileges$(
    pagination: PaginationResponse,
  ): Observable<PrivilegesResult> {
    return this.baseApi.postQuery$(`${this.endpoint}/all`, pagination);
  }
}
