/**
 * Базовый интерфейс модального окна.
 *
 * Содержит основные элементы: заголовок и описание.
 */
export interface BaseModal {
  /** Заголовок модального окна */
  title: string;

  /** Основное текстовое описание или сообщение */
  description: string;
}

/**
 * Базовая конфигурация кнопки модального окна.
 */
export interface ModalButtonBase {
  /** Текст кнопки */
  title: string;

  /** Флаг опасной операции (например, удаление, выход) */
  danger: boolean;

  /** Флаг отключенной кнопки (по умолчанию false) */
  disabled?: boolean;
}

/**
 * Интерфейс подтверждающего модального окна.
 *
 * Расширяет BaseModal и добавляет две кнопки: 
 * - cancel — для отмены
 * - submit — для подтверждения действия
 */
export interface ConfirmModal extends BaseModal {
  /** Настройка кнопки отмены */
  cancel: ModalButtonBase;

  /** Настройка кнопки подтверждения */
  submit: ModalButtonBase;
}
