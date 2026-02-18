import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ApplicationFileType } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import { ApplicationDropFileComponent } from '@pages/applications/components';
import { AttestationAdditionalFileService } from '@pages/applications/services/attestation';

@Component({
  selector: 'ped-additional-file',
  imports: [
    TranslocoDirective,
    ApplicationDropFileComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './additional-file.component.html',
  styleUrl: './additional-file.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AttestationAdditionalFileService],
})
export class AdditionalFileComponent {
  get control(): FormControl<File> {
    return this.adService.control;
  }

  constructor(
    private aclService: ApplicationFormLayoutService,
    private destroyRef: DestroyRef,
    private adService: AttestationAdditionalFileService,
  ) {}

  ngOnInit(): void {
    this.aclService
      .controlDisabledState$(this.control, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.adService.initForm();
    this.listenNext();
  }

  public removeFile(): void {
    const withoutFile = this.aclService.applicationForm.controls.attachedFiles
      .getRawValue()
      .filter((item) => item.fileType !== ApplicationFileType.ADDITIONAL);

    this.aclService.applicationForm.controls.attachedFiles.setValue(
      withoutFile,
      { emitEvent: false },
    );
  }

  private listenNext(): void {
    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.aclService.attestationHelperForm.patchValue({
          additionalFile: this.control.getRawValue(),
        });
      });
  }
}
