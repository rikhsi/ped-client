/**
 * Данные о паспорте.
 */
export interface PassportItem {
  /** Дата выдачи паспорта */
  givenDate: Date;

  /** Уникальный идентификатор записи */
  id: number;

  /** Номер паспорта */
  number: string;

  /** URL фотографии паспорта */
  photoUrl: string;

  /** Серия паспорта */
  serial: string;

  /** Дата окончания срока действия паспорта */
  validDate: Date;
}
