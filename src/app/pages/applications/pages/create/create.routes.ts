import { Route } from '@angular/router';
import { ApplicationType, ApplicationTypeName } from '@api/models';
import { RouteParam } from '@constants';
import { ATTESTATION_DEFAULT_STEPS, MMTV_STEPS } from '@layouts/data';
import {
  applicationGuard,
  applicationTypeGuard,
} from '@pages/applications/guards';

export const routes: Route[] = [
  {
    path: ApplicationTypeName.ATTESTATION,
    data: {
      steps: ATTESTATION_DEFAULT_STEPS,
      applicationType: ApplicationType.ATTESTATION,
    },
    canActivate: [applicationTypeGuard],
    loadChildren: () =>
      import('./attestation/attestation.routes').then((m) => m.routes),
  },
  {
    path: `${ApplicationTypeName.ATTESTATION}/:${RouteParam.APP_ID}`,
    data: {
      steps: ATTESTATION_DEFAULT_STEPS,
      applicationType: ApplicationType.ATTESTATION,
    },
    canActivate: [applicationTypeGuard, applicationGuard],
    loadChildren: () =>
      import('./attestation/attestation.routes').then((m) => m.routes),
  },
  {
    path: ApplicationTypeName.MMTV,
    data: {
      steps: MMTV_STEPS,
      applicationType: ApplicationType.MMTV,
    },
    canActivate: [applicationTypeGuard],
    loadChildren: () => import('./mmtv/mmtv.routes').then((m) => m.routes),
  },
  {
    path: `${ApplicationTypeName.MMTV}/:${RouteParam.APP_ID}`,
    data: {
      steps: MMTV_STEPS,
      applicationType: ApplicationType.MMTV,
    },
    canActivate: [applicationTypeGuard, applicationGuard],
    loadChildren: () => import('./mmtv/mmtv.routes').then((m) => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ApplicationTypeName.ATTESTATION,
  },
];
