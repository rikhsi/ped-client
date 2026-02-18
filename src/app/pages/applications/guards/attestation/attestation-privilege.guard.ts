import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AttestationType } from '@api/models';
import { ApplicationAttestationRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const attestationPrivilegeGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const router = inject(Router);

  const { subjectId, language, attestationData } =
    aclService.applicationForm.controls;

  const { attestationType } = attestationData.controls;

  const enableAttestationTypes = [AttestationType.DIRECT];

  switch (attestationType.getRawValue()) {
    case AttestationType.DIRECT: {
      const isValidAttestation = enableAttestationTypes.includes(
        attestationType.getRawValue(),
      );

      if (subjectId.valid && language.valid && isValidAttestation) {
        return true;
      }

      return router.createUrlTree(
        cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.INFO),
      );
    }
    case AttestationType.ANOTHERONE: {
      return router.createUrlTree(
        cropApplicationUrlFromGuard(
          state,
          ApplicationAttestationRoute.CERT_PRIVILEGE,
        ),
      );
    }
    default: {
      return router.createUrlTree(
        cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.INFO),
      );
    }
  }
};
