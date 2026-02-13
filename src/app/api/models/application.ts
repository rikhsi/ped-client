import { Languages } from '@constants';
import {
  AttestationDataPayload,
  AttestationDataResult,
  AttestationType,
} from './attestation';
import { BaseResult } from './base';
import { PedagogueCategory } from './category';
import { AttachedCertificate } from './certificate';
import { InstitutionShortItem } from './institution';
import { PaginationResultWithItems } from './pagination';
import { Season, SeasonShortItem } from './season';
import { ApplicationStatus } from './status';
import { SubjectShortItem } from './subject';
import { WorkDetail } from './work';
import { DiplomaItem } from './diploma';
import { PrivilegeItem } from './privileges';
import { ApplicationPayloadAttachedFile, AttachedFileDownload } from './file';
import { PaymentInfo } from './payment';
import { ExternalData } from './external';
import { TestResult } from './test-result';
import { TeacherOfYearItem } from './teacher-of-year';

/**
 * Типы приложений (заявлений)
 *
 * Используются для определения логики обработки,
 * отображения и доступных сценариев работы с заявлением
 */
export enum ApplicationType {
  /** Профессиональное обучение */
  PROFESSIONAL = 1,

  /** Аттестация */
  ATTESTATION = 2,

  /** Управленческое направление */
  MANAGER = 3,

  /** Диагностическое тестирование */
  DIAGNOSTIC = 4,

  /** MMTV */
  MMTV = 5,

  /** PIIMA */
  PIIMA = 6,

  /** Музыкальное направление */
  MUSIC = 7,

  /** Конкурс «Учитель года» */
  YEAR_TEACHER = 8,

  /** Удалённые регионы */
  DISTANT_AREAS = 9,
}

/**
 * Строковые наименования типов заявлений
 *
 * Используются для роутинга, конфигураций
 * и взаимодействия с backend / external services
 */
export enum ApplicationTypeName {
  PROFESSIONAL = 'professional',
  ATTESTATION = 'attestation',
  MANAGER = 'manager',
  DIAGNOSTIC = 'diagnostic',
  MMTV = 'mmtv',
  PIIMA = 'piima',
  MUSIC = 'music',
  YEAR_TEACHER = 'year_teacher',
  DISTANT_AREAS = 'distant_areas',
}

/**
 * Краткая информация о заявлении
 *
 * Используется в списках и таблицах
 */
export interface ApplicationShortItem {
  /** Идентификатор заявления */
  id: number;

  /** Номер заявления */
  applicationNumber: string;

  /** Текущий статус заявления */
  status: ApplicationStatus;

  /** Предмет */
  subject: SubjectShortItem;

  /** Тип заявления */
  applicationType: ApplicationType;

  /** Тип аттестации */
  attestationType: AttestationType;

  /** Сезон */
  season: Season;

  /** Дата создания */
  createdAt: Date;
}

/**
 * Результат получения списка заявлений с пагинацией
 */
export interface ApplicationsResult
  extends BaseResult<PaginationResultWithItems<ApplicationShortItem>> {}

/**
 * Полная информация о заявлении
 */
export interface ApplicationItem {
  /** Идентификатор заявления */
  id: number;

  /** Номер заявления */
  applicationNumber: string;

  /** Информация о трудовой деятельности */
  workDetail: WorkDetail;

  /** Текущий статус */
  status: ApplicationStatus;

  /** Тип заявления */
  applicationType: ApplicationType;

  /** Образовательное учреждение */
  institution: InstitutionShortItem;

  /** Данные аттестации */
  attestationData: AttestationDataResult;

  /** Приложенный сертификат */
  attachedCertificate: AttachedCertificate;

  /** Сезон */
  season: Season;

  /** Категория педагога */
  pedagogueCategory: PedagogueCategory;

  /** Язык прохождения */
  language: Languages;

  /** Предмет */
  subject: SubjectShortItem;

  /** История изменений заявления */
  histories: ApplicationHistoryItem[];

  /** Диплом */
  diploma: DiplomaItem;

  /** Информация о льготах */
  privilegeInfo: PrivilegeItem;

  /** Прикреплённые файлы */
  attachedFiles: AttachedFileDownload[];

  /** Информация об оплате */
  paymentInfo: PaymentInfo;

  /** Данные из внешних сервисов */
  externalServiceData: ExternalData;

  /** Причина отклонения */
  rejectReason: ApplicationRejectReason;

  /** Результаты тестирования */
  testResult: TestResult;

  /** Детали конкурса «Учитель года» */
  teacherOfYearEventDetail: TeacherOfYearItem;
}

/**
 * Причина отклонения заявления
 */
export interface ApplicationRejectReason {
  /** Идентификатор причины */
  id: number;

  /** Текст причины */
  reason: string;
}

/**
 * Элемент истории изменений заявления
 */
export interface ApplicationHistoryItem {
  /** Идентификатор записи */
  id: number;

  /** Комментарий оператора */
  comment: string;

  /** Статус, установленный на этом этапе */
  status: ApplicationStatus;

  /** Оператор, выполнивший действие */
  operator: string;

  /** Дата изменения */
  createdAt: Date;
}

/**
 * Payload для создания / обновления заявления
 */
export interface ApplicationPayload {
  /** Идентификатор учреждения */
  institutionId: number;

  /** Прикреплённые файлы */
  attachedFiles: ApplicationPayloadAttachedFile[];

  /** Идентификатор льготы */
  privilegeId: number;

  /** Идентификатор предмета */
  subjectId: number;

  /** Внешний идентификатор */
  externalId: string;

  /** Категория педагога */
  category: PedagogueCategory;

  /** Данные аттестации */
  attestationData: AttestationDataPayload;

  /** Идентификатор диплома */
  diplomaId: number;
}

export interface ApplicationPaymentRedirectResponse {
  callbackUrl: string;
  phoneNumber: string;
  applicationId: number;
}

export interface ApplicationPaymentRedirectResult {
  id: string;
  redirectUrl: string;
}
