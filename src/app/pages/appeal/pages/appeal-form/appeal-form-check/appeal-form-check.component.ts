import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MainRoute, RootRoute } from '@constants';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { AppealFormLayoutService } from '@layouts/services';
import { AppealFormCheckService } from '@pages/appeal/services';
import { EnumItemPipe, FullnamePipe, GenderPipe } from '@shared/pipes';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ped-appeal-form-check',
  imports: [
    TranslocoDirective,
    FullnamePipe,
    DatePipe,
    GenderPipe,
    EnumItemPipe,
  ],
  templateUrl: './appeal-form-check.component.html',
  styleUrl: './appeal-form-check.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppealFormCheckService],
})
export class AppealFormCheckComponent implements OnInit {
  readonly user = computed(() => this.achService.user());
  readonly appeal = computed(() => this.aclService.appeal());
  readonly application = computed(() => this.aclService.application());
  readonly complaint = computed(() => this.aclService.complaint());

  readonly selectedComplaintVariant = computed(() =>
    this.aclService.selectedComplaintVariant(),
  );

  get appealForm() {
    return this.aclService.appealForm;
  }

  constructor(
    private aclService: AppealFormLayoutService,
    private destroyRef: DestroyRef,
    private achService: AppealFormCheckService,
    private router: Router,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.aclService
      .controlDisabledState$(this.appealForm, 'send')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.initSend();
  }

  private initSend(): void {
    this.aclService.send$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap(() => this.appealForm.disable()),
        switchMap(() => {
          if (!this.appeal()) {
            return this.achService.create$();
          }

          return this.achService.edit$();
        }),
        catchError(() => {
          this.initSend();

          this.appealForm.enable();

          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.appealForm.enable();

        this.notification.success(
          translate('appeal.success.title'),
          translate('appeal.success.description'),
        );

        this.router.navigate([RootRoute.MAIN, MainRoute.APPEAL]);
      });
  }
}
