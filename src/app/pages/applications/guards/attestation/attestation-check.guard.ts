import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApplicationAttestationRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const attestationCheckGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const isValid = aclService.applicationForm.valid;
  const router = inject(Router);

  if (isValid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.DIPLOMA),
  );
};
