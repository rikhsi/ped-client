import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import {
  LoadingComponent,
  SwiperContainerComponent,
  SwiperSlideComponent,
} from '@shared/components';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LandingApiService } from '@api/controllers';
import { Season } from '@api/models';

import { AuthService } from '@core/services/auth.service';
import { ApplicationRoute, MainRoute, RootRoute } from '@constants';
import { environment } from 'src/environments/environment';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'ped-seasons-section',
  imports: [
    TranslocoModule,
    ButtonIconComponent,
    NzIconModule,
    LoadingComponent,
    SwiperContainerComponent,
    SwiperSlideComponent,
  ],
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonsSectionComponent implements OnInit {
  private landingApi = inject(LandingApiService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private defaultImage = './images/default.png';

  seasons = signal<Season[]>([]);
  isLoading = signal<boolean>(false);

  swiperOptions = signal<SwiperOptions>({
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      1400: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
    },
  });

  ngOnInit(): void {
    this.loadSeasons();
  }

  handleViewDetails(): void {
    const isTokenValid = this.authService.isAuthenticated();

    if (isTokenValid) {
      this.router.navigate([
        RootRoute.MAIN,
        MainRoute.APPLICATIONS,
        ApplicationRoute.SELECT,
      ]);
    } else {
      window.open(environment.oneId, '_self');
    }
  }

  getSeasonImage(season: Season): string {
    switch (season.id) {
      case 49: {
        return './images/direct.png';
      }
      case 52: {
        return './images/mmtv.png';
      }
    }

    return this.defaultImage;
  }

  private loadSeasons(): void {
    this.isLoading.set(true);

    this.landingApi.getAllSeasons$().subscribe({
      next: (response) => {
        this.seasons.set(response.result || []);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
