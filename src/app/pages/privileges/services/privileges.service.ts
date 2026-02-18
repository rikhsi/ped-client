import { computed, Inject, Injectable } from '@angular/core';
import {
  NationalCertificate,
  StcCertificate,
  SalarySupplement,
} from '@api/models';
import { translate } from '@jsverse/transloco';
import { SListService } from '@shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { NATIONAL_CERT_LIST, STC_CERT_LIST, USTAMA_LIST } from '../data';
import {
  ProfileApiService,
  SalarySupplementApiService,
} from '@api/controllers';

@Injectable({
  providedIn: 'root',
})
export class PrivilegesService {
  readonly isLoadingNational = computed(() => this.nationalList.isLoading());
  readonly isLoadingDtm = computed(() => this.stcList.isLoading());
  readonly isLoadingUstama = computed(() => this.ustamaList.isLoading());

  readonly nationalItems = computed(() => this.nationalList.items());
  readonly dtmItems = computed(() => this.stcList.items());
  readonly ustamaItems = computed(() => this.ustamaList.items());

  readonly refresh$ = new Subject<void>();
  readonly load$ = new Subject<void>();

  constructor(
    private notification: NzNotificationService,
    private profileApiService: ProfileApiService,
    private ssaService: SalarySupplementApiService,
    @Inject(NATIONAL_CERT_LIST)
    private nationalList: SListService<NationalCertificate>,
    @Inject(STC_CERT_LIST)
    private stcList: SListService<StcCertificate>,
    @Inject(USTAMA_LIST)
    private ustamaList: SListService<SalarySupplement>,
  ) {}

  public initCertificates$(): Observable<
    (NationalCertificate[] | StcCertificate[] | SalarySupplement[])[]
  > {
    return this.load$.pipe(
      tap(() => {
        this.nationalList.isLoading.set(true);
        this.stcList.isLoading.set(true);
        this.ustamaList.isLoading.set(true);
      }),
      switchMap(() =>
        forkJoin([
          this.profileApiService.getNationalCertificates$(),
          this.profileApiService.getStcCertificates$(),
          this.ssaService.getSalarySupplement$(),
        ]),
      ),
      map(([{ result: national }, { result: dtm }, { result: ustama }]) => [
        national,
        dtm,
        ustama,
      ]),
      tap(([national, dtm, ustama]) => {
        this.nationalList.items.set(national as NationalCertificate[]);
        this.stcList.items.set(dtm as StcCertificate[]);
        this.ustamaList.items.set(ustama as SalarySupplement[]);

        this.nationalList.isLoading.set(false);
        this.stcList.isLoading.set(false);
        this.ustamaList.isLoading.set(false);
      }),
      catchError((err) => {
        this.nationalList.isLoading.set(false);
        this.stcList.isLoading.set(false);
        this.ustamaList.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }

  public initRefresh$(): Observable<boolean> {
    return this.refresh$.pipe(
      tap(() => {
        this.nationalList.isLoading.set(true);
        this.stcList.isLoading.set(true);
      }),
      switchMap(() =>
        forkJoin([
          this.profileApiService.syncStcCertificates$(),
          this.profileApiService.syncNationalCertificates$(),
        ]).pipe(map(() => true)),
      ),
      tap(() => {
        this.notification.success(
          translate('notification.certificates.refresh.title'),
          translate('notification.certificates.refresh.desc'),
        );
        this.load$.next();
      }),
      catchError((err) => {
        this.nationalList.isLoading.set(false);
        this.stcList.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }
}
