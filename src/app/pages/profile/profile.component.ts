import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { AuthService } from '@core/services';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProfileApiService } from '@api/controllers';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MenuItemComponent } from '@shared/components';
import { MenuItem } from '@typings';
import { TranslocoDirective } from '@jsverse/transloco';
import { forkJoin } from 'rxjs';
import { translate } from '@jsverse/transloco';
import {
  InfoCertificatesComponent,
  InfoMainComponent,
  InfoSelfComponent,
  SettingsContactComponent,
} from './components';
import { PROFILE_MENU_MOBILE_ITEMS } from './data';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { COLLAPSE } from '@shared/animations';

@Component({
  selector: 'ped-profile',
  imports: [
    InfoSelfComponent,
    InfoMainComponent,
    NzButtonComponent,
    NzIconModule,
    TranslocoDirective,
    MenuItemComponent,
    InfoCertificatesComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [COLLAPSE],
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private profileApi = inject(ProfileApiService);
  private message = inject(NzNotificationService);
  private modal = inject(NzModalService);

  readonly certificates = computed(() => this.authService.certificates());

  readonly profileData = computed(() => this.authService.user());
  readonly experiences = computed(() => this.authService.workExperience());

  readonly isUpdating = signal<boolean>(false);
  readonly showProfileInfo = signal<boolean>(false);

  readonly mobileMenuItems = PROFILE_MENU_MOBILE_ITEMS;

  onMobileMenuClick(item: Partial<MenuItem>): void {
    if (item.key === 'prop.logout') {
      this.logout();
    }
  }

  toggleProfileInfo(): void {
    this.showProfileInfo.update((v) => !v);
  }

  onEdit(): void {
    const profile = this.profileData();
    if (!profile) return;

    const modalRef = this.modal.create({
      nzTitle: null,
      nzContent: SettingsContactComponent,
      nzData: {
        profile: profile,
      },
      nzWidth: '90%',
      nzStyle: { maxWidth: '700px' },
      nzClosable: true,
      nzMask: true,
      nzMaskClosable: true,
      nzCentered: true,
      nzFooter: null,
      nzBodyStyle: {
        padding: '0',
      },
      nzWrapClassName: 'custom-profile-modal',
    });

    const component = modalRef.getContentComponent();

    component.profileUpdated.subscribe(() => {
      this.message.success(
        translate('profile.edit.success.title'),
        translate('profile.edit.success.desc'),
      );

      modalRef.close();

      setTimeout(() => {
        location.reload();
      }, 300);
    });
  }

  onUpdate(): void {
    this.isUpdating.set(true);

    // Store current data in case we need to restore it
    const currentUser = this.authService.user();
    const currentWorkExp = this.authService.workExperience();

    // Fetch both profile sync and work experience in parallel
    forkJoin({
      profile: this.profileApi.syncProfile$(),
      workExperience: this.profileApi.getWorkExperience$(),
    }).subscribe({
      next: ({ profile, workExperience }) => {
        // Only update if we have valid, non-null data
        if (profile?.result && Object.keys(profile.result).length > 0) {
          this.authService.user.set(profile.result);
        }

        if (workExperience?.result) {
          this.authService.workExperience.set(workExperience.result);
        }

        this.message.success(
          translate('notification.profile.update.title'),
          translate('notification.profile.update.desc'),
        );

        this.isUpdating.set(false);
      },
      error: () => {
        // Restore previous data on error to prevent content disappearing
        if (currentUser) {
          this.authService.user.set(currentUser);
        }
        if (currentWorkExp) {
          this.authService.workExperience.set(currentWorkExp);
        }

        this.message.error(
          translate('notification.profile.update.error.title'),
          translate('notification.profile.update.error.desc'),
        );

        this.isUpdating.set(false);
      },
    });
  }

  logout(): void {
    this.authService.logout(true);
  }
}
