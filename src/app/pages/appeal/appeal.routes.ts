import { Route } from '@angular/router';
import { AppealRoute, RouteParam } from '@constants';
import { appealSelfResolver } from './resolvers/appeal-self.resolver';
import { appealGuard } from './guards';
import { AppealFormLayoutComponent } from '@layouts/views';

export const routes: Route[] = [
  {
    path: AppealRoute.LIST,
    loadComponent: () =>
      import('./pages/appeal-list/appeal-list.component').then(
        (m) => m.AppealListComponent,
      ),
  },
  // {
  //   path: AppealRoute.FORM,
  //   component: AppealFormLayoutComponent,
  //   loadChildren: () =>
  //     import('./pages/appeal-form/appeal-form.routes').then((r) => r.routes),
  // },
  {
    path: `${AppealRoute.SELF}/:${RouteParam.APPEAL_ID}`,
    data: { hideNavigation: true },
    resolve: {
      appeal: appealSelfResolver,
    },
    loadComponent: () =>
      import('./pages/appeal-self/appeal-self.component').then(
        (c) => c.AppealSelfComponent,
      ),
  },
  {
    path: `${AppealRoute.FORM}/:${RouteParam.APPEAL_ID}`,
    canActivate: [appealGuard],
    component: AppealFormLayoutComponent,
    loadChildren: () =>
      import('./pages/appeal-form/appeal-form.routes').then((r) => r.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppealRoute.LIST,
  },
];
