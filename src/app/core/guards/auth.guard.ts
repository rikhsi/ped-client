import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CertificatesApiService, ProfileApiService } from '@api/controllers';
import { RootRoute } from '@constants';
import { AuthService } from '@core/services';
import { RComponent } from '@shared/components/r/r.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, map, of, switchMap, tap } from 'rxjs';

/**
 * Auth Guard для защиты маршрутов.
 *
 * - Проверяет токен пользователя.
 * - Загружает профиль и рабочий стаж, если необходимо.
 * - Загружает сертификаты пользователя.
 * - В случае ошибки перенаправляет на лэндинг и выполняет logout.
 * - Отображает специальный модальный компонент для определённого пользователя (id = 596397).
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const profileApi = inject(ProfileApiService);
  const certificatesApi = inject(CertificatesApiService);
  const nmService = inject(NzModalService);

  // Проверка токена и подготовка редиректа
  const token = authService.getToken();
  const isValid = authService.checkValidity(token);
  const redirectUrl = router.createUrlTree([RootRoute.LANDING]);

  if (!isValid) {
    // Если токен не валиден — сразу редирект
    return redirectUrl;
  }

  /**
   * Показывает специальный модальный компонент для конкретного пользователя.
   * @param id - Идентификатор пользователя
   */
  const showSpecialModal = (id?: number) => {
    if (id === 596397) {
      nmService.create({
        nzFooter: null,
        nzWidth: 'auto',
        nzWrapClassName: 'custom-modal',
        nzTitle: null,
        nzClosable: false,
        nzMaskClosable: false,
        nzContent: RComponent,
        nzCentered: true,
      });
    }
  };

  // Получение профиля пользователя
  const profile$ = authService.user()?.id
    ? of(authService.user()) // Если пользователь уже есть в сервисе
    : profileApi.getProfile$().pipe(
        tap(({ result }) => {
          authService.user.set(result); // Сохраняем пользователя
          showSpecialModal(result.id); // Проверяем на спец. модалку
        }),
        map(({ result }) => result),
      );

  return profile$.pipe(
    // Получение рабочего стажа
    switchMap(() =>
      profileApi.getWorkExperience$().pipe(
        tap(({ result }) => authService.workExperience.set(result)),
        catchError(() => {
          authService.workExperience.set(null); // При ошибке — ставим null
          return of(null); // Не роняем стрим
        }),
      ),
    ),

    // Получение сертификатов
    switchMap(() =>
      certificatesApi.getCertificates$().pipe(
        tap(({ result }) => authService.certificates.set(result)),
        catchError(() => {
          authService.certificates.set([]); // При ошибке — пустой массив
          return of(null);
        }),
      ),
    ),

    // Если всё успешно — разрешаем активацию
    map(() => true),

    // Любые ошибки при загрузке профиля или токена
    catchError(() => {
      authService.logout(false); // Выход и очистка сессии
      return of(redirectUrl); // Редирект на лэндинг
    }),
  );
};
