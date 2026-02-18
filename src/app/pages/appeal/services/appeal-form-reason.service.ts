import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintApiService } from '@api/controllers';
import { ComplaintItem, ComplaintShortItem } from '@api/models';
import { AppealFormLayoutService } from '@layouts/services';
import { map, Observable, skip, switchMap, tap } from 'rxjs';

@Injectable()
export class AppealFormReasonService {
  readonly complaints = signal<ComplaintShortItem[]>([]);
  readonly selectedComplaint = signal<ComplaintItem>(null);

  readonly reasonForm = new FormGroup({
    complaintVariantId: new FormControl(null, Validators.required),
    comment: new FormControl('', Validators.required),
    complaintId: new FormControl(null, Validators.required),
  });

  constructor(
    private complaintApi: ComplaintApiService,
    private aflService: AppealFormLayoutService,
  ) {}

  public loadComplaints$(): Observable<ComplaintShortItem[]> {
    return this.complaintApi
      .getComplaints$({
        sort: [],
        pageIndex: 0,
        pageSize: 1000,
        filter: [],
      })
      .pipe(
        map(({ result: { items } }) => items),
        tap((items) => {
          this.complaints.set(items);
        }),
      );
  }

  public initForm(): void {
    const { comment, complaintVariantId } =
      this.aflService.appealForm.getRawValue();

    if (comment && complaintVariantId) {
      this.reasonForm.patchValue({
        comment,
        complaintVariantId,
        complaintId: this.aflService.complaint()?.id,
      });
    }
  }

  public initComplaintListener$(): Observable<ComplaintItem> {
    const complaintId$ = this.reasonForm.controls.complaintId.valueChanges;

    // reset только со второго изменения
    complaintId$.pipe(skip(1)).subscribe(() => {
      this.selectedComplaint.set(null);

      this.reasonForm.controls.complaintVariantId.reset(null, {
        emitEvent: false,
      });
    });

    return complaintId$.pipe(
      switchMap((complaintId) => this.complaintApi.getComplaint$(complaintId)),
      map(({ result }) => result),
      tap((complaint) => this.selectedComplaint.set(complaint)),
    );
  }
}
