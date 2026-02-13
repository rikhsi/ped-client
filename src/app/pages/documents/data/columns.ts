import { EkadrCommandItem, EkadrContractItem } from '@api/models/ekadr';
import { DocActionsComponent } from '../components';
import { TableColumn } from '@typings';

export const DOCUMENT_COMMAND_COLUMNS: TableColumn<EkadrCommandItem>[] = [
  {
    key: 'typeOrder',
    label: 'document.type',
  },
  {
    key: 'orderDate',
    label: 'document.range',
  },
  {
    key: 'spInstitutionLabel',
    label: 'document.institution',
  },
  {
    key: 'documentStatusForUser',
    label: 'document.status',
  },
  {
    key: 'actions',
    label: 'doc.column.actions',
    width: '140px',
    render: DocActionsComponent,
  },
];

export const DOCUMENT_CONTRACT_COLUMNS: TableColumn<EkadrContractItem>[] = [
  { key: 'registrationDate', label: 'prop.start_date' },
  {
    key: 'spTypeOfWeeklyWorkName',
    label: 'document.institution',
  },
  { key: 'orderStatus', label: 'document.status' },
  {
    key: 'actions',
    label: 'doc.column.actions',
    width: '140px',
    render: DocActionsComponent,
  },
];

export const DOCUMENT_APPLICATION_COLUMNS: TableColumn<EkadrContractItem>[] = [
  { key: 'ownerName', label: 'prop.owner_name' },
  { key: 'createdDate', label: 'prop.start_date' },
  {
    key: 'ownerInstitution',
    label: 'document.institution',
  },
  { key: 'status', label: 'document.status' },
  {
    key: 'actions',
    label: 'doc.column.actions',
    width: '140px',
    render: DocActionsComponent,
  },
];
