import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RootRoute, MainRoute } from '@constants';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import { MMTVCheckService } from '@pages/applications/services/mmtv';
import { ItemFileComponent } from '@shared/components';
import {
  FullnamePipe,
  GenderPipe,
  EnumItemPipe,
  FileToUrlPipe,
  FileTypePipe,
  FileNamePipe,
} from '@shared/pipes';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { tap, switchMap, catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'ped-mmtv-check',
  imports: [
    TranslocoDirective,
    FullnamePipe,
    DatePipe,
    GenderPipe,
    EnumItemPipe,
    ItemFileComponent,
    FileToUrlPipe,
    FileTypePipe,
    FileNamePipe,
  ],
  templateUrl: './mmtv-check.component.html',
  styleUrl: './mmtv-check.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MMTVCheckService],
})
export class MmtvCheckComponent {
  readonly user = computed(() => this.achService.user());
  readonly diploma = computed(() => this.aclService.diploma());
  readonly institution = computed(() => this.aclService.institution());
  readonly season = computed(() => this.aclService.season());
  readonly certificate = computed(() => this.aclService.certificate());
  readonly privilege = computed(() => this.aclService.privilege());
  readonly dtmCertificate = computed(() => this.aclService.dtmCertificate());
  readonly nationalCertificate = computed(() =>
    this.aclService.nationalCertificate(),
  );
  readonly subject = computed(() => this.aclService.subject());
  readonly application = computed(() => this.aclService.application());

  get applicationForm() {
    return this.aclService.applicationForm;
  }

  get attestationHelperForm() {
    return this.aclService.attestationHelperForm;
  }

  constructor(
    private aclService: ApplicationFormLayoutService,
    private destroyRef: DestroyRef,
    private achService: MMTVCheckService,
    private router: Router,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.aclService
      .controlDisabledState$(
        this.aclService.applicationForm.controls.subjectId,
        'send',
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.initSend();
  }

  private initSend(): void {
    this.aclService.send$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap(() => this.aclService.applicationForm.disable()),
        switchMap(() => {
          if (!this.application()) {
            return this.achService.create$();
          }

          return this.achService.edit$();
        }),
        catchError(() => {
          this.initSend();

          this.aclService.applicationForm.enable();

          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.aclService.applicationForm.enable();

        this.notification.success(
          translate('application.success.title'),
          translate('application.success.description'),
        );

        this.router.navigate([RootRoute.MAIN, MainRoute.APPLICATIONS]);
      });
  }
}
