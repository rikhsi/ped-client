import {
  ApplicationStatus,
  ApplicationFileType,
  ApplicationType,
  ClientType,
  DayOfWeek,
  EduDirection,
  ExternalService,
  PedagogueCategory,
  EducationLevel,
  DiplomaType,
  AppealStatus,
  CertificateStatus,
  CompetitionStageStepType,
} from '@app/api/models';
import { AttestationType } from '@app/api/models';
import { Languages } from '@constants';
import { createSelectItemByEnum } from '@shared/utils';
import { EnumItemsResult } from '@typings';

/**
 * Фабричная функция, которая собирает и форматирует ключевые перечисления (enums)
 * системы в единый объект типа EnumItemsResult.
 *
 * Каждый enum преобразуется в массив объектов типа SelectItem[],
 * что удобно для использования в компонентах выбора (select, dropdown).
 *
 * @returns EnumItemsResult Объект, содержащий все сформатированные списки перечислений.
 */
export function enumItemsProvider(): EnumItemsResult {
  return {
    /** Типы систем/клиентов (например, ADMIN, MOBILE, WEB и т.д.) */
    systemType: createSelectItemByEnum(ClientType, 'system_type'),

    /** Направления образования (например, Общее, Среднее, Высшее) */
    eduDirection: createSelectItemByEnum(EduDirection, 'edu_direction'),

    /** Поддерживаемые языки (используются в API, числовые ID) */
    language: createSelectItemByEnum(Languages, 'language'),

    /** Типы аттестации (например, первичная, внеочередная) */
    attestation: createSelectItemByEnum(AttestationType, 'attestation'),

    /** Категории педагогических работников (например, Высшая, Первая) */
    pedCategory: createSelectItemByEnum(PedagogueCategory, 'ped_category'),

    /** Типы заявлений/обращений */
    applicationType: createSelectItemByEnum(
      ApplicationType,
      'application_type',
    ),

    /** Внешние сервисы/системы для интеграции */
    externalService: createSelectItemByEnum(
      ExternalService,
      'external_service',
    ),

    /** Статусы заявлений */
    applicationStatus: createSelectItemByEnum(
      ApplicationStatus,
      'application_attestation',
    ),

    /** Типы аттестации (для детальной привязки) */
    attestationType: createSelectItemByEnum(
      AttestationType,
      'attestation_type',
    ),

    /** Типы файлов в заявлении */
    applicationFileType: createSelectItemByEnum(
      ApplicationFileType,
      'application_file_type',
    ),

    /** Дни недели */
    dayOfWeek: createSelectItemByEnum(DayOfWeek, 'day_of_week'),

    /** Уровни образования (начальный, средний, высший) */
    educationLevel: createSelectItemByEnum(EducationLevel, 'education_level'),

    /** Типы дипломов */
    diplomaType: createSelectItemByEnum(DiplomaType, 'diploma_type'),

    /** Статусы обращений/апелляций */
    appealStatus: createSelectItemByEnum(AppealStatus, 'appeal_status'),

    /** Статусы сертификатов */
    certificateStatus: createSelectItemByEnum(CertificateStatus, 'cert_status'),

    /** Типы шагов этапов конкурса */
    competitionStageStep: createSelectItemByEnum(
      CompetitionStageStepType,
      'competition_stage_step',
    ),
  };
}
