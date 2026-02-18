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
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseResult, ERPItem, VotingParticipant } from '@api/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MODAL_OPTIONS } from '@constants';
import { CompetitionsApiService, ProfileApiService } from '@api/controllers';
import { FullnamePipe } from '@shared/pipes';
import { DatePipe, NgClass } from '@angular/common';

export const PED_TOY_CARD_MOCK: any[] = [
  {
    id: 1,
    isTeacherOfYear: true,
    interviewScore: 9.4,
    votingScore: 8.7,
    pedagogue: {
      firstName: 'Анна',
      lastName: 'Иванова',
      middleName: 'Сергеевна',
    },
    institution: {
      name: 'Гимназия №12',
      district: {
        name: 'Центральный район',
        region: {
          name: 'г. Алматы',
        },
      },
    },
    subject: {
      name: 'Математика',
    },
    videoSource: {
      id: 101,
      name: 'Педагог года 2025',
      url: 'https://example.com/video1.mp4',
      thumbnail: 'https://example.com/video1.jpg',
    },
  },
  {
    id: 2,
    isTeacherOfYear: false,
    interviewScore: 8.1,
    votingScore: 7.9,
    pedagogue: {
      firstName: 'Дмитрий',
      lastName: 'Кузнецов',
      middleName: 'Алексеевич',
    },
    institution: {
      name: 'Школа-лицей №5',
      district: {
        name: 'Ауэзовский район',
        region: {
          name: 'г. Алматы',
        },
      },
    },
    subject: {
      name: 'История',
    },
    videoSource: {
      id: 102,
      name: 'Открытый урок',
      url: 'https://example.com/video2.mp4',
      thumbnail: 'https://example.com/video2.jpg',
    },
  },
  {
    id: 3,
    isTeacherOfYear: false,
    interviewScore: 9.0,
    votingScore: 9.2,
    pedagogue: {
      firstName: 'Мария',
      lastName: 'Соколова',
      middleName: 'Игоревна',
    },
    institution: {
      name: 'Средняя школа №27',
      district: {
        name: 'Бостандыкский район',
        region: {
          name: 'г. Алматы',
        },
      },
    },
    subject: {
      name: 'Английский язык',
    },
    videoSource: {
      id: 103,
      name: 'Инновационные методы обучения',
      url: 'https://example.com/video3.mp4',
      thumbnail: 'https://example.com/video3.jpg',
    },
  },
];

@Component({
  selector: 'ped-toy-list',
  imports: [
    TranslocoDirective,
    BoxInfinite,
    NzButtonComponent,
    NzIconDirective,
    ToyCardComponent,
    FullnamePipe,
    DatePipe,
    NgClass,
  ],
  templateUrl: './toy-list.component.html',
  styleUrl: './toy-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService],
})
export class ToyListComponent implements OnInit {
  readonly items = computed(() => this.slService.items());
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly isUpdating = signal<boolean>(false);
  readonly erpItem = signal<ERPItem>(null);
  readonly isEvaluated = computed(() =>
    this.items().filter((item) => item.isEvaluated),
  );

  readonly work = signal<any>(null);

  readonly refresh$ = new Subject<void>();
  readonly load$ = new Subject<void>();

  constructor(
    private slService: SListService<VotingParticipant>,
    private notification: NzNotificationService,
    private destroyRef: DestroyRef,
    private nmService: NzModalService,
    private competitionsApiService: CompetitionsApiService,
    private profileApiService: ProfileApiService,
  ) {}

  ngOnInit(): void {
    this.initToy$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.initRefresh$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.initErp$();

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
    this.slService.items.set(PED_TOY_CARD_MOCK);
    return this.load$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => this.competitionsApiService.getVotingParticipants$()),
      map(({ result }) => result),
      tap((result) => {
        this.slService.items.set(
          // isTeacherOfYear should be first
          result.sort((a, b) => {
            if (a.isTeacherOfYear) return -1;
            if (b.isTeacherOfYear) return 1;
            return 0;
          }),
        );
        this.slService.isLoading.set(false);
      }),
      catchError((err) => {
        this.slService.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }

  private initRefresh$(): Observable<BaseResult<number>> {
    return this.refresh$.pipe(
      tap(() => this.isUpdating.set(true)),
      switchMap(() => this.profileApiService.syncErpData$()),
      tap(() => {
        this.notification.success(
          translate('notification.toy.refresh.title'),
          translate('notification.toy.refresh.desc'),
        );
      }),
      catchError((err) => {
        this.isUpdating.set(false);

        return throwError(() => err);
      }),
    );
  }

  private initErp$(): void {
    this.profileApiService
      .getErpData$()
      .pipe(
        tap(({ result }) => {
          this.erpItem.set(result);
        }),
      )
      .subscribe();
  }
}
