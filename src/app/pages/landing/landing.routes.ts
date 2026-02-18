import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./landing.component').then((c) => c.LandingComponent),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('@pages/statistics/statistics.component').then(
        (c) => c.StatisticsComponent,
      ),
  },
];
