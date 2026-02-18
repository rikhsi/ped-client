import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-pie-card',
  standalone: true,
  imports: [NgApexchartsModule, NzIconDirective],
  templateUrl: './pie-card.component.html',
  styleUrl: './pie-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieCardComponent {
  chartOptions = input<any>();
  title = input<string>();
}
