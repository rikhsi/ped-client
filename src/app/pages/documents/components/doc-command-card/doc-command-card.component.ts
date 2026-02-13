import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { EkadrCommandItem } from '@api/models/ekadr';
import { TranslocoDirective } from '@jsverse/transloco';
import { CollapsibleCardComponent, ItemComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-doc-command-card',
  imports: [
    CollapsibleCardComponent,
    ItemComponent,
    TranslocoDirective,
    NzButtonComponent,
    NzIconDirective,
  ],
  templateUrl: './doc-command-card.component.html',
  styleUrl: './doc-command-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocCommandCardComponent {
  readonly item = input<EkadrCommandItem>();
  readonly isLoading = input<boolean>();

  readonly expanded = signal<boolean>(false);

  clicked = output<void>();

  toggleExpand(): void {
    this.expanded.update((current) => !current);
  }
}
