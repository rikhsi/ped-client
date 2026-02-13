import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { AppealFormLayoutService } from '@layouts/services';
import { of } from 'rxjs';

export const appealSelectGuard: CanActivateFn = (route) => {
  const aflService = inject(AppealFormLayoutService);
  const router = inject(Router);
  const redirectTo = router.parseUrl(
    `/main/appeal/form/${route.params['appealId']}/reason`,
  );

  if (!aflService.appeal()?.id) {
    return true;
  }

  return of(new RedirectCommand(redirectTo));
};
