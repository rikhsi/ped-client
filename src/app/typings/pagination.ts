import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Элемент формы для хранения пары "ключ-значение" 
 * для сортировки или фильтрации.
 */
export interface PaginationFormItem {
  /** Имя поля для сортировки/фильтрации */
  key: FormControl<string>;

  /** Значение поля (может быть любым типом) */
  value: FormControl<NzSafeAny>;
}

/**
 * Структура формы для управления пагинацией, сортировкой и фильтрацией.
 */
export interface PaginationFormType {
  /** Текущая страница */
  pageIndex: FormControl<number>;

  /** Размер страницы (количество элементов на странице) */
  pageSize: FormControl<number>;

  /**
   * Массив групп для сортировки
   * Каждая группа описывает поле и направление сортировки
   */
  sort: FormArray<FormGroup<PaginationFormItem>>;

  /**
   * Массив групп для фильтрации
   * Каждая группа описывает поле и значение фильтра
   */
  filter: FormArray<FormGroup<PaginationFormItem>>;
}
