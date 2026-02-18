import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RootRoute } from '@constants';
import { AuthService } from '@core/services';

export const toyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.user()?.hasErpData) {
    return router.createUrlTree([RootRoute.MAIN]);
  }

  return authService.user()?.hasErpData;
};
