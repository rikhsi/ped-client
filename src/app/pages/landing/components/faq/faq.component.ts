import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { COLLAPSE } from '@shared/animations';
import { NgClass } from '@angular/common';
import { FaqItem } from '@pages/landing/models';
import { FAQ_DATA } from '@pages/landing/data';

@Component({
  selector: 'ped-faq',
  imports: [TranslocoDirective, NzIconDirective, NgClass],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [COLLAPSE],
})
export class FaqComponent {
  readonly faqItems = signal<FaqItem[]>(FAQ_DATA);

  public toggle(index: number): void {
    this.faqItems.update((items) =>
      items.map((item, i) =>
        i === index ? { ...item, isOpen: !item.isOpen } : item,
      ),
    );
  }
}
