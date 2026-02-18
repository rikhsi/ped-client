import { computed, Injectable, signal } from '@angular/core';
import { filter, merge, Observable, startWith, Subject, tap } from 'rxjs';
import {
  ApplicationStep,
  AppealForm,
  ApplicationBtn,
  ApplicationBtnData,
  ApplicationBtnName,
} from '../models';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  AppealItem,
  ApplicationTOYItem,
  ComplaintItem,
  ComplaintVariant,
} from '@api/models';
import { getDeepestActiveRoute } from '@shared/utils';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { APPEAL_STEPS } from '../data';

@Injectable({
  providedIn: 'root',
})
export class AppealFormLayoutService {
  readonly appealForm = new FormGroup<AppealForm>({
    applicationId: new FormControl(null, [Validators.required]),
    complaintVariantId: new FormControl(null, [Validators.required]),
    comment: new FormControl(null, [Validators.required]),
  });

  readonly cancel$ = new Subject<void>();
  readonly back$ = new Subject<void>();
  readonly next$ = new Subject<void>();
  readonly send$ = new Subject<void>();

  readonly currentStepIndex = signal<number>(0);
  readonly steps = signal<ApplicationStep[]>(APPEAL_STEPS);

  readonly application = signal<ApplicationTOYItem>(null);
  readonly appeal = signal<AppealItem>(null);

  readonly complaint = signal<ComplaintItem>(null);
  readonly selectedComplaintVariant = signal<ComplaintVariant>(null);

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
        this.router.navigate(['/main/appeal']);
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
            show: buttons?.cancel,
            disabled: false,
            loading: false,
          },
          back: {
            show: buttons?.back,
            disabled: false,
            loading: false,
          },
          next: {
            show: buttons?.next,
            disabled: true,
            loading: false,
          },
          send: {
            show: buttons?.send,
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
    this.appealForm.reset({}, { emitEvent: false });

    this.currentStepIndex.set(0);
    this.application.set(null);
    this.appeal.set(null);

    this.buttons.set({
      cancel: { show: false, disabled: false, loading: false },
      back: { show: false, disabled: false, loading: false },
      next: { show: false, disabled: true, loading: false },
      send: { show: false, disabled: true, loading: false },
    });
  }
}
