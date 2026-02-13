import { Pipe, PipeTransform } from '@angular/core';
import { CertificateAttachedSerial } from '@api/models';

@Pipe({
  name: 'certificateSerial',
})
export class CertificateSerialPipe implements PipeTransform {
  /**
   * Преобразует объект с данными имени в строку полного имени.
   *
   * @template T Тип объекта, который должен включать поля firstname, middlename и lastname.
   * @param value Объект, содержащий поля имени.
   * @returns string Строка полного имени (Фамилия Имя Отчество).
   */
  transform<T extends CertificateAttachedSerial>(value: T): string {
    // Используем оператор объединения с null (??) для безопасного извлечения значений.
    // Если значение отсутствует (null или undefined), подставляется ' -- '.
    return `${value?.serial?.serialKey ?? ' -- '} ${value?.number ?? ' -- '}`;
  }
}
