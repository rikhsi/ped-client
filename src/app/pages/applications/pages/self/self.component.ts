import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApplicationAgreementCardComponent,
  ApplicationSelfBoxComponent,
  ApplicationSelfTopComponent,
  ApplicationSelfUserComponent,
} from '@pages/applications/components';
import {
  ItemComponent,
  ItemFileComponent,
  ModalConfirmComponent,
} from '@shared/components';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { AuthService } from '@core/services';
import { ApplicationItem, ApplicationStatus, PaymentInfo } from '@api/models';
import { ApplicationsApiService, PaymentApiService } from '@api/controllers';
import { downloadBlob } from '@shared/utils';
import {
  DaysToRemainingDaysPipe,
  DaysToRemainingMonthsPipe,
  DaysToYearsPipe,
  EnumItemPipe,
  FileTypePipe,
  PluralizePipe,
} from '@shared/pipes';
import {
  HasTyPipe,
  ResultDirectionPipe,
  ResultTotalPipe,
  SumPayedAmountPipe,
} from '@pages/applications/pipes';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ApplicationRoute, MainRoute, RootRoute } from '@constants';
import { APPLICATION_TYPE_TO_ROUTE } from '@pages/applications/data';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmModal } from '@typings';
import { filter, switchMap, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import {
  PaymentBtnEnableDirective,
  ExternalDirective,
} from '@pages/applications/directives';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'ped-self',
  imports: [
    ApplicationSelfTopComponent,
    ItemComponent,
    ApplicationSelfBoxComponent,
    TranslocoDirective,
    ApplicationSelfUserComponent,
    EnumItemPipe,
    SumPayedAmountPipe,
    DecimalPipe,
    NzButtonComponent,
    PluralizePipe,
    NzIconDirective,
    ItemFileComponent,
    FileTypePipe,
    DaysToYearsPipe,
    DaysToRemainingMonthsPipe,
    DatePipe,
    PluralizePipe,
    ResultDirectionPipe,
    ResultTotalPipe,
    HasTyPipe,
    DaysToRemainingDaysPipe,
    ApplicationAgreementCardComponent,
    FormsModule,
    PaymentBtnEnableDirective,
    ExternalDirective,
    NzDropdownModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzButtonModule,
    NzAlertModule,
  ],
  templateUrl: './self.component.html',
  styleUrl: './self.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfComponent implements OnInit {
  readonly user = computed(() => this.authService.user());

  readonly application = signal<ApplicationItem>(null);
  readonly isSurveyLoading = signal<boolean>(false);
  readonly isCheckLoading = signal<boolean>(false);
  readonly isPaymentLoading = signal<boolean>(false);
  readonly paymentInfos = signal<PaymentInfo[]>([]);
  readonly updatedInvoiceSerial = signal<string>('');

  readonly lastStatus = computed(() =>
    this.application()?.histories.find(
      (item) => item.status === this.application()?.status,
    ),
  );

  readonly activeInvoice = model<PaymentInfo>();

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private applicationApi: ApplicationsApiService,
    private router: Router,
    private nmService: NzModalService,
    private notification: NzNotificationService,
    private paymentApi: PaymentApiService,
  ) {}

  ngOnInit(): void {
    this.initApplication();
    this.loadPaymentInfos();
  }

  onEdit(): void {
    const applicationName =
      APPLICATION_TYPE_TO_ROUTE[this.application()?.applicationType];

    this.router.navigate([
      RootRoute.MAIN,
      MainRoute.APPLICATIONS,
      ApplicationRoute.FORM,
      this.application()?.season?.id,
      applicationName,
      this.application()?.id,
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
          title: translate('cancel_app.title'),
          description: translate('cancel_app.description'),
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
        switchMap(() =>
          this.applicationApi.cancelApplication$(this.application()?.id),
        ),
      )
      .subscribe({
        next: () => {
          this.notification.success(
            translate('cancel_app.success.title'),
            translate('cancel_app.success.desc'),
          );

          window.location.reload();
        },
      });
  }

  public loadSurveFile(): void {
    const { id, applicationNumber } = this.application();

    this.isSurveyLoading.set(true);

    this.applicationApi.getApplicationSurveyFile$(id).subscribe({
      next: (result) => {
        downloadBlob(result, applicationNumber);

        this.isSurveyLoading.set(false);
      },
      error: () => {
        this.isSurveyLoading.set(false);
      },
    });
  }

  public loadCheck(): void {
    const { paymentInfo } = this.application();

    this.isCheckLoading.set(true);

    this.paymentApi.getCheckFile$(paymentInfo?.id).subscribe({
      next: (result) => {
        downloadBlob(result, `${this.application()?.applicationNumber}-check`);

        this.isCheckLoading.set(false);
      },
      error: () => {
        this.isCheckLoading.set(false);
      },
    });
  }

  public loadPaymnetRedirect(): void {
    const { id } = this.application();

    if (!this.user()?.phoneNumber) {
      this.notification.warning(
        translate('no_phone.warning.title'),
        translate('no_phone.warning.desc'),
      );
    } else {
      this.isPaymentLoading.set(true);

      this.applicationApi
        .getApplicationPaymentUrl$({
          applicationId: id,
          callbackUrl: location.href,
          phoneNumber: this.user()?.phoneNumber?.replace(/\s+/g, ''),
        })
        .subscribe({
          next: ({ result }) => {
            window.open(result.redirectUrl, '_self');

            this.isPaymentLoading.set(false);
          },
          error: () => {
            this.isPaymentLoading.set(false);
          },
        });
    }
  }

  public reUseInvoice(applicationId: number, paymentInfo: PaymentInfo): void {
    this.applicationApi
      .reUseApplicationInvoice$(applicationId, paymentInfo.id)
      .pipe(
        tap(() => {
          this.updatedInvoiceSerial.set(paymentInfo.billingDetail.serial);
          this.notification.success(
            translate('invoice.changed.title'),
            translate('invoice.changed.desc'),
          );
        }),
      )
      .subscribe();
  }

  private loadPaymentInfos(): void {
    const {
      application: { status, season },
    } = this.route.snapshot.data;

    if (status == ApplicationStatus.WAITING_PAYMENT) {
      this.paymentApi
        .getFreeInvoices$(season.id)
        .pipe(
          tap((result) =>
            this.paymentInfos.set(result.filter((item) => item.isPayed)),
          ),
        )
        .subscribe();
    }
  }

  private initApplication(): void {
    const { application } = this.route.snapshot.data;

    this.application.set(application);
  }
}
