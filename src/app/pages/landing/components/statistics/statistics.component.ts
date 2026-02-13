import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { LandingApiService } from '@api/controllers';
import { RegionStatistics } from '@api/models';
import { RouterLink } from '@angular/router';
import { UzbMapComponent } from '../uzb-map/uzb-map.component';
import { BarCardComponent } from '../bar-card/bar-card.component';
import { ButtonIconComponent } from '../button-icon/button-icon.component';

@Component({
  selector: 'ped-statistics',
  imports: [
    UzbMapComponent,
    TranslocoDirective,
    ButtonIconComponent,
    NzButtonComponent,
    RouterLink,
    BarCardComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  readonly statisticsData = signal<RegionStatistics[]>([]);

  readonly totalCount = computed<number>(() =>
    this.statisticsData().reduce((sum, region) => sum + region.totalCount, 0),
  );

  constructor(private landingApi: LandingApiService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.landingApi.getStatistics$().subscribe({
      next: ({ result }) => {
        this.statisticsData.set(result ?? []);
      },
    });
  }
}
