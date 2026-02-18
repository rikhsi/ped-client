import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoModule } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ped-stc-certificate-card',
  templateUrl: './stc-certificate-card.component.html',
  styleUrl: './stc-certificate-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTypographyModule,
    TranslocoModule,
    NzIconModule,
  ],
})
export class StcCertificateCardComponent {
  number = input<string>();
  level = input<string>();
  subject = input<string>();
  ball = input<string>();
  startDate = input<string>();
  endDate = input<string>();
}
