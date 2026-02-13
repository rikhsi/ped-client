import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ped-item-file',
  templateUrl: './item-file.component.html',
  styleUrl: './item-file.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslocoDirective, NgClass],
})
export class ItemFileComponent {
  url = input.required<string>();
  name = input<string>();
  type = input<string>();
  mayOpen = input<boolean>();
  isLocal = input<boolean>(true);

  readonly icon = computed(() => `images/file/${this.type()}.png`);

  open(): void {
    const url = !this.isLocal()
      ? `${environment.fileUrl}${this.url()}`
      : this.url();

    if (this.mayOpen()) {
      window.open(url, '_blank');
    }
  }
}
