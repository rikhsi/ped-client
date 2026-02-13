import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { ApplicationsApiService } from '@api/controllers';
import {
  ApplicationFileType,
  ApplicationPayloadAttachedFile,
  ApplicationType,
  AttestationType,
} from '@api/models';
import {
  ATTESTATION_DIRECT_STEPS,
  ATTESTATION_ANOTHER_ONE_STEPS,
  MMTV_STEPS,
  ATTESTATION_DEFAULT_STEPS,
} from '@layouts/data';
import { ApplicationFormLayoutService } from '@layouts/services';
import { fetchFileFromUrl } from '@shared/utils';
import { catchError, from, of, switchMap } from 'rxjs';

export const applicationGuard: CanActivateFn = ({ params }) => {
  const applicationApi = inject(ApplicationsApiService);
  const aclService = inject(ApplicationFormLayoutService);
  const router = inject(Router);

  const applicationId = +params['applicationId'];

  return applicationApi.getApplication$(applicationId).pipe(
    switchMap(({ result }) =>
      from(
        (async () => {
          switch (result?.attestationData?.attestationType) {
            case AttestationType.DIRECT: {
              aclService.steps.set(ATTESTATION_DIRECT_STEPS);

              break;
            }
            case AttestationType.ANOTHERONE: {
              aclService.steps.set(ATTESTATION_ANOTHER_ONE_STEPS);

              break;
            }
            default: {
              if (result.applicationType === ApplicationType.MMTV) {
                aclService.steps.set(MMTV_STEPS);
              } else {
                aclService.steps.set(ATTESTATION_DEFAULT_STEPS);
              }

              break;
            }
          }
          // ---- signals ----
          aclService.application.set(result);
          aclService.certificate.set(result?.attachedCertificate);
          aclService.privilege.set(result?.privilegeInfo);
          aclService.nationalCertificate.set(
            result?.attestationData?.nationalCertificate,
          );
          aclService.dtmCertificate.set(
            result?.attestationData?.dtmCertificate,
          );
          aclService.subject.set(result?.subject);
          aclService.institution.set(result?.institution);
          aclService.diploma.set(result?.diploma);

          // ---- privilege file ----
          const privilegeFileItem = result.attachedFiles.find(
            (item) => item.fileType === ApplicationFileType.PRIVILEGE,
          );

          const diplomaFileItem = result.attachedFiles.find(
            (item) => item.fileType === ApplicationFileType.DIPLOMA,
          );

          const additionalFileItem = result.attachedFiles.find(
            (item) => item.fileType === ApplicationFileType.ADDITIONAL,
          );

          const privilegeFile = privilegeFileItem
            ? await fetchFileFromUrl(
                privilegeFileItem.downloadUrl,
                privilegeFileItem.orginalName,
              )
            : null;

          const diplomaFile = diplomaFileItem
            ? await fetchFileFromUrl(
                diplomaFileItem.downloadUrl,
                diplomaFileItem.orginalName,
              )
            : null;

          const additionalFile = additionalFileItem
            ? await fetchFileFromUrl(
                additionalFileItem.downloadUrl,
                additionalFileItem.orginalName,
              )
            : null;

          // ---- attached files ----
          const attachedFiles: ApplicationPayloadAttachedFile[] =
            result.attachedFiles.map((item) => ({
              fileId: item.id,
              fileType: item.fileType,
            }));

          // ---- helper form ----
          aclService.attestationHelperForm.patchValue(
            {
              eduDirection: result.institution?.eduDirection,
              districtId: result.institution?.district?.id,
              regionId: result.institution?.district?.region?.id,
              privelegeFileType: result.privilegeInfo?.id,
              privilegeFile,
              diplomaFile,
              additionalFile,
            },
            { emitEvent: false },
          );

          // ---- main form ----
          aclService.applicationForm.patchValue(
            {
              institutionId: result.institution?.id,
              privilegeId: result.privilegeInfo?.id,
              subjectId: result.subject?.id,
              diplomaId: result.diploma?.id,
              attachedFiles,
              category: result.pedagogueCategory,
              language: result.language,
              attestationData: result.attestationData,
            },
            { emitEvent: false },
          );

          return true; // ✅ разрешаем навигацию
        })(),
      ),
    ),

    catchError(() => {
      const redirectTo = router.parseUrl('/main/applications');

      return of(new RedirectCommand(redirectTo));
    }),
  );
};
