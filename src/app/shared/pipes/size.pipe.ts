import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
})
export class SizePipe implements PipeTransform {
  transform(value: number | null | undefined, digits: number = 2): string {
    if (!value) return '0 MB';

    const mb = value / (1024 * 1024);
    return `${mb.toFixed(digits)} MB`;
  }
}
