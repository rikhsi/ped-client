// days-to-years.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

const DAYS_IN_YEAR = 365.25;

@Pipe({
  name: 'daysToYears',
  pure: true,
})
export class DaysToYearsPipe implements PipeTransform {
  transform(days: number | null | undefined): number {
    if (!days || days <= 0) {
      return 0;
    }

    // Стаж: переводим дни в полные годы
    return Math.floor(days / DAYS_IN_YEAR);
  }
}
