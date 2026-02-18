import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { TableClickType, TableColumn } from '@typings';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableColumnPipe } from './table-column.pipe';
import { EmptyComponent } from '../empty/empty.component';
import { NgComponentOutlet } from '@angular/common';
import { TABLE_CLICK } from '@constants';

@Component({
  selector: 'ped-table',
  imports: [
    TranslocoDirective,
    NzTableModule,
    TableColumnPipe,
    EmptyComponent,
    NgComponentOutlet,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  columns = input.required<TableColumn<T>[]>();
  data = input<T[]>([]);
  isLoading = input<boolean>(false);
  emptyText = input<string>();

  showPagination = input<boolean>(true);
  isFrontPagination = input<boolean>(false);

  onRenderClick = output<TableClickType<T>>();

  pageSize = input<number>(10);
  pageIndex = input<number>(0);

  total = input<number>(0);

  pageIndexChange = output<number>();
  pageSizeChange = output<number>();

  constructor(private injector: Injector) {}

  createInjector(row: T) {
    return Injector.create({
      providers: [
        {
          provide: TABLE_CLICK,
          useValue: (event: string) => this.onRenderClick.emit({ event, row }),
        },
      ],
      parent: this.injector,
    });
  }
}
