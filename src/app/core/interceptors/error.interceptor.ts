import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, throwError } from 'rxjs';
import { translate } from '@jsverse/transloco';
import { SHOW_ERROR_NOTIFICATION } from '@constants';

/**
 * HTTP Interceptor для глобальной обработки ошибок.
 *
 * - Показывает уведомление об ошибке, если контекст запроса разрешает это (`SHOW_ERROR_NOTIFICATION`).
 * - Использует `Ng-Zorro Notification` для отображения ошибок пользователю.
 * - Локализует сообщение через Transloco.
 *
 * Позволяет централизованно обрабатывать ошибки API и уведомлять пользователя,
 * без дублирования логики в каждом сервисе.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NzNotificationService);

  // Проверяем, нужно ли показывать уведомление для данного запроса
  const showError = req.context.get(SHOW_ERROR_NOTIFICATION);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Если показ уведомления запрещен, просто прокидываем ошибку дальше
      if (!showError) {
        return throwError(() => err);
      }

      // Получаем детальную информацию из тела ответа
      const errorResult = err.error?.error;
      const status = errorResult?.status_code;
      const messageKeyOrText = errorResult?.message ?? 'error.unknown';

      // Отображаем уведомление об ошибке
      notification.error(
        `${translate('error')} - ${status}`,
        translate(messageKeyOrText),
      );

      // Прокидываем ошибку дальше
      return throwError(() => err);
    }),
  );
};
