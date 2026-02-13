import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AttestationType } from '@api/models';
import { ApplicationAttestationRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const attestationCertPrivelegeGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const router = inject(Router);

  const { subjectId, language, attestationData } =
    aclService.applicationForm.controls;

  const {
    attestationType,
    applyForTeacherOfTheYear,
    applyForMinisterFundAllowance,
  } = attestationData.controls;

  const hasPrivilegeRequest =
    applyForTeacherOfTheYear.getRawValue() === true ||
    applyForMinisterFundAllowance.getRawValue() === true;

  const isOnCheckPage = router.url.includes(ApplicationAttestationRoute.CHECK);

  if (hasPrivilegeRequest) {
    // if (isOnCheckPage) {
    //   return router.createUrlTree(
    //     cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.INFO),
    //   );
    // }

    // return router.createUrlTree(
    //   cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.CHECK),
    // );
  }

  const enableAttestationTypes = [AttestationType.ANOTHERONE];

  switch (attestationType.getRawValue()) {
    case AttestationType.DIRECT: {
      return router.createUrlTree(
        cropApplicationUrlFromGuard(
          state,
          ApplicationAttestationRoute.PRIVILEGE,
        ),
      );
    }

    case AttestationType.ANOTHERONE: {
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

    default: {
      return router.createUrlTree(
        cropApplicationUrlFromGuard(state, ApplicationAttestationRoute.INFO),
      );
    }
  }
};
