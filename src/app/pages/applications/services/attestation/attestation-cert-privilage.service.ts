import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileApiService } from '@api/controllers';
import { NationalCertificate, StcCertificate } from '@api/models';
import { AttestationDataForm } from '@layouts/models';
import {
  CustomNationalCertificate,
  CustomStcCertificate,
} from '@pages/applications/models';
import { certificateRequiredWhenUseValidator } from '@pages/applications/validators';
import {
  catchError,
  EMPTY,
  forkJoin,
  map,
  Observable,
  of,
  startWith,
  tap,
} from 'rxjs';

@Injectable()
export class AttestationCertPrivilageService {
  readonly nationalCertificates = signal<CustomNationalCertificate[]>([]);
  readonly stcCertificates = signal<CustomStcCertificate[]>([]);
  readonly isLoading = signal<boolean>(false);

  readonly form = new FormGroup(
    {
      certificateId: new FormControl({ value: null, disabled: true }),
      use: new FormControl(false),
    },
    {
      validators: certificateRequiredWhenUseValidator,
    },
  );

  constructor(private profileApiService: ProfileApiService) {}

  public initCertificates$(
    subjectForm: FormControl<number>,
  ): Observable<[NationalCertificate, StcCertificate]> {
    const subjectId = subjectForm.getRawValue();

    this.isLoading.set(true);

    const national$ = this.profileApiService
      .getNationalCertificatesBySubject$(subjectId, false)
      .pipe(
        map(({ result }) => result),
        catchError(() => of(null)),
      );

    const stc$ = this.profileApiService
      .getStcCertificatesBySubject$(subjectId, false)
      .pipe(
        map(({ result }) => result),
        catchError(() => of(null)),
      );

    return forkJoin([national$, stc$]).pipe(
      tap(([national, stc]) => {
        if (national) {
          this.nationalCertificates.set([
            {
              ...national,
              customId: `${national.id}-national`,
            },
          ]);
        }

        if (stc) {
          this.stcCertificates.set([
            {
              ...stc,
              customId: `${stc.id}-stc`,
            },
          ]);
        }

        this.isLoading.set(false);
      }),
      catchError(() => {
        this.isLoading.set(false);
        return EMPTY;
      }),
    );
  }

  public initUseListener$(): Observable<boolean> {
    const useControl = this.form.controls.use;
    const certificateControl = this.form.controls.certificateId;

    return useControl.valueChanges.pipe(
      startWith(useControl.value),
      tap((use) => {
        if (use) {
          certificateControl.enable({ emitEvent: false });
        } else {
          certificateControl.reset(null, { emitEvent: false });
          certificateControl.disable({ emitEvent: false });
        }
      }),
    );
  }

  public initForm(attDataForm: FormGroup<AttestationDataForm>): void {
    const { usePrivilege, nationalCertificateId, dtmCertificateId } =
      attDataForm.getRawValue();

    if (usePrivilege) {
      this.form.patchValue({
        use: usePrivilege,
        certificateId: nationalCertificateId
          ? `${nationalCertificateId}-national`
          : `${dtmCertificateId}-stc`,
      });
    }
  }
}
