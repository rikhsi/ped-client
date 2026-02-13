import { Pipe, PipeTransform } from '@angular/core';
import { ResultItem, TestResultDirection } from '@api/models';

@Pipe({
  name: 'resultDirection',
})
export class ResultDirectionPipe implements PipeTransform {
  transform(results: ResultItem[], direction: TestResultDirection): ResultItem {
    if (Array.isArray(results)) {
      return results.find((item) => item.direction === direction);
    }

    return null;
  }
}
