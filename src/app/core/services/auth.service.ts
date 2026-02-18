import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageItem } from '@constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Certificate, Profile, WorkExperience } from '@api/models';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalConfirmComponent } from '@shared/components';
import { ConfirmModal } from '@typings';
import { translate } from '@jsverse/transloco';
import { filter, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Сигналы для реактивного хранения данных пользователя, сертификатов и опыта работы */
  readonly user = signal<Profile>(null);
  readonly certificates = signal<Certificate[]>([]);
  readonly workExperience = signal<WorkExperience>(null);

  constructor(
    private lsService: LocalStorageService,
    private jwtService: JwtHelperService,
    private modal: NzModalService,
    private router: Router,
  ) {}

  /**
   * Сохраняет токен в localStorage при логине
   */
  login(accessToken: string): void {
    this.lsService.setItem(LocalStorageItem.ACCESS_TOKEN, accessToken);
  }

  /**
   * Логаут пользователя
   * @param check - показывать ли подтверждающий модальный диалог
   */
  logout(check: boolean): void {
    if (check) {
      this.modal
        .create<ModalConfirmComponent, ConfirmModal, boolean>({
          nzWidth: 480,
          nzFooter: null,
          nzTitle: '',
          nzClosable: false,
          nzCentered: true,
          nzAutofocus: null,
          nzWrapClassName: 'custom-modal',
          nzBodyStyle: { padding: '12px', background: '#fff' },
          nzData: {
            title: translate('logout.title'),
            description: translate('logout.description'),
            cancel: { title: translate('action.cancel'), danger: false },
            submit: { title: translate('action.logout'), danger: true },
          },
          nzContent: ModalConfirmComponent,
        })
        .afterClose.pipe(
          filter((state) => !!state), // учитываем только подтверждённые действия
          tap(() => {
            this.lsService.removeItem(LocalStorageItem.ACCESS_TOKEN);
            this.reset();
            this.router.navigate(['/']);
          }),
        )
        .subscribe();
    } else {
      // мгновенный логаут без модалки
      this.lsService.removeItem(LocalStorageItem.ACCESS_TOKEN);
      this.reset();
      this.router.navigate(['/']);
    }
  }

  /**
   * Сбрасывает все реактивные данные пользователя
   */
  reset(): void {
    this.user.set(null);
    this.workExperience.set(null);
    this.certificates.set([]);
  }

  /**
   * Проверяет валидность JWT токена
   */
  checkValidity(token: string): boolean {
    if (!token) return false;

    try {
      return !this.jwtService.isTokenExpired(token);
    } catch (e) {
      return false; // если токен поврежден или невалидный
    }
  }

  /**
   * Получает токен из localStorage
   */
  getToken(): string {
    return this.lsService.getItem(LocalStorageItem.ACCESS_TOKEN);
  }

  /**
   * Проверяет, авторизован ли пользователь
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return this.checkValidity(token);
  }
}
