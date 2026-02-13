import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services/base-api.service';
import { BaseResult, DiplomasResult } from '@api/models';
import { Observable } from 'rxjs';

/**
 * Diplomas API Service
 *
 * Сервис для работы с дипломами:
 * - получение списка дипломов
 * - синхронизация дипломов
 */
@Injectable({
  providedIn: 'root',
})
export class DiplomasApiService {
  /** Базовый endpoint для дипломов */
  private readonly endpoint = 'diplomas';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка дипломов текущего пользователя
   *
   * @returns Observable со списком дипломов
   */
  public getDiplomas$(): Observable<DiplomasResult> {
    return this.baseApi.getQuery$<DiplomasResult>(`${this.endpoint}`);
  }

  /**
   * Принудительная синхронизация дипломов
   *
   * Используется для обновления данных дипломов с внешними источниками
   *
   * @returns Observable с результатом операции
   */
  public refreshDiplomas$(): Observable<BaseResult<boolean>> {
    return this.baseApi.putQuery$(`${this.endpoint}/sync`, {});
  }
}
