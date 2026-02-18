import { ApplicationStatus } from '@app/api/models';

/**
 * Сопоставление статусов заявления с цветами для отображения в UI.
 *
 * Используется для визуального выделения статусов заявлений в интерфейсе.
 */
export const APPLICATION_STATUS_COLOR: Record<ApplicationStatus, string> = {
  /** Создано, нейтрально — серый */
  [ApplicationStatus.CREATED]: '#6c757d',

  /** Ожидает оплату — оранжевый */
  [ApplicationStatus.WAITING_PAYMENT]: '#f0ad4e',

  /** Новый — зелёный */
  [ApplicationStatus.NEW]: '#22C55E',

  /** В обработке — жёлтый */
  [ApplicationStatus.PROCESS]: '#FACC15',

  /** Принято — тёмно-зелёный */
  [ApplicationStatus.ACCEPT]: '#10B981',

  /** Отклонено — красный */
  [ApplicationStatus.REJECTED]: '#EF4444',

  /** Отменено владельцем — серо-фиолетовый */
  [ApplicationStatus.CANCELED_BY_OWNER]: '#8485A9',

  /** Данные о тесте отправлены — синий */
  [ApplicationStatus.SENT_TEST_DATE_AND_LOCATION]: '#6366F1',

  /** Участие в тесте — голубой */
  [ApplicationStatus.PARTICIPATED_TEST]: '#60A5FA',

  /** Сертификат выдан — фиолетовый */
  [ApplicationStatus.CERTIFICATE_GIVEN]: '#A755F7',

  /** Заявление закрыто — серо-фиолетовый */
  [ApplicationStatus.APPLICATION_CLOSED]: '#8485A9',

  /** Отклонено с правкой — ярко-красный */
  [ApplicationStatus.REJECTED_MODIFY]: '#F97316',

  /** Повторная проверка — ярко-оранжевый */
  [ApplicationStatus.RECHECK]: '#FACC15',
};
