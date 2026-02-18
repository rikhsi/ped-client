import { AppealStatus } from '@app/api/models';

/**
 * Сопоставление статусов обращения с цветами для отображения в UI.
 *
 * Используется для визуального выделения статусов в интерфейсе.
 */
export const APPEAL_STATUS_COLOR: Record<AppealStatus, string> = {
  /** Статус неизвестен / создано, нейтрально — серый */
  [AppealStatus.UNKNOWN]: '#6c757d',

  /** Новый статус — зелёный */
  [AppealStatus.NEW]: '#22C55E',

  /** В обработке / проверяется — жёлтый */
  [AppealStatus.CHECKING]: '#FACC15',

  /** Отклонено — красный */
  [AppealStatus.REJECTED]: '#EF4444',

  /** Отменено владельцем — фиолетово-серый */
  [AppealStatus.CANCELLED]: '#8485A9',

  /** Данные о тесте отправлены / оценка — синий */
  [AppealStatus.SCORED]: '#6366F1',
};
