import { Pipe, PipeTransform } from '@angular/core';
import { UserFullName } from '@typings';

/**
 * Pipe для форматирования объекта, содержащего имя, фамилию и отчество,
 * в полную строку имени в формате: Фамилия Имя Отчество.
 *
 * Обрабатывает null/undefined значения полей, заменяя их на ' -- '.
 *
 * Использование в шаблоне: `{{ user | fullname }}`
 */
@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  /**
   * Преобразует объект с данными имени в строку полного имени.
   *
   * @template T Тип объекта, который должен включать поля firstname, middlename и lastname.
   * @param value Объект, содержащий поля имени.
   * @returns string Строка полного имени (Фамилия Имя Отчество).
   */
  transform<T extends UserFullName>(value: T): string {
    // Используем оператор объединения с null (??) для безопасного извлечения значений.
    // Если значение отсутствует (null или undefined), подставляется ' -- '.
    return `${value?.lastname ?? ' -- '} ${value?.firstname ?? ' -- '} ${
      value?.middlename ?? ' -- '
    }`;
  }
}
