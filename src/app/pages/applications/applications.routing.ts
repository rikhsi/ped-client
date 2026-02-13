import { Route } from '@angular/router';
import { ApplicationRoute, RouteParam } from '@constants';
import { applicationSeasonGuard } from './guards';
import { applicationSelfResolver } from './resolvers';
import { ApplicationFormLayoutComponent } from '@layouts/views';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: `${ApplicationRoute.FORM}/:${RouteParam.SEASON_ID}`,
    canActivate: [applicationSeasonGuard],
    component: ApplicationFormLayoutComponent,
    loadChildren: () =>
      import('./pages/create/create.routes').then((m) => m.routes),
  },
  {
    path: ApplicationRoute.SELECT,
    loadComponent: () =>
      import('./pages/select/select.component').then((c) => c.SelectComponent),
  },
  {
    path: `${ApplicationRoute.SELF}/:${RouteParam.APP_ID}`,
    data: { hideNavigation: true },
    resolve: {
      application: applicationSelfResolver,
    },
    runGuardsAndResolvers: 'always',
    loadComponent: () =>
      import('./pages/self/self.component').then((c) => c.SelfComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
