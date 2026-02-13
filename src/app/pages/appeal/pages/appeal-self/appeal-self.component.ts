import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemComponent, ModalConfirmComponent } from '@shared/components';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '@core/services';
import { AppealItem } from '@api/models';
import { AppealsApiService } from '@api/controllers';
import { downloadBlob } from '@shared/utils';
import { AppealRoute, MainRoute, RootRoute } from '@constants';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModal } from '@typings';
import { filter, switchMap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  AppealSelfBoxComponent,
  AppealSelfTopComponent,
  AppealSelfUserComponent,
} from '@pages/appeal/components';
import { EnumItemPipe } from '@shared/pipes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ped-appeal-self',
  imports: [
    AppealSelfBoxComponent,
    ItemComponent,
    AppealSelfTopComponent,
    AppealSelfUserComponent,
    TranslocoDirective,
    EnumItemPipe,
    DatePipe,
  ],
  templateUrl: './appeal-self.component.html',
  styleUrl: './appeal-self.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealSelfComponent implements OnInit {
  readonly user = computed(() => this.authService.user());

  readonly appeal = signal<AppealItem>(null);
  readonly isSurveyLoading = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private appealApiService: AppealsApiService,
    private router: Router,
    private nmService: NzModalService,
    private notification: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.initApplication();
  }

  onEdit(): void {
    this.router.navigate([
      RootRoute.MAIN,
      MainRoute.APPEAL,
      AppealRoute.FORM,
      this.appeal()?.id,
    ]);
  }

  onCancel(): void {
    this.nmService
      .create<ModalConfirmComponent, ConfirmModal, boolean>({
        nzWidth: 480,
        nzFooter: null,
        nzTitle: '',
        nzClosable: false,
        nzCentered: true,
        nzAutofocus: null,
        nzWrapClassName: 'custom-modal',
        nzBodyStyle: { padding: '12px', background: '#fff' },
        nzData: {
          title: translate('cancel_appeal.title'),
          description: translate('cancel_appeal.description'),
          cancel: {
            title: translate('action.cancel'),
            danger: false,
          },
          submit: {
            title: translate('action.logout'),
            danger: true,
          },
        },
        nzContent: ModalConfirmComponent,
      })
      .afterClose.pipe(
        filter((state) => !!state),
        switchMap(() => this.appealApiService.cancelAppeal$(this.appeal()?.id)),
      )
      .subscribe({
        next: () => {
          this.notification.success(
            translate('cancel_appeal.success.title'),
            translate('cancel_appeal.success.desc'),
          );

          window.location.reload();
        },
      });
  }

  public loadSurveFile(): void {
    const {
      id,
      application: { applicationNumber },
    } = this.appeal();

    this.isSurveyLoading.set(true);

    this.appealApiService.getAppealSurveyFile$(id).subscribe({
      next: (result) => {
        downloadBlob(result, applicationNumber);

        this.isSurveyLoading.set(false);
      },
      error: () => {
        this.isSurveyLoading.set(false);
      },
    });
  }

  private initApplication(): void {
    const { appeal } = this.route.snapshot.data;

    this.appeal.set(appeal);
  }
}
