import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TranslocoModule } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePipe } from '@angular/common';
import { EnumItemPipe } from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';
import { downloadBlob } from '@shared/utils';

@Component({
  selector: 'ped-ustama-achievement-card',
  templateUrl: './ustama-achievement-card.component.html',
  styleUrl: './ustama-achievement-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzTypographyModule,
    TranslocoModule,
    NzIconModule,
    DatePipe,
    EnumItemPipe,
    NzButtonComponent,
  ],
})
export class UstamaAchievementCardComponent {
  seasonName = input<string>();
  subjectName = input<string>();
  category = input<number>();
  givenDate = input<string>();
  validDate = input<string>();
  isLoading = model<boolean>();
  downloadApi = input<Observable<Blob>>();

  onClick(): void {
    this.isLoading.set(true);

    this.downloadApi().subscribe({
      next: (res) => {
        downloadBlob(res, `${this.subjectName()} - ${this.seasonName()}.pdf`);
        this.isLoading.set(false);
      },
    });
  }
}
