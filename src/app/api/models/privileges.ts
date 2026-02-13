import { BaseResult } from './base';
import { PaginationResultWithItems } from './pagination';
import { SubjectShortItem } from './subject';

/**
 * Национальный сертификат.
 */
export interface NationalCertificate {
  /** Уникальный идентификатор сертификата */
  id: number;

  /** Номер документа сертификата */
  documentNumber: string;

  /** Дата выдачи документа (ISO 8601) */
  docDate: string;

  /** Дополнительная информация о сертификате */
  detailInfo: string;

  /** Организация, выдавшая сертификат */
  givenOrganization: string;

  /** Предмет, к которому относится сертификат */
  subject: SubjectShortItem;

  /** Серия документа */
  documentSeries: string;

  /** Дата начала действия сертификата */
  startDate: string;

  /** Дата окончания действия сертификата */
  endDate: string;

  /** Название типа образовательного сертификата */
  eduStudyCertificateTypeName: string;

  /** Название уровня образовательного сертификата */
  educationCertificateLevelName: string;

  /** Статус сертификата */
  statusName: string;

  /** Флаг, подтвержден ли сертификат */
  isVerified: boolean;

  /** Результат сертификата (баллы, оценки и т.д.) */
  result: string;

  /** Флаг, является ли сертификат поддельным */
  isFake: boolean;

  /** Название уровня типа сертификата */
  certificateTypeLevelName: string;

  /** Номер документа (дублирует documentNumber) */
  docNumber: string;

  /** Тип карточки (опционально) */
  cardType?: string;
}

/**
 * Результат API с массивом национальных сертификатов.
 */
export interface NationalCertificatesResult
  extends BaseResult<NationalCertificate[]> {}

/**
 * Результат API с одним национальным сертификатом.
 */
export interface NationalCertificateResult
  extends BaseResult<NationalCertificate> {}

/**
 * STC сертификат (среднее профессиональное образование).
 */
export interface StcCertificate {
  /** Уникальный идентификатор сертификата */
  id: number;

  /** Уровень сертификата */
  level: string;

  /** Предмет сертификата */
  subject: SubjectShortItem;

  /** Балл или результат сертификата */
  ball: string;

  /** Дата начала действия сертификата */
  startDate: string;

  /** Дата окончания действия сертификата */
  endDate: string;

  /** Номер сертификата */
  number: string;

  /** Тип карточки (опционально) */
  cardType?: string;
}

/**
 * Результат API с массивом STC сертификатов.
 */
export interface StcCertificatesResult extends BaseResult<StcCertificate[]> {}

/**
 * Результат API с одним STC сертификатом.
 */
export interface StcCertificateResult extends BaseResult<StcCertificate> {}

/**
 * Элемент льготы.
 */
export interface PrivilegeItem {
  /** Уникальный идентификатор льготы */
  id: number;

  /** Название льготы */
  name: string;

  /** Флаг, требуется ли файл для подтверждения льготы */
  isFileRequired: boolean;

  /** Логика льготы по возрасту выхода на пенсию */
  retirementAgeLogic: boolean;

  /** Логика льготы по стажу работы 25 лет */
  workExperience25Year: boolean;
}

/**
 * Результат API с пагинированным списком льгот.
 */
export interface PrivilegesResult
  extends BaseResult<PaginationResultWithItems<PrivilegeItem>> {}
