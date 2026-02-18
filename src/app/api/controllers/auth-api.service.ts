import { Injectable } from '@angular/core';
import { BaseApiService } from '@core/services';
import { AuthLoginResult } from '../models';
import { Observable } from 'rxjs';

/**
 * Auth API Service
 *
 * Сервис для аутентификации пользователей:
 * - стандартный логин
 * - логин администратора по одноразовой сессии
 */
@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  /** Базовый endpoint для авторизации */
  private readonly endpoint = 'auth';

  constructor(private baseApi: BaseApiService) {}

  /**
   * Авторизация пользователя
   *
   * Используется стандартный сценарий входа по sessionId (code),
   * полученному от внешнего провайдера аутентификации.
   *
   * @param code Session ID / код авторизации
   * @returns Observable с результатом авторизации
   */
  public login(code: string): Observable<AuthLoginResult> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/login?sessionId=${code}`,
      {},
    );
  }

  /**
   * Авторизация администратора по одноразовой сессии
   *
   * Используется для административного входа с ограниченным временем действия.
   *
   * @param code Одноразовый session ID / код авторизации
   * @returns Observable с результатом авторизации
   */
  public loginForAdmin(code: string): Observable<AuthLoginResult> {
    return this.baseApi.postQuery$(
      `${this.endpoint}/login/one-time?sessionId=${code}`,
      {},
    );
  }
}
