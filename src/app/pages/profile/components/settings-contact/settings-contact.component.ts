import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ItemComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Profile } from '@api/models';
import { FormsModule } from '@angular/forms';
import { InputDefaultComponent } from '@shared/components';
import {
  ModalVerificationService,
  ProfileUpdateService,
} from '@pages/profile/services';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ped-settings-contact',
  imports: [
    ItemComponent,
    NzIconDirective,
    NzButtonComponent,
    FormsModule,
    InputDefaultComponent,
    TranslocoDirective,
  ],
  templateUrl: './settings-contact.component.html',
  styleUrl: './settings-contact.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsContactComponent {
  private verificationModal = inject(ModalVerificationService);
  private profileUpdateFacade = inject(ProfileUpdateService);
  private modalData = inject(NZ_MODAL_DATA, { optional: true });

  // Use input for normal usage, but allow modal data to override
  profileInput = input<Profile | undefined>(undefined, { alias: 'profile' });
  profileUpdated = output<void>();

  // Computed signal that uses either input or modal data
  profile = signal<Profile | null>(null);

  editingTelegram = signal(false);
  telegramValue = signal('');

  ngOnInit(): void {
    // Priority: modal data > input
    const profileData = this.modalData?.profile || this.profileInput();
    if (profileData) {
      this.profile.set(profileData);
    }
  }

  onEditPhone(): void {
    const currentProfile = this.profile();
    if (!currentProfile) return;

    this.verificationModal
      .openVerificationModal({
        fieldType: 'phone',
        currentValue: currentProfile.phoneNumber,
        label: 'change.phone',
      })
      .subscribe((result) => {
        if (result?.verified && currentProfile) {
          this.profileUpdateFacade
            .updatePhone(result.newValue, currentProfile, {
              successMessage: '',
            })
            .subscribe(() => this.profileUpdated.emit());
        }
      });
  }

  onEditEmail(): void {
    const currentProfile = this.profile();
    if (!currentProfile) return;

    this.verificationModal
      .openVerificationModal({
        fieldType: 'email',
        currentValue: currentProfile.email,
        label: 'change.email',
      })
      .subscribe((result) => {
        if (result?.verified && currentProfile) {
          this.profileUpdateFacade
            .updateEmail(result.newValue, currentProfile, {
              successMessage: '',
            })
            .subscribe(() => this.profileUpdated.emit());
        }
      });
  }

  onEditTelegram(): void {
    const currentProfile = this.profile();
    if (!currentProfile) return;

    this.editingTelegram.set(true);
    this.telegramValue.set(currentProfile.telegramUserName || '');
  }

  onSaveTelegram(): void {
    const currentProfile = this.profile();
    if (!currentProfile) return;

    const value = this.telegramValue().trim();
    if (value) {
      this.profileUpdateFacade
        .updateTelegramUsername(value, currentProfile, { successMessage: '' })
        .subscribe(() => {
          this.editingTelegram.set(false);
          this.profileUpdated.emit();
        });
    }
  }

  onCancelTelegram(): void {
    this.editingTelegram.set(false);
    this.telegramValue.set('');
  }
}
