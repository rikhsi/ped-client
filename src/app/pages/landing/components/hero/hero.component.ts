import { Component, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { SkeletonDirective } from '@shared/directives';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'ped-hero-section',
  imports: [TranslocoDirective, SkeletonDirective, NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.less'],
})
export class HeroSectionComponent {
  public showOverlay = signal<boolean>(false);

  public imageLoaded(): void {
    this.showOverlay.update((state) => !state);
  }
}
