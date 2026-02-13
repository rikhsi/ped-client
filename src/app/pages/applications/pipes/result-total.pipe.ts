import { Pipe, PipeTransform } from '@angular/core';
import { ResultItem } from '@api/models';

@Pipe({
  name: 'resultTotal',
})
export class ResultTotalPipe implements PipeTransform {
  transform(
    results: ResultItem[] | null | undefined,
    key: keyof ResultItem = 'score',
  ): number {
    if (!Array.isArray(results)) {
      return 0;
    }

    const total = results.reduce((sum, item) => sum + item[key], 0);

    return Number(total.toFixed(1));
  }
}
