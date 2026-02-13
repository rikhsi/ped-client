import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CertificateSearchParams } from '@pages/certificate-validation/models';
import { CertificateSerial } from '@api/models';

@Component({
  selector: 'ped-certificate-search',
  standalone: true,
  imports: [
    TranslocoDirective,
    FormsModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './certificate-search.component.html',
  styleUrl: './certificate-search.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificateSearchComponent {
  search = output<CertificateSearchParams>();
  isLoading = input<boolean>();

  selectedSeries = signal<number>(null);
  certificateNumber = signal<string>('');

  // Mock data for certificate series
  readonly certificateSeries = input<CertificateSerial[]>();

  onSearch(): void {
    if (this.selectedSeries() && this.certificateNumber()) {
      this.search.emit({
        serialId: this.selectedSeries(),
        number: this.certificateNumber(),
      });
    }
  }
}
