import { inject } from '@angular/core';
import { CanActivateFn, Router, RedirectCommand } from '@angular/router';
import { AppealsApiService } from '@api/controllers';
import { AppealFormLayoutService } from '@layouts/services';
import { catchError, map, of, tap } from 'rxjs';

export const appealGuard: CanActivateFn = ({ params }) => {
  const appealApi = inject(AppealsApiService);
  const aflService = inject(AppealFormLayoutService);
  const router = inject(Router);

  const appealId = +params['appealId'];

  return appealApi.getAppeal$(appealId).pipe(
    tap(({ result }) => {
      aflService.appeal.set(result);

      aflService.application.set(result?.application);

      aflService.complaint.set({
        id: result.complaints?.at(0)?.complaintId,
        name: result.complaints?.at(0)?.name,
        variants: [
          {
            id: result.complaints?.at(0)?.complaintVariantId,
            value: result.complaints?.at(0)?.value,
          },
        ],
      });

      aflService.selectedComplaintVariant.set({
        id: result.complaints?.at(0)?.complaintVariantId,
        value: result.complaints?.at(0)?.value,
      });

      aflService.appealForm.patchValue(
        {
          applicationId: result?.application?.id,
          complaintVariantId: result?.complaints?.at(0)?.complaintVariantId,
          comment: result?.comment,
        },
        { emitEvent: false },
      );
    }),
    map(({ result }) => !!result),
    catchError(() => {
      const redirectTo = router.parseUrl('/main/appeal');

      return of(new RedirectCommand(redirectTo));
    }),
  );
};
