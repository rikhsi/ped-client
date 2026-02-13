import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RegionStatistics } from '@api/models';

@Component({
  selector: 'ped-bar-card',
  standalone: true,
  templateUrl: './bar-card.component.html',
  styleUrl: './bar-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarCardComponent {
  data = input<RegionStatistics[]>([]);
  title = input<string>();

  sortedData = computed(() => {
    const apiData = this.data();
    return [...apiData].sort((a, b) => b.totalCount - a.totalCount);
  });

  maxValue = computed(() => {
    const data = this.sortedData();
    return data.length > 0 ? Math.max(...data.map((r) => r.totalCount)) : 1;
  });

  getBarWidth(count: number): string {
    return `${(count / this.maxValue()) * 100}%`;
  }
}
