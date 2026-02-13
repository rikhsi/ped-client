import { computed, Injectable } from '@angular/core';
import { DiplomasApiService } from '@api/controllers';
import { BaseResult, DiplomaItem } from '@api/models';
import { translate } from '@jsverse/transloco';
import { SListService } from '@shared/services';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  catchError,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class DiplomasService {
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly items = computed(() => this.slService.items());

  readonly refresh$ = new Subject<void>();
  readonly load$ = new Subject<void>();

  constructor(
    private notification: NzNotificationService,
    public daService: DiplomasApiService,
    private slService: SListService<DiplomaItem>,
  ) {}

  public initDiplomas$(): Observable<DiplomaItem[]> {
    return this.load$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => this.daService.getDiplomas$()),
      map(({ result }) => result),
      tap((result) => {
        this.slService.items.set(result);
        this.slService.isLoading.set(false);
      }),
      catchError((err) => {
        this.slService.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }

  public initRefresh$(): Observable<BaseResult<boolean>> {
    return this.refresh$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => this.daService.refreshDiplomas$()),
      tap(() => {
        this.notification.success(
          translate('notification.diploma.refresh.title'),
          translate('notification.diploma.refresh.desc'),
        );
        this.load$.next();
      }),
      catchError((err) => {
        this.slService.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }
}
