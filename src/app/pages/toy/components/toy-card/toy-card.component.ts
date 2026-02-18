import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-toy-card',
  imports: [TranslocoDirective, NzButtonComponent, NzIconDirective],
  templateUrl: './toy-card.component.html',
  styleUrl: './toy-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToyCardComponent {
  fullName = input<string>();
  regionName = input<string>();
  districtName = input<string>();
  institutionName = input<string>();
  subjectName = input<string>();
  theme = input<string>();
  stepCount = input<number>(2);
  isTeacherOfYear = input<boolean>();
  interviewScore = input<number>();
  votingScore = input<number>();

  pointingClick = output<void>();
}
