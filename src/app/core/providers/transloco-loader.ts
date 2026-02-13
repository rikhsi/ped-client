import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable, map } from 'rxjs';
import { TranslationsApiService } from '@api/controllers';

/**
 * Загрузчик переводов для Transloco.
 *
 * Получает список переводов с сервера через TranslationsApiService
 * и преобразует массив объектов { key, value } в объект { [key]: value }.
 */
@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private languageApi = inject(TranslationsApiService);

  getTranslation(): Observable<Translation> {
    return this.languageApi.getTranslations$().pipe(
      map(({ result }) => {
        // Если переводов нет — возвращаем пустой объект
        if (!result || result.length === 0) {
          return {};
        }

        // Преобразуем массив { key, value } в объект { key: value }
        return result.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Translation);
      }),
    );
  }
}
