import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./toy-list/toy-list.component').then((c) => c.ToyListComponent),
  },
];
