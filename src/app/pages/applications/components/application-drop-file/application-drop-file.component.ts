import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ControlBaseDirective, FileInputDirective } from '@shared/directives';
import { SizePipe } from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-application-drop-file',
  imports: [
    NzIconDirective,
    FileInputDirective,
    TranslocoDirective,
    NzButtonComponent,
    SizePipe,
  ],
  templateUrl: './application-drop-file.component.html',
  styleUrl: './application-drop-file.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApplicationDropFileComponent),
      multi: true,
    },
  ],
})
export class ApplicationDropFileComponent extends ControlBaseDirective<File> {
  title = input<string>();
  fileInput = viewChild(FileInputDirective);
  removed = output<void>();

  override modelChange(value: File | File[]): void {
    const file = value as File;

    this.value.set(file);
    this.onChange?.(file);
  }

  public removeFile(event: Event): void {
    event.stopPropagation();

    this.value.set(null);
    this.onChange?.(null);

    this.fileInput().fileInput.value = null;

    this.removed.emit();
  }
}
