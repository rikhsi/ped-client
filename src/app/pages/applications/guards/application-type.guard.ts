import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApplicationType } from '@api/models';
import { ApplicationRoute, MainRoute, RootRoute } from '@constants';
import { APPLICATION_TYPE_TO_ROUTE } from '../data';
import { ApplicationFormLayoutService } from '@layouts/services';

export const applicationTypeGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const aclService = inject(ApplicationFormLayoutService);

  const routeApplicationType = route.data['applicationType'] as ApplicationType;
  const seasonApplicationType = aclService.season()?.applicationType;
  const routeSteps = route.data['steps'];

  const redirectUrl = router.createUrlTree([
    RootRoute.MAIN,
    MainRoute.APPLICATIONS,
    ApplicationRoute.SELECT,
  ]);

  // ❌ нет типа сезона
  if (!seasonApplicationType) {
    return redirectUrl;
  }

  // ✅ тип совпадает
  if (routeApplicationType === seasonApplicationType) {
    aclService.steps.set(routeSteps);
    return true;
  }

  // 🔍 ищем route для типа сезона
  const targetRoute = APPLICATION_TYPE_TO_ROUTE[seasonApplicationType];

  // ❌ route не существует
  if (!targetRoute) {
    return redirectUrl;
  }

  aclService.steps.set(routeSteps);

  // 🔁 редирект на правильный application type
  return router.createUrlTree([
    RootRoute.MAIN,
    MainRoute.APPLICATIONS,
    ApplicationRoute.FORM,
    aclService.season().id,
    targetRoute,
  ]);
};
