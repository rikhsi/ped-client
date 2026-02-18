import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  NzDropdownMenuComponent,
  NzDropdownDirective,
} from 'ng-zorro-antd/dropdown';
import { NgOptimizedImage } from '@angular/common';
import { SkeletonDirective } from '@shared/directives';
import { FlagPathPipe } from './flag-path.pipe';

@Component({
  selector: 'ped-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrl: './language-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NzButtonComponent,
    NzDropdownMenuComponent,
    NzDropdownDirective,
    NgClass,
    NgOptimizedImage,
    SkeletonDirective,
    FlagPathPipe,
  ],
})
export class LanguageMenuComponent {
  readonly languageChange = output<string>();

  get activeLang(): string {
    return this.translocoService.getActiveLang();
  }

  get availableLangs(): string[] {
    return this.translocoService.getAvailableLangs() as string[];
  }

  constructor(private translocoService: TranslocoService) {}
}
