import { PaginationResultWithItems } from './pagination';
import { BaseResult } from './base';

/**
 * Изображение новости с разными разрешениями.
 */
export interface NewsImage {
  /** Уникальный идентификатор изображения (UUID) */
  id: string;

  /** Объект с URL изображений разных разрешений.
   * Ключ — размер/разрешение, значение — URL.
   * Например: { "small": "url1", "medium": "url2", "large": "url3" }
   */
  resolutions: Record<string, string>;
}

/**
 * Элемент новости.
 */
export interface NewsItem {
  /** Уникальный идентификатор новости */
  id: number;

  /** Заголовок или название новости */
  name: string;

  /** Основное изображение новости */
  mainImage: NewsImage;
}

/**
 * Результат API с пагинированным списком новостей.
 */
export type NewsListResult = BaseResult<PaginationResultWithItems<NewsItem>>;
