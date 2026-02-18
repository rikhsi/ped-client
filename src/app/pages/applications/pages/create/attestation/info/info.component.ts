import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PRIVATE_INSTITUTION_DIRECTIONS, RouteParam } from '@constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { AttestationInfoService } from '@pages/applications/services/attestation';
import { SelectDefaultComponent, ItemComponent } from '@shared/components';
import { EnumItemPipe, EnumItemsPipe } from '@shared/pipes';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { startWith, switchMap } from 'rxjs';
import { AuthService } from '@core/services';
import { ApplicationAgreementCardComponent } from '@pages/applications/components';
import { transformTextToBool } from '@pages/applications/utils';
import { ApplicationFormLayoutService } from '@layouts/services';
import { AttestationType } from '@api/models';

@Component({
  selector: 'ped-info',
  imports: [
    SelectDefaultComponent,
    TranslocoDirective,
    ItemComponent,
    NzOptionComponent,
    ReactiveFormsModule,
    EnumItemPipe,
    DatePipe,
    NzAlertModule,
    EnumItemsPipe,
    ApplicationAgreementCardComponent,
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AttestationInfoService],
})
export class InfoComponent implements OnInit {
  readonly subjects = computed(() => this.aiService.subjects());
  readonly languages = computed(() => this.aiService.languages());
  readonly certificate = computed(() => this.aiService.certificate());
  readonly isFemale = computed(() => !this.authService.user()?.gender);
  readonly season = computed(() => this.aclService.season());
  readonly isEndless = computed(() => this.certificate()?.isEndless);

  readonly attestationTypeList = computed(() => {
    const { eduDirection } =
      this.aclService.attestationHelperForm.getRawValue();

    const isPrivateInstitution =
      PRIVATE_INSTITUTION_DIRECTIONS.includes(eduDirection);

    const list = this.aiService.attestationTypeList();
    const hideSet = new Set(this.aiService.attestationTypeHideList());

    if (isPrivateInstitution) {
      hideSet.add(AttestationType.ANOTHERONE);
    }

    return list.filter((type) => !hideSet.has(type));
  });

  get agreementForm() {
    return this.aiService.agreementForm;
  }

  get infoForm() {
    return this.aiService.form;
  }

  get seasonId(): number {
    return +this.route.snapshot.params[RouteParam.SEASON_ID];
  }

  constructor(
    private aiService: AttestationInfoService,
    private aclService: ApplicationFormLayoutService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.infoForm.controls.attestationType.valueChanges
      .pipe(
        startWith(this.infoForm.controls.attestationType.getRawValue()),
        switchMap(() => {
          return this.aclService.controlDisabledState$(
            [this.infoForm.controls.attestationType, this.agreementForm],
            'next',
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { subjectId, language, attestationType, category } =
          this.infoForm.getRawValue();

        const { injured, yearTeacher, ministry } =
          this.agreementForm.getRawValue();

        const selectedSubject = this.subjects().find(
          (item) => item.id === subjectId,
        );

        this.aclService.applicationForm.patchValue(
          {
            subjectId,
            language,
            attestationData: {
              attestationType,
              hasDisability: transformTextToBool(injured),
              applyForTeacherOfTheYear: transformTextToBool(yearTeacher),
              applyForMinisterFundAllowance: transformTextToBool(ministry),
            },
            category,
          },
          { emitEvent: false },
        );

        this.aclService.subject.set(selectedSubject);
        this.aclService.certificate.set(this.certificate());
      });

    this.aiService
      .loadSubjects$(
        this.seasonId,
        this.aclService.attestationHelperForm.getRawValue().eduDirection,
      )
      .subscribe({
        next: () => {
          this.aiService
            .initSubjectListener$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

          this.aiService
            .initLanguageListener$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

          this.aiService
            .initAttestationTypeListener$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

          this.aiService.initForm(
            this.aclService.season().attestationTypes,
            this.aclService.applicationForm,
          );

          this.aiService.reset$
            .pipe(
              switchMap(() => this.aiService.initResetter$()),
              takeUntilDestroyed(this.destroyRef),
            )
            .subscribe();
        },
      });
  }
}
