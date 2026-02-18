import { computed, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LandingApiService } from '@api/controllers';
import { Certificate } from '@api/models';
import { SListService } from '@shared/services';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

@Injectable()
export class CertificateValidationService {
  readonly isLoading = computed(() => this.slService.isLoading());
  readonly serials = computed(() => this.slService.items());
  readonly certificate = signal<Certificate>(null);

  readonly form = new FormGroup({
    serialId: new FormControl<number>(null, [Validators.required]),
    number: new FormControl<string>(null, [Validators.required]),
  });

  constructor(
    public laService: LandingApiService,
    private slService: SListService<any>,
  ) {
    this.slService.isLoading.set(false);
  }

  public initSerial$(): Observable<any> {
    return this.laService
      .getAllSerials$({
        pageIndex: 0,
        pageSize: 1000,
        filter: [],
        sort: [],
      })
      .pipe(tap(({ result: { items } }) => this.slService.items.set(items)));
  }

  public initFormChange$(): Observable<Certificate | null> {
    return this.form.valueChanges.pipe(
      debounceTime(100),
      tap(() => this.slService.isLoading.set(true)),
      switchMap(({ serialId, number }) =>
        this.laService.getCertificate$(serialId, number).pipe(
          map(({ result }) => result),
          catchError(() => {
            this.certificate.set(null);
            this.slService.isLoading.set(false);
            return EMPTY; // ✅ стрим НЕ ломается
          }),
        ),
      ),
      tap((result) => {
        this.certificate.set(result);
        this.slService.isLoading.set(false);
      }),
    );
  }
}
