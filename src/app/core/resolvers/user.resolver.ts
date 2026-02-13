import { computed, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileApiService } from '@api/controllers';
import { Profile } from '@api/models';
import { AuthService } from '@core/services';
import { catchError, map, Observable, of, tap } from 'rxjs';

/**
 * Resolver пользователя.
 *
 * Загружает профиль пользователя до активации маршрута.
 * Если пользователь уже есть в AuthService — возвращает его.
 * Иначе делает запрос к API и сохраняет результат в AuthService.
 * Если пользователь не авторизован — возвращает null.
 */
export const userResolver: ResolveFn<Observable<Profile | null>> = () => {
  const authService = inject(AuthService);
  const profileApi = inject(ProfileApiService);

  // Если пользователь не авторизован — сразу возвращаем null
  if (!authService.isAuthenticated()) {
    return of(null);
  }

  // Получаем реактивное значение текущего пользователя
  const user = computed(() => authService.user());

  // Если пользователь уже загружен — возвращаем его сразу
  if (user()) {
    return of(user());
  }

  // Иначе запрашиваем профиль с API
  return profileApi.getProfile$().pipe(
    map(({ result }) => result), // берем только объект пользователя
    tap((user) => authService.user.set(user)), // сохраняем в AuthService
    catchError(() => {
      // В случае ошибки возвращаем null, не ломая поток
      return of(null);
    }),
  );
};
