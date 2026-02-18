import { ApplicationItem } from './application';
import { ComplaintAppealItem } from './complaint';
import { ApplicationStatus } from './status';
import { ApplicationTOYItem } from './teacher-of-year';

/**
 * Краткая информация об обращении
 *
 * Используется, как правило, в списках и таблицах
 */
export interface AppealShortItem {
  /** Идентификатор обращения */
  id: number;

  /** Дата и время создания обращения */
  createdAt: string;

  /** Текущий статус обращения */
  status: AppealStatus;

  /** Баллы за первый этап / тур */
  firstRoundBall: number;

  /** Баллы за второй этап / тур */
  secondRoundBall: number;
}

export interface AppealStatusHistory {
  id: number;
  status: AppealStatus;
  comment: string;
}

/**
 * Статусы обращения
 */
export enum AppealStatus {
  /** Неизвестный статус */
  UNKNOWN = 0,

  /** Новое обращение */
  NEW = 1,

  /** Обращение находится на проверке */
  CHECKING = 2,

  /** Обращение отклонено */
  REJECTED = 3,

  /** Обращение рассмотрено и оценено */
  SCORED = 4,

  /** Обращение отменено пользователем или системой */
  CANCELLED = 5,
}

/**
 * Payload для создания обращения
 */
export interface AppealCreatePayload {
  /** Идентификатор заявления (application) */
  applicationId: number;

  /** Комментарий пользователя к обращению */
  comment: string;

  /** Идентификатор выбранного варианта жалобы */
  complaintVariantId: number;
}

/**
 * Payload для редактирования обращения
 */
export interface AppealEditPayload {
  /** Обновлённый комментарий */
  comment: string;

  /** Обновлённый вариант жалобы */
  complaintVariantId: number;
}

/**
 * Полная информация об обращении
 */
export interface AppealItem {
  /** Идентификатор обращения */
  id: number;

  /** Список жалоб, связанных с обращением */
  complaints: ComplaintAppealItem[];

  /** Данные заявления, к которому относится обращение */
  application: ApplicationTOYItem;

  /** Дата создания обращения */
  createdDate: string;

  /** Текущий статус обращения */
  status: AppealStatus;

  statusHistories: AppealStatusHistory[];

  /** Комментарий пользователя */
  comment: string;
}
