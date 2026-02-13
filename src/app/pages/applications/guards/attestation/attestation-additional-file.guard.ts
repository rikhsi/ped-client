import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApplicationAttestationRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const attestationAdditionalFileGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const router = inject(Router);

  const { attestationData } = aclService.applicationForm.controls;
  const isValid = attestationData.controls.attestationType.valid;

  if (isValid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.PRIVILEGE),
  );
};
