import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppealFormRoute } from '@constants';
import { AppealFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const appealReasonGuard: CanActivateFn = (route, state) => {
  const aclService = inject(AppealFormLayoutService);
  const router = inject(Router);

  const { applicationId } = aclService.appealForm.controls;

  if (applicationId.valid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, AppealFormRoute.SELECT),
  );
};
