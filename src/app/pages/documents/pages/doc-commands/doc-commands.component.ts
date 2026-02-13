import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProfileApiService } from '@api/controllers';
import { EkadrCommandItem, EkadrType } from '@api/models/ekadr';
import { BpService } from '@core/services';
import { TranslocoDirective } from '@jsverse/transloco';
import { DocCommandCardComponent } from '@pages/documents/components';
import { BoxInfinite, TableComponent } from '@shared/components';
import { SListService } from '@shared/services';
import { TableClickType } from '@typings';

@Component({
  selector: 'ped-doc-commands',
  imports: [
    TranslocoDirective,
    TableComponent,
    BoxInfinite,
    DocCommandCardComponent,
  ],
  templateUrl: './doc-commands.component.html',
  styleUrl: './doc-commands.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService],
})
export class DocCommandsComponent implements OnInit {
  readonly items = computed(() => this.slService.items());
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly showTable = computed(() => this.bpService.isDesktop());

  get columns() {
    return this.route.snapshot.data['columns'];
  }

  get type(): EkadrType {
    return this.route.snapshot.data['type'];
  }

  constructor(
    private route: ActivatedRoute,
    public slService: SListService<EkadrCommandItem>,
    private profileApi: ProfileApiService,
    private destroyRef: DestroyRef,
    private bpService: BpService,
  ) {}

  ngOnInit(): void {
    this.slService
      .init((pagination) => this.profileApi.getEkadrCommands$(pagination))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.slService.next(true);
  }

  onClick(item: TableClickType<EkadrCommandItem>): void {
    this.profileApi.getEkadrRedirectUrl$(item.row.id, this.type).subscribe({
      next: ({ result }) => {
        const url = result.replace(/^"|"$/g, '');

        window.open(url, '_self');
      },
    });
  }

  changePage(pageIndex: number): void {
    const pageSize = this.slService.size();

    this.slService.changePaginationBox({
      pageIndex,
      pageSize,
      sort: [],
      filter: [],
    });
  }
}
