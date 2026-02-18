import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { AppealsApiService } from '@api/controllers';
import { AppealItem } from '@api/models';
import { catchError, map, of } from 'rxjs';

export const appealSelfResolver: ResolveFn<AppealItem | RedirectCommand> = (
  route,
) => {
  const appealApi = inject(AppealsApiService);
  const router = inject(Router);

  const { appealId } = route.params;

  return appealApi.getAppeal$(+appealId).pipe(
    map(({ result }) => result),

    catchError(() =>
      of(new RedirectCommand(router.createUrlTree(['/main/appeal']))),
    ),
  );
};
