import { BaseResult } from './base';
import { InstitutionShortItem } from './institution';

/**
 * Участник этапа конкурса для голосования
 */
export interface VotingParticipant {
  /** Идентификатор шага этапа */
  stageStepId: number;

  /** Наименование шага этапа */
  stageStepName: string;

  /** Тип шага этапа */
  stageStepType: CompetitionStageStepType;

  /** Педагог-участник */
  pedagogue: Pedagogue;

  /** Предмет, по которому участвует */
  subject: Subject;

  /** Учреждение педагога */
  institution: InstitutionShortItem;

  /** Источник видео участника */
  videoSource: CompetitionVideoSource;

  /** Оценка за интервью */
  interviewScore: number;

  /** Оценка за голосование */
  votingScore: number;

  /** Флаг, указывающий, оценен ли участник */
  isEvaluated: boolean;

  /** Флаг, указывающий, является ли участник "Учителем года" */
  isTeacherOfYear: boolean;
}

/**
 * Типы шагов этапов конкурса
 */
export enum CompetitionStageStepType {
  /** Сортировка */
  Sorting = 1,

  /** Интервью/экзамен */
  InterviewExam = 2,

  /** Голосование */
  Voting = 3,

  /** Тестирование */
  Test = 4,
}

/**
 * Информация о педагоге
 */
export interface Pedagogue {
  /** Идентификатор педагога */
  id: number;

  /** Имя */
  firstname: string;

  /** Фамилия */
  lastname: string;

  /** Отчество */
  middlename: string;

  /** ПИНФЛ */
  pinpp: string;
}

/**
 * Предмет
 */
interface Subject {
  /** Идентификатор предмета */
  id: number;

  /** Наименование предмета */
  name: string;
}

/**
 * Источник видео участника конкурса
 */
export interface CompetitionVideoSource {
  /** Идентификатор источника */
  id: number;

  /** Наименование источника */
  name: string;

  /** Идентификатор участника шага этапа */
  competitionStageStepParticipantId: number;

  /** Список URL видео */
  urls: CompetitionVideoSourceUrl[];
}

/**
 * URL видео источника
 */
export interface CompetitionVideoSourceUrl {
  /** Идентификатор URL */
  id: number;

  /** Ссылка на видео */
  url: string;
}

/**
 * Результат запроса участника голосования
 */
export interface VotingParticipantResult extends BaseResult<VotingParticipant> {}

/**
 * Результат запроса списка участников голосования
 */
export interface VotingParticipantResults extends BaseResult<
  VotingParticipant[]
> {}

/**
 * Видео источник для голосования
 */
export interface VotingVideoSource {
  /** Идентификатор источника */
  id: number;

  /** Наименование источника */
  name: string;

  /** Список URL видео */
  urls: CompetitionVideoSourceUrl[];

  /** Список вопросов для голосования */
  questions: VotingQuestion[];
}

/**
 * Вопрос для голосования
 */
export interface VotingQuestion {
  /** Идентификатор вопроса */
  id: number;

  /** Заголовок вопроса */
  title: string;

  /** Содержание вопроса */
  content: string;

  /** Шаблоны оценок для вопроса */
  scoreTemplates: VotingScoreTemplate[];
}

/**
 * Шаблон оценки для голосования
 */
export interface VotingScoreTemplate {
  /** Идентификатор шаблона */
  id: number;

  /** Идентификатор вопроса */
  votingQuestionId: number;

  /** Наименование шаблона (мультиязычное) */
  name: string;

  /** Значение оценки */
  value: number;
}

/**
 * Результат запроса видео источника для голосования
 */
export interface VotingVideoSourceResult extends BaseResult<VotingVideoSource> {}

/**
 * Payload для отправки оценок за видео источник
 */
export interface VotingVideoSourcePayload {
  /** Идентификатор видео источника */
  videoSourceId: number;

  /** Список оценок за видео источник */
  videoSourceVotes: VotingVideoSourceVote[];
}

/**
 * Оценка за видео источник по конкретному вопросу
 */
export interface VotingVideoSourceVote {
  /** Значение оценки */
  score: number;

  /** Идентификатор вопроса */
  questionId: number;
}
