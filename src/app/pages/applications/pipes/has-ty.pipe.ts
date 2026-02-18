import { Pipe, PipeTransform } from '@angular/core';
import { ResultItem } from '@api/models';

@Pipe({
  name: 'hasTy',
})
export class HasTyPipe implements PipeTransform {
  transform(results: ResultItem[]): boolean {
    return results?.some((item) => !!item.teacherOfYearScore);
  }
}
