import { Pipe, PipeTransform } from '@angular/core';
import { PassportItem } from '@app/api/models';

@Pipe({
  name: 'passportNumber',
})
export class PassportNumberPipe implements PipeTransform {
  transform(value?: PassportItem | null): string {
    if (!value) {
      return '';
    }

    const serial = value.serial ?? '';
    const number = value.number ?? '';

    const full = `${serial}${number}`.trim();

    return full || '';
  }
}
