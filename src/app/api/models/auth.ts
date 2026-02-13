import { BaseResult } from './base';

/**
 * Ответ сервера с кодом подтверждения
 *
 * Используется на этапе авторизации по SMS / коду
 */
export interface AuthCodeResponse {
  /** Идентификатор запроса */
  id: string;

  /** Код подтверждения */
  code: string;

  /** Номер телефона пользователя */
  phoneNumber: string;
}

/**
 * Модель токенов авторизации
 */
export interface AuthTokenModel {
  /** Access-token для выполнения авторизованных запросов */
  token: string;

  /** Refresh-token для обновления access-token */
  refreshToken: string | null;

  /** Дата и время истечения access-token */
  expDate: string;
}

/**
 * Результат получения токенов по коду подтверждения
 */
export interface AuthCodeResult extends BaseResult<AuthTokenModel> {}

/**
 * Результат авторизации пользователя
 */
export interface AuthLoginResult extends BaseResult<AuthTokenModel> {}

/**
 * Профиль авторизованного пользователя
 */
export interface AuthProfile {
  /** Идентификатор пользователя */
  id: number;

  /** Имя */
  firstname: string;

  /** Фамилия */
  lastname: string;

  /** Отчество */
  middlename: string;

  /** Номер телефона */
  phoneNumber: string;

  /** Идентификатор файла (например, аватар) */
  fileId: string;

  /** ПИНПП / персональный идентификатор */
  pinpp: string;
}

/**
 * Результат получения профиля авторизованного пользователя
 */
export interface AuthProfileResult extends BaseResult<AuthProfile> {}
