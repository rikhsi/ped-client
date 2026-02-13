import { SelectItem } from '@api/models';
import { translate } from '@jsverse/transloco';

export function createSelectItemByEnum<
  T extends Record<string, string | number>,
>(enumObj: T, prefix: string): SelectItem<T[keyof T]>[] {
  return Object.entries(enumObj)
    .filter(([key, value]) => typeof value === 'number') // фильтруем только числовые значения (для исключения обратных мап в enum)
    .map(([key, value]) => ({
      key: translate(`enum.${prefix}.${key}`),
      value: value as T[keyof T],
    }));
}
