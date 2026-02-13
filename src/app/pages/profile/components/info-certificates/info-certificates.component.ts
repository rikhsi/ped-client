import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Certificate } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { EnumItemPipe } from '@shared/pipes';

@Component({
  selector: 'ped-info-certificates',
  imports: [TranslocoDirective, DatePipe, EnumItemPipe],
  templateUrl: './info-certificates.component.html',
  styleUrl: './info-certificates.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCertificatesComponent {
  items = input<Certificate[]>();
}
