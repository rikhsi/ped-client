import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseResult,
  EduDirection,
  Season,
  SubjectShortItem,
  DistrictShortItem,
  InstitutionShortItem,
  RegionShortItem,
} from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Season API Service
 *
 * Сервис для работы с сезонами:
 * - получение активных сезонов
 * - получение информации о сезоне
 * - получение регионов, районов и учреждений сезона
 * - получение направлений обучения и предметов
 */
@Injectable({
  providedIn: 'root',
})
export class SeasonApiService {
  /** Базовый endpoint для сезонов */
  private readonly endpoint: string = 'seasons';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка активных сезонов
   *
   * @returns Observable со списком сезонов
   */
  public getActiveSeasons$(): Observable<Season[]> {
    return this.baseApi.getQuery$(`${this.endpoint}/all`);
  }

  /**
   * Получение информации о конкретном сезоне
   *
   * @param seasonId ID сезона
   * @returns Observable с данными сезона
   */
  public getSeason$(seasonId: number): Observable<Season> {
    return this.baseApi.getQuery$<Season>(`${this.endpoint}/${seasonId}`);
  }

  /**
   * Получение списка регионов, доступных в рамках сезона
   *
   * @param seasonId ID сезона
   * @returns Observable со списком регионов
   */
  public getSeasonRegions$(
    seasonId: number,
  ): Observable<BaseResult<RegionShortItem[]>> {
    return this.baseApi.getQuery$(`${this.endpoint}/${seasonId}/regions`);
  }

  /**
   * Получение списка районов региона в рамках сезона
   *
   * @param seasonId ID сезона
   * @param regionId ID региона
   * @returns Observable со списком районов
   */
  public getSeasonDistricts$(
    seasonId: number,
    regionId: number,
  ): Observable<BaseResult<DistrictShortItem[]>> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/${seasonId}/regions/${regionId}/districts`,
    );
  }

  /**
   * Получение списка учреждений района в рамках сезона
   *
   * @param seasonId ID сезона
   * @param districtId ID района
   * @param eduDirection (опционально) Направление обучения
   * @returns Observable со списком учреждений
   */
  public getSeasonInstitutions$(
    seasonId: number,
    districtId: number,
    eduDirection?: number,
  ): Observable<BaseResult<InstitutionShortItem[]>> {
    const params = new HttpParams().append('eduDirection', eduDirection);

    return this.baseApi.getQuery$(
      `${this.endpoint}/${seasonId}/districts/${districtId}/institutions`,
      { params },
    );
  }

  /**
   * Получение списка направлений обучения в рамках сезона
   *
   * @param seasonId ID сезона
   * @returns Observable со списком направлений обучения
   */
  public getSeasonEduDirections$(
    seasonId: number,
  ): Observable<BaseResult<EduDirection[]>> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/${seasonId}/edu-directions`,
    );
  }

  /**
   * Получение списка предметов в рамках сезона и направления обучения
   *
   * @param seasonId ID сезона
   * @param eduDirection Направление обучения
   * @returns Observable со списком предметов
   */
  public getSeasonSubjects$(
    seasonId: number,
    eduDirection: number,
  ): Observable<BaseResult<SubjectShortItem[]>> {
    const params = new HttpParams().append('edu-direction', eduDirection);

    return this.baseApi.getQuery$(`${this.endpoint}/${seasonId}/subjects`, {
      params,
    });
  }
}
