import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-collapsible-card',
  imports: [NzIconDirective],
  templateUrl: './collapsible-card.component.html',
  styleUrl: './collapsible-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsibleCardComponent {
  isOpen = input<boolean>(false);
  toggle = output<void>();
}
