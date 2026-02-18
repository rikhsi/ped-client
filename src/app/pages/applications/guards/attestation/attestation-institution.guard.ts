import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApplicationAttestationRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const attestationInstitutionGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const router = inject(Router);

  const isValid = aclService.applicationForm.controls.diplomaId.valid;

  if (isValid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.DIPLOMA),
  );
};
