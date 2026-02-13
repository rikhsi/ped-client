import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { MenuItemComponent } from '@shared/components';
import { MenuItem } from '@typings';

@Component({
  selector: 'ped-main-sidebar-menu',
  imports: [MenuItemComponent, TranslocoDirective],
  templateUrl: './main-sidebar-menu.component.html',
  styleUrl: './main-sidebar-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidebarMenuComponent {
  readonly menuItems = input<Partial<MenuItem>[]>();
  readonly isVertical = input<boolean>();

  readonly logout = output<void>();
}
