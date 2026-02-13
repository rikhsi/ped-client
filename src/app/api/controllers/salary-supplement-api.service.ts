import { Injectable } from '@angular/core';
import { SalarySupplementsResult } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Salary Supplement API Service
 *
 * Сервис для работы с надбавками к заработной плате.
 * Отвечает за получение списка надбавок и
 * загрузку файлов, связанных с ними.
 */
@Injectable({
  providedIn: 'root',
})
export class SalarySupplementApiService {
  /**
   * Базовый endpoint для запросов,
   * связанных с надбавками к зарплате
   */
  private readonly endpoint: string = 'salarysupplement';

  /**
   * @param baseApi Базовый сервис для выполнения HTTP-запросов
   */
  constructor(private baseApi: BaseApiService) {}

  /**
   * Получение списка надбавок к заработной плате
   *
   * @returns Observable с данными по надбавкам
   */
  public getSalarySupplement$(): Observable<SalarySupplementsResult> {
    return this.baseApi.getQuery$(this.endpoint);
  }

  /**
   * Загрузка файла, связанного с конкретной надбавкой
   *
   * @param id Идентификатор надбавки
   * @returns Observable с Blob (файл для скачивания)
   */
  public getSalarySupplementFile$(id: number): Observable<Blob> {
    return this.baseApi.getBlobQuery$(`${this.endpoint}/file/${id}`);
  }
}
