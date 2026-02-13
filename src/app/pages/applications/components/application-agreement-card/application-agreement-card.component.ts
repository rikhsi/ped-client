import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { FunctionType } from '@typings';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ped-application-agreement-card',
  standalone: true,
  imports: [NzCheckboxComponent, TranslocoDirective, FormsModule, NgClass],
  templateUrl: './application-agreement-card.component.html',
  styleUrl: './application-agreement-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApplicationAgreementCardComponent),
      multi: true,
    },
  ],
})
export class ApplicationAgreementCardComponent implements ControlValueAccessor {
  value = model<string | null>(null);
  disabled = model<boolean>(false);
  readonly = input<boolean>();

  title = input.required<string>();
  desc = input<string>();
  showDesc = input<boolean>(true);

  onChange: FunctionType = () => {};
  onTouched: FunctionType = () => {};

  writeValue(value: string | null): void {
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

  onCheckboxChange(option: 'yes' | 'no', checked: boolean): void {
    const newValue = checked ? option : null;

    this.value.set(newValue);
    this.onChange(newValue);
    this.onTouched();
  }
}
