import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApplicationType } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChipComponent } from '@shared/components';
import {
  ApplicationStatusColorPipe,
  ApplicationStatusPipe,
} from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-application-self-top',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    ApplicationStatusPipe,
    ApplicationStatusColorPipe,
    TranslocoDirective,
    RouterLink,
    ChipComponent,
  ],
  templateUrl: './application-self-top.component.html',
  styleUrl: './application-self-top.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSelfTopComponent {
  number = input<string>();
  status = input<number>();
  type = input<ApplicationType>();
  loading = input<boolean>();

  load = output<void>();
}
