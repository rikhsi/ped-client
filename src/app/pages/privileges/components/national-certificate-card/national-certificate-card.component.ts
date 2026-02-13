import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoModule } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ped-national-certificate-card',
  templateUrl: './national-certificate-card.component.html',
  styleUrl: './national-certificate-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTypographyModule,
    TranslocoModule,
    NzIconModule,
    NzTagModule,
  ],
})
export class NationalCertificateCardComponent {
  documentNumber = input<string>();
  documentSeries = input<string>();
  subject = input<string>();
  givenOrganization = input<string>();
  certificateTypeLevelName = input<string>();
  startDate = input<string>();
  endDate = input<string>();
  isVerified = input<boolean>();
}
