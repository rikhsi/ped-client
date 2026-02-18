/**
 * Информация о прикрепленном файле.
 */
export interface AttachedFile {
  /** Уникальный идентификатор файла (UUID) */
  id: string;

  /** Расширение файла (например, "pdf", "jpg") */
  extension: string;

  /** Оригинальное имя файла при загрузке */
  originalName: string;

  /** Размер файла в байтах */
  fileSize: number;

  /** Имя файла на сервере */
  fileName: string;

  /** URL для доступа к файлу */
  url: string;
}

/**
 * Данные для скачивания прикрепленного файла.
 */
export interface AttachedFileDownload {
  /** Уникальный идентификатор файла */
  id: string;

  /** Тип файла */
  fileType: ApplicationFileType;

  /** URL для скачивания файла */
  downloadUrl: string;

  /** Оригинальное имя файла (опечатка исправлена: originalName) */
  orginalName: string;
}

/**
 * Типы файлов, прикрепляемых к заявлению.
 */
export enum ApplicationFileType {
  /** Диплом */
  DIPLOMA = 1,

  /** Сертификат */
  CERTIFICATE = 2,

  /** Дополнительные документы */
  ADDITIONAL = 3,

  /** Документы, подтверждающие льготы */
  PRIVILEGE = 4,
}

/**
 * Параметры прикрепленного файла для заявки.
 */
export interface ApplicationPayloadAttachedFile {
  /** Идентификатор файла */
  fileId: string;

  /** Тип файла (соответствует ApplicationFileType) */
  fileType: number;
}
