import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  NationalCertificateCardComponent,
  StcCertificateCardComponent,
  UstamaAchievementCardComponent,
} from './components';
import { SListService } from '@shared/services';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { BoxInfinite } from '@shared/components';
import { PrivilegesService } from './services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NATIONAL_CERT_LIST, STC_CERT_LIST, USTAMA_LIST } from './data';
import { SalarySupplementApiService } from '@api/controllers';

@Component({
  selector: 'ped-privileges',
  imports: [
    NationalCertificateCardComponent,
    StcCertificateCardComponent,
    UstamaAchievementCardComponent,
    TranslocoDirective,
    NzButtonComponent,
    NzIconDirective,
    BoxInfinite,
  ],
  templateUrl: './privileges.component.html',
  styleUrl: './privileges.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PrivilegesService,
    {
      provide: NATIONAL_CERT_LIST,
      useClass: SListService,
    },
    {
      provide: STC_CERT_LIST,
      useClass: SListService,
    },
    {
      provide: USTAMA_LIST,
      useClass: SListService,
    },
  ],
})
export class PrivilegesComponent {
  readonly isLoading = computed(
    () =>
      this.privilegesService.isLoadingDtm() &&
      this.privilegesService.isLoadingNational() &&
      this.privilegesService.isLoadingUstama(),
  );

  readonly isEmpty = computed(
    () =>
      !this.privilegesService.dtmItems()?.length &&
      !this.privilegesService.nationalItems()?.length &&
      !this.privilegesService.ustamaItems()?.length,
  );

  readonly nationalItems = computed(() =>
    this.privilegesService.nationalItems(),
  );
  readonly dtmItems = computed(() => this.privilegesService.dtmItems());
  readonly ustamaItems = computed(() => this.privilegesService.ustamaItems());

  constructor(
    private privilegesService: PrivilegesService,
    public ssaService: SalarySupplementApiService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.privilegesService
      .initCertificates$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.privilegesService
      .initRefresh$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.privilegesService.load$.next();
  }

  onRefresh(): void {
    this.privilegesService.refresh$.next();
  }
}
