import { Route } from '@angular/router';
import { EkadrType } from '@api/models/ekadr';
import { DocumentRoute } from '@constants';
import {
  DOCUMENT_APPLICATION_COLUMNS,
  DOCUMENT_COMMAND_COLUMNS,
  DOCUMENT_CONTRACT_COLUMNS,
} from './data';

export const routes: Route[] = [
  {
    path: DocumentRoute.APPLICATIONS,
    data: {
      type: EkadrType.APPLICATION,
      columns: DOCUMENT_APPLICATION_COLUMNS,
    },
    loadComponent: () =>
      import('./pages/doc-applications/doc-applications.component').then(
        (c) => c.DocApplicationsComponent,
      ),
  },
  {
    path: DocumentRoute.COMMANDS,
    data: {
      type: EkadrType.COMMAND,
      columns: DOCUMENT_COMMAND_COLUMNS,
    },
    loadComponent: () =>
      import('./pages/doc-commands/doc-commands.component').then(
        (c) => c.DocCommandsComponent,
      ),
  },
  {
    path: DocumentRoute.CONTRACTS,
    data: {
      type: EkadrType.CONTRACT,
      columns: DOCUMENT_CONTRACT_COLUMNS,
    },
    loadComponent: () =>
      import('./pages/doc-contracts/doc-contracts.component').then(
        (c) => c.DocContractsComponent,
      ),
  },
  {
    path: '**',
    redirectTo: DocumentRoute.COMMANDS,
  },
];
