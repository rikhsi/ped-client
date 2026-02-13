import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { AppealStatus, Profile } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import {
  CancelBtnEnableDirective,
  EditBtnEnableDirective,
} from '@pages/appeal/directives';
import { FullnamePipe, PhoneNumberPipe, SrcPipe } from '@shared/pipes';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-appeal-self-user',
  imports: [
    NzAvatarComponent,
    NzIconModule,
    FullnamePipe,
    PhoneNumberPipe,
    TranslocoDirective,
    NzButtonComponent,
    NzIconDirective,
    SrcPipe,
    EditBtnEnableDirective,
    CancelBtnEnableDirective,
  ],
  templateUrl: './appeal-self-user.component.html',
  styleUrl: './appeal-self-user.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealSelfUserComponent {
  user = input<Profile>();
  status = input<AppealStatus>();

  onEdit = output<void>();
  onCancel = output<void>();
}
