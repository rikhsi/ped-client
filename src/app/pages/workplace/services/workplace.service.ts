import { computed, Injectable } from '@angular/core';
import { ProfileApiService } from '@api/controllers';
import { WorkHistory } from '@api/models';
import { SListService } from '@shared/services';
import {
  catchError,
  map,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class WorkPlaceService {
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly items = computed(() => this.slService.items());

  readonly load$ = new Subject<void>();

  constructor(
    public pService: ProfileApiService,
    private slService: SListService<WorkHistory>,
  ) {}

  public initWorkHistory$(): Observable<WorkHistory[]> {
    return this.load$.pipe(
      tap(() => this.slService.isLoading.set(true)),
      switchMap(() => this.pService.getWorkHistory$()),
      map(({ result }) => result),
      tap((result) => {
        this.slService.items.set(result);
        this.slService.isLoading.set(false);
      }),
      catchError((err) => {
        this.slService.isLoading.set(false);

        return throwError(() => err);
      }),
    );
  }
}
