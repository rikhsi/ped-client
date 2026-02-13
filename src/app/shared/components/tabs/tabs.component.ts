import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { MenuItem } from '@typings';

@Component({
  selector: 'ped-tabs',
  imports: [TranslocoDirective],
  template: `
    <div class="tabs-wrapper" *transloco="let t">
      <div class="tabs">
        @for (tab of tabs(); track tab.key) {
          <button
            class="tab"
            [class.active]="activeTab() === tab.value"
            (click)="onTabClick(tab)"
            type="button"
          >
            {{ t(tab.key) }}
          </button>
        }
      </div>
    </div>
  `,
  styleUrls: ['./tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  tabs = input.required<Partial<MenuItem>[]>();
  activeTab = input<number>();
  tabChange = output<Partial<MenuItem>>();

  onTabClick(item: Partial<MenuItem>): void {
    this.tabChange.emit(item);
  }
}
