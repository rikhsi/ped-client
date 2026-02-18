import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'ped-loading',
  imports: [NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.less',
})
export class LoadingComponent {
  size = input<NzButtonSize>('small');
  fill = input<string>('default');
}
