import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  ApplicationStatus,
  ExternalService,
  Profile,
} from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  CancelBtnEnableDirective,
  EditBtnEnableDirective,
  ExternalDirective,
} from '@pages/applications/directives';
import {
  EnumItemPipe,
  FullnamePipe,
  PhoneNumberPipe,
  SrcPipe,
} from '@shared/pipes';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-application-self-user',
  imports: [
    NzAvatarComponent,
    NzIconModule,
    FullnamePipe,
    PhoneNumberPipe,
    TranslocoDirective,
    NzButtonComponent,
    NzIconDirective,
    EditBtnEnableDirective,
    CancelBtnEnableDirective,
    ExternalDirective,
    SrcPipe,
    EnumItemPipe,
  ],
  templateUrl: './application-self-user.component.html',
  styleUrl: './application-self-user.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSelfUserComponent {
  user = input<Profile>();
  status = input<ApplicationStatus>();
  externalId = input<ExternalService>();

  onEdit = output<void>();
  onCancel = output<void>();
}
