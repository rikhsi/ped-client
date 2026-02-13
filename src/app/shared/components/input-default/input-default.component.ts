import {
  input,
  model,
  output,
  Component,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FunctionType, InputType } from '@typings';
import {
  NzInputDirective,
  NzInputWrapperComponent,
} from 'ng-zorro-antd/input';
import { NzSizeLDSType, NzValidateStatus } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'ped-input-default',
  templateUrl: './input-default.component.html',
  styleUrl: './input-default.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    NzFormModule,
    NzInputWrapperComponent,
    NzInputDirective,
    NgxMaskDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDefaultComponent),
      multi: true,
    },
  ],
})
export class InputDefaultComponent implements ControlValueAccessor {
  value = model<string | number>();

  placeholder = input<string>('');
  id = input<string>('');
  type = model<InputType>('text');
  autocomplete = input<string>();
  size = input<NzSizeLDSType>('default');

  mask = input<string>('');
  pattern = input<string | RegExp>('');

  disabled = model<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>();
  isFeedback = input<boolean>();

  message = model<string>();
  status = model<NzValidateStatus>('');

  prefixIcon = input<string>();
  suffixIcon = input<string>();

  clicked = output<void>();
  focus = output<void>();
  blur = output<void>();

  onChange: FunctionType = () => {};
  onTouched: FunctionType = () => {};

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: FunctionType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: FunctionType): void {
    this.onTouched = fn;
  }

  setDisabledState(state: boolean): void {
    this.disabled.set(state);

    if (state) {
      this.message.set(null);
      this.status.set('');
    }
  }

  onModelChange($event: string): void {
    if (this.type() === 'number' && !!$event) {
      this.onChange(Number($event));
    } else {
      this.onChange($event.toString().trim());
    }
  }
}
