import { Route } from '@angular/router';
import { AppealFormRoute } from '@constants';
import {
  appealCheckGuard,
  appealReasonGuard,
  appealSelectGuard,
} from '@pages/appeal/guards';

export const routes: Route[] = [
  {
    path: AppealFormRoute.SELECT,
    canActivate: [appealSelectGuard],
    data: {
      buttons: {
        cancel: true,
        next: true,
        back: false,
        send: false,
      },
    },
    loadComponent: () =>
      import('./appeal-form-select/appeal-form-select.component').then(
        (m) => m.AppealFormSelectComponent,
      ),
  },
  {
    path: AppealFormRoute.REASON,
    canActivate: [appealReasonGuard],
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    loadComponent: () =>
      import('./appeal-form-reason/appeal-form-reason.component').then(
        (m) => m.AppealFormReasonComponent,
      ),
  },
  {
    path: AppealFormRoute.CHECK,
    canActivate: [appealCheckGuard],
    data: {
      buttons: {
        cancel: false,
        next: false,
        back: true,
        send: true,
      },
    },
    loadComponent: () =>
      import('./appeal-form-check/appeal-form-check.component').then(
        (m) => m.AppealFormCheckComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppealFormRoute.SELECT,
  },
];
