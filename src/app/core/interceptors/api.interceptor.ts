import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * HTTP Interceptor для автоматического добавления базового URL к запросам.
 *
 * - Если URL содержит 'landing', используется `baseUrlLanding`.
 * - Для всех остальных запросов используется основной `baseUrl`.
 *
 * Позволяет не указывать полный путь к API в каждом сервисе.
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Проверяем, относится ли запрос к лендингу
  const isLandingUrl = req.url.includes('landing');

  // Клонируем запрос с добавленным базовым URL
  const updatedReq = isLandingUrl
    ? req.clone({ url: `${environment.baseUrlLanding}${req.url}` })
    : req.clone({ url: `${environment.baseUrl}${req.url}` });

  // Передаем модифицированный запрос дальше по цепочке
  return next(updatedReq);
};
