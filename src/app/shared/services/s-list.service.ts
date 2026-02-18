import { computed, Injectable, OnDestroy, signal } from '@angular/core';
import {
  BaseResult,
  PaginationResponse,
  PaginationResultWithItems,
} from '@app/api/models';
import { buildPagination } from '@constants';
import { debounceTime, Observable, Subject, switchMap, tap } from 'rxjs';

/**
 * Универсальный сервис для управления состоянием списков данных (таблиц)
 * с поддержкой пагинации, реактивности на основе сигналов и RXJS для загрузки.
 *
 * @template T Тип данных элементов списка.
 */
@Injectable()
export class SListService<T> implements OnDestroy {
  // --- Состояние (Signals) ---

  /** Флаг состояния загрузки данных */
  public readonly isLoading = signal<boolean>(true);
  /** Текущие параметры пагинации (индекс страницы, размер страницы) */
  public readonly pagination = signal<PaginationResponse>(buildPagination());
  /** Общее количество элементов, доступных на бэкенде */
  public readonly total = signal<number>(0);
  /** Текущий массив загруженных элементов */
  public readonly items = signal<T[]>([]);

  // --- Вычисляемые сигналы (Computed) ---

  /** Текущий индекс страницы (извлеченный из pagination) */
  public readonly page = computed(() => this.pagination().pageIndex);
  /** Текущий размер страницы (извлеченный из pagination) */
  public readonly size = computed(() => this.pagination().pageSize);

  // --- События (Subjects) ---

  /** Событие, инициируемое при запросе на редактирование конкретного элемента */
  public readonly editEvent$ = new Subject<T>();
  /** Событие для запуска загрузки данных (содержит текущую метаинформацию пагинации) */
  public readonly loadMore$ = new Subject<PaginationResponse>();

  // --- Жизненный цикл ---

  /**
   * Очищает состояние при уничтожении сервиса,
   * предотвращая утечки памяти и некорректное состояние.
   */
  ngOnDestroy(): void {
    this.resetState();
    // RxJS Subjects будут автоматически очищены благодаря отсутствию ссылок,
    // но в продакшене лучше явно вызывать .complete() и .unsubscribe() для сложных потоков.
  }

  // --- Методы загрузки данных ---

  /**
   * Инициализирует загрузку списка без пагинации (когда API возвращает полный список).
   *
   * @param paginationApi Функция, возвращающая Observable с полным списком элементов.
   * @returns Observable с результатом API.
   */
  public initWithoutPagination<F, R>(
    paginationApi: () => Observable<BaseResult<T[]>>,
  ): Observable<BaseResult<T[]>> {
    return this.loadMore$.pipe(
      tap(() => this.isLoading.set(true)),
      debounceTime(500), // Задержка для предотвращения частых запросов
      switchMap(() => paginationApi()),
      tap(({ result }) => {
        // Устанавливаем общее количество равным длине полученного массива
        this.total.set(result?.length ?? 0);
        this.items.set(result);
        this.isLoading.set(false);
      }),
    );
  }

  /**
   * Инициализирует загрузку списка с поддержкой пагинации.
   *
   * @param paginationApi Функция, принимающая метаданные пагинации и возвращающая
   * Observable с результатом, содержащим элементы и общее количество.
   * @returns Observable с результатом API.
   */
  public init<F, R>(
    paginationApi: (
      meta: PaginationResponse,
    ) => Observable<BaseResult<PaginationResultWithItems<T>>>,
  ): Observable<BaseResult<PaginationResultWithItems<T>>> {
    return this.loadMore$.pipe(
      tap(() => this.isLoading.set(true)),
      debounceTime(500), // Задержка для предотвращения частых запросов
      switchMap((meta) => paginationApi(meta)),
      tap(({ result }) => {
        this.total.set(result.total);
        this.items.set(result.items);
        this.isLoading.set(false);
      }),
    );
  }

  // --- Методы управления пагинацией ---

  /**
   * Изменяет пагинацию для реализации "Загрузить больше" (Load More) с добавлением 20 элементов.
   */
  public changePagination(): void {
    this.pagination.update((current) => ({
      ...current,
      pageSize: current.pageSize + 20, // Увеличиваем размер страницы
    }));

    this.next();
  }

  /**
   * Обновляет параметры пагинации при использовании стандартного компонента пагинации (например, TuiTablePaginationEvent).
   *
   * @param payload Объект события пагинации.
   */
  public changePaginationBox(payload: PaginationResponse): void {
    this.pagination.update((current) => ({
      ...current,
      ...payload, // 🔥 filter, sort, pageIndex, pageSize
    }));

    this.next(true);
  }

  /**
   * Запускает событие загрузки данных.
   *
   * @param isFirst Если true, принудительно запускает загрузку, игнорируя проверку на общее количество.
   */
  public next(isFirst: boolean = false): void {
    const isMore = this.total() > this.items()?.length; // Проверка, есть ли еще данные для загрузки

    if (isFirst) {
      // Принудительная загрузка
      this.loadMore$.next(this.pagination());
    } else {
      // Загрузка только если есть еще страницы (для режима Load More)
      if (isMore) {
        this.loadMore$.next(this.pagination());
      }
    }
  }

  /**
   * Сброс массива элементов в пустое состояние.
   */
  public resetState(): void {
    this.items.set([]);
    this.pagination.set(null);
  }
}
