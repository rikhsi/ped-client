import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoDirective } from '@jsverse/transloco';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ped-diploma-card',
  templateUrl: './diploma-card.component.html',
  styleUrl: './diploma-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTypographyModule, TranslocoDirective, DatePipe],
})
export class DiplomaCardComponent {
  institutionName = input<string>();
  specialityName = input<string>();
  educationLevel = input<number | string>();
  diplomaSerial = input<string>();
  diplomaNumber = input<string>();
  givenDate = input<string>();
}
