import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Profile, UpdateProfilePayload } from '@api/models';
import { ProfileApiService } from '@api/controllers';

export interface ProfileUpdateOptions {
  successMessage?: string;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileUpdateService {
  private profileService = inject(ProfileApiService);
  private message = inject(NzMessageService);

  updatePhone(
    phoneNumber: string,
    currentProfile: Profile,
    options?: ProfileUpdateOptions,
  ): Observable<any> {
    return this.updateProfile({ phoneNumber }, currentProfile, {
      successMessage: 'Номер телефона успешно обновлен',
      ...options,
    });
  }

  updateEmail(
    email: string,
    currentProfile: Profile,
    options?: ProfileUpdateOptions,
  ): Observable<any> {
    return this.updateProfile({ email }, currentProfile, {
      successMessage: 'Email успешно обновлен',
      ...options,
    });
  }

  updateTelegramUsername(
    telegramUsername: string,
    currentProfile: Profile,
    options?: ProfileUpdateOptions,
  ): Observable<any> {
    return this.updateProfile({ telegramUsername }, currentProfile, {
      successMessage: 'Telegram username успешно обновлен',
      ...options,
    });
  }

  private updateProfile(
    partial: Partial<UpdateProfilePayload>,
    currentProfile: Profile,
    options?: ProfileUpdateOptions,
  ): Observable<any> {
    const opts: ProfileUpdateOptions = {
      errorMessage: 'Ошибка при обновлении профиля',
      ...options,
    };

    const payload: UpdateProfilePayload = {
      email: partial.email ?? currentProfile.email,
      phoneNumber: partial.phoneNumber ?? currentProfile.phoneNumber,
      telegramUsername:
        partial.telegramUsername ?? currentProfile.telegramUserName,
    };

    return this.profileService.updateProfile$(payload).pipe(
      tap({
        next: () => {
          if (opts.successMessage) {
            this.message.success(opts.successMessage);
          }
        },
        error: () => {
          if (opts.errorMessage) {
            this.message.error(opts.errorMessage);
          }
        },
      }),
    );
  }
}
