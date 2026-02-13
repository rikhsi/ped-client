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
import { RouteParam } from '@constants';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import { ApplicationInstitutionFormComponent } from '@pages/applications/components';
import { MmtvInstitutionService } from '@pages/applications/services/mmtv';
import { ItemComponent, SelectDefaultComponent } from '@shared/components';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'ped-mmtv-institution',
  imports: [
    TranslocoDirective,
    ReactiveFormsModule,
    ApplicationInstitutionFormComponent,
    ItemComponent,
    SelectDefaultComponent,
    NzOptionComponent,
  ],
  templateUrl: './mmtv-institution.component.html',
  styleUrl: './mmtv-institution.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MmtvInstitutionService],
})
export class MmtvInstitutionComponent implements OnInit {
  readonly regions = computed(() => this.aifService.regions());
  readonly districts = computed(() => this.aifService.districts());
  readonly eduDirections = computed(() => this.aifService.directions());
  readonly institutions = computed(() => this.aifService.institutions());
  readonly subjects = computed(() => this.aifService.subjects());

  readonly isRegionLoading = computed(() => this.aifService.isRegionLoading());
  readonly isDistrictLoading = computed(() =>
    this.aifService.isDistrictLoading(),
  );
  readonly isDirectionLoading = computed(() =>
    this.aifService.isDirectionLoading(),
  );
  readonly isInstitutionLoading = computed(() =>
    this.aifService.isInstitutionLoading(),
  );

  get institutionForm() {
    return this.aifService.form;
  }

  get seasonId(): number {
    return +this.route.snapshot.params[RouteParam.SEASON_ID];
  }

  constructor(
    private aclService: ApplicationFormLayoutService,
    private aifService: MmtvInstitutionService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.aifService.loadRegions(this.seasonId);
    this.aifService.loadDirections(this.seasonId);

    this.aifService
      .initRegionListener(this.seasonId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aifService
      .initDistrictListener()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aifService
      .initDirectionListener(this.seasonId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aifService.initForm(
      this.aclService.attestationHelperForm,
      this.aclService.applicationForm,
      this.aclService.subject(),
    );

    this.aclService
      .controlDisabledState$(
        [
          this.institutionForm.controls.subjectId,
          this.institutionForm.controls.institutionId,
        ],
        'next',
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.listenNext();

    this.aifService
      .initResetter$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private listenNext(): void {
    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { institutionId, eduDirection, districtId, regionId, subjectId } =
          this.institutionForm.getRawValue();

        const selectedInstitution = this.institutions().find(
          (item) => item.id === institutionId,
        );

        const currentSubject = this.subjects().find((s) => s.id === subjectId);

        this.aclService.subject.set(currentSubject);

        this.aclService.applicationForm.patchValue(
          {
            subjectId,
            institutionId,
          },
          { emitEvent: false },
        );

        this.aclService.attestationHelperForm.patchValue(
          {
            eduDirection,
            districtId,
            regionId,
          },
          { emitEvent: false },
        );

        this.aclService.institution.set(selectedInstitution);
      });
  }
}
