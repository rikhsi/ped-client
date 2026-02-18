import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { TranslocoDirective } from '@jsverse/transloco';
import { BoxInfinite } from '@shared/components';
import { SListService } from '@shared/services';
import { ApplicationShortItem } from '@api/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApplicationsApiService } from '@api/controllers';
import { DatePipe } from '@angular/common';
import { EnumItemPipe } from '@shared/pipes';
import { ApplicationCardComponent } from '../../components';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'ped-list',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    TranslocoDirective,
    BoxInfinite,
    ApplicationCardComponent,
    DatePipe,
    EnumItemPipe,
    RouterModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNzIconsPatch([PlusOutline]), SListService],
})
export class ListComponent implements OnInit {
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly items = computed(() => this.slService.items());
  readonly hasActiveSeason = signal<boolean>(false);

  constructor(
    private slService: SListService<ApplicationShortItem>,
    private destroyRef: DestroyRef,
    private aaService: ApplicationsApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.slService
      .init((meta) => this.aaService.getAllApplication$(meta))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.slService.next(true);

    this.checkActiveSeason();
  }

  onScroll(): void {
    this.slService.changePagination();
  }

  private checkActiveSeason(): void {
    this.hasActiveSeason.set(
      this.route.snapshot.data['activeSeasons'].length > 0,
    );
  }
}
