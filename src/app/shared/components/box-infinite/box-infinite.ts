import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { LoadingComponent } from '../loading/loading.component';
import { EmptyComponent } from '../empty/empty.component';

@Component({
  selector: 'ped-box-infinite',
  imports: [
    NzSpinComponent,
    InfiniteScrollDirective,
    NgClass,
    TranslocoDirective,
    LoadingComponent,
    EmptyComponent,
  ],
  templateUrl: './box-infinite.html',
  styleUrl: './box-infinite.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxInfinite {
  isLoading = input<boolean>();
  showContent = input<boolean>();
  customLayout = input<boolean>();
  emptyTitle = input<string>('empty.list');
  onScroll = output<void>();
}
