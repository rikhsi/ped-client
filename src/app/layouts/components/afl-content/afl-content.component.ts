import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationBtn } from '@layouts/models';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'ped-afl-content',
  imports: [RouterOutlet, TranslocoDirective, NzButtonComponent],
  templateUrl: './afl-content.component.html',
  styleUrl: './afl-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AflContentComponent {
  buttons = input<ApplicationBtn>(null);

  onCancel = output<void>();
  onNext = output<void>();
  onSend = output<void>();
  onBack = output<void>();
}
