import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { AppealFormLayoutService } from '@layouts/services';
import { AppealFormReasonService } from '@pages/appeal/services';
import { ItemComponent, SelectDefaultComponent } from '@shared/components';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'ped-appeal-form-reason',
  imports: [
    ReactiveFormsModule,
    TranslocoDirective,
    ItemComponent,
    SelectDefaultComponent,
    NzOptionComponent,
    NzInputDirective,
  ],
  templateUrl: './appeal-form-reason.component.html',
  styleUrl: './appeal-form-reason.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppealFormReasonService],
})
export class AppealFormReasonComponent implements OnInit {
  readonly complaints = computed(() => this.afsService.complaints());

  readonly selectedComplaint = computed(() =>
    this.afsService.selectedComplaint(),
  );

  get reasonForm() {
    return this.afsService.reasonForm;
  }

  constructor(
    private afsService: AppealFormReasonService,
    private aflService: AppealFormLayoutService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.aflService
      .controlDisabledState$(this.reasonForm, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.afsService
      .initComplaintListener$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.afsService.loadComplaints$().subscribe(() => {
      this.listenNext();

      this.afsService.initForm();
    });

    this.aflService.back$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['main/appeal']);
      });
  }

  private listenNext(): void {
    this.aflService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const selectedComplaintVariant =
          this.selectedComplaint()?.variants?.find(
            (variant) =>
              variant.id === this.reasonForm.getRawValue().complaintVariantId,
          );

        this.aflService.appealForm.patchValue({
          comment: this.reasonForm.getRawValue().comment,
          complaintVariantId: this.reasonForm.getRawValue().complaintVariantId,
        });

        this.aflService.complaint.set(this.selectedComplaint());
        this.aflService.selectedComplaintVariant.set(selectedComplaintVariant);
      });
  }
}
