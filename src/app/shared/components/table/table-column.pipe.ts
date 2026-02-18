import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '@typings';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'tableColumn',
})
export class TableColumnPipe implements PipeTransform {
  transform(row: NzSafeAny, column: TableColumn): string | number {
    return row?.[column?.key] ?? '--';
  }
}
