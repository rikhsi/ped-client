import { inject } from '@angular/core';
import { AuthService } from '@core/services';
import { CanActivateFn, Router } from '@angular/router';
import { MainRoute } from '@constants';

/**
 * Guard для проверки состояния аутентификации пользователя.
 *
 * - Если пользователь уже аутентифицирован, перенаправляет на профиль.
 * - Если пользователь не аутентифицирован, разрешает доступ к маршруту.
 *
 * Используется для страниц вроде логина или регистрации, где
 * авторизованным пользователям нет смысла оставаться.
 */
export const checkGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Если пользователь уже авторизован
  if (authService.isAuthenticated()) {
    // Перенаправляем на профиль и сохраняем параметры запроса
    router.navigate([MainRoute.PROFILE], { queryParamsHandling: 'merge' });
  }

  // Разрешаем активацию маршрута только если пользователь не авторизован
  return !authService.isAuthenticated();
};
