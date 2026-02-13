import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { EmptyComponent } from '@shared/components';

@Component({
  selector: 'ped-main-notification',
  imports: [NzButtonComponent, NgClass, TranslocoDirective, EmptyComponent],
  templateUrl: './main-notification.component.html',
  styleUrl: './main-notification.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNotificationComponent {
  items = input<any[]>();
}
