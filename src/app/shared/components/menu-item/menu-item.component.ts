import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-menu-item',
  imports: [NzIconDirective, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  label = input.required<string>();
  link = input<string>();
  danger = input<boolean>(false);
  active = input<boolean>();
  prefixIcon = input<string>();
  suffixIcon = input<string>();
  suffixRotate = input<number>(0);

  vertical = input<boolean>();

  clicked = output<void>();
}
