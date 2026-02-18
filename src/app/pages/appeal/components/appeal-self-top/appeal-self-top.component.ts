import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChipComponent } from '@shared/components';
import { AppealStatusColorPipe, AppealStatusPipe } from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-appeal-self-top',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    AppealStatusColorPipe,
    AppealStatusPipe,
    TranslocoDirective,
    RouterLink,
    ChipComponent,
  ],
  templateUrl: './appeal-self-top.component.html',
  styleUrl: './appeal-self-top.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealSelfTopComponent {
  number = input<number>();
  status = input<number>();
  loading = input<boolean>();

  load = output<void>();
}
