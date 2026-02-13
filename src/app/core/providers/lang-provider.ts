import { inject } from '@angular/core';
import { DEFAULT_LANGUAGE, LocalStorageItem } from '@constants';
import { LanguageService, LocalStorageService } from '@core/services';
import { EMPTY, Observable } from 'rxjs';

/**
 * Фабрика для инициализации языка приложения при старте
 *
 * Используется в APP_INITIALIZER, чтобы сразу выставить локаль:
 * - Сначала проверяется язык, сохранённый в LocalStorage
 * - Если его нет — устанавливается DEFAULT_LANGUAGE
 */
export function langProvider(): () => Observable<void> {
  return () => {
    const storageService = inject(LocalStorageService);
    const languageService = inject(LanguageService);

    // Получаем последний выбранный язык из localStorage
    const lastLang =
      (storageService.getItem(LocalStorageItem.LANG) as string) ??
      DEFAULT_LANGUAGE;

    // Обновляем локаль без перезагрузки страницы
    languageService.updateLocale(lastLang, false);

    // Возвращаем EMPTY, чтобы соответствовать типу Observable<void>
    return EMPTY;
  };
}
