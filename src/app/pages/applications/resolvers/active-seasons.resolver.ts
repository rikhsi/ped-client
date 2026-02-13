import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SeasonApiService } from '@api/controllers';
import { Season } from '@api/models';
import { catchError, of } from 'rxjs';

export const activeSeasonsResolver: ResolveFn<Season[]> = () => {
  const seasonApi = inject(SeasonApiService);

  return seasonApi.getActiveSeasons$().pipe(
    catchError(() => {
      return of([]);
    }),
  );
};
