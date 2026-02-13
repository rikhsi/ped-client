/**
 * Результат тестирования участника.
 */
export interface TestResult {
  /** Количество участников, дисквалифицированных в этом тесте */
  disqualification: number;

  /** Дата окончания теста */
  endDate: Date;

  /** Уникальный идентификатор результата теста */
  id: number;

  /** Флаг, указывающий, был ли участник дисквалифицирован */
  isDisqualified: boolean;

  /** Список результатов по направлениям теста */
  resultDirections: ResultItem[];

  /** Дата начала теста */
  startDate: Date;
}

/**
 * Результат по конкретному направлению теста.
 */
export interface ResultItem {
  /** Уникальный идентификатор результата по направлению */
  id: number;

  /** Направление теста */
  direction: TestResultDirection;

  /** Набранный балл по направлению */
  score: number;

  /** Общее количество вопросов по направлению */
  questionsCount: number;

  /** Количество правильных ответов */
  correctAnswersCount: number;

  /** Количество неправильных ответов */
  incorrectAnswersCount: number;

  /** Балл, начисленный за конкурс "Учитель года" */
  teacherOfYearScore: number;
}

/**
 * Направления теста.
 */
export enum TestResultDirection {
  /** Основной предмет */
  MainSubject = 1,

  /** Профессиональный стандарт */
  ProfessionalStandard = 2,

  /** Педагогические навыки */
  PedagogicalSkills = 3,
}
