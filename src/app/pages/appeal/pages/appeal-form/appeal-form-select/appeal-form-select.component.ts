import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { AppealFormLayoutService } from '@layouts/services';
import { AppealFormSelectService } from '@pages/appeal/services';
import { EmptyComponent } from '@shared/components';
import { EnumItemPipe } from '@shared/pipes';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'ped-appeal-form-select',
  imports: [
    TranslocoDirective,
    NzRadioGroupComponent,
    NgClass,
    NzRadioComponent,
    EmptyComponent,
    EnumItemPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './appeal-form-select.component.html',
  styleUrl: './appeal-form-select.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppealFormSelectService],
})
export class AppealFormSelectComponent implements OnInit {
  readonly items = computed(() => this.afsService.items());

  get applicationControl() {
    return this.afsService.applicationControl;
  }

  constructor(
    private afsService: AppealFormSelectService,
    private aflService: AppealFormLayoutService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.aflService
      .controlDisabledState$(this.applicationControl, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.afsService.loadApplications$().subscribe(() => {
      this.listenNext();

      this.afsService.initForm();

      this.afsService
        .initResetter$()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    });
  }

  private listenNext(): void {
    this.aflService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const selectedApplication = this.items().find(
          (item) => item.id === this.applicationControl.getRawValue(),
        );

        this.aflService.appealForm.patchValue({
          applicationId: this.applicationControl.getRawValue(),
        });

        this.aflService.application.set(selectedApplication);
      });
  }
}
