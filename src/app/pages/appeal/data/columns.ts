import { AppealShortItem } from '@api/models';
import {
  AppealActionsComponent,
  AppealNumberCellComponent,
  AppealStatusComponent,
  DateCellComponent,
} from '../components';
import { TableColumn } from '@typings';

export const APPEAL_COLUMNS: TableColumn<AppealShortItem>[] = [
  {
    key: 'appealNumber',
    label: 'appeal.column.appeal_id',
    render: AppealNumberCellComponent,
  },
  {
    key: 'createdAt',
    label: 'appeal.column.createdAt',
    render: DateCellComponent,
  },
  {
    key: 'status',
    label: 'appeal.column.status',
    render: AppealStatusComponent,
  },
  {
    key: 'actions',
    label: 'appeal.column.actions',
    width: '140px',
    render: AppealActionsComponent,
  },
];
