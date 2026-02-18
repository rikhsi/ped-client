import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-chip',
  imports: [NzIconDirective, NgStyle],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent {
  showDot = input<boolean>(true);
  color = input<string>();
}
