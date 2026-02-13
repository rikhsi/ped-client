import { computed, Injectable } from '@angular/core';
import { ApplicationsApiService } from '@api/controllers';
import { ApplicationFileType, ApplicationType, BaseResult } from '@api/models';
import { AuthService } from '@core/services';
import { ApplicationFormLayoutService } from '@layouts/services';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class MMTVCheckService {
  readonly applicationType = ApplicationType.MMTV;

  readonly user = computed(() => this.authService.user());

  get applicationForm() {
    return this.aclService.applicationForm;
  }

  get attestationHelperForm() {
    return this.aclService.attestationHelperForm;
  }

  constructor(
    private authService: AuthService,
    private applicationApi: ApplicationsApiService,
    private aclService: ApplicationFormLayoutService,
  ) {}

  public create$(): Observable<BaseResult<boolean>> {
    const fileType = ApplicationFileType.DIPLOMA;
    const { diplomaId, institutionId, subjectId } =
      this.applicationForm.getRawValue();
    const { diplomaFile } = this.aclService.attestationHelperForm.getRawValue();

    if (diplomaFile) {
      return this.applicationApi.uploadFile$(fileType, diplomaFile).pipe(
        switchMap(({ result }) => {
          const attachedFiles = [
            {
              fileId: result,
              fileType,
            },
          ];

          this.applicationForm.patchValue(
            {
              attachedFiles,
            },
            { emitEvent: false },
          );

          return this.applicationApi.createApplication$(this.applicationType, {
            diplomaId,
            institutionId,
            subjectId,
            attachedFiles,
          });
        }),
      );
    }

    return this.applicationApi.createApplication$(this.applicationType, {
      diplomaId,
      institutionId,
      subjectId,
    });
  }

  public edit$(): Observable<BaseResult<boolean>> {
    const applicationId = this.aclService.application().id;
    const fileType = ApplicationFileType.DIPLOMA;
    const { diplomaFile } = this.aclService.attestationHelperForm.getRawValue();
    const { diplomaId, institutionId, subjectId } =
      this.applicationForm.getRawValue();

    if (diplomaFile) {
      return this.applicationApi.uploadFile$(fileType, diplomaFile).pipe(
        switchMap(({ result }) => {
          const attachedFiles = [
            {
              fileId: result,
              fileType,
            },
          ];

          this.applicationForm.patchValue(
            {
              attachedFiles,
            },
            { emitEvent: false },
          );

          return this.applicationApi.editApplication$(applicationId, {
            diplomaId,
            institutionId,
            subjectId,
            attachedFiles,
          });
        }),
      );
    }

    return this.applicationApi.editApplication$(applicationId, {
      diplomaId,
      institutionId,
      subjectId,
    });
  }
}
