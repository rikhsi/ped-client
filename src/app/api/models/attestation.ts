import { NationalCertificate, StcCertificate } from './privileges';

/**
 * Типы аттестации
 *
 * Определяют формат и правила прохождения
 * подтверждения квалификации
 */
export enum AttestationType {
  /** Прямая аттестация по стандартной процедуре */
  DIRECT = 1,

  /** Альтернативная аттестация */
  ANOTHERONE = 2,

  /** Внеочередная (особая) аттестация */
  EXTRAORDINARY = 3,
}

/**
 * Строковые наименования типов аттестации
 *
 * Используются для конфигураций, роутинга
 * и взаимодействия с backend
 */
export enum AttestationTypeName {
  /** Прямая аттестация */
  DIRECT = 'direct',

  /** Альтернативная аттестация */
  ANOTHERONE = 'another-one',

  /** Внеочередная аттестация */
  EXTRAORDINARY = 'extra-ordinary',
}

/**
 * Payload с данными аттестации
 *
 * Используется при создании или обновлении заявления
 */
export interface AttestationDataPayload {
  /** Тип аттестации */
  attestationType: number;

  /** Идентификатор STC (DTM) сертификата */
  dtmCertificateId: number;

  /** Идентификатор национального сертификата */
  nationalCertificateId: number;

  /** Признак использования льготы */
  usePrivilege: boolean;
}

/**
 * Результат получения данных аттестации
 */
export interface AttestationDataResult {
  /** Тип аттестации */
  attestationType: number;

  /** STC (DTM) сертификат */
  dtmCertificate: StcCertificate;

  /** Национальный сертификат */
  nationalCertificate: NationalCertificate;

  /** Признак использования льготы */
  usePrivilege: boolean;

  /** Участие в конкурсе «Учитель года» */
  applyForTeacherOfTheYear: boolean;

  /** Заявка на надбавку из фонда министра */
  applyForMinisterFundAllowance: boolean;

  /** Наличие инвалидности */
  hasDisability: boolean;
}
