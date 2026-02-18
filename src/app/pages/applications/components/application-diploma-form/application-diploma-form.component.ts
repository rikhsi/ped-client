import { NgClass } from '@angular/common';
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
import { DiplomaItem } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { EmptyComponent } from '@shared/components';
import { EnumItemPipe } from '@shared/pipes';
import { FunctionType } from '@typings';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';

@Component({
  selector: 'ped-application-diploma-form',
  imports: [
    NzRadioGroupComponent,
    NzRadioComponent,
    FormsModule,
    EnumItemPipe,
    EmptyComponent,
    TranslocoDirective,
    NgClass,
  ],
  templateUrl: './application-diploma-form.component.html',
  styleUrl: './application-diploma-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApplicationDiplomaFormComponent),
      multi: true,
    },
  ],
})
export class ApplicationDiplomaFormComponent implements ControlValueAccessor {
  readonly diplomas = input<DiplomaItem[]>([]);

  value = model<number>();
  disabled = model<boolean>(false);

  onChange: FunctionType = () => {};
  onTouched: FunctionType = () => {};

  writeValue(value: number): void {
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
