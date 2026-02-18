import { Injectable } from '@angular/core';
import { TranslationsResult } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Translations API Service
 *
 * Сервис для работы с переводами:
 * - получение словарей переводов для приложения
 */
@Injectable({
  providedIn: 'root',
})
export class TranslationsApiService {
  /** Базовый endpoint для переводов */
  private readonly endpoint = 'translations';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение всех переводов приложения
   *
   * Используется для инициализации i18n (например, Transloco)
   *
   * @returns Observable с объектом переводов
   */
  public getTranslations$(): Observable<TranslationsResult> {
    return this.baseApi.getQuery$(this.endpoint);
  }
}
