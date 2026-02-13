import { WorkHistory } from '@api/models';
import { TableColumn } from '@typings';

export const WORKPLACE_COLUMNS: TableColumn<WorkHistory>[] = [
  { key: 'tin', label: 'workplace.column.tin', width: '120px' },
  {
    key: 'institutionName',
    label: 'workplace.column.institutionName',
    width: '250px',
  },
  { key: 'startDate', label: 'workplace.column.startDate', width: '130px' },
  {
    key: 'contractEndDate',
    label: 'workplace.column.contractEndDate',
    width: '150px',
  },
  {
    key: 'departmentName',
    label: 'workplace.column.departmentName',
    width: '200px',
  },
  {
    key: 'contractNumber',
    label: 'workplace.column.contractNumber',
    width: '180px',
  },
  { key: 'address', label: 'workplace.column.address', width: '150px' },
];
