import { SelectItem } from '@app/api/models';

/**
 * Результат фабрики перечислений (enums), который собирает все ключевые enum-списки
 * в объект, где ключи — это названия enum-типов, а значения — массивы элементов для селекта.
 *
 * Пример:
 * {
 *   systemType: [{ label: 'Admin', value: 1 }, { label: 'User', value: 2 }],
 *   language: [{ label: 'English', value: 3 }, ...],
 * }
 */
export type EnumItemsResult = Record<EnumList, SelectItem<number>[]>;

/**
 * Ключи для всех перечислений, которые поддерживаются в системе.
 * Используются как ключи объекта EnumItemsResult.
 */
export type EnumList =
  | 'systemType' // Тип системы/клиента (ADMIN, WEB, MOBILE)
  | 'eduDirection' // Направления образования (Общее, Среднее, Высшее)
  | 'language' // Поддерживаемые языки
  | 'attestation' // Типы аттестации
  | 'pedCategory' // Категории педагогов
  | 'applicationType' // Типы заявлений/обращений
  | 'externalService' // Внешние сервисы/интеграции
  | 'applicationStatus' // Статусы заявлений
  | 'attestationType' // Типы аттестаций
  | 'applicationFileType' // Типы файлов в заявлении
  | 'dayOfWeek' // Дни недели
  | 'educationLevel' // Уровни образования
  | 'diplomaType' // Типы дипломов
  | 'appealStatus'
  | 'certificateStatus'; // Статусы обращений
