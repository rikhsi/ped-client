import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services/base-api.service';
import { BaseResult, Certificate, CertificatesResult } from '@api/models';
import { Observable } from 'rxjs';
import { HttpContext } from '@angular/common/http';
import { SHOW_ERROR_NOTIFICATION } from '@constants';

/**
 * Certificates API Service
 *
 * Сервис для работы с сертификатами:
 * - получение списка сертификатов
 * - получение сертификата по субъекту
 * - скачивание сертификатов
 */
@Injectable({
  providedIn: 'root',
})
export class CertificatesApiService {
  /** Базовый endpoint для сертификатов */
  private readonly endpoint = 'certificates';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка всех сертификатов текущего пользователя
   *
   * @returns Observable со списком сертификатов
   */
  public getCertificates$(): Observable<CertificatesResult> {
    return this.baseApi.getQuery$<CertificatesResult>(`${this.endpoint}`);
  }

  /**
   * Получение сертификата по субъекту
   *
   * @param subjectId ID субъекта
   * @param showError Флаг отображения уведомления об ошибке (по умолчанию true)
   * @returns Observable с данными сертификата
   */
  public getCertificateBySubject$(
    subjectId: number,
    showError: boolean = true,
  ): Observable<BaseResult<Certificate>> {
    return this.baseApi.getQuery$(`${this.endpoint}/by-subject/${subjectId}`, {
      context: new HttpContext().set(SHOW_ERROR_NOTIFICATION, showError),
    });
  }

  /**
   * Скачивание сертификата
   *
   * @param id ID сертификата
   * @returns Observable с Blob-файлом сертификата
   */
  public downloadCertificate$(id: number): Observable<Blob> {
    return this.baseApi.getBlobQuery$(`${this.endpoint}/download/${id}`);
  }
}
