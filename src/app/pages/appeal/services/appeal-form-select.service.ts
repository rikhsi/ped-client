import { Injectable, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApplicationsApiService } from '@api/controllers';
import { ApplicationTOYItem } from '@api/models';
import { AppealFormLayoutService } from '@layouts/services';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class AppealFormSelectService {
  readonly items = signal<ApplicationTOYItem[]>([]);

  readonly applicationControl = new FormControl<number>(null, [
    Validators.required,
  ]);

  constructor(
    private applicationApi: ApplicationsApiService,
    private aflService: AppealFormLayoutService,
  ) {}

  public loadApplications$(): Observable<ApplicationTOYItem[]> {
    return this.applicationApi.getTeacherOfYearApplications$().pipe(
      map(({ result }) => result),
      tap((items) => {
        this.items.set(items);
      }),
    );
  }

  public initForm(): void {
    const applicationId =
      this.aflService.appealForm.getRawValue()?.applicationId;

    if (applicationId) {
      this.applicationControl.setValue(applicationId);
    }
  }

  public initResetter$(): Observable<Object> {
    return this.applicationControl.valueChanges.pipe(
      tap(() => {
        this.aflService.appealForm.patchValue({
          complaintVariantId: null,
          comment: null,
        });
        this.aflService.application.set(null);
        this.aflService.complaint.set(null);
      }),
    );
  }
}
