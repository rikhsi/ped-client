import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services/base-api.service';
import {
  BaseResult,
  PaginationResultWithItems,
  PaginationResponse,
} from '@api/models';
import {
  AppealShortItem,
  AppealCreatePayload,
  AppealEditPayload,
  AppealItem,
} from '@api/models/appeal';
import { Observable } from 'rxjs';

/**
 * Appeals API Service
 *
 * Сервис для работы с обращениями (Appeals).
 * Инкапсулирует все HTTP-запросы к backend API,
 * связанные с созданием, редактированием,
 * получением и отменой обращений.
 */
@Injectable({
  providedIn: 'root',
})
export class AppealsApiService {
  /**
   * Базовый endpoint для всех запросов,
   * связанных с обращениями
   */
  private readonly endpoint = 'appeals';

  /**
   * @param baseApi Базовый сервис для выполнения HTTP-запросов
   */
  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение файла анкеты (опроса), прикреплённого к обращению
   *
   * @param appealId Идентификатор обращения
   * @returns Observable с Blob (файл для скачивания)
   */
  public getAppealSurveyFile$(appealId: number): Observable<Blob> {
    return this.baseApi.getBlobQuery$(
      `${this.endpoint}/${appealId}/survey-file`,
    );
  }

  /**
   * Получение детальной информации по одному обращению
   *
   * @param appealId Идентификатор обращения
   * @returns Observable с данными обращения
   */
  public getAppeal$(appealId: number): Observable<BaseResult<AppealItem>> {
    return this.baseApi.getQuery$(`${this.endpoint}/${appealId}`);
  }

  /**
   * Получение списка обращений с пагинацией
   *
   * @param pagination Параметры пагинации:
   *  - номер страницы
   *  - размер страницы
   *  - сортировка и фильтры
   *
   * @returns Observable с пагинированным списком обращений
   */
  public getAppeals$(
    pagination: PaginationResponse,
  ): Observable<BaseResult<PaginationResultWithItems<AppealShortItem>>> {
    return this.baseApi.postQuery$(`${this.endpoint}/all`, pagination);
  }

  /**
   * Создание нового обращения
   *
   * @param payload Данные для создания обращения
   * @returns Observable с результатом операции (true / false)
   */
  public createAppeal$(
    payload: AppealCreatePayload,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.postQuery$(`${this.endpoint}`, payload);
  }

  /**
   * Редактирование существующего обращения
   *
   * @param appealId Идентификатор обращения
   * @param payload Частичный набор данных для обновления
   * @returns Observable с результатом операции (true / false)
   */
  public editAppeal$(
    appealId: number,
    payload: Partial<AppealEditPayload>,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.putQuery$(`${this.endpoint}/${appealId}`, payload);
  }

  /**
   * Отмена обращения
   *
   * @param appealId Идентификатор обращения
   * @returns Observable с результатом операции (true / false)
   */
  public cancelAppeal$(appealId: number): Observable<BaseResult<boolean>> {
    return this.baseApi.putQuery$(`${this.endpoint}/cancel/${appealId}`, null);
  }
}
