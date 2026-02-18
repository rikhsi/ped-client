import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Пайп для безопасного использования URL ресурсов
 *
 * Преобразует обычный URL в SafeResourceUrl, обходя механизмы безопасности Angular
 * для использования в iframe, embed, object и других тегах, загружающих внешние ресурсы.
 *
 * @example
 * <!-- Безопасное использование YouTube iframe -->
 * <iframe [src]="videoUrl | safeResourceUrl"></iframe>
 *
 * <!-- Использование с PDF -->
 * <embed [src]="pdfUrl | safeResourceUrl" type="application/pdf">
 *
 * <!-- С условием -->
 * <iframe *ngIf="url" [src]="url | safeResourceUrl"></iframe>
 */
@Pipe({
  name: 'safeResourceUrl',
  standalone: true,
})
export class SafeResourceUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string | null | undefined): SafeResourceUrl {
    if (!url) return '';

    let embedUrl = url;

    // 1. Handle tube.uzedu.uz
    if (url.includes('tube.uzedu.uz/w/')) {
      embedUrl = url.replace('/w/', '/videos/embed/');
    }

    // 2. Handle youtu.be (short links)
    else if (url.includes('youtu.be/')) {
      const id = url.split('/').pop()?.split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    // 3. Handle youtube.com (standard links)
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URL(url).searchParams;
      const id = urlParams.get('v');
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    // Now tell Angular this specifically formatted URL is safe
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
