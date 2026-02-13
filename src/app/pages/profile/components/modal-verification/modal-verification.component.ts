import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TranslocoDirective } from '@jsverse/transloco';
import { InputDefaultComponent } from '@shared/components';
import {
  VerificationModalData,
  VerificationModalResult,
} from '@pages/profile/models';
import { FieldConfigPipe } from '@pages/profile/pipes';

@Component({
  selector: 'ped-modal-verification',
  imports: [
    ReactiveFormsModule,
    NzButtonComponent,
    NzIconDirective,
    InputDefaultComponent,
    FieldConfigPipe,
    TranslocoDirective,
  ],
  templateUrl: './modal-verification.component.html',
  styleUrl: './modal-verification.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalVerificationComponent {
  private fb = inject(FormBuilder);
  private modalRef = inject(NzModalRef);

  form!: FormGroup;
  showVerification = signal(false);
  verificationError = signal<string | null>(null);
  isSubmitting = signal(false);

  private readonly MOCK_CODE = '1234';

  get data(): VerificationModalData {
    return this.modalRef.getConfig().nzData;
  }

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    const validators =
      this.data.fieldType === 'email'
        ? [Validators.required, Validators.email]
        : [Validators.required];

    this.form = this.fb.group({
      newValue: ['', validators],
      verificationCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }

  onSubmitNewValue(): void {
    if (this.form.get('newValue')?.invalid) {
      this.form.get('newValue')?.markAsTouched();
      return;
    }

    this.showVerification.set(true);
    this.verificationError.set(null);
  }

  onVerify(): void {
    const code = this.form.get('verificationCode')?.value;

    // if (!code || code.length !== 4) {
    //   this.verificationError.set('Введите 4-значный код');
    //   return;
    // }

    // if (code !== this.MOCK_CODE) {
    //   this.verificationError.set('Неверный код подтверждения');
    //   return;
    // }

    this.isSubmitting.set(true);

    const result: VerificationModalResult = {
      newValue: this.form.get('newValue')?.value,
      verified: true,
    };

    this.modalRef.close(result);
  }

  resetCodeInput(): void {
    this.form.patchValue({ verificationCode: '' });
  }

  close(): void {
    this.modalRef.close(null);
  }
}
