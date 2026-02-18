import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppealFormRoute } from '@constants';
import { AppealFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const appealCheckGuard: CanActivateFn = (route, state) => {
  const aclService = inject(AppealFormLayoutService);
  const isValid = aclService.appealForm.valid;

  const router = inject(Router);

  if (isValid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, AppealFormRoute.SELECT),
  );
};
