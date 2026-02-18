import { Pipe, PipeTransform } from '@angular/core';
import { differenceInYears, parseISO, isValid } from 'date-fns';

/**
 * Pipe для вычисления возраста в полных годах на основе даты рождения.
 * Использует библиотеку date-fns.
 *
 * Использование в шаблоне: `{{ dateOfBirth | age }}`
 */
@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  /**
   * Вычисляет возраст по дате рождения.
   *
   * @param birthDate дата рождения (строка или объект Date)
   * @returns возраст в годах (если дата некорректная → 0)
   */
  transform(birthDate: Date | string): number {
    if (!birthDate) return 0;

    let birth: Date;

    if (typeof birthDate === 'string') {
      birth = parseISO(birthDate); // Преобразуем ISO-строку в Date
    } else {
      birth = birthDate;
    }

    if (!isValid(birth)) return 0;

    return differenceInYears(new Date(), birth);
  }
}
