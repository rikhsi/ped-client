import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services/base-api.service';
import {
  ProfileResult,
  UpdateProfilePayload,
  UpdateProfileResult,
  WorkExperienceResult,
  ProfileConfig,
  ProfileConfigResult,
  WorkHistory,
  BaseResult,
  StcCertificatesResult,
  StcCertificateResult,
  NationalCertificateResult,
  NationalCertificatesResult,
  PaginationResponse,
  PaginationResultWithItems,
  ERPItem,
} from '@api/models';
import { Observable } from 'rxjs';
import { HttpContext, HttpParams } from '@angular/common/http';
import { SHOW_ERROR_NOTIFICATION } from '@constants';
import {
  EkadrCommandItem,
  EkadrContractItem,
  EkadrApplication,
  EkadrType,
} from '@api/models/ekadr';

/**
 * Profile API Service
 *
 * Сервис для работы с профилем пользователя.
 * Отвечает за получение и обновление данных профиля,
 * синхронизацию данных, а также работу с сертификатами
 * и трудовой историей.
 */
@Injectable({
  providedIn: 'root',
})
export class ProfileApiService {
  /**
   * Базовый endpoint для запросов,
   * связанных с профилем пользователя
   */
  private readonly endpoint: string = 'profile';

  /**
   * @param baseApi Базовый сервис для выполнения HTTP-запросов
   */
  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение данных текущего пользователя
   *
   * Ошибки запроса не отображаются в виде
   * глобального уведомления
   *
   * @returns Observable с данными профиля
   */
  public getProfile$(): Observable<ProfileResult> {
    return this.baseApi.getQuery$<ProfileResult>(`${this.endpoint}/me`, {
      context: new HttpContext().set(SHOW_ERROR_NOTIFICATION, false),
    });
  }

  /**
   * Обновление контактных данных профиля
   *
   * @param payload Данные для обновления профиля
   * @returns Observable с результатом обновления
   */
  public updateProfile$(
    payload: UpdateProfilePayload,
  ): Observable<UpdateProfileResult> {
    return this.baseApi.putQuery$<UpdateProfilePayload, UpdateProfileResult>(
      `${this.endpoint}/contacts`,
      payload,
    );
  }

  /**
   * Обновление конфигурации профиля пользователя
   *
   * @param config Конфигурация профиля
   * @returns Observable с обновлённой конфигурацией
   */
  public updateProfileConfig$(
    config: ProfileConfig,
  ): Observable<ProfileConfigResult> {
    return this.baseApi.putQuery$<ProfileConfig, ProfileConfigResult>(
      `${this.endpoint}/config`,
      config,
    );
  }

  /**
   * Получение информации о стаже и опыте работы
   *
   * @returns Observable с данными об опыте работы
   */
  public getWorkExperience$(): Observable<WorkExperienceResult> {
    return this.baseApi.getQuery$<WorkExperienceResult>(
      `${this.endpoint}/works/experiences-info`,
    );
  }

  /**
   * Синхронизация профиля пользователя с внешними источниками
   *
   * @returns Observable с обновлёнными данными профиля
   */
  public syncProfile$(): Observable<ProfileResult> {
    return this.baseApi.getQuery$<ProfileResult>(`${this.endpoint}/sync`);
  }

  /**
   * Получение списка национальных сертификатов пользователя
   *
   * @returns Observable со списком национальных сертификатов
   */
  public getNationalCertificates$(): Observable<NationalCertificatesResult> {
    return this.baseApi.getQuery$(`${this.endpoint}/national-certificates`);
  }

  /**
   * Получение списка STC-сертификатов пользователя
   *
   * @returns Observable со списком STC-сертификатов
   */
  public getStcCertificates$(): Observable<StcCertificatesResult> {
    return this.baseApi.getQuery$(`${this.endpoint}/stc-certificates`);
  }

  /**
   * Синхронизация национальных сертификатов
   *
   * @returns Observable с результатом операции (true / false)
   */
  public syncNationalCertificates$(): Observable<BaseResult<boolean>> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/national-certificates/sync`,
    );
  }

  /**
   * Синхронизация STC-сертификатов
   *
   * @returns Observable с результатом операции (true / false)
   */
  public syncStcCertificates$(): Observable<BaseResult<boolean>> {
    return this.baseApi.getQuery$(`${this.endpoint}/stc-certificates/sync`);
  }

  /**
   * Получение национального сертификата по предмету
   *
   * @param subjectId Идентификатор предмета
   * @param showError Флаг отображения ошибки (по умолчанию true)
   * @returns Observable с данными сертификата
   */
  public getNationalCertificatesBySubject$(
    subjectId: number,
    showError: boolean = true,
  ): Observable<NationalCertificateResult> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/national-certificates/by-subject/${subjectId}`,
      {
        context: new HttpContext().set(SHOW_ERROR_NOTIFICATION, showError),
      },
    );
  }

  /**
   * Получение STC-сертификата по предмету
   *
   * @param subjectId Идентификатор предмета
   * @param showError Флаг отображения ошибки (по умолчанию true)
   * @returns Observable с данными сертификата
   */
  public getStcCertificatesBySubject$(
    subjectId: number,
    showError: boolean = true,
  ): Observable<StcCertificateResult> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/stc-certificates/by-subject/${subjectId}`,
      {
        context: new HttpContext().set(SHOW_ERROR_NOTIFICATION, showError),
      },
    );
  }

  /**
   * Получение трудовой истории пользователя
   *
   * @returns Observable со списком записей трудовой истории
   */
  public getWorkHistory$(): Observable<BaseResult<WorkHistory[]>> {
    return this.baseApi.getQuery$<BaseResult<WorkHistory[]>>(
      `${this.endpoint}/work-history`,
    );
  }

  public getEkadrContracts$(
    pagination: PaginationResponse,
  ): Observable<BaseResult<PaginationResultWithItems<EkadrContractItem>>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/ekadr-contracts`,
      pagination,
    );
  }

  public getEkadrCommands$(
    pagination: PaginationResponse,
  ): Observable<BaseResult<PaginationResultWithItems<EkadrCommandItem>>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/ekadr-commands`,
      pagination,
    );
  }

  public getEkadrApplications$(
    pagination: PaginationResponse,
  ): Observable<BaseResult<PaginationResultWithItems<EkadrApplication>>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/ekadr-applications`,
      pagination,
    );
  }

  public getEkadrRedirectUrl$(
    id: number,
    type: EkadrType,
  ): Observable<BaseResult<string>> {
    const params = new HttpParams().set('id', id).set('type', type);
    return this.baseApi.getQuery$(`${this.endpoint}/ekadr-redirect-url`, {
      params,
    });
  }

  public syncErpData$(): Observable<BaseResult<number>> {
    return this.baseApi.getQuery$(`${this.endpoint}/erp-data/sync`);
  }

  public getErpData$(): Observable<BaseResult<ERPItem>> {
    return this.baseApi.getQuery$(`${this.endpoint}/erp-data`);
  }
}
