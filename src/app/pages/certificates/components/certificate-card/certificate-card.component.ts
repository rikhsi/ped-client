import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoModule } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { downloadBlob } from '@shared/utils';
import { DatePipe } from '@angular/common';
import { EnumItemPipe } from '@shared/pipes';

@Component({
  selector: 'ped-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrl: './certificate-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    TranslocoModule,
    DatePipe,
    EnumItemPipe,
  ],
})
export class CertificateCardComponent {
  serialNumber = input<string>();
  givenDate = input<string>();
  expireDate = input<string>();
  isEndless = input<boolean>();
  category = input<number>();
  subject = input<string>();
  downloadApi = input<Observable<Blob>>();
  showDownload = input<boolean>();

  isLoading = signal<boolean>(false);

  onClick(): void {
    this.isLoading.set(true);

    this.downloadApi().subscribe({
      next: (res) => {
        downloadBlob(res, `${this.subject()} - ${this.serialNumber()}.pdf`);
        this.isLoading.set(false);
      },
    });
  }
}
