import { ApplicationType } from './application';
import { AttestationType } from './attestation';
import { SeasonShortItem } from './season';
import { ApplicationStatus } from './status';
import { SubjectShortItem } from './subject';

/**
 * Информация о позиции в конкурсе «Учитель года».
 */
export interface TeacherOfYearItem {
  /** Место/позиция участника в рейтинге */
  position: number;

  /** Флаг, выбран ли участник для следующего этапа */
  isSelected: boolean;
}

/**
 * Заявление для конкурса «Учитель года».
 *
 * Упрощённая модель.
 */
export interface ApplicationTOYItem {
  /** Уникальный идентификатор заявления */
  id: number;

  /** Номер заявления */
  applicationNumber: string;

  /** Текущий статус заявления */
  status: ApplicationStatus;

  /** Предмет, по которому подано заявление */
  subject: SubjectShortItem;

  /** Тип заявления */
  applicationType: ApplicationType;

  /** Тип аттестации */
  attestationType: AttestationType;

  /** Краткая информация о сезоне, в рамках которого подано заявление */
  season: SeasonShortItem;

  /** Дата и время создания заявления (ISO 8601) */
  createdAt: string;
}
