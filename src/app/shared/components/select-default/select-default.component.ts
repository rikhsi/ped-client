import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSizeLDSType, NzValidateStatus } from 'ng-zorro-antd/core/types';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FunctionType } from '@typings';

@Component({
  selector: 'ped-select-default',
  templateUrl: './select-default.component.html',
  styleUrl: './select-default.component.less',
  imports: [NzSelectComponent, NzOptionComponent, FormsModule, NzFormModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectDefaultComponent),
      multi: true,
    },
  ],
})
export class SelectDefaultComponent implements ControlValueAccessor {
  optionList = contentChildren(NzOptionComponent);

  value = model<number | boolean>();
  label = input<string>('');
  placeholder = input<string>('');
  size = input<NzSizeLDSType>('default');
  disabled = model<boolean>(false);
  isFeedback = input<boolean>();
  showSearch = input<boolean>(true);
  isLoading = input<boolean>(false);

  message = model<string>();
  status = model<NzValidateStatus>('');

  clicked = output<void>();
  focus = output<void>();
  blur = output<void>();

  onChange: FunctionType = () => {};
  onTouched: FunctionType = () => {};

  writeValue(value: number | boolean): void {
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
  }

  onModelChange($event: number): void {
    this.value.set($event);
    this.onChange($event);
  }
}
