import { Injectable, signal } from '@angular/core';
import { MenuItem } from '@typings';

@Injectable()
export class DocumentLayoutService {
  readonly activeTab = signal<number>(null);

  public defineInitialRoute(url: string, tabs: Partial<MenuItem>[]): void {
    const findedTab = tabs.find((t) => t.link === url);

    this.activeTab.set(findedTab?.value);
  }
}
