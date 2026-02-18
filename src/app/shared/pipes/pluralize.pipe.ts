import { Pipe, PipeTransform } from '@angular/core';
import {
  AGE_PREFIXES,
  BALL_PREFIXES,
  DISTRICT_PREFIXES,
  MONEY_PREFIXES,
  MONTH_PREFIXES,
  REGION_PREFIXES,
  SCHOOL_PREFIXES,
  SUBJECT_PREFIXES,
  USER_PREFIXES,
  YEAR_PREFIXES,
  RIGHT_ANSWER_PREFIXES,
  QUESTION_PREFIXES,
  DAY_PREFIXES,
} from '@constants';
import { translate } from '@jsverse/transloco';
import { pluralize } from '@shared/utils';
import { PluralizeType } from '@typings';

@Pipe({
  name: 'pluralize',
})
export class PluralizePipe implements PipeTransform {
  /**
   * Формирует строку с правильным окончанием слова
   * в зависимости от числового значения.
   *
   * Например:
   *   1 → "1 год"
   *   2 → "2 года"
   *   5 → "5 лет"
   *
   * Использует заранее определённые наборы префиксов (AGE, MONTH, YEAR),
   * а также вспомогательную функцию `pluralize`.
   *
   * @param value число (например, количество лет/месяцев/возраст)
   * @param type тип склонения: 'age' | 'month' | 'year' (по умолчанию 'age')
   * @param withValue если true — выводится вместе с числом (`"5 лет"`),
   *                  если false — только слово (`"лет"`)
   * @returns строка с правильным склонением
   */
  transform(
    value: number,
    type: PluralizeType,
    withValue: boolean = true,
  ): string {
    // Карта доступных словоформ по типам
    const prefixMap = {
      month: MONTH_PREFIXES,
      year: YEAR_PREFIXES,
      age: AGE_PREFIXES,
      user: USER_PREFIXES,
      school: SCHOOL_PREFIXES,
      region: REGION_PREFIXES,
      district: DISTRICT_PREFIXES,
      subject: SUBJECT_PREFIXES,
      money: MONEY_PREFIXES,
      ball: BALL_PREFIXES,
      question: QUESTION_PREFIXES,
      right_answer: RIGHT_ANSWER_PREFIXES,
      day: DAY_PREFIXES,
    };

    // Получаем правильное окончание
    const suffix = translate(pluralize(value, prefixMap[type] ?? AGE_PREFIXES));

    // В зависимости от withValue возвращаем число со словом или только слово
    return withValue ? `${value} ${suffix}` : suffix;
  }
}
