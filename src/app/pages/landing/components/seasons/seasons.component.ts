import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { LoadingComponent } from '@shared/components';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LandingApiService } from '@api/controllers';
import { Season } from '@api/models';

import { AuthService } from '@core/services/auth.service';
import { ApplicationRoute, MainRoute, RootRoute } from '@constants';
import { environment } from 'src/environments/environment';
import { ButtonIconComponent } from '../button-icon/button-icon.component';

@Component({
  selector: 'ped-seasons-section',
  imports: [
    TranslocoModule,
    ButtonIconComponent,
    NzIconModule,
    LoadingComponent
],
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonsSectionComponent implements OnInit, OnDestroy {
  private landingApi = inject(LandingApiService);
  private router = inject(Router);
  private authService = inject(AuthService);

  seasons = signal<Season[]>([]);
  isLoading = signal<boolean>(false);
  currentSlide = signal<number>(0);
  itemsPerSlide = signal<number>(3);

  private defaultImage = './images/default.png';

  resizeListener = () => {
    this.checkScreenSize();
  };

  chunkedSeasons = computed(() => {
    const items = this.seasons();
    const chunkSize = this.itemsPerSlide();
    const chunks: Season[][] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }
    return chunks;
  });

  totalSlides = computed(() => this.chunkedSeasons().length);

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.resizeListener);
    this.loadSeasons();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  checkScreenSize(): void {
    const width = window.innerWidth;
    // Require wider screen for 3 cards to prevent cutoff
    if (width >= 1350) {
      this.updateItemsPerSlide(3);
    } else if (width >= 992) {
      this.updateItemsPerSlide(2);
    } else {
      this.updateItemsPerSlide(1);
    }
  }

  private updateItemsPerSlide(count: number): void {
    if (this.itemsPerSlide() !== count) {
      this.itemsPerSlide.set(count);
      this.currentSlide.set(0); // Reset to first slide on layout change
    }
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

  nextSlide(): void {
    const total = this.totalSlides();
    if (total > 0) {
      this.currentSlide.update((current) => (current + 1) % total);
    }
  }

  prevSlide(): void {
    const total = this.totalSlides();
    if (total > 0) {
      this.currentSlide.update((current) => (current - 1 + total) % total);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  touchStartX = 0;
  touchEndX = 0;

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    if (this.touchStartX - this.touchEndX > swipeThreshold) {
      this.nextSlide();
    }
    if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.prevSlide();
    }
  }
}
