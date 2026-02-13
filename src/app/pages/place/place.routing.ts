import { Route } from '@angular/router';
import { PlaceRoute, RouteParam } from '@constants';

export const routes: Route[] = [
  {
    path: PlaceRoute.LIST,
    loadComponent: () =>
      import('@pages/place/pages/place-list/place-list.component').then(
        (c) => c.PlaceListComponent,
      ),
  },
  {
    path: `${PlaceRoute.ITEM}/:${RouteParam.PLACE_ID}`,
    loadComponent: () =>
      import('@pages/place/pages/place-item/place-item.component').then(
        (c) => c.PlaceItemComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: PlaceRoute.LIST,
  },
  {
    path: '**',
    redirectTo: PlaceRoute.LIST,
  },
];
