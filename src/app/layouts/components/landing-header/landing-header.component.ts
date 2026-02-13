import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { RootRoute } from '@constants';
import { AuthService, LanguageService } from '@core/services';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageMenuComponent, LogoComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ped-landing-header',
  imports: [
    LogoComponent,
    NzButtonComponent,
    NzIconModule,
    LanguageMenuComponent,
    RouterLink,
    TranslocoDirective,
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeaderComponent implements OnInit {
  public readonly langChange$ = new Subject<string>();

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.onLanguageChange();
  }

  private onLanguageChange(): void {
    this.langChange$
      .pipe(
        tap((lang) => this.languageService.updateLocale(lang)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  public goMain(): void {
    const isTokenValid = this.authService.isAuthenticated();

    if (isTokenValid) {
      this.router.navigate([RootRoute.MAIN]);
    } else {
      window.open(environment.oneId, '_self');
    }
  }
}
