import { inject } from '@angular/core';
import { SVG_COLORFUL_ICONS } from '@app/constants/svg-colorful';
import {
  SVG_FILL_ICONS,
  SVG_OUTLINE_ICONS,
  SVG_TWO_TONE_ICONS,
} from '@constants';
import { NzIconService } from 'ng-zorro-antd/icon';
import { EMPTY, Observable } from 'rxjs';

/**
 * Провайдер инициализации иконок для приложения.
 *
 * Добавляет SVG иконки в сервис `NzIconService` с префиксами:
 * - 'f:' — иконки с заполнением (fill)
 * - 'o:' — контурные иконки (outline)
 * - 't:' — двухтоновые иконки (two-tone)
 * - 'c:' — цветные иконки (colorful)
 *
 * Возвращает Observable<void>, чтобы его можно было использовать в APP_INITIALIZER.
 */
export function iconProvider(): () => Observable<void> {
  return () => {
    const iconService = inject(NzIconService);

    // Добавление иконок с заливкой
    Object.entries(SVG_FILL_ICONS).forEach(([key, value]) => {
      iconService.addIconLiteral('f:' + key, value);
    });

    // Добавление контурных иконок
    Object.entries(SVG_OUTLINE_ICONS).forEach(([key, value]) => {
      iconService.addIconLiteral('o:' + key, value);
    });

    // Добавление двухтоновых иконок
    Object.entries(SVG_TWO_TONE_ICONS).forEach(([key, value]) => {
      iconService.addIconLiteral('t:' + key, value);
    });

    // Добавление цветных иконок
    Object.entries(SVG_COLORFUL_ICONS).forEach(([key, value]) => {
      iconService.addIconLiteral('c:' + key, value);
    });

    // Возвращаем пустой Observable, так как иконки добавляются синхронно
    return EMPTY;
  };
}
