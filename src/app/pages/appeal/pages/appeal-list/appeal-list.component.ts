import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { AppealShortItem } from '@api/models';
import { TableComponent, BoxInfinite } from '@shared/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { SListService } from '@shared/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppealsApiService } from '@api/controllers';
import { AppealCardComponent } from '@pages/appeal/components';
import { APPEAL_COLUMNS } from '@pages/appeal/data';
import { Router } from '@angular/router';
import { TableClickType } from '@typings';

@Component({
  selector: 'ped-appeal-list',
  imports: [
    TranslocoDirective,
    TableComponent,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    FormsModule,
    AppealCardComponent,
    BoxInfinite,
  ],
  templateUrl: './appeal-list.component.html',
  styleUrl: './appeal-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService],
})
export class AppealListComponent {
  selectedTab = signal<number | null>(0);
  pageSize = computed(() => this.slService.size());
  pageIndex = computed(() => this.slService.page());
  items = computed(() => this.slService.items());
  isLoading = computed(() => this.slService.isLoading());
  total = computed(() => this.slService.total());

  columns = APPEAL_COLUMNS;

  constructor(
    private slService: SListService<AppealShortItem>,
    private destroyRef: DestroyRef,
    private appealApi: AppealsApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.slService.changePaginationBox({
      pageIndex: 0,
      pageSize: this.pageSize(),
      filter: [],
      sort: [],
    });

    this.slService
      .init((meta) => this.appealApi.getAppeals$(meta))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.slService.next(true);
  }

  onPageChange(page: number): void {
    this.slService.changePaginationBox({
      pageIndex: page,
      pageSize: this.pageSize(),
      filter: [],
      sort: [],
    });
  }

  onScroll(): void {
    this.slService.changePagination();
  }

  onNavigate(item: TableClickType<AppealShortItem>): void {
    this.router.navigate(['/main/appeal/self', item.row.id]);
  }
}
