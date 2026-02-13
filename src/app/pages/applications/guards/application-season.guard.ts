import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SeasonApiService } from '@api/controllers';
import { MainRoute, RootRoute, RouteParam } from '@constants';
import { ApplicationFormLayoutService } from '@layouts/services';
import { catchError, map, Observable, of, tap } from 'rxjs';

export const applicationSeasonGuard: CanActivateFn = (
  route,
): Observable<boolean | UrlTree> => {
  const seasonApi = inject(SeasonApiService);
  const router = inject(Router);
  const aclService = inject(ApplicationFormLayoutService);

  const redirectUrl = router.createUrlTree([
    RootRoute.MAIN,
    MainRoute.APPLICATIONS,
  ]);

  return seasonApi.getSeason$(route.params[RouteParam.SEASON_ID]).pipe(
    tap((season) => {
      aclService.season.set(season);
    }),
    map((season) => true),
    catchError(() => of(redirectUrl)),
  );
};
