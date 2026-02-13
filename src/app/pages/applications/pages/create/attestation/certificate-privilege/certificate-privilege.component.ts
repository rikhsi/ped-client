import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import { AttestationCertPrivilageService } from '@pages/applications/services/attestation';
import { BoxInfinite } from '@shared/components';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'ped-certificate-privilege',
  imports: [
    TranslocoDirective,
    NzRadioGroupComponent,
    NzRadioComponent,
    NgClass,
    ReactiveFormsModule,
    NzCheckboxComponent,
    BoxInfinite,
  ],
  templateUrl: './certificate-privilege.component.html',
  styleUrl: './certificate-privilege.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AttestationCertPrivilageService],
})
export class CertificatePrivilegeComponent {
  nationalCertificates = computed(() => this.adService.nationalCertificates());
  stcCertificates = computed(() => this.adService.stcCertificates());
  isLoading = computed(() => this.adService.isLoading());

  isEmpty = computed(
    () =>
      !this.nationalCertificates()?.length && !this.stcCertificates().length,
  );

  get form() {
    return this.adService.form;
  }

  constructor(
    private aclService: ApplicationFormLayoutService,
    private destroyRef: DestroyRef,
    private adService: AttestationCertPrivilageService,
  ) {}

  ngOnInit(): void {
    const { attestationData, subjectId } =
      this.aclService.applicationForm.controls;

    this.adService.initForm(attestationData);

    this.adService.initCertificates$(subjectId).subscribe();

    this.adService
      .initUseListener$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aclService
      .controlDisabledState$(this.form, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.listenNext();
  }

  private listenNext(): void {
    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { certificateId, use } = this.form.getRawValue();

        let nationalCertificateId = null;
        let dtmCertificateId = null;

        if (use && certificateId) {
          const national = this.adService
            .nationalCertificates()
            .find((c) => c.customId === certificateId);

          this.aclService.nationalCertificate.set(national);

          if (national) {
            nationalCertificateId = national.id;
          } else {
            const stc = this.adService
              .stcCertificates()
              .find((c) => c.customId === certificateId);

            this.aclService.dtmCertificate.set(stc);

            if (stc) {
              dtmCertificateId = stc.id;
            }
          }
        }

        this.aclService.applicationForm.patchValue({
          attestationData: {
            usePrivilege: use,
            nationalCertificateId,
            dtmCertificateId,
          },
        });
      });
  }
}
