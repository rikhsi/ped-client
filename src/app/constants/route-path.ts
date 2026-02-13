import { RouteParam } from './route-params';

/**
 * Вспомогательные маршруты (например, для drawer или модальных панелей)
 */
export enum HelperRoute {
  /** Панель Drawer */
  DRAWER = 'drawer',
}

/**
 * Основные маршруты приложения
 */
export enum RootRoute {
  /** Лэндинг страница */
  LANDING = '',

  /** Главная страница */
  MAIN = 'main',

  /** Валидация сертификата */
  CERTIFICATE_VALIDATION = 'check-certificate',
}

/**
 * Основные маршруты внутри приложения (главный навигационный стек)
 */
export enum MainRoute {
  CHAT = 'chat',
  PROFILE = 'profile',
  APPLICATIONS = 'applications',
  APPLICATION = 'application',
  APPLICATION_CREATE = 'application-create',
  CERTIFICATES = 'certificates',
  FAQ = 'faq',
  PLACE = 'place',
  FORM = 'form',
  DIPLOMAS = 'diplomas',
  WORKPLACE = 'workplace',
  PRIVILEGES = 'privileges',
  DOCUMENTS = 'documents',
  APPEAL = 'appeal',
  TEACHER_OF_YEAR = 'toy',
}

/**
 * Подмаршруты для форм
 */
export enum FormRoute {
  ATTESTATION = 'attestation',
  MMTV = 'mmtv',
}

/**
 * Подмаршруты для заявлений
 */
export enum ApplicationRoute {
  /** Создание нового заявления */
  FORM = 'form',

  /** Выбор заявления */
  SELECT = 'select',

  /** Заявление по идентификатору */
  SELF = `:${RouteParam.APP_ID}`,

  /** Список заявлений */
  LIST = 'list',

  /** Детали заявления */
  DETAIL = 'detail',
}

/**
 * Подмаршруты для заявлений на аттестацию
 */
export enum ApplicationAttestationRoute {
  DIPLOMA = 'diploma',
  PRIVILEGE = 'privilege',
  INFO = 'info',
  INSTITUTION = 'institution',
  CHECK = 'check',
  CERT_PRIVILEGE = 'certificate-privilege',
  ADDITIONAL_FILE = 'additional-file',
}

/**
 * Подмаршруты для MMTV заявлений
 */
export enum ApplicationMMTVRoute {
  DIPLOMA = 'diploma',
  INSTITUTION = 'institution',
  CHECK = 'check',
}

/**
 * Подмаршруты для заявлений из удалённых районов
 */
export enum ApplicationDistantAreasRoute {
  INSTITUTION = 'institution',
  CHECK = 'check',
}

/**
 * Подмаршруты для профессиональных заявлений
 */
export enum ApplicationProfessionalRoute {
  CHECK = 'check',
}

/**
 * Подмаршруты для работы с местами
 */
export enum PlaceRoute {
  LIST = 'list',
  ITEM = 'item',
}

/**
 * Подмаршруты для обращений
 */
export enum AppealRoute {
  LIST = 'list',
  FORM = 'form',
  SELF = 'self',
}

/**
 * Подмаршруты для формы обращения
 */
export enum AppealFormRoute {
  SELECT = 'select',
  REASON = 'reason',
  CHECK = 'check',
}

export enum DocumentRoute {
  COMMANDS = 'commands',
  CONTRACTS = 'contracts',
  APPLICATIONS = 'applications',
}
