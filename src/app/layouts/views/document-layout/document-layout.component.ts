import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { DOCUMENT_LAYOUT_ITEMS } from '@layouts/data';
import { DocumentLayoutService } from '@layouts/services/document-layout.service';
import { SelectDefaultComponent, TabsComponent } from '@shared/components';
import { MenuItem } from '@typings';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'ped-document-layout',
  imports: [
    TranslocoDirective,
    SelectDefaultComponent,
    TabsComponent,
    NzOptionComponent,
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './document-layout.component.html',
  styleUrl: './document-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DocumentLayoutService],
})
export class DocumentLayoutComponent implements OnInit {
  readonly tabs = DOCUMENT_LAYOUT_ITEMS;

  readonly activeTab = computed(() => this.dlService.activeTab());

  constructor(
    private dlService: DocumentLayoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dlService.defineInitialRoute(this.router.url, this.tabs);
  }

  onTabChange(tab: Partial<MenuItem>): void {
    this.dlService.activeTab.set(tab.value);

    this.router.navigate([tab.link]);
  }

  onSelectChange(value: number): void {
    const findedTab = this.tabs.find((t) => t.value === value);

    this.dlService.activeTab.set(findedTab.value);
    this.router.navigate([findedTab.link]);
  }
}
