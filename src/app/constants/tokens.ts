import { InjectionToken } from '@angular/core';
import { EnumItemsResult, TableClickFunc } from '@typings'; // Предполагается, что это путь к вашим моделям
import { HttpContextToken } from '@angular/common/http';

/**
 * Уникальный токен внедрения (Injection Token) для предоставления
 * результатов запроса перечислений (EnumItemsResult) в рамках Angular-приложения.
 *
 * Этот токен используется для доступа к данным перечислений (например, спискам категорий, типов и т.п.),
 * которые, вероятно, были загружены один раз при инициализации приложения.
 */
export const ENUM_ITEMS_TOKEN = new InjectionToken<EnumItemsResult>(
  'ENUM_ITEMS_TOKEN',
);

export const SHOW_ERROR_NOTIFICATION = new HttpContextToken<boolean>(
  () => true,
);

export const TABLE_CLICK = new InjectionToken<TableClickFunc>('TABLE_CLICK');
