import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LANGUAGE_CONTENT } from '@constants';
import { TranslocoService } from '@jsverse/transloco';

/**
 * HTTP Interceptor для установки заголовка `Accept-Language` на все запросы.
 *
 * - Использует текущий язык приложения из Transloco (`TranslocoService`).
 * - Заголовок позволяет бэкенду возвращать данные на нужном языке.
 * - Поддерживает все языки, определённые в `LANGUAGE_CONTENT`.
 */
export const languageInterceptor: HttpInterceptorFn = (req, next) => {
  const translocoService = inject(TranslocoService);

  // Клонируем запрос и добавляем заголовок Accept-Language
  const clonedRequest = req.clone({
    setHeaders: {
      'Accept-Language': LANGUAGE_CONTENT[translocoService.getActiveLang()],
    },
  });

  // Передаем модифицированный запрос дальше по цепочке
  return next(clonedRequest);
};
