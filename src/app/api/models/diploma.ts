import { EducationLevel } from './education';
import { BaseResult } from './base';

/**
 * Объект, представляющий диплом или образовательный документ.
 */
export interface DiplomaItem {
  /** Уникальный идентификатор диплома */
  id: number;

  /** Название образовательного учреждения */
  institutionName: string;

  /** Название специальности */
  specialityName: string;

  /** Уровень образования (бакалавр, магистр и т.д.) */
  educationLevel: EducationLevel;

  /** Серия диплома */
  diplomaSerial: string;

  /** Номер диплома */
  diplomaNumber: string;

  /** Дата начала обучения (опционально, ISO 8601) */
  eduStartingDate?: string;

  /** Дата окончания обучения (опционально, ISO 8601) */
  eduFinishingDate?: string;

  /** Дата выдачи диплома (опционально, ISO 8601) */
  givenDate?: string;

  /** Тип диплома (числовой код) */
  diplomaType: number;

  /** Флаг нострификации (признание диплома в другой стране) */
  isNostrification: boolean;

  /** Информация о нострификации */
  nostrificationInfo: NostrificationInfo;
}

/**
 * Результат API, возвращающий список дипломов.
 */
export interface DiplomasResult extends BaseResult<DiplomaItem[]> {}

/**
 * Информация о нострификации диплома.
 */
export interface NostrificationInfo {
  /** Код страны, в которой подтверждается диплом */
  edCountryKey: number;

  /** Название страны, в которой подтверждается диплом */
  edCountryValue: string;

  /** Название университета, проводившего нострификацию */
  universityName: string;

  /** Название специальности по нострификации */
  specialization: string;

  /** Код степени по нострификации */
  specDegreeKey: number;

  /** Название степени по нострификации */
  specDegreeValue: string;

  /** Год поступления (строка) */
  acceptDateSt: string;

  /** Год окончания (строка) */
  gradDateSt: string;

  /** Серия и номер диплома по нострификации */
  serNumDipl: string;

  /** Год выдачи диплома по нострификации */
  givenDateDipl: string;

  /** Номер документа, подтверждающего нострификацию */
  confirmedNumDoc: string;

  /** Дата подтверждения нострификации (ISO 8601) */
  confirmedDateDoc: string;

  /** Регистрационный номер подтверждающего документа */
  regNumDoc: string;

  /** Флаг, входит ли университет в топ-1000 */
  top1000: boolean;
}
