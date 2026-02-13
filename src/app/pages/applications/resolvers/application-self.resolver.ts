import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { ApplicationsApiService } from '@api/controllers';
import { ApplicationItem } from '@api/models';
import { catchError, map, of } from 'rxjs';

export const applicationSelfResolver: ResolveFn<
  ApplicationItem | RedirectCommand
> = (route) => {
  const applicationApi = inject(ApplicationsApiService);
  const router = inject(Router);

  const { applicationId } = route.params;

  return applicationApi.getApplication$(+applicationId).pipe(
    map(({ result }) => result),

    catchError(() =>
      of(new RedirectCommand(router.createUrlTree(['/main/applications']))),
    ),
  );
};
