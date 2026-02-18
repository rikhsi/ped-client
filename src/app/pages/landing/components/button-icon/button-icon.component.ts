import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-button-icon',
  standalone: true,
  imports: [NzButtonModule, NzIconDirective],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconComponent {
  icon = input<string>(null);
  iconColor = input<string>('#FFFFFF');
  size = input<NzButtonSize>('large');
}
