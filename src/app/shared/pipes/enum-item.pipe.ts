import { inject, Pipe, PipeTransform } from '@angular/core';
import { ENUM_ITEMS_TOKEN } from '@constants';
import { EnumList, EnumItemsResult } from '@typings';
import { SelectItem } from '@app/api/models'; // Добавляем для типизации SelectItem

/**
 * Pipe для извлечения ключа перевода (string key) из элемента перечисления (enum)
 * по его числовому значению (value).
 *
 * Используется для отображения текстового представления enum-значения,
 * полученного, например, из API.
 *
 * Инжектирует объект EnumItemsResult через ENUM_ITEMS_TOKEN.
 *
 * Использование в шаблоне: `{{ 1 | enumItem: 'attestation' }}`
 */
@Pipe({
  name: 'enumItem',
})
export class EnumItemPipe implements PipeTransform {
  /**
   * Инжектируем централизованный объект, содержащий все сформатированные enum-ы.
   */
  enumItems: EnumItemsResult = inject(ENUM_ITEMS_TOKEN);

  /**
   * Ищет элемент в списке перечисления по числовому значению (value)
   * и возвращает его ключ перевода (key).
   *
   * @param value Числовое значение enum (например, 1, 2, 3...).
   * @param type Имя перечисления (ключ в EnumItemsResult), в котором нужно искать.
   * @returns string | undefined Ключ перевода ('enum.attestation.1') или undefined, если элемент не найден.
   */
  transform(value: number, type: EnumList): string | undefined {
    // Находим нужный элемент в массиве SelectItem по его значению (value)
    // и возвращаем его ключ (key). Используем опциональную цепочку (?) для безопасности.
    // Добавлена проверка this.enumItems[type] для предотвращения ошибок, если список отсутствует.
    return this.enumItems[type]?.find((item: SelectItem<number>) => item.value === value)?.key;
  }
}
