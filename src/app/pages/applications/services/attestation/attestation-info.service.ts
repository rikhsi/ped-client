import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CertificatesApiService, SeasonApiService } from '@api/controllers';
import {
  AttestationType,
  BaseResult,
  Certificate,
  EduDirection,
  PedagogueCategory,
  SubjectShortItem,
} from '@api/models';
import { Languages } from '@constants';
import { AuthService } from '@core/services';
import { translate } from '@jsverse/transloco';
import {
  ATTESTATION_DIRECT_STEPS,
  ATTESTATION_ANOTHER_ONE_STEPS,
  ATTESTATION_DEFAULT_STEPS,
} from '@layouts/data';
import { ApplicationForm } from '@layouts/models';
import { ApplicationFormLayoutService } from '@layouts/services';

import { AttestationInfoForm } from '@pages/applications/models';
import { transformBoolToText } from '@pages/applications/utils';
import { pregnantValidator } from '@pages/applications/validators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  Observable,
  of,
  switchMap,
  tap,
  catchError,
  startWith,
  Subject,
} from 'rxjs';

@Injectable()
export class AttestationInfoService {
  readonly subjects = signal<SubjectShortItem[]>([]);
  readonly languages = signal<Languages[]>([]);
  readonly attestationTypeList = signal<AttestationType[]>([]);
  readonly attestationTypeHideList = signal<AttestationType[]>([]);
  readonly certificate = signal<Certificate>(null);

  readonly reset$ = new Subject<void>();

  private readonly silent = { emitEvent: false };

  readonly form = new FormGroup<AttestationInfoForm>({
    subjectId: new FormControl(null, Validators.required),
    language: new FormControl(
      { value: null, disabled: true },
      Validators.required,
    ),
    attestationType: new FormControl(
      { value: null, disabled: true },
      Validators.required,
    ),
    category: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
  });

  readonly agreementForm = new FormGroup({
    noPregnant: new FormControl(null),
    yearTeacher: new FormControl(null),
    ministry: new FormControl(null),
    injured: new FormControl(null),
  });

  constructor(
    private seasonApi: SeasonApiService,
    private certificateApi: CertificatesApiService,
    private aclService: ApplicationFormLayoutService,
    private notification: NzNotificationService,
    private authService: AuthService,
  ) {}

  /** Загружаем subjects */
  public loadSubjects$(
    seasonId: number,
    eduDirection: EduDirection,
  ): Observable<BaseResult<SubjectShortItem[]>> {
    return this.seasonApi
      .getSeasonSubjects$(seasonId, eduDirection)
      .pipe(tap(({ result }) => this.subjects.set(result)));
  }

  /** Листенер выбора subject */
  public initSubjectListener$(): Observable<BaseResult<Certificate>> {
    return this.form.controls.subjectId.valueChanges.pipe(
      tap(() => {
        // Сбрасываем и блокируем нижние уровни
        this.languages.set([]);
        this.form.controls.language.reset(null, this.silent);
        this.form.controls.attestationType.reset(null);
        this.form.controls.language.disable(this.silent);
        this.form.controls.attestationType.disable(this.silent);
        this.attestationTypeHideList.set([]);
        this.certificate.set(null);
      }),
      switchMap((subjectId) => {
        const isDisabled = this.subjects().find(
          (s) => s.id === subjectId,
        )?.disabled;

        if (
          isDisabled &&
          subjectId !== this.aclService.application()?.subject?.id
        ) {
          this.notification.warning(
            translate('has_subject.title'),
            translate('has_subject.description'),
          );
        }

        if (
          (!subjectId || isDisabled) &&
          subjectId !== this.aclService.application()?.subject?.id
        )
          return of(null);

        const subject = this.subjects().find((s) => s.id === subjectId);
        if (subject?.languages?.length) this.languages.set(subject.languages);

        return this.certificateApi
          .getCertificateBySubject$(subjectId, false)
          .pipe(
            tap(({ result }) => {
              if (subject?.languages?.length) {
                this.form.controls.language.enable(this.silent);
              }

              this.setAttestationTypeFromCertificate(result);
            }),
            catchError(() => {
              this.form.controls.language.enable(this.silent);

              this.form.controls.category.setValue(
                PedagogueCategory.SPECIALIST,
                this.silent,
              );

              return of(null);
            }),
          );
      }),
    );
  }

  /** Листенер выбора language */
  public initLanguageListener$(): Observable<Languages | null> {
    return this.form.controls.language.valueChanges.pipe(
      tap((language) => {
        this.form.controls.attestationType.disable();

        if (language) this.form.controls.attestationType.enable();
      }),
    );
  }

