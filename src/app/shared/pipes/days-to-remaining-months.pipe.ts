// days-to-remaining-months.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const DAYS_IN_YEAR = 365.25;
const DAYS_IN_MONTH = DAYS_IN_YEAR / 12; // ≈ 30.44

@Pipe({
  name: 'daysToRemainingMonths',
  pure: true,
})
export class DaysToRemainingMonthsPipe implements PipeTransform {
  transform(days: number | null | undefined): number {
    if (!days || days <= 0) {
      return 0;
    }

    // полные годы
    const fullYears = Math.floor(days / DAYS_IN_YEAR);

    // оставшиеся дни после полных лет
    const remainingDays = days - fullYears * DAYS_IN_YEAR;

    // переводим остаток в полные месяцы
    return Math.floor(remainingDays / DAYS_IN_MONTH);
  }
}
