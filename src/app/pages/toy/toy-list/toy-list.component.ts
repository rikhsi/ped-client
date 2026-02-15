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
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseResult, VotingParticipant } from '@api/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MODAL_OPTIONS } from '@constants';
import { CompetitionsApiService } from '@api/controllers';
import { FullnamePipe } from '@shared/pipes';

@Component({
  selector: 'ped-toy-list',
  imports: [
    TranslocoDirective,
    BoxInfinite,
    NzButtonComponent,
    NzIconDirective,
    ToyCardComponent,
    FullnamePipe,
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
    private slService: SListService<VotingParticipant>,
    private notification: NzNotificationService,
    private destroyRef: DestroyRef,
    private nmService: NzModalService,
    private competitionsApiService: CompetitionsApiService,
  ) {}

  ngOnInit(): void {
    this.initToy$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.initRefresh$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

    this.load$.next();
  }

  onPointing(videoSourceId: number): void {
    this.nmService
      .create({
        ...MODAL_OPTIONS,
        nzContent: ToyPointingComponent,
        nzClassName: 'custom-modal',
        nzData: videoSourceId,
      })
      .afterClose.pipe(
        filter((form) => !!form),
        switchMap((form) =>
          this.competitionsApiService.uploadVotingVideoSource$(form),
        ),
      )
      .subscribe({
        next: () => {
          this.notification.success(
            translate('submit_vote.success.title'),
            translate('submit_vote.success.desc'),
          );
        },
      });
  }

  private initToy$(): Observable<VotingParticipant[]> {
    return this.load$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => this.competitionsApiService.getVotingParticipants$()),
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
