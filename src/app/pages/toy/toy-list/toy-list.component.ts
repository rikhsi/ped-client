import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
  signal,
} from '@angular/core';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { BoxInfinite } from '@shared/components';
import { SListService } from '@shared/services';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ToyCardComponent, ToyPointingComponent } from '../components';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseResult } from '@api/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MODAL_OPTIONS } from '@constants';

@Component({
  selector: 'ped-toy-list',
  imports: [
    TranslocoDirective,
    BoxInfinite,
    NzButtonComponent,
    NzIconDirective,
    ToyCardComponent,
  ],
  templateUrl: './toy-list.component.html',
  styleUrl: './toy-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService],
})
export class ToyListComponent implements OnInit {
  readonly items = computed(() => this.slService.items());
  readonly isLoading = computed(() => this.slService.isLoading());

  readonly work = signal<any>(null);

  readonly refresh$ = new Subject<void>();
  readonly load$ = new Subject<void>();

  constructor(
    private slService: SListService<any>,
    private notification: NzNotificationService,
    private destroyRef: DestroyRef,
    private nmService: NzModalService,
  ) {}

  ngOnInit(): void {
    this.initToy$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.initRefresh$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

    this.load$.next();
  }

  onPointing(): void {
    this.nmService
      .create({
        ...MODAL_OPTIONS,
        nzContent: ToyPointingComponent,
        nzClassName: 'custom-modal',
      })
      .afterClose.pipe(switchMap(() => of()))
      .subscribe();
  }

  private initToy$(): Observable<any[]> {
    return this.load$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => of({ result: [{ id: 1 }, { id: 2 }, { id: 3 }] })),
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

  private initRefresh$(): Observable<BaseResult<boolean>> {
    return this.refresh$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => of()),
      tap(() => {
        this.notification.success(
          translate('notification.toy.refresh.title'),
          translate('notification.toy.refresh.desc'),
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
