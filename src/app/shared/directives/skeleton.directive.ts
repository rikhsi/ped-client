import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  OnDestroy,
  model,
  AfterViewInit,
} from '@angular/core';

/**
 * Директива skeleton-загрузки.
 *
 * Поддерживает:
 * - Любые DOM-элементы
 * - Автоматическое определение загрузки для <img>
 * - Добавление CSS-класса skeleton, пока элемент "загружается"
 */
@Directive({
  selector: '[pedSkeleton]',
  standalone: true,
})
export class SkeletonDirective implements AfterViewInit, OnDestroy {
  /** Сигнал состояния загрузки. true = идет загрузка, false = загрузка завершена */
  isLoading = model<boolean | null>(null, { alias: 'pedSkeleton' });

  /** Функции отписки от событий load/error у img */
  private loadUnlisten?: () => void;
  private errorUnlisten?: () => void;

  /** Хост-элемент директивы */
  get host() {
    return this.el.nativeElement;
  }

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {
    // ------------------------
    // Эффект: реактивно управляет классом skeleton
    // ------------------------
    effect(() => {
      if (this.isLoading()) {
        // добавляем класс skeleton, если идет загрузка
        this.renderer.addClass(this.host, 'ped-skeleton-host');
      } else {
        // удаляем класс, когда загрузка завершена
        this.renderer.removeClass(this.host, 'ped-skeleton-host');
      }
    });
  }

  // ------------------------
  // Lifecycle Hooks
  // ------------------------
  ngAfterViewInit() {
    this.initImage(); // проверка для <img> элементов
  }

  ngOnDestroy() {
    // отписка от событий load/error
    this.loadUnlisten?.();
    this.errorUnlisten?.();
  }

  // ------------------------
  // Private методы
  // ------------------------

  /**
   * Инициализация <img> для skeleton
   *
   * - Если img уже загружен (complete && naturalWidth > 0), isLoading = false
   * - Иначе подписываемся на события load/error
   */
  private initImage(): void {
    const isImg = this.host.tagName === 'IMG';

    if (isImg) {
      const img = this.host as HTMLImageElement;

      if (img.complete && img.naturalWidth > 0) {
        // изображение уже загружено
        this.isLoading.set(false);
      } else {
        // изображение еще загружается
        this.isLoading.set(true);

        // подписка на событие load
        this.loadUnlisten = this.renderer.listen(img, 'load', () => {
          this.isLoading.set(false);
        });

        // подписка на событие error
        this.errorUnlisten = this.renderer.listen(img, 'error', () => {
          // можно оставить skeleton или показать ошибку
          this.isLoading.set(true);
        });
      }
    }
  }
}
