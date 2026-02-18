import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  LanguageMenuComponent,
  LogoComponent,
  MenuItemComponent,
} from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { MainNotificationComponent } from '../main-notification/main-notification.component';

@Component({
  selector: 'ped-main-header',
  imports: [
    LogoComponent,
    NzButtonComponent,
    NzIconDirective,
    NzDropdownModule,
    RouterLink,
    TranslocoDirective,
    MainNotificationComponent,
    LanguageMenuComponent,
    RouterLink,
    MenuItemComponent,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  notificationList = input<any[]>([]);

  langChange = output<string>();
}
