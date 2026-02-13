import { Route } from '@angular/router';
import { ApplicationAttestationRoute } from '@constants';
import {
  attestationAdditionalFileGuard,
  attestationCertPrivelegeGuard,
  attestationCheckGuard,
  attestationInfoGuard,
  attestationInstitutionGuard,
  attestationPrivilegeGuard,
} from '@pages/applications/guards/attestation';

export const routes: Route[] = [
  {
    path: ApplicationAttestationRoute.DIPLOMA,
    data: {
      buttons: {
        cancel: true,
        next: true,
        back: false,
        send: false,
      },
    },
    loadComponent: () =>
      import('./diploma/diploma.component').then((m) => m.DiplomaComponent),
  },
  {
    path: ApplicationAttestationRoute.INSTITUTION,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [attestationInstitutionGuard],
    loadComponent: () =>
      import('./institution/institution.component').then(
        (m) => m.InstitutionComponent,
      ),
  },
  {
    path: ApplicationAttestationRoute.INFO,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [attestationInfoGuard],
    loadComponent: () =>
      import('./info/info.component').then((m) => m.InfoComponent),
  },
  {
    path: ApplicationAttestationRoute.PRIVILEGE,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [attestationPrivilegeGuard],
    loadComponent: () =>
      import('./privilege/privilege.component').then(
        (m) => m.PrivilegeComponent,
      ),
  },
  {
    path: ApplicationAttestationRoute.CERT_PRIVILEGE,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [attestationCertPrivelegeGuard],
    loadComponent: () =>
      import('./certificate-privilege/certificate-privilege.component').then(
        (m) => m.CertificatePrivilegeComponent,
      ),
  },
  {
    path: ApplicationAttestationRoute.ADDITIONAL_FILE,
    data: {
      buttons: {
        cancel: false,
        next: true,
        back: true,
        send: false,
      },
    },
    canActivate: [attestationAdditionalFileGuard],
    loadComponent: () =>
      import('./additional-file/additional-file.component').then(
        (m) => m.AdditionalFileComponent,
      ),
  },
  {
    path: ApplicationAttestationRoute.CHECK,
    data: {
      buttons: {
        cancel: false,
        next: false,
        back: true,
        send: true,
      },
    },
    canActivate: [attestationCheckGuard],
    loadComponent: () =>
      import('./check/check.component').then((m) => m.CheckComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ApplicationAttestationRoute.DIPLOMA,
  },
];
