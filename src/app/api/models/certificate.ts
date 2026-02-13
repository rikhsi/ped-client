import { SubjectShortItem } from './subject';
import { BaseResult } from './base';
import { Profile } from './profile';
import { InstitutionShortItem } from './institution';

/**
 * Сертификат, прикреплённый к заявлению или профилю
 */
export interface AttachedCertificate {
  /** Идентификатор сертификата */
  id: number;

  /** Номер сертификата */
  number: string;

  /** Серийная информация сертификата */
  serial: CertificateSerial;

  /** Дата выдачи сертификата (ISO string) */
  givenDate: string; // Можно заменить на Date при необходимости

  /** Дата окончания действия сертификата (ISO string) */
  expireDate: string; // Можно заменить на Date при необходимости

  /** Признак бессрочного сертификата */
  isEndless: boolean;

  /** Признак возможности скачивания сертификата */
  isDownloadable: boolean;

  /** Предмет, к которому относится сертификат */
  subject: SubjectShortItem;
}

/**
 * Серийная информация сертификата
 */
export interface CertificateSerial {
  /** Идентификатор серийной записи */
  id: number;

  /** Ключ серийной записи */
  serialKey: string;

  /** Категория, к которой относится сертификат */
  category: number;
}

/**
 * Серийная информация, привязанная к номеру сертификата
 */
export interface CertificateAttachedSerial {
  /** Серийная запись */
  serial: CertificateSerial;

  /** Номер сертификата */
  number: string;
}

/**
 * Основная модель сертификата
 */
export interface Certificate {
  /** Идентификатор сертификата */
  id: number;

  /** Признак возможности скачивания */
  isDownloadable: boolean;

  /** Номер сертификата */
  number: string;

  /** Серийная информация */
  serial: CertificateSerial;

  /** Дата выдачи (ISO string) */
  givenDate: string;

  /** Дата окончания действия (ISO string) */
  expireDate: string;

  validTo?: string;

  /** Признак бессрочного сертификата */
  isEndless: boolean;

  /** Предмет сертификата */
  subject: SubjectShortItem;

  status?: CertificateStatus;

  pedagogue?: Profile;

  institution?: InstitutionShortItem;
}

/**
 * Результат запроса списка сертификатов
 */
export interface CertificatesResult extends BaseResult<Certificate[]> {}

export enum CertificateStatus {
  ACTIVE = 1,
  ARCHIVED = 2,
}
