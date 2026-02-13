import { Routes } from '@angular/router';
import { MainRoute, RootRoute } from '@constants';
import { authGuard, certificateLoadGuard } from '@core/guards';
import { activeSeasonsResolver } from '@pages/applications/resolvers';
import { userResolver } from '@core/resolvers';
import {
  DocumentLayoutComponent,
  LandingLayoutComponent,
  MainLayoutComponent,
  PlaceLayoutComponent,
} from '@layouts/views';

export const routes: Routes = [
  {
    path: RootRoute.LANDING,
    component: LandingLayoutComponent,
    resolve: {
      user: userResolver,
    },
    loadChildren: () =>
      import('@pages/landing/landing.routes').then((c) => c.routes),
  },
  {
    path: RootRoute.CERTIFICATE_VALIDATION,
    loadComponent: () =>
      import('@pages/certificate-validation/certificate-validation.component').then(
        (c) => c.CertificateValidationComponent,
      ),
  },
  {
    path: RootRoute.MAIN,
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: MainRoute.PROFILE,
        loadComponent: () =>
          import('@pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },
      {
        path: MainRoute.DIPLOMAS,
        loadComponent: () =>
          import('@pages/diplomas/diplomas.component').then(
            (c) => c.DiplomasComponent,
          ),
      },
      {
        path: MainRoute.TEACHER_OF_YEAR,
        loadChildren: () =>
          import('@pages/toy/toy.routes').then((r) => r.routes),
      },
      {
        path: MainRoute.WORKPLACE,
        loadComponent: () =>
          import('@pages/workplace/workplace.component').then(
            (c) => c.WorkplaceComponent,
          ),
      },
      {
        path: MainRoute.PRIVILEGES,
        loadComponent: () =>
          import('@pages/privileges/privileges.component').then(
            (c) => c.PrivilegesComponent,
          ),
      },
      {
        path: MainRoute.DOCUMENTS,
        component: DocumentLayoutComponent,
        loadChildren: () =>
          import('@pages/documents/documents.routes').then((r) => r.routes),
      },
      {
        path: MainRoute.APPEAL,
        loadChildren: () =>
          import('@pages/appeal/appeal.routes').then((r) => r.routes),
      },
      {
        path: MainRoute.APPLICATIONS,
        resolve: {
          activeSeasons: activeSeasonsResolver,
        },
        loadChildren: () =>
          import('@pages/applications/applications.routing').then(
            (r) => r.routes,
          ),
      },
      {
        path: MainRoute.CERTIFICATES,
        loadComponent: () =>
          import('@pages/certificates/certificates.component').then(
            (c) => c.CertificatesComponent,
          ),
      },
      {
        path: MainRoute.PLACE,
        component: PlaceLayoutComponent,
        loadChildren: () =>
          import('@pages/place/place.routing').then((r) => r.routes),
      },
      {
        path: '**',
        redirectTo: MainRoute.PROFILE,
      },
    ],
  },
  {
    path: '',
    redirectTo: RootRoute.LANDING,
    pathMatch: 'full',
  },
  {
    path: 'api/Pedkadr/Certificate/Download/:guid',
    canActivate: [certificateLoadGuard],
    children: [],
  },
  {
    path: '**',
    redirectTo: RootRoute.LANDING,
  },
];
