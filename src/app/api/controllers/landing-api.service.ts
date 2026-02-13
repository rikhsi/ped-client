import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@core/services';
import {
  BaseResult,
  Certificate,
  CertificateSerial,
  DirectionCertificateStatisticsResult,
  NewsListResult,
  PaginationResponse,
  PaginationResultWithItems,
  RegionStatisticsResult,
  SeasonsResult,
} from '../models';
import { HttpParams } from '@angular/common/http';

/**
 * Landing API Service
 *
 * Сервис для работы с данными главной страницы (Landing):
 * - статистика по заявкам
 * - статистика по активным сертификатам
 * - новости
 * - сезоны
 */
@Injectable({
  providedIn: 'root',
})
export class LandingApiService {
  /** Базовый endpoint для Landing */
  private readonly endpoint = 'landing';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение статистики по заявкам (по регионам)
   *
   * Используется для отображения агрегированных данных на главной странице
   *
   * @returns Observable со статистикой по регионам
   */
  public getStatistics$(): Observable<RegionStatisticsResult> {
    return this.baseApi.getQuery$<RegionStatisticsResult>(
      `${this.endpoint}/statistics/applications`,
    );
  }

  /**
   * Получение статистики по активным сертификатам
   *
   * Используется для аналитики по направлениям
   *
   * @returns Observable со статистикой по сертификатам
   */
  public getCertificateStatistics$(): Observable<DirectionCertificateStatisticsResult> {
    return this.baseApi.getQuery$<DirectionCertificateStatisticsResult>(
      `${this.endpoint}/statistics/active-certificates`,
    );
  }

  /**
   * Получение списка новостей с пагинацией
   *
   * @param pagination Параметры пагинации (страница, размер, сортировка)
   * @returns Observable с пагинированным списком новостей
   */
  public getAllNews$(
    pagination: PaginationResponse,
  ): Observable<NewsListResult> {
    return this.baseApi.postQuery$(`${this.endpoint}/news/all`, pagination);
  }

  /**
   * Получение списка всех сезонов для главной страницы
   *
   * @returns Observable со списком сезонов
   */
  public getAllSeasons$(): Observable<SeasonsResult> {
    return this.baseApi.getQuery$<SeasonsResult>(
      `${this.endpoint}/seasons/all`,
    );
  }

  public getAllSerials$(
    pagination: PaginationResponse,
  ): Observable<BaseResult<PaginationResultWithItems<CertificateSerial>>> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/certificates/serials`,
      pagination,
    );
  }

  public getCertificate$(
    serialId: number,
    number: string,
  ): Observable<BaseResult<Certificate>> {
    const params = new HttpParams()
      .set('serialId', serialId)
      .set('number', number);

    return this.baseApi.getQuery$(`${this.endpoint}/certificates`, {
      params,
    });
  }
}
