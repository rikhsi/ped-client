import { inject, Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from '@app/api/models';
import { ENUM_ITEMS_TOKEN } from '@constants';
import { EnumList, EnumItemsResult } from '@typings'; // Добавил EnumItemsResult для типизации инжекции

/**
 * Pipe для извлечения массива элементов перечисления (enum) из централизованного хранилища.
 *
 * Инжектирует объект EnumItemsResult через ENUM_ITEMS_TOKEN, который содержит
 * все предварительно сформатированные списки SelectItem (например, для использования в выпадающих списках).
 *
 * Использование в шаблоне: `[items]="[] | enumItems: 'attestation'"`
 */
@Pipe({
  name: 'enumItems',
})
export class EnumItemsPipe implements PipeTransform {
  /**
   * Инжектируем централизованный объект, содержащий все сформатированные enum-ы
   * (например, 'systemType', 'attestation', 'pedCategory' и т.д.).
   */
  enumItems: EnumItemsResult = inject(ENUM_ITEMS_TOKEN);

  /**
   * Извлекает массив SelectItem<number>[] по имени перечисления.
   *
   * Примечание: Пайп принимает фиктивное входное значение (`_`) для соответствия
   * интерфейсу PipeTransform, но основной аргумент — это `enumName`.
   *
   * @template T Обобщенный тип входного значения (игнорируется).
   * @param _ Игнорируемое входное значение.
   * @param enumName Имя перечисления (ключ в EnumItemsResult), для которого нужно получить список элементов.
   * @returns SelectItem<number>[] Массив элементов, готовых для использования в select-компонентах.
   */
  transform<T>(_: T[], enumName: EnumList): SelectItem<number>[] {
    // Возвращаем список элементов (SelectItem[]) из инжектированного хранилища по ключу enumName
    return this.enumItems[enumName];
  }
}
