import { Languages } from '@constants';

/**
 * Краткая информация о предмете.
 */
export interface SubjectShortItem {
  /** Уникальный идентификатор предмета */
  id: number;

  /** Название предмета */
  name: string;

  /** Дополнительное значение или код предмета (опционально) */
  value?: string;

  /** Список языков, на которых доступен предмет */
  languages: Languages[];

  /** Флаг, указывающий, что предмет недоступен для выбора */
  disabled: boolean;
}
