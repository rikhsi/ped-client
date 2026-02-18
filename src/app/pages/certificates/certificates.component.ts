import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { CertificateCardComponent } from './components';
import { SListService } from '@shared/services';
import { BoxInfinite } from '@shared/components';
import { AuthService } from '@core/services';
import { CertificatesApiService } from '@api/controllers';

@Component({
  selector: 'ped-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CertificateCardComponent, BoxInfinite, TranslocoDirective],
  providers: [SListService],
})
export class CertificatesComponent {
  readonly items = computed(() => this.authService.certificates());

  constructor(
    private authService: AuthService,
    public caService: CertificatesApiService,
  ) {}
}
