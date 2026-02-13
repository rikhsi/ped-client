/**
 * Уровни образования.
 */
export enum EducationLevel {
  /** Бакалавр */
  BACHELOR = 2,

  /** Магистр */
  MASTER = 3,

  /** Ординатура / резидентура */
  RESIDENCY = 10,

  /** Доктор наук / PhD */
  DOCTORATE_PHD = 11,

  /** Докторские исследования */
  DOCTORAL_STUDIES = 12,

  /** Профессиональное образование */
  PROFESSIONAL = 4,

  /** ПТУ, колледж для среднего профессионального образования */
  VOCATIONAL_COLLEGE = 6,

  /** Лицей */
  LYCEUM = 5,

  /** Школа Темурбекса */
  TEMURBEKS_SCHOOL = 13,

  /** Школа AASB */
  AASB_SCHOOL = 14,

  /** Школа SBSMC */
  SBSMC = 15,

  /** Профессиональное училище */
  VOCATIONAL_SCHOOL = 7,

  /** Колледж */
  COLLEGE = 8,

  /** Техническое училище / школа */
  TECHNICAL_SCHOOL = 9,
}

/**
 * Тип диплома.
 */
export enum DiplomaType {
  /** Диплом с отличием */
  HONORS_DEGREE = 1,

  /** Обычный диплом */
  ORDINARY_DIPLOMA = 2,
}

/**
 * Множество уровней среднего образования.
 * Используется для проверки, относится ли уровень образования к среднему.
 */
export const MIDDLE_EDUCATION_LEVELS = new Set<EducationLevel>([
  EducationLevel.LYCEUM,
  EducationLevel.COLLEGE,
  EducationLevel.TECHNICAL_SCHOOL,
  EducationLevel.VOCATIONAL_COLLEGE,
  EducationLevel.VOCATIONAL_SCHOOL,
  EducationLevel.TEMURBEKS_SCHOOL,
  EducationLevel.AASB_SCHOOL,
  EducationLevel.SBSMC,
  /** Иногда может быть и высшем в старых дипломах */
  EducationLevel.PROFESSIONAL,
]);
