import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import {
  ApplicationDiplomaFormComponent,
  ApplicationDropFileComponent,
} from '@pages/applications/components';
import { MmtvDiplomaService } from '@pages/applications/services/mmtv';

@Component({
  selector: 'ped-mmtv-diploma',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    ApplicationDiplomaFormComponent,
    ApplicationDropFileComponent,
  ],
  templateUrl: './mmtv-diploma.component.html',
  styleUrl: './mmtv-diploma.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MmtvDiplomaService],
})
export class MmtvDiplomaComponent implements OnInit {
  readonly diplomas = computed(() => this.adService.diplomas());

  get control(): FormControl<number> {
    return this.adService.control;
  }

  get diplomaFile(): FormControl<File> {
    return this.adService.diplomaFile;
  }

  constructor(
    private aclService: ApplicationFormLayoutService,
    private destroyRef: DestroyRef,
    private adService: MmtvDiplomaService,
  ) {}

  ngOnInit(): void {
    this.aclService
      .controlDisabledState$(this.control, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.adService.loadDiplomas$().subscribe(() => {
      this.listenNext();

      this.adService.initForm(
        this.aclService.applicationForm.controls.diplomaId.getRawValue(),
      );

      this.adService
        .initResetter$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });
  }

  private listenNext(): void {
    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const selectedDiploma = this.diplomas().find(
          (item) => item.id === this.control.getRawValue(),
        );

        this.aclService.applicationForm.patchValue({
          diplomaId: this.control.getRawValue(),
        });

        this.aclService.attestationHelperForm.patchValue({
          diplomaFile: this.diplomaFile.getRawValue(),
        });

        this.aclService.diploma.set(selectedDiploma);
      });
  }
}
