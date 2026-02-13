import { computed, Injectable, signal } from '@angular/core';
import { filter, merge, Observable, startWith, Subject, tap } from 'rxjs';
import {
  ApplicationBtn,
  ApplicationBtnData,
  ApplicationBtnName,
  ApplicationForm,
  ApplicationStep,
  AttestationHelperForm,
} from '../models';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  ApplicationItem,
  Certificate,
  DiplomaItem,
  NationalCertificate,
  PrivilegeItem,
  Season,
  StcCertificate,
  SubjectShortItem,
  InstitutionShortItem,
} from '@api/models';
import { getDeepestActiveRoute } from '@shared/utils';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  attestationCertificateValidator,
  privilegeRequiredForDirectAttestationValidator,
} from '../validators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationFormLayoutService {
  readonly applicationForm = new FormGroup<ApplicationForm>(
    {
      institutionId: new FormControl(null, [Validators.required]),
      privilegeId: new FormControl(null),
      subjectId: new FormControl(null, [Validators.required]),
      externalId: new FormControl(null),
      diplomaId: new FormControl(null, [Validators.required]),
      attachedFiles: new FormControl([]),
      category: new FormControl(null, [Validators.required]),
      language: new FormControl(null, [Validators.required]),
      attestationData: new FormGroup(
        {
          attestationType: new FormControl(null, [Validators.required]),
          dtmCertificateId: new FormControl(null),
          nationalCertificateId: new FormControl(null),
          usePrivilege: new FormControl(null),
          applyForTeacherOfTheYear: new FormControl(false),
          applyForMinisterFundAllowance: new FormControl(false),
          hasDisability: new FormControl(false),
        },
        {
          validators: attestationCertificateValidator,
        },
      ),
    },
    {
      validators: privilegeRequiredForDirectAttestationValidator,
    },
  );

  readonly attestationHelperForm = new FormGroup<AttestationHelperForm>({
    eduDirection: new FormControl(null, [Validators.required]),
    districtId: new FormControl(null, [Validators.required]),
    regionId: new FormControl(null, [Validators.required]),
    privelegeFileType: new FormControl(null),
    privilegeFile: new FormControl(null),
    diplomaFile: new FormControl(null),
    additionalFile: new FormControl(null),
  });

  readonly cancel$ = new Subject<void>();
  readonly back$ = new Subject<void>();
  readonly next$ = new Subject<void>();
  readonly send$ = new Subject<void>();

  readonly currentStepIndex = signal<number>(0);
  readonly steps = signal<ApplicationStep[]>([]);

  readonly season = signal<Season>(null);
  readonly certificate = signal<Certificate>(null);
  readonly privilege = signal<PrivilegeItem>(null);
  readonly nationalCertificate = signal<NationalCertificate>(null);
  readonly dtmCertificate = signal<StcCertificate>(null);
  readonly subject = signal<SubjectShortItem>(null);
  readonly institution = signal<InstitutionShortItem>(null);
  readonly diploma = signal<DiplomaItem>(null);
  readonly application = signal<ApplicationItem>(null);

  readonly buttons = signal<ApplicationBtn>({
    cancel: { show: false, disabled: false, loading: false },
    back: { show: false, disabled: false, loading: false },
    next: { show: false, disabled: true, loading: false },
    send: { show: false, disabled: true, loading: false },
  });

  readonly nextStep = computed(() =>
    this.steps().at(this.currentStepIndex() + 1),
  );

  readonly prevStep = computed(() =>
    this.steps().at(this.currentStepIndex() - 1),
  );

  constructor(private router: Router) {}

  public initNext$(): Observable<void> {
    return this.next$.pipe(
      tap(() => {
        const nextStep = this.nextStep();

        if (nextStep) {
          this.router
            .navigate([nextStep.route], {
              relativeTo: getDeepestActiveRoute(this.router.routerState.root)
                .parent,
            })
            .then(() => {
              this.currentStepIndex.update((index) => index + 1);

              this.initCurrentIndex();
            });
        }
      }),
    );
  }

  public initBack$(): Observable<void> {
    return this.back$.pipe(
      tap(() => {
        const prevStep = this.prevStep();

        if (prevStep) {
          this.router
            .navigate([prevStep.route], {
              relativeTo: getDeepestActiveRoute(this.router.routerState.root)
                .parent,
            })
            .then(() => {
              this.currentStepIndex.update((index) => index - 1);

              this.initCurrentIndex();
            });
        }
      }),
    );
  }

  public initCancel$(): Observable<void> {
    return this.cancel$.pipe(
      tap(() => {
        this.router.navigate(['/main/applications']);
      }),
    );
  }

  public initSend$(): Observable<void> {
    return this.send$.pipe(tap(() => {}));
  }

  public initRouteButtonsListener$(
    route: ActivatedRoute,
  ): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      tap(() => {
        const activeRoute = getDeepestActiveRoute(route);

        const buttons: ApplicationBtnData =
          activeRoute.snapshot.data?.['buttons'] ?? null;

        this.buttons.set({
          cancel: {
            show: buttons.cancel,
            disabled: false,
            loading: false,
          },
          back: {
            show: buttons.back,
            disabled: false,
            loading: false,
          },
          next: {
            show: buttons.next,
            disabled: true,
            loading: false,
          },
          send: {
            show: buttons.send,
            disabled: true,
            loading: false,
          },
        });

        this.initCurrentIndex();
      }),
    );
  }

  public controlDisabledState$(
    controls: AbstractControl | AbstractControl[],
    action: ApplicationBtnName,
  ): Observable<void> {
    const controlsArray = Array.isArray(controls) ? controls : [controls];

    return merge(
      ...controlsArray.map((control) =>
        control.valueChanges.pipe(startWith(control.value)),
      ),
    ).pipe(
      tap(() => {
        const isDisabled = controlsArray.some(
          (control) => control.disabled || control.invalid,
        );

        this.buttons.update((cur) => {
          if (cur) {
            cur[action].disabled = isDisabled;
          }
          return cur;
        });
      }),
    );
  }
  public controlLoadingState$(
    controls: AbstractControl | AbstractControl[],
    action: ApplicationBtnName,
  ): Observable<void> {
    const controlsArray = Array.isArray(controls) ? controls : [controls];

    return merge(
      ...controlsArray.map((control) =>
        control.valueChanges.pipe(startWith(control.value)),
      ),
    ).pipe(
      tap(() => {
        const isLoading = controlsArray.some((control) => control.disabled);

        this.buttons.update((cur) => {
          if (cur) {
            cur[action].loading = isLoading;
          }
          return cur;
        });
      }),
    );
  }

  public initCurrentIndex(): void {
    const lastSegment = this.router.url
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .filter(Boolean)
      .pop();

    const index = this.steps().findIndex((step) => step.route === lastSegment);

    this.currentStepIndex.set(index);
  }

  public clearState(): void {
    this.applicationForm.reset(
      {
        attachedFiles: [],
        attestationData: {
          applyForMinisterFundAllowance: false,
          applyForTeacherOfTheYear: false,
          hasDisability: false,
        },
      },
      { emitEvent: false },
    );
    this.attestationHelperForm.reset(null, { emitEvent: false });
    this.season.set(null);
    this.certificate.set(null);
    this.privilege.set(null);
    this.nationalCertificate.set(null);
    this.dtmCertificate.set(null);
    this.subject.set(null);
    this.institution.set(null);
    this.diploma.set(null);

    this.currentStepIndex.set(0);
    this.steps.set([]);
    this.application.set(null);

    this.buttons.set({
      cancel: { show: false, disabled: false, loading: false },
      back: { show: false, disabled: false, loading: false },
      next: { show: false, disabled: true, loading: false },
      send: { show: false, disabled: true, loading: false },
    });
  }
}
