import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApplicationFileType,
  ApplicationItem,
  ApplicationPayload,
  ApplicationPaymentRedirectResponse,
  ApplicationPaymentRedirectResult,
  ApplicationsResult,
  ApplicationTOYItem,
  ApplicationType,
  BaseResult,
  PaginationResponse,
} from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Applications API Service
 *
 * Сервис для работы с заявками:
 * - получение списка и деталей заявок
 * - создание, редактирование и отмена заявок
 * - загрузка и скачивание файлов
 * - проверки состояния заявок
 */
@Injectable({
  providedIn: 'root',
})
export class ApplicationsApiService {
  /** Базовый endpoint для заявок */
  private readonly endpoint = 'applications';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка всех заявок с пагинацией
   *
   * @param pagination Параметры пагинации (страница, размер, сортировка)
   * @returns Observable со списком заявок
   */
  public getAllApplication$(
    pagination: PaginationResponse,
  ): Observable<ApplicationsResult> {
    return this.baseApi.postQuery$(`${this.endpoint}/all`, pagination);
  }

  /**
   * Получение детальной информации по заявке
   *
   * @param applicationId ID заявки
   * @returns Observable с данными заявки
   */
  public getApplication$(
    applicationId: number,
  ): Observable<BaseResult<ApplicationItem>> {
    return this.baseApi.getQuery$(`${this.endpoint}/${applicationId}`);
  }

  /**
   * Скачивание survey-файла (анкеты) по заявке
   *
   * @param applicationId ID заявки
   * @returns Observable с Blob-файлом
   */
  public getApplicationSurveyFile$(applicationId: number): Observable<Blob> {
    return this.baseApi.getBlobQuery$(
      `${this.endpoint}/${applicationId}/survey-file`,
    );
  }

  /**
   * Загрузка файла для заявки
   *
   * @param fileType Тип загружаемого файла
   * @param file Файл для загрузки
   * @returns Observable со строкой (обычно имя или путь файла)
   */
  public uploadFile$(
    fileType: ApplicationFileType,
    file: File,
  ): Observable<BaseResult<string>> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.baseApi.postQuery$(
      `${this.endpoint}/upload-file?fileType=${fileType}`,
      formData,
    );
  }

  /**
   * Создание новой заявки
   *
   * @param applicationType Тип заявки
   * @param payload Данные заявки
   * @returns Observable с результатом операции
   */
  public createApplication$(
    applicationType: number,
    payload: Partial<ApplicationPayload>,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}?applicationType=${applicationType}`,
      payload,
    );
  }

  /**
   * Отмена заявки
   *
   * @param applicationId ID заявки
   * @returns Observable с результатом операции
   */
  public cancelApplication$(
    applicationId: number,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.deleteQuery$(
      `${this.endpoint}/${applicationId}/cancel`,
    );
  }

  /**
   * Редактирование существующей заявки
   *
   * @param applicationId ID заявки
   * @param payload Обновлённые данные заявки
   * @returns Observable с результатом операции
   */
  public editApplication$(
    applicationId: number,
    payload: Partial<ApplicationPayload>,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.putQuery$(`${this.endpoint}/${applicationId}`, payload);
  }

  /**
   * Проверка наличия активной заявки
   *
   * @param applicationType Тип заявки
   * @param subjectId ID субъекта
   * @returns Observable с результатом проверки
   */
  public checkActiveApplication$(
    applicationType: ApplicationType,
    subjectId: number,
  ): Observable<BaseResult<boolean>> {
    const params = new HttpParams()
      .set('applicationType', applicationType)
      .set('subjectId', subjectId);

    return this.baseApi.getQuery$(`${this.endpoint}/check-active`, { params });
  }

  /**
   * Проверка существования заявки по PINPP и направлению образования
   *
   * @param pinpp PINPP субъекта
   * @param eduDirection Направление образования
   * @returns Observable с результатом проверки
   */
  public checkPositionApplication$(
    pinpp: string,
    eduDirection: number,
  ): Observable<BaseResult<boolean>> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/position/check-exist/${pinpp}/${eduDirection}`,
    );
  }

  public getTeacherOfYearApplications$(): Observable<
    BaseResult<ApplicationTOYItem[]>
  > {
    return this.baseApi.getQuery$(`${this.endpoint}/teacher-of-year`);
  }

  public getApplicationPaymentUrl$(
    payload: ApplicationPaymentRedirectResponse,
  ): Observable<BaseResult<ApplicationPaymentRedirectResult>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/payment/card-pay-invoice`,
      payload,
    );
  }

  public reUseApplicationInvoice$(applicationId: number, invoiceId: string): Observable<BaseResult<number>> {
    return this.baseApi.postQuery$(`${this.endpoint}/${applicationId}/payments/invoice/${invoiceId}/re-use`, null)
  }
}
