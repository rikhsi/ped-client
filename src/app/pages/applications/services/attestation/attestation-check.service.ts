import { computed, Injectable } from '@angular/core';
import { ApplicationsApiService } from '@api/controllers';
import { ApplicationFileType, ApplicationType, BaseResult } from '@api/models';
import { AuthService } from '@core/services';
import { ApplicationFormLayoutService } from '@layouts/services';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable()
export class AttestationCheckService {
  readonly applicationType = ApplicationType.ATTESTATION;

  readonly user = computed(() => this.authService.user());

  get applicationForm() {
    return this.aclService.applicationForm;
  }

  get attestationHelperForm() {
    return this.aclService.attestationHelperForm;
  }

  get attestationType() {
    const {
      attestationData: { attestationType },
    } = this.applicationForm.getRawValue();
    return attestationType;
  }

  constructor(
    private authService: AuthService,
    private applicationApi: ApplicationsApiService,
    private aclService: ApplicationFormLayoutService,
  ) {}

  public create$(): Observable<BaseResult<boolean>> {
    const privilegeFileType = ApplicationFileType.PRIVILEGE;
    const diplomaFileType = ApplicationFileType.DIPLOMA;
    const additionalFileType = ApplicationFileType.ADDITIONAL;

    const { privilegeFile, diplomaFile, additionalFile } =
      this.aclService.attestationHelperForm.getRawValue();

    const uploads: {
      fileType: ApplicationFileType;
      request$: Observable<BaseResult<string>>;
    }[] = [];

    if (privilegeFile) {
      uploads.push({
        fileType: privilegeFileType,
        request$: this.applicationApi.uploadFile$(
          privilegeFileType,
          privilegeFile,
        ),
      });
    }

    if (diplomaFile) {
      uploads.push({
        fileType: diplomaFileType,
        request$: this.applicationApi.uploadFile$(diplomaFileType, diplomaFile),
      });
    }

    if (additionalFile) {
      uploads.push({
        fileType: additionalFileType,
        request$: this.applicationApi.uploadFile$(
          additionalFileType,
          additionalFile,
        ),
      });
    }

    if (uploads.length) {
      return forkJoin(uploads.map((u) => u.request$)).pipe(
        switchMap((results) => {
          const attachedFiles = results.map((res, index) => ({
            fileId: res.result,
            fileType: uploads[index].fileType,
          }));

          this.applicationForm.patchValue(
            { attachedFiles },
            { emitEvent: false },
          );

          return this.applicationApi.createApplication$(
            this.applicationType,
            this.applicationForm.getRawValue(),
          );
        }),
      );
    }

    return this.applicationApi.createApplication$(
      this.applicationType,
      this.applicationForm.getRawValue(),
    );
  }

  public edit$(): Observable<BaseResult<boolean>> {
    const applicationId = this.aclService.application().id;

    const privilegeFileType = ApplicationFileType.PRIVILEGE;
    const diplomaFileType = ApplicationFileType.DIPLOMA;
    const additionalFileType = ApplicationFileType.ADDITIONAL;

    const { privilegeFile, diplomaFile, additionalFile } =
      this.aclService.attestationHelperForm.getRawValue();

    const uploads: {
      fileType: ApplicationFileType;
      request$: Observable<BaseResult<string>>;
    }[] = [];

    if (privilegeFile) {
      uploads.push({
        fileType: privilegeFileType,
        request$: this.applicationApi.uploadFile$(
          privilegeFileType,
          privilegeFile,
        ),
      });
    }

    if (diplomaFile) {
      uploads.push({
        fileType: diplomaFileType,
        request$: this.applicationApi.uploadFile$(diplomaFileType, diplomaFile),
      });
    }

    if (additionalFile) {
      uploads.push({
        fileType: additionalFileType,
        request$: this.applicationApi.uploadFile$(
          additionalFileType,
          additionalFile,
        ),
      });
    }

    if (uploads.length) {
      return forkJoin(uploads.map((u) => u.request$)).pipe(
        switchMap((results) => {
          const attachedFiles = results.map((res, index) => ({
            fileId: res.result,
            fileType: uploads[index].fileType,
          }));

          this.applicationForm.patchValue(
            { attachedFiles },
            { emitEvent: false },
          );

          return this.applicationApi.editApplication$(
            applicationId,
            this.applicationForm.getRawValue(),
          );
        }),
      );
    }

    return this.applicationApi.editApplication$(
      applicationId,
      this.applicationForm.getRawValue(),
    );
  }
}
