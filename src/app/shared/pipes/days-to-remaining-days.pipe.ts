// days-to-remaining-days.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const DAYS_IN_YEAR = 365.25;
const DAYS_IN_MONTH = DAYS_IN_YEAR / 12; // ≈ 30.44

@Pipe({
  name: 'daysToRemainingDays',
  pure: true,
})
export class DaysToRemainingDaysPipe implements PipeTransform {
  transform(days: number | null | undefined): number {
    if (!days || days <= 0) {
      return 0;
    }

    const fullYears = Math.floor(days / DAYS_IN_YEAR);
    const remainingAfterYears = days - fullYears * DAYS_IN_YEAR;

    const fullMonths = Math.floor(remainingAfterYears / DAYS_IN_MONTH);
    const remainingAfterMonths =
      remainingAfterYears - fullMonths * DAYS_IN_MONTH;

    return Math.floor(remainingAfterMonths);
  }
}
