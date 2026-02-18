import { Pipe, PipeTransform } from '@angular/core';
import { translate } from '@jsverse/transloco';

@Pipe({
  name: 'gender',
})
export class GenderPipe implements PipeTransform {
  transform(value: boolean): string {
    if (typeof value !== 'boolean') {
      return translate('gender.unknown');
    }

    return value ? translate('gender.male') : translate('gender.female');
  }
}
