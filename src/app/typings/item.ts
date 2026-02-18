import { Type } from '@angular/core';
import { SelectItem } from '@api/models';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Интерфейс элемента меню.
 *
 * Расширяет SelectItem<T> и добавляет свойства, необходимые для отображения меню:
 *
 * @template T — тип значения, по умолчанию NzSafeAny
 */
export interface MenuItem<T = NzSafeAny> extends SelectItem<T> {
  /** URL или маршрут, на который ссылается элемент меню */
  link: string;

  /** Флаг, указывающий, активен ли элемент меню в данный момент */
  isActive: boolean;

  /** Флаг, показывающий, является ли пункт опасным (например, удаление данных) */
  danger: boolean;

  /** Иконка, отображаемая после текста пункта меню */
  suffixIcon: string;

  /** Иконка, отображаемая перед текстом пункта меню */
  prefixIcon: string;

  /** Показывать ли элемент в мобильной навигации */
  showInMobileNav: boolean;
}

/**
 * Определяет приоритет отображения информации в интерфейсе.
 *
 * - 'label' — приоритет отображения текста/метки
 * - 'values' — приоритет отображения значения
 */
export type ItemInfoPriority = 'label' | 'values';
