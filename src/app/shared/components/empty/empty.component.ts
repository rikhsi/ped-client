import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzSizeDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'ped-empty',
  imports: [NgClass],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyComponent {
  title = input<string>();
  size = input<NzSizeDSType>('default');
}
