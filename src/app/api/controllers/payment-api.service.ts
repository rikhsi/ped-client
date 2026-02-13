import { Injectable } from '@angular/core';
import { BaseResult, PaymentInfo } from '@api/models';
import { BaseApiService } from '@core/services';
import { Observable } from 'rxjs';

/**
 * Payment API Service
 *
 * Сервис для работы с платежами:
 * - получение (скачивание) файлов чеков по счетам
 */
@Injectable({
  providedIn: 'root',
})
export class PaymentApiService {
  /** Базовый endpoint для платежей */
  private readonly endpoint = 'payments';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Скачивание файла чека по счету
   *
   * @param invoiceId Идентификатор счета (invoice)
   * @returns Observable с Blob-файлом чека
   */
  public getCheckFile$(invoiceId: string): Observable<Blob> {
    return this.baseApi.getBlobQuery$(
      `${this.endpoint}/invoices/${invoiceId}/file`,
    );
  }
  
  /**
   * Получение списка свободных счетов для сезона
   * @param seasonId Идентификатор сезона (учебного, рабочего периода)
   * @returns Observable с результатом запроса, содержащим массив информации о платежах
   */
  public getFreeInvoices$(seasonId: number): Observable<PaymentInfo[]> {
    return this.baseApi.getQuery$(
      `${this.endpoint}/invoices/${seasonId}/free`,
    );
  }
  
}
