import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApplicationMMTVRoute } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { cropApplicationUrlFromGuard } from '@pages/applications/utils';

export const applicationCheckGuard: CanActivateFn = (route, state) => {
  const aclService = inject(ApplicationFormLayoutService);
  const { subjectId } = aclService.applicationForm.controls;
  const router = inject(Router);

  if (subjectId.valid) {
    return true;
  }

  return router.createUrlTree(
    cropApplicationUrlFromGuard(state, ApplicationMMTVRoute.DIPLOMA),
  );
};
