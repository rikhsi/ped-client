import { BaseResult } from './base';
import { PassportItem } from './passport';

/**
 * Профиль пользователя.
 */
export interface Profile {
  /** Уникальный идентификатор пользователя */
  id: number;

  /** Имя пользователя */
  firstname: string;

  /** Фамилия пользователя */
  lastname: string;

  /** Отчество пользователя */
  middlename: string;

  /** Дата рождения (ISO 8601) */
  birthDate: string;

  /** Пол пользователя (true = мужской, false = женский) */
  gender: boolean;

  /** Номер телефона */
  phoneNumber: string;

  /** Имя пользователя в Telegram */
  telegramUserName: string;

  /** Электронная почта */
  email: string;

  /** PINFL или аналогичный идентификатор */
  pinpp: string;

  /** Паспортные данные пользователя */
  passport: PassportItem;

  hasErpData: boolean;
}

/**
 * Результат API с данными профиля пользователя.
 */
export interface ProfileResult extends BaseResult<Profile> {}

/**
 * Поля для обновления профиля пользователя.
 */
export interface UpdateProfilePayload {
  /** Электронная почта */
  email: string;

  /** Номер телефона */
  phoneNumber: string;

  /** Имя пользователя в Telegram */
  telegramUsername: string;
}

/**
 * Результат API после обновления профиля.
 */
export interface UpdateProfileResult extends BaseResult<UpdateProfilePayload> {}

/**
 * Настройки профиля пользователя.
 */
export interface ProfileConfig {
  /** Включение темного режима */
  darkMode: boolean;

  /** Включение режима защиты зрения */
  visionProtection: boolean;
}

/**
 * Результат API с настройками профиля (true = успешно получены/установлены).
 */
export interface ProfileConfigResult extends BaseResult<boolean> {}
