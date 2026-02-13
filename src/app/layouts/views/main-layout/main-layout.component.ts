import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { provideNzIconsPatch } from 'ng-zorro-antd/icon';
import {
  ArrowLeftOutline,
  EyeOutline,
  GlobalOutline,
  HomeOutline,
  NotificationOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { AuthService, LanguageService } from '@core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import {
  MainHeaderComponent,
  MainSidebarMenuComponent,
} from '@layouts/components';
import {
  MAIN_LAYOUT_NAVIGATION_ITEMS,
  MAIN_LAYOUT_BOTTOM_MENU_ITEMS,
} from '@layouts/data';
import { MainLayoutService } from '@layouts/services';

@Component({
  selector: 'ped-main-layout',
  imports: [
    MainHeaderComponent,
    RouterOutlet,
    NzDropdownModule,
    MainSidebarMenuComponent,
    NgClass,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MainLayoutService,
    [
      provideNzIconsPatch([
        GlobalOutline,
        NotificationOutline,
        UserOutline,
        HomeOutline,
        ArrowLeftOutline,
        EyeOutline,
      ]),
    ],
  ],
})
export class MainLayoutComponent implements OnInit {
  notificationList = computed(() => this.mlService.notificationList());
  showNavigation = computed(() => this.mlService.showNavigation());

  navigation = MAIN_LAYOUT_NAVIGATION_ITEMS;
  bottomMenu = MAIN_LAYOUT_BOTTOM_MENU_ITEMS;

  readonly profile = computed(() => this.authService.user());

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private mlService: MainLayoutService,
    private destroyRef: DestroyRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.mlService
      .routeDataListener$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.router.navigate([], {
      onSameUrlNavigation: 'reload',
      queryParamsHandling: 'merge',
    });
  }

  langChange(lang: string): void {
    this.languageService.updateLocale(lang);
  }

  logout(): void {
    this.authService.logout(true);
  }
}
