import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
} from '@angular/core';
import { translate, TranslocoDirective } from '@jsverse/transloco';
import { pieChartOptions } from './data';
import { LandingApiService } from '@api/controllers';
import {
  DirectionCertificateStatistics,
  RegionStatistics,
  EduDirection,
} from '@api/models';
import { PieChartData } from './models';
import { BarCardComponent, ButtonIconComponent, UzbMapComponent } from '@pages/landing/components';
import {  PieCardComponent } from './components';

@Component({
  selector: 'ped-statistics',
  imports: [
    UzbMapComponent,
    BarCardComponent,
    TranslocoDirective,
    ButtonIconComponent,
    PieCardComponent,
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  statisticsData = signal<RegionStatistics[]>([]);
  certificateStatistics = signal<DirectionCertificateStatistics[]>([]);

  pieCharts = computed<PieChartData[]>(() => {
    const stats = this.certificateStatistics();

    const directionCharts = stats
      .filter((stat) => stat.direction !== 0 && stat.direction !== 3)
      .map((stat) => this.createPieChartForDirection(stat));

    const totalChart = this.createTotalPieChart(stats);

    return [totalChart, ...directionCharts];
  });

  constructor(private landingApi: LandingApiService) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadCertificateStatistics();
  }

  getTotalCount(): number {
    return this.statisticsData().reduce(
      (sum, region) => sum + region.totalCount,
      0,
    );
  }

  private loadStatistics(): void {
    this.landingApi.getStatistics$().subscribe({
      next: (response) => {
        if (response.result) {
          this.statisticsData.set(response.result);
        }
      },
    });
  }

  private loadCertificateStatistics(): void {
    this.landingApi.getCertificateStatistics$().subscribe({
      next: (response) => {
        if (response.result) {
          this.certificateStatistics.set(response.result);
        }
      },
    });
  }

  private createPieChartForDirection(
    stat: DirectionCertificateStatistics,
  ): PieChartData {
    const total =
      stat.highsCount +
      stat.firstsCount +
      stat.secondsCount +
      stat.specialistsCount;

    const series = [
      stat.highsCount,
      stat.firstsCount,
      stat.secondsCount,
      stat.specialistsCount,
    ];

    const calculatePercent = (value: number) =>
      total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';

    return {
      title: this.getDirectionName(stat.direction),
      chartOptions: {
        ...pieChartOptions,
        series,
        plotOptions: {
          ...pieChartOptions.plotOptions,
          pie: {
            ...pieChartOptions.plotOptions.pie,
            donut: {
              ...pieChartOptions.plotOptions.pie.donut,
              labels: {
                ...pieChartOptions.plotOptions.pie.donut.labels,
                total: {
                  ...pieChartOptions.plotOptions.pie.donut.labels.total,
                  label: 'Jami kadrlar',
                },
              },
            },
          },
        },
        optionData: [
          {
            icon: 'o:graduationHat',
            iconColor: '#32B285',
            bg: '#D5F5EA',
            percent: calculatePercent(stat.highsCount),
            title: 'Oliy toifa',
            count: stat.highsCount,
          },
          {
            icon: 'o:diploma',
            iconColor: '#4B90D2',
            bg: '#D1E6F9',
            percent: calculatePercent(stat.firstsCount),
            title: 'I toifa',
            count: stat.firstsCount,
          },
          {
            icon: 'o:diplomaVerified',
            iconColor: '#9250C4',
            bg: '#E7D5F5',
            percent: calculatePercent(stat.secondsCount),
            title: 'II toifa',
            count: stat.secondsCount,
          },
          {
            icon: 'o:userCheck',
            iconColor: '#DD6946',
            bg: '#F4D9D1',
            percent: calculatePercent(stat.specialistsCount),
            title: 'Mutaxassis',
            count: stat.specialistsCount,
          },
        ],
      },
    };
  }

  private createTotalPieChart(
    stats: DirectionCertificateStatistics[],
  ): PieChartData {
    // Sum all counts across all directions (excluding direction 0)
    const filteredStats = stats.filter((stat) => stat.direction !== 0);

    const totalHighs = filteredStats.reduce(
      (sum, stat) => sum + stat.highsCount,
      0,
    );
    const totalFirsts = filteredStats.reduce(
      (sum, stat) => sum + stat.firstsCount,
      0,
    );
    const totalSeconds = filteredStats.reduce(
      (sum, stat) => sum + stat.secondsCount,
      0,
    );
    const totalSpecialists = filteredStats.reduce(
      (sum, stat) => sum + stat.specialistsCount,
      0,
    );

    const grandTotal =
      totalHighs + totalFirsts + totalSeconds + totalSpecialists;

    const series = [totalHighs, totalFirsts, totalSeconds, totalSpecialists];

    const calculatePercent = (value: number) =>
      grandTotal > 0 ? ((value / grandTotal) * 100).toFixed(1) : '0.0';

    return {
      title: translate('all_pedagogues'),
      chartOptions: {
        ...pieChartOptions,
        series,
        plotOptions: {
          ...pieChartOptions.plotOptions,
          pie: {
            ...pieChartOptions.plotOptions.pie,
            donut: {
              ...pieChartOptions.plotOptions.pie.donut,
              labels: {
                ...pieChartOptions.plotOptions.pie.donut.labels,
                total: {
                  ...pieChartOptions.plotOptions.pie.donut.labels.total,
                  label: translate('all_employers'),
                },
              },
            },
          },
        },
        optionData: [
          {
            icon: 'o:graduationHat',
            iconColor: '#32B285',
            bg: '#D5F5EA',
            percent: calculatePercent(totalHighs),
            title: translate('enum.ped_category.HIGH'),
            count: totalHighs,
          },
          {
            icon: 'o:diploma',
            iconColor: '#4B90D2',
            bg: '#D1E6F9',
            percent: calculatePercent(totalFirsts),
            title: translate('enum.ped_category.FIRST'),
            count: totalFirsts,
          },
          {
            icon: 'o:diplomaVerified',
            iconColor: '#9250C4',
            bg: '#E7D5F5',
            percent: calculatePercent(totalSeconds),
            title: translate('enum.ped_category.SECOND'),
            count: totalSeconds,
          },
          {
            icon: 'o:userCheck',
            iconColor: '#DD6946',
            bg: '#F4D9D1',
            percent: calculatePercent(totalSpecialists),
            title: translate('enum.ped_category.SPECIALIST'),
            count: totalSpecialists,
          },
        ],
      },
    };
  }

  private getDirectionName(direction: number): string {
    const directionMap: Record<number, string> = {
      [EduDirection.PRE_SCHOOL]: translate('enum.edu_direction.PRE_SCHOOL'),
      [EduDirection.GENEREAL_EDUCATION]: translate(
        'enum.edu_direction.GENEREAL_EDUCATION',
      ),
      [EduDirection.SECONDARY_SPECAIL]: translate(
        'enum.edu_direction.SECONDARY_SPECAIL',
      ),
      [EduDirection.EXTRA_CURRICULAR]: translate(
        'enum.edu_direction.EXTRA_CURRICULAR',
      ),
      [EduDirection.PRIVATE_PRE_SCHOOL]: translate(
        'enum.edu_direction.PRIVATE_PRE_SCHOOL',
      ),
      [EduDirection.PRIVATE_GENERAL_EDUCATION]: translate(
        'enum.edu_direction.PRIVATE_GENERAL_EDUCATION',
      ),
      [EduDirection.ART_AND_CULTURY_ACADEMY]: translate(
        'enum.edu_direction.ART_AND_CULTURY_ACADEMY',
      ),
      [EduDirection.SPORTS]: translate('enum.edu_direction.SPORTS'),
      [EduDirection.ASOU]: translate('enum.edu_direction.ASOU'),
    };

    return directionMap[direction] || translate('enum.edu_direction.unknown');
  }
}
