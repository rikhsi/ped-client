import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import {
  TableComponent,
  CollapsibleCardComponent,
  BoxInfinite,
  ItemComponent,
} from '@shared/components';
import { WorkHistory } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { WORKPLACE_COLUMNS } from './data';
import { WorkPlaceService } from './services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SListService } from '@shared/services';
import { TableColumn } from '@typings';

@Component({
  selector: 'ped-workplace',
  imports: [
    TableComponent,
    TranslocoDirective,
    CollapsibleCardComponent,
    ItemComponent,
    BoxInfinite,
  ],
  templateUrl: './workplace.component.html',
  styleUrl: './workplace.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService, WorkPlaceService],
})
export class WorkplaceComponent implements OnInit {
  readonly isLoading = computed(() => this.wService.isLoading());
  readonly items = computed(() => this.wService.items());

  readonly expandedIndex = signal<number | null>(null);

  readonly columns: TableColumn<WorkHistory>[] = WORKPLACE_COLUMNS;

  constructor(
    private wService: WorkPlaceService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.wService
      .initWorkHistory$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.wService.load$.next();
  }

  toggleExpand(index: number): void {
    this.expandedIndex.update((current) => (current === index ? null : index));
  }
}
