import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SeasonApiService } from '@api/controllers';
import {
  BaseResult,
  EduDirection,
  SubjectShortItem,
  DistrictShortItem,
  InstitutionShortItem,
  RegionShortItem,
} from '@api/models';
import { AttestationHelperForm, ApplicationForm } from '@layouts/models';
import { ApplicationFormLayoutService } from '@layouts/services';

import { InstitutionForm } from '@pages/applications/models';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Injectable()
export class MmtvInstitutionService {
  readonly regions = signal<RegionShortItem[]>([]);
  readonly districts = signal<DistrictShortItem[]>([]);
  readonly directions = signal<EduDirection[]>([]);
  readonly institutions = signal<InstitutionShortItem[]>([]);
  readonly subjects = signal<SubjectShortItem[]>([]);
  readonly currentSubject = signal<SubjectShortItem>(null);

  readonly isRegionLoading = signal<boolean>(true);
  readonly isDistrictLoading = signal<boolean>(false);
  readonly isDirectionLoading = signal<boolean>(true);
  readonly isInstitutionLoading = signal<boolean>(false);

  readonly form = new FormGroup<
    InstitutionForm & {
      subjectId: FormControl<number>;
    }
  >({
    regionId: new FormControl(null, Validators.required),
    districtId: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    eduDirection: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    institutionId: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
    subjectId: new FormControl({ value: null, disabled: true }, [
      Validators.required,
    ]),
  });

  private readonly silent = { emitEvent: false };

  constructor(
    private seasonApi: SeasonApiService,
    private aclService: ApplicationFormLayoutService,
  ) {}

  public loadSubjects$(
    seasonId: number,
    eduDirection: EduDirection,
  ): Observable<BaseResult<SubjectShortItem[]>> {
    return this.seasonApi
      .getSeasonSubjects$(seasonId, eduDirection)
      .pipe(tap(({ result }) => this.subjects.set(result)));
  }

  public initForm(
    helperForm: FormGroup<AttestationHelperForm>,
    mainForm: FormGroup<ApplicationForm>,
    currentSubject: SubjectShortItem,
  ): void {
    const { institutionId, subjectId } = mainForm.getRawValue();

    if (subjectId) {
      const { regionId, districtId, eduDirection } = helperForm.getRawValue();

      this.form.patchValue({
        regionId,
        districtId,
        eduDirection,
        institutionId,
        subjectId,
      });

      this.currentSubject.set(currentSubject);

      // Разблокируем поля
      this.form.controls.districtId.enable(this.silent);
      this.form.controls.eduDirection.enable(this.silent);
      this.form.controls.institutionId.enable(this.silent);
    }
  }

  /* ====== loaders ====== */

  public loadRegions(seasonId: number): void {
    this.isRegionLoading.set(true);

    this.seasonApi.getSeasonRegions$(seasonId).subscribe(({ result }) => {
      this.regions.set(result);
      this.isRegionLoading.set(false);
    });
  }

  public loadDirections(seasonId: number): void {
    this.isDirectionLoading.set(true);

    this.seasonApi.getSeasonEduDirections$(seasonId).subscribe(({ result }) => {
      this.directions.set(result);
      this.isDirectionLoading.set(false);
    });
  }

  /* ====== listeners ====== */

  /** Region → Districts */
  public initRegionListener(seasonId: number): Observable<DistrictShortItem[]> {
    const { districtId, regionId, institutionId, eduDirection } =
      this.form.controls;

    return regionId.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        districtId.reset(null);

        districtId.disable(this.silent);
        eduDirection.disable(this.silent);
        institutionId.disable(this.silent);

        this.districts.set([]);
        this.institutions.set([]);
      }),
      filter(Boolean),
      tap(() => {
        districtId.enable(this.silent);
        this.isDistrictLoading.set(true);
      }),
      switchMap((regionId) =>
        this.seasonApi.getSeasonDistricts$(seasonId, regionId),
      ),
      map(({ result }) => result),
      tap((districts) => {
        this.districts.set(districts);
        this.isDistrictLoading.set(false);
      }),
    );
  }

  /** District → Directions (already loaded) */
  public initDistrictListener(): Observable<EduDirection[]> {
    const { districtId, institutionId, eduDirection } = this.form.controls;

    return districtId.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        eduDirection.reset(null);

        eduDirection.disable(this.silent);
        institutionId.disable(this.silent);

        this.institutions.set([]);
      }),
      filter(Boolean),
      tap(() => eduDirection.enable(this.silent)),
      map(() => this.directions()),
    );
  }

  /** Direction → Institutions */
  public initDirectionListener(
    seasonId: number,
  ): Observable<SubjectShortItem[]> {
    const { institutionId, districtId, eduDirection, subjectId } =
      this.form.controls;

    return eduDirection.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        institutionId.reset(null);
        institutionId.disable(this.silent);
        subjectId.reset(null);
        subjectId.disable(this.silent);

        this.institutions.set([]);
      }),
      filter(Boolean),
      tap(() => {
        institutionId.enable(this.silent);
        this.isInstitutionLoading.set(true);
      }),
      switchMap((directionId) => {
        return this.seasonApi.getSeasonInstitutions$(
          seasonId,
          districtId.getRawValue(),
          directionId,
        );
      }),
      map(({ result }) => result),
      tap((institutions) => {
        this.institutions.set(institutions);
        this.isInstitutionLoading.set(false);
      }),
      switchMap(() =>
        this.loadSubjects$(seasonId, eduDirection.getRawValue()).pipe(
          map(({ result }) => result),
          tap(() => {
            subjectId.enable();
          }),
        ),
      ),
    );
  }

  public initResetter$(): Observable<Object> {
    return this.form.valueChanges.pipe(
      tap(() => {
        this.aclService.applicationForm.patchValue({
          subjectId: null,
          language: null,
          category: null,
          attestationData: {
            attestationType: null,
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

        this.aclService.certificate.set(null);
        this.aclService.dtmCertificate.set(null);
        this.aclService.privilege.set(null);
        this.aclService.nationalCertificate.set(null);
        this.aclService.subject.set(null);
      }),
    );
  }
}