  /** Листенер выбора language */
  public initAttestationTypeListener$(): Observable<AttestationType | null> {
    const { injured, yearTeacher, ministry, noPregnant } =
      this.agreementForm.controls;

    const season = this.aclService.season();

    return this.form.controls.attestationType.valueChanges.pipe(
      startWith(this.form.controls.attestationType.getRawValue()),
      tap((attestationType) => {
        switch (attestationType) {
          case AttestationType.DIRECT: {
            this.aclService.steps.set(ATTESTATION_DIRECT_STEPS);

            injured.removeValidators([Validators.required]);
            yearTeacher.removeValidators([Validators.required]);
            ministry.removeValidators([Validators.required]);

            noPregnant.removeValidators([
              Validators.required,
              pregnantValidator,
            ]);

            break;
          }

          case AttestationType.ANOTHERONE: {
            this.aclService.steps.set(ATTESTATION_ANOTHER_ONE_STEPS);

            injured.setValidators([Validators.required]);

            if (season?.showTeacherOfTheYearOption) {
              yearTeacher.setValidators([Validators.required]);
            }

            if (season.showMinisterFundAllowanceOption) {
              ministry.setValidators([Validators.required]);
            }

            if (!this.authService.user()?.gender) {
              noPregnant.setValidators([
                Validators.required,
                pregnantValidator,
              ]);
            }

            break;
          }

          default: {
            this.aclService.steps.set(ATTESTATION_DEFAULT_STEPS);

            injured.setValidators([Validators.required]);

            if (season?.showTeacherOfTheYearOption) {
              yearTeacher.setValidators([Validators.required]);
            }

            if (season.showMinisterFundAllowanceOption) {
              ministry.setValidators([Validators.required]);
            }

            noPregnant.removeValidators([
              Validators.required,
              pregnantValidator,
            ]);

            break;
          }
        }

        // ⚠️ обязательно пересчитать каждый контрол
        injured.updateValueAndValidity({ emitEvent: true });
        yearTeacher.updateValueAndValidity({ emitEvent: true });
        ministry.updateValueAndValidity({ emitEvent: true });
        noPregnant.updateValueAndValidity({ emitEvent: true });
      }),
    );
  }

  /** Инициализация формы (edit mode или create) */
  public initForm(
    attestationTypes: AttestationType[],
    mainForm: FormGroup<ApplicationForm>,
  ) {
    // Берём subjectId и language только из mainForm

    const {
      subjectId,
      language,
      attestationData: {
        hasDisability,
        applyForTeacherOfTheYear,
        applyForMinisterFundAllowance,
      },
    } = mainForm.getRawValue();
    const attestationType =
      mainForm.getRawValue().attestationData?.attestationType;

    // Сигнал со списком типов аттестации
    this.attestationTypeList.set(attestationTypes);

    // Патчим форму значениями
    this.form.patchValue(
      {
        subjectId,
        language,
        attestationType,
      },
      this.silent,
    );

    this.agreementForm.patchValue(
      {
        injured: transformBoolToText(hasDisability),
        yearTeacher: transformBoolToText(applyForTeacherOfTheYear),
        ministry: transformBoolToText(applyForMinisterFundAllowance),
      },
      this.silent,
    );

    // --- Блокируем поля перед API ---
    this.form.controls.language.disable(this.silent);
    this.form.controls.attestationType.disable(this.silent);

    // --- Вручную делаем API-запрос для включения language ---
    const subject = this.subjects().find((s) => s.id === subjectId);
    if (subject?.languages?.length) this.languages.set(subject.languages);

    this.certificate.set(null);

    if (subject?.id) {
      this.certificateApi.getCertificateBySubject$(subjectId, false).subscribe({
        next: ({ result }) => {
          // Разблокируем language если есть
          if (subject?.languages?.length) {
            this.form.controls.language.enable(this.silent);
          }

          this.setAttestationTypeFromCertificate(result);

          // Если language уже задан и attestationType есть, разблокируем поле
          if (language && attestationType) {
            this.form.controls.attestationType.enable();
          }

          this.reset$.next();
        },
        error: () => {
          this.form.controls.language.enable();

          this.form.controls.category.setValue(
            PedagogueCategory.SPECIALIST,
            this.silent,
          );

          this.reset$.next();
        },
      });
    }
  }

  private setAttestationTypeFromCertificate(certificate: Certificate) {
    this.attestationTypeHideList.set([]);
    this.certificate.set(certificate);

    const { certificateValidateDate } = this.aclService.season();

    const validateDate = certificateValidateDate
      ? new Date(certificateValidateDate)
      : null;

    const expireDate = certificate.expireDate
      ? new Date(certificate.expireDate)
      : null;

    let typeToSet: AttestationType | null = null;

    this.form.patchValue({
      category: certificate?.serial?.category,
    });

    /**
     * БИЗНЕС-ЛОГИКА:
     * expireDate <= certificateValidateDate → ПРОСРОЧЕН
     */
    let isValid = true;

    if (!certificate.isEndless && validateDate && expireDate) {
      if (expireDate <= validateDate) {
        isValid = false;
      }
    }

    if (isValid) {
      if (this.attestationTypeList().includes(AttestationType.EXTRAORDINARY)) {
        typeToSet = AttestationType.EXTRAORDINARY;
        this.attestationTypeHideList.set([AttestationType.ANOTHERONE]);
      }
    } else {
      if (this.attestationTypeList().includes(AttestationType.ANOTHERONE)) {
        typeToSet = AttestationType.ANOTHERONE;
        this.attestationTypeHideList.set([AttestationType.EXTRAORDINARY]);
      }
    }

    if (typeToSet !== null) {
      this.form.controls.attestationType.setValue(typeToSet);
    }
  }

  public initResetter$(): Observable<Object> {
    return this.form.valueChanges.pipe(
      tap(() => {
        this.aclService.applicationForm.patchValue({
          attestationData: {
            dtmCertificateId: null,
            nationalCertificateId: null,
            usePrivilege: null,
          },
          privilegeId: null,
          attachedFiles: [],
          externalId: null,
        });

        this.aclService.attestationHelperForm.patchValue({
          privelegeFileType: null,
          privilegeFile: null,
        });

        this.aclService.dtmCertificate.set(null);
        this.aclService.privilege.set(null);
        this.aclService.nationalCertificate.set(null);
      }),
    );
  }
}
