/**
 * Типы файлов, поддерживаемые системой.
 * Используется для идентификации формата файла, например при загрузке или отображении.
 */
export type FileType =
  | 'word'   // Документы Microsoft Word (.doc, .docx)
  | 'excel'  // Таблицы Microsoft Excel (.xls, .xlsx)
  | 'pdf'    // Файлы PDF (.pdf)
  | 'zip'    // Архивы ZIP (.zip)
  | 'rar'    // Архивы RAR (.rar)
  | 'file';  // Любой другой файл, общий тип
