import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { Profile } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { FullnamePipe, PhoneNumberPipe, SrcPipe } from '@shared/pipes';
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-info-self',
  imports: [
    NzAvatarComponent,
    NzIconModule,
    FullnamePipe,
    PhoneNumberPipe,
    TranslocoDirective,
    SrcPipe,
  ],
  templateUrl: './info-self.component.html',
  styleUrl: './info-self.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSelfComponent {
  profile = input.required<Profile>();
  imageError = signal(false);

  onImageError(): void {
    this.imageError.set(true);
  }

  getAvatarSrc(): string {
    if (this.imageError()) {
      return './images/def-avatar.svg';
    }

    const photoUrl = this.profile()?.passport?.photoUrl;
    return photoUrl && photoUrl.trim() ? photoUrl : './images/def-avatar.svg';
  }
}
