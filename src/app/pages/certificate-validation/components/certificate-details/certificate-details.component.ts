import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { Certificate } from '@api/models';
import {
  CertStatusColorPipe,
  CertStatusPipe,
  EnumItemPipe,
  FullnamePipe,
} from '@shared/pipes';
import { ChipComponent } from '@shared/components';

@Component({
  selector: 'ped-certificate-details',
  standalone: true,
  imports: [
    TranslocoDirective,
    FullnamePipe,
    ChipComponent,
    CertStatusColorPipe,
    CertStatusPipe,
  ],
  templateUrl: './certificate-details.component.html',
  styleUrl: './certificate-details.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateDetailsComponent {
  certificate = input.required<Certificate>();
}
