import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { RootRoute } from '@constants';

export const certificateLoadGuard: CanActivateFn = ({ params }) => {
  const router = inject(Router);
  const http = inject(HttpClient);

  const guid = params['guid'];

  if (!guid) {
    return router.createUrlTree([RootRoute.LANDING]);
  }

  return http
    .get(`certificates/download-file/${guid}`, {
      responseType: 'blob',
    })
    .pipe(
      map((blob) => {
        // создаём ссылку на файл
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'certificate.pdf'; // при желании можно вынести имя
        a.click();

        window.URL.revokeObjectURL(url);

        // не активируем роут
        return router.createUrlTree([RootRoute.LANDING]);
      }),
      catchError(() => {
        // interceptor уже покажет ошибку
        return of(router.createUrlTree([RootRoute.LANDING]));
      }),
    );
};
