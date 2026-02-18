import { Route } from '@angular/router';
import { ApplicationMMTVRoute } from '@constants';
import {
  applicationCheckGuard,
  mmtvInstitutionGuard,
} from '@pages/applications/guards/mmtv';

export const routes: Route[] = [
  {
    path: ApplicationMMTVRoute.DIPLOMA,
    data: {
      buttons: {
        cancel: true,
        next: true,
        back: false,
        send: false,
      },
    },
    loadComponent: () =>
      import('./mmtv-diploma/mmtv-diploma.component').then(
        (m) => m.MmtvDiplomaComponent,
      ),
  },
  {
    path: ApplicationMMTVRoute.INSTITUTION,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [mmtvInstitutionGuard],
    loadComponent: () =>
      import('./mmtv-institution/mmtv-institution.component').then(
        (m) => m.MmtvInstitutionComponent,
      ),
  },
  {
    path: ApplicationMMTVRoute.CHECK,
    data: {
      buttons: {
        cancel: false,
        next: false,
        back: true,
        send: true,
      },
    },
    canActivate: [applicationCheckGuard],
    loadComponent: () =>
      import('./mmtv-check/mmtv-check.component').then(
        (m) => m.MmtvCheckComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ApplicationMMTVRoute.DIPLOMA,
  },
];
