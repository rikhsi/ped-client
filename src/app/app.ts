import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthApiService } from '@api/controllers';
import { RootRoute } from '@constants';
import { AuthService, BpService } from '@core/services';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ped-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authApi: AuthApiService,
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private router: Router,
    private bpService: BpService,
  ) {}

  ngOnInit(): void {
    this.initRoute();
    this.initAdminEntry();

    this.bpService
      .observe$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private initAdminEntry(): void {
    this.route.queryParams
      .pipe(
        filter((params) => !!params['admin']),
        map((params) => params['admin']),
        tap(() => this.authService.user.set(null)),
        switchMap((code: string) => this.authApi.loginForAdmin(code)),
        tap(({ result }) => {
          this.authService.login(result?.token);

          this.router.navigate([RootRoute.MAIN]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private initRoute(): void {
    this.route.queryParams
      .pipe(
        filter((params) => !!params['code']),
        map((params) => params['code']),
        switchMap((code: string) => this.authApi.login(code)),
        tap(({ result }) => {
          this.authService.login(result?.token);

          this.router.navigate([RootRoute.MAIN]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
