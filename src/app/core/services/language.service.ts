
import { Inject, Injectable, signal, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  Brand,
  DEFAULT_LANGUAGE,
  LANGUAGE_LOCALE,
  LocalStorageItem,
} from '@constants';
import { TranslocoService } from '@jsverse/transloco';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { LocalStorageService } from './local-storage.service';

/**
 * Сервис для управления языком приложения
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /** Сигнал с текущим активным языком */
  readonly activeLang = signal<string>(DEFAULT_LANGUAGE);

  /** Удобный геттер для document.documentElement (<html>) */
  get documentEl(): HTMLElement {
    return this.document.documentElement;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, // доступ к глобальному объекту document
    private meta: Meta, // сервис для управления meta-тегами
    private title: Title, // сервис для управления title страницы
    private i18nService: NzI18nService, // сервис локализации Ant Design (ng-zorro)
    private translocoService: TranslocoService, // сервис локализации Transloco
    private localStorage: LocalStorageService, // обертка над localStorage
  ) {}

  /**
   * Метод для смены языка приложения
   * @param lang - код языка, например 'ru' или 'en'
   * @param reload - нужно ли перезагружать страницу после смены (по умолчанию true)
   */
  updateLocale(lang: string, reload: boolean = true): void {
    // --- Обновляем язык в Transloco ---
    this.translocoService.setActiveLang(lang);

    // --- Сохраняем выбор пользователя в localStorage ---
    this.localStorage.setItem(LocalStorageItem.LANG, lang);

    // --- Обновляем сигнал с текущим языком ---
    this.activeLang.set(lang);

    // --- Обновляем meta-теги и локализацию Ant Design ---
    this.translocoService.selectTranslateObject('').subscribe({
      next: ({}) => {
        // Устанавливаем title страницы (например, "PEDAGOG")
        this.title.setTitle(`${Brand.PEDAGOG}`);

        // Обновляем meta-тег с локалью
        this.meta.updateTag({
          name: 'locale',
          content: lang,
        });

        // Обновляем meta-тег http-equiv для Content-Language
        this.meta.updateTag({
          'http-equiv': 'Content-Language',
          content: lang,
        });

        // Обновляем локаль Ant Design (для компонентов AntD)
        this.i18nService.setLocale(LANGUAGE_LOCALE[lang]);

        // Обновляем lang у тега <html>
        this.documentEl.lang = lang;
      },
    });

    // --- Перезагрузка страницы (если нужно) ---
    if (reload) {
      window.location.reload();
    }
  }
}
