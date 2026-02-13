import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFileType } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import {
  ApplicationDiplomaFormComponent,
  ApplicationDropFileComponent,
} from '@pages/applications/components';
import { AttestationDiplomaService } from '@pages/applications/services/attestation';

@Component({
  selector: 'ped-diploma',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    ApplicationDiplomaFormComponent,
    ApplicationDropFileComponent,
  ],
  templateUrl: './diploma.component.html',
  styleUrl: './diploma.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AttestationDiplomaService],
})
export class DiplomaComponent implements OnInit {
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
    private adService: AttestationDiplomaService,
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
        .listenControl$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();

      this.adService
        .initResetter$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });
  }

  public removeDiplomaFile(): void {
    const withoutDiplomaFile =
      this.aclService.applicationForm.controls.attachedFiles
        .getRawValue()
        .filter((item) => item.fileType !== ApplicationFileType.DIPLOMA);

    this.aclService.applicationForm.controls.attachedFiles.setValue(
      withoutDiplomaFile,
      { emitEvent: false },
    );
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
