import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageService } from '@core/services';
import { LocalStorageItem } from '@constants';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * HTTP Interceptor для добавления JWT-токена в заголовок `Authorization`.
 *
 * Основные функции:
 * 1. Получает токен из LocalStorage по ключу `LocalStorageItem.ACCESS_TOKEN`.
 * 2. Проверяет срок действия токена через `JwtHelperService`.
 * 3. Если токен действителен, клонирует запрос и добавляет заголовок:
 *    `Authorization: Bearer <accessToken>`.
 * 4. Если токен отсутствует или просрочен, отправляет запрос без заголовка.
 *
 * Этот interceptor позволяет автоматически авторизовывать запросы к защищённым API.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalStorageService);
  const tokenService = inject(JwtHelperService);

  // Получаем токен из LocalStorage
  const accessToken: string = storageService.getItem(LocalStorageItem.ACCESS_TOKEN);

  // Проверяем, не просрочен ли токен
  const isExpired = tokenService.isTokenExpired(accessToken);

  // Если токен просрочен, пропускаем запрос без авторизации
  if (isExpired) {
    return next(req);
  }

  // Клонируем запрос и добавляем заголовок Authorization
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Передаём модифицированный запрос дальше
  return next(authReq);
};
