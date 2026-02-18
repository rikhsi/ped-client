import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Тип функции с опциональным параметром.
 * По умолчанию принимает string | number | boolean | null.
 */
export type FunctionType<T = string | number | boolean | null> = (
  value?: T, // значение, которое может быть передано в функцию
) => void;

/**
 * Базовое состояние для асинхронных операций.
 * Используется, например, в сторе или сервисах для отслеживания загрузки и ошибок.
 */
export type BaseInitialState = {
  /** Индикатор загрузки */
  isLoading: boolean;
  /** Сообщение об ошибке, если есть */
  error: string | null;
};

/**
 * Объект опций для HTTP-запросов.
 * Используется для конфигурации запроса в Angular HttpClient.
 */
export type HttpOption = {
  /** Заголовки запроса */
  headers?: HttpHeaders | Record<string, string | string[]>;

  /** Контекст запроса (например, для передачи метаданных) */
  context?: HttpContext;

  /** Что возвращать из запроса: по умолчанию тело */
  observe?: 'body';

  /** Параметры запроса */
  params?:
    | HttpParams // объект HttpParams
    | Record<
        string,
        string | number | boolean | ReadonlyArray<string | number | boolean>
      >; // простой объект параметров

  /** Показывать прогресс загрузки */
  reportProgress?: boolean;

  /** Тип ответа (по умолчанию JSON) */
  responseType?: 'json';

  /** Отправлять куки и другие учетные данные */
  withCredentials?: boolean;

  /** Настройки кэширования запроса */
  transferCache?:
    | {
        /** Заголовки, которые нужно включить в кэш */
        includeHeaders?: string[];
      }
    | boolean; // либо простой флаг true/false для использования кэша
};
