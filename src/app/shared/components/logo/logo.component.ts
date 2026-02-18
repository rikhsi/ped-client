import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-logo',
  imports: [NzIconDirective],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
